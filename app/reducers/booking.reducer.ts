import { BookingAction, BookingState } from "@/types/booking.types";

export const initialBookingState: BookingState = {
  appointmentType: "none",
  reason: "none",
};

export function bookingReducer(
  state: BookingState,
  action: BookingAction
): BookingState {
  switch (action.payload) {
    case "SET_APPOINTMENT_TYPE":
      return { ...state, appointmentType: action.payload };

    case "SET_APPOINTMENT_REASON":
      return { ...state, reason: action.payload };
    default:
      return state;
  }
}
