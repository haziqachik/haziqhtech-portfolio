// avoid importing tailwindcss types here to prevent moduleResolution
// errors during monorepo builds; the runtime import is unchanged.
const config: any = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
