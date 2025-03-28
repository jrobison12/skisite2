export interface WeatherData {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature: number[];
    snowfall: number[];
  };
  daily: {
    date: string[];
    snowfall: number[];
  };
}

export interface ResortWeatherData {
  Snowbird: WeatherData;
  Brighton: WeatherData;
  Alta: WeatherData;
} 