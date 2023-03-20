import React from "react";
import { Observation } from "components/ExperimenterLog/Observation"

const Experiment = ({experiment, observations}) => {
    
    console.log("Experiment")
    console.log(experiment)
    console.log("Observations")
    console.log(observations)

    if (observations == "None") {
        return (
            <div>

                <p class="my-2 text-xl tracking-tight font-bold text-black md:text-2xl">
                {experiment}
                </p>

                <div class="p-2"></div>

            </div>
        )
    }

    return (

        <div>
            
            <p class="my-2 text-xl tracking-tight font-bold text-black md:text-2xl">
            {experiment}
            </p>

            {observations.map( (item) => (
            <Observation observation={item} />
            ))}

            <div class="p-2"></div>
        
        </div>

    )


}

export { Experiment }