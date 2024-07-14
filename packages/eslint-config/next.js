/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/node"),
    "./base.js",
    require.resolve("@vercel/style-guide/eslint/next"),
  ],
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  rules: {
    "import/no-default-export": "off",
    "turbo/no-undeclared-env-vars": [
      "error",
      {
        allowList: ["NEXT_PUBLIC_"],
      },
    ],
  },
};
