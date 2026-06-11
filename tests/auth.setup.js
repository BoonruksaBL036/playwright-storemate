import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
 await page.goto('https://storemate-final.vercel.app/');
  await page.waitForLoadState('domcontentloaded'); //รอหน้าเว็บโหลดเสร็จก่อนคลิปล้อกอิน  
  await page.locator('[data-test="login-btn"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="login-btn"]').click();
  await page.locator('[data-test="email"]').fill('664259036@webmail.npru.ac.th');
  await page.locator('[data-test="password"]').fill('Boon1234');
  await page.locator('[data-test="btn-submit"]').click();
  await expect(page.getByRole('status')).toContainText('เข้าสู่ระบบสำเร็จ');
  await page.screenshot({ path: 'login-success.png' });

  await page.context().storageState({ path: authFile });
});