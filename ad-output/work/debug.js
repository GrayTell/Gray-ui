const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', e => console.log('PAGEERROR:', e.message));
  page.on('console', m => console.log('CONSOLE:', m.type(), m.text()));
  await page.goto('file://' + path.join(__dirname, 'frame.html'));
  await page.waitForTimeout(300);
  const res = await page.evaluate(() => {
    try {
      render(2.2);
      const c = document.getElementById('c');
      const d = c.getContext('2d').getImageData(960, 400, 1, 1).data;
      return { ok: true, pixel: Array.from(d) };
    } catch (e) {
      return { ok: false, err: e.message, stack: e.stack };
    }
  });
  console.log(JSON.stringify(res));
  await browser.close();
})();
