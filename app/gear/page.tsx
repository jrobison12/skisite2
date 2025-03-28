import Image from 'next/image';

interface PriceRange {
  range: string;
  brands: string[];
}

interface StandardPriceRanges {
  budget: PriceRange;
  mid: PriceRange;
  premium: PriceRange;
}

interface ApparelPriceRanges {
  jackets: StandardPriceRanges;
  pants: StandardPriceRanges;
}

interface GearItem {
  name: string;
  image: string;
  description: string;
  key_features: string[];
  buying_tips: string;
  price_ranges: StandardPriceRanges | ApparelPriceRanges;
}

const isApparelPriceRanges = (priceRanges: StandardPriceRanges | ApparelPriceRanges): priceRanges is ApparelPriceRanges => {
  return 'jackets' in priceRanges && 'pants' in priceRanges;
};

const isStandardPriceRanges = (priceRanges: StandardPriceRanges | ApparelPriceRanges): priceRanges is StandardPriceRanges => {
  return 'budget' in priceRanges && 'mid' in priceRanges && 'premium' in priceRanges;
};

const ESSENTIAL_GEAR: GearItem[] = [
  {
    name: 'Skis',
    image: '/skis.jpg',
    description: 'The foundation of your skiing experience. Modern skis come in various types to match your skiing style and ability level. Different types of terrain favor different characteristics - wider skis excel in powder and soft snow, while narrower skis provide better edge grip on hardpack and groomed runs. Length affects stability and maneuverability, while flexibility determines how the ski responds to terrain and snow conditions.',
    key_features: [
      'All-mountain skis are versatile for various conditions',
      'Width affects performance in different snow types',
      'Length should be based on height and skill level',
      'Proper bindings are crucial for safety'
    ],
    buying_tips: 'Consider your skill level, preferred terrain, and typical snow conditions when selecting skis. Beginners should opt for all-mountain skis with moderate width.',
    price_ranges: {
      budget: {
        range: '$300-500',
        brands: ['Rossignol Essential', 'K2 Konic', 'Elan Element']
      },
      mid: {
        range: '$500-800',
        brands: ['Volkl Deacon', 'Atomic Maverick', 'Salomon QST']
      },
      premium: {
        range: '$800-1200+',
        brands: ['Blizzard Bonafide', 'DPS Pagoda', 'Kastle MX']
      }
    }
  },
  {
    name: 'Bindings',
    image: '/bindings.jpg',
    description: 'Bindings are your crucial safety connection to your skis, designed to release when necessary to prevent injury while maintaining control during normal skiing. It is highly recommended to have bindings professionally mounted by a certified technician, as they need to ensure the binding is compatible with your skis and properly adjusted to your boot size and skiing ability.',
    key_features: [
      'DIN setting adjusts release force',
      'Alpine vs. Alpine Touring options',
      'Must match boot sole type',
      'Regular maintenance required',
      'Professional mounting recommended'
    ],
    buying_tips: 'Get bindings professionally mounted and adjusted. DIN settings should match your weight, ability, and skiing style. Always have them tested annually.',
    price_ranges: {
      budget: {
        range: '$150-250',
        brands: ['Tyrolia Attack', 'Look Nova', 'Marker M1']
      },
      mid: {
        range: '$250-400',
        brands: ['Salomon STH2', 'Look SPX', 'Marker Griffin']
      },
      premium: {
        range: '$400-700+',
        brands: ['Look Pivot', 'Marker Jester', 'Salomon STH2 16']
      }
    }
  },
  {
    name: 'Ski Poles',
    image: '/poles.jpg',
    description: 'Essential for balance, timing, and propulsion, ski poles help with rhythm and navigation through various terrain types.',
    key_features: [
      'Adjustable vs fixed length',
      'Aluminum or carbon construction',
      'Ergonomic grip design',
      'Powder baskets for deep snow',
      'Quick-release straps'
    ],
    buying_tips: 'Choose the right length (bent arm should form 90-degree angle when pole tip touches snow). Consider terrain type when selecting basket size.',
    price_ranges: {
      budget: {
        range: '$30-60',
        brands: ['Rossignol Tactic', 'K2 Power', 'Scott Team']
      },
      mid: {
        range: '$60-120',
        brands: ['Black Diamond Traverse', 'Leki Peak', 'Swix Techlite']
      },
      premium: {
        range: '$120-200+',
        brands: ['Leki Carbon', 'Black Diamond Razor Carbon', 'Gipron Carbon Race']
      }
    }
  },
  {
    name: 'Boots',
    image: '/boots.jpg',
    description: 'Perhaps the most important piece of ski equipment. Properly fitted boots are essential for control and comfort.',
    key_features: [
      'Flex rating indicates stiffness',
      'Shell and liner should match foot shape',
      'Heat-moldable liners for custom fit',
      'Multiple buckles for adjustability'
    ],
    buying_tips: 'Always get professionally fitted. Boot size may differ from street shoe size. Consider width and flex rating based on your ability level.',
    price_ranges: {
      budget: {
        range: '$200-300',
        brands: ['Dalbello Panterra', 'Rossignol Evo', 'Nordica Cruise']
      },
      mid: {
        range: '$300-500',
        brands: ['Salomon S/Pro', 'Atomic Hawx', 'Tecnica Mach']
      },
      premium: {
        range: '$500-900',
        brands: ['Lange RX', 'Head Raptor', 'Dalbello Krypton']
      }
    }
  },
  {
    name: 'Helmet',
    image: '/helmet.jpg',
    description: 'Essential safety equipment that protects against head injuries. Modern ski helmets are lightweight and comfortable.',
    key_features: [
      'MIPS technology for enhanced protection',
      'Adjustable ventilation',
      'Compatible with goggles',
      'Proper fit is crucial for safety'
    ],
    buying_tips: 'Ensure proper fit with and without a beanie. Look for MIPS technology and adjustable features. Replace after any significant impact.',
    price_ranges: {
      budget: {
        range: '$60-100',
        brands: ['Smith Holt', 'Giro Ledge', 'K2 Phase']
      },
      mid: {
        range: '$100-200',
        brands: ['POC Obex', 'Oakley MOD', 'Sweet Protection Switcher']
      },
      premium: {
        range: '$200-300+',
        brands: ['Smith Vantage', 'Giro Range', 'POC Fornix Backcountry']
      }
    }
  },
  {
    name: 'Goggles',
    image: '/goggle.jpg',
    description: 'Protect your eyes and enhance visibility in varying weather conditions. Quality goggles are essential for safety and comfort.',
    key_features: [
      'Different lens tints for various conditions',
      'Anti-fog coating',
      'UV protection',
      'Proper helmet compatibility',
      'Ventilation system'
    ],
    buying_tips: 'Consider getting multiple lenses for different conditions. Ensure compatibility with your helmet. Look for anti-fog technology and good ventilation.',
    price_ranges: {
      budget: {
        range: '$50-100',
        brands: ['Smith Squad', 'Giro Roam', 'Dragon PXV']
      },
      mid: {
        range: '$100-200',
        brands: ['Oakley Flight Deck', 'Smith I/O', 'Anon M4']
      },
      premium: {
        range: '$200-300+',
        brands: ['Oakley Airbrake', 'Smith 4D MAG', 'POC Orb Clarity']
      }
    }
  },
  {
    name: 'Apparel',
    image: '/apparrel.jpg',
    description: 'Proper ski clothing is crucial for comfort and protection on the mountain. A well-layered system keeps you warm, dry, and comfortable in various conditions. Essential components include waterproof gloves with wrist gaiters and moisture-wicking baselayers, while face masks or neck gaiters are highly recommended for protection against wind and cold.',
    key_features: [
      'Waterproof and breathable outer layers',
      'Insulated or shell options for jackets',
      'Ski-specific pants with reinforced knees',
      'Waterproof gloves with wrist gaiters',
      'Moisture-wicking baselayers',
      'Temperature regulating mid-layers'
    ],
    buying_tips: 'Layer appropriately for the conditions. Look for waterproof ratings (10k+) and breathability. Consider getting multiple baselayers for different temperatures. Always try on with your other gear.',
    price_ranges: {
      jackets: {
        budget: {
          range: '$150-300',
          brands: ['Columbia', 'Spyder', 'O\'Neill']
        },
        mid: {
          range: '$300-600',
          brands: ['Patagonia', 'The North Face', 'Mountain Hardwear']
        },
        premium: {
          range: '$600-1000+',
          brands: ['Arc\'teryx', 'Helly Hansen', 'Bogner']
        }
      },
      pants: {
        budget: {
          range: '$100-200',
          brands: ['Columbia', 'Spyder', 'O\'Neill']
        },
        mid: {
          range: '$200-400',
          brands: ['Patagonia', 'The North Face', 'Mountain Hardwear']
        },
        premium: {
          range: '$400-800+',
          brands: ['Arc\'teryx', 'Helly Hansen', 'Bogner']
        }
      }
    }
  }
];

