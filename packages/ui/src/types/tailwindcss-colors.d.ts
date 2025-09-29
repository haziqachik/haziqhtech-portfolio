declare module "tailwindcss/colors" {
  const colors: Record<string, any>;
  export default colors;
}
declare module "tailwindcss/colors" {
  // Minimal ambient typing for build time. Replace `any` with concrete types if desired.
  const colors: any;
  export default colors;
}

declare module "tailwindcss" {
  // Minimal stub for tailwind Config type used in some presets.
  export type Config = any;
  const tailwind: any;
  export default tailwind;
}
