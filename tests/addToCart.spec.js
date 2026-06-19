import { test, expect } from '../custom-test.js';

test('(TC8001) ผู้ใช้งานสามารถเพิ่มสินค้าเข้ารถเข็นได้สำเร็จ ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง')).toBeVisible();
  await page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง').click();
  await page.locator('[data-test="btn-add-to-cart"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="btn-add-to-cart"]').click();
  await expect(page.getByRole('status')).toContainText('เพิ่มสินค้าเข้ารถเข็นเรียบร้อยแล้ว');
  await expect(page.locator('[data-test="click-shop-cart"]')).toHaveText('1');
});

test('(TC8002) บังคับ Login ก่อนเพิ่มสินค้าเข้ารถเข็น ', async ({ page,context }) => {
  await context.clearCookies();
  await page.goto('https://storemate-final.vercel.app/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง')).toBeVisible();
  await page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง').click();
  await page.locator('[data-test="btn-add-to-cart"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="btn-add-to-cart"]').click();
  await expect(page.getByRole('status')).toContainText('กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงรถเข็น');
  await expect(page).toHaveURL(/login/);
});

test('(TC8003) จำนวนสินค้าในสต็อกไม่เพียงพอเข้ารถเข็น ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง')).toBeVisible();
  await page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง').click();
  await page.locator('[data-test="btn-add-to-cart"]').waitFor({ state: 'visible' });
  
  for (let i = 0; i < 9; i++) {
    await page.locator('[data-test="btn-increase"]').click();
  }

 await expect(page.getByText('จำนวนสินค้าในสต็อกไม่เพียงพอ').first()).toBeVisible();
});

test('(TC8004) เพิ่มสินค้าเกินจำนวนที่มีอยู่ในสต็อก ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง')).toBeVisible();
  await page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง').click();
  await page.locator('[data-test="btn-add-to-cart"]').waitFor({ state: 'visible' });
  for (let i = 0; i < 4; i++) {
    await page.locator('[data-test="btn-increase"]').click();
  }
  await page.locator('[data-test="btn-add-to-cart"]').click();

 await expect(page.getByText('ไม่สามารถเพิ่มจำนวนสินค้าได้ เนื่องจากคุณเพิ่มสินค้านี้ไว้ในรถเข็นเเล้ว 2 ชิ้น').first()).toBeVisible();
 await page.goto('https://storemate-final.vercel.app/shopping-cart'); 
 await expect(page.locator('[data-test="item-quantity"]')).toHaveText('2');

});