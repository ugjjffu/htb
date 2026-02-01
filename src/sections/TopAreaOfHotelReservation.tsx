'use client';
import React, { useEffect, useReducer } from 'react';
import {
    AppState,
    initialState,
    reducer // This is assumed to be the unified appReducer
} from '@/reducer/HotelReservationReducer';
import { Carousel, Dropdown, Popover } from 'antd';
import Calendar from '@/component/Calendar';
import CityDropDown, { City } from '../component/CityDropDown';
import CountDropDown from '../component/CountDropDown';
import LevelOfHotelDropDown from '../component/LevelOfHotelDropDown';
import SeachGeoBox from '../component/SeachGeoBox';
import type { Dayjs } from 'dayjs'; // Import dayjs and Dayjs for type usage
import SliderComercial from "@/component/SliderCommercial"; // Added missing import
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'; // Added missing import
import { RobotFilled, RightOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { relative } from 'path';
import CityButton from '../component/CityButton';
import RecommendedCityDropDown from '../component/RecommendedCityDropDown';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import HotelItem from '../component/HotelItem';
import { HotelRecommendationBar } from './HotelRecommendationBar';
import { TripTicketRecommendation } from './TripTicketRecommendation';
import { AppDispatch } from '@/reducer/store';
import { getCurrentLngLat } from '@/../utils/geo';
import { setAdultsState, setChildrensState, setLevelDropDownOpenState, setLevelState, setOpenCalendarOfCheckOut, setOpenState, setPlaceOfDeparture, setRoomsState, setSelectedCheckOutValue } from '@/reducer/action';
import clsx from 'clsx';
import dayjs from 'dayjs';
import IntroBar from "@/sections/IntroBar"
type TopAreaProps = object
const CheckOutCalendar: () => React.ReactElement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedCheckOutValue = useReservation().selectedCheckOutValue;
    const openCalendarOfCheckOut = useReservation().openCalendarOfCheckOut;
    const panelValueOfCheckOut = useReservation().panelValueOfCheckOut;
    return (
        <Calendar
            selectedValue={selectedCheckOutValue}
            // Replace setSelectedCheckOutValue with dispatch
            setSelectedValue={(value: number) => {
                dispatch(setSelectedCheckOutValue(value));
                dispatch(setOpenCalendarOfCheckOut(!openCalendarOfCheckOut));
            }
            }
            panelValue={panelValueOfCheckOut}
            // Replace setPanelValueOfCheckOut with dispatch
            setPanelValue={(value: number) =>
                dispatch({ type: 'SET_PANEL_VALUE_CHECKOUT', payload: value })
            }
        />
    )
};
const HotelSelectedPopupRender: () => React.ReactElement = () => {
    const handleCitySelect = useReservation().handleCitySelect;
    const selectedCity = useReservation().selectedCity;
    return (
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
    )
};
const CheckInCalendar: () => React.ReactElement = () => {
    const dispatch = useDispatch();
    const selectedCheckInValue = useReservation().selectedCheckInValue;
    const openCalendarOfCheckIn = useReservation().openCalendarOfCheckIn;
    const panelValueOfCheckIn = useReservation().panelValueOfCheckIn;
    return (
        <Calendar
            selectedValue={selectedCheckInValue}
            // Replace setSelectedCheckInValue with dispatch
            setSelectedValue={(value: number) => {
                dispatch({ type: 'SET_SELECTED_CHECKIN_VALUE', payload: value });
                dispatch({ type: "SET_OPEN_CALENDAR_CHECKIN", payload: !openCalendarOfCheckIn })
            }
            }
            panelValue={panelValueOfCheckIn}
            // Replace setPanelValueOfCheckIn with dispatch
            setPanelValue={(value: number) =>
                dispatch({ type: 'SET_PANEL_VALUE_CHECKIN', payload: value })
            }
        />)
};


