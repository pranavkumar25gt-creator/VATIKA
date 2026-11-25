import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://127.0.0.1:3000';
const OUT = path.resolve('qa-screenshots/hero-qa');
fs.mkdirSync(OUT, { recursive: true });

const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage();

  // Desktop 1440x900
  console.log('📸 Desktop 1440x900...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  await wait(2500); // let microloader fade + animations play
  await page.screenshot({ path: path.join(OUT, 'desktop-hero-1440x900.png') });
  console.log('  ✓ desktop-hero-1440x900.png');

  // Desktop — scroll down slightly to see bottom of hero
  await page.evaluate(() => window.scrollBy(0, 200));
  await wait(500);
  await page.screenshot({ path: path.join(OUT, 'desktop-hero-scrolled.png') });
  console.log('  ✓ desktop-hero-scrolled.png');

  // Mobile 390x844
  console.log('📱 Mobile 390x844...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  await wait(2500);
  await page.screenshot({ path: path.join(OUT, 'mobile-hero-390x844.png') });
  console.log('  ✓ mobile-hero-390x844.png');

  // Tablet 820x1180
  console.log('📱 Tablet 820x1180...');
  await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  await wait(2500);
  await page.screenshot({ path: path.join(OUT, 'tablet-hero-820x1180.png') });
  console.log('  ✓ tablet-hero-820x1180.png');

  await browser.close();
  console.log(`\n✅ All hero QA screenshots saved to ${OUT}`);
}

main().catch(e => { console.error(e); process.exit(1); });
