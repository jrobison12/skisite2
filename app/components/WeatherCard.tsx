'use client';

import { useRef } from 'react';
import { WeatherData } from '../types/weather';
import WeatherTrend from './WeatherTrend';
import SnowfallSpread from './SnowfallSpread';
import Image from 'next/image';

interface WeatherCardProps {
  resort: string;
  weather: WeatherData;
  medal: string | null;
  topThree: { resort: string; amount: number }[];
}

// Helper function to get weather icon based on weather code
function getWeatherIcon(code: number): string {
  // Check if it's nighttime (between 6 PM and 6 AM Mountain Time)
  const hour = new Date().toLocaleString('en-US', { 
    timeZone: 'America/Denver',
    hour: 'numeric',
    hour12: false 
  });
  const isNight = parseInt(hour) < 6 || parseInt(hour) >= 18;

  // Map WMO codes to our icon set
  const weatherCodes: Record<number, string> = {
    0: 'clear-day', // Clear sky
    1: 'clear-day', // Mainly clear
    2: 'partly-cloudy-day', // Partly cloudy
    3: 'cloudy', // Overcast
    45: 'fog', // Foggy
    48: 'fog', // Depositing rime fog
    51: 'drizzle', // Light drizzle
    53: 'drizzle', // Moderate drizzle
    55: 'drizzle', // Dense drizzle
    61: 'rain', // Slight rain
    63: 'rain', // Moderate rain
    65: 'rain', // Heavy rain
    71: 'snow', // Slight snow
    73: 'snow', // Moderate snow
    75: 'snow', // Heavy snow
    77: 'snow', // Snow grains
    85: 'snow', // Slight snow showers
    86: 'snow', // Heavy snow showers
    95: 'thunderstorm', // Thunderstorm
  };

  // Get the base icon name
  let iconName = weatherCodes[code] || 'cloudy';
  
  // Convert to night version if it's nighttime and we have a day/night variant
  if (isNight) {
    if (iconName === 'clear-day') {
      iconName = 'clear-day';  // We don't have a night version, keep using day
    } else if (iconName === 'partly-cloudy-day') {
      iconName = 'partly-cloudy-day';  // We don't have a night version, keep using day
    }
  }

  return iconName;
}

function getResortLogo(resort: string): string {
  const logoMap: Record<string, string> = {
    'Alta': '/logos/alta.jpg',
    'Brighton': '/logos/brighton.png',
    'Deer Valley': '/logos/deer valley.png',
    'Park City': '/logos/park city.png',
    'Snowbird': '/logos/Snowbird Logo.png',
    'Solitude': '/logos/solitude.png',
    'Snowbasin': '/logos/snowbasin-logo.png'
  };
  return logoMap[resort] || '';
}

