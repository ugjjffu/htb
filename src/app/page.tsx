'use client'
import Image from "next/image";
import SliderComercial from "@/component/SliderCommercial"
import Test from "@/component/Test"
import CityPicker from "@/component/Citypicker"
export default function Home() {
  return (
    <div className=" h-full ml-33">
      <div className="flex space-x-4">
          {/* Component 1: Set to half width (w-1/2) */}
          <div className="">
              <div id="section2" className="w-185 h-66 bg-green-600 text-white text-xl flex items-center h-32 border-b border-gray-700 flex-col">
                  <div className="mt-0 w-[90%]">预订酒店</div>
                  <div>456</div>
              </div>
              <div id="section2" className="w-185 h-66 bg-green-600 text-white text-xl flex items-center h-32 justify-center border-b border-gray-700">
                  Section 2 Content
              </div>
              <div id="section2" className="w-185 h-66 bg-green-600 text-white text-xl flex items-center h-32 justify-center border-b border-gray-700">
                  Section 2 Content
              </div>
              <div id="section2" className="w-185 h-66 bg-green-600 text-white text-xl flex items-center h-32 justify-center border-b border-gray-700">
                  Section 2 Content
              </div>
              <div id="section2" className="w-185 h-66 bg-green-600 text-white text-xl flex items-center h-32 justify-center border-b border-gray-700">
                  Section 2 Content
              </div>
              <div id="section2" className="w-185 h-66 bg-green-600 text-white text-xl flex items-center h-32 justify-center border-b border-gray-700">
                  Section 2 Content
              </div>
          </div>
          
          {/* Component 2: Set to half width (w-1/2) */}
          <div className=" space-y-4 flex flex-col"> {/* Added space-y-4 for vertical gap */}
              {/* Component 1 (The Slider) */}
              <div className="grow">
                <SliderComercial></SliderComercial>
              </div>
              {/* Component 2 (The New Content, placed vertically below the slider) */}
              <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-md mt-auto mb-4">
                  <h3 className="text-lg font-semibold text-yellow-800">NewVerticalContent</h3>
                  <p className="text-sm text-yellow-700">This content is now stacked vertically beneath the slider.</p>
              </div>
              {/* If this were a React component, you'd use: <NewVerticalContent /> */}
          </div>
      </div>
      <div className="w-296">
        <div id="section3" className="bg-green-600 text-white text-xl flex items-center h-38 justify-center border-b border-gray-700">
          Right - Section 3
        </div>
        <div id="section4" className="bg-yellow-600 text-white text-xl flex items-center h-full justify-center border-b-0">
          Right - Section 4
        </div>
        <CityPicker></CityPicker>
      </div>
    </div>
  );
}
