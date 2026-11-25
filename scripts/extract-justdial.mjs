import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const JUSTDIAL_URL = 'https://www.justdial.com/Parbhani/Hotel-Vatika-Opposite-Jain-Dadawadi-Near-MIDC-Vishavanath-Colony/999P2452-2452-140130121752-E4K6_BZDET/photos';

async function main() {
  console.log('Checking Justdial photos...');
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

    const collected = new Set();
    page.on('response', res => {
      const u = res.url();
      if (u.includes('images.jdmagicbox.com') && (u.includes('.jpg') || u.includes('.jpeg') || u.includes('.webp'))) {
        collected.add(u);
      }
    });

    await page.goto(JUSTDIAL_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    for (let i = 0; i < 6; i++) {
      await page.evaluate(() => window.scrollBy(0, 1000));
      await new Promise(r => setTimeout(r, 600));
    }

    const jdPhotos = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => img.src).filter(src => src && src.includes('images.jdmagicbox.com'));
    });

    console.log(`Justdial collected: ${collected.size} network, ${jdPhotos.length} DOM`);
    fs.writeFileSync('scripts/justdial-photos.json', JSON.stringify({
      network: Array.from(collected),
      dom: jdPhotos
    }, null, 2));

  } catch (err) {
    console.error('JD scrape error:', err.message);
  } finally {
    await browser.close();
  }
}

main();
