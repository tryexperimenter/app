import React from "react";
import { Observation } from "components/ExperimenterLog/Observation"
import DOMPurify from 'isomorphic-dompurify';

const Experiment = ({public_user_id, experiment_prompt, observations}) => {
    
    // console.log("Experiment")
    // console.log(experiment_prompt)
    // console.log("Observations")
    // console.log(observations)

    // We need to sanitize the HTML before we render it using dangerouslySetInnerHTML (necessary because we are delivering the HTML from the database)
    const sanitized_experiment_prompt = DOMPurify.sanitize(experiment_prompt);

    // If there are no observations, we don't want to render the Observation component
    // Note: there are no observation prompts or observations for the experiment, our API returns observations = "None"
    if (observations === "None") {
        return (
            <div>

                <p class="my-2 text-xl tracking-tight font-bold text-black md:text-2xl">
                <span dangerouslySetInnerHTML={{__html: sanitized_experiment_prompt}} />
                </p>

                <div class="p-2"></div>

            </div>
        )
    }

    // Otherwise, we want to render the Observation component
    return (

        <div>
            
            <p class="my-2 text-xl tracking-tight font-bold text-black md:text-2xl">
            <span dangerouslySetInnerHTML={{__html: sanitized_experiment_prompt}} />
            </p>

            {observations.map( (item) => (
            <Observation
              public_user_id={public_user_id}
              observation={item} />
            ))}

            <div class="p-2"></div>
        
        </div>

    )


}

export { Experiment }