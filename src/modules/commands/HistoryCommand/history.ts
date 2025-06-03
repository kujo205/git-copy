import readline from "readline";
import events from "../../events";
import HistoryRepository, { HistoryRecord } from "./historyRepository";

class HistoryCommand {
  private records: HistoryRecord[] = [];
  private currentIndex = 0;

  async execute() {
    this.records = await HistoryRepository.getInstance().getAllRecords();
    if (this.records.length === 0) {
      console.log("No copy history found.");
      return;
    }
    this.displayRecord();
    this.listenForNavigation();
  }

  private displayRecord() {
    const record = this.records[this.currentIndex];
    console.clear();
    console.log(`Copy #${this.currentIndex + 1} of ${this.records.length}`);
    console.log(`From: ${record.source}`);
    console.log(`To:   ${record.destination}`);
    console.log(`When: ${record.timestamp}`);
    console.log(`Size: ${record.size} bytes`);
    console.log("\nPress j (down), k (up), or q (quit)");
  }

  private listenForNavigation() {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    const onKeyPress = (str: string, key: readline.Key) => {
      if (key.name === "j") {
        if (this.currentIndex < this.records.length - 1) {
          this.currentIndex++;
          events.emit("navigate", this.currentIndex);
        }
      } else if (key.name === "k") {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          events.emit("navigate", this.currentIndex);
        }
      } else if (key.name === "q" || (key.ctrl && key.name === "c")) {
        process.stdin.setRawMode(false);
        process.stdin.removeListener("keypress", onKeyPress);
        process.exit(0);
      }
    };
    process.stdin.on("keypress", onKeyPress);
    events.on("navigate", () => this.displayRecord());
  }
}

export default HistoryCommand;
