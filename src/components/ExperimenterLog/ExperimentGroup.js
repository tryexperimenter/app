import React from "react";
import { ExperimentSubGroup } from "components/ExperimenterLog/ExperimentSubGroup"

const ExperimentGroup = ({experiment_group, experiment_sub_groups}) => {
    
    console.log(experiment_sub_groups)

    return (
        <h2 class="text-4xl font-bold mb-2 text-black">
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