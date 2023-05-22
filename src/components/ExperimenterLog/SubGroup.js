import React from "react";
import { Experiment } from "components/ExperimenterLog/Experiment"
import DOMPurify from 'isomorphic-dompurify';

const SubGroup = ({group_name, sub_group_name, sub_group_display_date, experiments}) => {

    // console.log("Group Name")
    // console.log(group_name)
    // console.log("Sub Group Name")
    // console.log(sub_group_name)

    // We need to sanitize the HTML before we render it using dangerouslySetInnerHTML (necessary because we are delivering the HTML from the database)
    const sanitized_group_name = DOMPurify.sanitize(group_name);
    const sanitized_sub_group_name = DOMPurify.sanitize(sub_group_name);

    return (
        <div>

            <h2 class="my-2 text-2xl font-bold tracking-tight text-black md:text-3xl">
                <span dangerouslySetInnerHTML={{__html: sanitized_group_name}} /> | <span dangerouslySetInnerHTML={{__html: sanitized_sub_group_name}}/>
            </h2>
            
            <p class="my-2 text-xl tracking-tight text-gray-500 md:text-2xl">
            Week of {sub_group_display_date}
            </p>

            <div class="p-2"></div>

            {experiments.map( (item) => (
            <Experiment
                experiment_prompt={item.experiment_prompt} 
                observations={item.observations} />
            ))}

        </div>
    )
}

export { SubGroup }