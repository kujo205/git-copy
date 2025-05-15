import Main from "./modules/Main";
import { MainCopyCommand } from "./modules/commands/MainCopyCommand";

const commands = [new MainCommand()];

const argParser = new Main(commands);
