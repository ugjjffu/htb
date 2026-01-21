import { Dropdown, Button, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '@/css/CityDropDown.css';
import React, { useState } from 'react';
import { pad } from 'lodash';
import { useDispatch } from 'react-redux';
import { setShowMoreCityOfPlaceOfDeparture } from '@/reducer/action';
const { Text } = Typography;

export type City = string;

export interface CityGridProps {
    onSelectHotCity: (city: City) => void;
    selectedHotCity: City;
    cityList: City[];
    width:string;
}

const CityGrid: React.FC<CityGridProps> = ({ onSelectHotCity, selectedHotCity, cityList,width }) => {
    const style: string = 'border-dotted border-gray-400 cursor-pointer';
    const [hoveredCity, setHoveredCity] = useState<City | null>(null);
      const dispatch = useDispatch();
    return (
        // The custom class 'city-grid' handles the rectangular layout
        <section className={`grid grid-cols-6 pl-0 w-[590px]`}>
            {cityList.map((city) => (
                <button
                    key={'recommended' + city}
                    style={{width:`${width}px`}}
                    className={`h-8 border ${hoveredCity === city ? style : "border-white"} flex items-center`}
                    onClick={() => {onSelectHotCity(city);dispatch(setShowMoreCityOfPlaceOfDeparture(false));}}
                >
                    {city}
                </button>
            ))}
        </section>
    );
}

export default CityGrid;