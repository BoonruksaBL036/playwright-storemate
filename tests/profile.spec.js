import { test, expect } from '@playwright/test';

test('(TC5001)', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/profile');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('[data-test="profile-name"]').waitFor({ state: 'visible' });
    await expect(page.locator('[data-test="profile-name"]')).toHaveText('บีแอล ยืมเทสถาวร');
    await expect(page.locator('[data-test="profile-email"]')).toHaveText('664259005@webmail.npru.ac.th');
    await expect(page.locator('[data-test="profile-phone"]')).toHaveText('0821505700');
    // await expect(page.locator('[data-test="profile-name"]')).toHaveText('บีแอล ยืมเทสถาวร');
});