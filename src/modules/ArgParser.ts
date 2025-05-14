import { Command } from "commander";
const packageJson = require("../../package.json");

/**
 * Adapter pattern
 */
class ArgParser {
	private program: ReturnType<Command["createCommand"]>;

	constructor() {
		this.program = new Command();

		const name = packageJson.name;
		const version: string = packageJson.version;

		this.program
			.name(name)
			.description(packageJson.description)
			.version(version)
			.arguments("<source> <destination>")
			.action((source, destination = ".") => {
				console.log(`Copying ${source} to ${destination}`);
			})
			.parse(process.argv);
	}
}

export default ArgParser;
