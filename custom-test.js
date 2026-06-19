import { test as base, expect } from '@playwright/test';
import path from 'path';

export const test = base.extend({
  // สร้าง Auto Fixture ดักจับเมื่อเทสจบ
  autoScreenshot: [async ({ page }, use, testInfo) => {
    // ปล่อยให้สเต็ปการเทสปกติรันไปจนเสร็จสิ้น
    await use();

    // --- ส่วนนี้จะทำงานทันทีหลังจบแต่ละเทสเคส (เหมือน afterEach) ---

    // 1. ดึงชื่อไฟล์ Spec (เช่น login.spec.js)
    const specFileName = path.basename(testInfo.file); 
    // 2. ตัดนามสกุลไฟล์ออกเพื่อใช้ทำชื่อโฟลเดอร์หลัก (เช่น login.spec)
    const specFolderName = specFileName.replace(/\.[^/.]+$/, ""); 

    // 3. ดึงสถานะของเทส (จะได้ค่าเป็น 'passed', 'failed', หรือ 'timedOut')
    // เราเอามาแปลงให้เป็นชื่อโฟลเดอร์ที่อ่านง่ายๆ เช่น 'PASSED' หรือ 'FAILED'
    const statusFolderName = testInfo.status === 'passed' ? 'PASSED' : 'FAILED';

    // 4. ตั้งชื่อรูปภาพให้นูน (ควรใส่ timestamp เพื่อป้องกันรูปทับกันด้วยครับ)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // วัน-เวลา แบบคลีนๆ
    const cleanTitle = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_'); // ชื่อเทสแบบไม่มีอักขระพิเศษ
    const screenshotName = `${cleanTitle}_${timestamp}.png`;

    // 5. สั่งแคปหน้าจอลงโครงสร้างโฟลเดอร์แบบ 3 ชั้น:
    // screenshots -> ชื่อ Spec File -> สถานะ (PASS/FAIL) -> ชื่อรูป
    await page.screenshot({
      path: `screenshots/${specFolderName}/${statusFolderName}/${screenshotName}`,
      fullPage: true // แนะนำให้เปิดไว้ จะได้เห็นทั้งหน้าจอครับ
    });
  }, { auto: true }], // auto: true สั่งให้เปิดใช้งานอัตโนมัติในทุกเทสเคส
});

export { expect };