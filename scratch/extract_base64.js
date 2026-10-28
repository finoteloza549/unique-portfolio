const fs = require('fs');
const path = require('path');

const htmlPath = 'C:\\Users\\HP\\Desktop\\showcase (1).html';
const destDir = 'C:\\Users\\HP\\Desktop\\portfolio\\client\\src\\assets';
const destPath = path.join(destDir, 'handcuffsBase64.js');

try {
  // Ensure assets directory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const content = fs.readFileSync(htmlPath, 'utf8');
  const lines = content.split('\n');
  let base64String = '';

  for (const line of lines) {
    if (line.includes('background-image: url(')) {
      // Extract data URI string from: background-image: url('data:image/png;base64,...');
      const startMatch = line.indexOf("url('") + 5;
      const endMatch = line.lastIndexOf("')");
      if (startMatch > 4 && endMatch > startMatch) {
        base64String = line.substring(startMatch, endMatch);
        break;
      }
    }
  }

  if (base64String) {
    const fileContent = `// CONFIDENTIAL // POLICE DATABASE DETECTIVE SUITE // HANDCUFFS GRAPHIC IMAGE DATA\nexport const handcuffsBase64 = "${base64String}";\n`;
    fs.writeFileSync(destPath, fileContent, 'utf8');
    console.log('SUCCESS: Extracted base64 image to ' + destPath + ' (size: ' + fileContent.length + ' bytes)');
  } else {
    console.log('FAILED to find background-image URI in ' + htmlPath);
  }
} catch (err) {
  console.error('Error during extraction:', err);
}
