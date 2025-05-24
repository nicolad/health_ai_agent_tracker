import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.tsx", "**/*.ts"],
    plugins: { react: require("eslint-plugin-react") },
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: { "react/jsx-key": "error" }
  }
];
