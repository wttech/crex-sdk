#!/usr/bin/env node
var program = require("commander");

program
	.version(require("../package").version)
	.arguments('<file> [globs] [name] [options]')
	.command("upload [options] <file>", "Upload Creative Exchange package")
	.command("download [options]", "Download Creative Exchange package")
	.parse(process.argv);