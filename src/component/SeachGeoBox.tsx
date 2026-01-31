'use client'
import { Dropdown } from 'antd';
import React, { useState, useEffect, useRef, useCallback, useReducer, ReactNode } from 'react';
import {
  AppState,
  initialState,
  reducer // This is assumed to be the unified appReducer
} from '@/reducer/HotelReservationReducer';
import LoadingBar from "@/component/HorizentalLoadingPair"
import error from 'next/error';
import { HomeOutlined, CompassOutlined } from '@ant-design/icons';
import SearchResultItem from "./SearchResultItem"
import Lodash from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {Tip} from "@/component/SearchResultItem"
// const MAP_KEY = process.env.AMAP_KEY;
// const SECURITY_CODE = process.env.AMAP_SECURITY_CODE;
function SearchDropdownEmpty(): ReactNode {
  const searchInput = useSelector((s: AppState) => s.searchInput);
  return (
    <div className='w-90 bg-white border border-gray-200 rounded-md shadow-lg overflow-auto flex flex-col justify-center items-center text-red-500'>
      there isnt any search result of your input [{searchInput}]
    </div>
  )
}
function SearchHotelSeleton(): ReactNode {
  return (
    <div className='w-90  h-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-auto flex flex-col jusify-center items-center'>
      {Array.from({ length: 5 }, (_, index) => index).map((index) => (
        <LoadingBar key={index + "LoadingBar"} />
      ))}
    </div>
  )
}
function SearchSuggestions({ tips }: { tips: Tip[] }): ReactNode {
  const content =
    tips.map((item, index) => (
      <SearchResultItem
        key={index + "searchInputBoxItem"}
        id={tips[index].id}
        name={tips[index].name}
        district={tips[index].district}
        adcode={tips[index].adcode}
        location={tips[index].location}
        address={tips[index].address}
        typecode={tips[index].typecode}
        city={tips[index].city}
      ></SearchResultItem>
    ));
  return (
    <div className='w-90  h-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-auto flex flex-col jusify-center items-center'>
      {tips.length != 0 ?
        content : <div />}
    </div>
  )
}
const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const { isLoading, search_box_open, searchResult } = state;
  const searchInput = useSelector((s: AppState) => s.searchInput);
  const isLoading = useSelector((s: AppState) => s.isLoading);
  const search_box_open = useSelector((s: AppState) => s.search_box_open);
  const tips = useSelector((s: AppState) => s.tips);
  const isGeoInputBoxFocus = useSelector((s: AppState) => s.isGeoInputBoxFocus);
  const dispatch = useDispatch();
  const onFocus = () => dispatch({ type: 'SET_GEO_INPUTBOX_FOCUS', payload: true });
  const onBlur = () => dispatch({ type: 'SET_GEO_INPUTBOX_FOCUS', payload: false });
  useEffect(() => {
    dispatch({ type: 'SET_SEARCHBOX_OPEN', payload: searchInput.length > 0 });
  }, [searchInput])
  useEffect(() => {
  }, []);
  const controllerRef = useRef<AbortController | null>(null);
  const debouncedSearch = useCallback(
    Lodash.debounce(async (input: string) => {
      controllerRef.current?.abort();            // cancel previous
      controllerRef.current = new AbortController();
      const apiUrl = '/api/AmapGetInputTips?keyword=' + input;
      //send a req to search for hotel
      //after receive data,set is loading to false
      try {
        const response = await fetch(apiUrl, { signal: controllerRef.current.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'SET_SEARCH_HOTEL_RESULT', payload: data.tips });
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        dispatch({ type: 'SET_ISLOADING', payload: false });
      }
    }, 1000), []);
  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_INPUT', payload: event.target.value });
    dispatch({ type: 'SET_ISLOADING', payload: true });
    if (event.target.value != '') {
      debouncedSearch(event.target.value);
    } else {
      dispatch({ type: 'SET_SEARCHBOX_OPEN', payload: false });
    }
  }
  return (
    <section className="rounded-lg h-8">
      <div className="flex space-x-2 flex-col">
        <input
          ref={inputRef}
          // This ID is critical for AMap.AutoComplete to bind to the input
          value={searchInput}
          onChange={handleInputChange}
          id="amap-keyword"
          placeholder="酒店名称..."
          onFocus={onFocus}
          onBlur={onBlur}
          // onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="h-8 w-full border-0 focus:outline-none flex-grow bg-white rounded-lg focus:border-white-500 transition duration-150"
        />
        <Dropdown
          trigger={['click']}
          placement='bottom'
          autoAdjustOverflow={false}
          open={search_box_open}
          onOpenChange={() => dispatch({ type: 'SET_SEARCHBOX_OPEN', payload: !search_box_open })}
          popupRender={isLoading === true && isGeoInputBoxFocus ? ()=><SearchHotelSeleton/> : (tips.length != 0 ? ()=><SearchSuggestions tips={tips}></SearchSuggestions> : () => { return <SearchDropdownEmpty></SearchDropdownEmpty> })}
        >
        </Dropdown>
      </div>
    </section>
  );
};

export default App;