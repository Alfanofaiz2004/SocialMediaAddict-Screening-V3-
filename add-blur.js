const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir(path.join(__dirname, 'src'), (filePath) => {
  if (!filePath.endsWith('.tsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Add filter: 'blur(0px)' to whileInView if it exists
  content = content.replace(/whileInView=\{\{\s*(?!.*filter:)(.*?)\s*\}\}/g, (match, inner) => {
    if (inner.includes('opacity: 1')) {
      return `whileInView={{ ${inner}, filter: 'blur(0px)' }}`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});