export default function WeatherCard({ resort, weather, medal, topThree }: WeatherCardProps) {
  const sharedScrollRef = useRef<HTMLDivElement>(null);
  
  // Get current hour
  const currentHour = new Date().getHours();
  
  // Find today's snowfall from daily data
  const today = new Date().toISOString().split('T')[0];
  const todayIndex = weather.daily.date.findIndex((date: string) => date === today);
  const todaySnowfall = todayIndex !== -1 ? weather.daily.snowfall[todayIndex] : 0;

  // Calculate 24h total snowfall (rounded to nearest 0.1 inch)
  const snow24h = Math.round(
    weather.hourly.snowfall
      .slice(currentHour, currentHour + 24)
      .reduce((sum: number, val: number) => sum + val, 0) * 10
  ) / 10;

  // Add detailed debug logging
  console.log(`${resort} detailed snowfall data:`, {
    currentHour,
    hourlySnowfall: weather.hourly.snowfall.slice(currentHour, currentHour + 24).map((val, idx) => ({
      hour: new Date(weather.hourly.time[currentHour + idx]).toLocaleTimeString(),
      value: val
    })),
    dailySnowfall: weather.daily.snowfall.map((val, idx) => ({
      date: weather.daily.date[idx],
      value: val
    })),
    snow24hCalculation: {
      sum: snow24h
    }
  });

  // Convert temperature from Celsius to Fahrenheit
  const tempF = Math.round(weather.current.temperature_2m * 9/5 + 32);
  const feelsLikeF = Math.round(weather.current.apparent_temperature * 9/5 + 32);
  
  // Debug logging for weather conditions
  console.log(`${resort} weather conditions:`, {
    time: new Date().toLocaleTimeString('en-US', { timeZone: 'America/Denver' }),
    weatherCode: weather.current.weather_code,
    wind_speed: {
      raw: weather.current.wind_speed_10m,
      type: typeof weather.current.wind_speed_10m,
      value_before_rounding: weather.current.wind_speed_10m,
      value_after_rounding: Math.round(weather.current.wind_speed_10m)
    },
    description: (() => {
      const descriptions: Record<number, string> = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm'
      };
      return descriptions[weather.current.weather_code] || 'Unknown';
    })(),
    iconUsed: getWeatherIcon(weather.current.weather_code)
  });
  
  // Handle wind speed data
  const rawSpeed = weather.current.wind_speed_10m;
  
  // For Solitude, log the raw wind speed data
  if (resort === 'Solitude') {
    console.log('WeatherCard Solitude wind speed:', {
      raw: rawSpeed,
      type: typeof rawSpeed,
      isNaN: isNaN(rawSpeed),
      timestamp: new Date().toISOString(),
      fullWeatherData: weather.current
    });
  }

  // Validate and process wind speed
  let windSpeed = 0;
  if (typeof rawSpeed === 'number' && !isNaN(rawSpeed)) {
    windSpeed = Math.round(rawSpeed);
  } else {
    console.error(`Invalid wind speed for ${resort}:`, rawSpeed);
  }

  // For Solitude, log the processed wind speed
  if (resort === 'Solitude') {
    console.log('WeatherCard Solitude processed wind speed:', {
      raw: rawSpeed,
      processed: windSpeed,
      timestamp: new Date().toISOString()
    });
  }

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 ring-2 ring-blue-500 relative overflow-hidden">
      {todaySnowfall >= 5.00 && (
        <div className="snowflake-container">
          {[...Array(20)].map((_, i) => {
            const startY = -20 - (Math.random() * 100); // Start above the card
            const drift = (Math.random() - 0.5) * 150; // Increased drift range
            const duration = 7 + Math.random() * 6; // Slower fall for better effect
            const delay = Math.random() * duration;
            
            return (
              <div 
                key={i} 
                className="snowflake"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${delay}s`,
                  '--fall-duration': `${duration}s`,
                  '--start-y': `${startY}px`,
                  '--drift': `${drift}px`,
                  '--start-opacity': '0.6',
                  '--fall-distance': '100vh'
                } as React.CSSProperties}
              >
                ❄
              </div>
            );
          })}
        </div>
      )}
      <div className="relative z-10">
        {medal && (
          <div className="absolute -top-2 -right-2 text-2xl z-20" title={
            medal === '🥇' ? '24hr Snow Champion - Most Snow in the Last 24 Hours!' :
            medal === '🥈' ? '24hr Snow Silver Medalist - Second Most Snow in the Last 24 Hours' :
            '24hr Snow Bronze Medalist - Third Most Snow in the Last 24 Hours'
          }>
            {medal}
          </div>
        )}
        {todaySnowfall >= 5.00 && (
          <div className="absolute top-4 left-4 text-2xl animate-pulsate" title="Expected Snowfall: 5+ inches">
            ❄️
          </div>
        )}
        <div className="relative">
          <div className="absolute top-2 right-2 w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
            <Image
              src={getResortLogo(resort)}
              alt={`${resort} logo`}
              width={96}
              height={96}
              className={`object-contain max-w-full max-h-full ${
                resort === 'Alta' ? 'rounded-full' : ''
              }`}
            />
          </div>
          <h2 className="text-2xl font-bold mb-4 pr-20 sm:pr-28">{resort}</h2>
        </div>
        
        {/* Current Conditions */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Current Conditions</h3>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {tempF}°F
                </p>
                <Image
                  src={`/weather-icons/${getWeatherIcon(weather.current.weather_code)}.svg`}
                  alt="Weather icon"
                  width={40}
                  height={40}
                  className="opacity-80"
                />
              </div>
              <p className="text-sm text-gray-500">
                Feels like {feelsLikeF}°F
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Wind Speed</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {windSpeed} mph
              </p>
            </div>
          </div>
        </div>
        
        {/* Snow Report */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Snow Report</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Last Hour</p>
              <p className="text-3xl font-bold text-blue-600">
                {((value) => {
                  return value <= 0.050 ? '0"' : `${Math.round(value * 10) / 10}″`;
                })(weather.hourly.snowfall[0])}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">24 Hour Total</p>
              <p className="text-3xl font-bold text-blue-600">
                {snow24h}″
              </p>
            </div>
          </div>
        </div>
        
        {/* Hourly Trends */}
        <div className="space-y-2">
          {(() => {
            // Debug logging for time ranges
            const tempData = weather.hourly.temperature.slice(0, 24).map((temp: number, index: number) => {
              const date = new Date(weather.hourly.time[index]);
              const hour = date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                hour12: true
              });
              return {
                time: weather.hourly.time[index],
                value: temp,
                label: hour
              };
            });
            
            const snowData = weather.hourly.snowfall.slice(0, 24).map((amount: number, index: number) => {
              const date = new Date(weather.hourly.time[index]);
              const hour = date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                hour12: true
              });
              return {
                time: weather.hourly.time[index],
                value: amount,
                label: hour
              };
            });

            console.log('Temperature data:', tempData.map(d => ({ time: d.time, label: d.label })));
            console.log('Snowfall data:', snowData.map(d => ({ time: d.time, label: d.label })));

            return (
              <>
                <WeatherTrend
                  data={tempData}
                  title="Temperature Trend"
                  formatValue={(value) => `${Math.round(value * 9/5 + 32)}°F`}
                  currentHour={currentHour}
                  scrollRef={sharedScrollRef}
                  isScrollable={true}
                />
                <WeatherTrend
                  data={snowData}
                  title="Snowfall Forecast"
                  formatValue={(value) => {
                    return value <= 0.050 ? '0"' : `${Math.round(value * 10) / 10}″`;
                  }}
                  currentHour={currentHour}
                  scrollRef={sharedScrollRef}
                  isScrollable={false}
                />
              </>
            );
          })()}
        </div>

        {/* 7-Day Snowfall Spread */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">7-Day Snowfall</h3>
          {(() => {
            interface DayData {
              date: Date;
              amount: number;
              isToday: boolean;
              isPast: boolean;
              dayLabel: string;
              daysFromToday: number;
            }

            // Get today's date at midnight in Mountain Time
            const now = new Date();
            const startOfToday = new Date(now.toLocaleString('en-US', { timeZone: 'America/Denver' }));
            startOfToday.setHours(0, 0, 0, 0);
            
            // Create array of 7 days centered on today
            const days: DayData[] = Array.from({ length: 7 }, (_, i) => {
              const date = new Date(startOfToday);
              date.setDate(date.getDate() + (i - 3)); // -3 to +3 days
              
              const dayLabel = date.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                timeZone: 'America/Denver'
              });
              
              return {
                date,
                amount: 0,
                isToday: date.getTime() === startOfToday.getTime(),
                isPast: date < startOfToday,
                dayLabel,
                daysFromToday: i - 3
              };
            });

            // Calculate snowfall for each day
            days.forEach(day => {
              const dayDate = new Date(day.date.toLocaleString('en-US', { timeZone: 'America/Denver' }))
                .toISOString().split('T')[0];
              const dayIndex = weather.daily.date.findIndex((date: string) => date === dayDate);
              
              // Debug logging
              console.log(`${resort} - Comparing dates:`, {
                dayDate,
                availableDates: weather.daily.date,
                dayIndex,
                snowfallValue: dayIndex !== -1 ? weather.daily.snowfall[dayIndex] : 'not found'
              });
              
              if (dayIndex !== -1) {
                day.amount = weather.daily.snowfall[dayIndex];
              }
            });

            // Debug final days array
            console.log(`${resort} - Final days array:`, days);

            return (
              <SnowfallSpread days={days} />
            );
          })()}
        </div>
      </div>
    </div>
  );
} 