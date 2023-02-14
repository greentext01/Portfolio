import { ReactNode } from "react";
import { useResize } from "./hooks/useResize";
import { useWindows } from "./state/useWindows";

export interface WindowInfo {
  children: ReactNode;
  title: string;
  icon: string | ReactNode;
}

export interface WindowStateItem extends WindowInfo {
  id: string;
  zIndex: number;
}

const RESIZE_CORNER_SIZE = 20;
const RESIZE_SIDE_SIZE = 5;

export default function Window({
  children,
  icon,
  title,
  zIndex,
  id,
}: WindowStateItem) {
  const resize = useResize(200, 150, 500, 300);
  const windows = useWindows();

  return (
    <div
      className="select-none bg-coffee-800 absolute p-2 shadow-lg border-coffee-600 pt-2 border"
      ref={resize.refs.window}
      style={{
        left: resize.state.fullscreen ? 0 : resize.state.pos[0],
        top: resize.state.fullscreen ? 0 : resize.state.pos[1],
        width: resize.state.fullscreen ? "100%" : resize.state.size[0],
        height: resize.state.fullscreen ? "100%" : resize.state.size[1],
        borderRadius: resize.state.fullscreen ? 0 : "1rem",
        zIndex,
      }}
      onMouseDown={() => windows.focus(id)}
    >
      {!resize.state.fullscreen && (
        <>
          <div
            className={`absolute cursor-nw-resize`}
            ref={resize.refs.corners.topLeft}
            onMouseDown={resize.handlers.corners.topLeft}
            style={{
              width: RESIZE_CORNER_SIZE,
              height: RESIZE_CORNER_SIZE,
              top: -RESIZE_CORNER_SIZE / 2,
              left: -RESIZE_CORNER_SIZE / 2,
            }}
          />
          <div
            className={`absolute cursor-sw-resize`}
            ref={resize.refs.corners.bottomLeft}
            onMouseDown={resize.handlers.corners.botttomLeft}
            style={{
              width: RESIZE_CORNER_SIZE,
              height: RESIZE_CORNER_SIZE,
              bottom: -RESIZE_CORNER_SIZE / 2,
              left: -RESIZE_CORNER_SIZE / 2,
            }}
          />
          <div
            className={`absolute cursor-ne-resize`}
            onMouseDown={resize.handlers.corners.topRight}
            style={{
              width: RESIZE_CORNER_SIZE,
              height: RESIZE_CORNER_SIZE,
              top: -RESIZE_CORNER_SIZE / 2,
              right: -RESIZE_CORNER_SIZE / 2,
            }}
            ref={resize.refs.corners.topRight}
          />
          <div
            className={`absolute cursor-se-resize`}
            ref={resize.refs.corners.bottomRight}
            onMouseDown={resize.handlers.corners.bottomRight}
            style={{
              width: RESIZE_CORNER_SIZE,
              height: RESIZE_CORNER_SIZE,
              bottom: -RESIZE_CORNER_SIZE / 2,
              right: -RESIZE_CORNER_SIZE / 2,
            }}
          />

          <div
            className={`absolute cursor-n-resize`}
            onMouseDown={resize.handlers.sides.top}
            ref={resize.refs.sides.top}
            style={{
              left: RESIZE_CORNER_SIZE / 2,
              right: RESIZE_CORNER_SIZE / 2,
              height: RESIZE_SIDE_SIZE,
              top: -RESIZE_SIDE_SIZE / 2,
            }}
          />
          <div
            className={`absolute cursor-e-resize`}
            onMouseDown={resize.handlers.sides.right}
            ref={resize.refs.sides.right}
            style={{
              right: -RESIZE_SIDE_SIZE / 2,
              width: RESIZE_SIDE_SIZE,
              bottom: RESIZE_CORNER_SIZE / 2,
              top: RESIZE_CORNER_SIZE / 2,
            }}
          />
          <div
            className={`absolute cursor-s-resize`}
            ref={resize.refs.sides.bottom}
            onMouseDown={resize.handlers.sides.bottom}
            style={{
              left: RESIZE_CORNER_SIZE / 2,
              height: RESIZE_SIDE_SIZE,
              bottom: -RESIZE_SIDE_SIZE / 2,
              right: RESIZE_CORNER_SIZE / 2,
            }}
          />
          <div
            className={`absolute cursor-w-resize`}
            ref={resize.refs.sides.left}
            onMouseDown={resize.handlers.sides.left}
            style={{
              left: -RESIZE_SIDE_SIZE / 2,
              width: RESIZE_SIDE_SIZE,
              bottom: RESIZE_CORNER_SIZE / 2,
              top: RESIZE_CORNER_SIZE / 2,
            }}
          />
        </>
      )}

      <div
        className="text-coffee-100 font-mono font-bold flex text-xs mb-1"
        onMouseDown={resize.handlers.moveHandler}
      >
        <div className="flex items-center gap-2">
          {icon}
          {title}
        </div>

        <div className="flex ml-auto gap-2.5 mr-[1px]">
          <button onMouseDown={resize.events.onMinimize}>
            <img src="/Minimize.svg" alt="Minimize" />
          </button>
          <button onMouseDown={resize.events.onFullscreen}>
            <img src="/Fullscreen.svg" alt="Fullscreen" />
          </button>
          <button
            onMouseDown={() => {
              console.log(id);
              windows.removeWindow(id);
            }}
          >
            <img src="/Close.svg" alt="Close" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
