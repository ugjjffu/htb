import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- 1. Custom Types and Global Declarations ---
declare global {
  interface Window {
    // We declare AMap as 'any' at the window level, so the compiler doesn't throw errors
    AMap: any; 
    _AMapSecurityConfig: { securityJsCode: string };
  }
}

// Interface representing the expected location structure from AMap
interface AMapLocation {
  lng: number;
  lat: number;
}

// Interface representing the specific POI result structure from AMap's services
interface AMapPoiResult {
  name: string;
  location: AMapLocation; 
  address?: string;
  tel?: string;
  uid?: string;
  postcode?: string;
  type?: string;
  business_area?: string;
  [key: string]: any; 
}

// Interface representing the expected structure of the AMap objects (AutoComplete)
interface AmapObject {
  [key: string]: any; 
}

// Define the interface for the location data we want to expose
export interface Poi {
  name: string;
  address?: string;
  tel?: string;
  uid?: string;
  postcode?: string;
  type?: string;
  business_area?: string;
  lnglat: [number, number]; // [longitude, latitude]
}

// --- 2. Configuration and Constants ---

// !!! IMPORTANT: Replace these placeholders with your actual Amap Keys !!!
const MAP_KEY = process.env.AMAP_KEY;
const SECURITY_CODE = process.env.AMAP_SECURITY_CODE;

// --- 3. Main Component (AmapSearch logic merged into App) ---

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const acRef = useRef<AmapObject | null>(null); // AMap.AutoComplete

  const [pickedPoi, setPickedPoi] = useState<Poi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Checks if the keys are set (using the original logic, which was 'false')
  // NOTE: In a real app, you'd check if the keys are placeholders.
  const isKeyMissing = MAP_KEY===undefined||SECURITY_CODE===undefined; 
  // --- Utility to unify Amap.Poi to our custom Poi type ---
  // The argument is typed as AMapPoiResult
  const handleSelect = useCallback((poi: AMapPoiResult | null) => {
    if (!poi?.location) {
      setPickedPoi(null);
      return;
    }

    const { name, location, address, tel, uid, postcode, type, business_area } = poi;
    
    // Convert Amap POI data to our local type
    const item: Poi = {
      name,
      address,
      tel,
      uid,
      postcode,
      type,
      business_area,
      lnglat: [location.lng, location.lat], 
    };
    
    setPickedPoi(item);
    setError(null);
    console.log('Selected POI:', item); // Log the selection for verification
  }, []); 

  // --- Search Handler (Manual Search - not strictly needed for AutoComplete but kept for the button) ---
  const handleSearch = useCallback(() => {
    if (isKeyMissing) return;

    const keyword = inputRef.current?.value.trim();
    if (!keyword) return;

    // NOTE: Without AMap.PlaceSearch, this button can only trigger a console log 
    // or rely on AMap.AutoComplete's built-in behavior after input.
    setSearchKeyword(keyword);
    // You'd typically use AMap.PlaceSearch here, but that requires more initialization.
    // For this minimal component, we rely on the AutoComplete UI dropdown.
    console.log(`Manual Search for: ${keyword}`);

  }, [isKeyMissing]);
  
  // --- Initialization Effect: Load Script and Initialize AutoComplete ---
  useEffect(() => {
    if (!inputRef.current || isKeyMissing) {
      if(isKeyMissing) setError("Error: Please set MAP_KEY and SECURITY_CODE constants.");
      return;
    }
    
    setLoading(true);
    // 1. Amap Security Key (Required for v2.0)
    (window as any)._AMapSecurityConfig = { securityJsCode: SECURITY_CODE };

    // 2. Dynamic Script Loading
    const script = document.createElement('script');
    // Request ONLY AutoComplete plugin
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${MAP_KEY}&plugin=AMap.AutoComplete`;
    script.async = true;

    // 3. Define the function to initialize the service once the script is loaded
    const onScriptLoad = () => {
      if (window.AMap) {
        // Initialize AutoComplete
        const autoComplete = new window.AMap.AutoComplete({
          input: "amap-keyword", // ID of the input field
        });
        acRef.current = autoComplete;

        // Add event listener for selecting a suggestion
        autoComplete.on('select', (e: any) => {
          // e.poi contains the selected POI data
          handleSelect(e.poi as AMapPoiResult);
        });

        setLoading(false);
        setError(null);
      } else {
        setError("Error: AMap object not found after script load.");
        setLoading(false);
      }
    };

    script.addEventListener('load', onScriptLoad);
    document.head.appendChild(script);

    return () => {
      // Cleanup: Remove the event listener and the script
      script.removeEventListener('load', onScriptLoad);
      document.head.removeChild(script);
      // NOTE: AMap.AutoComplete doesn't have a standard 'destroy' method like AMap.Map
      acRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSelect, isKeyMissing]); 

  // Minimal Render Output
  return (
        <div className="rounded-lg shadow-md h-8">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              // This ID is critical for AMap.AutoComplete to bind to the input
              id="amap-keyword" 
              placeholder={loading ? "Loading map services..." : "请输入关键词 (Enter keywords)..."}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={loading || isKeyMissing}
              className="h-8 flex-grow bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 disabled:bg-gray-100"
            />
            <button 
              onClick={handleSearch}
              disabled={loading || isKeyMissing}
              className="h-8 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg">
              ⚠️ {error}
            </div>
          )}

          {/* Display Selected POI (for testing/verification) */}
          {pickedPoi && (
            <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg">
              <h3 className="font-semibold text-green-800">✅ Selected Location:</h3>
              <p className="text-sm text-gray-700">
                **{pickedPoi.name}** ({pickedPoi.lnglat[0]}, {pickedPoi.lnglat[1]})
              </p>
              <p className="text-xs text-gray-600">
                {pickedPoi.address}
              </p>
            </div>
          )}

        </div>
  );
};

export default App;