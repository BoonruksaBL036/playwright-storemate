import { test, expect } from '../custom-test.js';

test('(TC17001) สั่งซื้อสินค้าจากหน้ารายละเอียดสินค้าและตรวจสอบรายการสรุปคำสั่งซื้อ ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/address-profile');
    const profileAddress = (
    await page.locator('[data-test="address-detail"]').textContent())?.trim();
    expect(profileAddress).toBeTruthy();
    await page.goto('https://storemate-final.vercel.app/');
    await page.locator('[data-test="product-card"][href="/product/28"]').waitFor({ state: 'visible' });
    await page.locator('[data-test="product-card"][href="/product/28"]').click();
    await page.locator('[data-test="btn-increase"]').click();
    await page.locator('[data-test="btn-buy-cart"]').click();
    await expect(page).toHaveURL(/payment/);
    await expect(page.locator('[data-test="shipping-address"]')).not.toContainText('ยังไม่มีข้อมูลที่อยู่');
    const paymentAddress = (
    await page.locator('[data-test="address"]').textContent())?.trim();
    expect(paymentAddress).toContain(profileAddress);
    await expect(page.locator('[data-test="order-item"]')).toBeVisible();
    await expect(page.locator('[data-test="product-name"]')).toContainText('น้ำมะม่วงหาวมะนาว สูตรผสมคอลลาเจน');
    await expect(page.locator('[data-test="order-item"]')).toContainText('2');
    await expect(page.locator('[data-test="order-item"]').getByText('฿ 70')).toBeVisible();
    await expect(page.locator('[data-test="payment-method"]')).toBeVisible();
    await expect(page.locator('[data-test="payment-method"]')).toContainText('พร้อมเพย์ (PromptPay)');
    await expect(page.locator('[data-test="payment-method"]')).toContainText('บัตรเครดิต / บัตรเดบิต');
    await expect(page.locator('[data-test="payment-method"]')).toContainText('เก็บเงินปลายทาง');
    await expect(page.locator('[data-test="order-total-price-desktop"]')).toHaveText('฿ 70');
    await expect(page.locator('[data-test="btn-confirm-payment-desktop"]')).toBeVisible();
  });
    

test('(TC17002) เพื่อสั่งซื้อสินค้าจากรถเข็นสินค้าและตรวจสอบรายการสรุปคำสั่งซื้อ  ', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/address-profile');
    const profileAddress = (
    await page.locator('[data-test="address-detail"]').textContent())?.trim();
    expect(profileAddress).toBeTruthy();
  await page.goto('https://storemate-final.vercel.app/shopping-cart');
  await page.waitForLoadState('domcontentloaded');
  await page.locator('[data-test="checkbox-product-28"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="increase-product"]').first().click();
  await page.locator('[data-test="checkbox-product-28"]').click();
  await page.locator('[data-test="btn-payment"]').click();
  await expect(page).toHaveURL(/payment/);
    await expect(page.locator('[data-test="shipping-address"]')).not.toContainText('ยังไม่มีข้อมูลที่อยู่');
    const paymentAddress = (
    await page.locator('[data-test="address"]').textContent())?.trim();
    expect(paymentAddress).toContain(profileAddress);
    await expect(page.locator('[data-test="order-item"]')).toBeVisible();
    await expect(page.locator('[data-test="product-name"]')).toContainText('น้ำมะม่วงหาวมะนาว สูตรผสมคอลลาเจน');
    await expect(page.locator('[data-test="order-item"]')).toContainText('2');
    await expect(page.locator('[data-test="order-item"]').getByText('฿ 70')).toBeVisible();
    await expect(page.locator('[data-test="payment-method"]')).toBeVisible();
    await expect(page.locator('[data-test="payment-method"]')).toContainText('พร้อมเพย์ (PromptPay)');
    await expect(page.locator('[data-test="payment-method"]')).toContainText('บัตรเครดิต / บัตรเดบิต');
    await expect(page.locator('[data-test="payment-method"]')).toContainText('เก็บเงินปลายทาง');
    await expect(page.locator('[data-test="order-total-price-desktop"]')).toHaveText('฿ 70');
    await expect(page.locator('[data-test="btn-confirm-payment-desktop"]')).toBeVisible();
});

test('(TC17003) ผู้ใช้ย้อนกลับจาก หน้าสรุปคำสั่งซื้อ ที่มาจากหน้ารถเข็นสินค้า  ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/shopping-cart');
  await page.waitForLoadState('domcontentloaded');
  await page.locator('[data-test="checkbox-product-28"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="checkbox-product-28"]').click();
  const itemCount = await page.locator('[data-test="item-quantity"]').count();
  await page.locator('[data-test="btn-payment"]').click();
  await expect(page).toHaveURL(/payment/);
  await page.locator('a[href="/shopping-cart"]').click();
  await expect(page).toHaveURL(/shopping-cart/);
  await expect(page.locator('[data-test="item-quantity"]')).toHaveCount(itemCount);
});

test('(TC17004) ผู้ใช้ย้อนกลับจาก หน้าสรุปคำสั่งซื้อ ที่มาจากหน้ารายละเอียดสินค้า   ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/product/28');
  await page.waitForLoadState('domcontentloaded');
  const stock = await page.locator('span').filter({ hasText: 'มีสินค้าทั้งหมด' }).textContent();
  await page.locator('[data-test="btn-buy-cart"]').click();
  await expect(page).toHaveURL(/payment/);
  await page.goBack();
  await expect(page).toHaveURL(/product\/28/);
await expect(page.locator('span').filter({ hasText: 'มีสินค้าทั้งหมด' })).toHaveText(stock);
});