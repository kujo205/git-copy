import Main from "./modules/Main";
import { HistoryCommand } from "./modules/commands/HistoryCommand";

import { MainCopyCommand } from "./modules/commands/MainCopyCommand";

const historyCommand = new HistoryCommand();
const mainCopyCommand = new MainCopyCommand();

const commands = [mainCopyCommand, historyCommand];

new Main(commands);
