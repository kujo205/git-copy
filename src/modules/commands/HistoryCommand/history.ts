import readline from "readline";
import { HistoryRecord, TCustomEvents } from "../../../types";
import events from "../../events";
import HistoryRepository from "./historyRepository";
import chalk from "chalk";

class HistoryCommand {
  private records: HistoryRecord[] = [];
  private currentIndex = 0;
  private isDetailedView = false;
  private selectedIndex = -1;

  constructor() {
    this.listenForNewHistoryItem();
  }

  async execute() {
    this.records = await HistoryRepository.getInstance().getAllRecords();
    if (this.records.length === 0) {
      console.log("🙅 Copying history empty");
      return;
    }
    this.displayList();
    this.listenForNavigation();
  }

  private displayList() {
    console.clear();
    console.log("📋 Copy History");
    console.log("───────────────");

    this.records.forEach((record, index) => {
      const isSelected = index === this.currentIndex;
      const isHighlighted = index === this.selectedIndex;

      const line = `Copy #${index + 1} - ${record.source} → ${record.destination}`;

      if (isSelected) {
        console.log(chalk.bgYellow.black(line));
      } else if (isHighlighted) {
        console.log(chalk.yellow(line));
      } else {
        console.log(line);
      }
    });

    console.log("\nNavigation:");
    console.log("j/k - Move up/down");
    console.log("Enter - Toggle detailed view");
    console.log("q - Back/Exit");
  }

  private displayDetailedView() {
    const record = this.records[this.selectedIndex];
    console.clear();
    console.log("📄 Copy Details");
    console.log("───────────────");
    console.log(`Copy #${this.selectedIndex + 1} of ${this.records.length}`);
    console.log(`From: ${record.source}`);
    console.log(`To:   ${record.destination}`);
    console.log(`When: ${record.timestamp}`);
    console.log(`Size: ${record.size} bytes`);
    console.log("\nPress Enter to return to list");
    console.log("Press q to exit");
  }

  private listenForNavigation() {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    const onKeyPress = (str: string, key: readline.Key) => {
      if (key.name === "j") {
        if (this.currentIndex < this.records.length - 1) {
          this.currentIndex++;
          this.displayList();
        }
      } else if (key.name === "k") {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.displayList();
        }
      } else if (key.name === "return" || key.name === "enter") {
        if (this.isDetailedView) {
          // Return to list view
          this.isDetailedView = false;
          this.displayList();
        } else {
          // Enter detailed view
          this.isDetailedView = true;
          this.selectedIndex = this.currentIndex;
          this.displayDetailedView();
        }
      } else if (key.name === "q") {
        if (this.isDetailedView) {
          // Return to list view
          this.isDetailedView = false;
          this.displayList();
        } else {
          // Exit the application
          process.stdin.setRawMode(false);
          process.stdin.removeListener("keypress", onKeyPress);
          process.exit(0);
        }
      } else if (key.ctrl && key.name === "c") {
        process.stdin.setRawMode(false);
        process.stdin.removeListener("keypress", onKeyPress);
        process.exit(0);
      }
    };

    process.stdin.on("keypress", onKeyPress);
  }

  private listenForNewHistoryItem() {
    events.on(TCustomEvents.NEW_HISTORY_ITEM, (newRecord: HistoryRecord) => {
      console.log("New history item added:", newRecord);
      HistoryRepository.getInstance().addRecord(newRecord);
    });
  }
}

export default HistoryCommand;
