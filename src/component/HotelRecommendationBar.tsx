'use client';
import React, { useEffect, useReducer } from 'react';
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
export const HotelRecommendationBar = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const choosenCity = useSelector((s: AppState) => s.choosenCity);
    const globalDispatch = useDispatch();
    useEffect(() => {
        // alert(choosenCity);
        fetch(
            `http://localhost:3000/api/AmapGetRecommendedCity?city=${encodeURIComponent(
                `${choosenCity}`
            )}&page=1&pageSize=500`,
            { cache: 'no-store' }
        )
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json(); // <- returns the array you passed to res.json(list)
            })
            .then((data) => {
                // alert(JSON.stringify(data.pois));
                alert(typeof (data.pois));
                globalDispatch({ type: 'SET_RECOMMENDED_HOTEL_DETAILS', payload: JSON.stringify(data.pois) })
                // sessionStorage.setItem('recommendedCity', JSON.stringify(data.pois));
                // console.log('recommended cities:', JSON.parse(sessionStorage.getItem('recommendedCity') || ''));
                // setState(data)  <-- do whatever you need with the JSON
            })
            .catch((err) => console.error('fetch error:', err));
    }, [choosenCity]);
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
    return (
        <div className='flex flex-col text-xl h-[340px] w-full mt-3.5' id="section10">
            <div className='flex flex-row text-xl h-[33px] w-full mt-3.5' id="section10">
                <span className=''>酒店</span>
                <span className='text-orange-500'>推荐</span>
                <div className='flex flex-row-reverse ml-auto w-[340px]'>
                    <Dropdown
                        autoAdjustOverflow={false}
                        // Control the visibility manually
                        placement="bottomRight"
                        open={state.showMoreOpen}
                        onOpenChange={() => { dispatch({ type: 'SET_SHOW_MORE_OPEN', payload: !state.showMoreOpen }); }}
                        trigger={['click']}
                        // Inject the custom content
                        popupRender={recommendedCitySelectedPopupRender}
                    >
                        <button
                            style={{ width: "60px", height: "28px", fontSize: "16px", cursor: "pointer" }}
                            onClick={() => { dispatch({ type: 'SET_SHOW_MORE_OPEN', payload: !state.showMoreOpen }); }}
                        >
                            更多{state.showMoreOpen ? <CaretUpOutlined className="text-blue-500 text-sm" /> : <CaretDownOutlined className="text-sm" />}
                        </button>
                    </Dropdown>
                    <CityButton
                        buttonSize='123'
                        buttonText={state.recommendedSelectedCity}
                    ></CityButton>
                    <CityButton
                        buttonSize='123'
                        buttonText='广州'
                    ></CityButton>
                    <CityButton
                        buttonSize='123'
                        buttonText='上海'
                    ></CityButton>
                    <CityButton
                        buttonSize='123'
                        buttonText='北京'
                    ></CityButton>
                </div>
            </div>
            <div className='h-[310px] mt-3'>
                <Carousel
                    dots={{ className: 'my-dots' }}
                    autoplay
                    slidesToShow={3}
                    slidesToScroll={3}
                >
                    {Array.from({ length: 6 }, (_, i) => (
                        <HotelItem key={"recommendedHotel" + i} seq={i} />
                    ))}
                    {/* <CaretUpOutlined></CaretUpOutlined>
                    <CaretDownOutlined></CaretDownOutlined> */}
                </Carousel>
            </div>
        </div>
    )
}