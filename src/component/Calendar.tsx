import React, { useState } from 'react';
import { Calendar, Alert } from 'antd';
import { Dayjs } from 'dayjs'; // Type import
// You might need to import the Antd CSS in your main entry file (e.g., import 'antd/dist/reset.css';)
interface CalendarProps {
  selectedValue: Dayjs|null;
  setSelectedValue: (state: Dayjs|null) => void;
  panelValue: Dayjs;
  setPanelValue: (state: Dayjs) => void;
}
const AntdCalendar: React.FC<CalendarProps> = ({selectedValue,setSelectedValue,panelValue,setPanelValue}) => {
  const handleSelect = (newValue: Dayjs) => {
    setPanelValue(newValue);
    setSelectedValue(newValue);
  };

  // Callback when the user changes the month/year panel
  const handlePanelChange = (newValue: Dayjs) => {
    // 4. Update the panel value without changing the selected date
    setPanelValue(newValue);
  };

  return (
    // Tailwind CSS container for centering and background styling
    <div className="bg-gray-50 shadow-xl rounded-lg w-[376px] mx-auto border border-gray-200">
      {/* --- Display Selected Date (Tailwind Styled) --- */}
      <Alert
        message={
          <span className="font-semibold text-gray-700">
            You selected date: 
            <span className="text-blue-600 ml-2">
              {selectedValue ? selectedValue.format('YYYY-MM-DD') : 'None'}
            </span>
          </span>
        }
        type="info"
        showIcon
        className="mb-4"
      />

      {/* --- Ant Design Calendar Component --- */}
      <div className="border border-gray-300 rounded-md p-2 bg-white">
        <Calendar 
          // Bind the panel value state
          value={panelValue} 
          // Bind the onSelect handler to update the selected date state
          onSelect={handleSelect} 
          // Bind the onPanelChange handler to keep the component controlled
          onPanelChange={handlePanelChange}
          // Use `fullscreen={false}` to render the calendar within the container
          fullscreen={false}
        />
      </div>
    </div>
  );
};

export default AntdCalendar;