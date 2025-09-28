import type { ReactNode } from "react";
import { Callout } from "./Callout";

interface WhyItMattersProps {
  children: ReactNode;
}

export function WhyItMatters({ children }: WhyItMattersProps) {
  return (
    <Callout title="Why it matters" variant="impact">
      <div className="space-y-2 text-sm leading-relaxed text-white/90">
        {children}
      </div>
    </Callout>
  );
}
