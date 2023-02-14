import { MouseEventHandler, RefObject, useRef, useState } from "react";
import { clamp } from "../../util/clamp";

interface Handlers {
  moveHandler: MouseEventHandler;
  corners: {
    topRight: MouseEventHandler;
    topLeft: MouseEventHandler;
    bottomRight: MouseEventHandler;
    botttomLeft: MouseEventHandler;
  };
  sides: {
    top: MouseEventHandler;
    right: MouseEventHandler;
    bottom: MouseEventHandler;
    left: MouseEventHandler;
  };
}

interface WindowRefs {
  window: RefObject<HTMLDivElement>;
  corners: {
    topRight: RefObject<HTMLDivElement>;
    topLeft: RefObject<HTMLDivElement>;
    bottomRight: RefObject<HTMLDivElement>;
    bottomLeft: RefObject<HTMLDivElement>;
  };

  sides: {
    top: RefObject<HTMLDivElement>;
    right: RefObject<HTMLDivElement>;
    bottom: RefObject<HTMLDivElement>;
    left: RefObject<HTMLDivElement>;
  };
}

interface ResizeResult {
  refs: WindowRefs;
  handlers: Handlers;
  state: {
    pos: [number, number];
    size: [number, number];
    fullscreen: boolean;
    minimized: boolean;
  };
  events: {
    onFullscreen: () => unknown;
    onMinimize: () => unknown;
  };
}

interface ResizeContext {
  bottomOnClick: number;
  rightOnClick: number;
  centerOffsetOnClickX: number;
  centerOffsetOnClickY: number;
  offsetOnClickX: number;
  offsetOnClickY: number;
  clientRect: DOMRect;
}

