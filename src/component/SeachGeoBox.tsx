import { Dropdown } from 'antd';
import React, { useState, useEffect, useRef, useCallback, useReducer, ReactNode } from 'react';
import {
  initialState,
  reducer // This is assumed to be the unified appReducer
} from '@/reducer/HotelReservationReducer';
const MAP_KEY = process.env.AMAP_KEY;
const SECURITY_CODE = process.env.AMAP_SECURITY_CODE;
const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchInput } = state;
  function handleOpenCityOptionsChange(): void {
    
  }

  function customPopupRender(): ReactNode {
    return(
      <div className='bg-blue-500'>123</div>
    )
  }

  return (
    <div className="rounded-lg h-8">
      <div className="flex space-x-2">
        <input
          ref={inputRef}
          // This ID is critical for AMap.AutoComplete to bind to the input
          id="amap-keyword"
          placeholder="酒店名称..."
          // onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="h-8 w-10 border-0 focus:outline-none flex-grow bg-white rounded-lg focus:border-white-500 transition duration-150"
        />
        <Dropdown
          trigger={['click']}
          open={!searchInput.length}
          // placement='bottom'
          onOpenChange={handleOpenCityOptionsChange}
          popupRender={customPopupRender}
        >
        </Dropdown>
      </div>
    </div>
  );
};

export default App;