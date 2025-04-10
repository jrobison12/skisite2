import type { Metadata } from 'next';
import { Inter, Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';
import './styles/animations.css';
import './styles/snow-effect.css';
import Link from 'next/link';
import { IoSnowSharp } from "react-icons/io5";
import QuickLinks from './components/QuickLinks';
import ResortsDropdown from './components/ResortsDropdown';
import PowderAlert from './components/PowderAlert';
import UdotCautionBanner from './components/UdotCautionBanner';
import { getAllResortsWeather } from './services/weather';
import { WeatherData } from './types/weather';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
});
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'SLCPowder',
  description: 'Your guide to skiing in Utah - find resorts, check conditions, and get essential tips.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const weatherData = await getAllResortsWeather();

  // Calculate if powder alert should be active
  const isPowderAlertActive = Object.values(weatherData).some(weather => {
    const snow24h = Math.round(
      (weather as WeatherData).hourly.snowfall
        .slice(0, 24)
        .reduce((sum: number, val: number) => sum + val, 0) / 25.4 * 10
    ) / 10;
    return snow24h >= 10.00;
  });

  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={`${inter.className} bg-gray-100`}>
        <div className="fixed w-full z-50">
          <PowderAlert weatherData={weatherData} />
          <UdotCautionBanner isPowderAlertActive={isPowderAlertActive} />
          <Navbar />
        </div>
        <main className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-100 pt-16">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">SLCPowder</h3>
                <p className="text-gray-400">Your ultimate guide to Utah's best slopes</p>
              </div>
              <QuickLinks />
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Email: info@slcpowder.com</li>
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
              <p>&copy; 2025 SLCPowder. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 