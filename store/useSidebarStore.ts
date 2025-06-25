import { create } from "zustand";

interface SidebarState {
  activePage: string;
  setActivePage: (activePage: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  activePage: "/",
  setActivePage: (activePage) => set({ activePage }),
}));
