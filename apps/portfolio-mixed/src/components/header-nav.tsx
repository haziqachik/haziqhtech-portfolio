"use client";
import React from "react";
import Link from "next/link";
import { Button as UiButton } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { DesktopNav, type NavLinkItem } from "@/components/site-nav";

const navLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function HeaderNav() {
  const [open, setOpen] = React.useState(false);

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
            <SheetContent className="w-80 p-6">
              <div className="flex h-full flex-col">
                <SheetHeader className="text-left">
                  <div className="flex items-center justify-between">
                    <SheetTitle>Menu</SheetTitle>
                    {/* Theme toggle placed inside sheet header for mobile */}
                    <ModeToggle />
                  </div>
                </SheetHeader>

                <nav className="mt-8 flex flex-1 flex-col space-y-1">
                  {navLinks.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
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
  );
}

export default HeaderNav;
