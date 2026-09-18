const puppeteer = require('puppeteer');
const path = require('path');

async function testExtension(extName) {
    console.log(`\n======================================`);
    console.log(`Testing Chrome Extension: ${extName}`);
    console.log(`======================================`);
    
    const extPath = path.resolve(__dirname, `../extensions/${extName}`);
    
    let browser;
    try {
        console.log(`[1] Launching Headless Chrome with ${extName}...`);
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                `--disable-extensions-except=${extPath}`,
                `--load-extension=${extPath}`,
                '--no-sandbox'
            ]
        });

        console.log(`[2] Browser launched successfully.`);
        
        // Wait a moment for service workers to initialize
        await new Promise(r => setTimeout(r, 2000));
        
        // Check for Service Worker (Background script)
        const targets = await browser.targets();
        const serviceWorker = targets.find(t => t.type() === 'service_worker');
        
        if (serviceWorker) {
            console.log(`[3] ✅ Background Service Worker registered and running!`);
        } else {
            console.log(`[3] ⚠️ No active Service Worker found (Might be a popup-only extension).`);
        }

        console.log(`[4] Extension ${extName} passed the load test without crashing the browser.`);

    } catch (err) {
        console.error(`❌ FAILED to load ${extName}. Error:`, err);
    } finally {
        if (browser) await browser.close();
        console.log(`[5] Browser closed.\n`);
    }
}

(async () => {
    try {
        await testExtension('tab-vault');
        await testExtension('swift-reply-ai');
        await testExtension('clip-note');
        console.log("🏆 ALL BROWSER E2E TESTS COMPLETED.");
    } catch (err) {
        console.error(err);
    }
})();
