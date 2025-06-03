import type { Command } from "commander";

export type TCommand = ReturnType<Command["createCommand"]>;

export enum TCustomEvents {
  NEW_HISTORY_ITEM = "NEW_HISTORY_ITEM",
}

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
   * @return - size of the copied files in bytes
   */
  copy(source: string, destination: string): Promise<number>;
}

export interface HistoryRecord {
  id?: number;
  source: string;
  destination: string;
  timestamp: string;
  size: number;
}
