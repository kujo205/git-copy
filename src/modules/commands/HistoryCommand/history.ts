import readline from "readline";
import chalk from "chalk";
import { HistoryRecord, TCustomEvents } from "../../../types";
import events from "../../events";
import HistoryRepository from "./historyRepository";

class HistoryCommand {
  private records: HistoryRecord[] = [];
  private currentIndex = 0;
  private isDetailedView = false;
  private selectedIndex = -1;
  private terminalHeight = 0;

  constructor() {
    this.listenForNewHistoryItem();
  }

  async execute() {
    this.records = await HistoryRepository.getInstance().getAllRecords();
    if (this.records.length === 0) {
      console.log("🙅 Copying history empty");
      return;
    }
    this.currentIndex = this.records.length - 1;
    this.displayList();
    this.listenForNavigation();
  }

  private displayList() {
    // Get terminal height and reserve space for header and footer
    this.terminalHeight = process.stdout.rows - 9;

    console.clear();
    console.log("📋 Copy History");

    // Calculate visible range
    let startIndex = Math.max(
      0,
      this.currentIndex - Math.ceil(this.terminalHeight / 2),
    );
    let endIndex = Math.min(
      this.records.length,
      startIndex + this.terminalHeight,
    );

    // If we're near the start, show from the beginning
    if (this.currentIndex < Math.ceil(this.terminalHeight / 2)) {
      startIndex = 0;
      endIndex = Math.min(this.records.length, this.terminalHeight);
    }

    // Show scroll indicators if there are more items
    if (startIndex > 0) {
      console.log(
        chalk.bgBlue.white(` ↑ More items above (${startIndex} items) `),
      );
    } else {
      console.log("");
    }

    // Display visible portion of the list
    for (let i = startIndex; i < endIndex; i++) {
      const record = this.records[i];
      const isSelected = i === this.currentIndex;
      const isHighlighted = i === this.selectedIndex;

      const line = `Copy #${i + 1} - ${record.source} → ${record.destination}`;

      if (isSelected) {
        console.log(chalk.bgYellow.black(line));
      } else if (isHighlighted) {
        console.log(chalk.yellow(line));
      } else {
        console.log(line);
      }
    }
    if (endIndex < this.records.length) {
      const remainingItems = this.records.length - endIndex;
      console.log(
        chalk.bgBlue.white(` ↓ More items below (${remainingItems} items) `),
      );
    } else {
      console.log("");
    }

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

    const onKeyPress = (_: string, key: readline.Key) => {
      if (key.ctrl && key.name === "c") return this.exit();

      switch (key.name) {
        case "j":
          this.navigateDown();
          break;
        case "k":
          this.navigateUp();
          break;
        case "return":
        case "enter":
          this.toggleView();
          break;
        case "q":
          this.quitOrBack();
          break;
      }
    };

    process.stdin.on("keypress", onKeyPress);
  }

  private navigateDown() {
    if (this.currentIndex < this.records.length - 1) {
      this.currentIndex++;
      this.displayList();
    }
  }

  private navigateUp() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.displayList();
    }
  }

  private toggleView() {
    if (this.isDetailedView) {
      this.isDetailedView = false;
      this.displayList();
    } else {
      this.isDetailedView = true;
      this.selectedIndex = this.currentIndex;
      this.displayDetailedView();
    }
  }

  private quitOrBack() {
    if (this.isDetailedView) {
      this.isDetailedView = false;
      this.displayList();
    } else {
      this.exit();
    }
  }

  private exit() {
    if (process.stdin.isTTY) process.stdin.setRawMode(false);
    process.stdin.removeAllListeners("keypress");
    process.exit(0);
  }

  private listenForNewHistoryItem() {
    events.on(TCustomEvents.NEW_HISTORY_ITEM, (newRecord: HistoryRecord) => {
      HistoryRepository.getInstance().addRecord(newRecord);
    });
  }
}

export default HistoryCommand;
