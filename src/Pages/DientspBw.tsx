
import { Tabs } from 'antd';
import React from 'react';
import type {TabsProps} from 'antd';
import  TimelineComponent  from '../Components/Timeline/Timeline';


const DienstpBw: React.FC = () => {
    

    const items: TabsProps['items'] = [
        {
            key: 'Basic',
            label: 'Mitarbeiter',
            children: <TimelineComponent/>
        },
        {
            key: 'Schicten',
            label: 'Schichten',
            children: 'Content of Schicten Statistik',
        },
        {
            key: 'Produktiv Bw',
            label: 'Produktiv Bw',
            children: 'Content of Produktiv Bw',
        },
    ];
    
    return (
        <>
            <Tabs activeKey="Basic" items={items} >
            
            </Tabs>
  
        </>
    );
};

export default DienstpBw;
