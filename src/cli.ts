import Main from "./modules/Main";
import { MainCopyCommand } from "./modules/commands/MainCopyCommand";
import { HistoryCommand } from "./modules/commands/HistoryCommand";

const commands = [new MainCopyCommand(), new HistoryCommand()];

const argParser = new Main(commands);
