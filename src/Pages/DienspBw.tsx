
import { DatePicker, Typography, Card, Space, Input, Col, Row, Button, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import EinzelauszugATbl from './EinzelATbl';
import type {TabsProps} from 'antd';

const items: TabsProps['items'] = [
    {
        key: 'Mitarbeiter',
        label: 'Mitarbeiter',
        children: 'Content Dienstplan',
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

const DienstpBw: React.FC = () => {
    return (
        <>
        <Card>
            <Tabs defaultActiveKey="1" items={items}>
                {items.map(item => (
                    <Tabs.TabPane key={item.key} tab={item.label}>
                        {item.children}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </Card>
        </>
    );
};

export default DienstpBw;
