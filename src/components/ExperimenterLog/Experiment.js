import React from "react";
import { Observation } from "components/ExperimenterLog/Observation"

const Experiment = ({experiment, observations}) => {
    
    console.log("Experiment")
    console.log(experiment)
    console.log("Observations")
    console.log(observations)

    if (observations == "None") {
        return (
            <h2 class="text-4xl font-bold mb-2 text-black">
            {experiment}  
            <br></br> <br></br>
            </h2>
        )
    }

    return (
        <h2 class="text-4xl font-bold mb-2 text-black">
        {experiment}
        <br></br> <br></br>
    
        {observations.map( (item) => (
            <Observation observation={item} />
        ))}

        <br></br> <br></br>
        </h2>
    )


}

export { Experiment }