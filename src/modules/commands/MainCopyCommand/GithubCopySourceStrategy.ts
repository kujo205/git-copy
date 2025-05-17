import type { TCopySourceStrategy } from "../../../types";

type GithubApiHelperObject = {
  ghUser: string;
  ghRepo: string;
  ref: string;
  path: string[];
};

class GithubCopySourceStrategy implements TCopySourceStrategy {
  regex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)/;

  async copy(source: string, destination = ".") {
    const url = new URL(source);
    const segments = url.pathname.split("/").filter(Boolean);
    const [ghUser, ghRepo, blobOrTree, ref, ...path] = segments;

    const helperObject = {
      ghRepo: ghRepo,
      ghUser: ghUser,
      ref,
      path,
    } satisfies GithubApiHelperObject;

    // eg: source is like
    // https://github.com/octokit/webhooks.net/tree/main/samples
    // https://github.com/kujo205/musc
    // https://github.com/octokit/webhooks.net/blob/ba39c84a7804e034aac979b2079fb49f1359558e/.github/workflows/codeql-analysis.yml

    if (blobOrTree === "blob") {
      await this.copyBlob(helperObject);
    } else if (blobOrTree === "tree") {
      await this.copyTree(helperObject);
    } else if (segments.length === 2) {
      await this.copyWholeRepo(helperObject);
    } else {
      throw new Error(
        `Cannot parse copy assets from '${source}'\nPlease specify a folder containing correct url`,
      );
    }

    // 1st try to find a github tree in url using
    // 'https://api.github.com/repos/kujo205/musc/git/trees/main?recursive=true'

    // 2nd if no match, fetch default github branch and assign default branch to a tree

    // 3rd filter out contents of a tree to match the desired

    // 4rd filter out contents of a tree to match the desired folder, folder find path lengths, sort in descending order

    // curl -L \https://api.github.com/repos/kujo205/musc/contents/tsconfig.json

    // if (!match) {
    //   throw new Error("Invalid GitHub URL");
    // }
    // return `https://raw.githubusercontent.com/${match[3]}/${match[4]}/main`;
  }

  /**
   * Copies github blob
   * */
  async copyBlob(params: GithubApiHelperObject) {
    console.log("copying the blob");
  }

  /**
   * Copies github tree
   * */
  async copyTree(params: GithubApiHelperObject) {
    console.log("copying the tree");
  }

  /**
   * Copies github repo
   * */
  async copyWholeRepo(params: GithubApiHelperObject) {
    console.log("copying the repo");
  }
}

export { GithubCopySourceStrategy };
