'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Ant Design Imports
import { Layout, theme } from 'antd';
// Import icons needed for the menu folding trigger
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Menu from "@/component/LeftSideMenu"
import Nav from "@/component/Nav"
import TopArea from '@/sections/TopAreaOfHotelReservation';
import React, { useState } from "react"; // Ensure React is imported
import { store } from '@/reducer/store/index'
import { Provider } from 'react-redux';
import { BankOutlined } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
// Define your custom font variables (can be simplified if not needed globally)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // You would typically use AntD's theme hook to get background colors, 
  // but for simplicity, we'll use Tailwind/inline styles for custom sections.
  const { token: { colorBgContainer } } = theme.useToken();

  // Removed useEffect as it was empty and the custom width calculation (width, ml) 
  // which is now handled by AntD Layout.

  return (
    // 1. Outer Layout wraps the entire structure
    <Provider store={store}>
      <Layout className={`${geistSans.variable} ${geistMono.variable} font-sans`} style={{ minHeight: '100vh', minWidth: 320, backgroundColor: "white" }}>

        {/* 2. Left Aside Menu (Sider) */}
        {/* <Sider
          trigger={null} // Don't use AntD's default trigger, we'll use the one in the header
          collapsible
          collapsed={collapsed}
          collapsedWidth={48} // AntD's default collapsed width is usually 48 or 80
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
          className=''
        >
          <Menu collapsed={collapsed} setCollapsed={setCollapsed}></Menu>
        </Sider> */}

        {/* 3. Inner Layout for Header and Content (sits next to Sider) */}
        {/* <Layout
          // Automatically calculate margin based on collapsed state
          style={{ marginLeft: collapsed ? 48 : 180, transition: 'margin-left 0.2s' }}
        > */}

        {/* 4. Top Navigator (Header) */}
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex items-center"
        >
          {/* Collapse/Expand Trigger Button - Placed in the header for visibility */}
          {/* {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
                style: {
                  fontSize: '18px',
                  padding: '0 24px',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                },
              },
            )} */}
          {/* Your Nav component (Top Bar content) */}
          <Nav></Nav>
        </Header>

        {/* 5. Main Content Area */}
        <Content
          style={{ margin: '24px 16px 0', overflow: 'initial', backgroundColor: "white" }}
        >
          <div className="flex flex-col items-center mt-3 min-w-[320px]">
            <TopArea ></TopArea>
            {/* The rest of your content area */}
          </div>
        </Content>
      </Layout>
      {/* </Layout> */}
    </Provider>
  );
}