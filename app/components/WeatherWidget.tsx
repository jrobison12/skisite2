import Image from 'next/image';
import Link from 'next/link';
import { WeatherData } from '../types/weather';

interface WeatherWidgetProps {
  resortName: string;
  weather: WeatherData;
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
  
  console.log('Weather code:', code, 'Mapped to icon:', weatherCodes[code] || 'cloudy');
  return weatherCodes[code] || 'cloudy'; // Default to cloudy instead of clear-day
}

// Helper function to get weather description based on weather code
function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Light rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    85: 'Light snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
  };
  return weatherCodes[code] || 'Unknown';
}

export default function WeatherWidget({ resortName, weather }: WeatherWidgetProps) {
  const icon = getWeatherIcon(weather.current.weather_code);
  
  // Convert temperature from Celsius to Fahrenheit
  const tempF = Math.round(weather.current.temperature_2m * 9/5 + 32);
  const feelsLikeF = Math.round(weather.current.apparent_temperature * 9/5 + 32);
  
  // Wind speed is already in mph from the API
  const windSpeedMph = Math.round(weather.current.wind_speed_10m);

  // Calculate 24h total snowfall
  const snow24h = Math.round(
    weather.hourly.snowfall
      .slice(0, 24)
      .reduce((sum: number, val: number) => sum + val, 0) * 10
  ) / 10;

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">{resortName}</h3>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Image
            src={`/weather-icons/${icon}.svg`}
            alt="Weather icon"
            width={50}
            height={50}
            className="mr-4 brightness-0 opacity-70"
          />
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-3xl font-bold">{tempF}°F</p>
              <p className="text-sm text-gray-500">Current Temp</p>
              <div className="mt-2">
                <p className="text-xl font-semibold">{feelsLikeF}°F</p>
                <p className="text-sm text-gray-500">Feels like</p>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">{snow24h}″</p>
              <p className="text-sm text-gray-500">24h Snowfall</p>
              <div className="mt-2">
                <p className="text-xl font-semibold">{windSpeedMph} mph</p>
                <p className="text-sm text-gray-500">Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link href="/weather" className="text-blue-500 hover:text-blue-600 font-medium flex items-center">
          More Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}