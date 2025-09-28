import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps extends ComponentPropsWithoutRef<"div"> {
  src: string;
  alt: string;
  label: string;
}

export function TechBadge({ src, alt, label, className, ...props }: TechBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 via-background/40 to-primary/10 px-4 py-3 shadow-lg shadow-black/5",
        className,
      )}
      {...props}
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shadow-inner shadow-primary/40">
        <Image src={src} alt={alt} width={28} height={28} />
      </span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}
