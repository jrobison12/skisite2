import Image from 'next/image';
import { getAllResortsWeather } from '../../services/weather';
import { ResortWeatherData } from '../../types/weather';
import DifficultyIcon from '../../components/DifficultyIcon';

export default async function DeerValleyResort() {
  const weatherData = await getAllResortsWeather();
  const deerValleyWeather = weatherData && 'Deer Valley' in weatherData ? weatherData['Deer Valley'] : null;

  return (
    <main className="min-h-screen bg-white relative">
      {/* Background Logo */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="relative w-[800px] h-[400px] opacity-5">
          <Image
            src="/logos/deer valley.png"
            alt="Deer Valley Resort Logo Background"
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
            src="/deer valley.jpeg"
            alt="Deer Valley Resort"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">Deer Valley Resort</h1>
              <p className="text-xl">Luxury Skiing Experience</p>
            </div>
          </div>
        </div>

        {/* Weather Section */}
        <section className="py-12 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Current Conditions</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {!deerValleyWeather ? (
                <p className="text-gray-600 text-center">Loading weather data...</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-xl mb-4">Temperature</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(deerValleyWeather.current.temperature_2m * 9/5 + 32)}°F
                    </p>
                    <p className="text-gray-600">
                      Feels like {Math.round(deerValleyWeather.current.apparent_temperature * 9/5 + 32)}°F
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-4">Snow Conditions</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(deerValleyWeather.hourly.snowfall[0] / 25.4 * 10) / 10}″
                    </p>
                    <p className="text-gray-600">Fresh Snow (Last Hour)</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-4">Wind</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(deerValleyWeather.current.wind_speed_10m * 2.23694)} mph
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
                  Deer Valley Resort offers a premium skiing experience with meticulously groomed slopes, 
                  limited lift ticket sales, and exceptional service. With 2,026 acres of terrain, 103 runs, 
                  and 21 chairlifts, it provides a perfect blend of beginner-friendly areas and challenging 
                  expert terrain.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Elevation</h3>
                    <p>Base: 6,570 ft</p>
                    <p>Summit: 9,570 ft</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Annual Snowfall</h3>
                    <p>300 inches</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Terrain</h3>
                    <p>27% Beginner</p>
                    <p>41% Intermediate</p>
                    <p>32% Advanced</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Lifts</h3>
                    <p>21 Chairlifts</p>
                    <p>Including 1 Gondola</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-2">Trail Map</h3>
                  <a
                    href="https://www.deervalley.com/explore-the-mountain/interactive-grooming-map"
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
                <div className="relative">
                  <h2 className="text-3xl font-bold mb-6">Featured Amenities</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <h3 className="font-bold">Luxury Lodging</h3>
                        <p className="text-gray-700">World-class hotels and condominiums with ski-in/ski-out access.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <h3 className="font-bold">Fine Dining</h3>
                        <p className="text-gray-700">Multiple award-winning restaurants and on-mountain dining options.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <h3 className="font-bold">Ski School</h3>
                        <p className="text-gray-700">Premier ski instruction for all ages and abilities.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <h3 className="font-bold">Grooming</h3>
                        <p className="text-gray-700">Daily grooming of all runs for optimal conditions.</p>
                      </div>
                    </li>
                  </ul>
                  <div className="relative mt-8">
                    <h3 className="font-bold text-lg mb-2">Parking</h3>
                    <a
                      href="https://www.deervalley.com/blog/parking-and-transportation-tips-tricks-and-other-hacks"
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
                  Daly Bowl
                </h3>
                <p>Expert terrain with steep chutes and powder stashes. Accessible via the Daly Chutes lift with incredible views.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="black" />
                  Empire Bowl
                </h3>
                <p>Advanced terrain with steep pitches and tree skiing. Named for its elevation and challenging nature.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="blue" />
                  Success
                </h3>
                <p>Long, winding intermediate run perfect for cruising. Offers beautiful views and consistent conditions.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="double-black" />
                  Mayflower Bowl
                </h3>
                <p>Expert terrain with steep chutes and natural features. Known for its powder stashes and challenging lines.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="blue" />
                  Stein's Way
                </h3>
                <p>Popular intermediate run with consistent pitch and width. Great for practicing technique.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="green" />
                  Wide West
                </h3>
                <p>Excellent beginner area with gentle slopes and wide runs. Perfect for learning and building confidence.</p>
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
                  <p className="mb-2">Limited daily lift ticket sales</p>
                  <p className="text-gray-600">First tracks program available</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 