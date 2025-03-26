import Image from 'next/image';
import { WeatherData } from '../services/weather';

interface WeatherWidgetProps {
  resortName: string;
  weather: WeatherData;
}

export default function WeatherWidget({ resortName, weather }: WeatherWidgetProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">{resortName}</h3>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image
            src={`https://api.weather.gov/icons/land/day/${weather.icon}?size=medium`}
            alt={weather.description}
            width={50}
            height={50}
            className="mr-2"
            unoptimized
          />
          <div>
            <p className="text-3xl font-bold">{weather.temperature}°F</p>
            <p className="text-gray-600 capitalize">{weather.description}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-gray-600">Wind</p>
          <p className="font-semibold">{weather.windSpeed} mph</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600">{weather.forecast}</p>
      </div>
    </div>
  );
} 