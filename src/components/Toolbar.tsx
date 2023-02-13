import { useWindows } from "../window/state/useWindows";

export default function Toolbar() {
  const windows = useWindows()

  return (
    <div className="bottom-10 left-10 right-10 h-20 absolute rounded-2xl bg-coffee-800 border border-coffee-600 shadow-lg">

    </div>
  )
}