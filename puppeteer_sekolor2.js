const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('https://bersekata.vercel.app/id/sekolor', { waitUntil: 'networkidle2' });

  // Wait for load
  await new Promise(r => setTimeout(r, 2000));

  // Click the '?' help button (usually has the lucide-circle-help icon)
  await page.evaluate(() => {
    const helpBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerHTML.includes('lucide-circle-help'));
    if(helpBtn) helpBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  const helpText = await page.evaluate(() => document.body.innerText);
  require('fs').writeFileSync('help_text.txt', helpText);

  // Close help modal (usually by pressing Escape or clicking outside/close button)
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));

  // Click the settings button (lucide-settings)
  await page.evaluate(() => {
    const settingsBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerHTML.includes('lucide-settings'));
    if(settingsBtn) settingsBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  const settingsText = await page.evaluate(() => document.body.innerText);
  require('fs').writeFileSync('settings_text.txt', settingsText);
  
  await browser.close();
})();
