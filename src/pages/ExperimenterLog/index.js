import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getObservations } from "services/Observations"
import { Observation } from "components/Observation"
import { LoadingPage } from "components/LoadingPage"

/* Source: https://christophergs.com/tutorials/ultimate-fastapi-tutorial-pt-12-react-js-frontend/*/

const ExperimenterLog = () => {

  /*Create variables from parameters passed via the URL*/
  const { user_id } = useParams()

  /*Create variables that we'll be updating, update methods.*/
  const [loading, setLoading] = useState(true)
  const [observations, setObservations] = useState([])

  /*Get Observations*/
  useEffect(() => {
    getObservationsHelper()
  }, [])

  const getObservationsHelper = () => {

    //Pre-API
    //setObservations({"first_name":"Tristan","observations":[{"experiment_name":"Celebrate something.","question":"How did this make you feel?","answer":"Tristan - good."},{"experiment_name":"Speak up at a meeting.","question":"How did this make you feel?","answer":"Tristan - bad."}]})
    //setLoading(false)

    //Using API
    getObservations({
      user_id: user_id,
    })
    
    .then((response) => {

      //Log response
      console.log("Response from getObservations")
      console.log(response)

      //Set observations
      setObservations(response.data)

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
    <div>
    <h2 class="text-4xl font-bold mb-2 text-black">
    Hi {observations.first_name}, here are your experiment observations:
    <br></br> <br></br>
    </h2>

    {/*Display all observations we have data for*/}
    {observations.observations.map( (item) => (
      <Observation observation={item} />
    ))}

    </div>
  )
}

export { ExperimenterLog };