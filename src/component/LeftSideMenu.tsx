'use client'
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuOutlined,
} from '@ant-design/icons';
// Note: Tailwind is assumed available in this environment, but Ant Design classes/styles are preferred here.
import { Layout, Menu, Button, theme } from 'antd';
import type { MenuProps } from 'antd'; // Import MenuProps for typing

const { Header, Sider, Content } = Layout;

// Define the proportional widths using Viewport Width (vw) units
const SIDER_EXPANDED_WIDTH = '180px';
const SIDER_COLLAPSED_WIDTH = '44px';
const HEADER_HEIGHT = 64; // Standard Antd Header height

// 1. Define the Menu Item Type
type MenuItem = Required<MenuProps>['items'][number];

// Helper function to create menu items (now typed)
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// Menu items for the Sider (now using the typed array)
const items: MenuItem[] = [
  getItem('Navigation One', '1', <MailOutlined />),
  getItem('Navigation Two', '2', <AppstoreOutlined />),
  getItem('Submenu', 'sub1', <SettingOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Sub-Submenu', 'sub2', null, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
    ]),
  ]),
  getItem('Reports', '9', <AppstoreOutlined />),
  getItem('User Profile', '10', <MailOutlined />),
];

// 2. Define Props Interface for the Controllable Component
interface ControllableSidebarLayoutProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

// --- Refactored Component: Now controlled by external props ---
const ControllableSidebarLayout: React.FC<ControllableSidebarLayoutProps> = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  // Type the click event handler
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('Menu item clicked:', e.key);
  };
  
  // Calculate the required margin-left for the main content block
  const contentMarginLeft = collapsed
    ? SIDER_COLLAPSED_WIDTH
    : SIDER_EXPANDED_WIDTH;

  return (
    // Outer Layout Container
    <Layout>
      
      {/* 1. Sidebar (Sider) - Uses Proportional Widths and is Fixed */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="dark"
        width={SIDER_EXPANDED_WIDTH}
        collapsedWidth={SIDER_COLLAPSED_WIDTH}
        style={{
          overflow: 'hidden',
          height: '3000px',
          position: 'fixed', 
          left: 0, 
          top: 0, 
          bottom: 0,
          zIndex: 10000000000,
          // width:100,
        }}
      >
        <div 
          className="logo-container" 
          onClick={() => setCollapsed(!collapsed)} // Toggle collapse on logo click
          style={{ 
            height: HEADER_HEIGHT, 
            margin: 0, 
            padding: '0 10px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: collapsed ? 'center' : 'flex-start',
            color: 'white', 
            fontWeight: 'bold',
            fontSize: collapsed ? '1.5vw' : '1vw',
            cursor: 'pointer',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {collapsed ? <MenuOutlined /> : '1/9 App Width'}
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      </Layout>
  );
};
export default ControllableSidebarLayout;