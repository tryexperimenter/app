import React from "react";
import { ExperimentSubGroup } from "components/ExperimenterLog/ExperimentSubGroup"

const ExperimentGroup = ({experiment_group, experiment_sub_groups}) => {
    
    console.log(experiment_sub_groups)

    return (
        <h2 className="my-2 text-2xl font-bold tracking-tight text-black md:text-3xl">
        {experiment_group}
        <br></br> <br></br>
    
        {experiment_sub_groups.map( (item) => (
        <ExperimentSubGroup 
            experiment_sub_group={item.experiment_sub_group} 
            experiments={item.experiments} />
        ))}

        <br></br> <br></br>
        </h2>
    )
}

export { ExperimentGroup }