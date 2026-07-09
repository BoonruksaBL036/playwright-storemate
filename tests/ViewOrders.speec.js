import { test, expect } from '../custom-test.js';

test('(TC19001) ดูรายการคำสั่งซื้อทั้งหมด  ', async ({ page }) => {
  await page.goto('https://storemate-final.vercel.app/orders?status=ALL');
});