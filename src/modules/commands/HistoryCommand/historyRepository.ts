import sqlite3 from "sqlite3";
import path from "path";
import { EventEmitter } from "events";

export interface HistoryRecord {
  id?: number;
  source: string;
  destination: string;
  timestamp: string;
  size: number;
}

class HistoryRepository {
  private static instance: HistoryRepository;
  private db: sqlite3.Database;

  private constructor() {
    const dbPath = path.resolve(__dirname, "../../history.sqlite");
    this.db = new sqlite3.Database(dbPath);
    this.db.serialize(() => {
      this.db.run(`CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source TEXT NOT NULL,
        destination TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        size INTEGER NOT NULL
      )`);
    });
  }

  public static getInstance(): HistoryRepository {
    if (!HistoryRepository.instance) {
      HistoryRepository.instance = new HistoryRepository();
    }
    return HistoryRepository.instance;
  }

  public addRecord(record: HistoryRecord): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO history (source, destination, timestamp, size) VALUES (?, ?, ?, ?)`,
        [record.source, record.destination, record.timestamp, record.size],
        (err: any) => {
          if (err) reject(err);
          else resolve();
        },
      );
    });
  }

  public getAllRecords(): Promise<HistoryRecord[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM history ORDER BY timestamp DESC`,
        [],
        (err: any, rows: HistoryRecord[] | PromiseLike<HistoryRecord[]>) => {
          if (err) reject(err);
          else resolve(rows);
        },
      );
    });
  }
}

export default HistoryRepository;
