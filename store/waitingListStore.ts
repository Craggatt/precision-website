import { create } from "zustand";

interface WaitingListStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useWaitingListStore = create<WaitingListStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open: open }),
}));
