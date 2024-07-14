const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ["plugin:@typescript-eslint/recommended", "prettier", "turbo"],
	plugins: ["@typescript-eslint/eslint-plugin"],
	parser: "@typescript-eslint/parser",
	settings: {
		"import/resolver": {
			typescript: {
				project,
			},
		},
	},
	parserOptions: {
		project,
	},
	ignorePatterns: [
		".*.js",
		"*.setup.js",
		"*.config.js",
		".turbo/",
		"dist/",
		"coverage/",
		"node_modules/",
	],
	rules: {
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ ignoreRestSiblings: true },
		],
	},
	overrides: [
		{
			files: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
			extends: [require.resolve("@vercel/style-guide/eslint/vitest")],
		},
	],
};
