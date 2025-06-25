import { create } from "zustand";

interface SidebarState {
  activePageId: number;
  setActivePageId: (activePageId: number) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  activePageId: 0,
  setActivePageId: (activePageId) => set({ activePageId }),
}));
