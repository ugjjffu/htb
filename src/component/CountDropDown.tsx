'use client'
import React, { useState } from 'react';
import { Dropdown, Button, InputNumber, Space, Typography } from 'antd';
import { MinusOutlined, PlusOutlined, UserOutlined, HomeOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const { Text } = Typography;
interface Props {
  open:boolean;
  setOpen:(status:boolean)=>void;
  rooms:number;
  setRooms:(num:number)=>void;
  adults:number;
  setAdults:(num:number)=>void;
  childrens:number;
  setChildrens:(num:number)=>void;
}
// --- 1. Define the Component and State ---
const RoomSelectorDropdown: React.FC<Props> = ({open,setOpen,rooms, setRooms,adults, setAdults,childrens, setChildrens}) => {

  // --- 2. Handlers for Input/Button Actions ---

  const handleConfirm = () => {
    // Perform final validation/action here (e.g., save selections)
    console.log(`Rooms: ${rooms}, Adults: ${adults}, Children: ${childrens}`);
    // Manually close the dropdown by setting the controlled state to false
    setOpen(false); 
  };

  const handleRoomsChange = (value: number | null) => {
    const newRooms = value ?? 1;
    // Limit room number to 10
    if (newRooms >= 1 && newRooms <= 10) {
      setRooms(newRooms);
    }
  };

  // --- 3. Custom Content Renderer ---
  const popupContent = (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow-lg w-72">
      
      {/* 3.1. Custom Input Row Component */}
      <RoomInputRow
        icon={<HomeOutlined />}
        label="Rooms"
        value={rooms}
        onChange={handleRoomsChange}
        min={1}
        max={10}
      />
      
      <RoomInputRow
        icon={<UserOutlined />}
        label="Adults"
        value={adults}
        onChange={setAdults as (value: number | null) => void}
        min={1}
        max={rooms * 4} // Example: Max 4 adults per room
      />

      <RoomInputRow
        icon={<UserOutlined style={{ color: '#aaa' }} />}
        label="Children"
        value={childrens}
        onChange={setChildrens as (value: number | null) => void}
        min={0}
        max={rooms * 4}
      />

      {/* 3.2. Confirm Button on the right */}
      <div className="flex justify-end pt-3 mt-3 border-t border-gray-100">
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

  // --- 4. Render Trigger (What the user clicks) ---
  const renderTrigger = (
      <Space onClick={() => setOpen(!open)}>
        {`${rooms} 间, ${adults+childrens} 人`}
        {open ? <CaretUpOutlined className="text-blue-500 text-sm" /> : <CaretDownOutlined className="text-sm"/>}
      </Space>
  );

  return (
    <Dropdown
      autoAdjustOverflow={false}
      // Control the visibility manually
      open={open}
      onOpenChange={setOpen}
      trigger={['click']}
      // Inject the custom content
      popupRender={() => popupContent}
    >
      {renderTrigger}
    </Dropdown>
  );
};

// --- Helper Component for the Input Lines ---

interface RoomInputRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (value: number | null) => void;
  min: number;
  max: number;
}

const RoomInputRow: React.FC<RoomInputRowProps> = ({ icon, label, value, onChange, min, max }) => (
  <section className="flex justify-between items-center py-2">
    <Space size="small">
      {icon}
      <Text strong>{label}</Text>
    </Space>
    
    <Space>
      {/* Minus Button */}
      <Button 
        type="default" 
        size="small"
        icon={<MinusOutlined />}
        onClick={() => onChange(value > min ? value - 1 : min)}
        disabled={value === min}
      />
      
      {/* Input Number - Displays current value */}
      <InputNumber
        value={value} 
        
        onChange={onChange}
        min={min}
        max={max}
        step={1}
        controls={false} // Hide Antd's default controls
        className="w-12 text-center"
      />
      
      {/* Plus Button */}
      <Button 
        type="default" 
        size="small"
        icon={<PlusOutlined />}
        onClick={() => onChange(value < max ? value + 1 : max)}
        disabled={value === max}
      />
    </Space>
  </section>
);

export default RoomSelectorDropdown;