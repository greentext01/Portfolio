import { ReactNode } from "react";

export type Vector2 = [number, number]

export interface WindowType {
  id: string;
  size: Vector2;
  pos: Vector2;
  title: string;
}

export interface WindowState {
  windows: WindowType[];
  add: (win: WindowType) => void;
  remove: (id: string) => void;
}
