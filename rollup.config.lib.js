import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { uglify } from "rollup-plugin-uglify";

export default {
	input: './src/lib/index.ts',
	output: {
		file: './dist/lib/crex.js',
		format: 'cjs'
	},
	plugins: [
		typescript(),
		resolve({
			mainFields: ['browser'],
		}),
	]
}