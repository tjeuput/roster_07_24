import React, { useState } from 'react';
import './index.css';

import { ConfigProvider, Layout, Menu, Button, theme } from 'antd';
import SideMenu from './Components/SideMenu/SideMenu';
import AppHeader from './Components/AppHeader/AppHeader';
import { Route, Routes } from 'react-router-dom';
import DienstpA from './Pages/DienspA';
import DienstpBw from './Pages/DienspBw';
import EinzelA from './Pages/EinzelA';
import DienstpHw from './Pages/DienstpHw';
import EinzelHw from './Pages/EinzelHw';
import EinzelBw from './Pages/EinzelBw';

const { Header, Content } = Layout;


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  

  return (
    <ConfigProvider theme={{
      components: {
        Menu: { darkItemSelectedBg: '#F3D324' }
      }
    }}>
      <Layout>
       <SideMenu />
        <Layout>
          <AppHeader />
          
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           <Routes>
                <Route path="/DienstpA" element={<DienstpA />} />
                <Route path="/DienstpBw" element={<DienstpBw />} />
                <Route path="/DienstpHw" element={<DienstpHw />} />
                <Route path="/EinzelA" element={<EinzelA />} />
                <Route path="/EinzelHw" element={<EinzelHw />} />
                <Route path="/EinzelBw" element={<EinzelBw />} />
            </Routes>
          </Content>

        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;