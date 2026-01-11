const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', '.svelte-kit', 'output', 'client');
const targetDir = path.join(__dirname, '..', '.svelte-kit', 'cloudflare', '_app');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all files from source to target
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory ${src} does not exist`);
    return;
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  copyDir(sourceDir, targetDir);
  console.log('Assets copied successfully from', sourceDir, 'to', targetDir);
} catch (error) {
  console.error('Error copying assets:', error);
  process.exit(1);
}