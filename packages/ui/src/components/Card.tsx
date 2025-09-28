import { createElement, type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "../lib/cn";

type CardProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Card<T extends ElementType = "div">({ as, className, ...props }: CardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return createElement(Component, {
    className: cn(
      "rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur",
      className,
    ),
    ...props,
  });
}
