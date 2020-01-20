#!/usr/bin/env node
import program from 'commander';
import Upload from '../cli/Upload';
import { stringToList } from '../utils';

program
	.usage('[path to zip]')
	.option('-t, --target <url>', 'specify target instance')
	.option('-c, --compress <directories>', 'specify directories to be compressed', stringToList)
	.option('-o, --omit <globs>', 'specify globs to be omitted when creating zip', stringToList)
	.option('-e, --env <name>', 'specify environment from auth.json')
	.parse(process.argv);

if (program.args.length < 1) {
	program.help();
} else {
	new Upload(program);
}

export {};


