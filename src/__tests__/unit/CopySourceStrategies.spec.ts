import { GithubCopySourceStrategy } from "../../modules/commands/MainCopyCommand/GithubCopySourceStrategy";

describe("Copy source strategies", () => {
  describe("GithubCopySourceStrategy", () => {
    const strategy = new GithubCopySourceStrategy();

    const blobUrl =
      "https://github.com/octokit/webhooks.net/blob/ba39c84a7804e034aac979b2079fb49f1359558e/.github/workflows/codeql-analysis.yml";

    const defaultBranchUrl = "https://github.com/kujo205/musc";

    const treeUrl = "https://github.com/octokit/webhooks.net/tree/main/samples";

    const invalidUrl = "https://github.com/kujo205/git-copy/actions";

    it("test for blob url", () => {
      strategy.copy(blobUrl);
    });

    it("test for tree url", () => {
      strategy.copy(treeUrl);
    });

    it("test for default branch", () => {
      strategy.copy(defaultBranchUrl);
    });

    it("test for invalid url", async () => {
      await expect(strategy.copy(invalidUrl)).rejects.toThrow();
    });
  });
});
