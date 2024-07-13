/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "./base.js",
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
  ],
  globals: {
    React: true,
    JSX: true,
  },
  plugins: ["only-warn"],
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  rules: {
    "turbo/no-undeclared-env-vars": ["error", {
      allowList: ["NEXT_PUBLIC_"]
    }]
  }
};
