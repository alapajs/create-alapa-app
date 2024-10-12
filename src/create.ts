import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

export function createProject(projectName?: string) {
  if (!projectName) {
    console.error("Please provide a project name.");
    projectName = "my-alapa-project";
  }

  const projectDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    console.error(`Directory ${projectName} already exists.`);
    process.exit(1);
  }

  console.log(chalk.blue(`Creating project ${projectName}...`));
  fs.mkdirSync(projectDir, { recursive: true });
}
