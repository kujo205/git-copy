import { Command } from "commander";
const packageJson = require("../../package.json");
import type { CommandWrapper, TCommand } from "../types";

/**
 * Adapter pattern
 */

class Main {
  private program: TCommand;

  /**
   * Dependency inversion:
   * The class depends on abstractions (commands) rather than concrete implementations.
   */
  constructor(commands: CommandWrapper[]) {
    this.program = new Command()
      .name(packageJson.name)
      .description(packageJson.description)
      .version(packageJson.version);

    for (const { command } of commands) {
      const isMain = command.name() === "main";

      this.program.addCommand(
        command,
        isMain ? { isDefault: true } : undefined,
      );
    }

    this.program.parse(process.argv);
  }
}

export default Main;
