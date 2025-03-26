// Coordinates for each resort
const RESORT_COORDINATES = {
  'Park City': { lat: 40.6461, lon: -111.4980 },
  'Snowbird': { lat: 40.5817, lon: -111.6558 },
  'Deer Valley': { lat: 40.6377, lon: -111.4783 }
};

const BASE_URL = 'https://api.weather.gov';

// Required by NWS API
const headers = {
  'User-Agent': 'SkiExplorer/1.0 (ski-explorer.repl.co)'
};

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  snowDepth?: number;
  forecast: string;
}

async function getGridPoint(lat: number, lon: number) {
  const response = await fetch(`${BASE_URL}/points/${lat},${lon}`, { headers });
  if (!response.ok) throw new Error('Failed to get grid point');
  return response.json();
}

export async function getResortWeather(resortName: string): Promise<WeatherData> {
  const coords = RESORT_COORDINATES[resortName as keyof typeof RESORT_COORDINATES];
  if (!coords) throw new Error('Resort not found');

  try {
    // First, get the grid point for the coordinates
    const gridPoint = await getGridPoint(coords.lat, coords.lon);
    
    // Then get the forecast for that grid point
    const forecastResponse = await fetch(gridPoint.properties.forecast, { headers });
    if (!forecastResponse.ok) throw new Error('Failed to get forecast');
    
    const forecastData = await forecastResponse.json();
    const currentPeriod = forecastData.properties.periods[0];
    
    // Keep temperature in Fahrenheit
    const tempF = currentPeriod.temperature;
    
    // Keep wind speed in mph
    const windMph = parseInt(currentPeriod.windSpeed.split(' ')[0]);

    return {
      temperature: tempF,
      feelsLike: tempF, // NWS API doesn't provide feels like temperature
      humidity: 0, // NWS API doesn't provide humidity in the free tier
      windSpeed: windMph,
      description: currentPeriod.shortForecast,
      icon: currentPeriod.icon.split('/').pop()?.replace('.png', '') || '01d',
      forecast: currentPeriod.detailedForecast,
      snowDepth: undefined // NWS API doesn't provide snow depth in the free tier
    };
  } catch (error) {
    console.error(`Error fetching weather for ${resortName}:`, error);
    throw error;
  }
}

export async function getAllResortsWeather(): Promise<Record<string, WeatherData>> {
  const resorts = Object.keys(RESORT_COORDINATES);
  const weatherData: Record<string, WeatherData> = {};
  
  await Promise.all(
    resorts.map(async (resort) => {
      try {
        weatherData[resort] = await getResortWeather(resort);
      } catch (error) {
        console.error(`Failed to fetch weather for ${resort}:`, error);
      }
    })
  );
  
  return weatherData;
} 