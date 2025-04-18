const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const url = process.env.SCRAPE_URL || 'https://example.com';
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/usr/bin/chromium-browser',
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
})();
