
import { Tabs, Space, Card } from 'antd';
import React from 'react';
import type {TabsProps} from 'antd';
import  TimelineContainer  from '../Components/Timeline/TimelineContainer';
import { Content } from 'antd/es/layout/layout';
import Basic from './Basic';
import ScheduleTbl from '../Components/ScheduleTable/ScheduleTbl';




const DienstpBw: React.FC = () => {
    

    const items: TabsProps['items'] = [
        {
            key: 'Schichten',
            label: 'Schichten',
            children: <TimelineContainer />
        },
        {
            key: 'Big Scheduler',
            label: 'Big Scheduler',
            children: <Basic/>,
        },
        {
            key: 'Produktiv Bw',
            label: 'Produktiv Bw',
            children: <ScheduleTbl/>,
        },
    ];
    
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Content style={{margin: '8px 8px',
                    padding: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                }}>
                    <Card  style={{width: '100%', maxWidth:'100%', overflow:'hidden'}}>
                        <Tabs defaultActiveKey='Basic' items={items}>
                        </Tabs>

                    </Card>

                </Content>
                
            
            
            </Space>
  
        </>
    );
};

export default DienstpBw;
