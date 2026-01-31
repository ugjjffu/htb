'use client'
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs type
import { Tip } from '@/component/SearchResultItem';
// --- TYPES & INTERFACES ---

// Define the type for the 'City' string literal/enum if you have one, or just use string
// type City = 'New York' | 'Paris' | 'London'; 
type City = string; // Using string for flexibility if City type isn't provided
export interface AppState {
  // New States
  selectedCity: City;
  openCityOptions: boolean;
  openCalendarOfCheckIn: boolean;
  panelValueOfCheckIn: number;
  openCalendarOfCheckOut: boolean;
  panelValueOfCheckOut: number;
  selectedCheckInValue: number;
  selectedCheckOutValue: number;
  rooms: number;
  adults: number;
  childrens: number;
  // Existing States (from your original reducer)
  open: boolean;
  level: string;
  search_box_open: boolean;
  search_box_text: string;
  stateOfLevelDropDown: boolean;
  searchInput: string;
  isLoading: boolean;
  searchResult: string;
  tips: Array<Tip>;
  isGeoInputBoxFocus: boolean;
  choosenCity: string;
  showMoreOpen: boolean;
  recommendedSelectedCity: string;
  recommendedHotelDetail: string;
  selectedCategoryOfCity: string;
  isChineseMainland: boolean;
  selectedHotCity: string;
  showMoreCityOfPlaceOfDeparture: boolean;
  placeOfDeparture: string;
}
export const initialState: AppState = {
  // New States
  selectedCity: 'New York', // Default city, matching your original useState
  openCityOptions: false,
  openCalendarOfCheckIn: false,
  // Initializing with dayjs() ensures the state is of type Dayjs
  panelValueOfCheckIn: Date.now(),
  openCalendarOfCheckOut: false,
  // Initializing with dayjs() ensures the state is of type Dayjs
  panelValueOfCheckOut: Date.now(),
  selectedCheckInValue: Date.now(), // Initializing to null for optional selection
  selectedCheckOutValue: Date.now(), // Initializing to null for optional selection
  rooms: 1, // Default value, matching your original useState
  adults: 1, // Default value, matching your original useState
  childrens: 0, // Default value, matching your original useState
  stateOfLevelDropDown: false,
  // Existing States
  open: false,
  level: '⭐', // Default level
  search_box_open: false,
  search_box_text: '',
  searchInput: '',
  isLoading: false,
  searchResult: "",
  tips: [],
  isGeoInputBoxFocus: false,
  choosenCity: "北京",
  showMoreOpen: false,
  recommendedSelectedCity: "杭州",
  recommendedHotelDetail: "",
  selectedCategoryOfCity: "1",
  isChineseMainland: true,
  showMoreCityOfPlaceOfDeparture: false,
  placeOfDeparture: '广东',
  selectedHotCity:'北京',
};
// Define a union type for all possible actions
export type AppAction =
  // New Actions
  | { type: 'SET_SELECTED_CITY'; payload: City }
  | { type: 'SET_OPEN_CITY_OPTIONS'; payload: boolean }
  | { type: 'SET_OPEN_CALENDAR_CHECKIN'; payload: boolean }
  | { type: 'SET_PANEL_VALUE_CHECKIN'; payload: number }
  | { type: 'SET_OPEN_CALENDAR_CHECKOUT'; payload: boolean }
  | { type: 'SET_PANEL_VALUE_CHECKOUT'; payload: number }
  | { type: 'SET_SELECTED_CHECKIN_VALUE'; payload: number}
  | { type: 'SET_SELECTED_CHECKOUT_VALUE'; payload: number}
  | { type: 'SET_ROOMS'; payload: number }
  | { type: 'SET_ADULTS'; payload: number }
  | { type: 'SET_CHILDRENS'; payload: number }
  // Existing Actions
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'SET_LEVEL'; payload: string }
  | { type: 'SET_SEARCHBOX_OPEN'; payload: boolean }
  | { type: 'SET_LEVELDROPDOWN_OPEN'; payload: boolean }
  | { type: 'SET_SEARCH_INPUT'; payload: string }
  | { type: 'SET_SEARCHBOX_TEXT'; payload: string }
  | { type: 'SET_ISLOADING'; payload: boolean }
  | { type: 'SET_HOTEL_SEARCH_RESULTS'; payload: boolean }
  | { type: 'SET_SEARCH_HOTEL_RESULT'; payload: Array<Tip> }
  | { type: 'SET_GEO_INPUTBOX_FOCUS'; payload: boolean }
  | { type: 'SET_CHOOSEN_CITY'; payload: string }
  | { type: 'SET_SHOW_MORE_OPEN'; payload: boolean }
  | { type: 'SET_RECOMMENDED_SELECTED_CITY'; payload: string }
  | { type: 'SET_RECOMMENDED_HOTEL_DETAILS'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY_OF_CITY'; payload: string }
  | { type: 'SET_IS_CHINESE_MAINLAND'; payload: boolean }
  | { type: 'SET_SHOW_MORE_CITY_OF_PLACE_OF_DEPARTURE'; payload: boolean }
  | { type: 'SET_PLACE_OF_DEPARTURE'; payload: string };


export function reducer(state: AppState | undefined = initialState, action: AppAction): AppState {
  switch (action.type) {
    // --- New Cases ---
    case 'SET_SELECTED_CITY':
      return { ...state, selectedCity: action.payload };
    case 'SET_OPEN_CITY_OPTIONS':
      return { ...state, openCityOptions: action.payload };
    case 'SET_OPEN_CALENDAR_CHECKIN':
      return { ...state, openCalendarOfCheckIn: action.payload };
    case 'SET_PANEL_VALUE_CHECKIN':
      return { ...state, panelValueOfCheckIn: action.payload };
    case 'SET_OPEN_CALENDAR_CHECKOUT':
      return { ...state, openCalendarOfCheckOut: action.payload };
    case 'SET_PANEL_VALUE_CHECKOUT':
      return { ...state, panelValueOfCheckOut: action.payload };
    case 'SET_SELECTED_CHECKIN_VALUE':
      return { ...state, selectedCheckInValue: action.payload };
    case 'SET_SELECTED_CHECKOUT_VALUE':
      return { ...state, selectedCheckOutValue: action.payload };
    case 'SET_ROOMS':
      return { ...state, rooms: action.payload };
    case 'SET_ADULTS':
      return { ...state, adults: action.payload };
    case 'SET_CHILDRENS':
      return { ...state, childrens: action.payload };

    // --- Existing Cases (Adapted for AppState) ---
    case 'SET_OPEN':
      return { ...state, open: action.payload };
    case 'SET_LEVEL':
      return { ...state, level: action.payload };
    case 'SET_SEARCHBOX_TEXT':
      return { ...state, search_box_text: action.payload };
    case 'SET_SEARCHBOX_OPEN':
      return { ...state, search_box_open: action.payload };
    case 'SET_LEVELDROPDOWN_OPEN':
      return { ...state, stateOfLevelDropDown: action.payload };
    case 'SET_SEARCH_INPUT':
      return { ...state, searchInput: action.payload };
    case 'SET_ISLOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_HOTEL_SEARCH_RESULTS':
      return { ...state, isLoading: action.payload };
    case 'SET_SEARCH_HOTEL_RESULT':
      return { ...state, tips: action.payload };
    case 'SET_GEO_INPUTBOX_FOCUS':
      return { ...state, isGeoInputBoxFocus: action.payload };
    case 'SET_CHOOSEN_CITY':
      return { ...state, choosenCity: action.payload };
    case 'SET_SHOW_MORE_OPEN':
      return { ...state, showMoreOpen: action.payload };
    case 'SET_RECOMMENDED_SELECTED_CITY':
      return { ...state, recommendedSelectedCity: action.payload };
    case 'SET_RECOMMENDED_HOTEL_DETAILS':
      return { ...state, recommendedHotelDetail: action.payload };
    case 'SET_SELECTED_CATEGORY_OF_CITY':
      return { ...state, selectedCategoryOfCity: action.payload };
    case 'SET_IS_CHINESE_MAINLAND':
      return { ...state, isChineseMainland: action.payload };
    case 'SET_SHOW_MORE_CITY_OF_PLACE_OF_DEPARTURE':
      return { ...state, showMoreCityOfPlaceOfDeparture: action.payload };
    case 'SET_PLACE_OF_DEPARTURE':
      return { ...state, placeOfDeparture: action.payload };
    default:
      return state;
  }
}