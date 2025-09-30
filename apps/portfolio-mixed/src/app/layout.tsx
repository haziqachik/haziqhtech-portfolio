import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button as UiButton } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { DesktopNav, type NavLinkItem } from "@/components/site-nav";
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

const navLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

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
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background antialiased`}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 md:backdrop-blur">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
                <Link href="/" className="text-lg font-semibold tracking-tight">
                  Haziq Asyraaf
                </Link>
                <nav className="hidden items-center gap-2 md:flex">
                  <DesktopNav links={navLinks} />
                </nav>
                <div className="flex items-center gap-2">
                  <ModeToggle />
                  <Sheet>
                    <SheetTrigger asChild>
                      <UiButton variant="outline" size="icon" className="md:hidden">
                        <span className="sr-only">Open navigation menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-5 w-5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                      </UiButton>
                    </SheetTrigger>
                    <SheetContent className="w-80 p-6">
                      <div className="flex flex-col h-full">
                        <SheetHeader className="text-left">
                          <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        
                        <nav className="flex flex-col space-y-1 mt-8 flex-1">
                          {navLinks.map((item) => (
                            <SheetClose asChild key={item.href}>
                              <Link
                                href={item.href}
                                className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </nav>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </header>
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
