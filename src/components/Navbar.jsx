import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Jobs", path: "/jobs" },
    { label: "My Application", path: "/applications" },
    { label: "Saved", path: "/saved" },
    { label: "Profile", path: "/profile" },
  ];

  // New: No underline, no hover
  // Active: bold, light-blue pill
  const activeClass =
    "bg-blue-300 text-blue-900 rounded-full px-4 py-1 font-bold text-base shadow";
  const defaultClass =
    "text-white font-medium cursor-pointer text-base transition-all duration-200";

  return (
    <nav className="bg-blue-700 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo section */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white font-bold text-2xl tracking-tight">
              Job Portal
            </span>
          </div>
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? `${defaultClass} ${activeClass}` : defaultClass
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMobileMenu}
              type="button"
              aria-label="Toggle mobile menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none transition"
            >
              <svg
                className="block h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Links */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <ul className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${defaultClass} ${activeClass} block text-center`
                      : `${defaultClass} block text-center`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
