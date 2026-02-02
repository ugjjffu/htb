'use client'
import { Image } from 'antd'
import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  initialState,
  reducer, // This is assumed to be the unified appReducer
  AppState
} from '@/reducer/HotelReservationReducer';
interface CityButtonProps {
  seq: number
}
const HotelItem: React.FC<CityButtonProps> = ({ seq }) => {
  const recommendedHotelDetail = useSelector((s: AppState) => s.recommendedHotelDetail);
  const dispatch = useDispatch();
  //   alert(recommendedHotelDetail[0]);
  const data = recommendedHotelDetail == "" ? null : JSON.parse(recommendedHotelDetail)[seq];
  const cnNum: Record<string, number> = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  function stringToRange500_1000(str = '') {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(31, h) + str.charCodeAt(i) | 0;   // simple 32-bit hash
    }
    // map full 32-bit space onto 501 buckets (500-1000)
    return 500 + (Math.abs(h) % 501);
  }
  // 提取并转换
  const star = (() => {
    const str = data?.type ?? '';
    const m = str.match(/([一二三四五六七八九])星(?:级)?/);   // 捕获中文数字
    if (!m) return '🟠🟠🟠🟠🟠';                     // 无星级 → 5 个橙圆
    const n = cnNum[m[1]];
    return '💎'.repeat(Math.min(n, 9));              // 有星级 → n 个钻石
  })();
  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  return (
    <div className='flex flex-col  min-[871px]:w-60 max-[871px]:w-[100%] h-70 max-[871px]:h-90 overflow-hidden mr-3 rounded-xl overflow-hidden text-sm font-bold border border-gray-200 shadow-lg cursor-pointer'
      onClick={async () => {
        try {
          const response = await fetch('/api/dynamicCheckout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amountPrice: 30000, // Replace with your actual Stripe Price ID
            }),
          })
          if (response.status === 401) {
            alert('请先登录')
            window.location.href = '/sign-in'
            return ;
          }
          const data = await response.json()

          if (data.url) {
            window.location.href = data.url
          } else {
            alert('Error: ' + (data.error || 'Unknown error'))
          }
        } catch (error) {
          // console.error('fail to check identification,you will jump to login page after several seconds', error)
          // window.location.href='/sign-in'
        }
      }}
    >
      <div className="relative inline-block">
        <img src={data?.photos[0].url} className='w-[100%] h-40 max-[871px]:h-60 rounded-t-xl'></img>
        <span className="absolute top-1 right-2 translate-x-[30%] -translate-y-[30%]
                   text-white text-[10px] font-bold
                   px-1 py-0.5 rounded-sm opacity-70">
          广告
        </span>
      </div>
      <div className='flex flex-col items-start items-start w-[100%] p-2  '>
        <span>{data?.name}</span>
        <div>{star}</div>
        <div className='flex flex-row items-baseline w-full'>
          <div className='flex flex-row justify-center bg-blue-500 rounded-[5px] w-12 h-6 text-sm items-baseline text-white'>
            <div className='text-base'>{data?.biz_ext.rating}</div>
            <div className='text-gray-300 w-1 h-1 text-xs h-auto w-auto'>/5</div>
          </div>
          <div className='ml-1 text-blue-400'>超棒</div>
          <div className='ml-1 line-through text-gray-400 ml-auto text-base'>{"¥" + (stringToRange500_1000(data?.name) + 50)}</div>
        </div>
        {/* {data.photos[0].url} */}
        {/* {data?.type}  */}
        <div className='flex flex-row items-baseline w-full'>
          <div className='text-gray-500'>{stringToRange500_1000(data?.name) + 254}条点评</div>
          <div className='ml-auto text-xl text-blue-500'>{"¥" + stringToRange500_1000(data?.name)}</div>
        </div>
      </div>
      {/* {sessionStorage.getItem('recommendedCity')||'das65d4as65d4'} */}
    </div>
  );
};

export default HotelItem;