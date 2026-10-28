const fs = require('fs');

const htmlPath = 'C:\\Users\\HP\\Desktop\\showcase (1).html';

try {
  const content = fs.readFileSync(htmlPath, 'utf8');
  const lines = content.split('\n');

  console.log('--- HTML STRUCTURE & STYLING ---');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('base64,')) {
      console.log(`${i + 1}: [BASE64 IMAGE DATA LINE - OMITTED FOR BRIEFNESS - Starts with: ${line.substring(0, 100)}...]`);
    } else {
      console.log(`${i + 1}: ${line}`);
    }
  }
} catch (err) {
  console.error('Error reading showcase file:', err);
}
