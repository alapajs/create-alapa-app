import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createProject } from "./create";

const argv: { [key: string]: any } = yargs(hideBin(process.argv)).parse();

createProject(argv._[0]);
