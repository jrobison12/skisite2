'use client';

import Image from 'next/image';
import { useWeatherData } from '../../hooks/useWeatherData';
import DifficultyIcon from '../../components/DifficultyIcon';

export default function AltaResort() {
  const { weatherData, loading } = useWeatherData();
  const altaWeather = weatherData && 'Alta' in weatherData ? weatherData.Alta : null;

  return (
    <main className="min-h-screen bg-white relative">
      {/* Background Logo */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="relative w-[800px] h-[400px] opacity-5">
          <Image
            src="/logos/alta.jpg"
            alt="Alta Ski Area Logo Background"
            fill
            className="object-contain rounded-full"
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative h-[80vh]">
          <Image
            src="/alta.jpg"
            alt="Alta Resort"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">Alta Ski Area</h1>
              <p className="text-xl">Powder Paradise Since 1938</p>
            </div>
          </div>
        </div>

        {/* Weather Section */}
        <section className="py-12 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            {/* Warning Banner */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 max-w-3xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-base text-yellow-700">
                    It is highly recommended to visit the{' '}
                    <a 
                      href="https://cottonwoodcanyons.udot.utah.gov/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline text-yellow-700 hover:text-yellow-600"
                    >
                      UDOT page
                    </a>
                    {' '}before departure to check on road conditions, closures, and if the traction law is in effect.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-center">Current Conditions</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {loading || !altaWeather ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <div className="animate-pulse text-gray-600">Loading weather data...</div>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-xl mb-4">Temperature</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(altaWeather.current.temperature_2m * 9/5 + 32)}°F
                    </p>
                    <p className="text-gray-600">
                      Feels like {Math.round(altaWeather.current.apparent_temperature * 9/5 + 32)}°F
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-4">Snow Conditions</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(altaWeather.hourly.snowfall[0] / 25.4 * 10) / 10}″
                    </p>
                    <p className="text-gray-600">Fresh Snow (Last Hour)</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-4">Wind</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(altaWeather.current.wind_speed_10m)} mph
                    </p>
                    <p className="text-gray-600">Current Wind Speed</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Resort Info */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Resort Overview</h2>
                <p className="text-gray-700 mb-4">
                  Alta is a skier's mountain, famous for its powder snow, steep terrain, and traditional skiing culture. 
                  As one of Utah's oldest resorts, Alta maintains its unique character as a ski-only area, offering 
                  over 2,600 acres of legendary terrain.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Elevation</h3>
                    <p>Base: 8,530 ft</p>
                    <p>Summit: 11,068 ft</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Annual Snowfall</h3>
                    <p>547 inches</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Terrain</h3>
                    <p>15% Beginner</p>
                    <p>30% Intermediate</p>
                    <p>55% Advanced</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Lifts</h3>
                    <p>1 Aerial Tram</p>
                    <p>5 Chairlifts</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-2">Trail Map</h3>
                  <a
                    href="https://www.alta.com/plan-your-trip#maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    View Trail Map
                  </a>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Featured Amenities</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <h3 className="font-bold">World-Class Powder</h3>
                      <p className="text-gray-700">Experience Utah's legendary powder snow in Little Cottonwood Canyon.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <h3 className="font-bold">Ski School</h3>
                      <p className="text-gray-700">Professional instruction for all levels, from first-timers to experts.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <h3 className="font-bold">On-Mountain Dining</h3>
                      <p className="text-gray-700">Multiple lodges offering diverse dining options.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <h3 className="font-bold">Equipment Rentals</h3>
                      <p className="text-gray-700">High-quality ski equipment and professional fitting services.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Resort Information</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-xl mb-4">Operating Hours</h3>
                  <p className="mb-2">Daily: 9:15 AM - 4:30 PM</p>
                  <p className="text-gray-600">Hours may vary based on conditions and time of year</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-4">Special Notes</h3>
                  <p className="mb-2">Ski-only resort (no snowboarding)</p>
                  <p className="text-gray-600">Renowned for steep terrain and deep powder</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notable Terrain Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Notable Terrain</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="double-black" />
                  High Rustler
                </h3>
                <p>Alta's most iconic run, featuring an impressively steep pitch and challenging terrain. Known for its sustained steepness and incredible views of Little Cottonwood Canyon.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="double-black" />
                  Alf's High Rustler
                </h3>
                <p>A legendary steep run that requires strong technical skills and confidence. Best experienced on a powder day when conditions are prime.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="double-black" />
                  Eagle's Nest
                </h3>
                <p>A classic powder run featuring steep chutes and technical rock bands. Offers some of the most challenging terrain at Alta with incredible rewards.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="blue" />
                  Main Street
                </h3>
                <p>An excellent intermediate run perfect for practicing powder skiing techniques. Wide and welcoming with consistent pitch throughout.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="black" />
                  Ballroom
                </h3>
                <p>A massive open bowl offering incredible powder skiing opportunities. Various entry points allow for different levels of challenge.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="black" />
                  Supreme Bowl
                </h3>
                <p>A wide-open powder paradise with multiple lines to choose from. Offers spectacular views and consistently good snow conditions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Resort Information</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-xl mb-4">Operating Hours</h3>
                  <p className="mb-2">Daily: 9:15 AM - 4:30 PM</p>
                  <p className="text-gray-600">Hours may vary based on conditions and time of year</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-4">Special Notes</h3>
                  <p className="mb-2">Ski-only resort (no snowboarding)</p>
                  <p className="text-gray-600">Renowned for steep terrain and deep powder</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 