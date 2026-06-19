import { test, expect } from '../custom-test.js';

test('(TC1001) การสมัครสมาชิก ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/');
  await page.waitForLoadState('domcontentloaded');
  await page.locator('[data-test="register-btn"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="register-btn"]').click();
  await page.locator('[data-test="reg-input-name"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="reg-input-name"]').fill('บีแอล หัดทำออโต้เทส');
  await page.locator('[data-test="reg-input-email"]').fill('664259036@webmail.npru.ac.th');
  await page.locator('[data-test="reg-input-phone"]').fill('0820629500');
  await page.locator('[data-test="reg-input-password"]').fill('Boon1234');
  await page.locator('[data-test="reg-input-confirm"]').fill('Boon1234');
  await page.locator('[data-test="btn-register-submit"]').click();
  await expect(page.getByText('ลงทะเบียนสำเร็จ')).toBeVisible();
  await expect(page).toHaveURL('https://storemate-final.vercel.app/login');
  await expect(page.locator('[data-test="btn-submit"]')).toBeVisible();
});


test('(TC1002) การสมัครสมาชิกไม่สำเร็จโดยดารกรอกข้อมูลไม่ครบหรือไม่กรอกทั้งหมด', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/');
  await page.waitForLoadState('domcontentloaded');
  await page.locator('[data-test="register-btn"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="register-btn"]').click();
  await page.locator('[data-test="reg-input-name"]').waitFor({ state: 'visible' });
  await page.locator('[data-test="reg-input-name"]').fill('');
  await page.locator('[data-test="reg-input-email"]').fill('');
  await page.locator('[data-test="reg-input-phone"]').fill('');
  await page.locator('[data-test="reg-input-password"]').fill('');
  await page.locator('[data-test="reg-input-confirm"]').fill('');
  await page.locator('[data-test="btn-register-submit"]').click();
  await expect(page.getByText('กรุณากรอกชื่อ-นามสกุล')).toBeVisible();
  await expect(page.getByText('กรุณากรอกอีเมล')).toBeVisible();
  await expect(page.getByText('กรุณากรอกเบอร์โทรศัพท์')).toBeVisible();
  await expect(page.getByText('กรุณากรอกรหัสผ่าน')).toBeVisible();
  await expect(page.getByText('กรุณายืนยันรหัสผ่าน')).toBeVisible();
});
