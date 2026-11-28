import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://127.0.0.1:3000';
const OUT = path.resolve('qa-screenshots/mobile-hero-fulfilled');
fs.mkdirSync(OUT, { recursive: true });

const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage();

  // iPhone 14 / 15 / 16 (390x844, DPR: 3)
  console.log('📱 Capturing iPhone Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  await wait(2200);

  await page.screenshot({ path: path.join(OUT, 'iphone-hero-fulfilled.png') });
  console.log('  ✓ iphone-hero-fulfilled.png');

  // Small phone viewport (375x667, iPhone SE)
  console.log('📱 Capturing iPhone SE Viewport (375x667)...');
  await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  await wait(1800);

  await page.screenshot({ path: path.join(OUT, 'iphone-se-hero-fulfilled.png') });
  console.log('  ✓ iphone-se-hero-fulfilled.png');

  await browser.close();
  console.log('✅ Done!');
}

capture().catch(e => { console.error(e); process.exit(1); });
