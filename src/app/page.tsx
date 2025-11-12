'use client'
import React, { useReducer } from 'react';
import CityDropDown from "@/component/CityDropDown"
import SliderComercial from "@/component/SliderCommercial"
import { Dropdown } from 'antd'; // Removed unused imports: Button, Space, Typography
import type {City} from "@/component/CityDropDown"
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Calendar from "@/component/Calendar";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import CountDropDown from "@/component/CountDropDown"
import {reducer,initialState } from '@/reducer/HotelReservationReducer';
import LevelOfHotelDropDown from "@/component/LevelOfHotelDropDown"
import SeachGeoBox from '@/component/SeachGeoBox';
// The component is already a TypeScript file (.tsx) due to the use of types like Dayjs, City, and useState<City>.
// Standard practice is to use the .tsx extension for React components that use TypeScript/JSX.

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City>('New York');
  const [openCityOptions, setOpenCityOptions] = useState(false);
  const [openCalendarOfCheckIn, setOpenCalendarOfCheckIn] = useState(false);
  // Initializing state with dayjs() ensures the state is of type Dayjs, as defined.
  const [panelValueOfCheckIn, setPanelValueOfCheckIn] = useState<Dayjs>(() => dayjs());
  const [openCalendarOfCheckOut, setOpenCalendarOfCheckOut] = useState(false);
  // Initializing state with dayjs() ensures the state is of type Dayjs, as defined.
  const [panelValueOfCheckOut, setPanelValueOfCheckOut] = useState<Dayjs>(() => dayjs());
  // Using Dayjs | null for optional selection
  const [selectedCheckInValue, setSelectedCheckInValue] = useState<Dayjs | null>(null);
  const [selectedCheckOutValue, setSelectedCheckOutValue] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<number>(1);
  const [adults, setAdults] = useState<number>(1);
  const [childrens, setChildrens] = useState<number>(0);
  const [stateOfLevelDropDown, levelDropDownDispatch] = useReducer(reducer, initialState);
  const handleCitySelect: (city: City)=>void = (city: City) => {
    setSelectedCity(city);
    setOpenCityOptions(false); // Close the dropdown after selection
  };
  const customPopupRender: () => React.ReactElement = () => (
    <div className="city-dropdown-popup">
      <div className="font-semibold bg-gray-200">
        <div className="p-2">
          popular city
        </div>
      </div>
      <div className="p-2">
        <CityDropDown
          onSelectCity={handleCitySelect} 
          selectedCity={selectedCity} 
        />
      </div>
    </div>
  );

  const customCalendarOfCheckIn: () => React.ReactElement = () => (
    <div className="city-dropdown-popup">
      <Calendar
        selectedValue={selectedCheckInValue}
        setSelectedValue={setSelectedCheckInValue}
        panelValue={panelValueOfCheckIn}
        setPanelValue={setPanelValueOfCheckIn}
      >
      </Calendar>
    </div>
  );

  const customCalendarOfCheckOut: () => React.ReactElement = () => (
    <div className="city-dropdown-popup">
      <Calendar
        selectedValue={selectedCheckOutValue}
        setSelectedValue={setSelectedCheckOutValue}
        panelValue={panelValueOfCheckOut}
        setPanelValue={setPanelValueOfCheckOut}
      >
      </Calendar>
    </div>
  );
  const backgroundImageUrl = '/bg-rc.jpg'; 
  return (
    <div className=" h-full flex flex-col items-center mt-3">
      <div className="flex space-x-4">
          <div className="" >
              <div id="section2" className="w-185 h-66 rounded-[10] text-white text-xl flex items-center h-32 border-b border-gray-700 flex-col" 
                style={{ 
                  backgroundImage: `url(${backgroundImageUrl})`,
                  backgroundSize: 'cover', // <-- Scales to cover the entire container
                  backgroundPosition: 'center', // <-- Optional, centers the image
                  backgroundRepeat: 'no-repeat' // <-- Optional, prevents tiling
                }} 
              >
                  <div className="mt-0 w-[90%] h-19 flex items-center">
                    预订酒店
                  </div>
                  <div className="bg-white text-black w-176 rounded-[10] h-18 flex flex-row items-center ">
                    <div className="w-78 h-full">
                      <div className="text-base ml-2 mt-2.5">目的/酒店名称</div>
                      <div className={`ml-2.5 mb-0.5 ${openCityOptions?'border-b-3':''}`}>
                        <Dropdown
                          trigger={['click']}
                          open={openCityOptions}
                          onOpenChange={setOpenCityOptions}
                          // Ant Design's `popupRender` prop is used here
                          popupRender={customPopupRender} 
                        >
                          {selectedCity}
                        </Dropdown>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-gray-400 h-12"></div>
                    <div className="w-98 h-full flex flex-row ml-0">
                      <div className="w-43">
                        <div className="text-base ml-2 mt-2.5">入住</div>
                          <div className="ml-2.5">
                            <Dropdown
                              trigger={['click']}
                              open={openCalendarOfCheckIn}
                              onOpenChange={setOpenCalendarOfCheckIn}
                              // Ant Design's `popupRender` prop is used here
                              popupRender={customCalendarOfCheckIn} 
                            >
                              {/* Displaying the current panel value, or the selected check-in date if available */}
                              {selectedCheckInValue ? selectedCheckInValue.format('YYYY-MM-DD') : panelValueOfCheckIn.format('YYYY-MM-DD')}
                            </Dropdown>
                          </div>
                        </div>
                      <div className="w-8 ml-2 mr-2">1</div>
                      <div className="w-43">
                        <div className="text-base ml-2 mt-2.5">退房</div>
                          <div className="ml-2.5">
                            <Dropdown
                              trigger={['click']}
                              open={openCalendarOfCheckOut}
                              onOpenChange={setOpenCalendarOfCheckOut}
                              // Ant Design's `popupRender` prop is used here
                              popupRender={customCalendarOfCheckOut} 
                            >
                              {/* Displaying the current panel value, or the selected check-out date if available */}
                              {selectedCheckOutValue ? selectedCheckOutValue.format('YYYY-MM-DD') : panelValueOfCheckOut.format('YYYY-MM-DD')}
                            </Dropdown>
                          </div>
                        </div>
                    </div>
                  </div>
              <div id="section3" className="w-185 h-66 rounded-[10] text-white text-xl flex items-center h-32 border-b border-gray-700 flex-col mt-3" 
                style={{ 
                  backgroundImage: `url(${backgroundImageUrl})`,
                  backgroundSize: 'cover', // <-- Scales to cover the entire container
                  backgroundPosition: 'center', // <-- Optional, centers the image
                  backgroundRepeat: 'no-repeat' // <-- Optional, prevents tiling
                }} 
              >
                  <div className="bg-white text-black w-176 rounded-[10] h-18 flex flex-row items-center">
                    <div className="w-34.5 h-18">
                      <div className="text-base ml-2 mt-2.5">房间及住客</div>
                      <div className="ml-2 flex flex-row item-center">
                        <CountDropDown
                          open={open}
                          setOpen={setOpen}
                          adults={adults}
                          setAdults={setAdults}
                          childrens={childrens}
                          setChildrens={setChildrens}
                          rooms={rooms}
                          setRooms={setRooms}
                        >

                        </CountDropDown>
                        <div className="ml-3">

                        </div>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-gray-400 h-12"></div>
                    <div className="w-98 h-full flex flex-row ml-0">
                      <div className="w-43">
                        <div className="text-base ml-2 mt-2.5">酒店类型</div>
                          <div className="ml-2.5">
                            {stateOfLevelDropDown.level}
                            <LevelOfHotelDropDown
                              open={stateOfLevelDropDown.open}
                              setOpen={() => levelDropDownDispatch({ type: 'SET_OPEN', payload: !stateOfLevelDropDown.open})}
                              level={stateOfLevelDropDown.level}
                              setLevel={(level:string)=>levelDropDownDispatch({ type: 'SET_LEVEL',payload: level})}
                            >
                              
                            </LevelOfHotelDropDown>
                          </div>
                        </div>
                      <div className="w-43 flex flex-col w-53 h-18">
                        <div className="text-base ml-2 mt-2">关键词-选填</div>
                        <div className="ml-2.5">
                            <SeachGeoBox></SeachGeoBox>
                        </div>
                        </div>
                    </div>
                  </div>

              </div>
              </div>
              <div id="section2" className="w-185 h-66 bg-green-600 text-white text-xl flex items-center h-32 justify-center border-b border-gray-700">
                  Section 2 Content
                  <CaretUpOutlined style={{ color: '#1890ff' }} />
                  <CaretDownOutlined />
              </div>
              <div id="section2" className="w-185 h-66 bg-green-600 text-white text-xl flex items-center h-32 justify-center border-b border-gray-700">
                  Section 2 Content
              </div>
          </div>
          
          {/* Component 2: Set to half width (w-1/2) */}
          <div className=" space-y-4 flex flex-col"> {/* Added space-y-4 for vertical gap */}
              {/* Component 1 (The Slider) */}
              <div className="grow">
                <SliderComercial></SliderComercial>
              </div>
              {/* Component 2 (The New Content, placed vertically below the slider) */}
              <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-md mt-auto mb-4">
                  <h3 className="text-lg font-semibold text-yellow-800">NewVerticalContent</h3>
                  <p className="text-sm text-yellow-700">This content is now stacked vertically beneath the slider.</p>
              </div>
              {/* If this were a React component, you'd use: <NewVerticalContent /> */}
          </div>
      </div>
      <div className="w-296">
        <div id="section3" className="bg-green-600 text-white text-xl flex items-center h-38 justify-center border-b border-gray-700">
          Right - Section 3
        </div>
        <div id="section4" className="bg-yellow-600 text-white text-xl flex items-center h-full justify-center border-b-0">
          Right - Section 4
        </div>
      </div>
    </div>
  );
}