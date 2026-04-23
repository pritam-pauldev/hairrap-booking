import { createContext, useContext, useReducer, useEffect } from "react";
import { MOCK_BOOKINGS } from "../services/mockData";

const BookingContext = createContext(null);

const initialState = {
  bookings: MOCK_BOOKINGS,
  darkMode: false,
  chatOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_BOOKING":
      return { ...state, bookings: [action.payload, ...state.bookings] };

    case "CANCEL_BOOKING":
      return {
        ...state,
        bookings: state.bookings.map((b) =>
          b.id === action.payload ? { ...b, status: "canceled" } : b,
        ),
      };

    case "TOGGLE_DARK":
      return { ...state, darkMode: !state.darkMode };

    case "SET_CHAT_OPEN":
      return { ...state, chatOpen: action.payload };

    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.darkMode);
  }, [state.darkMode]);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
