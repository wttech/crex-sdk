const commander = require('commander');
const program = new commander.Command();
import Create from '../cli/Create';

program
	.usage('<path>')
	.option('-t, --target <url>', 'specify target instance')
	.option('-n, --packageName <name>', 'specify name of package')
	.option('-e, --env <name>', 'specify environment from auth.json')
	.parse(process.argv);

if (program.args.length < 1) {
	program.help();
} else {
	new Create(program);
}
