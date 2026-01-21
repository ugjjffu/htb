import { Dropdown, Button, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '@/css/CityDropDown.css';
import React, { useState } from 'react';
import CityCatogorySelector from './CityCatogorySelector';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { hotCityMap, hotCities, nonMainlandHotCities } from '@/data/data'
import {
    AppState,
} from '@/reducer/HotelReservationReducer';
import SelectHotCity from './SelectHotCityGrid';
import { CityGridProps } from './SelectHotCityGrid';
import { setSelectedHotCity } from '@/reducer/action';
export interface CityGridWithLetterProps extends CityGridProps {
    letter: string;
}
export interface MutipleCityGridWithLetterProps {
    width: string;
    selectedHotCity: string;
    letters: string[]; // or `string[] | []` if you really mean empty tuple
    globalDispatch: Dispatch; // <-- add the dispatch prop
    hotCityMap: Record<string, string[]>;
}
enum Category { Hot = '1', ABCDEF = '2', GHIJ = '3',KLMN = '4', PQRSTUVW= '5',XYZ='6'}
const SelectHotCityWithFirstLetterGrid: React.FC<CityGridWithLetterProps> = ({ onSelectHotCity, selectedHotCity, cityList, width, letter }) => {
    return (
        <div className='flex flex-row'>
            <div className='h-8 w-4 text-center flex items-center'>{letter}</div>
            <div className='ml-4'>
                <SelectHotCity
                    onSelectHotCity={onSelectHotCity}
                    selectedHotCity={selectedHotCity}
                    cityList={cityList}
                    width={width}
                />
            </div>
        </div>
    );
};
const MultipleSelectHotCityWithFirstLetterGrid: React.FC<MutipleCityGridWithLetterProps> = ({ selectedHotCity, width, letters, globalDispatch, hotCityMap }) => {
    return (
        <div className='flex flex-col'>
            {letters.map((ltr: string) =>
                hotCityMap[ltr]?.length ? (
                    <SelectHotCityWithFirstLetterGrid
                        key={ltr}
                        selectedHotCity={selectedHotCity}
                        onSelectHotCity={(value: string) =>
                            globalDispatch({ type: 'SET_SELECTED_HOT_CITY', payload: value })
                        }
                        cityList={hotCityMap[ltr]}
                        width={width}
                        letter={ltr}
                    />
                ) : null
            )}
        </div>
    );
};
const CityGrid: React.FC = ({ }) => {
    const globalDispatch = useDispatch();
    const setSelectedCategoryOfCity = (value: string) => { globalDispatch({ type: 'SET_SELECTED_CATEGORY_OF_CITY', payload: value }) };
    // const style: string = 'border-dotted border-gray-400 cursor-pointer';
    const categoryOfCity = useSelector((s: AppState) => s.selectedCategoryOfCity);
    const isChineseMainland = useSelector((s: AppState) => s.isChineseMainland);
    const selectedHotCity = useSelector((s: AppState) => s.selectedHotCity);
    return (
        <div className="flex flex-row w-197 min-w-[57px] overflow-y-scroll bg-white border-gray-300 border-md rounded-md shadow-xl">
            <div className='flex flex-col w-27 bg-gray-200 p-2'>
                <div className='p-2 bg-blue-500 mt-2 rounded-md text-white'
                    onClick={() => { globalDispatch({ type: 'SET_IS_CHINESE_MAINLAND', payload: true }) }}
                >国内</div>
                <div className='p-2 bg-blue-500 mt-2 rounded-md text-white'
                    onClick={() => { globalDispatch({ type: 'SET_IS_CHINESE_MAINLAND', payload: false }) }}
                >
                    <span className='block'>{"国际以及"}</span>
                    <span className='block' >{"中国港澳台"}</span>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex flex-row'>
                    {isChineseMainland ?
                        <CityCatogorySelector options={['热门', 'ABCDEF', 'GHIJ', 'KLMN', 'PQRSTUVW', 'XYZ']} setState={setSelectedCategoryOfCity} choosenCategory={categoryOfCity}></CityCatogorySelector> : <CityCatogorySelector options={['国际*中国港澳台热门', '亚洲', '欧洲', '美洲', '非洲', '大洋洲']} setState={setSelectedCategoryOfCity} choosenCategory={categoryOfCity}></CityCatogorySelector>}
                </div>
                <div className='w-full h-px bg-gray-300' />
                <div className='flex items-center justify-center w-full h-full'>
                    {isChineseMainland && categoryOfCity === Category.Hot ? <SelectHotCity selectedHotCity={selectedHotCity} onSelectHotCity={(value: string) => { globalDispatch(setSelectedHotCity(value)) }} cityList={hotCities} width='94'></SelectHotCity> : <div />}
                    {!isChineseMainland && categoryOfCity === Category.Hot ? <SelectHotCity selectedHotCity={selectedHotCity} onSelectHotCity={(value: string) => { globalDispatch(setSelectedHotCity(value)) }} cityList={nonMainlandHotCities} width='94'></SelectHotCity> : <div />}
                    {isChineseMainland && categoryOfCity === Category.ABCDEF ? <MultipleSelectHotCityWithFirstLetterGrid selectedHotCity={selectedHotCity} hotCityMap={hotCityMap} width='78' letters={['A', 'B', 'C', 'D', 'E', 'F']} globalDispatch={globalDispatch}></MultipleSelectHotCityWithFirstLetterGrid> : <div />}
                    {isChineseMainland && categoryOfCity === Category.GHIJ ? <MultipleSelectHotCityWithFirstLetterGrid selectedHotCity={selectedHotCity} hotCityMap={hotCityMap} width='78' letters={['G', 'H', 'I', 'J']} globalDispatch={globalDispatch}></MultipleSelectHotCityWithFirstLetterGrid> : <div />}
                    {isChineseMainland && categoryOfCity === Category.KLMN ? <MultipleSelectHotCityWithFirstLetterGrid selectedHotCity={selectedHotCity} hotCityMap={hotCityMap} width='78' letters={['K', 'L', 'M', 'N']} globalDispatch={globalDispatch}></MultipleSelectHotCityWithFirstLetterGrid> : <div />}
                    {isChineseMainland && categoryOfCity === Category.PQRSTUVW ? <MultipleSelectHotCityWithFirstLetterGrid selectedHotCity={selectedHotCity} hotCityMap={hotCityMap} width='78' letters={['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']} globalDispatch={globalDispatch}></MultipleSelectHotCityWithFirstLetterGrid> : <div />}
                    {isChineseMainland && categoryOfCity === Category.XYZ ? <MultipleSelectHotCityWithFirstLetterGrid selectedHotCity={selectedHotCity} hotCityMap={hotCityMap} width='78' letters={['X', 'Y', 'Z']} globalDispatch={globalDispatch}></MultipleSelectHotCityWithFirstLetterGrid> : <div />}
                    {!isChineseMainland && categoryOfCity === Category.ABCDEF ? <SelectHotCity selectedHotCity={selectedHotCity} onSelectHotCity={(value: string) => { globalDispatch(setSelectedHotCity(value)) }} cityList={hotCityMap['亚洲']} width='94'></SelectHotCity> : <div />}
                    {!isChineseMainland && categoryOfCity === Category.GHIJ ? <SelectHotCity selectedHotCity={selectedHotCity} onSelectHotCity={(value: string) => { globalDispatch(setSelectedHotCity(value)) }} cityList={hotCityMap['欧洲']} width='94'></SelectHotCity> : <div />}
                    {!isChineseMainland && categoryOfCity === Category.KLMN ? <SelectHotCity selectedHotCity={selectedHotCity} onSelectHotCity={(value: string) => { globalDispatch(setSelectedHotCity(value)) }} cityList={hotCityMap['美洲']} width='94'></SelectHotCity> : <div />}
                    {!isChineseMainland && categoryOfCity === Category.PQRSTUVW ? <SelectHotCity selectedHotCity={selectedHotCity} onSelectHotCity={(value: string) => { globalDispatch(setSelectedHotCity(value)) }} cityList={hotCityMap['非洲']} width='94'></SelectHotCity> : <div />}
                    {!isChineseMainland && categoryOfCity === Category.XYZ ? <SelectHotCity selectedHotCity={selectedHotCity} onSelectHotCity={(value: string) => { globalDispatch(setSelectedHotCity(value)) }} cityList={hotCityMap['大洋洲']} width='94'></SelectHotCity> : <div />}
                </div>
            </div>
        </div>
    );
}
export { SelectHotCityWithFirstLetterGrid };
export default CityGrid;