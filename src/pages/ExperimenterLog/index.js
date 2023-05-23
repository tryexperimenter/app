import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BackendAPIDataService } from "services/BackendAPIDataService"
import { Group } from "components/ExperimenterLog/Group"
import { LoadingPage } from "components/LoadingPage"
import { ErrorPage } from "pages/ErrorPage"

/* Source: https://christophergs.com/tutorials/ultimate-fastapi-tutorial-pt-12-react-js-frontend/*/

const ExperimenterLog = () => {

  /*Create variables from parameters passed via the URL*/
  const { public_user_id } = useParams()

  /*Create variables that we'll be updating, update methods.*/
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [experimenterLog, setExperimenterLog] = useState([])

  /*Get Observations*/
  useEffect(
    () => {
    getExperimenterLogHelper()
    },
    []) // by passing an empty array, we only call this function once (well... twice in development mode (e.g., npm start) because of <React.StrictMode>) (https://stackoverflow.com/questions/61959581/why-is-my-axios-get-call-repeating-over-and-over-using-react-useeffect)

  const getExperimenterLogHelper = () => {

    //Pre-API
    //setExperimenterLog({"public_user_id":"AAA","first_name":"Tristan","days_of_experimenting":19,"experiments_to_display":"True","error":"False","groups":[{"group_id":"eg1","group_name":"Mini Experiments","sub_groups":[{"sub_group_id":"esg1","sub_group_name":"Week 1","sub_group_display_date":"March 06, 2023","experiments":[{"experiment_id":"e1","experiment":"Celebrate something.","observations":[{"observation_prompt":"What makes you happier at work?","observation":"My observation for o1."},{"observation_prompt":"What makes you successful at work?","observation":"My observation for o7."}]},{"experiment_id":"e2","experiment":"Seek feedback from someone on your team.","observations":[{"observation_prompt":"What makes you happier at work?","observation":"My observation for o2."},{"observation_prompt":"What makes you successful at work?","observation":"My observation for o8."}]},{"experiment_id":"e3","experiment":"Keep quiet for 10-15 minutes in a meeting (or until someone asks for your input).","observations":[{"observation_prompt":"What makes you happier at work?","observation":"My observation for o3."},{"observation_prompt":"What makes you successful at work?","observation":"My observation for o9."}]}]},{"sub_group_id":"esg2","sub_group_name":"Week 2","sub_group_display_date":"March 13, 2023","experiments":[{"experiment_id":"e4","experiment":"Draw out a quieter member of your team.","observations":[{"observation_prompt":"What makes you happier at work?","observation":"My observation for o4."},{"observation_prompt":"What makes you successful at work?","observation":"My observation for o10."}]},{"experiment_id":"e5","experiment":"Give some unsolicited advice.","observations":[{"observation_prompt":"What makes you happier at work?","observation":"My observation for o5."},{"observation_prompt":"What makes you successful at work?","observation":"My observation for o11."}]},{"experiment_id":"e6","experiment":"Clear the air around a tense issue.","observations":[{"observation_prompt":"What makes you happier at work?","observation":"My observation for o6."},{"observation_prompt":"What makes you successful at work?","observation":"My observation for o12."}]}]}]},{"group_id":"eg2","group_name":"Dealing with a Difficult Boss","sub_groups":[{"sub_group_id":"esg13","sub_group_name":"Week 1","sub_group_display_date":"March 06, 2023","experiments":[{"experiment_id":"e35","experiment":"Difficult boss - week 1, experiment 1.","observations":"None"},{"experiment_id":"e36","experiment":"Difficult boss - week 1, experiment 2.","observations":"None"}]},{"sub_group_id":"esg14","sub_group_name":"Week 2","sub_group_display_date":"March 13, 2023","experiments":[{"experiment_id":"e37","experiment":"Difficult boss - week 2, experiment 1.","observations":"None"},{"experiment_id":"e38","experiment":"Difficult boss - week 2, experiment 2.","observations":"None"}]}]}]})
    //setLoading(false)

    //Set loading to true (in case we're calling this function again)
    //setLoading(true)

    //Using API
    console.log("Calling BackendAPI to get ExperimenterLog data()");
    BackendAPIDataService({
      endpoint_stub: "experimenter-log/?public_user_id=" + public_user_id,
      request_type: "get",
      payload: null,
    })
    
    .then((response) => {

      console.log("Received response from BackendAPI")

      //No response from the API
      if (response.successful_request === false) {
        console.log("No response from the API; Setting error = true")
        setError(true)
        setErrorMessage(null)
        setLoading(false) //Update loading to false since we have a response now
        return
      }

      //API returned a response but indicated an error
      if (response.data.error === "True") {
        console.log("API returned a response but indicated an error; Setting error = true; errorMessage = " + response.data.end_user_error_message)
        setError(true)
        setErrorMessage(response.data.end_user_error_message)
        setLoading(false) //Update loading to false since we have a response now
        return
      }

      //Otherwise, set experimenterLog with the data we got back
      console.log("Setting experimenterLog with response.data")
      setExperimenterLog(response.data)
      setLoading(false) //Update loading to false since we have a response now

    })

  }

  /*Display page to users.*/

  //Loading Page: return until we have a response from getExperimenterLog()...
  if (loading)
    return <LoadingPage />

  //Error: return if there was an issue with getting a response from the API or the API returned response indicating an error
  if (error)
    return ErrorPage({message_for_user: errorMessage})

  //No experiments to display
  if (experimenterLog.experiments_to_display === "False")
    return (
      <div class="container mx-auto px-10 py-10">
        <h1 class="my-2 text-3xl font-bold tracking-tight text-black md:text-5xl"> 
        Experimenter Log
        </h1>    
        <div class="p-1"></div>
        <p class="my-2 text-xl tracking-tight text-gray-500 md:text-2xl">
        Hi {experimenterLog.first_name}. It looks like you don't have any experiments to display yet.
        <br></br>
        <br></br>
        Please check back later or reach out to support@tryexperimenter.com if you think this is an error.
        </p>
      </div>
    )

  //Otherwise, display the experiments
  return (
    <div class="container mx-auto px-10 py-10">
      <h1 class="my-2 text-3xl font-bold tracking-tight text-black md:text-5xl"> 
      Experimenter Log
      </h1>    
      <div class="p-1"></div>
      <p class="my-2 text-xl tracking-tight text-gray-500 md:text-2xl">
      Hi {experimenterLog.first_name}. Welcome to Day {experimenterLog.days_of_experimenting} of your experimenting journey.
      </p>
      <div class="pb-6"></div>

    {/*Display Groups > Sub Groups > Experiments > Observations we have data for*/}  
      {experimenterLog.groups.map( (item) => (
        <Group 
          public_user_id={public_user_id}
          group_name={item.group_name} 
          sub_groups={item.sub_groups} />
      ))}
    </div>
  )
}

export { ExperimenterLog };