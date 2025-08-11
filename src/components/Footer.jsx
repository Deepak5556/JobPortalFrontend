import React from "react";

const Footer = () => (
  <footer className="bg-blue-700 text-white mt-12">
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        {/* Logo and Brand */}
        <div className="mb-6 md:mb-0 flex items-center">
          <span className="font-bold text-2xl tracking-tight mr-2">
            Job Portal
          </span>
          <span className="ml-2 text-blue-200 text-sm hidden sm:inline">
            Empowering Your Career
          </span>
        </div>
        {/* Navigation */}
        <ul className="flex flex-wrap items-center space-x-6 text-blue-100 text-sm">
          <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">Search Jobs</li>
          <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">My Applications</li>
          <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">Profile</li>
          <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">Contact</li>
        </ul>
        {/* Social Links */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-300 transition-colors">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C3.33 3.5 2 4.85 2 6.48c0 1.61 1.32 2.98 2.98 2.98h.02C6.66 9.46 8 8.11 8 6.48 8 4.85 6.66 3.5 4.98 3.5zM2.4 21V8.98h5.16V21H2.4zm7.72 0V14.81c0-1.47.03-3.36-2.05-3.36-2.05 0-2.36 1.6-2.36 3.25V21H2.4c.01-8.16 0-8.98 0-8.98h5.15V9.52c.69-1.07 1.94-2.16 3.87-2.16 4.14 0 4.91 2.71 4.91 6.24V21h-5.15z"/>
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-300 transition-colors">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.11 1.04 4.48 4.48 0 00-7.86 4.08C7.69 7.82 5.93 7 4.5 5.65c-.34.58-.54 1.25-.54 1.97 0 1.37.7 2.58 1.77 3.28A4.47 4.47 0 013 10v.06c.73.88 1.84 1.5 3.13 1.55A4.52 4.52 0 013 13.12c-1.3.7-2.83.85-4.1.54.73.47 1.6.75 2.5.75 6.34 0 9.8-5.26 9.8-9.83 0-.15-.01-.3-.02-.44A7.1 7.1 0 0023 3z"/>
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-300 transition-colors">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.68 0H1.32C.59 0 0 .6 0 1.34v21.32C0 23.4.59 24 1.32 24H12.8V14.71h-3.13v-3.62h3.13v-2.67c0-3.1 1.89-4.78 4.66-4.78 1.33 0 2.47.1 2.8.14v3.23H18c-1.41 0-1.69.67-1.69 1.66v2.17h3.38l-.44 3.62h-2.94V24h5.77c.73 0 1.32-.6 1.32-1.34V1.34C24 .6 23.41 0 22.68 0"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-blue-600 mt-8 pt-4 text-center text-blue-200 text-xs">
        &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
