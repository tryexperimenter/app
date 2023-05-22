import React from "react";
import { SubGroup } from "components/ExperimenterLog/SubGroup"

const Group = ({group_name, sub_groups}) => {
    
    // console.log("Group Name")
    // console.log(group_name)
    // console.log("Sub Groups")
    // console.log(sub_groups)    

    return (
        <div>
            {sub_groups.map( (item) => (
            <SubGroup
                group_name = {group_name}
                sub_group_name={item.sub_group_name} 
                sub_group_display_date={item.sub_group_display_date}
                experiments={item.experiments} />
            ))}
        </div>   

    )
}

export { Group }