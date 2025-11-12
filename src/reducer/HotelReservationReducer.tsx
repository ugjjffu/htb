// --- 1. State Interface (The Data) ---
export interface State { // Often useful to export the State type too
  open: boolean;
  level: string;
  search_box_open:boolean;
  search_box_text:string;
}

// --- 2. Action Interfaces (The Operations) ---
// Define a union type for all possible actions
export type Action = 
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'SET_LEVEL'; payload: string }
  | {type:  'SET_SEARCHBOX_OPEN',payload: boolean}
  | {type:  'SET_SEARCHBOX_TEXT',payload: string};

// --- 3. Initial State (CORRECTED: Exported) ---
export const initialState: State = {
  open: false,
  level: '⭐', // Default level
  search_box_open: false,
  search_box_text: '',
};

// --- 4. Reducer Function (Corrected Export) ---
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_OPEN':
      return {
        ...state,
        open: action.payload,
      };
    case 'SET_LEVEL':
      return {
        ...state,
        level: action.payload,
      };
    case 'SET_SEARCHBOX_TEXT':
      return {
        ...state,
        search_box_text: action.payload,
      };
    case 'SET_SEARCHBOX_OPEN':
      return {
        ...state,
        search_box_open: action.payload,
      };
    default:
      // Always throw an error if an unknown action is dispatched
      throw new Error(`Unhandled action type:`);
  }
}