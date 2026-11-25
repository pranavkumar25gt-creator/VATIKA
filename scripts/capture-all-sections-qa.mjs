import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://127.0.0.1:3000';
const OUTPUT_DIR = path.resolve('qa-screenshots');

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage();
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // 1. Desktop 1440x900 - Full walkthrough of all sections
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await wait(1500);

  // The Place
  await page.evaluate(() => document.getElementById('the-place')?.scrollIntoView({ behavior: 'instant' }));
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02-desktop-the-place.png') });
  console.log('✓ 02-desktop-the-place.png');

  // The Food
  await page.evaluate(() => document.getElementById('the-food')?.scrollIntoView({ behavior: 'instant' }));
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03-desktop-the-food-3d.png') });
  console.log('✓ 03-desktop-the-food-3d.png');

  // Menu Section
  await page.evaluate(() => document.getElementById('menu')?.scrollIntoView({ behavior: 'instant' }));
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04-desktop-full-menu.png') });
  console.log('✓ 04-desktop-full-menu.png');

  // Celebrations
  await page.evaluate(() => document.getElementById('celebrations')?.scrollIntoView({ behavior: 'instant' }));
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05-desktop-celebrations.png') });
  console.log('✓ 05-desktop-celebrations.png');

  // Gallery
  await page.evaluate(() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'instant' }));
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06-desktop-gallery.png') });
  console.log('✓ 06-desktop-gallery.png');

  // Visit
  await page.evaluate(() => document.getElementById('visit')?.scrollIntoView({ behavior: 'instant' }));
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07-desktop-visit-map.png') });
  console.log('✓ 07-desktop-visit-map.png');

  // 2. Tablet 820x1180
  await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08-tablet-hero-820x1180.png') });
  console.log('✓ 08-tablet-hero-820x1180.png');

  // 3. Mobile 390x844
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '09-mobile-hero-390x844.png') });
  console.log('✓ 09-mobile-hero-390x844.png');

  // Mobile Menu
  await page.evaluate(() => document.getElementById('menu')?.scrollIntoView({ behavior: 'instant' }));
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '10-mobile-menu-390x844.png') });
  console.log('✓ 10-mobile-menu-390x844.png');

  // 4. Mobile Marathi switch
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const mrBtn = btns.find(b => b.innerText && b.innerText.includes('मराठी'));
    if (mrBtn) mrBtn.click();
  });
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '11-mobile-marathi-390x844.png') });
  console.log('✓ 11-mobile-marathi-390x844.png');

  await browser.close();
  console.log('🎉 Comprehensive visual QA suite captured successfully!');
}

main().catch(console.error);
