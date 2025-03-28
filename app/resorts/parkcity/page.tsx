import Image from 'next/image';
import { getAllResortsWeather } from '../../services/weather';
import { ResortWeatherData } from '../../types/weather';
import DifficultyIcon from '../../components/DifficultyIcon';

export default async function ParkCityResort() {
  const weatherData = await getAllResortsWeather();
  const parkCityWeather = weatherData && 'Park City' in weatherData ? weatherData['Park City'] : null;

  return (
    <main className="min-h-screen bg-white relative">
      {/* Background Logo */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="relative w-[800px] h-[400px] opacity-5">
          <Image
            src="/logos/park city.png"
            alt="Park City Resort Logo Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative h-[80vh]">
          <Image
            src="/park city.jpg"
            alt="Park City Resort"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">Park City Mountain Resort</h1>
              <p className="text-xl">The Largest Resort in the United States</p>
            </div>
          </div>
        </div>

        {/* Weather Section */}
        <section className="py-12 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Current Conditions</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {!parkCityWeather ? (
                <p className="text-gray-600 text-center">Loading weather data...</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-xl mb-4">Temperature</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(parkCityWeather.current.temperature_2m * 9/5 + 32)}°F
                    </p>
                    <p className="text-gray-600">
                      Feels like {Math.round(parkCityWeather.current.apparent_temperature * 9/5 + 32)}°F
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-4">Snow Conditions</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(parkCityWeather.hourly.snowfall[0] / 25.4 * 10) / 10}″
                    </p>
                    <p className="text-gray-600">Fresh Snow (Last Hour)</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-4">Wind</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round(parkCityWeather.current.wind_speed_10m)} mph
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
                  Park City Mountain Resort, the largest ski resort in the United States, combines the 
                  historic charm of Park City with world-class skiing and snowboarding. With 7,300 acres 
                  of terrain, 330+ trails, and 41 lifts, it offers endless opportunities for adventure 
                  across two mountains: Park City and Canyons Village.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Elevation</h3>
                    <p>Base: 6,900 ft</p>
                    <p>Summit: 10,026 ft</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Annual Snowfall</h3>
                    <p>355 inches</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Terrain</h3>
                    <p>8% Beginner</p>
                    <p>42% Intermediate</p>
                    <p>50% Advanced</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Lifts</h3>
                    <p>41 Total Lifts</p>
                    <p>Including 1 Gondola</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-2">Trail Map</h3>
                  <a
                    href="https://www.parkcitymountain.com/the-mountain/about-the-mountain/trail-map.aspx"
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
                      <h3 className="font-bold">Historic Main Street</h3>
                      <p className="text-gray-700">Charming downtown with restaurants, shops, and après-ski activities.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <h3 className="font-bold">Canyons Village</h3>
                      <p className="text-gray-700">Modern base area with luxury lodging and dining options.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <h3 className="font-bold">High Alpine Terrain</h3>
                      <p className="text-gray-700">Extensive above-treeline skiing with stunning views.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <h3 className="font-bold">Terrain Parks</h3>
                      <p className="text-gray-700">Multiple parks including the famous King's Crown Superpipe.</p>
                    </div>
                  </li>
                </ul>
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
                  Jupiter Bowl
                </h3>
                <p>Expert-only terrain with steep chutes and powder stashes. Accessible via Jupiter lift with incredible views of the Wasatch.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="black" />
                  Ninety-Nine 90
                </h3>
                <p>Advanced terrain pod with steep pitches and tree skiing. Named for its elevation at 9,990 feet.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="blue" />
                  Homerun
                </h3>
                    <p>Long, winding intermediate run perfect for cruising. Offers beautiful views and consistent conditions throughout the season.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="double-black" />
                  McConkey's Bowl
                </h3>
                <p>Expert terrain with steep chutes and natural features. Named after legendary skier Shane McConkey.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="blue" />
                  Silverlode
                </h3>
                <p>Popular intermediate run with consistent pitch and width. Great for practicing technique and building confidence.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <DifficultyIcon difficulty="green" />
                  First Time
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
                  <p className="text-gray-600">Extended hours during peak season</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 