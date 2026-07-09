import { test, expect } from '../custom-test.js';

test('(TC18001) ชำระเงินแบบเก็บเงินปลายทาง (COD) สำเร็จ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/product/28');
  await page.locator('[data-test="btn-buy-cart"]').click();
  await expect(page).toHaveURL(/payment/);
  await page.locator('[data-test="select-destination-desktop"]').click();
  await page.locator('[data-test="btn-confirm-payment-desktop"]').click();
  await expect(page.getByText('คำสั่งซื้อสำเร็จ')).toBeVisible();
  await expect(page).toHaveURL(/orders/);
});

test('(TC18002) ชำระเงินด้วยบัตรเครดิต/เดบิตสำเร็จ  สำเร็จ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/product/30');
  await page.locator('[data-test="btn-buy-cart"]').click();
  await expect(page).toHaveURL(/payment/);
  await page.locator('[data-test="select-credit-desktop"]').click();
  await page.locator('[data-test="btn-add-credit-card-desktop"]').click();
  
  await expect(page).toHaveURL(/add-credit-card/);
  await page.locator('[data-test="card-name-input"]').fill('บุญรักษา วินานนท์');
  await page.locator('[data-test="card-number-input"]').frameLocator('iframe').getByRole('textbox').fill('4242424242424242');
  await page.locator('[data-test="card-expiry-input"]').frameLocator('iframe').getByRole('textbox').fill('12/29');
  await page.locator('[data-test="card-cvc-input"]').frameLocator('iframe').getByRole('textbox').fill('234');
  await page.locator('[data-test="confirm-add-card-btn"]').click();
  await page.locator('[data-test="select-credit-desktop"]').click();
  await page.locator('[data-test="btn-select-card-method-desktop"]').click();
  await page.locator('[data-test="btn-confirm-payment-desktop"]').click();
  await expect(page.getByRole('status').filter({ hasText: 'คำสั่งซื้อสำเร็จ' })).toBeVisible();
  await expect(page).toHaveURL(/orders/);
});

