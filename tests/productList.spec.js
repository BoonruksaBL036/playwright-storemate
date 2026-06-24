import { test, expect } from '../custom-test.js'; 

test('(TC5001) ดูรายการสินค้าตามหมวดหมู่ ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app');
  await page.waitForLoadState('networkidle');
   const categories = [
    'promotion-section',
    'soap-section',
    'drinks-section',
    'shampoo-section',
  ]
  for (const category of categories) {

    const categorySection = page.locator(`[id="${category}"]`);
    await expect(categorySection).toBeVisible();
  
    const products = categorySection.locator('[data-test="product-card"]');
    await products.first().waitFor({ state: 'visible' });

    const productCount = await products.count();

    expect(productCount).toBeGreaterThan(0);

    expect(productCount).toBeLessThanOrEqual(4);
  }

});

test('(TC5002 การแสดงข้อความเเจ้งเตือนเมื่อไม่มีสินค้าในหมวดหมู่  ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app');
  await page.waitForLoadState('networkidle');
  await page.locator('[id="soap-section"]').waitFor({ state: 'visible' });
  await expect(page.locator('[id="soap-section"]')).toContainText('ไม่พบรายการสินค้า');
});

