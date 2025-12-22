'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Ant Design Imports
import { Layout, theme } from 'antd';
// Import icons needed for the menu folding trigger
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Menu from "@/component/LeftSideMenu"
import Nav from "@/component/Nav"
import TopArea from '@/component/TopAreaOfHotelReservation';
import React, { useState } from "react"; // Ensure React is imported
import { store } from '@/reducer/store/index'
import { Provider } from 'react-redux';
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
      <Layout className={`${geistSans.variable} ${geistMono.variable} font-sans`} style={{ minHeight: '100vh', minWidth: 1400, backgroundColor: "white" }}>

        {/* 2. Left Aside Menu (Sider) */}
        <Sider
          trigger={null} // Don't use AntD's default trigger, we'll use the one in the header
          collapsible
          collapsed={collapsed}
          width={180} // Set your desired expanded width
          collapsedWidth={48} // AntD's default collapsed width is usually 48 or 80
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
        >
          {/* Your custom Menu component is placed inside the Sider */}
          <Menu collapsed={collapsed} setCollapsed={setCollapsed}></Menu>
        </Sider>

        {/* 3. Inner Layout for Header and Content (sits next to Sider) */}
        <Layout
          // Automatically calculate margin based on collapsed state
          style={{ marginLeft: collapsed ? 48 : 180, transition: 'margin-left 0.2s' }}
        >

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
            <div className="h-full flex flex-col items-center mt-3">
              <TopArea ></TopArea>

              {/* The rest of your content area */}
              <div className="w-[1184px] p-6 bg-white rounded-lg shadow-md"> {/* Adjusted width/padding for content container */}
                <div id="section13" className="bg-green-600 text-white text-xl flex items-center h-[38px] justify-center border-b border-gray-700">
                  Right - Section 3
                </div>
                <div id="section14" className="bg-yellow-600 text-white text-xl flex items-center h-[300px] justify-center"> {/* Set a sample height */}
                  Right - Section 4
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Provider>
  );
}