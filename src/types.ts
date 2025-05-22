import type { Command } from "commander";

export type TCommand = ReturnType<Command["createCommand"]>;

export interface CommandWrapper {
  command: TCommand;
}

export interface TCopySourceStrategy {
  /*
   * Regex to match the source path
   * */
  regex: RegExp;

  /**
   *
   * @param source - path from which to copy
   * @param destination - where to copy to
   */
  copy(source: string, destination: string): void;
}

export type BlobItem = {
  path: string;
  sha: string;
  size: number;
  url: string;
};
