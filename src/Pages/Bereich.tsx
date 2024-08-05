
import { Card, Space} from 'antd';

import { Content } from 'antd/es/layout/layout';
import React from 'react';
import BereichsForm from './Bereichsform';
import Bereichsform from './Bereichsform';



const Bereich: React.FC = () => {
    

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
                          <Bereichsform></Bereichsform>
                        </Card>
                    </Space>
                </Content>
            </Space>
        </>
    );
};

        
 
export default Bereich;
