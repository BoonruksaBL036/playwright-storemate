import { test, expect } from '../custom-test.js';

test('(TC9001) เพิ่มจำนวนสินค้าในรถเข็นสำเร็จ  ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/shopping-cart');
  await page.waitForLoadState('networkidle');

    const quantityLocator = page.locator('[data-test="item-quantity"]').first();

  const oldQuantity = Number(
    await quantityLocator.textContent()
  );

  const oldSubtotal = Number(
    (await page.locator('[data-test="subtotal-product"]').first().textContent())
      .replace(/[^\d]/g, '')
  );

  await page.locator('[data-test="increase-product"]').first().click();

  await expect(quantityLocator).toHaveText(
    String(oldQuantity + 1)
  );

  const newSubtotal = Number(
    (await page.locator('[data-test="subtotal-product"]').first().textContent())
      .replace(/[^\d]/g, '')
  );

  expect(newSubtotal).toBeGreaterThan(oldSubtotal);
});

test('(TC9002) เพิ่มจำนวนสินค้าเกินจำนวนสต็อก', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/shopping-cart');
  await page.waitForLoadState('networkidle');

  const quantityLocator = page.locator('[data-test="item-quantity"]').first();
  const increaseBtn = page.locator('[data-test="increase-product"]').first();

  let previousQty = Number(await quantityLocator.textContent());

  for (let i = 0; i < 150; i++) {
    await increaseBtn.click();

    const errorMessage = page.getByText(
      'ขออภัย สินค้าชิ้นนี้มีจำนวนจำกัดในคลังไม่สามารถเพิ่มได้'
    );

    if (await errorMessage.isVisible().catch(() => false)) {
      break;
    }

    previousQty = Number(await quantityLocator.textContent());
  }

  await expect(page.getByText('ขออภัย สินค้าชิ้นนี้มีจำนวนจำกัดในคลังไม่สามารถเพิ่มได้')).toBeVisible();

  const qtyBefore = Number(await quantityLocator.textContent());

  await increaseBtn.click();

  await expect(quantityLocator).toHaveText(String(qtyBefore));
});

test('(TC9003) ลดจำนวนสินค้าในรถเข็นสำเร็จ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/shopping-cart');
  await page.waitForLoadState('networkidle');

  const quantityLocator = page.locator('[data-test="item-quantity"]').first();

  const oldQuantity = Number(
    await quantityLocator.textContent()
  );

  const oldSubtotal = Number(
    (await page
      .locator('[data-test="subtotal-product"]')
      .first()
      .textContent())
      .replace(/[^\d]/g, '')
  );

  await page.locator('[data-test="decrease-product"]').first().click();

  await expect(quantityLocator).toHaveText(
    String(oldQuantity - 1)
  );

  const newSubtotal = Number(
    (await page
      .locator('[data-test="subtotal-product"]')
      .first()
      .textContent())
      .replace(/[^\d]/g, '')
  );

  expect(newSubtotal).toBeLessThan(oldSubtotal);
});

test('(TC9004) ลดจำนวนสินค้าจนเหลือ 0 ชิ้น', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/shopping-cart');

  const quantity = page.locator('[data-test="item-quantity"]').first();
  const decreaseBtn = page.locator('[data-test="decrease-product"]').first();

  while ((await quantity.textContent()) !== '1') {
    await decreaseBtn.click();
  }

await expect(quantity).toHaveText('1');

await decreaseBtn.click();

  await expect(
    page.getByText('คุณต้องการลบสินค้านี้ใช่หรือไม่?')
  ).toBeVisible();
});

test('(TC9005) ลบสินค้าออกจากรถเข็นสำเร็จ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/shopping-cart');
  await page.waitForLoadState('networkidle');

  const cartCountBefore = Number(
    await page.locator('[data-test="click-shop-cart"]').textContent()
  );

  await page
    .locator('[data-test="btn-remove-item"]')
    .first()
    .click();

  await expect(
    page.getByText('คุณต้องการลบสินค้านี้ใช่หรือไม่?')
  ).toBeVisible();

  await page.getByRole('button', { name: 'ยืนยัน' }).click();

  await expect(
    page.getByText('ลบสินค้าแล้ว')
  ).toBeVisible();

 await expect(
    page.locator('[data-test="click-shop-cart"]')
  ).toHaveText(String(cartCountBefore - 1));
});

test('(TC9006) ลบสินค้าออกทั้งหมดสำเร็จ ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/shopping-cart');
  await page.waitForLoadState('networkidle');

  await page.locator('[data-test="radio-all-product"]').click();

  await page.getByRole('button', { name: 'ลบออกทั้งหมด' }).click();

  await page.getByRole('button', { name: 'ยืนยัน' }).first().click();

  await expect(
    page.getByText('ลบสินค้าสำเร็จ')
  ).toBeVisible();

  await expect(
    page.getByText('ไม่มีสินค้าในรถเข็น')
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'เลือกซื้อสินค้า' })
  ).toBeVisible();
});

test('(TC9007) กดลบออกทั้งหมดโดยไม่เลือกสินค้า  ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/shopping-cart');
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'ลบออกทั้งหมด' }).click();

  await expect(
    page.getByText('กรุณาเลือกสินค้าก่อน')
  ).toBeVisible();

});