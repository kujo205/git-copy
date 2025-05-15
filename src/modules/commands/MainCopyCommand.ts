import { Command } from "commander";
import type { CommandWrapper, TCommand } from "../../types";

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

  handleAction(source: string, destination = ".") {
    console.log(`Copying ${source} to ${destination}`);
  }
}
