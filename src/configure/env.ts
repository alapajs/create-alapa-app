import * as crypto from "crypto";
import path from "path";
import fs from "fs";
import http from "http";
import { TemplateEngine } from "../template-engine";
import { v4 as uuidv4 } from "uuid";
export function ConfigureEnvFile(context: {
  [key: string]: string | number;
}): void {
  const exampleFile = path.join(`${context["projectDir"]}`, ".env.example");
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
  const uuid = uuidv4();
  const hash = crypto.createHash("sha256").update(uuid).digest("hex");
  return hash;
}

export const getDevPort = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const server = http.createServer();
    const defaultPort = 35730;
    server.listen(0, () => {
      const address = server.address();
      if (address && typeof address === "object") {
        const port = address.port;
        server.close(() => {
          resolve(port);
        });
      } else {
        server.close(() => {
          resolve(defaultPort);
        });
      }
    });

    server.on("error", (err) => {
      resolve(defaultPort);
    });
  });
};
