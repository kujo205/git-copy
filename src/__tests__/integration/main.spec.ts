import { resolve } from "path";
import execa from "execa";

const bin = resolve(__dirname, "./bin.js");
const testGhFile = "https://github.com/kujo205/kujo205/blob/main/README.md";

describe("runs git-remote-copy", () => {
  it("should display the help contents", async () => {
    const { stdout } = await execa(`${bin}`, ["--help"], {
      env: { TS_NODE_FILES: "true" },
    });

    expect(stdout).toContain("Usage: git-remote-copy [options]");
  });
});
