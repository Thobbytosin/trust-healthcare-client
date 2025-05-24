import {
  bookingReducer,
  initialBookingState,
} from "@/reducers/booking.reducer";
import { useReducer } from "react";

export function useBookingReducer() {
  const [bookingState, dispatch] = useReducer(
    bookingReducer,
    initialBookingState
  );

  const bookingActions = {
    setAppointmentType: (value: string) => {
      dispatch({ type: "SET_APPOINTMENT_TYPE", payload: value });
    },
    setAppointmentReason: (value: string) => {
      dispatch({ type: "SET_APPOINTMENT_REASON", payload: value });
    },
  };

  return { bookingState, bookingActions };
}
