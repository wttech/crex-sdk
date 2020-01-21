import typescript from '@rollup/plugin-typescript';
import tslint from "rollup-plugin-tslint";

export default [
	{
		input: 'src/bin/ce.ts',
		output: {
			file: __dirname + '/dist/bin/ce.js',
			format: 'cjs',
			name: 'ce',
			banner: '#!/usr/bin/env node'
		},
		plugins: [typescript(), tslint()]
	},
	{
		input: 'src/bin/ce-create.ts',
		output: {
			file: __dirname + '/dist/bin/ce-create.js',
			format: 'cjs',
			name: 'ce-create',
			banner: '#!/usr/bin/env node'
		},
		plugins: [typescript(), tslint()]
	},
]