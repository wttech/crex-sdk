import typescript from '@rollup/plugin-typescript';
import multi from '@rollup/plugin-multi-entry';

// export default {
// 	input: [
// 		'src/bin/ce.ts',
// 		'src/bin/ce-create.ts'
// 	],

// 	output: {
// 		banner: '#!/usr/bin/env node',
// 		dir: 'dist/bin',
// 		format: 'cjs'
// 	},
	
// 	plugins: [
// 		typescript({lib: ["es5", "es6"], target: "es5"}),
// 		multi({ 
// 			exports: false
// 		})
// 	]
// }

export default [
	{
		input: 'src/bin/ce.ts',
		output: {
			file: __dirname + '/dist/bin/ce.js',
			format: 'cjs',
			name: 'ce'
		},
		plugins: [typescript()]
	},
	{
		input: 'src/bin/ce-create.ts',
		output: {
			file: __dirname + '/dist/bin/ce-create.js',
			format: 'cjs',
			name: 'ce-create'
		},
		plugins: [typescript()]
	},
]