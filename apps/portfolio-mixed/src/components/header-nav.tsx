"use client";
import React from "react";
import Link from "next/link";
import { Button as UiButton } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { DesktopNav, type NavLinkItem } from "@/components/site-nav";
import { Home, FolderOpen, Clock, PenTool, FileText, MessageCircle, Menu } from "lucide-react";
// import { getProfile } from "@/lib/content"; // Available for future use

const navLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

// Icon mapping for navigation items - using Lucide icons to match your design
const navIcons = {
  Home: Home,
  Projects: FolderOpen,
  Timeline: Clock,
  Blog: PenTool,
  Resume: FileText,
  Contact: MessageCircle,
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
                <Menu className="h-5 w-5" />
              </UiButton>
            </SheetTrigger>
            <SheetContent className="w-80 bg-white p-0 dark:bg-slate-900">
              <div className="flex h-full flex-col">
                {/* Header with Avatar - matching your screenshot */}
                <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4 dark:border-slate-700">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                    H
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Haziq Asyraaf</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Portfolio Navigation</p>
                  </div>
                  <ModeToggle />
                </div>

                {/* Status Badge - matching your screenshot */}
                <div className="px-6 pt-4">
                  <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Available
                  </div>
                </div>

                {/* Navigation Links - clean style matching your screenshot */}
                <nav className="flex-1 px-6 py-6">
                  <div className="space-y-1">
                    {navLinks.map((item) => {
                      const IconComponent = navIcons[item.label as keyof typeof navIcons];
                      const isActive = item.label === "Home"; // You can make this dynamic later
                      
                      return (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800"
                            }`}
                          >
                            <IconComponent className="h-5 w-5" />
                            <span className="flex-1">{item.label}</span>
                            {isActive && (
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Active</span>
                            )}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>
                </nav>

                {/* Footer Status - matching your screenshot */}
                <div className="border-t border-gray-100 px-6 py-4 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-green-600 dark:text-green-400">Available for projects</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Ready to collaborate?</p>
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
