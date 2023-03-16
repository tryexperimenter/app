import React from "react";

const Observation = ({observation}) => {

    return (
        <h2 class="text-2xl font-bold mb-2 text-black">
        Prompt: {observation.observation_prompt}
        <br></br> <br></br>
        Answer: {observation.observation}
        <br></br> <br></br>
        </h2>
    )
}

export { Observation }