import React from "react";

const Observation = ({observation}) => {

    return (
        <p className="mb-4 text-gray-700">
        Prompt: {observation.observation_prompt}
        <br></br> <br></br>
        Answer: {observation.observation}
        <br></br> <br></br>
        </p>
    )
}

export { Observation }