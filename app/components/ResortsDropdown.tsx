'use client';

import Link from 'next/link';

const RESORTS = [
  { 
    name: 'Alta', 
    href: '/resorts/alta',
    trailMap: 'https://www.alta.com/plan-your-trip#maps',
    parking: 'https://reserve.altaparking.com/'
  },
  { 
    name: 'Snowbird', 
    href: '/resorts/snowbird',
    trailMap: 'https://www.snowbird.com/the-mountain/maps/winter-trail-map',
    parking: 'https://www.snowbird.com/parking/'
  },
  { 
    name: 'Brighton', 
    href: '/resorts/brighton',
    trailMap: 'https://www.brightonresort.com/trail-maps',
    parking: 'https://reservenski.parkbrightonresort.com/'
  },
  { 
    name: 'Solitude', 
    href: '/resorts/solitude',
    trailMap: 'https://www.solitudemountain.com/-/media/Solitude/Trail-Map-PDFs/Solitude_Winter_Trail_Map_2425.pdf',
    parking: 'https://reservenski.parksolitude.com/'
  },
  { 
    name: 'Park City', 
    href: '/resorts/parkcity',
    trailMap: 'https://www.parkcitymountain.com/the-mountain/about-the-mountain/trail-map.aspx',
    parking: 'https://reserve.parkatparkcitymountain.com/'
  },
  { 
    name: 'Deer Valley', 
    href: '/resorts/deervalley',
    trailMap: 'https://www.deervalley.com/explore-the-mountain/interactive-grooming-map',
    parking: 'https://www.deervalley.com/blog/parking-and-transportation-tips-tricks-and-other-hacks'
  },
  { 
    name: 'Snowbasin', 
    href: '/resorts/snowbasin',
    trailMap: 'https://www.snowbasin.com/the-mountain/trail-maps/',
    parking: 'https://www.snowbasin.com/about/getting-here/'
  }
];

export default function ResortsDropdown() {
  return (
    <div className="relative group">
      <Link 
        href="/resorts"
        className="text-white hover:text-blue-200 px-4 py-2 text-lg font-medium border-b-2 border-transparent hover:border-blue-200 transition-all duration-200 flex items-center gap-1"
      >
        Resorts
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
      
      <div className="absolute top-full left-0 bg-blue-900 rounded-lg shadow-lg py-2 min-w-[200px] transition-all duration-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
        {RESORTS.map((resort) => (
          <div key={resort.name} className="relative group/submenu">
            <div className="flex items-center justify-between px-4 py-2 text-white hover:bg-blue-800 transition-colors cursor-pointer">
              <span>{resort.name}</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover/submenu:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            <div className="absolute top-0 left-full bg-blue-900 rounded-lg shadow-lg py-2 min-w-[200px] transition-all duration-200 z-50 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible">
              <div className="absolute top-0 left-0 w-4 h-full" />
              <Link
                href={resort.href}
                className="block px-4 py-2 text-white hover:bg-blue-800 transition-colors"
              >
                Overview
              </Link>
              <a
                href={resort.trailMap}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-white hover:bg-blue-800 transition-colors"
              >
                Trail Map
              </a>
              <a
                href={resort.parking}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-white hover:bg-blue-800 transition-colors"
              >
                Parking
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 