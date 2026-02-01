'use client'
import React from 'react';
import { Popover, Layout, Flex, Input, Button, Typography, Space } from 'antd';
import { SearchOutlined, HomeOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const content = (
  <div className='**absolute**'>
    <h4>More Info Card</h4>
    <p>This is a popover with rich content that appears on hover.</p>
    <Button size="small" type="primary">View Details</Button>
  </div>
);
const HotelNav = () => {
  // Define a simple function for button clicks (can be replaced with actual routing/logic)
  const handleAuthClick = (type: string) => {
    console.log(`${type} button clicked`);
    // Add your routing or modal logic here
  };

  const onSearch = (value: any) => {
    console.log('Search for:', value);
    // Add your search functionality here
  };

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 50px',
        height: 64,
        backgroundColor: '#fff', // Use a light background for contrast
        borderBottom: '1px solid #f0f0f0',
      }}
      className='w-full'
    >
      {/* 1. Web Logo (Hotel Ticket Booking) */}
      <Flex align="center">
        <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
        <Title level={3} style={{ margin: 0, marginLeft: 8, color: '#1890ff' }}>
          TicketBooker
        </Title>
      </Flex>

      {/* 2. Input Box (Search) - Flex.Item grows to fill space */}

      {/* 3. Login/Register Buttons */}
      <div className="flex items-center gap-2 h-1 text-xs ml-auto">
        {/* <Search
          placeholder="Search for hotels or destinations..."
          allowClear
          onSearch={onSearch}
          className='w-[50%]'
          size="large"
          enterButton
        /> */}
        <button className='h-5 my-5 mr-5 cursor-pointer' onClick={()=>window.location.href='/sign-in'}>
          Login
        </button>
        <button className='h-5 my-5 cursor-pointer' onClick={()=>window.location.href='/sign-up'}>
          Register
        </button>
        <Popover
          content={content}
          title="Hotel Quick Info"
          trigger="hover"
          placement="bottom"
          className='h-5 my-5'
        >
        </Popover>
      </div>
    </Header>
  );
};

export default HotelNav;