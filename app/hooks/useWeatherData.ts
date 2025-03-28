'use client';

import { useState, useEffect } from 'react';
import { getAllResortsWeather, type ResortWeatherData } from '../services/weather';

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000;

// Client-side cache
let clientCache: { data: ResortWeatherData; timestamp: number } | null = null;

export function useWeatherData() {
  const [weatherData, setWeatherData] = useState<ResortWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchWeatherData() {
      try {
        // Check client-side cache first
        if (clientCache && (Date.now() - clientCache.timestamp) < CACHE_DURATION) {
          if (isMounted) {
            setWeatherData(clientCache.data);
            setIsLoading(false);
          }
          return;
        }

        // If no cache or expired, fetch new data
        const data = await getAllResortsWeather();
        
        // Update client-side cache
        clientCache = {
          data,
          timestamp: Date.now()
        };

        if (isMounted) {
          setWeatherData(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setIsLoading(false);
        }
      }
    }

    fetchWeatherData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { weatherData, isLoading, error };
} 