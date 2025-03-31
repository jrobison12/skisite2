'use client';

import { useEffect, useRef } from 'react';

interface DayData {
  date: Date;
  amount: number;
  isToday: boolean;
  isPast: boolean;
  dayLabel: string;
  daysFromToday: number;
}

interface SnowfallSpreadProps {
  days: DayData[];
}

export default function SnowfallSpread({ days }: SnowfallSpreadProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const todayIndex = days.findIndex(day => day.isToday);
      
      if (todayIndex !== -1) {
        // Calculate the total width of all items up to today
        const itemWidth = 64; // min-w-[4rem] = 4rem = 64px
        const gapWidth = 16; // gap-4 = 1rem = 16px
        const totalItemWidth = itemWidth + gapWidth;
        
        // Calculate the scroll position to center today's date
        const scrollPosition = (todayIndex * totalItemWidth) - (container.clientWidth / 2) + (itemWidth / 2);
        
        // Ensure we don't scroll past the start or end
        const maxScroll = container.scrollWidth - container.clientWidth;
        const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
        
        container.scrollTo({
          left: finalScrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [days]);

  return (
    <div className="flex overflow-x-auto pb-2 gap-4" ref={scrollContainerRef}>
      {days.map((day, index) => {
        const hasSnowfall = day.amount > 0.05;
        return (
          <div 
            key={index} 
            className={`text-center min-w-[4rem] p-2 rounded-lg ${
              day.isToday 
                ? 'bg-blue-100 border-2 border-blue-500' 
                : hasSnowfall
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-gray-100'
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">{day.dayLabel}</p>
            <p className={`font-semibold ${
              day.isToday 
                ? 'text-blue-600' 
                : hasSnowfall
                  ? 'text-green-600'
                  : 'text-gray-600'
            }`}>
              {Math.round(day.amount * 10) / 10}″
            </p>
          </div>
        );
      })}
    </div>
  );
} 