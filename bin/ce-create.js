#!/usr/bin/env node
const program = require('commander');
const Create = require('../lib/cli/create');

program
	.usage('<path>')
	.option('-t, --target <url>', 'specify target instance')
	.option('-n, --name <name>', 'specify name of package')
	.option('-e, --env <name>', 'specify environment from auth.json')
	.parse(process.argv);

if (program.args.length < 1) {
	return program.help();
}

new Create(program);
