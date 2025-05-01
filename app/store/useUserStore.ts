import { create } from "zustand";
import { IDoctorFree } from "../components/home/MeetDoctors";

export interface User {
  name: string;
  email: string;
  verified: boolean;
  lastLogin: Date;
  lastPasswordReset: Date;
  role: [string];
}

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {} as User,
  setUser: (user) => set({ user }),
}));
