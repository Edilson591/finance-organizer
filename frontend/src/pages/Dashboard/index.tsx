import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/userAuth";
import Header from "../../components/Header";
import { useState } from "react";

const navItems = [
  { path: "/dashboard", label: "Visao geral" },
  { path: "/dashboard/transactions", label: "Transacoes" },
  { path: "/dashboard/categories", label: "Categorias" },
];

export default function DashboardLayout() {
  const location = useLocation();
  const { meQuery, logoutUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const username = meQuery.data?.user.username || "Usuario";
  const email = meQuery.data?.user.email || "-";

  return (
    <section className="dashboard-layout">
      <aside
        className="sidebar absolute left-[-1px] top-0 z-99999 flex h-screen flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static    -translate-x-full
        lg:translate-x-0"
      >
        <div className="sidebar-brand">
          <strong>Finance Organizer</strong>
          <span>Painel financeiro</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="logout-button" onClick={logoutUser}>
          Sair
        </button>
      </aside>

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="dashboard-content">
          <header className="dashboard-header">
            <div>
              <p>Bem-vindo</p>
              <h1>{username}</h1>
            </div>
            <small>{email}</small>
          </header>

          <Outlet />
        </main>
      </div>
    </section>
  );
}
