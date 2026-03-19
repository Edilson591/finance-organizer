import { PropsHeader } from "../Header";

export const ButtonHeader = ({ sidebarOpen, setSidebarOpen }: PropsHeader) => {
  return (
    <button
      aria-controls="sidebar"
      onClick={(e) => {
        e.stopPropagation();
        setSidebarOpen(!sidebarOpen);
      }}
      className="
        z-50 lg:hidden
        rounded-xl p-2
        backdrop-blur-md
        bg-white/40 dark:bg-gray-900/40
        border border-white/30 dark:border-gray-700/40
        shadow-sm
        transition-all duration-300

        hover:bg-white/60 dark:hover:bg-gray-900/60
        hover:scale-105
        active:scale-95
      "
    >
      <span className="relative block h-4 w-4">
        {/* Hamburger */}
        <span className="absolute inset-0">
          <span
            className={`block h-0.5 w-full bg-gray-800 dark:bg-white transition-all duration-300 ${
              sidebarOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-gray-800 dark:bg-white my-1 transition-all duration-300 ${
              sidebarOpen ? "opacity-0 " : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-gray-800 dark:bg-white transition-all duration-300 ${
              sidebarOpen ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </span>
      </span>
    </button>
  );
};
