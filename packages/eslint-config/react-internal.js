/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ["./base.js"],
	globals: {
		React: true,
		JSX: true,
	},
	env: {
		browser: true,
	},
	ignorePatterns: [
		// Ignore dotfiles
		".*.js",
		"node_modules/",
		"dist/",
	],
	overrides: [
		// Force ESLint to detect .tsx files
		{ files: ["*.js?(x)", "*.ts?(x)"] },
	],
};
