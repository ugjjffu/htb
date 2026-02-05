import React from 'react';
import { Carousel, Typography } from 'antd';

// IMPORTANT: We assume Ant Design and Tailwind CSS are correctly configured in the environment.

const { Title } = Typography;

const LanternSlideTailwind = () => (
  <section className='sticky max-xs:w-[85%] top-3  h-170 h-screen mx-auto'>
    <Carousel
      autoplay
      autoplaySpeed={3000} // <-- This is the change: sets the delay to 2000ms (2 seconds)
      effect="scrollx"
      dotPosition="bottom"
      className="rounded-lg overflow-hidden h-screen min-xs:max-w-107" // Added rounded corners to the carousel itself
    >
      {/* Slide 1: City Breaks */}
      <div className="
          h-screen                         /* Increased height slightly */
          text-white  
          text-center 
          flex items-center justify-center 
          rounded-lg transition-all duration-300 hover:bg-blue-600
        ">
        <img alt="/fallback.webp" src="/p1_slider.webp" className='h-full w-full'></img>
      </div>

      {/* Slide 2: 4th Night Free */}
      <div className="
          h-screen
          text-white 
          text-center 
          bg-green-700 
          flex items-center justify-center
          rounded-lg transition-all duration-300 hover:bg-green-600
          magrin-top:30px
        ">
        <img alt="/fallback.webp" src="/p2_slider.webp" className='h-full  w-full'></img>
      </div>

      {/* Slide 3: Beach Resorts */}
      <div className="
          h-screen
          text-white 
          text-center 
          bg-yellow-600 
          flex items-center justify-center
          rounded-lg transition-all duration-300 hover:bg-yellow-500
        ">
        <img alt="/fallback.webp" src="/p3_slider.webp" className='h-full  w-full'></img>
      </div>

      {/* Slide 4: Luxury Hotels */}
      <div className="
          h-screen
          text-white 
          text-center 
          bg-red-700
          flex items-center justify-center
          rounded-lg transition-all duration-300 hover:bg-red-600
        ">
        <img alt="/fallback.webp" src="/p4_slider.webp" className='h-full  w-full'></img>
      </div>
    </Carousel>
  </section>
);

export default LanternSlideTailwind;