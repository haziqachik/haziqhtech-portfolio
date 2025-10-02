"use client"

import { useEffect } from "react"

interface PageViewTrackerProps {
  pageId: string
  title?: string
}

export function PageViewTracker({ pageId, title }: PageViewTrackerProps) {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageId,
            title: title || document.title,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || null,
          }),
        })
      } catch (error) {
        // Silently fail - analytics shouldn't break the page
        console.debug("Analytics tracking failed:", error)
      }
    }

    // Track page view after a short delay to ensure page is loaded
    const timer = setTimeout(trackPageView, 1000)

    return () => clearTimeout(timer)
  }, [pageId, title])

  // This component renders nothing
  return null
}

export default PageViewTracker