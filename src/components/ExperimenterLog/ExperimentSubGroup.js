import React from "react";
import { Experiment } from "components/ExperimenterLog/Experiment"

const ExperimentSubGroup = ({experiment_group, experiment_sub_group, experiment_sub_group_display_date, experiments}) => {
    
    console.log(experiments)

    return (
        <div>

            <h2 class="my-2 text-2xl font-bold tracking-tight text-black md:text-3xl">
            {experiment_group} | {experiment_sub_group}
            </h2>
            
            <p class="my-2 text-xl tracking-tight text-gray-500 md:text-2xl">
            Week of {experiment_sub_group_display_date}
            </p>

            <div class="p-2"></div>

            {experiments.map( (item) => (
            <Experiment
                experiment={item.experiment} 
                observations={item.observations} />
            ))}

        </div>
    )
}

export { ExperimentSubGroup }