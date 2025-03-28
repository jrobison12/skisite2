import Image from 'next/image';
import Link from 'next/link';
import { getAllResortsWeather } from '../services/weather';

const RESORTS = [
  {
    name: 'Alta',
    description: 'A skier-only mountain famous for its deep powder snow and challenging terrain. Located in Little Cottonwood Canyon, Alta offers over 2,600 acres of legendary terrain and receives an average of 547 inches of snow annually.',
    image: '/alta.jpg',
    distance: 16,
    elevation: '8,530-11,068 ft',
    href: '/resorts/alta'
  },
  {
    name: 'Snowbird',
    description: 'Known for its long season and challenging terrain, Snowbird offers 2,500 acres of diverse skiing terrain. The iconic aerial tram and stunning mountain views make it a must-visit destination.',
    image: '/snowbird.jpg',
    distance: 16,
    elevation: '7,760-11,000 ft',
    href: '/resorts/snowbird'
  },
  {
    name: 'Brighton',
    description: 'Famous for its night skiing and terrain parks, Brighton is a favorite among locals. With 1,050 acres of terrain and 22 runs lit for night skiing, it offers something for everyone.',
    image: '/brighton.jpg',
    distance: 19,
    elevation: '8,755-10,500 ft',
    href: '/resorts/brighton'
  },
  {
    name: 'Solitude',
    description: 'A peaceful mountain retreat offering 1,200 acres of diverse terrain. Known for shorter lift lines and a more relaxed atmosphere, Solitude features 82 runs and excellent powder conditions.',
    image: '/solitude.jpg',
    distance: 20,
    elevation: '7,994-10,488 ft',
    href: '/resorts/solitude'
  },
  {
    name: 'Park City',
    description: 'The largest ski resort in the United States with over 7,300 acres of terrain. Park City offers a perfect blend of world-class skiing and vibrant downtown atmosphere, with 341 trails catering to all skill levels.',
    image: '/park city.jpg',
    distance: 25,
    elevation: '6,800-10,026 ft',
    href: '/resorts/parkcity'
  },
  {
    name: 'Deer Valley',
    description: 'A luxury ski-only resort known for impeccable grooming, excellent customer service, and gourmet dining. Features 2,026 acres of skiable terrain across six mountains with 103 runs.',
    image: '/deer valley.jpeg',
    distance: 25,
    elevation: '6,570-9,570 ft',
    href: '/resorts/deervalley'
  },
  {
    name: 'Snowbasin',
    description: 'A historic resort offering 3,000 acres of diverse terrain and stunning mountain views. Home to the 2002 Olympics downhill courses, Snowbasin combines world-class skiing with luxury amenities.',
    image: '/snowbasin.jpg',
    distance: 35,
    elevation: '6,450-9,350 ft',
    href: '/resorts/snowbasin'
  }
];

export default async function ResortsPage() {
  const weatherData = await getAllResortsWeather();

  return (
    <main className="min-h-screen bg-white pt-20 relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="/alta.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8">Ski Resorts Near Salt Lake City</h1>
        <p className="text-gray-700 mb-12 bg-white/30 backdrop-blur-sm p-4 rounded-lg max-w-4xl">Discover world-class skiing in and around Salt Lake City, Utah. These resorts offer some of the best snow conditions and terrain variety in North America.</p>
        
        <div className="grid gap-8">
          {RESORTS.map(resort => {
            const weather = weatherData[resort.name as keyof typeof weatherData];
            
            return (
              <div key={resort.name} className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden ring-2 ring-blue-500 hover:shadow-xl transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-64 md:h-auto">
                    <Image
                      src={resort.image}
                      alt={resort.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{resort.name}</h2>
                        <p className="text-gray-600 mb-4">{resort.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Distance from SLC</p>
                        <p className="font-semibold">{resort.distance} miles</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Elevation</p>
                        <p className="font-semibold">{resort.elevation}</p>
                      </div>
                      {weather && (
                        <>
                          <div>
                            <p className="text-sm text-gray-500">Temperature</p>
                            <p className="font-semibold">
                              {Math.round(weather.current.temperature_2m * 9/5 + 32)}°F
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">24h Snowfall</p>
                            <p className="font-semibold">
                              {Math.round(weather.hourly.snowfall.slice(0, 24).reduce((sum: number, val: number) => sum + val, 0) / 25.4 * 10) / 10}″
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Expected Snow (24h)</p>
                            <p className="font-semibold">
                              {Math.round(weather.hourly.snowfall.slice(24, 48).reduce((sum: number, val: number) => sum + val, 0) / 25.4 * 10) / 10}″
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <Link 
                      href={resort.href}
                      className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all"
                    >
                      View Resort Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
} 