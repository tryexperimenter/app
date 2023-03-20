import React from "react";

const Observation = ({observation}) => {

    return (
        <div>
            <div class="p-0.5"></div>
            <p class="my-2 text-l tracking-tight font-bold text-gray-500 md:text-xl">
            {observation.observation_prompt}
            </p>
            <p class="my-2 text-l tracking-tight text-gray-500 md:text-xl">
            {observation.observation}
            </p>
        </div>
        
    )
}

export { Observation }