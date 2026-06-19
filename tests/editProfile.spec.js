import { test, expect } from '../custom-test.js';

test('(TC12001) ผู้ใช้งานสามารถแก้ไขข้อมูลโปรไฟล์ได้สำเร็จ', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('[data-test="btn-change-name"]').waitFor({ state: 'visible' });
    await page.locator('[data-test="btn-change-name"]').click();
    await page.locator('[data-test="input-name"]').fill('Somchai Jaidee ');
    await page.locator('[data-test="edit-modal-save-button"]').click();
    await expect(page.getByText('แก้ไขข้อมูลโปรไฟล์สำเร็จ')).toBeVisible();
    await expect(page.locator('[data-test="profile-name"]')).toContainText('Somchai Jaidee');

    // await page.locator('[data-test="btn-change-email"]').waitFor({ state: 'visible' });
    // await page.locator('[data-test="btn-change-email"]').click();
    // await page.locator('[data-test="input-email"]').fill('somchai@gmail.com');
    // await page.locator('[data-test="edit-modal-save-button"]').click();
    // await expect(page.getByText('แก้ไขข้อมูลโปรไฟล์สำเร็จ')).toBeVisible();
    

    await page.locator('[data-test="btn-change-phone"]').waitFor({ state: 'visible' });
    await page.locator('[data-test="btn-change-phone"]').click();
    await page.locator('[data-test="input-phone"]').fill('0820629587');
    await page.locator('[data-test="edit-modal-save-button"]').click();
    await expect(page.getByText('แก้ไขข้อมูลโปรไฟล์สำเร็จ')).toBeVisible();
    await expect(page.locator('[data-test="profile-phone"]')).toContainText('********87');

});

test('(TC12002) ผู้ใช้งานสามารถแก้ไขข้อมูลโปรไฟล์อีเมล', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    await page.locator('[data-test="btn-change-email"]').waitFor({ state: 'visible' });
    await page.locator('[data-test="btn-change-email"]').click();
    await page.locator('[data-test="input-email"]').fill('664259005@webmail.npru.ac.th');
    await page.locator('[data-test="edit-modal-save-button"]').click();
    await expect(page.getByText('แก้ไขข้อมูลโปรไฟล์สำเร็จ')).toBeVisible();
    await expect(page).toHaveURL(/login/);

});