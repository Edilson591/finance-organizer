import { Link } from "react-router-dom";
import { useSidebar } from "../../context/SideBarContext";
import { ButtonHeader } from "../ButtonsHeader";
import { UserMenu } from "./UserMenu";
import { MenuToggle } from "./MenuToogle";

export type PropsHeader = {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
};

export default function Header({ sidebarOpen, setSidebarOpen }: PropsHeader) {
  const token = localStorage.getItem("token");
  const { isMobileOpen, toggleMobileSidebar, toggleSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="p-4">
      <nav className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <ButtonHeader
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />

          <MenuToggle isOpen={isMobileOpen} onClick={handleToggle} />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {!token && (
            <Link
              to="/login"
              className="
                px-4 py-2 rounded-xl
                backdrop-blur-md
                bg-white/40 dark:bg-gray-900/40
                border border-white/30 dark:border-gray-700/40
                hover:bg-white/60 transition
              "
            >
              Login
            </Link>
          )}

          {token && <UserMenu />}
        </div>
      </nav>
    </header>
  );
}
