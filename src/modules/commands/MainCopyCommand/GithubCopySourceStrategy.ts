import * as fs from "fs";
import { Readable } from "stream";
import * as tar from "tar-stream";

import { createGunzip } from "zlib";

import * as path from "path";
import type { TCopySourceStrategy } from "../../../types";

type GithubApiHelperObject = {
  ghUser: string;
  ghRepo: string;
  ref: string;
  path: string[];
  destination: string;
};

class GithubCopySourceStrategy implements TCopySourceStrategy {
  regex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)/;

  async copy(source: string, destination = ".") {
    const url = new URL(source);
    const segments = url.pathname.split("/").filter(Boolean);
    const [ghUser, ghRepo, _, ref, ...path] = segments;

    const helperObject = {
      ghRepo: ghRepo,
      ghUser: ghUser,
      ref,
      path,
      destination,
    } satisfies GithubApiHelperObject;

    await this.downloadTarball(helperObject);
  }

  async downloadTarball(config: GithubApiHelperObject) {
    const targetedPath = config.path.join("/");

    try {
      const resp = await fetch(
        `https://api.github.com/repos/${config.ghUser}/${config.ghRepo}/tarball/${config.ref}`,
      );

      if (!resp.ok) {
        throw new Error(`GitHub API error: ${resp.status} ${resp.statusText}`);
      }

      if (!resp.body) {
        throw new Error("No response body received from GitHub API");
      }

      const webStream = resp.body;
      const nodeStream = this.toNodeReadable(webStream);

      // Create gunzip and extract streams
      const gunzip = createGunzip();
      const extract = tar.extract();

      // Build the target path from config.path
      const targetedPath = config.path.join("/");

      // Handle extraction
      extract.on("entry", (header, stream, next) => {
        // GitHub tarballs have a root folder, we need to strip it
        const pathParts = header.name.split("/");
        const relativePath = pathParts.slice(1).join("/"); // Remove root folder

        // Skip if the file/directory is not in our target path
        if (!relativePath.startsWith(targetedPath)) {
          stream.resume(); // Consume and discard the stream
          stream.on("end", next);
          return;
        }

        // Calculate the destination path - preserve the target directory name
        // Extract the last segment of targetedPath as the base folder name
        const targetFolderName = targetedPath.split("/").pop() || "extracted";

        // Get the relative path within the target directory
        const pathWithinTarget = relativePath
          .substring(targetedPath.length)
          .replace(/^\//, "");

        // Build final destination: targetFolder/pathWithinTarget
        const destinationPath = pathWithinTarget
          ? path.join(targetFolderName, pathWithinTarget)
          : targetFolderName;

        if (header.type === "file") {
          // Create the file
          const fullPath = path.join(config.destination, destinationPath);
          const dir = path.dirname(fullPath);

          // Ensure directory exists
          fs.mkdirSync(dir, { recursive: true });

          // Write file
          const writeStream = fs.createWriteStream(fullPath);
          stream.pipe(writeStream);

          writeStream.on("finish", next);
          writeStream.on("error", next);
        } else if (header.type === "directory") {
          // Create directory
          const fullPath = path.join(config.destination, destinationPath);
          fs.mkdirSync(fullPath, { recursive: true });
          stream.resume();
          stream.on("end", next);
        } else {
          // Skip other types (symlinks, etc.)
          stream.resume();
          stream.on("end", next);
        }
      });

      extract.on("error", (err) => {
        console.error("Extraction error:", err);
        throw err;
      });

      extract.on("finish", () => {
        console.log("👍 successfully extracted tarball to", config.destination);
      });

      // Error handling for streams
      nodeStream.on("error", (err) => {
        console.error("Stream error:", err);
        throw err;
      });

      gunzip.on("error", (err) => {
        console.error("Gunzip error:", err);
        throw err;
      });

      // Pipe: GitHub tarball (.tar.gz) → gunzip → extract
      nodeStream.pipe(gunzip).pipe(extract);

      // Return a promise that resolves when extraction is complete
      return new Promise<void>((resolve, reject) => {
        extract.on("finish", resolve);
        extract.on("error", reject);
        nodeStream.on("error", reject);
        gunzip.on("error", reject);
      });
    } catch (error) {
      console.error("Download tarball failed:", error);
      throw error;
    }
  }

  toNodeReadable(webStream: ReadableStream<Uint8Array>): Readable {
    // @ts-ignore
    return Readable?.fromWeb(webStream as never);
  }
}

export { GithubCopySourceStrategy };
