import { User } from "@/types/user.types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  userLoading: boolean;
  setUser: (user: User | null) => void;
  setUserLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userLoading: true,
  setUser: (user) => set({ user }),
  setUserLoading: (loading) => set({ userLoading: loading }),
  logout: () => set({ user: null }),
}));
