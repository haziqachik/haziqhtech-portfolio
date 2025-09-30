import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetTitle } from "@/components/ui/sheet";
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
                      <UiButton variant="outline" size="icon" className="md:hidden border-border/60 bg-background/50 backdrop-blur hover:bg-muted/50 hover:border-primary/40 transition-all duration-200">
                        <span className="sr-only">Open navigation menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-5 w-5 transition-transform duration-200 hover:scale-110"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                      </UiButton>
                    </SheetTrigger>
                    <SheetContent className="w-80 p-0 bg-gradient-to-b from-background via-background/95 to-primary/5 backdrop-blur-xl border-l border-primary/10">
                      <div className="flex flex-col h-full relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/30 to-transparent rounded-full blur-2xl translate-y-12 -translate-x-12"></div>
                        
                        {/* Enhanced Header Section */}
                        <div className="relative px-6 py-8 pb-6">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25 border border-primary/20">
                                <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                                  <span className="text-primary-foreground font-bold text-base tracking-wide">H</span>
                                </div>
                              </div>
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
                            </div>
                            <div className="flex-1">
                              <SheetTitle className="text-xl font-bold tracking-tight text-foreground mb-1">Haziq Asyraaf</SheetTitle>
                              <p className="text-sm text-muted-foreground font-medium">Portfolio Navigation</p>
                              <div className="flex items-center gap-1 mt-1">
                                <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                                <p className="text-xs text-primary font-medium">Available</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced Navigation Links */}
                        <nav className="flex flex-col px-4 flex-1 space-y-2 relative z-10">
                          {navLinks.map((item, index) => {
                            const iconData = [
                              { svg: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", color: "text-blue-500", bg: "bg-blue-50" },
                              { svg: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", color: "text-purple-500", bg: "bg-purple-50" },
                              { svg: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "text-green-500", bg: "bg-green-50" },
                              { svg: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", color: "text-orange-500", bg: "bg-orange-50" },
                              { svg: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "text-indigo-500", bg: "bg-indigo-50" },
                              { svg: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", color: "text-pink-500", bg: "bg-pink-50" }
                            ];
                            const icon = iconData[index] || iconData[0];
                            
                            return (
                              <SheetClose asChild key={item.href}>
                                <Link
                                  href={item.href}
                                  className="group relative flex items-center px-5 py-4 text-sm font-medium rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/8 hover:to-primary/4 hover:scale-[1.01] hover:shadow-lg hover:shadow-primary/10 active:scale-[0.98] border border-transparent hover:border-primary/15"
                                >
                                  {/* Enhanced Icon Container */}
                                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${icon.bg} group-hover:bg-primary/10 transition-all duration-300 mr-4 group-hover:scale-110 group-hover:-rotate-2`}>
                                    <svg className={`w-5 h-5 ${icon.color} group-hover:text-primary transition-colors duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon.svg} />
                                    </svg>
                                  </div>
                                  
                                  {/* Enhanced Text with Badge */}
                                  <div className="flex-1 flex items-center justify-between">
                                    <span className="text-foreground group-hover:text-primary transition-colors duration-300 font-medium">
                                      {item.label}
                                    </span>
                                    {index === 0 && (
                                      <span className="px-2 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                                        Active
                                      </span>
                                    )}
                                  </div>
                                  
                                  {/* Animated Arrow */}
                                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 ml-2">
                                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                  
                                  {/* Enhanced Hover Effect */}
                                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/3 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </Link>
                              </SheetClose>
                            );
                          })}
                        </nav>

                        {/* Premium Footer */}
                        <div className="relative px-6 py-6 mt-4">
                          <div className="relative bg-gradient-to-br from-primary/8 via-primary/5 to-transparent rounded-3xl p-5 border border-primary/15 backdrop-blur-sm shadow-lg">
                            {/* Status Indicator */}
                            <div className="flex items-center justify-center gap-3 mb-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-semibold text-green-600">Available for projects</span>
                              </div>
                            </div>
                            
                            {/* Enhanced CTA */}
                            <div className="space-y-3">
                              <div className="text-center">
                                <p className="text-sm font-medium text-foreground mb-1">Ready to collaborate?</p>
                                <p className="text-xs text-muted-foreground">Let&apos;s build something amazing together</p>
                              </div>
                              
                              <SheetClose asChild>
                                <Link href="/contact">
                                  <UiButton className="w-full bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/95 hover:via-primary/90 hover:to-primary/85 text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-400 rounded-2xl font-semibold py-4 hover:scale-[1.02] active:scale-[0.97] relative overflow-hidden group">
                                    {/* Button Background Animation */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    <span className="relative flex items-center justify-center gap-3">
                                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                      </svg>
                                      <span>Start a Conversation</span>
                                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                      </svg>
                                    </span>
                                  </UiButton>
                                </Link>
                              </SheetClose>
                            </div>
                            
                            {/* Footer Branding */}
                            <div className="text-center mt-4 pt-3 border-t border-primary/10">
                              <p className="text-xs text-muted-foreground font-medium">
                                © 2025 • Network Security & Automation Expert
                              </p>
                            </div>
                          </div>
                        </div>
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
