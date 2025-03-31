import Image from 'next/image';
import { getAllResortsWeather } from '../../services/weather';
import { ResortWeatherData } from '../../types/weather';
import DifficultyIcon from '../../components/DifficultyIcon';

export default async function SnowbirdResort() {
  const weatherData = await getAllResortsWeather();
  const snowbirdWeather = weatherData && 'Snowbird' in weatherData ? weatherData.Snowbird : null;

  return (
    <main className="min-h-screen bg-white relative">
      {/* Background Logo */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="relative w-[800px] h-[400px] opacity-5">
          <Image
            src="/logos/Snowbird Logo.png"
            alt="Snowbird Resort Logo Background"
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
            src="/snowbird.jpg"
            alt="Snowbird Resort"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">Snowbird</h1>
              <p className="text-xl">Year-Round Mountain Adventure</p>
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
              {!snowbirdWeather ? (
                <p className="text-gray-600 text-center">Loading weather data...</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-xl mb-4">Temperature</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(snowbirdWeather.current.temperature_2m * 9/5 + 32)}°F
                    </p>
                    <p className="text-gray-600">
                      Feels like {Math.round(snowbirdWeather.current.apparent_temperature * 9/5 + 32)}°F
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-4">Snow Conditions</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-4xl font-bold text-blue-600">
                          {Math.round(snowbirdWeather.hourly.snowfall[0] * 10) / 10}″
                        </p>
                        <p className="text-gray-600">Fresh Snow (Last Hour)</p>
                      </div>
                      <div>
                        <p className="text-4xl font-bold text-blue-600">
                          {Math.round(
                            snowbirdWeather.hourly.snowfall
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
                      {Math.round(snowbirdWeather.current.wind_speed_10m)} mph
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
                  Snowbird is a year-round resort known for its diverse terrain, longest ski season in Utah, and 
                  iconic Aerial Tram. With 2,500 acres of skiable terrain and an average of 500 inches of annual 
                  snowfall, Snowbird offers an unforgettable mountain experience.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Elevation</h3>
                    <p>Base: 7,760 ft</p>
                    <p>Summit: 11,000 ft</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Annual Snowfall</h3>
                    <p>500+ inches</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Terrain</h3>
                    <p>27% Beginner</p>
                    <p>38% Intermediate</p>
                    <p>35% Advanced</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Lifts</h3>
                    <p>1 Aerial Tram</p>
                    <p>10 Chairlifts</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative">
                  <h2 className="text-3xl font-bold mb-6">Featured Amenities</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <h3 className="font-bold">Aerial Tram</h3>
                        <p className="text-gray-700">Iconic 125-passenger tram accessing Hidden Peak at 11,000 feet.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <h3 className="font-bold">The Summit</h3>
                        <p className="text-gray-700">Year-round dining with panoramic views at 11,000 feet.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <h3 className="font-bold">Mountain School</h3>
                        <p className="text-gray-700">World-class instruction for all abilities.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <h3 className="font-bold">The Cliff Spa</h3>
                        <p className="text-gray-700">Rooftop pool and spa services with mountain views.</p>
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
            <div className="flex justify-center items-start gap-24">
              {/* Trail Map Section */}
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Trail Map</h3>
                <a
                  href="https://www.snowbird.com/trail-maps/"
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

              {/* Parking Section */}
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Parking</h3>
                <a
                  href="https://www.snowbird.com/parking/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">P</text>
                  </svg>
                  Parking Info
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
                  Great Scott
                </h3>
                <p>A challenging steep chute that requires expert skills and confidence. One of Snowbird's most iconic expert runs, offering incredible views and steep terrain.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="various" />
                  Mineral Basin
                </h3>
                <p>A vast powder-filled bowl offering terrain for all abilities. Features stunning views and excellent snow preservation due to its northeastern exposure.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="double-black" />
                  Pipeline
                </h3>
                <p>A legendary run combining steep terrain with challenging moguls. Best tackled by expert skiers who can handle both technical terrain and bumps.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="blue" />
                  Chip's Run
                </h3>
                <p>A fantastic intermediate run offering scenic views and consistent pitch. Perfect for working on technique while enjoying Snowbird's legendary snow.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="double-black" />
                  The Cirque
                </h3>
                <p>An exposed traverse leading to extreme terrain. Requires both technical skiing ability and good route-finding skills to navigate the steep chutes.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="various" />
                  Gad Valley
                </h3>
                <p>A diverse area perfect for mixed-ability groups, offering everything from gentle blues to challenging black diamonds. Great tree skiing when conditions permit.</p>
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
                  <h3 className="font-bold text-xl mb-4">Winter Season</h3>
                  <p className="mb-2">Daily: 9:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Extended spring skiing hours available</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-4">Special Features</h3>
                  <p className="mb-2">Longest ski season in Utah</p>
                  <p className="text-gray-600">Year-round mountain activities</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 