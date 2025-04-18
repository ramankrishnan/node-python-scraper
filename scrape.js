const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  try {
    const url = process.env.SCRAPE_URL || 'https://example.com';

    const browser = await puppeteer.launch({
      headless: 'new', // modern headless mode to avoid deprecation warning
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium'
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const data = await page.evaluate(() => {
      return {
        title: document.title,
        heading: document.querySelector('h1')?.innerText || 'No heading found'
      };
    });

    fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
    await browser.close();

    console.log('✅ Data scraped and saved successfully.');
  } catch (err) {
    console.error('❌ Scraper error:', err);
    process.exit(1);
  }
})();
