'use client';
import Link from 'next/link';

export default function QuickLinks() {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
      <div className="relative group">
        <button 
          className="text-gray-400 hover:text-white flex items-center gap-2"
        >
          Select Page <span className="transform transition-transform duration-200 group-hover:rotate-180">▼</span>
        </button>
        <ul className="absolute bottom-full left-0 mb-2 bg-gray-800 rounded-lg py-2 w-48 shadow-xl transition-all duration-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
          <li>
            <Link href="/" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700">
              Home
            </Link>
          </li>
          <li>
            <Link href="/resorts" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700">
              Resorts
            </Link>
          </li>
          <li>
            <Link href="/gear" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700">
              Gear
            </Link>
          </li>
          <li>
            <Link href="/tips" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700">
              Tips
            </Link>
          </li>
          <li>
            <Link href="/weather" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700">
              Weather
            </Link>
          </li>
          <li>
            <Link href="/parking" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700">
              Parking
            </Link>
          </li>
          <li>
            <a 
              href="https://cottonwoodcanyons.udot.utah.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              UDOT
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
} 