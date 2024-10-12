const fs = require("fs");
const path = require("path");

// Path to your compiled index.js
const filePath = path.join(__dirname, "dist", "index.js");
const shebang = "#!/usr/bin/env node\n";

// Read the existing file content
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading ${filePath}: ${err}`);
    return;
  }

  // Prepend the shebang and write back the file
  fs.writeFile(filePath, shebang + data, "utf8", (err) => {
    if (err) {
      console.error(`Error writing ${filePath}: ${err}`);
      return;
    }
    console.log(`Added shebang to ${filePath}`);
  });
});
