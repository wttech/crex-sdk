const commander = require('commander');
const program = new commander.Command();

export const ENTITY_NAME = "ce";

program
	.version(require("../../package").version)
	.command("upload [options] <file>", "Upload Creative Exchange package")
	.command("create [options]", "Create Creative Exchange package")
	.command("download [options]", "Download Creative Exchange package")
	.parse(process.argv);

