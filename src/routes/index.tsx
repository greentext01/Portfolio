import Toolbar from "../components/Toolbar";
import { useWindows } from "../window/state/useWindows";
import WindowManager from "../window/WindowManager";

export default function Index() {
  const windows = useWindows();

  return (
    <>
      <button
        onClick={() => {
          windows.addWindow({
            children: <></>,
            icon: <>Icon</>,
            title: "Test window",
          });
        }}
      >
        Add window
      </button>
      <WindowManager />
      <Toolbar />
    </>
  );
}
