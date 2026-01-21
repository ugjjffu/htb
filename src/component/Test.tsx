import { useState } from "react";
import { Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const PeopleRoomSelector = () => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const menuContent = (
    <div className="p-3 w-56 space-y-3">
      {/* Adults */}
      <div className="flex justify-between items-center">
        <span>成人</span>
        <div className="flex items-center space-x-2">
          <Button size="small" onClick={() => setAdults(Math.max(1, adults - 1))}>-</Button>
          <span>{adults}</span>
          <Button size="small" onClick={() => setAdults(adults + 1)}>+</Button>
        </div>
      </div>

      {/* Children */}
      <div className="flex justify-between items-center">
        <span>儿童</span>
        <div className="flex items-center space-x-2">
          <Button size="small" onClick={() => setChildren(Math.max(0, children - 1))}>-</Button>
          <span>{children}</span>
          <Button size="small" onClick={() => setChildren(children + 1)}>+</Button>
        </div>
      </div>

      {/* Rooms */}
      <div className="flex justify-between items-center">
        <span>房间</span>
        <div className="flex items-center space-x-2">
          <Button size="small" onClick={() => setRooms(Math.max(1, rooms - 1))}>-</Button>
          <span>{rooms}</span>
          <Button size="small" onClick={() => setRooms(rooms + 1)}>+</Button>
        </div>
      </div>
    </div>
  );

  return (
    <Dropdown overlay={menuContent} trigger={["click"]}>
      {/* ✅ Must be a single React element */}
      <Button className="flex items-center border rounded px-2 py-1 cursor-pointer">
        <UserOutlined className="text-gray-500 mr-2" />
        <span className="text-sm">
          成人 {adults}, 儿童 {children}, 房间 {rooms}
        </span>
      </Button>
    </Dropdown>
  );
};
