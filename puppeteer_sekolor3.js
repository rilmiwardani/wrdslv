const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('https://bersekata.vercel.app/id/sekolor', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  
  // click help
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const help = btns.find(b => b.innerHTML.includes('circle-help') || b.innerHTML.includes('help'));
    if(help) help.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  const html = await page.content();
  require('fs').writeFileSync('full_page.html', html);
  await browser.close();
})();
