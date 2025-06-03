import { Command } from "commander";
import type { CommandWrapper, TCommand } from "../../../types";
import HistoryCommandLogic from "./history";

export class HistoryCommand implements CommandWrapper {
  command: TCommand;

  constructor() {
    const logic = new HistoryCommandLogic();

    this.command = new Command()
      .name("history")
      .description("Show copy history")
      .action(async () => {
        await logic.execute();
      });
  }
}
