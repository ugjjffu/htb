'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "@/component/LeftSideMenu"
import Nav from "@/component/Nav"
import { useEffect, useState } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import TopArea from '@/component/TopAreaOfHotelReservation';
// The component is already a TypeScript file (.tsx) due to the use of types like Dayjs, City, and useState<City>.
// Standard practice is to use the .tsx extension for React components that use TypeScript/JSX.

export default function Home() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const ml = 'ml-[180.4px]';
  const rightPanelWidth = collapsed ? 'w-[380px]' : 'w-[350px]';
  const width = `w-[${window.innerWidth - 180}px]`;
  return (
    <div id="app-container" className={`w-[100vw] min-w-[1450px]`}>
      <div id="left-panel" className="text-white text-2xl">
        <Menu collapsed={collapsed} setCollapsed={setCollapsed}></Menu>
      </div>
      <div id="right-panel" className={`transition-all ${ml} ${width} duration-200  flex flex-col justify-evenly`}>
        <Nav></Nav>
        <div className=" h-full flex flex-col items-center mt-3">
          <TopArea ></TopArea>
          <div className="w-296">
            <div id="section13" className="bg-green-600 text-white text-xl flex items-center h-38 justify-center border-b border-gray-700">
              Right - Section 3
            </div>
            <div id="section14" className="bg-yellow-600 text-white text-xl flex items-center h-full justify-center border-b-0">
              Right - Section 4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}