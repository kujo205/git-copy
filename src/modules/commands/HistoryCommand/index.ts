import { Command } from "commander";
import type { CommandWrapper, TCommand } from "../../../types";
import HistoryCommandLogic from "./history";

export class HistoryCommand implements CommandWrapper {
  command: TCommand;

  constructor() {
    this.command = new Command()
      .name("history")
      .description("Show copy history")
      .option("-l, --list-history", "Show copy history")
      .action(async () => {
        const logic = new HistoryCommandLogic();
        await logic.execute();
      });
  }
}
