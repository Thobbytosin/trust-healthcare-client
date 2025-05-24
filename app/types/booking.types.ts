export type BookingAction =
  | { type: "SET_APPOINTMENT_TYPE"; payload: string }
  | { type: "SET_APPOINTMENT_REASON"; payload: string };

export interface BookingState {
  appointmentType: string;
  reason: string;
}
