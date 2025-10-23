"use client";

import { useEffect, useState } from "react";

// Hook: returns progress percentage (0-100) for the main article/content
export default function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Priority selector: .prose (MDX) > article > main > fallback to full page
      const content =
        document.querySelector('.prose') ||
        document.querySelector('article') ||
        document.querySelector('main');

      if (content) {
        const rect = content.getBoundingClientRect();
        const contentTop = rect.top + window.scrollY;
        const contentHeight = rect.height;
        const windowHeight = window.innerHeight;

        const scrollPosition = window.scrollY + windowHeight;
        const contentStart = contentTop;
        const contentEnd = contentTop + contentHeight;

        // totalScrollable is the distance the bottom of the viewport must move
        // from the moment the content enters the viewport to when its bottom reaches the viewport bottom
        const totalScrollable = contentEnd - contentStart - windowHeight;
        const scrolled = scrollPosition - contentStart;

        const calculated = totalScrollable > 0 ? (scrolled / totalScrollable) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, calculated)));
      } else {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const calculated = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, calculated)));
      }
    };

    const timeoutId = setTimeout(updateProgress, 100);
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return progress;
}
