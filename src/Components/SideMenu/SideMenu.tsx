// Components/SideMenu/SideMenu.tsx
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

// Assuming getItem is moved to a utility file if needed across components
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
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = [
    getItem('BVG Dienstplan', '1', undefined, undefined, undefined, () => setCollapsed(!collapsed)),
    getItem('Verwaltung', 'sub1', <TeamOutlined />, [
      getItem('Mitarbeiter', '2'),
      getItem('Bereich', '3'),
      getItem('Gruppe', '4'),
      getItem('Schichtart', '5'),
    ]),
  ];

  return (
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
  );
};

export default SideMenu;
