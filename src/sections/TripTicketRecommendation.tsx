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
import CitySelectionForTripDropDown from '../component/CitySelectionForTripDropDown';
import { HotChinaCity } from '@/data/data';
import { SwapOutlined, RetweetOutlined, LinkOutlined } from '@ant-design/icons'
import { setPlaceOfDeparture, setShowMoreCityOfPlaceOfDeparture } from '@/reducer/action';
import { cities } from '@/data/data'
const colorMap: Record<number, string> = { 1: "bg-[rgb(246,59,46)]", 2: "bg-[rgb(255,139,38)]", 3: "bg-[rgb(255,182,62)]", 4: "bg-[rgb(153,174,202)]", 5: "bg-[rgb(153,174,202)]", };
const OriginCitySelectedPopupRender = () => (
    <CitySelectionForTripDropDown></CitySelectionForTripDropDown>
);
interface TripTicketProps { seq: number; startDate: DateTuple; endDate: DateTuple; price: number; priceBeforeDiscount: number; placeOfDeparture: string; destination: string, pictureOfDestination: string }

type Range<N extends number, Result extends number[] = []> = Result['length'] extends N ? Result[number] : Range<N, [...Result, Result['length']]>;
type Month = Exclude<Range<13>, 0>;
type Day = Exclude<Range<32>, 0>; // 1–31
type DateTuple = [Month, Day];
async function getSHA256Number(str: string): Promise<number> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Interpret the first 4 bytes as a signed 32-bit integer
    const intArray = new Int32Array(hashBuffer);
    return Math.abs(intArray[0]);
}
export const TripTicketItem = ({ seq, startDate, endDate, price, priceBeforeDiscount, placeOfDeparture, destination, pictureOfDestination }: TripTicketProps) => {
    return (
        <div className='relative flex flex-row h-[83px] w-full'>
            <div className={`absolute top-1 left-0 text-black text-[10px] font-bold rounded-tr-xl rounded-br-xl px-2 py-1 ${colorMap[seq]}`}>
                {seq}
            </div>
            <img alt='' src={pictureOfDestination} className='w-[80px] h-[80px] rounded-[7px]'></img>
            <div className='grid grid-rows-3 px-4 w-[75%] max-[744px]:w-[80%] h-full text-[13px]'>
                <div className='flex flex-row items-baseline'>
                    <div className='font-bold'>
                        {placeOfDeparture}
                        <SwapOutlined style={{ fontSize: '16px', color: 'black' }} />
                        {destination}
                    </div>
                    <div className='flex flex-row ml-auto items-baseline text-blue-500'>¥<span className='text-[16px] font-bold'>{price}</span><span className=''>起</span></div>
                </div>
                <div className='flex flex-row text-[12px] items-baseline'>
                    <div className='text-green-500 border rounded-[5px] border-green-300 p-0.5'>网站精选</div>
                    <div className='ml-auto'>{((price / priceBeforeDiscount) * 10).toFixed(1)}折</div>
                </div>
                <div className='text-[12px]'>
                    {startDate[0] + "-" + startDate[1]}<span className="px-1">去</span>
                    {endDate[0] + "-" + endDate[1]}回
                </div>
            </div>
        </div>
    );
}
export const TripTicketRecommendation = () => {
    const dispatch = useDispatch();
    const { choosenCity, placeOfDeparture, showMoreOpen } = useSelector(
        (s: AppState) => ({
            choosenCity: s.choosenCity,
            placeOfDeparture: s.placeOfDeparture,
            showMoreOpen: s.showMoreCityOfPlaceOfDeparture,
        })
    );
    const globalDispatch = useDispatch();
    const startDate: DateTuple = [10, 10];
    const endDate: DateTuple = [10, 12];
    const [TripTicket, setTripTicket] = useState(['广西', '上海', '重庆', '新加坡', '缅甸']);
    const [pictureOfDestination, setPictureOfDestination] = useState(['/city_pictures/1.webp', '/city_pictures/2.webp', '/city_pictures/3.webp', '/city_pictures/4.webp', '/city_pictures/5.webp']);
    useEffect(() => {
        const a = async () => {
            const hash_code = await getSHA256Number(placeOfDeparture);
            setTripTicket([cities[hash_code % cities.length], cities[(hash_code % cities.length + 1) % cities.length], cities[(hash_code % cities.length + 2) % cities.length], cities[(hash_code % cities.length + 3) % cities.length], cities[(hash_code % cities.length + 4) % cities.length]]);
            setPictureOfDestination([`/city_pictures/${hash_code % 10 + 1}.webp`, `/city_pictures/${(hash_code + 1) % 10 + 1}.webp`, `/city_pictures/${(hash_code + 2) % 10 + 1}.webp`, `/city_pictures/${(hash_code + 3) % 10 + 1}.webp`, `/city_pictures/${(hash_code + 4) % 10 + 1}.webp`]);
        }
        a();
    }, [placeOfDeparture]);
    return (
        <div className='flex flex-col text-xl w-full mt-3.5'>
            <div className='flex flex-row text-xl h-[33px] w-full mt-3.5 items-baseline' id="section10">
                <span className=''>当季</span>
                <span className='text-orange-500'>热推</span>
                <div className="flex items-center ml-auto items-baseline">
                    <div className='text-sm min-[744px]:ml-5 max-[744px]:mr-2'>出发地</div>
                    <div className='flex'>
                        <Dropdown
                            autoAdjustOverflow={false}
                            // Control the visibility manually
                            placement="bottomRight"
                            open={showMoreOpen}
                            onOpenChange={(newOpen: boolean) => { dispatch(setShowMoreCityOfPlaceOfDeparture(newOpen)); }}
                            trigger={['click']}
                            // Inject the custom content
                            popupRender={()=><OriginCitySelectedPopupRender></OriginCitySelectedPopupRender>}
                        >
                            <input
                                className='ml-2 w-15' value={placeOfDeparture}
                                onChange={e => dispatch(setPlaceOfDeparture(e.target.value))}
                            ></input>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className='flex max-[744px]:flex-col w-full min-[744px]:space-x-4 max-[744px]:space-y-4'>
                <div className='min-[744px]:w-[48%]  flex flex-col bg-[rgb(243,245,253)] rounded-[10px] p-2'>

                    <div className='flex flex-row items-center '>
                        <img src="/TripTicketRecomendation2.png" width="96px" height="76px"></img>
                        <div>周末畅游 特价机票</div>
                    </div>
                    <div className='flex flex-col p-2 h-full w-full'>
                        <div className='space-y-2'>
                            {Array.from({ length: 5 }, (_, i) => (
                                <TripTicketItem key={i} seq={i + 1} startDate={startDate} endDate={endDate} price={300} priceBeforeDiscount={500} placeOfDeparture={placeOfDeparture} destination={TripTicket[i]} pictureOfDestination={pictureOfDestination[i]} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='min-[744px]:w-[48%]  flex flex-col bg-[rgb(243,245,253)] rounded-[10px] p-2 min-[744px]:ml-auto'>

                    <div className='flex flex-row items-center '>
                        <img src="/TripTicketRecomendation2.png" width="96px" height="76px"></img>
                        <div>周末畅游 特价机票</div>
                    </div>
                    <div className='flex flex-col p-2 h-full w-full'>
                        <div className='space-y-2'>
                            {Array.from({ length: 5 }, (_, i) => (
                                <TripTicketItem key={i} seq={i + 1} startDate={startDate} endDate={endDate} price={300} priceBeforeDiscount={500} placeOfDeparture={placeOfDeparture} destination={TripTicket[i]} pictureOfDestination={pictureOfDestination[i]} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}