import React from 'react';
import {  Table, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import MonthsHeader from '../Components/ScheduleTable/ScheduleTblAnt';



interface EmployeeData {
  key: number;
  rest: number;
  restUm: number;
  name: string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;

  // Add other fields as necessary
}

const EinzelA: React.FC = () => {
  const columns = MonthsHeader();
  console.log("months header is", MonthsHeader());

  const data: EmployeeData[] = [];

  data.push({
    key: 1,
    rest: 30,
  restUm: 30,
  name: "Ranger",
  "1":'fr',
  "2":"fr",
  "3":"fr",
  "4":"fr",
  "5":"1"
  },{
  key: 2,
    rest: 30,
  restUm: 30,
  name: "Ranger",
  "1":'fr 1',
  "2":"fr 2",
  "3":"fr",
  "4":"fr",
  "5":"4"}
);



  
  
 

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
      columns={columns} dataSource={data}
      bordered
    size="small"
    scroll={{ x: 'calc(700px + 50%)'}}
    
    /></Content>
    </Space>
  )
}

export default EinzelA;
