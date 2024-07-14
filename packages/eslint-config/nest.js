/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [require.resolve("@vercel/style-guide/eslint/node"), "./base.js"],
	rules: {
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/consistent-type-imports": "off",
	},
};
