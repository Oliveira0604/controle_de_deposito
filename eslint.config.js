import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "eqeqeq": "error",          // Obriga usar ===
      "prefer-const": "error",    // Obriga usar const quando possível
      "no-var": "error",          // Proíbe o uso de var
    }
  },
]);
