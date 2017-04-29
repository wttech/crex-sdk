#!/usr/bin/env node
var program = require('commander');

program
	.version(require('../package').version)
	.usage('<command> [options]')
	.command('import', 'import Creative Exchange package')
	.command('export', 'export Creative Exchange package')
	.parse(process.argv);