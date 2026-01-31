'use client'
import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    initialState,
    reducer, // This is assumed to be the unified appReducer
    AppState
} from '@/reducer/HotelReservationReducer';
import { Button } from 'antd';
interface CityButtonProps {
    setState: (value: string) => void;
    options: Array<string>;
    choosenCategory: string;
}
const CityButton: React.FC<CityButtonProps> = ({ setState, options, choosenCategory }) => {
    // const globalDispatch = useDispatch();
    // const showMoreOpen = useSelector((s: AppState) => s.showMoreOpen);
    return (
        <div className='flex flex-row p-1 col-span-1'>
            {options.map((value, idx) =>
                <button
                    type='button'
                    key={value}
                    onClick={() => { setState(idx + 1 + ''); }}   // pass the option value
                    className={`px-1 py-1 rounded ${choosenCategory === (idx + 1) + '' ? 'text-blue-500' : ''} text-sm`}
                >
                    {value}
                </button>
            )
            }
        </div>
    )
};


export default CityButton;