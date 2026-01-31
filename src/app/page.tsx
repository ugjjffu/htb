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
            <div className="w-[85%] bg-white rounded-lg shadow-md"> {/* Adjusted width/padding for content container */}
              <div id="section13" className="flex-col bg-white text-white text-xl flex items-center min-[920px]:h-[152px]">
                <span className="text-black font-bold w-full">企业商旅</span>
                <div className="flex max-[920px]:flex-col w-full h-full mt-2 max-[920px]:space-y-5">
                  <div className="flex flex-row h-full items-center rounded-[5px] max-[920px]:rounded-[30px]" style={{ background: 'linear-gradient(135deg, #cedcf1ff 0%, #98bff8ff 100%)' }}>
                    <div className="flex items-center justify-center p-5">
                      <img src="/firm1.png" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-black">一站式企业差旅服务</div>
                      <div className="h-10 mt-0" style={{ fontSize: "14px" }}>
                        <div className="block mt-1">
                          一站式企业差旅服务海量差旅产品，全流程服务，智能管控，助企业成本节省高达30%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row h-full items-center rounded-[5px] max-[920px]:rounded-[30px]" style={{ background: 'linear-gradient(135deg, #f1ebdeff 0%, #f2c68cff 100%)' }}>
                    <div className="flex items-center justify-center p-5">
                      <img src="/firm2.png" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-black">公对公结算</div>
                      <div className="h-10 mt-0" style={{ fontSize: "14px" }}>
                        <div className="block mt-1">
                          15分钟极速开通公司账户、30+20天超长账期，自助对账，统一开票、配送！
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row h-full items-center rounded-[5px] max-[920px]:rounded-[30px]" style={{ background: 'linear-gradient(135deg, #e2f1deff 0%, #b8f694ff 100%)' }}>
                    <div className="flex items-center justify-center p-5">
                      <img src="/firm3.png" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-black">企业方案量身定制</div>
                      <div className="h-10 mt-0" style={{ fontSize: "14px" }}>
                        <div className="block mt-1">
                          强大的产品技术&服务解决方案 ，支持企业规模在500人以上中大型企业定制
                        </div>
                      </div>
                      {/* <div className="flex flex-row">
                          <div className="flex flex-row bg-blue-200 h-full items-center">
                            <div className="flex items-center justify-center">
                              <BankOutlined className="flex items-center justify-center  text-[30px] w-[45px] h-[45px] bg-blue-500 rounded-[50%]" style={{
                                background: 'linear-gradient(135deg, #f7f7f8ff 0%, #3b82f6 50%, #3b82f6 100%)'
                              }} />
                            </div>
                            <div className="flex flex-col justify-center">
                              <div className="text-black">一站式企业差旅服务</div>
                              <div className="h-10 mt-3" style={{fontSize:"14px"}}>
                                <div className="block ">
                                  一站式企业差旅服务海量差旅产品，全流程服务，智能管控，助
                                </div>
                                <div className="block ">
                                  企业成本节省高达30%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}

                    </div>
                  </div>
                </div>
              </div>
              <div id="section14" className="bg-yellow-600 text-white text-xl flex items-center h-[300px] justify-center"> {/* Set a sample height */}
                Right - Section 4
              </div>
            </div>
          </div>
        </Content>
      </Layout>
      {/* </Layout> */}
    </Provider>
  );
}