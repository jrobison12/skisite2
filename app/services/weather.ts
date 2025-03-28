// Coordinates for each resort
const RESORT_COORDINATES = {
  'Alta': { lat: 40.5883, lon: -111.6358, elevation: 2600 },
  'Brighton': { lat: 40.5977, lon: -111.5836, elevation: 2669 },
  'Snowbird': { lat: 40.5817, lon: -111.6558, elevation: 2500 },
  'Solitude': { lat: 40.6199, lon: -111.5919, elevation: 2645 },
  'Park City': { lat: 40.6514, lon: -111.5080, elevation: 2103 },
  'Deer Valley': { lat: 40.6374, lon: -111.4783, elevation: 2179 },
  'Snowbasin': { lat: 41.2160, lon: -111.8571, elevation: 2050 }
};

const BASE_URL = 'https://api.open-meteo.com/v1';

export interface WeatherData {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    precipitation: number;
    relative_humidity_2m: number;
    visibility: number;
    time: string;
    interval: number;
    weather_code: number;
  };
  hourly: {
    snowfall: number[];
    temperature: number[];
    time: string[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    precipitation: number[];
    relative_humidity_2m: number[];
    visibility: number[];
  };
  daily: {
    snowfall: number[];
    date: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
}

export interface ResortWeatherData {
  Snowbird: WeatherData;
  Brighton: WeatherData;
  Alta: WeatherData;
  Solitude: WeatherData;
  'Park City': WeatherData;
  'Deer Valley': WeatherData;
  Snowbasin: WeatherData;
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

// Cache interface
interface WeatherCache {
  data: ResortWeatherData;
  timestamp: number;
}

// Cache duration in milliseconds (15 minutes)
const CACHE_DURATION = 15 * 60 * 1000;

// In-memory cache
let weatherCache: WeatherCache | null = null;

// Helper function to add delay between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to retry failed requests with exponential backoff
async function fetchWithRetry(url: string, maxRetries = 3, initialDelayMs = 2000): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Add delay between attempts, increasing with each retry
      if (attempt > 0) {
        const delayTime = initialDelayMs * Math.pow(2, attempt - 1);
        await delay(delayTime);
      }
      
      const response = await fetch(url);
      
      if (response.ok) {
        return response;
      }
      
      if (response.status === 429) {
        console.log(`Rate limited on attempt ${attempt + 1}, waiting before retry...`);
        continue;
      }
      
      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxRetries - 1) {
        throw error;
      }
    }
  }
  
  throw lastError || new Error('Failed to fetch after max retries');
}

export async function getResortWeather(resortName: string): Promise<WeatherData> {
  const coords = RESORT_COORDINATES[resortName as keyof typeof RESORT_COORDINATES];
  if (!coords) throw new Error('Resort not found');

  try {
    // Get current date in ISO format
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 3);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 3);

    // Format dates for API
    const start_date = startDate.toISOString().split('T')[0];
    const end_date = endDate.toISOString().split('T')[0];

    // Get current weather, hourly forecast, and daily forecast with elevation
    const url = `${BASE_URL}/forecast?` +
      `latitude=${coords.lat}&longitude=${coords.lon}&` +
      `current=temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,precipitation,relative_humidity_2m,visibility,weather_code&` +
      `hourly=temperature_2m,snowfall,wind_speed_10m,wind_direction_10m,precipitation,relative_humidity_2m,visibility&` +
      `daily=snowfall_sum,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&` +
      `timezone=America/Denver&` +
      `start_date=${start_date}&` +
      `end_date=${end_date}`;

    console.log(`Fetching weather for ${resortName} with URL:`, url);

    const response = await fetchWithRetry(url);
    const data = await response.json();
    
    // Debug logging
    console.log(`Weather data for ${resortName}:`, {
      current: {
        ...data.current,
        wind_speed_10m: {
          raw: data.current.wind_speed_10m,
          mph: data.current.wind_speed_10m * 2.23694
        }
      },
      hourly: {
        snowfall: data.hourly.snowfall.slice(0, 24),
        temperature: data.hourly.temperature_2m.slice(0, 24)
      },
      daily: {
        snowfall: data.daily.snowfall_sum,
        date: data.daily.time
      }
    });

    return {
      current: {
        temperature_2m: data.current.temperature_2m,
        apparent_temperature: data.current.apparent_temperature,
        wind_speed_10m: data.current.wind_speed_10m,
        wind_direction_10m: data.current.wind_direction_10m,
        precipitation: data.current.precipitation,
        relative_humidity_2m: data.current.relative_humidity_2m,
        visibility: data.current.visibility,
        time: data.current.time,
        interval: data.current.interval,
        weather_code: data.current.weather_code
      },
      hourly: {
        temperature: data.hourly.temperature_2m,
        snowfall: data.hourly.snowfall,
        time: data.hourly.time,
        wind_speed_10m: data.hourly.wind_speed_10m,
        wind_direction_10m: data.hourly.wind_direction_10m,
        precipitation: data.hourly.precipitation,
        relative_humidity_2m: data.hourly.relative_humidity_2m,
        visibility: data.hourly.visibility
      },
      daily: {
        date: data.daily.time,
        snowfall: data.daily.snowfall_sum,
        temperature_2m_max: data.daily.temperature_2m_max,
        temperature_2m_min: data.daily.temperature_2m_min,
        precipitation_sum: data.daily.precipitation_sum,
        wind_speed_10m_max: data.daily.wind_speed_10m_max
      }
    };
  } catch (error) {
    console.error(`Error fetching weather for ${resortName}:`, error);
    throw error;
  }
}

