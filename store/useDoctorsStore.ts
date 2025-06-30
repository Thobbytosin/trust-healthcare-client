import { TDoctor } from "@/types/doctor.types";
import { create } from "zustand";

interface DoctorsState {
  doctors: TDoctor[];
  doctor: TDoctor;
  setDoctor: (doctor: TDoctor) => void;
}

export const useDoctorsStore = create<DoctorsState>((set) => ({
  doctors: [],
  doctor: {} as TDoctor,
  setDoctor: (doctor) => set({ doctor }),
}));
