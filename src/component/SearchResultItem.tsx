import React from 'react';
export interface Tip {
  id: string;               // 高德 POI ID，无数据时为空字符串 ""
  name: string;             // 名称
  district: string;         // 省市区文字
  adcode: string;           // 行政区代码
  location: string;         // "lng,lat"
  address: string;          // 详细地址
  typecode: string;         // 分类代码
  city: string[];           // 城市数组（接口返回为空数组 []）
}
import { HomeOutlined,CompassOutlined} from '@ant-design/icons';
const SearchResultItem: React.FC<Tip> = (item:Tip) => {
    return (
        <section className={`w-full h-8 p-1 flex flex-row justify-center items-center`}>
            <div className={`w-10 h-full`}>
                {item.typecode==="100100"||item.typecode==="100200"?<HomeOutlined></HomeOutlined>:<CompassOutlined></CompassOutlined>}
            </div>
            <div className={`h-full ml-3 w-110`}>
                {item.address}
            </div>
            <div className='mr-auto text-align: center; w-8'>{item.typecode==="100100"||item.typecode==="100200"?'酒店':'地标'}</div>
        </section>
    );
};

export default SearchResultItem;