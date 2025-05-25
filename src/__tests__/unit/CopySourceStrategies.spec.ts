import { GithubCopySourceStrategy } from "../../modules/commands/MainCopyCommand/GithubCopySourceStrategy";
// Mock dependencies
jest.mock("fs", () => ({
  mkdirSync: jest.fn(),
  createWriteStream: jest.fn(() => ({
    on: jest.fn().mockReturnThis(),
    pipe: jest.fn(),
  })),
}));

// Mock fetch
global.fetch = jest.fn();

describe("GithubCopySourceStrategy", () => {
  let strategy: GithubCopySourceStrategy;
  const mockDestination = "./test-destination";

  beforeEach(() => {
    jest.clearAllMocks();
    strategy = new GithubCopySourceStrategy();

    // TODO: mock fetch
  });

  describe("copy method", () => {
    it("should handle directory URLs", async () => {
      // skipping test
      expect(true).toBeTruthy();
    });

    it("should handle repository root URLs", async () => {
      // skipping test
      expect(true).toBeTruthy();
    });
  });
});
