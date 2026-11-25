import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TARGET_URL = 'http://zoma.to/r/19159650';

async function main() {
  console.log('Launching Chrome to inspect:', TARGET_URL);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    
    // Listen for image requests
    const imageUrls = new Set();
    page.on('response', response => {
      const url = response.url();
      if (url.includes('b.zmtcdn.com') || url.includes('zoma.to') || url.match(/\.(webp|jpg|jpeg|png)/i)) {
        imageUrls.add(url);
      }
    });

    console.log('Navigating to target URL...');
    const response = await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Final URL:', page.url());
    console.log('Response Status:', response ? response.status() : 'none');

    const title = await page.title();
    console.log('Page Title:', title);

    const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 2000));
    console.log('Body Text Preview:\n', bodyText);

    // Extract all image sources from DOM
    const domImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight
      }));
      return imgs;
    });

    console.log(`Found ${domImages.length} DOM images, and ${imageUrls.size} network images.`);
    fs.writeFileSync('scripts/zomato-extract.json', JSON.stringify({
      finalUrl: page.url(),
      title,
      bodyText,
      domImages,
      networkImages: Array.from(imageUrls)
    }, null, 2));

  } catch (err) {
    console.error('Error during scraping:', err);
  } finally {
    await browser.close();
  }
}

main();
