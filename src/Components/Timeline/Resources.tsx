import React from "react";

interface ResourcesProps{
    resource: string; 
    parent: string;
    parentId: number | null; 
    planned: number | null;
    children?: React.ReactNode;
}
// TODO change group to dynamic value from BW HW etc
const Resources : React.FC<ResourcesProps> = ({resource, parent, parentId, planned}) => {

    const isGroup = resource.toLowerCase().includes('group');

    const resourcesProps = {
        className: `timeline-row-resource ${isGroup ? 'collapsible': parent}`,
        id: ` ${!isGroup ? parentId +'_'+planned+'_'+parent : parent}`
    };

return( <>
    <div{...resourcesProps}>{!planned && !isGroup? '>' + resource : resource}</div>

   
    
    </>
);
  
}

export default Resources;