'use client';

import { useEffect, useRef } from 'react';

interface HourData {
  time: string;
  value: number;
  label: string;
}

interface WeatherTrendProps {
  data: HourData[];
  title: string;
  formatValue: (value: number) => string;
  currentHour: number;
  scrollRef?: React.RefObject<HTMLDivElement>;
  isScrollable?: boolean;
}

export default function WeatherTrend({ 
  data, 
  title, 
  formatValue, 
  currentHour,
  scrollRef,
  isScrollable = true
}: WeatherTrendProps) {
  const localScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only calculate and set scroll position for Temperature Trend
    if (isScrollable && title === "Temperature Trend") {
      const container = scrollRef?.current;
      if (!container) return;
      
      // Find the index of the current hour in the data
      const currentIndex = data.findIndex(hour => {
        const hourNum = parseInt(hour.label.replace(/[^0-9]/g, ''));
        const isPM = hour.label.toLowerCase().includes('pm');
        
        // Convert 12-hour format to 24-hour format for comparison
        let displayHour = hourNum;
        if (isPM && hourNum !== 12) {
          displayHour = hourNum + 12;
        } else if (!isPM && hourNum === 12) {
          displayHour = 0;
        }
        
        return displayHour === currentHour;
      });

      if (currentIndex !== -1) {
        // Calculate the total width of all items up to current hour
        const itemWidth = 64; // min-w-[4rem] = 4rem = 64px
        const gapWidth = 16; // gap-4 = 1rem = 16px
        const marginWidth = 4; // m-0.5 = 0.5rem = 4px on each side, so 8px total per item
        const totalItemWidth = itemWidth + gapWidth + marginWidth;
        
        // Calculate the scroll position to center the current hour
        const scrollPosition = (currentIndex * totalItemWidth) - (container.clientWidth / 2) + (itemWidth / 2);
        
        // Ensure we don't scroll past the start or end
        const maxScroll = container.scrollWidth - container.clientWidth;
        const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
        
        container.scrollTo({
          left: finalScrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [data, currentHour, title, scrollRef, isScrollable]);

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div 
        ref={title === "Temperature Trend" ? scrollRef : localScrollRef}
        className={`flex overflow-x-scroll ${!isScrollable ? 'no-scrollbar' : ''} pb-2 gap-4`}
        onScroll={(e) => {
          // Only sync scroll from Temperature Trend to Snowfall
          if (isScrollable && scrollRef?.current && e.currentTarget === scrollRef.current) {
            const snowfallContainer = e.currentTarget.parentElement?.nextElementSibling?.querySelector('div[class*="overflow-x"]');
            if (snowfallContainer) {
              (snowfallContainer as HTMLElement).scrollLeft = e.currentTarget.scrollLeft;
            }
          }
        }}
      >
        {data.map((hour, index) => {
          const hourNum = parseInt(hour.label.replace(/[^0-9]/g, ''));
          const isPM = hour.label.toLowerCase().includes('pm');
          
          // Convert to 24-hour format for comparison
          let displayHour = hourNum;
          if (isPM && hourNum !== 12) {
            displayHour = hourNum + 12;
          } else if (!isPM && hourNum === 12) {
            displayHour = 0;
          }

          const isCurrentHour = displayHour === currentHour;

          return (
            <div 
              key={index} 
              className={`text-center min-w-[4rem] rounded-lg p-2 m-0.5 ${
                isCurrentHour ? 'bg-blue-100 ring-2 ring-blue-500' : 
                title === "Snowfall Forecast" && hour.value > 0.05 ? 'bg-green-50 ring-2 ring-green-500' : ''
              }`}
              onMouseEnter={() => {
                if (title === "Snowfall Forecast") {
                  console.log(`${hour.label} snowfall:`, {
                    value: hour.value,
                    formattedValue: formatValue(hour.value)
                  });
                }
              }}
            >
              <p className={`text-xs whitespace-nowrap ${
                isCurrentHour ? 'text-blue-700 font-medium' : 
                title === "Snowfall Forecast" && hour.value > 0.05 ? 'text-green-600' : 'text-gray-500'
              } mb-1`}>
                {hour.label}
              </p>
              <p className={`font-semibold ${
                isCurrentHour ? 'text-blue-700' : 
                title === "Snowfall Forecast" && hour.value > 0.05 ? 'text-green-600' : 'text-gray-700'
              }`}>
                {formatValue(hour.value)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
} 