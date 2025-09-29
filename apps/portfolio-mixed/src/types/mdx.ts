/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react";

// MDX components can have varying props signatures. Use `any` here
// to keep the mapping flexible; we can tighten these types later.
export type MDXComponents = Record<string, ComponentType<any>>;
