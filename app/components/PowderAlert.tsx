'use client';

import Link from 'next/link';
import { ResortWeatherData } from '../types/weather';

interface PowderAlertProps {
  weatherData: ResortWeatherData;
}

export default function PowderAlert({ weatherData }: PowderAlertProps) {
  // Check if any resort has significant snow in the next 24 hours
  const resortsWithSnow = Object.entries(weatherData).filter(([_, weather]) => {
    // Calculate 24-hour total snowfall (in inches)
    const snow24h = Math.round(
      weather.hourly.snowfall
        .slice(0, 24)
        .reduce((sum: number, val: number) => sum + val, 0) / 25.4 * 10
    ) / 10;
    
    return snow24h >= 10.00;
  });

  // If no resorts have significant snow, don't show the alert
  if (resortsWithSnow.length === 0) return null;

  // Get the number of resorts reporting snow
  const snowyResortCount = resortsWithSnow.length;

  return (
    <Link href="/weather" className="block">
      <div className="powder-alert-gradient relative z-10 py-3 text-white text-center cursor-pointer hover:brightness-110 transition-all">
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl animate-pulsate">❄</span>
          <p className="text-lg font-semibold tracking-wide">
            Powder Alert! {snowyResortCount} {snowyResortCount === 1 ? 'resort' : 'resorts'} expecting 10"+ in the next 24 hours.{' '}
            <span className="underline underline-offset-2">Click for details</span>
          </p>
          <span className="text-3xl animate-pulsate" style={{ animationDelay: '0.4s' }}>❄</span>
        </div>
      </div>
    </Link>
  );
} 