import { test, expect } from '@playwright/test';

test('(TC)', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/');
  await page.waitForLoadState('domcontentloaded');
  await page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง').waitFor({ state: 'visible' });
  await expect(page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง')).toBeVisible();
  await page.getByText('น้ำมะม่วงหาวมะนาวโห่ สูตรไม่มีน้ำตาล 30 ขวด ตราพัดทอง').click();
  await page.locator('[data-test="btn-add-to-cart"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="btn-add-to-cart"]').click();
  await expect(page.getByRole('status')).toContainText('เพิ่มสินค้าเข้ารถเข็นเรียบร้อยแล้ว');
});