import colors from "tailwindcss/colors";

const sharedPreset = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#2563eb",
          foreground: "#ffffff",
        },
        slate: colors.slate,
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      maxWidth: {
        content: "64rem",
      },
    },
  },
};

export default sharedPreset;
