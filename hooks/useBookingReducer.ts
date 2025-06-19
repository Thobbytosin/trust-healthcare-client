import {
  bookingReducer,
  initialBookingState,
} from "@/reducers/booking.reducer";
import { SeletectedSlotsType } from "@/types/booking.types";
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
    setAppointmentTimeSlots: (value: SeletectedSlotsType) => {
      dispatch({ type: "SET_APPOINTMENT_TIME_SLOTS", payload: value });
    },
  };

  return { bookingState, bookingActions };
}
