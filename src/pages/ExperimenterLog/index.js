import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getExperimenterLog } from "services/ExperimenterLog"
import { ExperimentGroup } from "components/ExperimenterLog/ExperimentGroup"
import { LoadingPage } from "components/LoadingPage"

/* Source: https://christophergs.com/tutorials/ultimate-fastapi-tutorial-pt-12-react-js-frontend/*/

const ExperimenterLog = () => {

  /*Create variables from parameters passed via the URL*/
  const { log_id } = useParams()

  /*Create variables that we'll be updating, update methods.*/
  const [loading, setLoading] = useState(true)
  const [experimenterLog, setExperimenterLog] = useState([])

  /*Get Observations*/
  useEffect(() => {
    getExperimenterLogHelper()
  }, [])

  const getExperimenterLogHelper = () => {

    //Pre-API
    //setExperimenterLog({"first_name": "Tristan", "experiment_groups": [{"experiment_group_id": "eg1", "experiment_group": "Mini Experiments", "experiment_sub_groups": [{"experiment_sub_group_id": "esg1", "experiment_sub_group": "Week 1", "experiments": [{"experiment_id": "e1", "experiment": "Celebrate something.", "observations": [{"observation_prompt": "What makes you happier at work?", "observation": "My observation for o1."}, {"observation_prompt": "What makes you successful at work?", "observation": "My observation for o7."}]}, {"experiment_id": "e2", "experiment": "Seek feedback from someone on your team.", "observations": [{"observation_prompt": "What makes you happier at work?", "observation": "My observation for o2."}, {"observation_prompt": "What makes you successful at work?", "observation": "My observation for o8."}]}, {"experiment_id": "e3", "experiment": "Keep quiet for 10-15 minutes in a meeting (or until someone asks for your input).", "observations": [{"observation_prompt": "What makes you happier at work?", "observation": "My observation for o3."}, {"observation_prompt": "What makes you successful at work?", "observation": "My observation for o9."}]}]}, {"experiment_sub_group_id": "esg2", "experiment_sub_group": "Week 2", "experiments": [{"experiment_id": "e4", "experiment": "Draw out a quieter member of your team.", "observations": [{"observation_prompt": "What makes you happier at work?", "observation": "My observation for o4."}, {"observation_prompt": "What makes you successful at work?", "observation": "My observation for o10."}]}, {"experiment_id": "e5", "experiment": "Give some unsolicited advice.", "observations": [{"observation_prompt": "What makes you happier at work?", "observation": "My observation for o5."}, {"observation_prompt": "What makes you successful at work?", "observation": "My observation for o11."}]}, {"experiment_id": "e6", "experiment": "Clear the air around a tense issue.", "observations": [{"observation_prompt": "What makes you happier at work?", "observation": "My observation for o6."}, {"observation_prompt": "What makes you successful at work?", "observation": "My observation for o12."}]}]}]}, {"experiment_group_id": "eg2", "experiment_group": "Dealing with a Difficult Boss", "experiment_sub_groups": [{"experiment_sub_group_id": "esg13", "experiment_sub_group": "Week 1", "experiments": [{"experiment_id": "e35", "experiment": "Difficult boss - week 1, experiment 1.", "observations": "None"}, {"experiment_id": "e36", "experiment": "Difficult boss - week 1, experiment 2.", "observations": "None"}]}, {"experiment_sub_group_id": "esg14", "experiment_sub_group": "Week 2", "experiments": [{"experiment_id": "e37", "experiment": "Difficult boss - week 2, experiment 1.", "observations": "None"}, {"experiment_id": "e38", "experiment": "Difficult boss - week 2, experiment 2.", "observations": "None"}]}]}]})
    //setLoading(false)

    //Using API
    getExperimenterLog({
      log_id: log_id,
    })
    
    .then((response) => {

      //Log response
      console.log("Response from getExperimenterLog")
      console.log(response)

      //Set observations
      setExperimenterLog(response.data)

      //Update loading to false since we have data now
      setLoading(false)

    })

  }

  /*Display page to users.*/

  //Return loading page until we have data...
  if (loading)
    return <LoadingPage />

  //Return page
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

    {/*Display Experiment Groups > Experiment Sub Groups > Experiments > Observations we have data for*/}  
      {experimenterLog.experiment_groups.map( (item) => (
        <ExperimentGroup 
          experiment_group={item.experiment_group} 
          experiment_sub_groups={item.experiment_sub_groups} />
      ))}

    </div>
    
  )
}

export { ExperimenterLog };