'use client';

import { useState, useEffect } from 'react';
import { getAllResortsWeather, ResortWeatherData } from '../services/weather';

// Client-side cache
let clientCache: { data: ResortWeatherData | null; timestamp: number } = {
  data: null,
  timestamp: 0
};

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export function useWeatherData() {
  const [weatherData, setWeatherData] = useState<ResortWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check client-side cache first
        if (clientCache.data && (Date.now() - clientCache.timestamp) < CACHE_DURATION) {
          setWeatherData(clientCache.data);
          setLoading(false);
          return;
        }

        const data = await getAllResortsWeather();
        
        // Update client-side cache
        clientCache = {
          data,
          timestamp: Date.now()
        };
        
        setWeatherData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { weatherData, loading, error };
} 