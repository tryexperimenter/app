import React from "react";
import DOMPurify from 'isomorphic-dompurify';
import { ObservationForm } from "components/UserInputs/ObservationForm"

const Observation = ({public_user_id, observation}) => {

    // console.log("Observation Prompt")
    // console.log(observation.observation_prompt)
    // console.log("Observation")
    // console.log(observation.observation)

    // We need to sanitize HTML that is dynamically generated (not explicitly written in code) to ensure we don't render any malicous HTML (the values we are pulling from the database could be user generated (and not previously sanitized) and often contain HTML (e.g., to render curly quotes))
    const sanitized_observation_prompt = DOMPurify.sanitize(observation.observation_prompt);
    const sanitized_observation = DOMPurify.sanitize(observation.observation);

    // If there there is no observation for an observation prompt, don't display anything other than the experiment
    if (sanitized_observation === "") {
        return (<div></div>)
    }

    // If there is an observation, display the observation prompt and observation
    return (
        <div>
            <div class="p-0.5"></div>
            <p class="my-2 text-l tracking-tight font-bold text-gray-500 md:text-xl">
                <span dangerouslySetInnerHTML={{__html: sanitized_observation_prompt}} />
            </p>
            <p class="my-2 text-l tracking-tight text-gray-500 md:text-xl">
                <span dangerouslySetInnerHTML={{__html: sanitized_observation}} />
            </p>
            <ObservationForm 
                public_user_id={public_user_id}
                observation_prompt_id={observation.observation_prompt_id} />
        </div>
        
    )
}

export { Observation }