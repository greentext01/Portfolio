import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { WindowInfo, WindowStateItem } from "../Window";

export interface WindowState {
  windows: WindowStateItem[];
  addWindow: (window: WindowInfo) => void;
  removeWindow: (id: string) => void;
  focus: (id: string) => void;
}

export const useWindows = create<WindowState>()((set) => ({
  windows: [],
  addWindow: (newWindow) =>
    set((state) => {
      console.log(state.windows);
      const window: WindowStateItem = {
        ...newWindow,
        id: uuidv4(),
        zIndex: state.windows.length,
      };

      return { windows: [...state.windows, window] };
    }),
  removeWindow: (id) =>
    set((state) => ({ windows: state.windows.filter((i) => i.id !== id) })),
  focus: (id) =>
    set((state) => {
      const target = state.windows.find((w) => w.id === id);
      if (!target) return { windows: state.windows };

      return {
        windows: state.windows.map((w) => {
          if (w.id === id) {
            return {
              ...w,
              zIndex: state.windows.length,
            }
          } else {
            return {
              ...w,
              zIndex: w.zIndex > target.zIndex ? w.zIndex - 1 : w.zIndex,
            }
          }
        }),
      };
    }),
}));
