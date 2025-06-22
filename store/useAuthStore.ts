import { User } from "@/types/user.types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  userLoading: boolean;
  setUser: (user: User) => void;
  setUserLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {} as User,
  userLoading: true,
  setUser: (user) => set({ user }),
  setUserLoading: (loading) => set({ userLoading: loading }),
  logout: () => set({ user: null }),
}));
