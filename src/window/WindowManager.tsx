import { ReactNode, useEffect } from "react";
import { useWindowStore } from "./store";
import { Vector2 } from "./types";
import { v4 as uuidv4 } from "uuid";

type Props = {
  children: ReactNode;
};

export default function WindowManager() {
  const windows = useWindowStore()

  useEffect(() => {
    windows.add({
      content: <>Hey</>,
      id: uuidv4(),
      pos: [0, 0],
      size: [100, 100],
      title: "Window"
    })
  }, [])

  return (
    <>
      {windows.windows}
    </>
  )
}
