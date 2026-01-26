const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function runVisualCheck() {
    console.log('📸 Starting Visual Verification with Puppeteer...');

    // Launch browser
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Safer for restricted envs
    });

    try {
        const page = await browser.newPage();

        // Set viewport to desktop size
        await page.setViewport({ width: 1440, height: 900 });

        const url = 'http://localhost:3000';
        console.log(`🌐 Navigating to ${url}...`);

        const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        console.log(`📡 Status: ${response.status()}`);

        if (response.status() !== 200) {
            throw new Error(`Failed to load page: status ${response.status()}`);
        }

        // Wait for key elements (Navbar, Logo)
        // Adjust selectors based on your actual code if needed, but waiting for 'nav' usually works
        await page.waitForSelector('nav');
        console.log('✅ Navbar detected');

        // Check for text content
        const content = await page.content();
        const checks = {
            'Couture': content.includes('Couture'),
            'Beauty': content.includes('Beauty'),
            'Fashion': content.includes('Fashion')
        };

        console.log('📝 Content Verification:');
        Object.entries(checks).forEach(([key, found]) => {
            console.log(`   - "${key}": ${found ? 'Found' : 'MISSING'}`);
        });

        // Screenshot
        const screenshotPath = path.join(__dirname, '../public/verification-screenshot.png');
        // Ensure public dir exists (it should in Next.js)
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`🖼️ Screenshot saved to: ${screenshotPath}`);

    } catch (error) {
        console.error('❌ Visual Check Failed:', error);
        process.exit(1);
    } finally {
        await browser.close();
        console.log('🔒 Browser closed.');
    }
}

runVisualCheck();
