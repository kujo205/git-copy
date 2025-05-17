import Main from "./modules/Main.js";
import { MainCopyCommand } from "./modules/commands/MainCopyCommand";

const commands = [new MainCopyCommand()];

const argParser = new Main(commands);
