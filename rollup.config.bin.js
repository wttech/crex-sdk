import typescript from 'rollup-plugin-typescript';
import { uglify } from "rollup-plugin-uglify";
import multi from '@rollup/plugin-multi-entry';

export default {
	preserveModules: true,
	input: [
		'src/bin/ce.ts',
		'src/bin/ce-create.ts'
	],
	output: {
		dir: 'dist/bin'
	},
	banner: '#!/usr/bin/env node',
	plugins: [
		typescript({lib: ["es5", "es6"], target: "es5"}),
		multi()
	]
}