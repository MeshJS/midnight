import { Outlet, NavLink } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow">
        <nav className="container mx-auto flex gap-4 p-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-semibold transition hover:opacity-80 ${isActive ? 'underline' : ''}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/counter"
            className={({ isActive }) =>
              `font-semibold transition hover:opacity-80 ${isActive ? 'underline' : ''}`
            }
          >
            Counter
          </NavLink>        
          <NavLink
            to="/wallet-ui"
            className={({ isActive }) =>
              `font-semibold transition hover:opacity-80 ${isActive ? 'underline' : ''}`
            }
          >
            Wallet UI
          </NavLink>
        </nav>
      </header>
      <main className="container mx-auto flex-1 py-6">
        <Outlet />
      </main>
    </div>
  );
};