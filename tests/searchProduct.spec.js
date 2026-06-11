import { test, expect } from '@playwright/test';

test('(TC6001) ค้นหาสินค้าด้วยคำค้นหาเเละเลือกเงื่อนไขกรองสินค้า เช่น หมวดหมู่ ช่วงราคา', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/');
  await page.waitForLoadState('domcontentloaded');
  await page.locator('[data-test="search"]').click();
  await page.locator('[data-test="search-input"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="search-input"]').fill('น้ำ');
  await page.locator('[data-test="search-input"]').press('Enter');
  await page.locator('[data-test="input-min-price"]').fill('100');
  await page.locator('[data-test="input-max-price"]').click();
  await page.locator('[data-test="input-max-price"]').fill('500');
  await page.locator('[data-test="input-min-price"]').click();
  
});
