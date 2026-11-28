import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://127.0.0.1:3000';
const OUT = path.resolve('qa-screenshots/mobile-and-cart-qa');
fs.mkdirSync(OUT, { recursive: true });

const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function runQA() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage();

  // 1. MOBILE 390x844: HERO INITIAL
  console.log('📱 1. Mobile Hero Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  await wait(2200); // let loader fade
  await page.screenshot({ path: path.join(OUT, '01-mobile-hero-perfected.png') });
  console.log('  ✓ 01-mobile-hero-perfected.png');

  // 2. MOBILE: SCROLL TO MENU & ADD TO CART
  console.log('📱 2. Scroll to Menu & Add Item...');
  await page.evaluate(() => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'instant' });
  });
  await wait(800);
  await page.screenshot({ path: path.join(OUT, '02-mobile-menu-section.png') });
  console.log('  ✓ 02-mobile-menu-section.png');

  // Click ADD button on first dish
  console.log('🛒 3. Click ADD button on dish...');
  const addBtn = await page.$('button.uppercase font-mono');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const add = btns.find(b => b.textContent?.trim().includes('ADD'));
    if (add) add.click();
  });
  await wait(600);
  await page.screenshot({ path: path.join(OUT, '03-mobile-with-floating-cart.png') });
  console.log('  ✓ 03-mobile-with-floating-cart.png');

  // 3. MOBILE: OPEN CART DRAWER
  console.log('🛍️ 4. Open Drawer on Mobile...');
  await page.evaluate(() => {
    const cartBar = document.querySelector('aside button');
    if (cartBar) cartBar.click();
  });
  await wait(600);
  await page.screenshot({ path: path.join(OUT, '04-mobile-cart-drawer-open.png') });
  console.log('  ✓ 04-mobile-cart-drawer-open.png');

  // Close drawer
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close drawer"]');
    if (closeBtn) closeBtn.click();
  });
  await wait(500);

  // 4. MOBILE: SCROLL TO CELEBRATIONS & CHECK BACK TO TOP
  console.log('⬆️ 5. Scroll down to check Back To Top button...');
  await page.evaluate(() => window.scrollBy(0, 1600));
  await wait(600);
  await page.screenshot({ path: path.join(OUT, '05-mobile-back-to-top-visible.png') });
  console.log('  ✓ 05-mobile-back-to-top-visible.png');

  // Click Back to Top
  console.log('⬆️ 6. Click Back to Top...');
  await page.evaluate(() => {
    const btt = document.querySelector('button[aria-label="Back to top"]');
    if (btt) btt.click();
  });
  await wait(1400); // let smooth scroll finish
  await page.screenshot({ path: path.join(OUT, '06-mobile-scrolled-back-to-hero.png') });
  console.log('  ✓ 06-mobile-scrolled-back-to-hero.png');

  // 5. DESKTOP 1440x900: NAVBAR MENU CLICK TEST
  console.log('🖥️ 7. Desktop Navbar Menu Link Test (1440x900)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  await wait(2200);

  // Click the MENU link in desktop Navbar
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('header nav a'));
    const menuLink = links.find(a => a.textContent?.trim().toUpperCase() === 'MENU');
    if (menuLink) menuLink.click();
  });
  await wait(1400); // let smooth scroll finish
  await page.screenshot({ path: path.join(OUT, '07-desktop-menu-nav-clicked.png') });
  console.log('  ✓ 07-desktop-menu-nav-clicked.png');

  // Add item on desktop and capture floating cart
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const add = btns.find(b => b.textContent?.trim().includes('ADD'));
    if (add) add.click();
  });
  await wait(600);
  await page.screenshot({ path: path.join(OUT, '08-desktop-with-floating-cart.png') });
  console.log('  ✓ 08-desktop-with-floating-cart.png');

  await browser.close();
  console.log('\n✅ All visual tests completed successfully!');
}

runQA().catch(e => { console.error(e); process.exit(1); });
