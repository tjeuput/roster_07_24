
import { DatePicker, Typography, Card, Row, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, {Suspense, lazy, useState} from 'react';
import EinzelauszugATbl from './EinzelATbl';
import type {TabsProps} from 'antd';
import Basic from './Basic';



const DienstpBw: React.FC = () => {
    const items: TabsProps['items'] = [
        {
            key: 'Basic',
            label: 'Mitarbeiter',
            children: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Basic />
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
