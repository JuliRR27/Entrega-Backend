import { Command } from "commander";

const commander = new Command()

commander
	// .option('-d', 'Debug variable', false)
	// .option('-p, --port <port>', 'Puerto del servidor', 8080)
	.option('--mode <mode>', 'Execution mode', 'development')
	// .requiredOption('-u <user>', 'Usuario utilizando el aplicativo', 'No se ha declarado un usuario')
	// .option('-l, --letters [letter...]', 'Specify letter')
	.parse()

// console.log('Options: ', program.opts())
// console.log('Args: ', program.args)

export default commander