const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const jsContents = [];
  
  page.on('response', async (response) => {
    const url = response.url();
    if (url.endsWith('.js')) {
      try {
        const text = await response.text();
        jsContents.push({ url, text });
      } catch (e) {
      }
    }
  });

  await page.goto('https://bersekata.vercel.app/id/tukang-tipu', { waitUntil: 'networkidle0' });

  let allArrays = {};
  
  for (const js of jsContents) {
    const regex = /"([a-z]{5})"([,\]])/g;
    let match;
    let words = new Set();
    while ((match = regex.exec(js.text)) !== null) {
      words.add(match[1]);
    }
    if (words.size > 500) {
      allArrays[js.url.split('/').pop()] = Array.from(words);
    }
  }

  fs.writeFileSync('extracted_all.json', JSON.stringify(allArrays, null, 2));
  console.log(Object.keys(allArrays).map(k => `${k}: ${allArrays[k].length} words`).join('\n'));

  await browser.close();
})();
