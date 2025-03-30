import Image from 'next/image';
import Link from 'next/link';
import { IoSnowSharp } from "react-icons/io5";
import { getAllResortsWeather } from './services/weather';
import WeatherWidget from './components/WeatherWidget';
import FadingDivider from './components/FadingDivider';

export default async function Home() {
  // Fetch weather data for all resorts
  const weatherData = await getAllResortsWeather();

  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background.jpeg"
          alt="Utah ski terrain background"
          fill
          className="object-cover object-[center_10%] sm:object-center opacity-30"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-14">
          <div className="max-w-4xl space-y-4 sm:space-y-6 animate-fade-in relative p-4 sm:p-8">
            {/* Subtle gradient background for hero */}
            <div className="absolute inset-0 -inset-x-8 bg-gradient-radial from-white/90 via-white/70 to-transparent blur-lg"></div>
            
            <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight relative">
              <span className="block animate-slide-up opacity-0 [animation-delay:200ms] relative">
                <span className="snow-text text-blue-600">
                  Best Snow on Earth
                </span>
                <span className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 sm:h-1 bg-blue-600 rounded-full"></span>
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 text-center max-w-3xl mx-auto mb-6 sm:mb-12 animate-slide-up opacity-0 [animation-delay:400ms] px-4 relative">
              Your comprehensive guide to Utah's legendary ski resorts, from the deep powder of Little Cottonwood Canyon to the diverse terrain of Park City.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 animate-fade-in opacity-0 [animation-delay:1000ms] px-4 w-full max-w-md mx-auto">
              <Link 
                href="/weather" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-montserrat tracking-wide w-full sm:w-auto"
              >
                Check Conditions
              </Link>
              <Link 
                href="/resorts" 
                className="bg-white/50 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-white/60 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-montserrat tracking-wide w-full sm:w-auto"
              >
                Explore Resorts
              </Link>
              <Link 
                href="/parking" 
                className="bg-white/50 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-white/60 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-montserrat tracking-wide w-full sm:w-auto"
              >
                Reserve Parking
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
            <IoSnowSharp className="text-blue-600 w-8 h-8 sm:w-12 sm:h-12 opacity-80 animate-snowflake" />
          </div>
        </section>

        <FadingDivider />

        {/* Featured Resorts */}
        <section className="py-6 sm:py-8 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="relative py-2 sm:py-4 inline-block">
                <div className="absolute -inset-4 bg-gradient-radial from-white/50 via-white/30 to-transparent blur-lg"></div>
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-blue-600/10 rounded-full blur-xl"></div>
                  <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 relative">
                    <span className="relative inline-block">
                      Featured Resorts
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                    </span>
                  </h2>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-blue-600/10 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Brighton',
                  description: 'Known for its night skiing, terrain parks, and laid-back atmosphere. Perfect for all skill levels with 1,050 acres of terrain and Utah\'s best night riding with 30 lit trails.',
                  image: '/brighton.jpg',
                  href: '/resorts/brighton'
                },
                {
                  name: 'Alta',
                  description: 'Legendary ski-only resort famous for its deep powder snow and challenging terrain. Over 2,600 acres of skiable terrain.',
                  image: '/alta.jpg',
                  href: '/resorts/alta'
                },
                {
                  name: 'Snowbird',
                  description: 'Year-round resort offering steep terrain, deep powder, and the longest ski season in Utah. Features 2,500 acres of diverse terrain.',
                  image: '/snowbird.jpg',
                  href: '/resorts/snowbird'
                }
              ].map((resort) => (
                <Link
                  href={resort.href}
                  key={resort.name}
                  className="group block bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 transform-gpu shadow-md hover:shadow-2xl"
                >
                  <div className="relative h-64">
                    <Image
                      src={resort.image}
                      alt={resort.name}
                      fill
                      className="object-cover"
                      quality={100}
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{resort.name}</h3>
                    <p className="text-gray-600 mb-4">{resort.description}</p>
                    <span className="text-blue-500 group-hover:text-blue-600 font-semibold transition-colors">
                      Learn More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-6 sm:py-12 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="relative py-2 sm:py-4 inline-block">
                <div className="absolute -inset-4 bg-gradient-radial from-white/50 via-white/30 to-transparent blur-lg"></div>
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-blue-600/10 rounded-full blur-xl"></div>
                  <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 relative">
                    <span className="relative inline-block">
                      Essential Gear
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                    </span>
                  </h2>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-blue-600/10 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { name: 'Skis', url: '/skis.jpg', id: 'skis' },
                  { name: 'Boots', url: '/boots.jpg', id: 'boots' },
                  { name: 'Helmet', url: '/helmet.jpg', id: 'helmet' },
                  { name: 'Goggles', url: '/goggle.jpg', id: 'goggles', position: 'center 60%' }
                ].map((item) => (
                  <div key={item.name} className="text-center">
                    <Link 
                      href={`/gear#${item.id}`}
                      className="group block w-56 h-56 mx-auto bg-white/50 backdrop-blur-sm rounded-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 transform-gpu shadow-md hover:shadow-2xl"
                    >
                      <div className="relative h-full w-full bg-gradient-to-b from-gray-100 to-gray-200">
                        <div className="absolute inset-0 backdrop-blur-sm"></div>
                        <Image
                          src={item.url}
                          alt={item.name}
                          fill
                          style={{ 
                            objectFit: 'cover',
                            objectPosition: item.position || 'center'
                          }}
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="hover:scale-110 transition-transform duration-300"
                          quality={100}
                          priority
                        />
                      </div>
                    </Link>
                    <h3 className="text-xl font-semibold mt-4 mb-2">{item.name}</h3>
                    <p className="text-gray-600">Find the perfect {item.name.toLowerCase()} for your style</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[75%] mx-auto">
                {[
                  { name: 'Ski Poles', url: '/poles.jpg', id: 'poles' },
                  { name: 'Bindings', url: '/bindings.jpg', id: 'bindings' },
                  { name: 'Apparel', url: '/apparrel.jpg', id: 'apparel', position: 'center 40%' }
                ].map((item) => (
                  <div key={item.name} className="text-center">
                    <Link 
                      href={`/gear#${item.id}`}
                      className="group block w-56 h-56 mx-auto bg-white/50 backdrop-blur-sm rounded-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 transform-gpu shadow-md hover:shadow-2xl"
                    >
                      <div className="relative h-full w-full bg-gradient-to-b from-gray-100 to-gray-200">
                        <div className="absolute inset-0 backdrop-blur-sm"></div>
                        <Image
                          src={item.url}
                          alt={item.name}
                          fill
                          style={{ 
                            objectFit: 'cover',
                            objectPosition: item.position || 'center'
                          }}
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="hover:scale-110 transition-transform duration-300"
                          quality={100}
                          priority
                        />
                      </div>
                    </Link>
                    <h3 className="text-xl font-semibold mt-4 mb-2">{item.name}</h3>
                    <p className="text-gray-600">Find the perfect {item.name.toLowerCase()} for your style</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Weather Widget */}
        <section className="py-6 sm:py-12 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="relative py-2 sm:py-4 inline-block">
                <div className="absolute -inset-4 bg-gradient-radial from-white/50 via-white/30 to-transparent blur-lg"></div>
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-blue-600/10 rounded-full blur-xl"></div>
                  <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 relative">
                    <span className="relative inline-block">
                      Current Conditions
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                    </span>
                  </h2>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-blue-600/10 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(weatherData)
                .filter(([resort]) => ['Brighton', 'Alta', 'Snowbird'].includes(resort))
                .map(([resort, weather]) => (
                  <WeatherWidget
                    key={resort}
                    resortName={resort}
                    weather={weather}
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}