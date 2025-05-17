import { GithubCopySourceStrategy } from "./GithubCopySourceStrategy";

const strategies = [new GithubCopySourceStrategy()];

export function copyStrategyFactory(source: string) {
  for (const strategy of strategies) {
    if (strategy.regex.test(source)) {
      return strategy;
    }
  }

  throw new Error(`No copy strategy found for source: ${source}`);
}
