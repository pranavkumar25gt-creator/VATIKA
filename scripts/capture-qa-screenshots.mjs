import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://127.0.0.1:3000';
const OUTPUT_DIR = path.resolve('qa-screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runQA() {
  console.log('🚀 Launching Chrome for Multi-Device QA Screenshot Suite...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
    ],
  });

  const page = await browser.newPage();

  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.error('PAGE ERROR:', err.message));

  // Helper to wait
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // ==========================================
  // 1. DESKTOP VIEWPORT: 1440 x 900
  // ==========================================
  console.log('📸 Capturing Desktop Viewport (1440x900)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

  // Wait for micro-loader to complete (< 1.5s)
  await wait(1800);

  // 1.1 Desktop Hero
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01-desktop-hero-1440x900.png') });
  console.log('  ✓ 01-desktop-hero-1440x900.png');

  // 1.2 Desktop The Place (Scroll to #the-place)
  await page.evaluate(() => {
    document.getElementById('the-place')?.scrollIntoView({ behavior: 'instant' });
  });
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02-desktop-the-place.png') });
  console.log('  ✓ 02-desktop-the-place.png');

  // 1.3 Desktop The Food (Scroll to #the-food)
  await page.evaluate(() => {
    document.getElementById('the-food')?.scrollIntoView({ behavior: 'instant' });
  });
  await wait(1200);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03-desktop-the-food-3d.png') });
  console.log('  ✓ 03-desktop-the-food-3d.png');

  // 1.3b Desktop The Food Editorial Magazine Spread
  await page.evaluate(() => {
    window.scrollBy({ top: 480, behavior: 'instant' });
  });
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03b-desktop-food-editorial-grid.png') });
  console.log('  ✓ 03b-desktop-food-editorial-grid.png');

  // 1.4 Desktop Full Menu (Scroll to #full-menu)
  await page.evaluate(() => {
    document.getElementById('full-menu')?.scrollIntoView({ behavior: 'instant' });
  });
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04-desktop-full-menu.png') });
  console.log('  ✓ 04-desktop-full-menu.png');

  // 1.5 Desktop Celebrations (Scroll to #celebrations)
  await page.evaluate(() => {
    document.getElementById('celebrations')?.scrollIntoView({ behavior: 'instant' });
  });
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05-desktop-celebrations.png') });
  console.log('  ✓ 05-desktop-celebrations.png');

  // 1.6 Desktop Gallery (Scroll to #gallery)
  await page.evaluate(() => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'instant' });
  });
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06-desktop-gallery.png') });
  console.log('  ✓ 06-desktop-gallery.png');

  // 1.7 Desktop Visit & Dark Map (Scroll to #visit)
  await page.evaluate(() => {
    document.getElementById('visit')?.scrollIntoView({ behavior: 'instant' });
  });
  await wait(1000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07-desktop-visit-map.png') });
  console.log('  ✓ 07-desktop-visit-map.png');

  // ==========================================
  // 2. TABLET VIEWPORT: 820 x 1180
  // ==========================================
  console.log('📸 Capturing Tablet Viewport (820x1180)...');
  await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08-tablet-hero-820x1180.png') });
  console.log('  ✓ 08-tablet-hero-820x1180.png');

  // ==========================================
  // 3. MOBILE VIEWPORT: 390 x 844
  // ==========================================
  console.log('📸 Capturing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '09-mobile-hero-390x844.png') });
  console.log('  ✓ 09-mobile-hero-390x844.png');

  // 3.1 Mobile Menu Cards & Sticky Bottom Pill
  await page.evaluate(() => {
    document.getElementById('full-menu')?.scrollIntoView({ behavior: 'instant' });
  });
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '10-mobile-menu-390x844.png') });
  console.log('  ✓ 10-mobile-menu-390x844.png');

  // 3.2 Test Marathi Translation Toggle
  console.log('🌐 Testing Marathi (मराठी) Switch...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(400);

  // Click Marathi language button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const mrBtn = buttons.find((b) => b.textContent?.trim() === 'मराठी');
    if (mrBtn) mrBtn.click();
  });
  await wait(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '11-mobile-marathi-390x844.png') });
  console.log('  ✓ 11-mobile-marathi-390x844.png');

  await browser.close();
  console.log('🎉 All responsive QA screenshots captured successfully in qa-screenshots/');
}

runQA().catch((err) => {
  console.error(err);
  process.exit(1);
});
