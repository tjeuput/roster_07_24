
import { Card, Space} from 'antd';

import { Content } from 'antd/es/layout/layout';
import React from 'react';
import Schichtform from './Schichtform';



const Schichtart: React.FC = () => {
    

    return (
        <>
        
            <Space direction="vertical" style={{ width: '100%' }}>
               
                <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    display: 'flex',
                }}>
                    
                    <Space direction="vertical" style={{ width: '100%' }}>
                        
                        <Card>
                            <Schichtform />
                        </Card>
                    </Space>
                </Content>
            </Space>
        </>
    );
};

        
 
export default Schichtart;
