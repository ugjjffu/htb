import React from 'react';
import { Calendar, Alert } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import type { SelectInfo } from 'antd/es/calendar/generateCalendar';
import weekday from 'dayjs/plugin/weekday';        // 新增
import localeData from 'dayjs/plugin/localeData';
dayjs.extend(weekday);
dayjs.extend(localeData);

interface CalendarProps {
  selectedValue: number;  // 存储为时间戳（毫秒）
  setSelectedValue: (state: number) => void;
  panelValue: number;
  setPanelValue: (state: number) => void;
}

const AntdCalendar: React.FC<CalendarProps> = ({
  selectedValue,
  setSelectedValue,
  panelValue,
  setPanelValue,
}) => {
  // 1. 接收 Dayjs 对象，转为 number（时间戳）存储
  const handleSelect = (date: Dayjs, _selectInfo: SelectInfo) => {
    const timestamp = date.valueOf(); // 或使用 date.unix() * 1000
    setPanelValue(timestamp);
    setSelectedValue(timestamp);
  };

  // 2. 同样处理面板切换
  const handlePanelChange = (date: Dayjs, _mode: string) => {
    const timestamp = date.valueOf();
    setPanelValue(timestamp);
  };

  return (
    <div className="bg-gray-50 shadow-xl rounded-lg w-[376px] mx-auto border border-gray-200">
      <Alert
        message={
          <span className="font-semibold text-gray-700">
            You selected date: 
            <span className="text-blue-600 ml-2">
              {selectedValue ? dayjs(selectedValue).format('YYYY-MM-DD') : 'None'}
            </span>
          </span>
        }
        type="info"
        showIcon
        className="mb-4"
      />

      <div className="border border-gray-300 rounded-md p-2 bg-white">
        <Calendar 
          // number -> Dayjs 转换
          value={dayjs(panelValue)} 
          // 接收 Dayjs，内部转为 number
          onSelect={handleSelect} 
          onPanelChange={handlePanelChange}
          fullscreen={false}
        />
      </div>
    </div>
  );
};

export default AntdCalendar;