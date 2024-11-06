import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import AdmZip from "adm-zip";
import * as os from "os";

const tempDir = os.tmpdir();
const url = "https://github.com/alapajs/alapa-app/archive/refs/heads/main.zip";
const outputZip = path.join(tempDir, "alapa-app.zip");

async function downloadFile(url: string, outputPath: string) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  const writer = fs.createWriteStream(outputPath);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

function extractZip(zipPath: string, outputPath: string) {
  const zip = new AdmZip(zipPath);
  const tempOutputDir = path.join(tempDir, "alapa-project");
  zip.extractAllTo(tempOutputDir, true);
  const tempOutput = path.join(tempOutputDir, "alapa-app-main");
  fs.cpSync(tempOutput, outputPath, { recursive: true });
  fs.rmSync(tempOutput, { recursive: true });
}

export async function downloadAndExtract(outputPath: string) {
  try {
    await downloadFile(url, outputZip);
    extractZip(outputZip, outputPath);
    fs.unlinkSync(outputZip);
  } catch (error) {
    console.error("Error:", error);
  }
}
