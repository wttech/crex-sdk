import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import tslint from "rollup-plugin-tslint";

export default {
	input: './src/lib/index.ts',
	output: {
		file: './dist/lib/crex.js',
		format: 'cjs'
	},
	plugins: [
		tslint(),
		typescript(),
		resolve({
			preferBuiltins: true
		}),
		commonjs({
			include: /node_modules/
		}),
		json(),
	]
}