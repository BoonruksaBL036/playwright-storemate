import { test, expect } from '@playwright/test';

test('(TC7001) ดูรายละเอียดสินค้า', async ({ page }) => {
    await page.goto('https://storemate-final.vercel.app/');
    await page.waitForLoadState('domcontentloaded');
    
});