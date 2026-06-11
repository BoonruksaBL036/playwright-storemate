import { test, expect } from '@playwright/test';

test('test login success', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/shopping-cart');
  await page.waitForLoadState('domcontentloaded');
  await page.locator('[data-test="checkbox-product-24"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="checkbox-product-24"]').click();
  await page.locator('[data-test="btn-payment"]').click();
  await expect(page).toHaveURL(/payment/);
 await page.locator('data-test="btn-select-payment-method-mobile"]').click();
});

