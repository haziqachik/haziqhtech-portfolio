import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
// site-nav types no longer used here; navigation handled in HeaderNav
import HeaderNav from "@/components/header-nav";
import { getProfile } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haziqhtech.sg";

export const metadata: Metadata = {
  title: "Haziq Asyraaf | Portfolio",
  description: "IT Professional | Data Analyst | Cybersecurity Enthusiast",
  metadataBase: new URL(baseUrl),
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  openGraph: {
    title: "Haziq Asyraaf | Portfolio",
    description: "IT Professional | Data Analyst | Cybersecurity Enthusiast",
    url: baseUrl,
    siteName: "HaziqhTech",
    images: ["/api/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haziq Asyraaf | Portfolio",
    description: "IT Professional | Data Analyst | Cybersecurity Enthusiast",
    images: ["/api/og"],
  },
};

// Navigation links are now defined inside HeaderNav

function formatLabel(label: string) {
  if (label.length <= 1) return label.toUpperCase();
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = getProfile();
  const socials = Object.entries(profile.socials ?? {}).filter(([, value]) => Boolean(value));
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background antialiased`}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <HeaderNav />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:py-16">{children}</main>
            <footer className="border-t border-border/80 bg-background/85 md:backdrop-blur">
              <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                <p className="flex flex-wrap items-center gap-2">
                  <span>© {currentYear} HaziqhTech</span>
                  <span className="hidden text-muted-foreground md:inline">|</span>
                  <Link
                    href={`mailto:${profile.email}`}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {profile.email}
                  </Link>
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {socials.map(([key, value]) => (
                    <Link
                      key={key}
                      href={value as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-foreground"
                    >
                      {formatLabel(key)}
                    </Link>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
