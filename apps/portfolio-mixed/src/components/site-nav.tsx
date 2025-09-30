"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button as UiButton } from "@haziq/ui";

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
          <UiButton
            key={item.href}
            as={Link}
            href={item.href}
            variant="ghost"
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              active
                ? "bg-primary/15 text-foreground shadow-soft-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.label}
          </UiButton>
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
