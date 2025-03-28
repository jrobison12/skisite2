import Image from 'next/image';

export default function ParkingPage() {
  const resortParking = [
    {
      name: "Alta",
      url: "https://reserve.altaparking.com/",
      description: "Alta requires parking reservations on weekends and holidays. Free parking is available on weekdays.",
      logo: "/logos/alta.jpg"
    },
    {
      name: "Snowbird",
      url: "https://www.snowbird.com/parking/",
      description: "Snowbird's parking reservation system. Reservations required for all vehicles during peak periods.",
      logo: "/logos/Snowbird Logo.png"
    },
    {
      name: "Brighton",
      url: "https://reservenski.parkbrightonresort.com/",
      description: "Brighton requires parking reservations on weekends and holidays. Free parking is available on weekdays.",
      logo: "/logos/brighton.png"
    },
    {
      name: "Solitude",
      url: "https://reservenski.parksolitude.com/",
      description: "Solitude's parking reservation system. Paid parking is in effect throughout the winter season.",
      logo: "/logos/solitude.png"
    },
    {
      name: "Park City",
      url: "https://reserve.parkatparkcitymountain.com/",
      description: "Park City Mountain's parking information and reservation system. Required for peak periods.",
      logo: "/logos/park city.png"
    },
    {
      name: "Deer Valley",
      url: "https://www.deervalley.com/blog/parking-and-transportation-tips-tricks-and-other-hacks",
      description: "Deer Valley's parking information. Complimentary parking available at multiple lots.",
      logo: "/logos/deer valley.png"
    },
    {
      name: "Snowbasin",
      url: "https://www.snowbasin.com/about/getting-here/",
      description: "Snowbasin's parking information and policies. Multiple lots available with free parking.",
      logo: "/logos/snowbasin-logo.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20 relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="/deer valley.jpeg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-base text-yellow-700">
                If skiing in Little Cottonwood Canyon (Alta, Snowbird), it is highly recommended to visit the{' '}
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
        <h1 className="text-4xl font-bold mb-4">Resort Parking Information</h1>
        <p className="text-gray-600 mb-8">
          Find parking information and reservation links for Utah ski resorts. Many resorts require parking reservations during peak periods and weekends.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resortParking.map((resort) => (
            <div key={resort.name} className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 ring-2 ring-blue-500">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-16 h-16">
                  <Image
                    src={resort.logo}
                    alt={`${resort.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold">{resort.name}</h2>
              </div>
              <p className="text-gray-600 mb-4">{resort.description}</p>
              <a
                href={resort.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Reserve Parking
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-lg p-6 ring-2 ring-blue-500">
          <h2 className="text-2xl font-bold mb-4">Important Notes</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Parking policies and requirements vary by resort</li>
            <li>Reservations are typically required during weekends and holidays</li>
            <li>Some resorts offer free parking during off-peak periods</li>
            <li>Consider using UTA Ski Bus service to avoid parking hassles</li>
            <li>Carpooling is encouraged and may offer preferred parking at some resorts</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 