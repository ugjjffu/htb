'use client';
import React, { useReducer } from 'react';
import {
    AppState,
    initialState,
    reducer // This is assumed to be the unified appReducer
} from '@/reducer/HotelReservationReducer';
import { Carousel, Dropdown, Popover } from 'antd';
import Calendar from '@/component/Calendar';
import CityDropDown, { City } from './CityDropDown';
import CountDropDown from './CountDropDown';
import LevelOfHotelDropDown from './LevelOfHotelDropDown';
import SeachGeoBox from './SeachGeoBox';
import { Dayjs } from 'dayjs'; // Import dayjs and Dayjs for type usage
import SliderComercial from "@/component/SliderCommercial"; // Added missing import
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'; // Added missing import
import { RobotFilled, RightOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { relative } from 'path';
import CityButton from './CityButton';
import RecommendedCityDropDown from './RecommendedCityDropDown';
import { useDispatch, useSelector } from 'react-redux';
import HotelItem from './HotelItem';
import { HotelRecommendationBar } from './HotelRecommendationBar';
type TopAreaProps = object

const TopArea: React.FC<TopAreaProps> = () => {
    // ----------------------------------------------------------------------
    // 1. Unified useReducer hook (Assuming 'reducer' is the merged function)
    //    The second reducer (stateOfLevelDropDown) has been removed as all state is now centralized.
    // ----------------------------------------------------------------------
    const [state, dispatch] = useReducer(reducer, initialState);
    // const choosenCity = useSelector((s: AppState) => s.choosenCity);
    const globalDispatch = useDispatch();
    const {
        selectedCity,
        openCityOptions,
        openCalendarOfCheckIn,
        panelValueOfCheckIn,
        openCalendarOfCheckOut,
        panelValueOfCheckOut,
        selectedCheckInValue,
        selectedCheckOutValue,
        open,
        rooms,
        adults,
        childrens,
        level, // Now accessed directly from the main state
        stateOfLevelDropDown,
    } = state;

    // ----------------------------------------------------------------------
    // 2. Refactored Event Handlers to use dispatch
    // ----------------------------------------------------------------------

    const handleCitySelect: (city: City) => void = (city: City) => {
        // Replace setSelectedCity with dispatch
        dispatch({ type: 'SET_SELECTED_CITY', payload: city });
        // Replace setOpenCityOptions with dispatch
        dispatch({ type: 'SET_OPEN_CITY_OPTIONS', payload: false });
    };

    // Helper for Drodown's onOpenChange, which accepts a boolean
    const handleOpenCityOptionsChange = (newOpen: boolean) => {
        dispatch({ type: 'SET_OPEN_CITY_OPTIONS', payload: newOpen });
    };

    const handleOpenCheckInChange = (newOpen: boolean) => {
        dispatch({ type: 'SET_OPEN_CALENDAR_CHECKIN', payload: newOpen });
    };

    const handleOpenCheckOutChange = (newOpen: boolean) => {
        dispatch({ type: 'SET_OPEN_CALENDAR_CHECKOUT', payload: newOpen });
    };

    // ----------------------------------------------------------------------
    // 3. Refactored Custom Pop-up Renders to use dispatch for inner component props
    // ----------------------------------------------------------------------

    const HotelSelectedPopupRender: () => React.ReactElement = () => (
        <div className="city-dropdown-popup">
            <div className="font-semibold bg-gray-200">
                <div className="p-2">popular city</div>
            </div>
            <div className="p-2">
                <CityDropDown
                    onSelectCity={handleCitySelect}
                    selectedCity={selectedCity}
                />
            </div>
        </div>
    );
    const recommendedCitySelectedPopupRender: () => React.ReactElement = () => (
        <div className="city-dropdown-popup h-40 overflow-y-scroll">
            <div className="p-2">
                <RecommendedCityDropDown
                    onSelectCity={(city: string) => { dispatch({ type: 'SET_RECOMMENDED_SELECTED_CITY', payload: city }); globalDispatch({ type: 'SET_CHOOSEN_CITY', payload: city }); }}
                    selectedCity={state.recommendedSelectedCity}
                />
            </div>
        </div>
    );
    // Creates functions that dispatch actions for Calendar updates
    const customCalendarOfCheckIn: () => React.ReactElement = () => (
        <Calendar
            selectedValue={selectedCheckInValue}
            // Replace setSelectedCheckInValue with dispatch
            setSelectedValue={(value: Dayjs | null) => {
                dispatch({ type: 'SET_SELECTED_CHECKIN_VALUE', payload: value });
                dispatch({ type: "SET_OPEN_CALENDAR_CHECKIN", payload: !openCalendarOfCheckIn })
            }
            }
            panelValue={panelValueOfCheckIn}
            // Replace setPanelValueOfCheckIn with dispatch
            setPanelValue={(value: Dayjs) =>
                dispatch({ type: 'SET_PANEL_VALUE_CHECKIN', payload: value })
            }
        />
    );

    const customCalendarOfCheckOut: () => React.ReactElement = () => (

        <Calendar
            selectedValue={selectedCheckOutValue}
            // Replace setSelectedCheckOutValue with dispatch
            setSelectedValue={(value: Dayjs | null) => {
                dispatch({ type: 'SET_SELECTED_CHECKOUT_VALUE', payload: value });
                dispatch({ type: "SET_OPEN_CALENDAR_CHECKOUT", payload: !openCalendarOfCheckOut })
            }
            }
            panelValue={panelValueOfCheckOut}
            // Replace setPanelValueOfCheckOut with dispatch
            setPanelValue={(value: Dayjs) =>
                dispatch({ type: 'SET_PANEL_VALUE_CHECKOUT', payload: value })
            }
        />

    );

    const backgroundImageUrl = '/bg-rc.jpg';
    const forcedPlacement = {
        // Define only the 'bottomRight' placement
        bottomRight: {
            points: ['tr', 'br'], // Trigger top-right aligns with Popup bottom-right
            offset: [0, 4],       // Offset 4px down (standard separation)
            overflow: {           // Disable collision adjustment
                adjustX: false,
                adjustY: false,
            },
        },
    };
    return (
        <section className="flex space-x-4 justify-center">
            <div className="flex flex-col w-[740px]" >
                <div id="section2" className="h-[264px] rounded-[10px] text-white text-xl flex items-center border-b border-gray-700 flex-col"
                    style={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <header className="mt-0 w-[90%] h-19 flex items-center ">
                        预订酒店
                    </header>
                    <div className="bg-white text-black w-176 rounded-[10px] h-18 flex flex-row justify-center items-center">
                        {/* City Dropdown */}
                        <div className="w-78 h-full">
                            <span className="inline-block text-base ml-2 mt-2.5">目的/酒店名称</span>
                            <div className={`ml-2.5 mb-0.5 ${openCityOptions ? 'border-b-3' : ''}`}>
                                <Dropdown
                                    autoAdjustOverflow={false}
                                    trigger={['click']}
                                    open={openCityOptions}
                                    // Replace setOpenCityOptions with handler
                                    onOpenChange={handleOpenCityOptionsChange}
                                    popupRender={HotelSelectedPopupRender}
                                >
                                    {selectedCity}
                                </Dropdown>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-gray-400 h-12"></div>
                        <div className="w-98 h-full flex flex-row ml-0">
                            {/* Check-In Dropdown */}
                            <div className="w-43">
                                <span className="inline-block text-base ml-2 mt-2.5">入住</span>
                                <div className="ml-2.5">
                                    <Dropdown
                                        autoAdjustOverflow={false}
                                        placement='bottomLeft'
                                        trigger={['click']}
                                        open={openCalendarOfCheckIn}
                                        // Replace setOpenCalendarOfCheckIn with handler
                                        onOpenChange={handleOpenCheckInChange}
                                        popupRender={customCalendarOfCheckIn}
                                    >
                                        <div>{selectedCheckInValue ? selectedCheckInValue.format('YYYY-MM-DD') : panelValueOfCheckIn.format('YYYY-MM-DD')}</div>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="w-8 ml-2 mr-2">1</div>
                            {/* Check-Out Dropdown */}
                            <div className="w-43">
                                <span className="inline-block text-base ml-2 mt-2.5">退房</span>
                                <div className="ml-2.5">
                                    <Dropdown
                                        autoAdjustOverflow={false}
                                        placement="bottomRight"
                                        trigger={['click']}
                                        open={openCalendarOfCheckOut}
                                        // Replace setOpenCalendarOfCheckOut with handler
                                        onOpenChange={handleOpenCheckOutChange}
                                        popupRender={customCalendarOfCheckOut}
                                    // getPopupContainer={() =>document.body }
                                    >
                                        <div className='w-full'>{selectedCheckOutValue ? selectedCheckOutValue.format('YYYY-MM-DD') : panelValueOfCheckOut.format('YYYY-MM-DD')}</div>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="section2-2" className="w-176 rounded-[10px] h-18 text-white text-xl mt-3 flex flex-row" >
                        <div className="bg-white text-black w-140 rounded-[10px] flex flex-row items-center">
                            {/* Rooms/Guests Dropdown */}
                            <div className="w-34.5 h-18">
                                <span className="inline-block text-base ml-2 mt-2.5">房间及住客</span>
                                <div className="ml-2 flex flex-row item-center">
                                    <CountDropDown
                                        open={open}
                                        // Replace setOpen with dispatch
                                        setOpen={(value: boolean) => dispatch({ type: 'SET_OPEN', payload: value })}
                                        adults={adults}
                                        // Replace setAdults with dispatch
                                        setAdults={(value: number) => dispatch({ type: 'SET_ADULTS', payload: value })}
                                        childrens={childrens}
                                        // Replace setChildrens with dispatch
                                        setChildrens={(value: number) => dispatch({ type: 'SET_CHILDRENS', payload: value })}
                                        rooms={rooms}
                                        // Replace setRooms with dispatch
                                        setRooms={(value: number) => dispatch({ type: 'SET_ROOMS', payload: value })}
                                    />
                                    <div className="ml-3"></div>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-400 h-12"></div>
                            <div className="w-92 h-full flex flex-row ml-0">
                                {/* Hotel Level Dropdown */}
                                <div className="w-43">
                                    <span className="inline-block text-base ml-2 mt-2.5">酒店类型</span>
                                    <div className="ml-2.5">
                                        {/* {level} */}
                                        <LevelOfHotelDropDown
                                            open={stateOfLevelDropDown} // Use state.open from the unified state
                                            // Dispatch SET_OPEN action
                                            setOpen={() => dispatch({ type: 'SET_LEVELDROPDOWN_OPEN', payload: !state.stateOfLevelDropDown })}
                                            level={state.level} // Use state.level from the unified state
                                            // Dispatch SET_LEVEL action
                                            setLevel={(newLevel: string) => dispatch({ type: 'SET_LEVEL', payload: newLevel })}
                                        />
                                    </div>
                                </div>
                                {/* Keywords/GeoBox */}
                                <div className="w-48 flex flex-col h-18">
                                    <span className="inline-block text-base ml-2 mt-2">关键词-选填</span>
                                    <div className="ml-2.5">
                                        <SeachGeoBox
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className='w-full h-full ml-3 rounded-[10px] bg-green-600 bg-gradient-to-r from-blue-400 to-blue-600 '
                        >
                            搜索
                        </button>
                    </div>
                </div>
                <div id="section9" className="w-185 h-33 text-white text-xl rounded-[15px] overflow-hidden mt-3.5">
                    <Carousel
                        id='654'
                        autoplay
                        autoplaySpeed={3000} // <-- This is the change: sets the delay to 2000ms (2 seconds)
                        effect="scrollx"
                        dotPosition="bottom"
                        className="rounded-lg h-33 rounded-lg" // Added rounded corners to the carousel itself
                    >
                        <img className='h-33' src='\hotelSlider_1.png'
                            style={{
                                backgroundImage: `\hotelSlider_1.png`,
                            }}
                        ></img>
                        <img className='h-33' src='\hotelSlider_2.jpg'
                            style={{
                                backgroundImage: `\hotelSlider_2.jpg`,
                            }}
                        ></img>
                    </Carousel>
                </div>
                <div id="section10" className="flex flex-row items-center w-1/1 h-[76px] rounded-[15px] overflow-hidden position:relative mt-3.5" style={{ position: "relative" }}>
                    <div
                        className="w-31/64 h-full inset-0 absolute z-0 rounded-[15px]"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(255,255,255,1) 75%, rgba(255,255,255,1) 100%), url(/bg-ai_travel_asistent.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'pointer'
                        }}
                    />
                    <div className='flex flex-row border border-blue-200 items-center w-31/64 h-full rounded-[15px]' style={{ zIndex: "1000000", cursor: 'pointer' }}>
                        <RobotFilled style={{ fontSize: '16px', color: '#18191bff', marginLeft: "15px" }}></RobotFilled>
                        <div style={{ fontSize: '16px', marginLeft: "10px" }}>Ai行程助手</div>
                        <div style={{ color: "grey", marginLeft: "auto" }}>一站式打造完美旅程<RightOutlined style={{ backgroundColor: "rgb(169,200,225)", borderRadius: "15px", color: "white", marginRight: "10px" }}></RightOutlined></div>
                    </div>
                    <div
                        className="w-31/64 h-full absolute z-0 right-0 rounded-[15px]"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(255,255,255,1) 75%, rgba(255,255,255,1) 100%), url(/bg-travel_map.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: "0",
                        }}
                    />
                    <div className='flex flex-row border border-pink-200 items-center align- w-31/64 h-full rounded-[15px] ml-auto' style={{ zIndex: "1000000", cursor: 'pointer' }}>
                        <EnvironmentOutlined style={{ fontSize: '16px', color: '#18191bff', marginLeft: "15px" }}></EnvironmentOutlined>
                        <div style={{ fontSize: '16px', marginLeft: "10px" }}>旅游地图</div>
                        <div style={{ color: "grey", marginLeft: "auto" }}>探索 好去处<RightOutlined style={{ backgroundColor: "rgb(169,200,225)", borderRadius: "15px", color: "white", marginRight: "10px" }}></RightOutlined></div>
                    </div>
                </div>
                {/* <div className='flex flex-row text-xl h-[340px] w-full mt-3.5' id="section10"> */}
                <HotelRecommendationBar></HotelRecommendationBar>
                {/* </div> */}
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
            </div>
        </section >

    );
};

export default TopArea;