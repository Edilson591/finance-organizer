import { useState } from "react";
import { Link } from "react-router-dom";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-11 h-11 rounded-full
          flex items-center justify-center
          backdrop-blur-md
          bg-white/40 dark:bg-gray-900/40
          border border-white/30 dark:border-gray-700/40
          text-gray-700 dark:text-gray-300
          shadow-sm
          transition-all duration-300

          hover:bg-white/60 dark:hover:bg-gray-900/60
          hover:scale-105
        "
      >
        👤
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-44
            rounded-xl
            backdrop-blur-md
            bg-white/50 dark:bg-gray-900/50
            border border-white/30 dark:border-gray-700/40
            shadow-lg
            p-2
          "
        >
          <Link
            to="/profile"
            className="block px-3 py-2 rounded-lg hover:bg-white/40 dark:hover:bg-gray-800/40 transition"
          >
            Perfil
          </Link>

          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-lg hover:bg-white/40 dark:hover:bg-gray-800/40 transition"
          >
            Dashboard
          </Link>

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 transition"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};