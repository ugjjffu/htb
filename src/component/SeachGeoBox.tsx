'use client'
import { Dropdown } from 'antd';
import React, { useState, useEffect, useRef, useCallback, useReducer, ReactNode } from 'react';
import {
  initialState,
  reducer // This is assumed to be the unified appReducer
} from '@/reducer/HotelReservationReducer';
import LoadingBar from "@/component/HorizentalLoadingPair"
import error from 'next/error';
import { HomeOutlined, CompassOutlined } from '@ant-design/icons';
import SearchResultItem from "./SearchResultItem"
import Lodash from 'lodash';

// const MAP_KEY = process.env.AMAP_KEY;
// const SECURITY_CODE = process.env.AMAP_SECURITY_CODE;
const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchInput, isLoading, search_box_open, searchResult } = state;
  useEffect(() => {
    dispatch({ type: 'SET_SEARCHBOX_OPEN', payload: true });
  }, [searchInput])
  useEffect(() => {
    const onFocus = () => dispatch({ type: 'SET_GEO_INPUTBOX_FOCUS', payload: true });
    const onBlur = () => dispatch({ type: 'SET_GEO_INPUTBOX_FOCUS', payload: false });
    inputRef.current?.addEventListener('focus', onFocus);
    inputRef.current?.addEventListener('blur', onBlur);
    return () => {
      inputRef.current?.removeEventListener('focus', onFocus);
      inputRef.current?.removeEventListener('blur', onBlur);
    };
  }, []);

  function customLoadingPopupRender(): ReactNode {
    return (
      <div className='w-125  h-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-auto flex flex-col jusify-center items-center'>
        {Array.from({ length: 5 }, (_, index) => index).map((index) => (
          <LoadingBar key={index + "LoadingBar"} />
        ))}
      </div>
    )
  }
  function customFinishPopupRender(): ReactNode {
    const content =
      state.tips.map((item, index) => (
        <SearchResultItem
          key={index + "searchInputBoxItem"}
          id={state.tips[index].id}
          name={state.tips[index].name}
          district={state.tips[index].district}
          adcode={state.tips[index].adcode}
          location={state.tips[index].location}
          address={state.tips[index].address}
          typecode={state.tips[index].typecode}
          city={state.tips[index].city}
        ></SearchResultItem>
      ))
      ;
    return (
      <div className='w-125  h-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-auto flex flex-col jusify-center items-center'>
        {state.tips.length != 0 ?
          content : <div />}
      </div>
    )
  }
  //        <div className={`w-full h-8 p-1 flex flex-row justify-center items-center`}>
  //     <div className={`w-10 h-full ${style.pulsing_box}`}>
  //     </div>
  //     <div className={`h-full ml-3 w-110 ${style.pulsing_box}`}>
  //     </div>
  // </div>
  const debouncedSearch = useCallback(
    Lodash.debounce(async (input: string) => {
      // alert("564");
      const apiUrl = 'http://localhost:3000/api/AmapGetInputTips?keyword=' + input;
      //send a req to search for hotel
      //after receive data,set is loading to false
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'SET_SEARCH_HOTEL_RESULT', payload: data.tips });
        // alert(JSON.stringify(data));
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
    }else{
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
          // onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="h-8 w-10 border-0 focus:outline-none flex-grow bg-white rounded-lg focus:border-white-500 transition duration-150"
        />
        <Dropdown
          trigger={['click']}
          placement='bottomRight'
          autoAdjustOverflow={false}
          open={search_box_open}
          onOpenChange={ () => dispatch({ type: 'SET_SEARCHBOX_OPEN', payload:  !state.search_box_open})}
          popupRender={isLoading === true && state.isGeoInputBoxFocus ? customLoadingPopupRender : customFinishPopupRender}
        >
        </Dropdown>
      </div>
    </section>
  );
};

export default App;