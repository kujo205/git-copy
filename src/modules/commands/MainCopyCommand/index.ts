import { Command } from "commander";
import {
  type CommandWrapper,
  type HistoryRecord,
  type TCommand,
  TCustomEvents,
} from "../../../types";
import events from "../../events";
import { copyStrategyFactory } from "./CopyStrategyFactory";
// Adapter pattern
export class MainCopyCommand implements CommandWrapper {
  command: TCommand;

  constructor() {
    this.command = new Command()
      .name("main")
      .arguments("<source> [<destination>]")
      .description("Copy from source to destination")
      .action(this.handleAction.bind(this));
  }

  async handleAction(source: string, destination = ".") {
    const strategy = copyStrategyFactory(source);

    const size = await strategy.copy(source, destination);

    const eventObject = {
      source,
      destination,
      timestamp: new Date().toISOString(),
      size,
    } satisfies HistoryRecord;

    events.emit(TCustomEvents.NEW_HISTORY_ITEM, eventObject);
  }
}
