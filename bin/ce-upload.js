#!/usr/bin/env node
const program = require('commander');
const Upload = require('../lib/cli/upload');

const list = (val) => {
	return val.split(',');
};

program
	.usage('[path to zip]')
	.option('-t, --target <url>', 'specify target instance')
	.option('-c, --compress <directories>', 'specify directories to be compressed', list)
	.option('-o, --omit <globs>', 'specify globs to be omitted when creating zip', list)
	.option('-e, --env <name>', 'specify environment from auth.json')
	.option('-i, --install', 'install after upload')
	.parse(process.argv);

if (program.args.length < 1 && !program.compress) {
	return program.help();
}

new Upload(program);
