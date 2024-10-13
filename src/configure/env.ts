import * as crypto from "crypto";
import path from "path";
import fs from "fs";
import { TemplateEngine } from "../template-engine";
export function ConfigureEnvFile(context: { [key: string]: string }): void {
  const exampleFile = path.join(context["projectDir"], ".env.example");
  const envFile = path.join(`${context["projectDir"]}`, ".env");
  if (fs.existsSync(exampleFile)) {
    let env = TemplateEngine(fs.readFileSync(exampleFile).toString(), context);
    if (fs.existsSync(envFile)) {
      fs.unlinkSync(envFile);
    }
    fs.writeFileSync(envFile, env);
  }
}

export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString("hex");
}
