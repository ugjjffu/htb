'use client';
import React, { useEffect, useReducer, useState } from 'react';
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
import { Dayjs } from 'dayjs'; // Import dayjs and Dayjs for type usage
import SliderComercial from "@/component/SliderCommercial"; // Added missing import
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'; // Added missing import
import { RobotFilled, RightOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { relative } from 'path';
import CityButton from '../component/CityButton';
import RecommendedCityDropDown from '../component/RecommendedCityDropDown';
import { useDispatch, useSelector } from 'react-redux';
import HotelItem from '../component/HotelItem';
export const HotelRecommendationBar = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const choosenCity = useSelector((s: AppState) => s.choosenCity);
    const showMoreOpen = useSelector((s: AppState) => s.showMoreOpen);
    const [width, setWidth] = useState(
        0
    );
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        // Set initial
        handleResize();

        // Listen
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const globalDispatch = useDispatch();
    // const host= process.env.NEXT_PUBLIC_HOST;
    useEffect(() => {
        // alert(choosenCity);
        fetch(`/api/AmapGetRecommendedCity?city=${encodeURIComponent(
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
                // alert(typeof (data.pois));
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
        <section className='flex flex-col text-xl min-[871px]:h-[340px] w-full mt-3.5' id="section10">
            <div className='flex flex-row text-xl h-[33px] w-full mt-3.5' id="section10">
                <span className=''>酒店</span>
                <span className='text-orange-500'>推荐</span>
                <div className='flex flex-row-reverse ml-auto min-[871px]:w-[340px]'>
                    <Dropdown
                        autoAdjustOverflow={false}
                        // Control the visibility manually
                        placement="bottomRight"
                        open={showMoreOpen}
                        onOpenChange={(newOpen: boolean) => { globalDispatch({ type: 'SET_SHOW_MORE_OPEN', payload: newOpen }); }}
                        trigger={['click']}
                        // Inject the custom content
                        popupRender={recommendedCitySelectedPopupRender}
                    >
                        <button
                            style={{ width: "60px", height: "28px", fontSize: "16px", cursor: "pointer" }}
                        >
                            更多{showMoreOpen ? <CaretUpOutlined className="text-blue-500 text-sm" /> : <CaretDownOutlined className="text-sm" />}
                        </button>
                    </Dropdown>
                    <CityButton
                        buttonSize='123'
                        buttonText={state.recommendedSelectedCity}
                    ></CityButton>
                    {
                        width >= 871 && <CityButton
                            buttonSize='123'
                            buttonText='广州'
                        ></CityButton>
                    }
                    {
                        width >= 871 && <CityButton
                            buttonSize='123'
                            buttonText='上海'
                        ></CityButton>
                    }
                    <CityButton
                        buttonSize='123'
                        buttonText='北京'
                    ></CityButton>
                </div>
            </div>
            <div className={`${width >= 871 ? 'h-[310px]' : ''} mt-3`}>
                {
                    width < 871 && (
                        <Carousel
                            dots={{ className: 'my-dots' }}
                            autoplay
                            adaptiveHeight
                            vertical
                            verticalSwiping
                            slidesToShow={1}  // 改为 1，每次只显示一组
                            slidesToScroll={1}  // 改为 1，每次滚动一组
                        >
                            <div className='flex flex-col'>
                                {Array.from({ length: 3 }, (_, i) => (
                                    <HotelItem key={`recommendedHotel-${i}`} seq={i} />
                                ))}
                            </div>
                            <div className='flex flex-col'>
                                {Array.from({ length: 3 }, (_, i) => (
                                    <HotelItem key={`recommendedHotel-${i + 3}`} seq={i + 3} />
                                ))}
                            </div>
                        </Carousel>
                    )}
                {
                    width >= 871 && (
                        <Carousel
                            dots={{ className: 'my-dots' }}
                            autoplay
                            adaptiveHeight
                            slidesToShow={3}  // 改为 1，每次只显示一组
                            slidesToScroll={3}  // 改为 1，每次滚动一组
                        >
                            {Array.from({ length: 6 }, (_, i) => (
                                <HotelItem key={`recommendedHotel-${i}`} seq={i} />
                            ))}
                        </Carousel>
                    )}

            </div>
            {/* <CaretUpOutlined></CaretUpOutlined>
                    <CaretDownOutlined></CaretDownOutlined> */}
        </section >
    )
}
