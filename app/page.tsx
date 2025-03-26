import Image from 'next/image';
import Link from 'next/link';
import { getAllResortsWeather } from './services/weather';
import WeatherWidget from './components/WeatherWidget';

export default async function Home() {
  // Fetch weather data for all resorts
  const weatherData = await getAllResortsWeather();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-ski.jpg"
            alt="Skiing in Utah mountains"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Discover Utah's Best Slopes</h1>
          <p className="text-xl md:text-2xl mb-8">Experience the Greatest Snow on Earth</p>
          <Link 
            href="/resorts" 
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Explore Utah Resorts
          </Link>
        </div>
      </section>

      {/* Featured Resorts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Utah's Premier Resorts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Park City',
                description: 'Home to the largest ski resort in the United States, featuring over 7,300 acres of skiable terrain.'
              },
              {
                name: 'Snowbird',
                description: 'Known for its steep terrain and abundant snowfall, offering some of the best powder skiing in Utah.'
              },
              {
                name: 'Deer Valley',
                description: 'Luxury resort famous for its perfectly groomed runs and exceptional service.'
              }
            ].map((resort) => (
              <div key={resort.name} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={`/${resort.name.toLowerCase().replace(' ', '-')}.jpg`}
                    alt={resort.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{resort.name}</h3>
                  <p className="text-gray-600 mb-4">{resort.description}</p>
                  <Link 
                    href={`/resorts/${resort.name.toLowerCase().replace(' ', '-')}`}
                    className="text-blue-600 font-semibold hover:text-blue-800"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Essential Gear</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Skis', 'Boots', 'Helmet', 'Goggles'].map((item) => (
              <div key={item} className="text-center">
                <div className="relative h-48 mb-4">
                  <Image
                    src={`/${item.toLowerCase()}.jpg`}
                    alt={item}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item}</h3>
                <p className="text-gray-600">Find the perfect {item.toLowerCase()} for your style</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Utah Skiing Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Altitude Acclimation',
                description: 'Utah resorts are at high elevation. Take time to adjust and stay hydrated.'
              },
              {
                title: 'Powder Day Strategy',
                description: 'Utah is famous for its powder. Learn how to find the best powder stashes.'
              }
            ].map((tip) => (
              <div key={tip.title} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Current Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(weatherData).map(([resort, weather]) => (
              <WeatherWidget
                key={resort}
                resortName={resort}
                weather={weather}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 