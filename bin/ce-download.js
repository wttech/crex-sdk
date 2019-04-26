#!/usr/bin/env node
const program = require('commander');
const Download = require('../lib/cli/download');

const list = (val) => {
	return val.split(',');
};

program
	.usage('<name>')
	.option('-t, --target <url>', 'specify target instance')
	.option('-p, --path <path>', 'download package with path')
	.option('-x, --extract [destination]', 'extract downloaded package')
	.option('-f, --filter <paths>', 'filter specific paths to be extracted', list, ['/'])
	.option('-e, --env <name>', 'specify environment from auth.json')
	.parse(process.argv);

if (program.args.length < 1) {
	return program.help();
}

new Download(program);
