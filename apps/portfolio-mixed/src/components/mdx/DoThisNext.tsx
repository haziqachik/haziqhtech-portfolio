import type { ReactNode } from "react";
import { Callout } from "./Callout";

interface DoThisNextProps {
  children: ReactNode;
}

export function DoThisNext({ children }: DoThisNextProps) {
  return (
    <Callout title="Do this next" variant="tip">
      <div className="space-y-2 text-sm leading-relaxed text-white/90">
        {children}
      </div>
    </Callout>
  );
}
