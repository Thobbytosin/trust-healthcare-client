import { IDoctor } from "@/types/doctor.types";
import { create } from "zustand";

interface DoctorsState {
  doctors: IDoctor[];
  doctor: IDoctor;
  setDoctors: (doctors: IDoctor[]) => void;
  setDoctor: (doctor: IDoctor) => void;
}

export const useDoctorsStore = create<DoctorsState>((set) => ({
  doctors: [],
  doctor: {} as IDoctor,
  setDoctors: (doctors) => set({ doctors }),
  setDoctor: (doctor) => set({ doctor }),
}));
