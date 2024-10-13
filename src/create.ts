import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { downloadAndExtract } from "./downloader";
import { isDirectoryEmpty } from "./check-empty-dir";
import { ConfigureEnvFile, generateEncryptionKey } from "./configure/env";
import { runCommand } from "./run-cmd";
let projectDir = "";

export async function createProject(
  projectName?: string,
  options?: { [key: string]: any }
) {
  options = options || {};
  if (!projectName) {
    projectName = "my-alapa-project";
  }
  // console.log(options);
  projectDir = path.resolve(process.cwd(), projectName);
  if (projectName == ".") {
    projectName = path.basename(projectDir);
  }

  if (options["force"] === false) {
    if (fs.existsSync(projectDir) && !isDirectoryEmpty(projectDir)) {
      console.error(
        chalk.red(`Directory ${projectName} already exists and it's not empty.`)
      );
      process.exit(1);
    }
  }
  console.log(chalk.blue(`Creating project ${projectName}...`));
  fs.mkdirSync(projectDir, { recursive: true });

  console.log(chalk.blue(`Downloading files...`));
  await downloadAndExtract(projectDir);

  console.log(chalk.blue(`Configuring project ${projectName}...`));
  ConfigureEnvFile({
    projectDir,
    appName: path.basename(projectDir),
    encryptionKey: generateEncryptionKey(),
  });
  if (options["install"] === true) {
    console.log(chalk.blue(`Installing dependencies...`));
    await runCommand(`cd ${projectDir}  && npm install`);
  }

  console.log(chalk.green(`Project ${projectName} created successfully.`));
}
