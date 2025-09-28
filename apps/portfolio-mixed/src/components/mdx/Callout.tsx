import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const VARIANT_STYLES: Record<string, string> = {
  note: "border-sky-500/40 bg-sky-500/10 text-sky-100",
  tip: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-100",
  impact: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-100",
};

interface CalloutProps {
  title?: string;
  variant?: keyof typeof VARIANT_STYLES;
  children: ReactNode;
}

export function Callout({ title, variant = "note", children }: CalloutProps) {
  const variantClasses = VARIANT_STYLES[variant] ?? VARIANT_STYLES.note;

  return (
    <aside
      className={cn(
        "callout relative overflow-hidden rounded-2xl border px-6 py-5 shadow-lg shadow-black/10",
        variantClasses,
      )}
    >
      {title ? <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">{title}</h3> : null}
      <div className="space-y-3 text-sm leading-relaxed text-white/90">{children}</div>
    </aside>
  );
}
