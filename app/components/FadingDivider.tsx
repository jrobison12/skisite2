'use client';

import { useEffect, useState } from 'react';

export default function FadingDivider() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Get scroll position
      const scrollY = window.scrollY;
      
      // Start fading as soon as we scroll
      const fadeStart = 0;
      // Complete fade by 400px of scroll (increased from 200px)
      const fadeEnd = 400;
      
      if (scrollY <= fadeStart) {
        setOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setOpacity(0);
      } else {
        const fadeProgress = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(fadeProgress);
      }
    };

    // Initial check
    handleScroll();

    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="my-32 transition-opacity duration-300" id="fading-divider">
      <div 
        className="w-full h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        style={{ 
          opacity: Math.max(opacity, 0),
          transition: 'opacity 0.3s ease-out'
        }}
      ></div>
    </div>
  );
} 