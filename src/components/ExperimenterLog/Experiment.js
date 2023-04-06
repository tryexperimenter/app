import React from "react";
import { Observation } from "components/ExperimenterLog/Observation"
import DOMPurify from 'isomorphic-dompurify';

const Experiment = ({experiment, observations}) => {
    
    console.log("Experiment")
    console.log(experiment)
    console.log("Observations")
    console.log(observations)

    // We need to sanitize the HTML before we render it using dangerouslySetInnerHTML (necessary because we are delivering the HTML from the database)
    const sanitized_experiment = DOMPurify.sanitize(experiment);

    if (observations === "None") {
        return (
            <div>

                <p class="my-2 text-xl tracking-tight font-bold text-black md:text-2xl">
                <span dangerouslySetInnerHTML={{__html: sanitized_experiment}} />
                </p>

                <div class="p-2"></div>

            </div>
        )
    }

    return (

        <div>
            
            <p class="my-2 text-xl tracking-tight font-bold text-black md:text-2xl">
            <span dangerouslySetInnerHTML={{__html: sanitized_experiment}} />
            </p>

            {observations.map( (item) => (
            <Observation observation={item} />
            ))}

            <div class="p-2"></div>
        
        </div>

    )


}

export { Experiment }