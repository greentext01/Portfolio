import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from "react";
import { WindowType } from "./types";

interface Props {
  window: WindowType;
  children: ReactNode;
}

export default function Window({ window }: Props) {
  const [pos, setPos] = useState<[number, number]>([0, 0]);
  const headerRef = useRef<HTMLDivElement>(null);

  const onMouseDown: MouseEventHandler = (e) => {
    if (headerRef.current) {
      let posOnClickX = e.clientX - headerRef.current.clientLeft;
      let posOnClickY = e.clientY - headerRef.current.clientTop;

      console.log(posOnClickX, posOnClickY);

      headerRef.current.onmousemove = (e) => {
        console.log([e.clientX - posOnClickX, e.clientY - posOnClickY]);
        
        setPos([e.clientX - posOnClickX, e.clientY - posOnClickY]);
      };

      document.onmouseup = (e) => {
        headerRef.current!.onmousemove = null;
      };
    }
  };

  return (
    <div onMouseDown={onMouseDown} ref={headerRef} className="select-none w-64 h-40 bg-blue-400 absolute" style={{ left: pos[0], top: pos[1] }}>
      {window.title}
    </div>
  );
}
