"use client";

import { motion } from "framer-motion";
import useReadingProgress from "./use-reading-progress";

interface ReadingProgressProps {
  postSlug?: string;
}

export function ReadingProgress({ postSlug }: ReadingProgressProps) {
  const progress = useReadingProgress(postSlug);

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

// Also export a small componentless helper for other components to read progress
export { default as useReadingProgressHook } from './use-reading-progress';
