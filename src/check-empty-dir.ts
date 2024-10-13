import * as fs from "fs";
export function isDirectoryEmpty(dirPath: string): boolean {
  try {
    const files = fs.readdirSync(dirPath); // Read directory contents
    return files.length === 0; // Return true if there are no files
  } catch (error) {
    console.error("Error reading directory:", error);
    return false; // Return false if an error occurs (e.g., directory does not exist)
  }
}
