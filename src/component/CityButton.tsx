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
  buttonSize: string;
  buttonText: string;
}
const CityButton: React.FC<CityButtonProps> = ({ buttonSize, buttonText }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const choosenCity = useSelector((s: RootState) => s.choosenCity);

  const choosenCity = useSelector((s: AppState) => s.choosenCity);
  const dispatch = useDispatch();

  // const {
  //   choosenCity
  // } = state;
  return (
    <button
      type='button'
      style={{ width: "60px", height: "28px", fontSize: "16px" }}
      className={`${choosenCity === buttonText ? 'bg-blue-500' : 'bg-white hover:bg-[rgb(242,248,254)]'} rounded-[3px]`}
      onClick={() => { dispatch({ type: 'SET_CHOOSEN_CITY', payload: buttonText }); }}
    >
      {buttonText}
    </button>
  );
};

export default CityButton;