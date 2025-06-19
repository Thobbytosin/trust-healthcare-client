export type SeletectedSlotsType = {
  [date: string]: {
    [doctorId: string]: { slot: string; session: string };
  };
};

export type BookingAction =
  | { type: "SET_APPOINTMENT_TYPE"; payload: string }
  | { type: "SET_APPOINTMENT_REASON"; payload: string }
  | {
      type: "SET_APPOINTMENT_TIME_SLOTS";
      payload: SeletectedSlotsType;
    };

export interface BookingState {
  appointmentType: string | null;
  reason: string | null;
  timeSlots: SeletectedSlotsType | null;
}
