import { exec } from "child_process";
import { promisify } from "util";

// Promisify the exec function to use with async/await
const execAsync = promisify(exec);

export async function runCommand(command: string): Promise<string> {
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
      console.error(`Error: ${stderr}`);
    }
    return stdout; // Return the standard output
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    throw error; // Rethrow the error for further handling if needed
  }
}