export function useResize(
  minSizeX: number,
  minSizeY: number,
  startSizeX: number,
  startSizeY: number
): ResizeResult {
  const [pos, setPos] = useState<[number, number]>([0, 0]);
  const [fullscreen, setFullscreen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [size, setSize] = useState<[number, number]>([
    Math.max(startSizeX, minSizeX),
    Math.max(startSizeY, minSizeY),
  ]);

  const windowRef = useRef<HTMLDivElement>(null);

  const topRightRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  const onFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const onMinimize = () => {
    setMinimized(true);
  };

  const createResizeHandler = (
    ref: RefObject<HTMLDivElement>,
    onMouseMove: (ctx: ResizeContext, ev: MouseEvent) => unknown
  ): MouseEventHandler => {
    const handler: MouseEventHandler = (e) => {
      if (minimized || ref.current === null) return;

      const bottomOnClick = pos[1] + size[1];
      const rightOnClick = pos[0] + size[0];
      const clientRect = ref.current!.getBoundingClientRect();

      const centerOffsetOnClickX =
        e.clientX - (clientRect.left + clientRect.width / 2);
      const centerOffsetOnClickY =
        e.clientY - (clientRect.top + clientRect.height / 2);

      const offsetOnClickX = e.clientX - clientRect.left;
      const offsetOnClickY = e.clientY - clientRect.top;

      const ctx: ResizeContext = {
        bottomOnClick,
        centerOffsetOnClickX,
        centerOffsetOnClickY,
        clientRect,
        rightOnClick,
        offsetOnClickX,
        offsetOnClickY,
      };

      document.onmousemove = onMouseMove.bind(null, ctx);

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    };

    return handler;
  };

  const topRightResizeHandler = createResizeHandler(topRightRef, (ctx, e) => {
    const sizeX =
      e.clientX - windowRef.current!.offsetLeft - ctx.centerOffsetOnClickX;
    const sizeY = ctx.bottomOnClick - e.clientY + ctx.centerOffsetOnClickY;

    setSize([Math.max(sizeX, minSizeX), Math.max(sizeY, minSizeY)]);
    setPos([
      pos[0],
      sizeY >= minSizeY
        ? e.clientY - ctx.centerOffsetOnClickY
        : ctx.bottomOnClick - minSizeY,
    ]);
  });

  const topLeftResizeHandler = createResizeHandler(topLeftRef, (ctx, e) => {
    const sizeX = ctx.rightOnClick - e.clientX + ctx.centerOffsetOnClickX;
    const sizeY = ctx.bottomOnClick - e.clientY + ctx.centerOffsetOnClickY;

    setSize([Math.max(sizeX, minSizeX), Math.max(sizeY, minSizeY)]);

    setPos([
      sizeX >= minSizeX
        ? e.clientX - ctx.centerOffsetOnClickX
        : ctx.rightOnClick - minSizeX,
      sizeY >= minSizeY
        ? e.clientY - ctx.centerOffsetOnClickY
        : ctx.bottomOnClick - minSizeY,
    ]);
  });

  const bottomRightResizeHandler = createResizeHandler(
    bottomRightRef,
    (ctx, e) => {
      const sizeX =
        e.clientX - windowRef.current!.offsetLeft - ctx.centerOffsetOnClickX;
      const sizeY =
        e.clientY - windowRef.current!.offsetTop - ctx.centerOffsetOnClickY;

      setSize([Math.max(sizeX, minSizeX), Math.max(sizeY, minSizeY)]);
    }
  );

  const botttomLeftResizeHandler = createResizeHandler(
    bottomLeftRef,
    (ctx, e) => {
      const sizeX = ctx.rightOnClick - e.clientX + ctx.centerOffsetOnClickX;

      const sizeY =
        e.clientY - windowRef.current!.offsetTop - ctx.centerOffsetOnClickY;

      setSize([Math.max(sizeX, minSizeX), Math.max(sizeY, minSizeY)]);

      setPos([
        sizeX >= minSizeX
          ? e.clientX - ctx.centerOffsetOnClickX
          : ctx.rightOnClick - minSizeX,
        pos[1],
      ]);
    }
  );

  const moveHandler = createResizeHandler(windowRef, (ctx, e) => {
    let finalX, finalY;
    if (fullscreen) {
      mousePosOnClick
      pos = mousePosOnClick
      setFullscreen(false);
    } else {
      finalX = e.clientX - ctx.offsetOnClickX;
      finalY = e.clientY - ctx.offsetOnClickY;
    }

    setPos([
      clamp(
        finalX,
        -ctx.offsetOnClickX,
        globalThis.window.innerWidth - ctx.offsetOnClickX
      ),

      clamp(
        finalY,
        -ctx.offsetOnClickY,
        globalThis.window.innerHeight - ctx.offsetOnClickY
      ),
    ]);
  });

  const topResizeHandler = createResizeHandler(topRef, (ctx, e) => {
    const sizeY = ctx.bottomOnClick - e.clientY + ctx.centerOffsetOnClickY;

    setSize([size[0], Math.max(sizeY, minSizeY)]);
    setPos([
      pos[0],
      sizeY >= minSizeY
        ? e.clientY - ctx.centerOffsetOnClickY
        : ctx.bottomOnClick - minSizeY,
    ]);
  });

  const rightResizeHandler = createResizeHandler(rightRef, (ctx, e) => {
    const sizeX =
      e.clientX - windowRef.current!.offsetLeft - ctx.centerOffsetOnClickX;

    setSize([Math.max(sizeX, minSizeX), size[1]]);
  });

  const bottomResizeHandler = createResizeHandler(bottomRef, (ctx, e) => {
    const sizeY =
      e.clientY - windowRef.current!.offsetTop - ctx.centerOffsetOnClickY;

    setSize([size[0], Math.max(sizeY, minSizeY)]);
  });

  const leftResizeHandler = createResizeHandler(leftRef, (ctx, e) => {
    const sizeX = ctx.rightOnClick - e.clientX + ctx.centerOffsetOnClickX;

    setSize([Math.max(sizeX, minSizeX), size[1]]);

    setPos([
      sizeX >= minSizeX
        ? e.clientX - ctx.centerOffsetOnClickX
        : ctx.rightOnClick - minSizeX,
      pos[1],
    ]);
  });

  return {
    handlers: {
      moveHandler,
      corners: {
        bottomRight: bottomRightResizeHandler,
        botttomLeft: botttomLeftResizeHandler,
        topLeft: topLeftResizeHandler,
        topRight: topRightResizeHandler,
      },
      sides: {
        top: topResizeHandler,
        right: rightResizeHandler,
        bottom: bottomResizeHandler,
        left: leftResizeHandler,
      },
    },
    refs: {
      window: windowRef,
      corners: {
        bottomLeft: bottomLeftRef,
        bottomRight: bottomRightRef,
        topLeft: topLeftRef,
        topRight: topRightRef,
      },
      sides: {
        bottom: bottomRef,
        left: leftRef,
        right: rightRef,
        top: topRef,
      },
    },
    state: {
      pos,
      size,
      fullscreen,
      minimized,
    },
    events: {
      onFullscreen,
      onMinimize,
    },
  };
}
