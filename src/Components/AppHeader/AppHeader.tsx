
import {Layout, Menu} from 'antd';
import {  useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';


const { Header } = Layout;


const AppHeader = () => {

    const navigate = useNavigate();
    
    const location = useLocation();


    const items = [
        { 
            key: "DienstplanBw", 
            label: "Dienstplan BW",
            onClick: () => navigate('/DienstpBw')
        },
        {
            key: "EinzelauszugBw",
            label: "Einzelauszug BW",
            onClick: () => navigate('/EinzelBw')
        },
        { 
            key: "DienstplanHW", 
            label: "Dienstplan HW",
            onClick: () => navigate('/DienstpHw')
        },
        {
            key: "EinzelauszugHw",
            label: "Einzelauszug HW",
            onClick: () => navigate('/EinzelHw')
        },
        { 
            key: "DienstplanA", 
            label: "Dienstplan A",
            onClick: () => navigate('/DienstpA')
        },
        {
            key: "EinzelauszugA",
            label: "Einzelauszug A",
            onClick: () => navigate('/EinzelA')
        },
    ];

    useEffect(() => {
        if (location.pathname === '/') {
          navigate('/DienstpBw');
        }
      }, [location, navigate]);    

return(
    <Header style={{ display: 'flex', alignItems: 'center', width:'100%', backgroundColor:'white' }}>
    <Menu theme='light' mode='horizontal' defaultSelectedKeys={['DienstplanBw']} style={{ flex: 1, minWidth: 0,  }}>
      {items.map(item => (
        <Menu.Item key={item.key} onClick={item.onClick}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  </Header>
);
};

export default AppHeader;