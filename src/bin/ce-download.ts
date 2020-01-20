#!/usr/bin/env node
import program from 'commander';
import Download from '../cli/Download';
import { stringToList } from '../utils';

program
	.usage('<name>')
	.option('-t, --target <url>', 'specify target instance')
	.option('-p, --path <path>', 'download package with path')
	.option('-x, --extract [destination]', 'extract downloaded package')
	.option('-f, --filter <paths>', 'filter specific paths to be extracted', stringToList, ['/'])
	.option('-e, --env <name>', 'specify environment from auth.json')
	.parse(process.argv);

if (program.args.length < 1 && !program.name) {
	program.help();
} else {
	new Download(program);
}

export {};


