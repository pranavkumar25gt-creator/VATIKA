import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

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

  const output = {
    overview: {},
    photos: [],
    menuCategories: []
  };

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // 1. Visit Photos page
    console.log('Navigating to Photos page...');
    await page.goto(`${BASE_URL}/photos`, { waitUntil: 'networkidle2', timeout: 35000 });
    
    // Scroll down to load lazy images in gallery
    for (let i = 0; i < 8; i++) {
      await page.evaluate(() => window.scrollBy(0, 1000));
      await new Promise(r => setTimeout(r, 800));
    }

    const photoData = await page.evaluate(() => {
      // Find all image elements on photos page
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => {
        let src = img.src || img.getAttribute('data-src') || '';
        // Zomato image URLs usually have sizing params like ?output-format=webp&fit=around|300:273
        // We can get higher-res by adjusting parameters
        return {
          src,
          alt: img.alt || '',
          width: img.naturalWidth,
          height: img.naturalHeight
        };
      }).filter(img => img.src && img.src.includes('b.zmtcdn.com/data/'));
    });

    console.log(`Found ${photoData.length} photo items in gallery!`);
    output.photos = photoData;

    // 2. Also check if there are sub-tabs like "Food", "Ambiance"
    const photoTabs = await page.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('a, button, div[role="tab"]'));
      return tabs.map(t => ({ text: t.innerText, href: t.getAttribute('href') })).filter(t => t.text && (t.text.includes('Food') || t.text.includes('Ambience') || t.text.includes('All')));
    });
    output.photoTabs = photoTabs;

    // 3. Visit Order page to extract entire menu with prices
    console.log('Navigating to Order/Menu page...');
    await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2', timeout: 35000 });

    // Scroll through the menu page to make sure all items render
    for (let i = 0; i < 15; i++) {
      await page.evaluate(() => window.scrollBy(0, 1500));
      await new Promise(r => setTimeout(r, 600));
    }

    const menuData = await page.evaluate(() => {
      const sections = [];
      // Look for section headers and items
      const h4s = Array.from(document.querySelectorAll('h4, h3, h2'));
      
      // Extract all dish cards
      // In Zomato's order page, items often have titles, price spans, descriptions, and sometimes item images
      const items = [];
      const itemNodes = Array.from(document.querySelectorAll('div[role="button"], div[class*="sc-"]'));
      
      // Alternatively, let's extract all text blocks containing currency ₹
      const allDivs = Array.from(document.querySelectorAll('div'));
      const parsedItems = [];
      const seen = new Set();

      allDivs.forEach(div => {
        // Find divs with a dish title (h4) and a price with ₹
        const h4 = div.querySelector('h4');
        const priceEl = Array.from(div.querySelectorAll('span, div')).find(el => el.innerText && el.innerText.trim().startsWith('₹'));
        const img = div.querySelector('img');

        if (h4 && priceEl) {
          const name = h4.innerText.trim();
          const price = priceEl.innerText.trim();
          const key = `${name}-${price}`;
          if (!seen.has(key) && name.length > 2 && name.length < 60) {
            seen.add(key);
            // Look for description
            const p = div.querySelector('p');
            const desc = p ? p.innerText.trim() : '';
            parsedItems.push({
              name,
              price,
              description: desc,
              imgSrc: img ? img.src : null
            });
          }
        }
      });

      return parsedItems;
    });

    console.log(`Extracted ${menuData.length} menu items!`);
    output.menuItems = menuData;

    // Write results
    fs.writeFileSync('scripts/zomato-complete-data.json', JSON.stringify(output, null, 2));
    console.log('Saved to scripts/zomato-complete-data.json');

  } catch (err) {
    console.error('Scraping error:', err);
  } finally {
    await browser.close();
  }
}

main();
