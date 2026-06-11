import { chromium } from "@playwright/test";
import { existsSync } from "fs";

async function globalSetup() {
    if (existsSync("state.json")) {
        console.log("State file already exists. Skipping login.");
        return;
    }

    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto("https://storemate-final.vercel.app/",{
        waitUntil: 'domcontentloaded',
    })
    
    await page.locator('[data-test="email"]').fill("jj1234@gmail.com");
  await page.locator('[data-test="password"]').fill("Boon1234");
  await page.locator('[data-test="btn-submit"]').click();

    await page.waitForFunction(() =>
    document.cookie.includes("token"));

    await page.waitForLoadState('networkidle')

    await page.context().storageState({ path: "state.json" });
    await browser.close();
}

export default globalSetup;