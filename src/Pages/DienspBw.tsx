
import { Tabs } from 'antd';
import React, {Suspense, useState, useEffect} from 'react';
import type {TabsProps} from 'antd';



const DienstpBw: React.FC = () => {
    

    const items: TabsProps['items'] = [
        {
            key: 'Basic',
            label: 'Mitarbeiter',
            children: (
                <Suspense fallback={<div>Loading...</div>}>
                  
                </Suspense>
            )
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
