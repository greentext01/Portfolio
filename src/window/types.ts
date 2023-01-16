import { ReactNode } from "react";

export type Vector2 = [number, number]

export interface Window {
  id: string;
  size: Vector2;
  pos: Vector2;
  title: string;
  content: ReactNode;
}

export interface WindowState {
  windows: Window[];
  add: (win: Window) => void;
  remove: (id: string) => void;
}
