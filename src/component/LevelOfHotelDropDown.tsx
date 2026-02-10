'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { Dropdown, Button, InputNumber, Space, Typography } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
const { Text } = Typography;
interface Props {
  open: boolean;
  setOpen: (status: boolean) => void;
  level: string;
  setLevel: (level: string) => void;
}
// --- 1. Define the Component and State ---
const LevelSelectorDropdown: React.FC<Props> = ({ open, setOpen, level, setLevel }) => {
  // --- 2. Handlers for Input/Button Actions ---
  const [isHoveredArr, setIsHoveredArr] = useState([false, false, false, false, false]);
  function abc() {

  };
  const handleConfirm = useCallback(() => {
    setOpen(false);
    abc();
  }, [setOpen]);
  const bgBlue = 'bg-blue-100';
  const PopupContent = (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow-lg w-72">
      {/* 3.2. Confirm Button on the right */}
      <div className='w-full'>
        <div className={`cursor-pointer ${isHoveredArr[0] ? bgBlue : ''}`} onMouseEnter={() => { setIsHoveredArr([true, false, false, false, false]) }} onMouseOut={() => { setIsHoveredArr([false, false, false, false, false]) }} onClick={() => { setLevel('⭐'); setOpen(false) }}>
          ⭐
        </div>
        <div className={`cursor-pointer ${isHoveredArr[1] ? bgBlue : ''}`} onMouseEnter={() => { setIsHoveredArr([false, true, false, false, false]) }} onMouseOut={() => { setIsHoveredArr([false, false, false, false, false]) }} onClick={() => { setLevel('⭐⭐'); setOpen(false) }}>
          ⭐⭐
        </div>
        <div className={`cursor-pointer ${isHoveredArr[2] ? bgBlue : ''}`} onMouseEnter={() => { setIsHoveredArr([false, false, true, false, false]) }} onMouseOut={() => { setIsHoveredArr([false, false, false, false, false]) }} onClick={() => { setLevel('⭐⭐⭐'); setOpen(false) }}>
          ⭐⭐⭐
        </div>
        <div className={`cursor-pointer ${isHoveredArr[3] ? bgBlue : ''}`} onMouseEnter={() => { setIsHoveredArr([false, false, false, true, false]) }} onMouseOut={() => { setIsHoveredArr([false, false, false, false, false]) }} onClick={() => { setLevel('⭐⭐⭐⭐'); setOpen(false) }}>
          ⭐⭐⭐⭐
        </div>
        <div className={`cursor-pointer ${isHoveredArr[4] ? bgBlue : ''}`} onMouseEnter={() => { setIsHoveredArr([false, false, false, false, true]) }} onMouseOut={() => { setIsHoveredArr([false, false, false, false, false]) }} onClick={() => { setLevel('⭐⭐⭐⭐⭐'); setOpen(false) }}>
          ⭐⭐⭐⭐⭐
        </div>
      </div>
      <div className="flex justify-end pt-3 mt-3 border-t border-gray-20">
        <Button
          type="primary"
          onClick={handleConfirm}
          className="w-full" // Make button full width in this example
        >
          Confirm
        </Button>
      </div>
    </div>
  );
  const PopupRender = useCallback(() => PopupContent, [isHoveredArr, PopupContent]);
  // --- 4. Render Trigger (What the user clicks) ---
  const renderTrigger = (
    <Space onClick={() => setOpen(!open)}>
      {open ? <CaretUpOutlined className="text-blue-500 text-sm" /> : <CaretDownOutlined className="text-sm" />}
    </Space>
  );

  return (
    <Dropdown
      placement='bottom'
      autoAdjustOverflow={false}
      // Control the visibility manually
      open={open}
      onOpenChange={setOpen}
      trigger={['click']}
      // Inject the custom content
      popupRender={() => <PopupRender />}
    >
      <div className='flex flex-row'>
        <div>{level}</div>
        {renderTrigger}
      </div>
    </Dropdown>
  );
};


export default LevelSelectorDropdown;