const getProductUrl = (brand: string, category: string) => {
  // Create a search query that includes both brand and category
  const searchQuery = `${brand} ${category} ski gear`;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
  
  return {
    budget: () => googleUrl,
    mid: () => googleUrl,
    premium: () => googleUrl
  };
};

export default function GearPage() {
  return (
    <main className="min-h-screen bg-white pt-20 relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="/helmet.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8">Essential Ski Gear</h1>
        <p className="text-gray-600 mb-12">A guide to the fundamental equipment you need for a safe and enjoyable skiing experience. Quality gear makes a significant difference in your comfort and performance on the slopes.</p>
        
        <div className="space-y-24">
          {ESSENTIAL_GEAR.map(gear => (
            <div 
              key={gear.name} 
              id={gear.name.toLowerCase()} 
              className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden scroll-mt-[30vh] min-h-[60vh] flex flex-col justify-center ring-2 ring-blue-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3 relative h-64 md:h-auto">
                  <Image
                    src={gear.image}
                    alt={gear.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h2 className="text-2xl font-bold mb-4">{gear.name}</h2>
                  <p className="text-gray-600 mb-6">{gear.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-3">
                        {gear.key_features.map((feature, index) => (
                          <li key={index} className="flex">
                            <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Buying Tips</h3>
                      <p className="text-gray-600">{gear.buying_tips}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Price Ranges & Recommended Brands</h3>
                    {gear.name === 'Apparel' && isApparelPriceRanges(gear.price_ranges) ? (
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Jackets</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <h5 className="font-medium text-gray-600">Budget Friendly</h5>
                              <p className="text-blue-600 font-semibold">{gear.price_ranges.jackets.budget.range}</p>
                              <ul className="text-sm text-gray-600 mt-1">
                                {gear.price_ranges.jackets.budget.brands.map((brand, index) => (
                                  <li key={index}>
                                    <a 
                                      href={getProductUrl(brand, `${gear.name} jacket`).budget()}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                      {brand}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-600">Mid-Range</h5>
                              <p className="text-blue-600 font-semibold">{gear.price_ranges.jackets.mid.range}</p>
                              <ul className="text-sm text-gray-600 mt-1">
                                {gear.price_ranges.jackets.mid.brands.map((brand, index) => (
                                  <li key={index}>
                                    <a 
                                      href={getProductUrl(brand, `${gear.name} jacket`).mid()}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                      {brand}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-600">Premium</h5>
                              <p className="text-blue-600 font-semibold">{gear.price_ranges.jackets.premium.range}</p>
                              <ul className="text-sm text-gray-600 mt-1">
                                {gear.price_ranges.jackets.premium.brands.map((brand, index) => (
                                  <li key={index}>
                                    <a 
                                      href={getProductUrl(brand, `${gear.name} jacket`).premium()}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                      {brand}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Pants</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <h5 className="font-medium text-gray-600">Budget Friendly</h5>
                              <p className="text-blue-600 font-semibold">{gear.price_ranges.pants.budget.range}</p>
                              <ul className="text-sm text-gray-600 mt-1">
                                {gear.price_ranges.pants.budget.brands.map((brand, index) => (
                                  <li key={index}>
                                    <a 
                                      href={getProductUrl(brand, `${gear.name} pants`).budget()}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                      {brand}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-600">Mid-Range</h5>
                              <p className="text-blue-600 font-semibold">{gear.price_ranges.pants.mid.range}</p>
                              <ul className="text-sm text-gray-600 mt-1">
                                {gear.price_ranges.pants.mid.brands.map((brand, index) => (
                                  <li key={index}>
                                    <a 
                                      href={getProductUrl(brand, `${gear.name} pants`).mid()}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                      {brand}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-600">Premium</h5>
                              <p className="text-blue-600 font-semibold">{gear.price_ranges.pants.premium.range}</p>
                              <ul className="text-sm text-gray-600 mt-1">
                                {gear.price_ranges.pants.premium.brands.map((brand, index) => (
                                  <li key={index}>
                                    <a 
                                      href={getProductUrl(brand, `${gear.name} pants`).premium()}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                      {brand}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : isStandardPriceRanges(gear.price_ranges) ? (
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-700">Budget Friendly</h4>
                          <p className="text-blue-600 font-semibold">{gear.price_ranges.budget.range}</p>
                          <ul className="text-sm text-gray-600 mt-1">
                            {gear.price_ranges.budget.brands.map((brand: string, index: number) => (
                              <li key={index}>
                                <a 
                                  href={getProductUrl(brand, gear.name).budget()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {brand}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">Mid-Range</h4>
                          <p className="text-blue-600 font-semibold">{gear.price_ranges.mid.range}</p>
                          <ul className="text-sm text-gray-600 mt-1">
                            {gear.price_ranges.mid.brands.map((brand: string, index: number) => (
                              <li key={index}>
                                <a 
                                  href={getProductUrl(brand, gear.name).mid()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {brand}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">Premium</h4>
                          <p className="text-blue-600 font-semibold">{gear.price_ranges.premium.range}</p>
                          <ul className="text-sm text-gray-600 mt-1">
                            {gear.price_ranges.premium.brands.map((brand: string, index: number) => (
                              <li key={index}>
                                <a 
                                  href={getProductUrl(brand, gear.name).premium()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {brand}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 