const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve("@vercel/style-guide/eslint/vitest"),
    'turbo',
  ],
  plugins: ['@typescript-eslint/eslint-plugin'],
  parser: '@typescript-eslint/parser',
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  parserOptions: {
    project
  },
  ignorePatterns: [
    '.*.js',
    '*.setup.js',
    '*.config.js',
    '.turbo/',
    'dist/',
    'coverage/',
    'node_modules/',
  ],
};