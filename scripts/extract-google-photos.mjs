import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const MAPS_URL = 'https://www.google.com/maps/search/Hotel+Vatika+Basmat+Road+Parbhani';

async function main() {
  console.log('Navigating to Google Maps to extract photos gallery...');
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
      if (u.includes('googleusercontent.com') && (u.includes('grass-cs') || u.includes('/p/'))) {
        collectedImages.add(u);
      }
    });

    await page.goto(MAPS_URL, { waitUntil: 'networkidle2', timeout: 35000 });
    await new Promise(r => setTimeout(r, 3000));

    // Click "See photos" or photo button
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div, a'));
      for (const b of btns) {
        if (b.innerText && (b.innerText.includes('See photos') || b.innerText.includes('Photos') || b.getAttribute('aria-label')?.includes('Photo'))) {
          b.click();
          break;
        }
      }
    });

    await new Promise(r => setTimeout(r, 4000));

    // Scroll gallery
    for (let i = 0; i < 8; i++) {
      await page.evaluate(() => {
        const panes = document.querySelectorAll('div[role="feed"], div[tabindex="-1"], div[class*="m6QErb"]');
        panes.forEach(p => p.scrollBy(0, 1500));
        window.scrollBy(0, 1500);
      });
      await new Promise(r => setTimeout(r, 600));
    }

    console.log(`Total collected Google Maps high-res photos: ${collectedImages.size}`);
    fs.writeFileSync('scripts/google-photos-full.json', JSON.stringify(Array.from(collectedImages), null, 2));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
}

main();
