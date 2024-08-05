// Components/SideMenu/SideMenu.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  onClick?: () => void,
): MenuItem {
  return { key, icon, children, label, type, onClick } as MenuItem;
}

const SideMenu: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);


  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'sub1':
        navigate('/DienstpBw');
        break;
      case '2':
        navigate('/Mitarbeiter');
        break;
      case '3':
        navigate('/Bereich');
        break;
      case '4':
        navigate('/Gruppe');
        break;
      case '5':
        navigate('/Schichtart');
        break;
    }
  }
  
  

  const items: MenuItem[] = [
    getItem('BVG Dienstplan', '1',),
    getItem('Verwaltung', 'sub1', <TeamOutlined />, [
    getItem('Mitarbeiter', '2'),
    getItem('Bereich', '3'),
    getItem('Gruppe', '4'),
    getItem('Schichtart', '5'),
    ]),
  ];


  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/DienstpBw');
    }
  }, [location, navigate]);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={({key}) => handleMenuClick(key.toString())}
      />
    </Sider>
  );
};

export default SideMenu;
