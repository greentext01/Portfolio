import { create } from "zustand";
import { WindowState } from "./types";

export const useWindowStore = create<WindowState>((set) => ({
  windows: [],
  add: (win) =>
    set((state) => ({
      ...state,
      windows: [...state.windows, win],
    })),
  remove: (id) =>
    set((state) => ({
      ...state,
      windows: state.windows.filter((w) => w.id != id),
    })),
}));
