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

interface CurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
  precipitation: number;
  time: string;
  interval: number;
  weather_code: number;
}

interface HourlyWeather {
  temperature: number[];
  snowfall: number[];
  time: string[];
  precipitation: number[];
}

interface DailyWeather {
  date: string[];
  snowfall: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
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

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000;

// In-memory cache
let weatherCache: WeatherCache | null = null;

// Helper function to add delay between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to retry failed requests with exponential backoff
async function fetchWithRetry(url: string, maxRetries = 3, initialDelayMs = 500): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Add delay between attempts, increasing with each retry
      if (attempt > 0) {
        const delayTime = initialDelayMs * Math.pow(2, attempt - 1);
        await delay(delayTime);
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
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
    startDate.setDate(today.getDate() - 3); // Get 3 days before today
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 3); // Get 3 days after today

    // Format dates for API
    const start_date = startDate.toISOString().split('T')[0];
    const end_date = endDate.toISOString().split('T')[0];

    // Optimized API request with fewer parameters and data points
    const url = `${BASE_URL}/forecast?` +
      `latitude=${coords.lat}&longitude=${coords.lon}&` +
      `current=temperature_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code&` +
      `hourly=temperature_2m,snowfall,precipitation&` +
      `daily=snowfall_sum,temperature_2m_max,temperature_2m_min&` +
      `timezone=America/Denver&` +
      `start_date=${start_date}&` +
      `end_date=${end_date}&` +
      `precipitation_unit=inch&` +
      `snowfall_unit=inch`;

    const response = await fetchWithRetry(url);
    const data = await response.json();

    console.log(`Raw weather data for ${resortName}:`, {
      current: data.current,
      hourly: {
        snowfall: data.hourly.snowfall.slice(0, 24),
        time: data.hourly.time.slice(0, 24)
      },
      daily: {
        snowfall_sum: data.daily.snowfall_sum,
        time: data.daily.time
      }
    });

    // Process and return only the data we need
    return {
      current: {
        temperature_2m: data.current.temperature_2m,
        apparent_temperature: data.current.apparent_temperature,
        wind_speed_10m: data.current.wind_speed_10m,
        precipitation: data.current.precipitation,
        time: data.current.time,
        interval: data.current.interval,
        weather_code: data.current.weather_code
      },
      hourly: {
        temperature: data.hourly.temperature_2m, // Get all hours
        snowfall: data.hourly.snowfall, // Get all hours
        time: data.hourly.time, // Get all hours
        precipitation: data.hourly.precipitation // Get all hours
      },
      daily: {
        date: data.daily.time,
        snowfall: data.daily.snowfall_sum,
        temperature_2m_max: data.daily.temperature_2m_max,
        temperature_2m_min: data.daily.temperature_2m_min
      }
    };
  } catch (error) {
    console.error(`Error fetching weather for ${resortName}:`, error);
    throw error;
  }
}

// Batch size for parallel requests
const BATCH_SIZE = 3;

export async function getAllResortsWeather(): Promise<ResortWeatherData> {
  // Check cache first
  if (weatherCache && (Date.now() - weatherCache.timestamp) < CACHE_DURATION) {
    console.log('Returning cached weather data');
    return weatherCache.data;
  }

  const resorts = Object.keys(RESORT_COORDINATES) as (keyof typeof RESORT_COORDINATES)[];
  
  try {
    // Process resorts in batches to avoid overwhelming the API
    const weatherData = resorts.reduce((acc, resort) => {
      acc[resort] = null as any; // Initialize with null, will be filled in batches
      return acc;
    }, {} as ResortWeatherData);
    
    for (let i = 0; i < resorts.length; i += BATCH_SIZE) {
      const batch = resorts.slice(i, i + BATCH_SIZE);
      const batchPromises = batch.map(async (resort, index) => {
        // Small delay between requests in the same batch
        if (index > 0) {
          await delay(100);
        }
        return getResortWeather(resort);
      });

      const batchResults = await Promise.all(batchPromises);
      
      // Add batch results to weatherData
      batch.forEach((resort, index) => {
        weatherData[resort] = batchResults[index];
      });

      // Add delay between batches
      if (i + BATCH_SIZE < resorts.length) {
        await delay(300);
      }
    }

    // Update cache with new data
    weatherCache = {
      data: weatherData,
      timestamp: Date.now()
    };

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // If we have cached data, use it as fallback
    if (weatherCache?.data) {
      console.log('Using cached data as fallback');
      return weatherCache.data;
    }
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