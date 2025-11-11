import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ✅ Extend Next.js recommended + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ Custom project rules
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // ✅ Turn off unwanted warnings
      "react/no-unescaped-entities": "off", // allow ' and " inside JSX
      "@next/next/no-img-element": "off", // allow <img> instead of <Image />
      "@typescript-eslint/no-unused-vars": "off", // allow unused imports/vars
    },
  },
];

export default eslintConfig;
