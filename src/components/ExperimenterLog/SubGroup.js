import React, {useState} from "react";
import DOMPurify from 'isomorphic-dompurify';
import { Experiment } from "components/ExperimenterLog/Experiment"
import { CheckBox } from "components/UserInputs/CheckBox"


const SubGroup = ({public_user_id, group_name, sub_group_name, sub_group_display_date, experiments}) => {

    // console.log("Group Name")
    // console.log(group_name)
    // console.log("Sub Group Name")
    // console.log(sub_group_name)

    // Record whether the user wants to see the observations
    const [showObservations, setShowObservations] = useState(true);

    // We need to sanitize HTML that is dynamically generated (not explicitly written in code) to ensure we don't render any malicous HTML (the values we are pulling from the database could be user generated (and not previously sanitized) and often contain HTML (e.g., to render curly quotes))
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

            < CheckBox 
                isOn={showObservations} 
                setIsOn={setShowObservations} 
                label={"Show Observations"} />

            <div class="p-2"></div>

            {experiments.map( (item) => (
            <Experiment
                public_user_id={public_user_id}
                experiment_prompt={item.experiment_prompt} 
                observations={item.observations}
                showObservations={showObservations} />
            ))}

        </div>
    )
}

export { SubGroup }