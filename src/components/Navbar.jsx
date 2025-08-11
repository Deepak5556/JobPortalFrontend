import React, { useState } from "react";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

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
              <li className="text-white hover:text-blue-200 font-medium cursor-pointer transition-colors duration-150">
                Dashboard
              </li>
              <li className="text-white hover:text-blue-200 font-medium cursor-pointer transition-colors duration-150">
                Jobs
              </li>
              <li className="text-white hover:text-blue-200 font-medium cursor-pointer transition-colors duration-150">
                My Application
              </li>
              <li className="text-white hover:text-blue-200 font-medium cursor-pointer transition-colors duration-150">
                Saved
              </li>
              <li className="text-white hover:text-blue-200 font-medium cursor-pointer transition-colors duration-150">
                Profile
              </li>
            </ul>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMobileMenu}
              type="button"
              aria-label="Toggle mobile menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none transition"
            >
              <svg
                className="block h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  // Close menu icon
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon
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
            <li className="block text-white hover:text-blue-200 font-medium py-2 px-4 cursor-pointer transition-colors duration-150">
              Dashboard
            </li>
            <li className="block text-white hover:text-blue-200 font-medium py-2 px-4 cursor-pointer transition-colors duration-150">
             Jobs
            </li>
            <li className="block text-white hover:text-blue-200 font-medium py-2 px-4 cursor-pointer transition-colors duration-150">
              My Application
            </li>
            <li className="block text-white hover:text-blue-200 font-medium py-2 px-4 cursor-pointer transition-colors duration-150">
              Saved
            </li>
            <li className="block text-white hover:text-blue-200 font-medium py-2 px-4 cursor-pointer transition-colors duration-150">
              Profile
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
