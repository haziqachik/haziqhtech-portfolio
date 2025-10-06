"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";



import { cn } from "@/lib/utils";

export interface NavLinkItem {
  href: string;
  label: string;
}

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav({ links }: { links: NavLinkItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
              active
                ? "bg-primary/15 text-foreground shadow-soft-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function MobileNavLink({ item }: { item: NavLinkItem }) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-muted",
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:text-foreground",
      )}
    >
      {item.label}
    </Link>
  );
}
