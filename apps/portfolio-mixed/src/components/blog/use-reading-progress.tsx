"use client";

import { useEffect, useState } from "react";

// Generate or retrieve anonymous user ID
function getUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem('readingProgressUserId');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('readingProgressUserId', userId);
  }
  return userId;
}

// Hook: returns progress percentage (0-100) for the main article/content
// Now with persistent storage - saves to DB and resumes on return
export default function useReadingProgress(postSlug?: string) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    if (!postSlug) {
      setIsLoaded(true);
      return;
    }

    const userId = getUserId();
    
    // Fetch saved progress from database
    fetch(`/api/blog/progress?slug=${postSlug}&userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.progress > 0) {
          setProgress(data.progress);
          // Optionally scroll to saved position
          if (data.lastPosition > 0) {
            setTimeout(() => {
              window.scrollTo({ top: data.lastPosition, behavior: 'smooth' });
            }, 300);
          }
        }
        setIsLoaded(true);
      })
      .catch(err => {
        console.error('Failed to load reading progress:', err);
        setIsLoaded(true);
      });
  }, [postSlug]);

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

        // For very short content (less than viewport height), use simple visibility progress
        if (contentHeight < windowHeight) {
          // Content is shorter than viewport - calculate based on what's visible
          const viewportTop = window.scrollY;
          const viewportBottom = viewportTop + windowHeight;
          const contentBottom = contentTop + contentHeight;
          
          // Start showing progress when content enters viewport
          if (contentTop < viewportBottom && contentBottom > viewportTop) {
            // Calculate how much of the content is visible
            const visibleTop = Math.max(contentTop, viewportTop);
            const visibleBottom = Math.min(contentBottom, viewportBottom);
            const visibleHeight = visibleBottom - visibleTop;
            const visiblePercentage = (visibleHeight / contentHeight) * 100;
            
            setProgress(Math.min(100, Math.max(0, visiblePercentage)));
          } else if (contentBottom <= viewportTop) {
            // Content is above viewport - fully read
            setProgress(100);
          } else {
            // Content is below viewport - not yet read
            setProgress(0);
          }
        } else {
          // Normal long content - use scroll-based calculation
          const scrollPosition = window.scrollY + windowHeight;
          const contentStart = contentTop;
          const contentEnd = contentTop + contentHeight;

          const totalScrollable = contentEnd - contentStart - windowHeight;
          const scrolled = scrollPosition - contentStart;

          const calculated = totalScrollable > 0 ? (scrolled / totalScrollable) * 100 : 0;
          setProgress(Math.min(100, Math.max(0, calculated)));
        }
      } else {
        // Fallback to full page calculation
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

  // Auto-save progress to database (debounced)
  useEffect(() => {
    if (!postSlug || !isLoaded) return;

    const userId = getUserId();
    const saveProgress = setTimeout(() => {
      // Only save if progress is meaningful (> 0%)
      if (progress > 0) {
        fetch('/api/blog/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: postSlug,
            userId,
            progress: Math.round(progress),
            lastPosition: window.scrollY,
          }),
        }).catch(err => console.error('Failed to save progress:', err));
      }
    }, 2000); // Debounce: save 2 seconds after user stops scrolling

    return () => clearTimeout(saveProgress);
  }, [progress, postSlug, isLoaded]);

  return progress;
}
