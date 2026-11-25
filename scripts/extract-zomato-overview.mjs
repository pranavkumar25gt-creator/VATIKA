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

    console.log('Navigating to Dining Overview page...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 35000 });

    // Scroll to load all sections
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 800));
      await new Promise(r => setTimeout(r, 500));
    }

    const overviewData = await page.evaluate(() => {
      const allImgs = Array.from(document.querySelectorAll('img')).map(img => {
        let src = img.src || img.getAttribute('data-src') || '';
        return {
          src,
          alt: img.alt || '',
          width: img.naturalWidth,
          height: img.naturalHeight
        };
      }).filter(img => img.src && (img.src.includes('data/pictures') || img.src.includes('data/reviews_photos') || img.src.includes('data/dish_photos') || img.src.includes('data/res_gallery')));

      const allLinks = Array.from(document.querySelectorAll('a')).map(a => ({
        text: a.innerText,
        href: a.href
      })).filter(a => a.href && (a.href.includes('/photos') || a.href.includes('/menu') || a.href.includes('/reviews')));

      return {
        allImgs,
        allLinks,
        text: document.body.innerText.slice(0, 3000)
      };
    });

    console.log(`Found ${overviewData.allImgs.length} images on dining overview!`);
    fs.writeFileSync('scripts/zomato-overview.json', JSON.stringify(overviewData, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
}

main();
