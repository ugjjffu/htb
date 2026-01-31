export const setSelectedHotCity = (city: string) => ({ type: 'SET_PLACE_OF_DEPARTURE', payload: city, });
export const setShowMoreCityOfPlaceOfDeparture = (open: boolean) => ({ type: 'SET_SHOW_MORE_CITY_OF_PLACE_OF_DEPARTURE', payload: open });
export const setSelectedCheckOutValue=(value:number)=>({ type: 'SET_SELECTED_CHECKOUT_VALUE', payload: value });
export const setOpenCalendarOfCheckOut=(value:boolean)=>({ type: "SET_OPEN_CALENDAR_CHECKOUT", payload: value });
export const setPlaceOfDeparture=(value:string)=>({ type: "SET_PLACE_OF_DEPARTURE", payload: value });

import { AppDispatch } from '@/reducer/store';
import { City } from '@/component/CityDropDown';

export const setSelectedCityState = (dispatch: AppDispatch, city: City) =>
  dispatch({ type: 'SET_SELECTED_CITY', payload: city });

export const setOpenCityOptionsState = (dispatch: AppDispatch, open: boolean) =>
  dispatch({ type: 'SET_OPEN_CITY_OPTIONS', payload: open });

export const setSelectedCheckInValueState = (dispatch: AppDispatch, value: number) =>
  dispatch({ type: 'SET_SELECTED_CHECKIN_VALUE', payload: value });

export const setOpenCalendarCheckInState = (dispatch: AppDispatch, open: boolean) =>
  dispatch({ type: 'SET_OPEN_CALENDAR_CHECKIN', payload: open });

export const setPanelValueCheckInState = (dispatch: AppDispatch, value: number) =>
  dispatch({ type: 'SET_PANEL_VALUE_CHECKIN', payload: value });

export const setSelectedCheckOutValueState = (dispatch: AppDispatch, value: number) =>
  dispatch({ type: 'SET_SELECTED_CHECKOUT_VALUE', payload: value });

export const setOpenCalendarCheckOutState = (dispatch: AppDispatch, open: boolean) =>
  dispatch({ type: 'SET_OPEN_CALENDAR_CHECKOUT', payload: open });

export const setPanelValueCheckOutState = (dispatch: AppDispatch, value: number) =>
  dispatch({ type: 'SET_PANEL_VALUE_CHECKOUT', payload: value });

export const setRoomsState = (dispatch: AppDispatch, value: number) =>
  dispatch({ type: 'SET_ROOMS', payload: value });

export const setAdultsState = (dispatch: AppDispatch, value: number) =>
  dispatch({ type: 'SET_ADULTS', payload: value });

export const setChildrensState = (dispatch: AppDispatch, value: number) =>
  dispatch({ type: 'SET_CHILDRENS', payload: value });

export const setOpenState = (dispatch: AppDispatch, open: boolean) =>
  dispatch({ type: 'SET_OPEN', payload: open });

export const setLevelState = (dispatch: AppDispatch, level: string) =>
  dispatch({ type: 'SET_LEVEL', payload: level });

export const setLevelDropDownOpenState = (dispatch: AppDispatch, open: boolean) =>
  dispatch({ type: 'SET_LEVELDROPDOWN_OPEN', payload: open });

export const setPlaceOfDepartureState = (dispatch: AppDispatch, place: string) =>
  dispatch({ type: 'SET_PLACE_OF_DEPARTURE', payload: place });
