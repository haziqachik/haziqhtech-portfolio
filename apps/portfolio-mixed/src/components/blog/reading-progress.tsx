"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Try to find the main article content for more accurate progress
      // Priority: .prose (MDX content) > article > main > fallback to full page
      const content = 
        document.querySelector('.prose') || 
        document.querySelector('article') || 
        document.querySelector('main');
      
      if (content) {
        // Calculate progress based on content position
        const contentRect = content.getBoundingClientRect();
        const contentTop = contentRect.top + window.scrollY;
        const contentHeight = contentRect.height;
        const windowHeight = window.innerHeight;
        
        // Start progress when content enters viewport, reach 100% when fully scrolled
        const scrollPosition = window.scrollY + windowHeight;
        const contentStart = contentTop;
        const contentEnd = contentTop + contentHeight;
        
        // Progress from 0 when content starts entering viewport to 100% when bottom reaches viewport
        const scrolled = scrollPosition - contentStart;
        const totalScrollable = contentEnd - contentStart - windowHeight;
        
        const calculatedProgress = totalScrollable > 0 ? (scrolled / totalScrollable) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, calculatedProgress)));
      } else {
        // Fallback to full page calculation
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const calculatedProgress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, calculatedProgress)));
      }
    };

    // Delay initial calculation to ensure DOM is fully rendered
    const timeoutId = setTimeout(updateProgress, 100);
    
    window.addEventListener("scroll", updateProgress, { passive: true });
    // Add resize listener to recalculate on window resize
    window.addEventListener("resize", updateProgress);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      {/* Fixed progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
        initial={{ scaleX: 0 }}
        style={{ transformOrigin: "left" }}
      >
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Circular progress indicator */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="relative w-14 h-14">
          <svg className="transform -rotate-90 w-full h-full">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
              className="text-primary transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </>
  );
}
