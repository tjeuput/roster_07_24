import React from 'react';
import {  Table, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import MonthsHeader from '../Components/ScheduleTable/ScheduleTblAnt';


const EinzelA: React.FC = () => {
  const columns = MonthsHeader();

 
  
 

  return (
    <Space direction='vertical' style={{width:'100%'}}>
      <Content style= {{margin:'8px 8px 8px',
        padding:20,
        justifyContent: 'center',
        alignItems:'center',
        display:'flex',
        width: '100%',
        overflowX:'auto'
      }}>
    <Table
      columns={columns}
      bordered
    size="small"
    scroll={{ x: 'calc(700px + 50%)'}}
    
    /></Content>
    </Space>
  )
}

export default EinzelA;
