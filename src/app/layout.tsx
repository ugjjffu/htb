'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "@/component/LeftSideMenu"
import Nav from "@/component/Nav"
import { useState } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const width = collapsed ? 'ml-[4vw]' : 'ml-[11.11vw]';
  const rightPanelWidth= collapsed ? 'w-[95vw]' : 'w-[87.8vw]';
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="app-container" className="h-screen">

        <div id="left-panel" className="text-white text-2xl">
            <Menu collapsed={collapsed} setCollapsed={setCollapsed}></Menu>
        </div>
        <div id="right-panel" className={`h-full ${rightPanelWidth} mt-0 ${width} transition-all duration-200  flex flex-col justify-evenly`}>
          <Nav></Nav>
          {children}
        </div>
        </div>
      </body>
    </html>
  );
}
