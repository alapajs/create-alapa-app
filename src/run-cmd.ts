import { exec } from "child_process";
import { promisify } from "util";

// Promisify the exec function to use with async/await
const execAsync = promisify(exec);

export async function runCommand(command: string): Promise<string> {
  try {
    // Check if the shell is PowerShell
    const isPowerShell =
      process.env.ComSpec &&
      process.env.ComSpec.toLowerCase().includes("powershell");

    // If running in PowerShell, replace && with ; for proper chaining
    if (isPowerShell) {
      // Replace && with ; for command chaining in PowerShell
      command = command.replace(/&&/g, ";");

      // You can also modify the command to check $? for success
      // For example, we want to ensure both commands run even if one fails
      command = command.replace(/&/g, ";"); // Replace & with ; in PowerShell to mimic Linux/cmd behavior
    }

    // Execute the command
    const { stdout, stderr } = await execAsync(command);

    // If there's any error output, log it
    if (stderr) {
      console.error(`Error: ${stderr}`);
    }

    // Return the standard output
    return stdout;
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    throw error; // Rethrow the error for further handling if needed
  }
}
