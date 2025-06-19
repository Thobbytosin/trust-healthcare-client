import { User } from "@/types/user.types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {} as User,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
