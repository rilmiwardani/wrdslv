const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('https://bersekata.vercel.app/id/sekolor', { waitUntil: 'networkidle2' });

  // Wait for the modal or the main app to load
  await new Promise(r => setTimeout(r, 2000));
  
  // Extract all text on the screen to see what it says initially
  const initialText = await page.evaluate(() => document.body.innerText);
  console.log("--- Initial Text on Screen ---");
  console.log(initialText.substring(0, 2000));
  
  // Try to find the settings button (usually a cog icon or button with 'Settings')
  // We can just dump all buttons
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, svg')).map(b => b.outerHTML).join('\n');
  });
  
  require('fs').writeFileSync('buttons.txt', buttons);
  console.log("Wrote buttons to buttons.txt");
  
  await browser.close();
})();
