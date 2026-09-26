/* capture.js — deterministic frame capture for Gray UI ad v2
   usage: node capture.js stills   → renders review stills into stills/
          node capture.js [start] [end] → renders frames f%04d.png for
          frame indices [start..end) (default full 0..720), skipping existing. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const FPS = 15, DUR = 48.0, TOTAL = Math.round(FPS * DUR); // 720
const OUT = path.join(__dirname, 'frames');
const STILLS = path.join(__dirname, 'stills');

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(STILLS, { recursive: true });
  const browser = await chromium.launch({ args: ['--force-device-scale-factor=1'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('file://' + path.join(__dirname, 'frame.html'));
  await page.waitForTimeout(400);

  const mode = process.argv[2] || '';
  const jobs = [];
  if (mode === 'stills') {
    const times = [0.2, 1.4, 2.2, 3.2, 4.2, 6.2, 8.2, 9.6, 11.0, 12.2, 13.6, 15.4, 16.9, 17.6, 19.0, 20.4, 21.8, 23.0, 24.4, 25.8, 27.6, 29.0, 30.6, 31.9, 33.2, 34.6, 36.4, 37.6, 39.0, 40.2, 41.4, 42.8, 43.8, 45.0, 46.2, 47.5];
    times.forEach((t, i) => jobs.push({ t, file: path.join(STILLS, `s${String(i).padStart(2, '0')}.png`) }));
  } else {
    let start = parseInt(process.argv[2] || '0', 10);
    let end = parseInt(process.argv[3] || String(TOTAL), 10);
    for (let i = start; i < end; i++) {
      const f = path.join(OUT, `f${String(i).padStart(4, '0')}.png`);
      if (fs.existsSync(f) && fs.statSync(f).size > 0) continue;
      jobs.push({ t: i / FPS, file: f });
    }
  }

  let n = 0;
  for (const j of jobs) {
    await page.evaluate((t) => { render(t); }, j.t);
    await page.screenshot({ path: j.file, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    n++;
    if (n % 50 === 0) console.log(`captured ${n}/${jobs.length}`);
  }
  console.log(`done: ${n} frames (${jobs.length} total jobs)`);
  await browser.close();
}
main().catch(e => { console.error(e); process.exit(1); });
