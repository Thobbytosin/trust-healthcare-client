import { create } from "zustand";

type DailySelectedSlot = {
  [date: string]: {
    [doctordId: string]: { session: string; slot: string };
  };
};
