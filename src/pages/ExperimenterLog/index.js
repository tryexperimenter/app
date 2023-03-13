import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ExperimentObservationsDataService } from "services/ExperimentObservationsDataService";
import { LoadingScreen } from "components/LoadingScreen"

{/* Source:
https://christophergs.com/tutorials/ultimate-fastapi-tutorial-pt-12-react-js-frontend/
*/}

const ExperimenterLog = () => {
  {/*Set variables from parameters passed via the URL*/}
  const { id } = useParams()

  {/*Set variables that we'll be updating.*/}
  const [loading, setLoading] = useState(true)
  const [observations, setObservations] = useState([])

  {/*Get Experimenter Observations*/}

  useEffect(() => {
    getExperimenterObservations()
  })

  const getExperimenterObservations = (id) => {
    ExperimentObservationsDataService({
      request_type: "GET",
      payload: null,
    }).then((response) => {

      //Log response
      console.log("Response from getExperimenterObservations")
      console.log(response)

      //Set observations
      setObservations(response.data)

      //Update loading to false since we have data now
      setLoading(false)

    })  
  }

  {/*Return loading screen until we have data...*/}
  if (loading)
    return <LoadingScreen />

  return (
    <h2 class="text-4xl font-bold mb-2 text-black">
    First Name: {observations.first_name}
    <br></br> <br></br>
    Experiment: {observations.experiment_name}
    </h2>
  )
}

export { ExperimenterLog };