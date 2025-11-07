'use client'
import React from 'react';
import { Popover,Layout, Flex, Input, Button, Typography, Space } from 'antd';
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
  const handleAuthClick = (type) => {
    console.log(`${type} button clicked`);
    // Add your routing or modal logic here
  };

  const onSearch = (value) => {
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
        width:"100%"
      }}
    >
      {/* 1. Web Logo (Hotel Ticket Booking) */}
      <Flex align="center">
        <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
        <Title level={3} style={{ margin: 0, marginLeft: 8, color: '#1890ff' }}>
          **TicketBooker**
        </Title>
      </Flex>

      {/* 2. Input Box (Search) - Flex.Item grows to fill space */}
      <Flex style={{ flexGrow: 1, margin: '0 30px' }} justify="center">
        <Search
          placeholder="Search for hotels or destinations..."
          allowClear
          onSearch={onSearch}
          style={{ width: 400 }}
          size="large"
          enterButton
        />
      </Flex>

      {/* 3. Login/Register Buttons */}
      <div className="flex items-center gap-2 h-1 text-xs mr-0">
            <div className='h-5 my-5' onClick={() => handleAuthClick('Login')}>
            Login
            </div>
            <div className='h-5 my-5' onClick={() => handleAuthClick('Register')} type="primary" size="small">
            Register
            </div>
            <Popover
                content={content}
                title="Hotel Quick Info"
                trigger="hover"
                placement="bottom"
                className='h-5 my-5'
            >
                {/* Apply Tailwind classes for small button size and padding */}
                <div>
                    h
                </div>
            </Popover>
      </div>
    </Header>
  );
};

export default HotelNav;