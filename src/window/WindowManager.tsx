import { useWindows } from "./state/useWindows";
import Window from "./Window";

export default function WindowManager() {
  const windows = useWindows();

  return (
    <>
      {windows.windows.map((window, i) => (
        <Window {...window} key={i}>Hello!</Window>
      ))}
    </>
  );
}
