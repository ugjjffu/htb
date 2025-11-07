import React from 'react';
import { Carousel, Typography } from 'antd';

// IMPORTANT: We assume Ant Design and Tailwind CSS are correctly configured in the environment.

const { Title } = Typography;

const LanternSlideTailwind = () => (
    <div className='sticky top-3 w-107 h-170 h-screen'>
      <Carousel 
        autoplay
        autoplaySpeed={3000} // <-- This is the change: sets the delay to 2000ms (2 seconds)
        effect="scrollx"
        dotPosition="bottom"
        className="rounded-lg overflow-hidden h-screen" // Added rounded corners to the carousel itself
      >
        {/* Slide 1: City Breaks */}
        <div className="
          h-screen                         /* Increased height slightly */
          text-white  
          text-center 
          bg-blue-700                    /* Darker blue for contrast */
          flex items-center justify-center 
          rounded-lg transition-all duration-300 hover:bg-blue-600
        ">
          <h3 className="text-2xl font-bold p-4">
            ✨ Slide 1: Exclusive 20% Off City Breaks!
          </h3>
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
          <h3 className="text-2xl font-bold p-4">
            🏨 Slide 2: Book 3 Nights, Get the 4th Free
          </h3>
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
          <h3 className="text-2xl font-bold p-4">
            🏖️ Slide 3: Weekend Deals for Beach Resorts
          </h3>
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
          <h3 className="text-2xl font-bold p-4">
            ✈️ Slide 4: Last Minute Luxury Hotels
          </h3>
        </div>
      </Carousel>
      </div>
);

export default LanternSlideTailwind;