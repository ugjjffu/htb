import React, { useRef, useEffect } from 'react';

const StickyScrollToBottom = () => {
  // 1. Ref for the scrollable parent container
  const parentRef = useRef(null);

  // 2. Data for the list content
  const contentItems = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

  // 3. useEffect to scroll to the bottom when the component mounts or content changes
  useEffect(() => {
    if (parentRef.current) {
      // Scroll to the absolute bottom of the scrollable element
      parentRef.current.scrollTop = parentRef.current.scrollHeight;
    }
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div className="flex justify-center p-4 bg-gray-100 min-h-screen">
      <div 
        ref={parentRef} // Attach the ref here
        className="relative w-full max-w-sm h-96 overflow-y-scroll border-2 border-blue-500 shadow-xl rounded-lg bg-white"
        // Key parent classes: relative (for sticky context), h-96 (defined height), overflow-y-scroll (enables scrolling)
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Scrollable Content</h2>
          {contentItems.map((item, index) => (
            <p key={index} className="py-1 text-gray-600 border-b border-gray-200 last:border-b-0">
              {item}
            </p>
          ))}
        </div>

        {/* The Sticky Element */}
        <div 
          className="sticky bottom-0 p-4 bg-blue-500 text-white text-center font-semibold shadow-lg"
          // Key sticky classes: sticky and bottom-0 (sticks to the bottom of the parent)
        >
          I am sticky to the bottom of the parent!
        </div>
      </div>
    </div>
  );
};

export default StickyScrollToBottom;