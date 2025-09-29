"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Keep a minimal local prop type to avoid depending on internal types
// from `next-themes` that may not be present in every version.
type LocalThemeProviderProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export function ThemeProvider({ children, ...props }: LocalThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem storageKey="portfolio-mixed-theme" {...props}>
      {children}
    </NextThemesProvider>
  );
}