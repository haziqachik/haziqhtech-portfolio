"use client";
import React from "react";
import Link from "next/link";
import { Button as UiButton } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { DesktopNav, type NavLinkItem } from "@/components/site-nav";
// import { getProfile } from "@/lib/content"; // Available for future use

const navLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

// Icon data for premium nav
const navIcons = {
  Home: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
    </svg>
  ),
  Projects: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
    </svg>
  ),
  Timeline: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  ),
  Blog: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v4a2 2 0 01-2 2H4.5a1.5 1.5 0 010-3H11V7a2 2 0 012-2z" />
    </svg>
  ),
  Resume: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  ),
  Contact: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  ),
};

export function HeaderNav() {
  const [open, setOpen] = React.useState(false);
  // const profile = getProfile(); // Available for future use

  return (
    <header
      className={[
        "sticky top-0 z-30 border-b border-border/60 bg-background/70 md:backdrop-blur transition-opacity duration-200",
        open ? "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto" : "opacity-100",
      ].join(" ")}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Haziq Asyraaf
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <DesktopNav links={navLinks} />
        </nav>

        <div className="flex items-center gap-2">
          {/* Keep theme toggle visible on desktop header; move it into sheet for mobile */}
          <div className="hidden md:block">
            <ModeToggle />
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
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
            <SheetContent className="w-80 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-0 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
              <div className="flex h-full flex-col">
                {/* Premium Header with Avatar */}
                <div className="flex items-center justify-between border-b border-slate-200/50 bg-white/60 px-6 py-4 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/60">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-sm">
                      H
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">Haziq Asyraaf</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Portfolio Navigation</p>
                    </div>
                  </div>
                  <ModeToggle />
                </div>

                {/* Status Badge */}
                <div className="px-6 pt-4">
                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for projects
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-6">
                  <div className="space-y-1">
                    {navLinks.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-white/70 hover:text-slate-900 hover:shadow-sm dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-blue-900/50 dark:group-hover:text-blue-400">
                            {navIcons[item.label as keyof typeof navIcons]}
                          </div>
                          <span className="flex-1">{item.label}</span>
                          <div className="text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
                            {item.label === "Home" ? "Active" : ""}
                          </div>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </nav>

                {/* Footer CTA */}
                <div className="border-t border-slate-200/50 bg-white/40 px-6 py-4 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/40">
                  <div className="text-center">
                    <p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-400">Ready to collaborate?</p>
                    <SheetClose asChild>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Get In Touch
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default HeaderNav;
