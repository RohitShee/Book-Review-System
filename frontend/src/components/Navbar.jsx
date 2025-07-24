// components/Navbar.jsx
import { LogIn, UserPlus, UserCircle, LogOut, Book } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Left: App Name */}
      <Link to="/" className="flex items-center gap-2 font-bold text-xl text-teal-600">
        <Book className="w-5 h-5" /> PlotPoint
      </Link>

      {/* Right: Auth Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <UserCircle className="w-5 h-5" />
              <span>{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-red-500 hover:underline"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm text-gray-700 hover:underline"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-1 text-sm text-gray-700 hover:underline"
            >
              <UserPlus className="w-4 h-4" /> Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
