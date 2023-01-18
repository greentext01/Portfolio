import { MouseEventHandler, ReactNode, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Window from "./Window";

type Props = {
  children: ReactNode;
};

export default function WindowManager() {
  const mouseDown: MouseEventHandler = (e) => {};

  return (
    <Window
      window={{
        id: uuidv4(),
        pos: [0, 0],
        size: [100, 100],
        title: "Window",
      }}
    >
      Hello!
    </Window>
  );
}
