import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const MAPS_URL = 'https://www.google.com/maps/search/Hotel+Vatika+Basmat+Road+Parbhani';

async function main() {
  console.log('Navigating to Google Maps search...');
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

    const collectedImages = new Set();
    page.on('response', res => {
      const u = res.url();
      if (u.includes('googleusercontent.com') && (u.includes('=w') || u.includes('=s') || u.includes('/p/'))) {
        collectedImages.add(u);
      }
    });

    await page.goto(MAPS_URL, { waitUntil: 'networkidle2', timeout: 35000 });
    await new Promise(r => setTimeout(r, 4000));

    // Get text and details from the page
    const details = await page.evaluate(() => {
      const text = document.body.innerText;
      const h1 = document.querySelector('h1') ? document.querySelector('h1').innerText : '';
      const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src && src.includes('googleusercontent.com'));
      return { text: text.slice(0, 3000), h1, imgs };
    });

    console.log('H1:', details.h1);
    console.log('DOM Images:', details.imgs.length);
    console.log('Network Google photos:', collectedImages.size);
    fs.writeFileSync('scripts/google-maps-extract.json', JSON.stringify({
      h1: details.h1,
      domImages: details.imgs,
      networkImages: Array.from(collectedImages),
      textSnippet: details.text
    }, null, 2));

  } catch (err) {
    console.error('Google Maps error:', err.message);
  } finally {
    await browser.close();
  }
}

main();
