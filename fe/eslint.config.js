import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import solidPlugin from "eslint-plugin-solid";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      solid: solidPlugin
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    rules: {
      ...solidPlugin.configs.typescript.rules,
      "solid/reactivity": "warn",
      "solid/no-destructure": "warn",
      "solid/jsx-no-undef": "error"
    }
  },
);
