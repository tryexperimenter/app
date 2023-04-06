import React from "react";
import { ExperimentSubGroup } from "components/ExperimenterLog/ExperimentSubGroup"

const ExperimentGroup = ({experiment_group, experiment_sub_groups}) => {
    
    console.log(experiment_sub_groups)

    return (
        <div>
            {experiment_sub_groups.map( (item) => (
            <ExperimentSubGroup
                experiment_group = {experiment_group}
                experiment_sub_group={item.experiment_sub_group} 
                experiment_sub_group_display_date={item.experiment_sub_group_display_date}
                experiments={item.experiments} />
            ))}
        </div>   

    )
}

export { ExperimentGroup }