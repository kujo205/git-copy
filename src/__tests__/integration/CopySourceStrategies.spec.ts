import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { GithubCopySourceStrategy } from "../../modules/commands/MainCopyCommand/GithubCopySourceStrategy";

describe("GithubCopySourceStrategy", () => {
  let tmpDir: string;

  beforeEach((done) => {
    fs.mkdtemp(path.join(os.tmpdir(), "test-"), (err, folder) => {
      if (err) return done(err);
      tmpDir = folder;
      done();
    });

    // global.fetch = jest.fn();
    jest.clearAllMocks();
    strategy = new GithubCopySourceStrategy();
  });

  afterEach(async () => {
    fs.rmdirSync(tmpDir, { recursive: true });
  });

  let strategy: GithubCopySourceStrategy;

  describe("copy method", () => {
    it("should handle directory URLs correctly and copy dirs as a whole to target dirs", async () => {
      const ghDirUrl = "https://github.com/kujo205/musc/tree/dev/.husky";

      await strategy.copy(ghDirUrl, tmpDir);

      const files = fs.readdirSync(tmpDir);

      expect(files[0]).toEqual(".husky");
    }, 20_000);

    it("should handle blob URLs correctly and copy files to target dirs", async () => {
      const ghBlobUrl =
        "https://github.com/kujo205/musc/blob/dev/.husky/.gitignore";

      await strategy.copy(ghBlobUrl, tmpDir);

      const files = fs.readdirSync(tmpDir);

      expect(files[0]).toEqual(".gitignore");
    }, 20_000);

    it("should handle repository root URLs", async () => {
      const ghRepoUrl = "https://github.com/kujo205/kujo205";

      await strategy.copy(ghRepoUrl, tmpDir);

      const files = fs.readdirSync(tmpDir);

      console.log("files", files);

      expect(files[0]).toEqual("README.md");

      expect(true).toBeTruthy();
    });
  });
});
