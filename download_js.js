const fs = require('fs');
const path = require('path');

async function downloadScripts() {
  const url = 'https://bersekata.vercel.app/id/tukang-tipu';
  const res = await fetch(url);
  const html = await res.text();
  
  // Extract script src
  const scriptRegex = /<script[^>]+src="([^">]+)"/g;
  let match;
  let scripts = [];
  while ((match = scriptRegex.exec(html)) !== null) {
    scripts.push(match[1]);
  }
  
  for (const src of scripts) {
    const scriptUrl = src.startsWith('http') ? src : `https://bersekata.vercel.app${src}`;
    console.log(`Downloading ${scriptUrl}`);
    const scriptRes = await fetch(scriptUrl);
    const scriptText = await scriptRes.text();
    const filename = path.basename(src);
    fs.writeFileSync(filename, scriptText);
    console.log(`Saved ${filename}`);
  }
}

downloadScripts().catch(console.error);
