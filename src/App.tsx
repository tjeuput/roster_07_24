import React, { useState } from 'react';
import './index.css';
import {

  TeamOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
import Bvg from './Components/SideMenu/Icon';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  onClick?: () => void,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick,
  } as MenuItem;
}



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

 
  const items: MenuItem[] = [

    getItem('BVG Dienstplan', '1', undefined, undefined, undefined, ()=>setCollapsed(!collapsed)),
  
    getItem('Verwaltung', 'sub1', <TeamOutlined />, [
      getItem('Mitarbeiter', '2'),
      getItem('Bereich', '3'),
      getItem('Gruppe', '4'),
      getItem('Schichtart', '5'),
  
    ]),
  
  ];
  

  return (
    <ConfigProvider theme={{
      components: {
        Menu: { darkItemSelectedBg: '#F3D324' }
      }
    }}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
          
         
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
      
            
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
         
          </Content>

        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;