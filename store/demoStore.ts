import { create } from "zustand";

interface DemoStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useDemoStore = create<DemoStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open: open }),
}));
