import Image from 'next/image';
import { getAllResortsWeather } from '../../services/weather';
import { ResortWeatherData } from '../../types/weather';
import DifficultyIcon from '../../components/DifficultyIcon';

export default async function BrightonResort() {
  const weatherData = await getAllResortsWeather();
  const brightonWeather = weatherData && weatherData.Brighton ? weatherData.Brighton : null;

  return (
    <main className="min-h-screen bg-white relative">
      {/* Background Logo */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="relative w-[800px] h-[400px] opacity-5">
          <Image
            src="/logos/Brighton Logo.png"
            alt="Brighton Resort Logo Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 -mt-14 md:mt-0">
        {/* Hero Section */}
        <div className="relative h-[80vh]">
          <Image
            src="/brighton.jpg"
            alt="Brighton Resort"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">Brighton Resort</h1>
              <p className="text-xl">Utah's Night Skiing Paradise</p>
            </div>
          </div>
        </div>

        {/* Weather Section */}
        <section className="py-8 sm:py-12 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Current Conditions</h2>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              {!brightonWeather ? (
                <p className="text-gray-600 text-center">Loading weather data...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-4">Temperature</h3>
                    <p className="text-3xl sm:text-4xl font-bold text-blue-600">
                      {Math.round(brightonWeather.current.temperature_2m * 9/5 + 32)}°F
                    </p>
                    <p className="text-gray-600">
                      Feels like {Math.round(brightonWeather.current.apparent_temperature * 9/5 + 32)}°F
                    </p>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-4">Snow Conditions</h3>
                    <p className="text-3xl sm:text-4xl font-bold text-blue-600">
                      {Math.round(brightonWeather.hourly.snowfall[0] * 10) / 10}″
                    </p>
                    <p className="text-gray-600">Fresh Snow (Last Hour)</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-xl mb-4">Wind</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(brightonWeather.current.wind_speed_10m)} mph
                    </p>
                    <p className="text-gray-600">Current Wind Speed</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Resort Info */}
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Resort Overview</h2>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  Brighton Resort, nestled at the top of Big Cottonwood Canyon, is renowned for its laid-back atmosphere 
                  and exceptional night skiing operations. With 1,050 acres of skiable terrain and 22 lifts, Brighton 
                  offers something for everyone, from beginners to advanced riders.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2">Elevation</h3>
                    <p className="text-sm sm:text-base">Base: 8,755 ft</p>
                    <p className="text-sm sm:text-base">Summit: 10,500 ft</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2">Annual Snowfall</h3>
                    <p className="text-sm sm:text-base">500+ inches</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2">Terrain</h3>
                    <p className="text-sm sm:text-base">21% Beginner</p>
                    <p className="text-sm sm:text-base">40% Intermediate</p>
                    <p className="text-sm sm:text-base">39% Advanced</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2">Night Skiing</h3>
                    <p className="text-sm sm:text-base">30 lit trails</p>
                    <p className="text-sm sm:text-base">200+ acres</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2">Lifts</h3>
                    <p className="text-sm sm:text-base">6 Chairlifts</p>
                    <p className="text-sm sm:text-base">1 Surface Lift</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative text-center">
                  <h2 className="text-3xl font-bold mb-6">Featured Amenities</h2>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-center">
                      <div>
                        <h3 className="font-bold">Night Skiing</h3>
                        <p className="text-gray-700">Utah's largest night skiing with 22 runs illuminated.</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-center">
                      <div>
                        <h3 className="font-bold">Terrain Parks</h3>
                        <p className="text-gray-700">Multiple progressive parks for all skill levels.</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-center">
                      <div>
                        <h3 className="font-bold">Brighton Center</h3>
                        <p className="text-gray-700">Central hub with dining, rentals, and retail.</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-center">
                      <div>
                        <h3 className="font-bold">Ski School</h3>
                        <p className="text-gray-700">Renowned instruction programs for all ages.</p>
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
                  href="https://www.brightonresort.com/trail-maps"
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
                  href="https://reservenski.parkbrightonresort.com/"
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
        <section className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Notable Terrain</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="black" />
                  <span className="ml-2">Milly Bowl</span>
                </h3>
                <p className="text-sm sm:text-base">A local favorite featuring steep, open bowl skiing with multiple entry points. Perfect for powder days and advanced skiers looking for challenging terrain.</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="double-black" />
                  <span className="ml-2">Western Trip</span>
                </h3>
                <p className="text-sm sm:text-base">One of Brighton's most challenging runs with steep chutes and technical cliff bands. Reserved for expert skiers who can handle extreme terrain.</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="various" />
                  <span className="ml-2">Snake Creek</span>
                </h3>
                <p className="text-sm sm:text-base">A diverse area offering a mix of terrain with open bowls, gladed runs, and groomed trails. Particularly popular during night skiing sessions.</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="black" />
                  <span className="ml-2">My Oh My</span>
                </h3>
                <p className="text-sm sm:text-base">A classic Brighton run featuring steep pitches and natural terrain features. One of the best runs for night skiing with excellent lighting.</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="various" />
                  <span className="ml-2">Great Western</span>
                </h3>
                <p className="text-sm sm:text-base">An extensive area offering everything from gentle groomers to challenging off-piste terrain. Features stunning views of the Salt Lake Valley.</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="double-black" />
                  <span className="ml-2">Scree Slope</span>
                </h3>
                <p className="text-sm sm:text-base">A challenging expert run with steep, rocky terrain that requires advanced technical skills. Best tackled after a fresh snowfall.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Operating Hours Section */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Operating Hours</h2>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">Day Skiing</h3>
                  <p className="text-sm sm:text-base mb-2">Monday - Sunday: 9:00 AM - 4:00 PM</p>
                  <p className="text-gray-600 text-sm sm:text-base">Hours may vary based on conditions and time of year</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">Night Skiing</h3>
                  <p className="text-sm sm:text-base mb-2">Monday - Saturday: 4:00 PM - 9:00 PM</p>
                  <p className="text-gray-600 text-sm sm:text-base">Available during winter season, weather permitting</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 