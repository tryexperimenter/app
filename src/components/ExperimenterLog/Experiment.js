import React, { useState } from "react";
import DOMPurify from 'isomorphic-dompurify';
import { Observation } from "components/ExperimenterLog/Observation"


const Experiment = ({public_user_id, experiment_prompt, observations}) => {
    
    // console.log("Experiment")
    // console.log(experiment_prompt)
    // console.log("Observations")
    // console.log(observations)

    // Record whether the user wants to see the observations
    const [showObservations, setShowObservations] = useState(true);

    // We need to sanitize HTML that is dynamically generated (not explicitly written in code) to ensure we don't render any malicous HTML (the values we are pulling from the database could be user generated (and not previously sanitized) and often contain HTML (e.g., to render curly quotes))
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

    // Show Observations
    else if (showObservations === true) {
        return (

            <div>
                
                <p class="my-2 text-xl tracking-tight font-bold text-black md:text-2xl">
                <span dangerouslySetInnerHTML={{__html: sanitized_experiment_prompt}} />
                </p>

                <label className="flex items-center">
                    <input
                    type="checkbox"
                    checked={showObservations}
                    onChange={() => setShowObservations(!showObservations)}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2 text-sm leading-5">
                    Show Observations
                    </span>
                </label>

                    {observations.map( (item) => (
                    <Observation
                    public_user_id={public_user_id}
                    observation={item} />
                    ))}

                <div class="p-2"></div>
            
            </div>

        )
    }

    // Hide Observations
    return (

        <div>
            
            <p class="my-2 text-xl tracking-tight font-bold text-black md:text-2xl">
            <span dangerouslySetInnerHTML={{__html: sanitized_experiment_prompt}} />
            </p>

            <label className="flex items-center">
                <input
                type="checkbox"
                checked={showObservations}
                onChange={() => setShowObservations(!showObservations)}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-sm leading-5">
                Show Observations
                </span>
            </label>

            <div class="p-2"></div>
        
        </div>

    )

}

export { Experiment }