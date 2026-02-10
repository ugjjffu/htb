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

const CityGrid: React.FC<CityGridProps> = ({ onSelectCity, selectedCity }) => {
    const style: string = 'border-dotted border-gray-400 cursor-pointer';
    const [hoveredCity, setHoveredCity] = useState<City | null>(null);
    return (
        // The custom class 'city-grid' handles the rectangular layout
        <section className="  grid grid-cols-5 max-[600px]:grid-cols-2 pl-[3px]">
            {cityList.map((city) => (
                <span
                    className={`w-26.3 max-[600px]:w-20 h-8 border ${hoveredCity === city ? style : "border-white"}`}
                    key={city}
                    onClick={() => onSelectCity(city)}
                    onMouseEnter={() => setHoveredCity(city)}
                    onMouseLeave={() => setHoveredCity(null)}
                >
                    {city}
                </span>
            ))}
        </section>
    );
}

export default CityGrid;