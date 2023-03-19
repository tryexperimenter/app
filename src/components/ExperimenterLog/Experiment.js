import React from "react";
import { Observation } from "components/ExperimenterLog/Observation"

const Experiment = ({experiment, observations}) => {
    
    console.log("Experiment")
    console.log(experiment)
    console.log("Observations")
    console.log(observations)

    if (observations == "None") {
        return (
            <p className="mb-4 text-gray-700">
            {experiment}  
            <br></br> <br></br>
            </p>
        )
    }

    return (
        <p className="mb-4 text-gray-700">
        {experiment}
        <br></br> <br></br>
    
        {observations.map( (item) => (
            <Observation observation={item} />
        ))}

        <br></br> <br></br>
        </p>
    )


}

export { Experiment }