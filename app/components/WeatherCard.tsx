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
  const weatherCodes: Record<number, string> = {
    0: 'clear-day', // Clear sky
    1: 'partly-cloudy-day', // Mainly clear
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
  return weatherCodes[code] || 'cloudy';
}

export default function WeatherCard({ resort, weather, medal, topThree }: WeatherCardProps) {
  const sharedScrollRef = useRef<HTMLDivElement>(null);
  
  // Get current hour
  const currentHour = new Date().getHours();
  
  // Find today's snowfall from daily data
  const today = new Date().toISOString().split('T')[0];
  const todayIndex = weather.daily.date.findIndex((date: string) => date === today);
  const todaySnowfall = todayIndex !== -1 ? weather.daily.snowfall[todayIndex] / 25.4 : 0;

  // Calculate 24h total snowfall (rounded to nearest 0.1 inch)
  const snow24h = Math.round(
    weather.hourly.snowfall
      .slice(0, 24)
      .reduce((sum: number, val: number) => sum + val, 0) / 25.4 * 10
  ) / 10;

  console.log(`${resort} snowfall data:`, {
    today,
    todayIndex,
    rawSnowfall: todayIndex !== -1 ? weather.daily.snowfall[todayIndex] : 0,
    convertedSnowfall: todaySnowfall,
    dailyDates: weather.daily.date,
    dailySnowfall: weather.daily.snowfall,
    hourlySnowfall: weather.hourly.snowfall.slice(0, 24),
    snow24h
  });

  // Convert temperature from Celsius to Fahrenheit
  const tempF = Math.round(weather.current.temperature_2m * 9/5 + 32);
  const feelsLikeF = Math.round(weather.current.apparent_temperature * 9/5 + 32);
  
  // Wind speed is already in mph from the API
  const windSpeedMph = Math.round(weather.current.wind_speed_10m);

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
          <div className="absolute top-4 right-4 text-2xl" title={
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
        <h2 className="text-2xl font-bold mb-4">{resort}</h2>
        
        {/* Current Conditions */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Current Conditions</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-blue-600">
                  {tempF}°F
                </p>
                <Image
                  src={`/weather-icons/${getWeatherIcon(weather.current.weather_code)}.svg`}
                  alt="Weather icon"
                  width={40}
                  height={40}
                  className="brightness-0 opacity-70"
                />
              </div>
              <p className="text-sm text-gray-500">
                Feels like {feelsLikeF}°F
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Wind Speed</p>
              <p className="text-3xl font-bold text-blue-600">
                {windSpeedMph} mph
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
                  const inches = value / 25.4;
                  return inches <= 0.050 ? '0"' : `${Math.round(inches * 10) / 10}″`;
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
                    const inches = value / 2.54;
                    return inches <= 0.050 ? '0"' : `${Math.round(inches * 10) / 10}″`;
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

            // Get today's date at midnight
            const now = new Date();
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            // Create array of 7 days centered on today
            const days: DayData[] = Array.from({ length: 7 }, (_, i) => {
              const date = new Date(startOfToday);
              date.setDate(date.getDate() + (i - 3)); // -3 to +3 days
              
              const dayLabel = date.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short',
                day: 'numeric'
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

            // Find the index for start of today in the hourly data
            const todayStartIndex = weather.hourly.time.findIndex((timeStr: string) => 
              new Date(timeStr).getTime() === startOfToday.getTime()
            );

            // Calculate snowfall for each day
            days.forEach(day => {
              const dayStart = new Date(day.date);
              const dayEnd = new Date(day.date);
              dayEnd.setDate(dayEnd.getDate() + 1);

              // Find the indices for this day's data
              const startIndex = weather.hourly.time.findIndex((timeStr: string) => 
                new Date(timeStr) >= dayStart
              );
              const endIndex = weather.hourly.time.findIndex((timeStr: string) => 
                new Date(timeStr) >= dayEnd
              );

              if (startIndex !== -1 && endIndex !== -1) {
                day.amount = weather.hourly.snowfall
                  .slice(startIndex, endIndex)
                  .reduce((sum: number, val: number) => sum + val, 0);
              }
            });

            return (
              <SnowfallSpread days={days} />
            );
          })()}
        </div>
      </div>
    </div>
  );
} 