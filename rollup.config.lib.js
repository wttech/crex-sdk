import typescript from 'rollup-plugin-typescript';
import { uglify } from "rollup-plugin-uglify";

export default {
	input: './src/lib/index.ts',
	output: {
		file: './dist/lib/crex.js',
		format: 'cjs'
	},
	plugins: [
		typescript({lib: ["es5", "es6"], target: "es5"}),
		uglify()
	]
}