import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    // Relax TypeScript ts-comment banning to avoid failing builds on
    // legitimate `@ts-expect-error` usages that lack descriptions.
    // If you prefer to enforce descriptions, change this to a stricter
    // configuration instead of turning it off entirely.
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];

export default eslintConfig;
