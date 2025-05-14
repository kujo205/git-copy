import { readFileSync } from "fs";
import { resolve } from "path";

describe("cli", () => {
  it("should exist", () => {
    const cli = readFileSync(resolve(__dirname, "../../cli.ts"), "utf8");

    expect(cli).toBeTruthy();
  });
});