// Helper function to convert WMO weather codes to descriptions and icons
function getWeatherInfo(code: number): { description: string; icon: string } {
  const weatherCodes: Record<number, { description: string; icon: string }> = {
    0: { description: 'Clear sky', icon: '01d' },
    1: { description: 'Mainly clear', icon: '02d' },
    2: { description: 'Partly cloudy', icon: '03d' },
    3: { description: 'Overcast', icon: '04d' },
    45: { description: 'Foggy', icon: '50d' },
    48: { description: 'Depositing rime fog', icon: '50d' },
    51: { description: 'Light drizzle', icon: '09d' },
    53: { description: 'Moderate drizzle', icon: '09d' },
    55: { description: 'Dense drizzle', icon: '09d' },
    61: { description: 'Slight rain', icon: '10d' },
    63: { description: 'Moderate rain', icon: '10d' },
    65: { description: 'Heavy rain', icon: '10d' },
    71: { description: 'Slight snow', icon: '13d' },
    73: { description: 'Moderate snow', icon: '13d' },
    75: { description: 'Heavy snow', icon: '13d' },
    77: { description: 'Snow grains', icon: '13d' },
    80: { description: 'Slight rain showers', icon: '09d' },
    81: { description: 'Moderate rain showers', icon: '09d' },
    82: { description: 'Violent rain showers', icon: '09d' },
    85: { description: 'Slight snow showers', icon: '13d' },
    86: { description: 'Heavy snow showers', icon: '13d' },
    95: { description: 'Thunderstorm', icon: '11d' },
    96: { description: 'Thunderstorm with slight hail', icon: '11d' },
    99: { description: 'Thunderstorm with heavy hail', icon: '11d' }
  };

  return weatherCodes[code] || { description: 'Unknown', icon: '01d' };
}

export async function getAllResortsWeather(): Promise<ResortWeatherData> {
  // Check cache first
  if (weatherCache && (Date.now() - weatherCache.timestamp) < CACHE_DURATION) {
    console.log('Returning cached weather data');
    return weatherCache.data;
  }

  const resorts = Object.keys(RESORT_COORDINATES) as (keyof typeof RESORT_COORDINATES)[];
  const weatherData: Partial<ResortWeatherData> = {};

  // Fetch weather data for each resort with delay between requests
  for (const resort of resorts) {
    try {
      // Add delay between requests to avoid rate limiting
      if (Object.keys(weatherData).length > 0) {
        await delay(1000); // 1 second delay between requests
      }
      
      const data = await getResortWeather(resort);
      weatherData[resort] = data;
      
    } catch (error) {
      console.error(`Error fetching weather for ${resort}:`, error);
      // If we have cached data for this resort, use it as fallback
      if (weatherCache?.data[resort]) {
        console.log(`Using cached data for ${resort}`);
        weatherData[resort] = weatherCache.data[resort];
      }
    }
  }

  // Update cache with new data
  weatherCache = {
    data: weatherData as ResortWeatherData,
    timestamp: Date.now()
  };

  return weatherData as ResortWeatherData;
} 