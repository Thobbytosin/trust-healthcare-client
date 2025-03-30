import { create } from "zustand";

export interface IDoctor {
  name?: string;
  email?: string;
  securityAnswer?: string;
  specialization?: string;
  experience?: string;
  education?: string[];
  hospital?: string;
  licenseNumber?: string;
  certifications?: string[];
  availableDays?: string[];
  timeSlots?: { [key: string]: string[] };
  holidays?: Date[];
  clinicAddress?: string;
  city?: string;
  state?: string;
  zipCode?: number;
  phone?: number;
  altPhone?: string;
  ratings?: number;
  reviews?: {
    patientId: string;
    comment: string;
    rating: number;
    date: Date;
  }[];
  appointments?: string[];
  maxPatientsPerDay?: number;
  about?: string;
  thumbnail?: { id: string; url: string };
  verificationStatus?: "Processing" | "Verified" | "Failed" | "Completed";
}

interface DoctorsState {
  doctors: IDoctor[];
  setDoctors: (doctors: IDoctor[]) => void;
}

export const useDoctorsStore = create<DoctorsState>((set) => ({
  doctors: [],
  setDoctors: (doctors) => set({ doctors }),
}));
