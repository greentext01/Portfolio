import { useWindows } from "../window/state/useWindows";
import { WindowInfo } from "../window/Window";
import Contact from "./windows/Contact";
import Projects from "./windows/Projects";
import Resume from "./windows/Resume";
import Social from "./windows/Social";
import Terminal from "./windows/Termainal";

const WINDOWS: WindowInfo[] = [
  {
    children: <Terminal />,
    icon: <>☕</>,
    title: "Terminal",
  },
  {
    children: <Resume />,
    icon: <>📃</>,
    title: "Resume",
  },
  {
    children: <Projects />,
    icon: <>🛠️</>,
    title: "Projects",
  },
  {
    children: <Social />,
    icon: <>💬</>,
    title: "Social",
  },
  {
    children: <Contact />,
    icon: <>✉️</>,
    title: "Contact",
  },
];

export default function Toolbar() {
  const windows = useWindows();

  return (
    <nav
      className="bottom-10 left-10 right-10 h-20 absolute rounded-2xl bg-coffee-700 flex items-center px-7 font-bold drop-shadow-lg justify-between"
      style={{ boxShadow: "0px 0px 7px 7px #5E3C1C" }}
    >
      <div className="text-3xl text-coffee-200 blur-xs">
        Olivier&apos;s portfolio
      </div>
      <ul className="text-xl text-coffee-200 gap-5 flex font-mono blur-xs">
        {WINDOWS.map((window, i) => (
          <li
            onClick={() =>
              windows.addWindow(window)
            }
            key={i}
          >
            {window.icon}{window.title.toLowerCase()}
          </li>
        ))}
      </ul>
    </nav>
  );
}
