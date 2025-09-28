import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTAButtonProps {
  href: string;
  children: string;
}

export function CTAButton({ href, children }: CTAButtonProps) {
  return (
    <Button
      asChild
      size="lg"
      className="mt-6 w-full rounded-full bg-primary px-6 py-6 text-base font-semibold shadow-primary/30 transition hover:translate-y-[-2px] hover:shadow-xl md:w-auto"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
