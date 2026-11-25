import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://127.0.0.1:3000';
const OUTPUT_DIR = path.resolve('qa-screenshots');

async function captureScrollSuite() {
  console.log('🎬 Capturing 3D ScrollTrigger Cinema Feature Across Viewports...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage();
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // ==========================================
  // 1. DESKTOP 1440x900: CHAPTERS 1, 2, & 3
  // ==========================================
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await wait(1500); // Allow microloader to fade out

  // Chapter 1: Initial Arrival & Masthead (scroll 0px)
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01-3d-scroll-chapter1-arrival.png') });
  console.log('  ✓ 01-3d-scroll-chapter1-arrival.png');

  // Chapter 2: Mid-Dolly Sanctuary (scroll ~1000px down in pinned hero)
  await page.evaluate(() => window.scrollTo({ top: 1100, behavior: 'instant' }));
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02-3d-scroll-chapter2-sanctuary.png') });
  console.log('  ✓ 02-3d-scroll-chapter2-sanctuary.png');

  // Chapter 3: Deep Dolly Feast & CTAs (scroll ~2000px down in pinned hero)
  await page.evaluate(() => window.scrollTo({ top: 2100, behavior: 'instant' }));
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03-3d-scroll-chapter3-feast.png') });
  console.log('  ✓ 03-3d-scroll-chapter3-feast.png');

  // ==========================================
  // 2. MOBILE 390x844: 3D SCROLL TRIGGER
  // ==========================================
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04-mobile-3d-scroll-hero.png') });
  console.log('  ✓ 04-mobile-3d-scroll-hero.png');

  // Mobile mid-scrub
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
  await wait(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05-mobile-3d-scroll-mid.png') });
  console.log('  ✓ 05-mobile-3d-scroll-mid.png');

  await browser.close();
  console.log('🎉 3D ScrollTrigger feature screenshots captured successfully!');
}

captureScrollSuite().catch(console.error);
