'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResortsHovered, setIsResortsHovered] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999]">
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-lg font-bold text-white">SLCPowder ❄️</span>
            </Link>

            {/* Hamburger menu button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="block lg:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Desktop menu */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {/* Resorts Dropdown */}
              <div className="relative">
                <div 
                  className="group inline-block"
                  onMouseEnter={() => setIsResortsHovered(true)}
                  onMouseLeave={() => setIsResortsHovered(false)}
                >
                  <Link 
                    href="/resorts" 
                    className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center"
                  >
                    Resorts
                    <svg 
                      className="w-4 h-4 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  {/* Dropdown menu */}
                  <div 
                    className={`${
                      isResortsHovered ? 'block' : 'hidden'
                    } absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-1`}
                  >
                    <Link
                      href="/resorts/alta"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Alta
                    </Link>
                    <Link
                      href="/resorts/brighton"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Brighton
                    </Link>
                    <Link
                      href="/resorts/deervalley"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Deer Valley
                    </Link>
                    <Link
                      href="/resorts/parkcity"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Park City
                    </Link>
                    <Link
                      href="/resorts/snowbasin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Snowbasin
                    </Link>
                    <Link
                      href="/resorts/snowbird"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Snowbird
                    </Link>
                    <Link
                      href="/resorts/solitude"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Solitude
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                href="/weather"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Weather
              </Link>
              <Link
                href="/gear"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Gear
              </Link>
              <Link
                href="/parking"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Parking
              </Link>
              <Link
                href="/tips"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Tips
              </Link>
              <a 
                href="https://cottonwoodcanyons.udot.utah.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                UDOT
              </a>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-600 border-t border-blue-500">
            {/* Resort links in mobile menu */}
            <div className="space-y-1">
              <Link
                href="/resorts"
                className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                All Resorts
              </Link>
              <Link
                href="/resorts/alta"
                className="text-white hover:bg-blue-700 block px-3 py-2 pl-6 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Alta
              </Link>
              <Link
                href="/resorts/brighton"
                className="text-white hover:bg-blue-700 block px-3 py-2 pl-6 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Brighton
              </Link>
              <Link
                href="/resorts/deervalley"
                className="text-white hover:bg-blue-700 block px-3 py-2 pl-6 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Deer Valley
              </Link>
              <Link
                href="/resorts/parkcity"
                className="text-white hover:bg-blue-700 block px-3 py-2 pl-6 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Park City
              </Link>
              <Link
                href="/resorts/snowbasin"
                className="text-white hover:bg-blue-700 block px-3 py-2 pl-6 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Snowbasin
              </Link>
              <Link
                href="/resorts/snowbird"
                className="text-white hover:bg-blue-700 block px-3 py-2 pl-6 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Snowbird
              </Link>
              <Link
                href="/resorts/solitude"
                className="text-white hover:bg-blue-700 block px-3 py-2 pl-6 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Solitude
              </Link>
            </div>
            <Link
              href="/weather"
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Weather
            </Link>
            <Link
              href="/gear"
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Gear
            </Link>
            <Link
              href="/parking"
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Parking
            </Link>
            <Link
              href="/tips"
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Tips
            </Link>
            <a 
              href="https://cottonwoodcanyons.udot.utah.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              UDOT
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
} 