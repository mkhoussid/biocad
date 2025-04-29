/* eslint-disable */

const eslintPluginTs = require('@typescript-eslint/eslint-plugin');
const eslintParserTs = require('@typescript-eslint/parser');
const eslintPluginImportHelpers = require('eslint-plugin-import-helpers');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginReactHooks = require('eslint-plugin-react-hooks');

module.exports = [
	{
		ignores: ['node_modules/**'],
	},
	{
		files: ['**/*.{js,ts,jsx,tsx}'],
		languageOptions: {
			parser: eslintParserTs,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'@typescript-eslint': eslintPluginTs,
			react: eslintPluginReact,
			'react-hooks': eslintPluginReactHooks,
			prettier: eslintPluginPrettier,
			'import-helpers': eslintPluginImportHelpers,
		},
		rules: Object.assign({}, eslintPluginTs.configs.recommended.rules, {
			'@typescript-eslint/no-unused-vars': ['warn'],
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'no-mixed-spaces-and-tabs': 'off',
			'import-helpers/order-imports': [
				'warn',
				{
					newlinesBetween: 'always',
					groups: ['module', ['/^#/'], ['parent', 'sibling', 'index']],
					alphabetize: { order: 'asc', ignoreCase: true },
				},
			],
		}),
	},
];
