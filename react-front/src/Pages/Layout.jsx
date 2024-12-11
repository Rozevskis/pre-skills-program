import { useContext } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const location = useLocation();
  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      Navigate("/");
    }
  }
  const isActive = (path) => location.pathname === path;
  return (
    <>
      <header>
        <nav className="flex flex-row bg-slate-500 rounded-b-md justify-between">
          <Link
            to="/"
            className={`text-white py-2 px-4 ${
              isActive("/", "") ? "bg-slate-600" : ""
            }`}
          >
            Home
          </Link>
          {user ? (
            // Authenticated
            <div className="space-x-4 flex items-center">
              <p className="text-white py-2 px-4">Hello {user.name}</p>
              <form onSubmit={handleLogout}>
                <button className="text-white py-2 px-4 ">Logout</button>
              </form>
            </div>
          ) : (
            // Guest
            <div className="space-x-4 content-center">
              <Link
                to="/register"
                className={` text-white py-2 px-4 ${
                  isActive("/register", "") ? "bg-slate-600" : ""
                }`}
              >
                Register
              </Link>
              <Link
                to="/login"
                className={`text-white py-2 px-4 ${
                  isActive("/login") ? "bg-slate-600" : ""
                }`}
              >
                Login
              </Link>
            </div>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
