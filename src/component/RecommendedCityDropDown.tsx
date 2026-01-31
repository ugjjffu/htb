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
 '深圳',
  '成都', '重庆', '杭州', '武汉',
  '西安', '苏州', '天津', '南京',
  '郑州', '长沙', '青岛', '合肥',
  '佛山', '宁波', '东莞',
  '昆明', '福州', '无锡', '厦门',
  '济南', '大连', '哈尔滨', '长春',
  '温州', '石家庄', '南宁', '贵阳',
  '金华', '常州', '嘉兴', '台州',
  '徐州', '海口', '兰州', '太原',
  '惠州', '珠海', '中山', '保定',
  '廊坊', '桂林', '南昌', '乌鲁木齐',
  '绍兴', '泉州',
  '潍坊', '扬州', '海口', '洛阳',
  '唐山', '呼和浩特', '包头', '银川',
  '淄博', '临沂', '济宁', '威海',
  '芜湖', '滁州', '阜阳', '漳州',
  '赣州', '宜昌', '襄阳', '岳阳',
  '常德', '衡阳', '株洲', '镇江',
  '盐城', '泰州', '淮安', '连云港',
  '宿迁', '江门', '湛江', '肇庆',
  '柳州', '桂林', '北海', '三亚',
  '绵阳', '南充', '宜宾', '遵义',
  '芜湖', '马鞍山', '安庆', '六安',
  '沧州', '邯郸', '邢台', '秦皇岛',
  '大庆', '齐齐哈尔', '牡丹江'
];

const CityGrid:React.FC<CityGridProps>=({onSelectCity,selectedCity})=>{
    const style:string='border-dotted border-gray-400 cursor-pointer';
    const [hoveredCity, setHoveredCity] = useState<City | null>(null);
    return (
        // The custom class 'city-grid' handles the rectangular layout
        <section className="city-grid">
        {cityList.map((city,i) => (
            <span
                key={'recommended'+city+i}
                className={`w-26.3 h-8 border ${hoveredCity===city?style:"border-white"}`}
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