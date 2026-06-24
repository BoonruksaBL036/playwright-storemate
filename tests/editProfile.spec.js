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

test('(TC12003) อัปโหลดรูปโปรไฟล์สำเร็จด้วยไฟล์ประเภท JPG,JPEG', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    const filePath = './tests/fixtures/images/profile-valid.jpg';
    await page.locator('[data-test="btn-open-image-modal"]').waitFor({ state: 'visible' });
    await page.locator('[data-test="btn-open-image-modal"]').click();
    await page.locator('[data-test="btn-select-file"]').click();
    await page.locator('[data-test="file-input"]').setInputFiles(filePath);
    await page.locator('[data-test="btn-save-crop"]').click();
    await expect(page.getByText('แก้ไขข้อมูลโปรไฟล์สำเร็จ')).toBeVisible();

    const profileImage = page.locator('[data-test="profile-image"]');
    await expect(profileImage).toBeVisible();
    const src = await profileImage.getAttribute('src');
    expect(src).toContain('profile');

});

test('(TC12004) อัปโหลดรูปโปรไฟล์สำเร็จด้วยไฟล์ประเภท PNG', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    const filePath = './tests/fixtures/images/profile-valid.png';
    await page.locator('[data-test="btn-open-image-modal"]').waitFor({ state: 'visible' });
    await page.locator('[data-test="btn-open-image-modal"]').click();
    await page.locator('[data-test="btn-select-file"]').click();
    await page.locator('[data-test="file-input"]').setInputFiles(filePath);
    await page.locator('[data-test="btn-save-crop"]').click();
    await expect(page.getByText('แก้ไขข้อมูลโปรไฟล์สำเร็จ')).toBeVisible();

    const profileImage = page.locator('[data-test="profile-image"]');
    await expect(profileImage).toBeVisible();
    const src = await profileImage.getAttribute('src');
    expect(src).toContain('profile');

});

test('(TC12005) อัปโหลดไฟล์ที่มีขนาดเกิน 5 MB  ', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    const filePath = './tests/fixtures/images/4k-invalid.jpg';
    await page.locator('[data-test="btn-open-image-modal"]').waitFor({ state: 'visible' });
    await page.locator('[data-test="btn-open-image-modal"]').click();
    await page.locator('[data-test="btn-select-file"]').click();
    await page.locator('[data-test="file-input"]').setInputFiles(filePath);
    await expect(page.getByText('ขนาดไฟล์ต้องไม่เกิน 5 MB')).toBeVisible();

});

test('(TC12006) อัปโหลดไฟล์ที่ไม่ใช่ PNG, JPEG, JPG   ', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    const filePath = './tests/fixtures/images/profile-invalid.txt';
    await page.locator('[data-test="btn-open-image-modal"]').waitFor({ state: 'visible' });
    await page.locator('[data-test="btn-open-image-modal"]').click();
    await page.locator('[data-test="btn-select-file"]').click();
    await page.locator('[data-test="file-input"]').setInputFiles(filePath);
    await expect(page.getByRole('status')).toContainText('รองรับเฉพาะไฟล์ PNG, JPEG และ JPG');

});

test('(TC12008) การกรอกอีเมลไม่ถูกต้อง ', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    await page.locator('[data-test="btn-change-email"]').waitFor({ state: 'visible' });
    await page.locator('[data-test="btn-change-email"]').click();
    await page.locator('[data-test="input-email"]').fill('664259036@webmail.npru.ac.th');
    await page.locator('[data-test="edit-modal-save-button"]').click();
    await expect(page.getByRole('status')).toContainText('อีเมลนี้ถูกใช้งานแล้ว');

});

test('(TC12009) การใช้เบอร์โทรศัพท์ซ้ำกับผู้ใช้อื่น   ', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    await page.locator('[data-test="btn-change-phone"]').waitFor({ state: 'visible' });
    await page.locator('[data-test="btn-change-phone"]').click();
    await page.locator('[data-test="input-phone"]').fill('0820629587');
    await page.locator('[data-test="edit-modal-save-button"]').click();
    await expect(page.getByRole('status')).toContainText('เบอร์โทรศัพท์นี้มีผู้ใช้แล้ว');

});