export const useReservation = () => {
    const dispatch = useDispatch();
    const selectedCity = useSelector((s: AppState) => s.selectedCity);
    const openCityOptions = useSelector((s: AppState) => s.openCityOptions);
    const openCalendarOfCheckIn = useSelector((s: AppState) => s.openCalendarOfCheckIn);
    const panelValueOfCheckIn = useSelector((s: AppState) => s.panelValueOfCheckIn);
    const openCalendarOfCheckOut = useSelector((s: AppState) => s.openCalendarOfCheckOut);
    const panelValueOfCheckOut = useSelector((s: AppState) => s.panelValueOfCheckOut);
    const selectedCheckInValue = useSelector((s: AppState) => s.selectedCheckInValue);
    const selectedCheckOutValue = useSelector((s: AppState) => s.selectedCheckOutValue);
    const open = useSelector((s: AppState) => s.open);
    const rooms = useSelector((s: AppState) => s.rooms);
    const adults = useSelector((s: AppState) => s.adults);
    const childrens = useSelector((s: AppState) => s.childrens);
    const level = useSelector((s: AppState) => s.level);
    const stateOfLevelDropDown = useSelector((s: AppState) => s.stateOfLevelDropDown);
    const recommendedSelectedCity = useSelector((s: AppState) => s.recommendedSelectedCity);
    const handleOpenCityOptionsChange = (newOpen: boolean) => {
        dispatch({ type: 'SET_OPEN_CITY_OPTIONS', payload: newOpen });
    };
    function handleOpenCheckInChange(newOpen: boolean) {
        dispatch({ type: 'SET_OPEN_CALENDAR_CHECKIN', payload: newOpen });
    }
    const handleOpenCheckOutChange = (newOpen: boolean) => {
        dispatch({ type: 'SET_OPEN_CALENDAR_CHECKOUT', payload: newOpen });
    };
    return {
        // state slices
        selectedCity: useSelector((s: AppState) => s.selectedCity),
        openCityOptions: useSelector((s: AppState) => s.openCityOptions),
        // ...whatever else you need
        // action helpers
        setSelectedCity: (c: City) => dispatch({ type: 'SET_SELECTED_CITY', payload: c }),
        setOpenCityOptions: (o: boolean) => dispatch({ type: 'SET_OPEN_CITY_OPTIONS', payload: o }),
        handleCitySelect: (city: City) => {
            // Replace setSelectedCity with dispatch
            dispatch({ type: 'SET_SELECTED_CITY', payload: city });
            // Replace setOpenCityOptions with dispatch
            dispatch({ type: 'SET_OPEN_CITY_OPTIONS', payload: false });
        },
        handleOpenCityOptionsChange,
        handleOpenCheckInChange,
        handleOpenCheckOutChange,
        selectedCheckInValue,
        openCalendarOfCheckIn,
        panelValueOfCheckIn,
        openCalendarOfCheckOut,
        panelValueOfCheckOut,
        selectedCheckOutValue,
        open,
        rooms,
        adults,
        childrens,
        level,
        stateOfLevelDropDown,
        recommendedSelectedCity,
    };
};
const TopArea: React.FC<TopAreaProps> = () => {
    // ----------------------------------------------------------------------
    // 1. Unified useReducer hook (Assuming 'reducer' is the merged function)
    //    The second reducer (stateOfLevelDropDown) has been removed as all state is now centralized.
    // ----------------------------------------------------------------------
    // const [state, dispatch] = useReducer(reducer, initialState);
    // const choosenCity = useSelector((s: AppState) => s.choosenCity);
    const dispatch = useDispatch();
    const globalDispatch = useDispatch();
    const selectedCity = useSelector((s: AppState) => s.selectedCity);
    const openCityOptions = useSelector((s: AppState) => s.openCityOptions);
    const openCalendarOfCheckIn = useSelector((s: AppState) => s.openCalendarOfCheckIn);
    const panelValueOfCheckIn = useSelector((s: AppState) => s.panelValueOfCheckIn);
    const openCalendarOfCheckOut = useSelector((s: AppState) => s.openCalendarOfCheckOut);
    const panelValueOfCheckOut = useSelector((s: AppState) => s.panelValueOfCheckOut);
    const selectedCheckInValue = useSelector((s: AppState) => s.selectedCheckInValue);
    const selectedCheckOutValue = useSelector((s: AppState) => s.selectedCheckOutValue);
    const open = useSelector((s: AppState) => s.open);
    const rooms = useSelector((s: AppState) => s.rooms);
    const adults = useSelector((s: AppState) => s.adults);
    const childrens = useSelector((s: AppState) => s.childrens);
    const level = useSelector((s: AppState) => s.level);
    const stateOfLevelDropDown = useSelector((s: AppState) => s.stateOfLevelDropDown);
    const recommendedSelectedCity = useSelector((s: AppState) => s.recommendedSelectedCity);
    // const placeOfDeparture = useSelector((s: AppState) => s.placeOfDeparture);
    useEffect(() => {
        const f = async () => {
            const getLatAndLng = async () => getCurrentLngLat();
            const { lng, lat } = await getLatAndLng();
            const apiUrl = `http://localhost:3000/api/AmapGetArea?lng=${lng}&lat=${lat}`;
            //send a req to search for hotel
            //after receive data,set is loading to false
            const response = await fetch(apiUrl);
            const data = await response.json();
            dispatch(setPlaceOfDeparture(data.regeocode.addressComponent.province));
        }
        f();
    }, [])
    const handleCitySelect = useReservation().handleCitySelect;

    // Helper for Drodown's onOpenChange, which accepts a boolean
    const handleOpenCityOptionsChange = useReservation().handleOpenCityOptionsChange;

    const handleOpenCheckInChange = useReservation().handleOpenCheckInChange;

    const handleOpenCheckOutChange = useReservation().handleOpenCheckOutChange;
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

    useEffect(() => {
        const a = { b: "c" };
        const c = JSON.parse(JSON.stringify(a));
    }, [])
    return (
        <section
            className='flex flex-col w-full'
        >
            <div
                className={clsx(
                    // 基础布局
                    " justify-center w-full",

                    // 响应式：移动端垂直排列
                    "max-xs:flex max-xs:flex-col max-xs:items-center",
                    "min-xs:grid min-xs:grid-cols-[740px_400px]",
                    // 间距（关键修复：space-x 在 column 下失效，改用 gap）
                    "gap-4"
                )}
            >
                <div className="flex flex-col min-xs:max-w-[740px] max-xs:w-[85%]" >
                    <div
                        id="section2"
                        className={clsx(
                            // 布局定位（关键：添加 relative 和 w-full）
                            "relative w-full min-lg:h-[264px] p-2",
                            // Flex 布局
                            "flex flex-col items-center",
                            // 样式
                            "rounded-[10px] text-white text-xl",
                            "border-b border-gray-700",
                            // 背景（用 Tailwind 类替代 style）
                            "bg-cover bg-center bg-no-repeat"
                        )}
                        style={{
                            backgroundImage: `url(${backgroundImageUrl})`,
                        }}
                    >
                        <header className="mt-0 w-[90%] h-19 flex items-center ">
                            预订酒店
                        </header>
                        <div className="bg-white text-black w-[82%] rounded-[10px] min-lg:grid min-lg:grid-cols-3 max-lg:flex max-lg:flex-col ">
                            {/* City Dropdown */}
                            <div className="h-18 flex flex-col justify-center pl-[10px] 
                        max-lg:border-b 
                        min-lg:w-40 min-lg:border-r min-lg:border-dashed min-lg:border-gray-300">
                                <span className="inline-block text-base">目的/酒店名称</span>
                                <div className={` mb-0.5 ${openCityOptions ? 'border-b-3' : ''}`}>
                                    <Dropdown
                                        autoAdjustOverflow={false}
                                        trigger={['click']}
                                        open={openCityOptions}
                                        // Replace setOpenCityOptions with handler
                                        onOpenChange={handleOpenCityOptionsChange}
                                        popupRender={() => <HotelSelectedPopupRender />}
                                    >
                                        <button aria-haspopup="dialog">{selectedCity}</button>
                                    </Dropdown>
                                </div>
                            </div>
                            {/* <div className="h-8 w-px bg-gray-400 h-12"></div> */}
                            {/* Check-In Dropdown */}
                            <div className="h-18 flex flex-col justify-center pl-[10px] 
                        max-lg:border-b
                        min-lg:border-r min-lg:border-dashed min-lg:border-gray-300">
                                <span className="inline-block text-base">入住</span>
                                <div className="">
                                    <Dropdown
                                        autoAdjustOverflow={false}
                                        placement='bottomLeft'
                                        trigger={['click']}
                                        open={openCalendarOfCheckIn}
                                        // Replace setOpenCalendarOfCheckIn with handler
                                        onOpenChange={handleOpenCheckInChange}
                                        popupRender={() => <CheckInCalendar></CheckInCalendar>}
                                    >
                                        <button id="check-in-btn" aria-haspopup="dialog" type='button'>{selectedCheckInValue ? dayjs(selectedCheckInValue).format('YYYY-MM-DD') : dayjs(panelValueOfCheckIn).format('YYYY-MM-DD')}</button>
                                    </Dropdown>
                                </div>
                            </div>
                            {/* <div className="w-8 ml-2 mr-2">1</div> */}
                            {/* Check-Out Dropdown */}
                            <div className="h-18 pl-[10px] flex flex-col justify-center col-span-1">
                                <span className="inline-block text-base">退房</span>
                                <div className="">
                                    <Dropdown
                                        autoAdjustOverflow={false}
                                        placement="bottomRight"
                                        trigger={['click']}
                                        open={openCalendarOfCheckOut}
                                        // Replace setOpenCalendarOfCheckOut with handler
                                        onOpenChange={handleOpenCheckOutChange}
                                        popupRender={() => <CheckOutCalendar></CheckOutCalendar>}
                                    // getPopupContainer={() =>document.body }
                                    >
                                        <button className=''>{selectedCheckOutValue ? dayjs(selectedCheckOutValue).format('YYYY-MM-DD') : dayjs(panelValueOfCheckOut).format('YYYY-MM-DD')}</button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div
                            id="section2-2"
                            className={clsx(
                                // 基础样式
                                "rounded-[10px] text-xl mt-3 w-[100%] bg-white text-black",
                                // 小屏（<1024px）：Flex 纵向排列
                                "max-lg:flex max-lg:flex-col max-lg:w-[82%]",
                                // 大屏（≥1024px）：Grid 四列，固定宽高
                                "min-lg:grid min-lg:grid-cols-4 min-lg:w-[82%] min-lg:h-[28%]"
                            )}
                        >       {/* Rooms/Guests Dropdown */}
                            <div className="h-18 pl-[10px] 
                        max-lg:border-b
                        min-lg:border-r min-lg:border-dashed min-lg:border-gray-300">
                                <span className="inline-block text-base mt-2.5">房间及住客</span>
                                <div className="flex flex-row items-center">
                                    <CountDropDown
                                        open={open}
                                        setOpen={(value: boolean) => setOpenState(dispatch, value)}
                                        adults={adults}
                                        setAdults={(value: number) => setAdultsState(dispatch, value)}
                                        childrens={childrens}
                                        setChildrens={(value: number) => setChildrensState(dispatch, value)}
                                        rooms={rooms}
                                        setRooms={(value: number) => setRoomsState(dispatch, value)}
                                    />
                                </div>
                            </div>
                            {/* <div className="h-8 w-px bg-gray-400 h-12"></div> */}
                            {/* Hotel Level Dropdown */}
                            <div className="h-18 pl-[10px] flex flex-col justify-center 
                        max-lg:border-b
                        min-lg:border-r min-lg:border-dashed min-lg:border-gray-300">
                                <span className="inline-block text-base">酒店类型</span>
                                <div className="">
                                    {/* {level} */}
                                    <LevelOfHotelDropDown
                                        open={stateOfLevelDropDown} // Use state.open from the unified state
                                        // Dispatch SET_OPEN action
                                        setOpen={() => setLevelDropDownOpenState(dispatch, !stateOfLevelDropDown)}
                                        level={level} // Use state.level from the unified state
                                        // Dispatch SET_LEVEL action
                                        setLevel={(newLevel: string) => setLevelState(dispatch, newLevel)}
                                    />
                                </div>
                            </div>
                            {/* Keywords/GeoBox */}
                            <div className="flex flex-col justify-center  h-18 pl-[10px]">
                                <span className="inline-block text-base">关键词</span>
                                <div className="">
                                    <SeachGeoBox
                                    />
                                </div>
                            </div>
                            <button
                                className='h-18 min-lg:ml-3 min-lg:rounded-r-[10px] max-lg:rounded-[10px] bg-green-600 bg-gradient-to-r from-blue-400 to-blue-600 '
                            >
                                搜索
                            </button>
                        </div>
                    </div>
                    <div id="section9" className="w-[100%] h-33 text-white text-xl rounded-[15px] overflow-hidden mt-3.5">
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
                    <div id="section10" className="flex max-lg:flex-col w-1/1 min-h-[76px] rounded-[15px] overflow-hidden position:relative mt-3.5 space-y-2 space-x-4" style={{ position: "relative" }}>
                        <article className='relative min-lg:w-31/64 max-lg:w-full'>
                            <div
                                className="max-lg:w-full h-[76px] inset-0 absolute z-0 rounded-[15px]"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(255,255,255,1) 75%, rgba(255,255,255,1) 100%), url(/bg-ai_travel_asistent.jpg)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    cursor: 'pointer'
                                }}
                            />
                            <div className='relative flex flex-row h-[76px] border border-blue-200 items-center max-lg:w-full rounded-[15px]' style={{ zIndex: "1000000", cursor: 'pointer' }}>
                                <RobotFilled style={{ fontSize: '16px', color: '#18191bff', marginLeft: "15px" }}></RobotFilled>
                                <div style={{ fontSize: '16px', marginLeft: "10px" }}>Ai行程助手</div>
                                <div style={{ color: "grey", marginLeft: "auto" }}>一站式打造完美旅程<RightOutlined style={{ backgroundColor: "rgb(169,200,225)", borderRadius: "15px", color: "white", marginRight: "10px" }}></RightOutlined></div>
                            </div>
                        </article>
                        <article className='relative min-lg:w-31/64 max-lg:w-full'>
                            <div
                                className="w-full h-[76px]  absolute z-0 right-0 rounded-[15px]"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(255,255,255,1) 75%, rgba(255,255,255,1) 100%), url(/bg-travel_map.jpg)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    zIndex: "0",
                                }}
                            />
                            <div className='relative flex flex-row h-[76px] border border-pink-200 items-center w-full rounded-[15px] ml-auto' style={{ zIndex: "1000000", cursor: 'pointer' }}>
                                <EnvironmentOutlined style={{ fontSize: '16px', color: '#18191bff', marginLeft: "15px" }}></EnvironmentOutlined>
                                <div style={{ fontSize: '16px', marginLeft: "10px" }}>旅游地图</div>
                                <div style={{ color: "grey", marginLeft: "auto" }}>探索 好去处<RightOutlined style={{ backgroundColor: "rgb(169,200,225)", borderRadius: "15px", color: "white", marginRight: "10px" }}></RightOutlined></div>
                            </div>
                        </article>
                    </div>
                    {/* <div className='flex flex-row text-xl h-[340px] w-full mt-3.5' id="section10"> */}
                    <HotelRecommendationBar></HotelRecommendationBar>
                    <TripTicketRecommendation></TripTicketRecommendation>
                </div>
                {/* Component 2: Set to half width (w-1/2) */}
                <div className=" space-y-4 flex flex-col max-xs:w-full"> {/* Added space-y-4 for vertical gap */}
                    {/* Component 1 (The Slider) */}
                    <div className="grow max-xs:flex max-xs:items-center max-xs:w-full">
                        <SliderComercial></SliderComercial>
                    </div>
                    {/* Component 2 (The New Content, placed vertically below the slider) */}
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mt-auto mb-4">
                        <h3 className="text-lg font-semibold text-yellow-800">Welcome to ticket booker</h3>
                        <p className="text-sm text-yellow-700">enjoy your journey</p>
                    </div>
                    <div>
                    </div>
                </div>
                <IntroBar></IntroBar>
            </div>
        </section >

    );
};

export default TopArea;