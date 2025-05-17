import { Command } from "commander";
import type { CommandWrapper, TCommand } from "../../../types";
import { copyStrategyFactory } from "./CopyStrategyFactory";

// Adapter pattern
export class MainCopyCommand implements CommandWrapper {
  command: TCommand;

  constructor() {
    this.command = new Command()
      .name("main")
      .arguments("<source> <destination>")
      .description("Copy from source to destination")
      .action(this.handleAction);
  }

  async handleAction(source: string, destination = ".") {
    const strategy = copyStrategyFactory(source);

    await strategy.copy(source, destination);
  }
}
