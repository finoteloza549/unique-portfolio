const fs = require('fs');

const logPath = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\4ebef24f-c454-46d0-8736-28a0f32ac616\\.system_generated\\logs\\transcript.jsonl';
const outPath = 'C:\\Users\\HP\\Desktop\\portfolio\\scratch\\user_html.txt';

try {
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n');
  let found = false;

  for (const line of lines) {
    if (line.includes('Model 4924160')) {
      try {
        const data = JSON.parse(line);
        if (data && data.content) {
          fs.writeFileSync(outPath, data.content, 'utf8');
          console.log('SUCCESS: Extracted content to ' + outPath);
          found = true;
          break;
        }
      } catch (e) {
        // Skip invalid JSON lines
      }
    }
  }

  if (!found) {
    console.log('FAILED: No line containing "Model 4924160" was parsed successfully.');
  }
} catch (err) {
  console.error('ERROR reading/writing files:', err);
}
