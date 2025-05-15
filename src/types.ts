import type { Command } from "commander";

export type TCommand = ReturnType<Command["createCommand"]>;

export interface CommandWrapper {
  command: TCommand;
}
