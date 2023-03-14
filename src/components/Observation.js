import React from "react";

const Observation = ({observation}) => {
    return (
        <h2 class="text-2xl font-bold mb-2 text-black">
        Experiment Name: {observation.experiment_name}
        <br></br> <br></br>
        Question: {observation.question}
        <br></br> <br></br>
        Answer: {observation.answer}
        <br></br> <br></br>
        </h2>
    )
}

export { Observation }