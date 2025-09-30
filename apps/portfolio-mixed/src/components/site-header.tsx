"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button as UiButton } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { DesktopNav, type NavLinkItem } from "@/components/site-nav";

interface SiteHeaderProps {
  navLinks: NavLinkItem[];
}

export function SiteHeader({ navLinks }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 md:backdrop-blur">
      {/* Hide header on mobile when sheet is open, always show on desktop (md and up) */}
      <div className={`mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 ${isOpen ? "hidden md:flex" : "flex"}`}>
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Haziq Asyraaf
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <DesktopNav links={navLinks} />
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle className="hidden md:flex" />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                  <SheetDescription>
                    Navigate to different sections of the portfolio
                  </SheetDescription>
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

                {/* Theme toggle inside navigation panel */}
                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
