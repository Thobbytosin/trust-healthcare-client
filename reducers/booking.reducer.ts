import { BookingAction, BookingState } from "@/types/booking.types";

export const initialBookingState: BookingState = {
  appointmentType: null,
  reason: null,
  timeSlots: null,
};

export function bookingReducer(
  state: BookingState,
  action: BookingAction
): BookingState {
  switch (action.type) {
    case "SET_APPOINTMENT_TYPE":
      return { ...state, appointmentType: action.payload };

    case "SET_APPOINTMENT_REASON":
      return { ...state, reason: action.payload };

    case "SET_APPOINTMENT_TIME_SLOTS":
      return { ...state, timeSlots: action.payload };

    default:
      return state;
  }
}
