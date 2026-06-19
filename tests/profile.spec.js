import { test, expect } from '../custom-test.js';

test('(TC11001) ผู้ใช้งานสามารถเข้าหน้าโปรไฟล์และแสดงข้อมูลโปรไฟล์ครบถ้วน', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('[data-test="profile-image"]')).toBeVisible();
    await expect(page.locator('[data-test="profile-name"]')).toBeVisible();
    await expect(page.locator('[data-test="profile-email"]')).toBeVisible();
    await expect(page.locator('[data-test="profile-phone"]')).toBeVisible();
    await expect(page.locator('[data-test="profile-created-at"]')).toBeVisible();
});

test('(TC11002) อีเมลแสดงแค่สามตัวเเรกและรูปแบบอีเมล', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    await page.waitForLoadState('domcontentloaded');
    const emailText = (await page.locator('[data-test="profile-email"]').textContent())?.trim();
    expect(emailText).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(emailText).toContain('*');
    expect(emailText).toMatch(/\*/);
});

test('(TC11003) แสดงเบอร์โทรศัพท์แค่สองตัวท้าย', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    await page.waitForLoadState('domcontentloaded');
    const phone = (await page.locator('[data-test="profile-phone"]').textContent())?.trim();
    expect(phone).toContain('*');
    expect(phone).toMatch(/\d{2}$/);
    expect(phone.slice(-2)).not.toContain('*');
    const front = phone.slice(0, -2);
    expect(front).toMatch(/[*-]+/);
    expect(phone.length).toBeLessThan(12)
});

