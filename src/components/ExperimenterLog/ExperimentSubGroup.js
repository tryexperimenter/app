import React from "react";
import { Experiment } from "components/ExperimenterLog/Experiment"

const ExperimentSubGroup = ({experiment_sub_group, experiments}) => {
    
    console.log(experiments)

    return (
        <h2 class="text-4xl font-bold mb-2 text-black">
        {experiment_sub_group}
        <br></br> <br></br>
    
        {experiments.map( (item) => (
        <Experiment
            experiment={item.experiment} 
            observations={item.observations} />
        ))}

        <br></br> <br></br>
        </h2>
    )
}

export { ExperimentSubGroup }