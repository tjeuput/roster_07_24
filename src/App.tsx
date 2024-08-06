
import './index.css';
import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import SideMenu from './Components/SideMenu/SideMenu';
import AppRouter from './Components/AppRouter';



const App: React.FC = () => {

  return (
    <ConfigProvider theme={{
      components: {
        Menu: { darkItemSelectedBg: '#F3D324' }
      }
    }}>
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout>
         
          <AppRouter />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;