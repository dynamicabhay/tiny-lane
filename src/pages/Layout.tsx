import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { Menu, Home, BarChart2, Settings, LogOut } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOutUser } = useAuth();

  const gradientText = "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent";

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex relative ${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 flex-col bg-gray-800/90 text-gray-200`}
      >
        {/* Logo */}
<div className="flex items-center justify-center p-4 border-b border-gray-700/50">
  {isSidebarOpen ? (
    <span className={`font-bold text-2xl transition-all duration-300 ${gradientText}`}>
      ChopURL
    </span>
  ) : (
    <span className={`transition-all duration-300`}>
      {/* Brand logo icon for collapsed sidebar */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 010 5.656l-3.536 3.536a4 4 0 01-5.656-5.656l1.414-1.414m8.486-2.828a4 4 0 015.656 5.656l-3.536 3.536a4 4 0 01-5.656-5.656l1.414-1.414"
        />
      </svg>
    </span>
  )}
</div>
        {/* Links */}
        <nav className="flex-1 mt-4 flex flex-col justify-between relative">
          <ul className="space-y-2">
            <li className="px-4 py-2 rounded-md hover:bg-gray-700/60 transition flex items-center gap-3">
              <Home className="w-5 h-5 text-gray-200" />
              {isSidebarOpen && (
                <Link className="text-gray-100 hover:text-white" to="/">
                  Home
                </Link>
              )}
            </li>
            <li className="px-4 py-2 rounded-md hover:bg-gray-700/60 transition flex items-center gap-3">
              <BarChart2 className="w-5 h-5 text-gray-200" />
              {isSidebarOpen && (
                <Link className="text-gray-300 hover:text-white" to="/analytics">
                  Analytics
                </Link>
              )}
            </li>
            <li className="px-4 py-2 rounded-md hover:bg-gray-700/60 transition flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-200" />
              {isSidebarOpen && (
                <Link className="text-gray-300 hover:text-white" to="/settings">
                  Settings
                </Link>
              )}
            </li>
          </ul>

          {/* Sign Out */}
          {user && (
            <button
              className="px-4 py-2 mt-4 bg-red-600/80 hover:bg-red-600 text-white rounded-md transition flex items-center gap-2 justify-center"
              onClick={signOutUser}
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && "Sign Out"}
            </button>
          )}
        </nav>

        {/* Toggle Button */}
        <div
          className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-50 bg-gray-700/90 hover:bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-all"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      </aside>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-900/95 p-4 shadow-lg">
        <span className={`font-bold text-xl ${gradientText}`}>ChopURL</span>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-200 hover:text-white focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <aside className="fixed top-0 left-0 w-64 h-full z-50 bg-gray-800/95 p-4 transition-transform md:hidden shadow-lg">
          {/* Logo */}
          <div className="flex items-center justify-center p-4 border-b border-gray-700/50 mb-4">
            <span className={`font-bold text-2xl ${gradientText}`}>ChopURL</span>
          </div>

          {/* Links */}
          <nav className="flex flex-col space-y-2">
            <Link className="text-gray-100 hover:text-white px-4 py-2 rounded-md" to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link className="text-gray-300 hover:text-white px-4 py-2 rounded-md" to="/analytics" onClick={() => setIsMobileMenuOpen(false)}>
              Analytics
            </Link>
            <Link className="text-gray-300 hover:text-white px-4 py-2 rounded-md" to="/settings" onClick={() => setIsMobileMenuOpen(false)}>
              Settings
            </Link>

            {user && (
              <button
                className="px-4 py-2 mt-4 bg-red-600/80 hover:bg-red-600 text-white rounded-md transition flex items-center gap-2 justify-center"
                onClick={() => {
                  signOutUser();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            )}
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;