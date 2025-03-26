import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ski Explorer - Your Ultimate Skiing Guide',
  description: 'Discover the best ski resorts, gear, and tips for your next skiing adventure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Ski Explorer
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/resorts" className="text-gray-700 hover:text-blue-600">
                  Resorts
                </Link>
                <Link href="/gear" className="text-gray-700 hover:text-blue-600">
                  Gear
                </Link>
                <Link href="/tips" className="text-gray-700 hover:text-blue-600">
                  Tips
                </Link>
                <Link href="/weather" className="text-gray-700 hover:text-blue-600">
                  Weather
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Ski Explorer</h3>
                <p className="text-gray-400">Your ultimate guide to the world's best slopes</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="/resorts" className="text-gray-400 hover:text-white">Resorts</Link></li>
                  <li><Link href="/gear" className="text-gray-400 hover:text-white">Gear</Link></li>
                  <li><Link href="/tips" className="text-gray-400 hover:text-white">Tips</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Email: info@skiexplorer.com</li>
                  <li>Phone: (555) 123-4567</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                  <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Ski Explorer. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 