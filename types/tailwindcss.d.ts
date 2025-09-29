declare module "tailwindcss" {
  // Minimal subset used by the config files in this repo
  export type Config = Record<string, any>;
  const _default: Config;
  export default _default;
}

declare module "tailwindcss/colors" {
  const colors: Record<string, any>;
  export default colors;
}
