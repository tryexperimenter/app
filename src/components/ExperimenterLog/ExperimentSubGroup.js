import React from "react";
import { Experiment } from "components/ExperimenterLog/Experiment"

const ExperimentSubGroup = ({experiment_sub_group, experiments}) => {
    
    console.log(experiments)

    return (
        <h3 className="my-2 text-lg font-bold tracking-tight text-black md:text-xl">
        {experiment_sub_group}
        <br></br> <br></br>
    
        {experiments.map( (item) => (
        <Experiment
            experiment={item.experiment} 
            observations={item.observations} />
        ))}

        <br></br> <br></br>
        </h3>
    )
}

export { ExperimentSubGroup }