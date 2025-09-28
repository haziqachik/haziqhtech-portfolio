import { createElement, type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "../lib/cn";

const variantStyles = {
  primary: "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 hover:bg-blue-500",
  outline: "border border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600",
  ghost: "text-slate-500 hover:text-blue-500",
} as const;

type Variant = keyof typeof variantStyles;

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  className,
  ...props
}: ButtonProps<T>) {
  const Component = (as ?? "button") as ElementType;
  const combinedClassName = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
    variantStyles[variant],
    className,
  );

  const finalProps: Record<string, unknown> = {
    className: combinedClassName,
    ...props,
  };

  if (Component === "button" && finalProps.type == null) {
    finalProps.type = "button";
  }

  return createElement(Component, finalProps);
}
