import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createProject } from "./create";

const argv: { [key: string]: any } = yargs(hideBin(process.argv))
  .options("force", {
    default: false,
    type: "boolean",
    description:
      "Force the creation of the project, even if it already exists.",
    alias: "f",
    //description: "Force the operation, ignoring any warnings or prompts.",
  })
  .option("install", {
    default: true,
    alias: "i",
    type: "boolean",
    description:
      "Automatically install dependencies after creating the project.",
    // description:
    //   "Install dependencies automatically. Set to false to skip installation.",
  })
  .parse();
createProject(argv._[0], argv);
