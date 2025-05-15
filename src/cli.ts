import ArgParser from "./modules/ArgParser";
import { MainCommand } from "./modules/commands/MainCommand";

const commands = [new MainCommand()];

const argParser = new ArgParser(commands);
