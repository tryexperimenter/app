import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getObservations } from "services/Observations";
import { LoadingScreen } from "components/LoadingScreen"

{/* Source:
https://christophergs.com/tutorials/ultimate-fastapi-tutorial-pt-12-react-js-frontend/
*/}

const ExperimenterLog = () => {

  {/*Create variables from parameters passed via the URL*/}
  const { id } = useParams()

  {/*Create variables that we'll be updating, update methods.*/}
  const [loading, setLoading] = useState(true)
  const [observations, setObservations] = useState([])

  {/*Get Observations*/}
  useEffect(() => {
    getObservationsHelper()
  }, [])

  const getObservationsHelper = () => {

    /*getObservations({
      id: id,
    })
    
    .then((response) => {

      //Log response
      console.log("Response from getObservations")
      console.log(response)

      //Set observations
      setObservations(response.data)

      //Update loading to false since we have data now
      setLoading(false)

    })*/  

    setObservations({"first_name":"Tristan","observations":[{"experiment_name":"Celebrate something.","question":"How did this make you feel?","answer":"Tristan - good."},{"experiment_name":"Speak up at a meeting.","question":"How did this make you feel?","answer":"Tristan - bad."}]})

    setLoading(false)
  }

  {/*Return loading screen until we have data...*/}
  if (loading)
    return <LoadingScreen />

  return (
    <h2 class="text-4xl font-bold mb-2 text-black">
    ID: {id}
    <br></br> <br></br>
    First Name: {observations.first_name}
    <br></br> <br></br>
    Experiment Name: {observations.observations[0].experiment_name}
    </h2>
  )
}

export { ExperimenterLog };