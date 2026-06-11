import { test, expect } from '@playwright/test';

test('(TC5001)', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/');
});