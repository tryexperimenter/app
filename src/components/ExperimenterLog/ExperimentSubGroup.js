import React from "react";
import { Experiment } from "components/ExperimenterLog/Experiment"
import DOMPurify from 'isomorphic-dompurify';

const ExperimentSubGroup = ({experiment_group, experiment_sub_group, experiment_sub_group_display_date, experiments}) => {

    // console.log("Experiment Group")
    // console.log(experiment_group)
    // console.log("Experiment Sub Group")
    // console.log(experiment_sub_group)

    // We need to sanitize the HTML before we render it using dangerouslySetInnerHTML (necessary because we are delivering the HTML from the database)
    const sanitized_experiment_group = DOMPurify.sanitize(experiment_group);
    const sanitized_experiment_sub_group = DOMPurify.sanitize(experiment_sub_group);

    return (
        <div>

            <h2 class="my-2 text-2xl font-bold tracking-tight text-black md:text-3xl">
                <span dangerouslySetInnerHTML={{__html: sanitized_experiment_group}} /> | <span dangerouslySetInnerHTML={{__html: sanitized_experiment_sub_group}}/>
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