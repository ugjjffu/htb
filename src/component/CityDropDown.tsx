import { Dropdown, Button, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '@/css/CityDropDown.css';
import React, { useState } from 'react';

const { Text } = Typography;

export type City = string;

interface CityGridProps {
  onSelectCity: (city: City) => void;
  selectedCity: City;
}

const cityList: City[] = [
  'New York', 'Los Angeles', 'Chicago', 'Houston',
  'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego',
  'Dallas', 'San Jose', 'Austin', 'Jacksonville',
];

const CityGrid:React.FC<CityGridProps>=({onSelectCity,selectedCity})=>{
    const style:string='border-dotted border-gray-400 cursor-pointer';
    const [hoveredCity, setHoveredCity] = useState<City | null>(null);
    return (
        // The custom class 'city-grid' handles the rectangular layout
        <div className="city-grid">
        {cityList.map((city) => (
            <span
                className={`w-26.3 h-8 border ${hoveredCity===city?style:"border-white"}`}
                key={city}
                onClick={() => onSelectCity(city)}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
            >
                {city}
            </span>
        ))}
        </div>
    );
}

export default CityGrid;