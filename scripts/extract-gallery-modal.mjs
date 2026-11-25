import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'https://www.zomato.com/parbhani/hotel-vatika-1-parbhani-locality';

async function main() {
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
      if (u.includes('zmtcdn.com') && (u.includes('/pictures/') || u.includes('/dish_photos/') || u.includes('/reviews_photos/') || u.includes('/res_gallery/'))) {
        collectedImages.add(u);
      }
    });

    console.log('Navigating to dining overview...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 35000 });

    // Look for "View Gallery" button or link
    const viewGalleryBtn = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('a, button, div, span'));
      for (const el of els) {
        if (el.innerText && el.innerText.toLowerCase().includes('view gallery')) {
          el.click();
          return true;
        }
      }
      return false;
    });

    console.log('Clicked View Gallery button:', viewGalleryBtn);
    await new Promise(r => setTimeout(r, 4000));

    // Scroll gallery if modal opened
    for (let i = 0; i < 8; i++) {
      await page.evaluate(() => window.scrollBy(0, 1000));
      await new Promise(r => setTimeout(r, 500));
    }

    // Now visit Reviews page as well to get customer uploaded real photos of food & ambience
    console.log('Navigating to reviews page...');
    await page.goto(`${BASE_URL}/reviews`, { waitUntil: 'networkidle2', timeout: 35000 });
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 1000));
      await new Promise(r => setTimeout(r, 500));
    }

    console.log(`Total collected photos: ${collectedImages.size}`);
    fs.writeFileSync('scripts/zomato-collected-gallery.json', JSON.stringify(Array.from(collectedImages), null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
}

main();
