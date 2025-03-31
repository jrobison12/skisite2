import Image from 'next/image';
import { getAllResortsWeather, getResortWeather } from '../../services/weather';
import { ResortWeatherData } from '../../types/weather';
import DifficultyIcon from '../../components/DifficultyIcon';

export default async function SolitudeResort() {
  const weatherData = await getAllResortsWeather();
  const solitudeWeather = weatherData && 'Solitude' in weatherData ? weatherData.Solitude : null;

  // Debug logging
  console.log('Solitude direct weather data:', {
    wind_speed: solitudeWeather?.current.wind_speed_10m,
    time: solitudeWeather?.current.time
  });

  return (
    <main className="min-h-screen bg-white relative">
      {/* Background Logo */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="relative w-[800px] h-[400px] opacity-5">
          <Image
            src="/logos/Solitude Logo.png"
            alt="Solitude Resort Logo Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 -mt-14 md:-mt-20">
        {/* Hero Section */}
        <div className="relative h-[80vh]">
          <Image
            src="/solitude.jpg"
            alt="Solitude Resort"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">Solitude Mountain Resort</h1>
              <p className="text-xl">Big Mountain Experience, Small Mountain Feel</p>
            </div>
          </div>
        </div>

        {/* Weather Section */}
        <section className="py-12 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Current Conditions</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {!solitudeWeather ? (
                <p className="text-gray-600 text-center">Loading weather data...</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-xl mb-4">Temperature</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(solitudeWeather.current.temperature_2m * 9/5 + 32)}°F
                    </p>
                    <p className="text-gray-600">
                      Feels like {Math.round(solitudeWeather.current.apparent_temperature * 9/5 + 32)}°F
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-4">Snow Conditions</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-4xl font-bold text-blue-600">
                          {Math.round(solitudeWeather.hourly.snowfall[0] * 10) / 10}″
                        </p>
                        <p className="text-gray-600">Fresh Snow (Last Hour)</p>
                      </div>
                      <div>
                        <p className="text-4xl font-bold text-blue-600">
                          {Math.round(
                            solitudeWeather.hourly.snowfall
                              .slice(new Date().getHours(), new Date().getHours() + 24)
                              .reduce((sum, val) => sum + val, 0) * 10
                          ) / 10}″
                        </p>
                        <p className="text-gray-600">24 Hour Total</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-4">Wind</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {solitudeWeather ? (
                        Math.round(solitudeWeather.current.wind_speed_10m * 0.65)
                      ) : '...'} mph
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
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6">Resort Overview</h2>
                <p className="text-gray-700 mb-4">
                  Solitude Mountain Resort offers a peaceful mountain experience with uncrowded slopes 
                  and diverse terrain. Located in Big Cottonwood Canyon, Solitude combines excellent 
                  snow conditions with a variety of terrain suitable for all skill levels.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Elevation</h3>
                    <p>Base: 7,994 ft</p>
                    <p>Summit: 10,488 ft</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Annual Snowfall</h3>
                    <p>500+ inches</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Terrain</h3>
                    <p>20% Beginner</p>
                    <p>50% Intermediate</p>
                    <p>30% Advanced</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Lifts</h3>
                    <p>8 Chairlifts</p>
                    <p>1 Surface Lift</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative text-center">
                  <h2 className="text-3xl font-bold mb-6">Featured Amenities</h2>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-center">
                      <div>
                        <h3 className="font-bold">Solitude Village</h3>
                        <p className="text-gray-700">European-style village with dining and lodging.</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-center">
                      <div>
                        <h3 className="font-bold">Nordic Center</h3>
                        <p className="text-gray-700">Cross-country skiing and snowshoeing trails.</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-center">
                      <div>
                        <h3 className="font-bold">Ski School</h3>
                        <p className="text-gray-700">Professional instruction for all abilities.</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-center">
                      <div>
                        <h3 className="font-bold">Ice Skating</h3>
                        <p className="text-gray-700">Outdoor rink in the heart of the village.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trail Map and Parking Container */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-24">
              {/* Trail Map Section */}
              <div className="text-center w-full sm:w-auto">
                <h3 className="font-bold text-lg mb-2">Trail Map</h3>
                <a
                  href="https://www.solitudemountain.com/mountain/trail-map"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="whitespace-nowrap">Trail Map</span>
                </a>
              </div>

              {/* Parking Section */}
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Parking</h3>
                <a
                  href="https://reservenski.parksolitude.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">P</text>
                  </svg>
                  <span className="whitespace-nowrap">Reserve Parking</span>
                </a>
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
                  Honeycomb Canyon
                </h3>
                <p>A vast expert playground featuring steep chutes, cliff bands, and powder stashes. Multiple entry points offer varying levels of challenge.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="black" />
                  Headwall Forest
                </h3>
                <p>Advanced tree skiing area with steep pitches and natural features. Best experienced on powder days for ultimate tree skiing.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="blue" />
                  Dynamite
                </h3>
                <p>A perfect intermediate run with consistent pitch and width. Great for practicing technique and building confidence.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="double-black" />
                  Fantasy Ridge
                </h3>
                <p>Expert-only terrain accessed by a short boot pack. Offers some of the most challenging lines at Solitude with incredible views.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="blue" />
                  Same Street
                </h3>
                <p>Long, winding intermediate run perfect for cruising. Offers beautiful views and consistent conditions throughout the season.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="green" />
                  Moonbeam
                </h3>
                <p>Excellent beginner area with gentle slopes and wide runs. Perfect for learning and building confidence with easy access to the base area.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Operating Hours Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Operating Hours</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-xl mb-4">Winter Season</h3>
                  <p className="mb-2">Daily: 9:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Hours may vary based on conditions</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-4">Special Features</h3>
                  <p className="mb-2">Night skiing available on select runs</p>
                  <p className="text-gray-600">Nordic Center open daily during winter</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 