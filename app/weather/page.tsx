'use client';

import Image from 'next/image';
import { getAllResortsWeather } from '../services/weather';
import './weather.css';
import { WeatherData, ResortWeatherData } from '../types/weather';
import WeatherCard from '../components/WeatherCard';
import UdotCautionBanner from '../components/UdotCautionBanner';
import { useEffect, useState } from 'react';

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<ResortWeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getAllResortsWeather();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading || !weatherData) {
    return (
      <main className="min-h-screen bg-white pt-20 relative">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <p className="text-gray-600 text-center">Loading weather data...</p>
        </div>
      </main>
    );
  }

  // Get all resort snowfall amounts for ranking
  const today = new Date().toISOString().split('T')[0];
  const allSnowfallAmounts = Object.entries(weatherData).map(([resort, data]) => {
    // Calculate 24h total snowfall (rounded to nearest 0.1 inch)
    const amount = Math.round(
      data.hourly.snowfall
        .slice(0, 24)
        .reduce((sum: number, val: number) => sum + val, 0) / 25.4 * 10
    ) / 10;

    // Debug logging for each resort
    console.log(`${resort} 24h snowfall calculation:`, {
      resort,
      hourlySnowfall: data.hourly.snowfall.slice(0, 24),
      totalMM: data.hourly.snowfall.slice(0, 24).reduce((sum: number, val: number) => sum + val, 0),
      convertedInches: amount
    });

    return {
      resort,
      amount
    };
  });

  // Sort by amount and get top 3, with additional logging
  console.log('Before sorting:', allSnowfallAmounts);
  
  const EPSILON = 0.000001; // Small value to handle floating-point precision
  const topThree = [...allSnowfallAmounts]
    .sort((a, b) => {
      // If the difference is smaller than EPSILON, consider them equal
      const diff = Math.abs(b.amount - a.amount) < EPSILON ? 0 : b.amount - a.amount;
      console.log(`Comparing ${a.resort}(${a.amount}) with ${b.resort}(${b.amount}): ${diff}`);
      return diff;
    })
    .filter(resort => resort.amount > 0) // Only include resorts with snow
    .slice(0, 3);

  // Debug logging for snowfall amounts
  console.log('After sorting and filtering:', topThree);

  // Sort the weather data entries to put medal winners first
  const sortedEntries = Object.entries(weatherData).sort(([resortA], [resortB]) => {
    const indexA = topThree.findIndex(item => item.resort === resortA);
    const indexB = topThree.findIndex(item => item.resort === resortB);
    
    // If both have medals, sort by medal position
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If only A has a medal, it goes first
    if (indexA !== -1) return -1;
    // If only B has a medal, it goes first
    if (indexB !== -1) return 1;
    // If neither has a medal, keep original order
    return 0;
  });

  return (
    <main className="min-h-screen bg-white pt-20 relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="/solitude.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
      </div>
      <UdotCautionBanner weatherData={weatherData} />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8">Resort Weather Conditions</h1>
        <p className="text-gray-600 mb-12">Current weather conditions at ski resorts near Salt Lake City. Updated in real-time to help you plan your perfect ski day.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEntries.map(([resort, weather]) => {
            // Get medal for current resort if in top 3
            const getMedal = () => {
              const index = topThree.findIndex(item => item.resort === resort);
              if (index === 0) return '🥇';
              if (index === 1) return '🥈';
              if (index === 2) return '🥉';
              return null;
            };

            const medal = getMedal();

            return (
              <WeatherCard
                key={resort}
                resort={resort}
                weather={weather}
                medal={medal}
                topThree={topThree}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
} 