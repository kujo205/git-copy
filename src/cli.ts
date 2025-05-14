import ArgParser from "./modules/ArgParser";

const packageJson = require("../package.json");

const version: string = packageJson.version;

const argParser = new ArgParser();
