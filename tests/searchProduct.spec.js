import { test, expect } from '../custom-test.js';

test('(TC6001) การค้นหาสินค้าด้วย Keyword ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/search');
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="input-search"]').click();
  await page.locator('[data-test="input-search"]').fill('แชมพู');
  await page.locator('[data-test="apply-price-filter"]').click();
  
  await expect(page.locator('[data-test="product-card"]').first()).toBeVisible()
   await expect(async () => {
  const resultText = await page
    .locator('[data-test="filteredProduct"]')
    .textContent();

  const displayedCount = Number(resultText.match(/\d+/)[0]);

  const actualCount = await page
    .locator('[data-test="product-card"]:visible')
    .count();

  expect(actualCount).toBe(displayedCount);
}).toPass();
});

test('(TC6002) การค้นหาสินค้าโดยใช้หมวดหมู่แบบไม่ระบุ Keyword', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/search');
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="category-drink"]').click();
  await page.locator('[data-test="apply-price-filter"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="apply-price-filter"]').click();
});

test('(TC6003) ไม่พบรายการสินค้าที่ค้นหา ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/search');
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="input-search"]').fill('มือถือ');
  await page.locator('[data-test="apply-price-filter"]').click();
  await expect(page.getByText('ไม่พบสินค้าที่คุณค้นหา')).toBeVisible();
});

test('(TC6004) การกรองสินค้าด้วยช่วงราคา  ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/search');
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="input-min-price"]').click();
  await page.locator('[data-test="input-min-price"]').fill('35');
  await page.locator('[data-test="input-max-price"]').click();
  await page.locator('[data-test="input-max-price"]').fill('500');
  await page.locator('[data-test="apply-price-filter"]').click();
  
  await page.waitForLoadState('networkidle');

  const prices = await page.locator('p.font-bold.text-blue-500').allTextContents()
  expect(prices.length).toBeGreaterThan(0);

  for (const priceText of prices) {

    const price = Number(
      priceText.replace(/[^\d]/g, '')
    );

    expect(price).toBeGreaterThanOrEqual(35);

    expect(price).toBeLessThanOrEqual(500);
  }
});
