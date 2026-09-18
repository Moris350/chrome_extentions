const http = require('http');

async function makeRequest(url, method, payload) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, data: JSON.parse(data) });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, data: data });
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (payload) {
            req.write(JSON.stringify(payload));
        }
        req.end();
    });
}

async function run() {
    try {
        console.log('1. Simulating purchase via Webhook...');
        const webhookPayload = {
            eventName: 'order_created',
            data: {
                attributes: {
                    custom_data: {
                        extension_id: 'test_extension_123'
                    }
                }
            }
        };

        const webhookRes = await makeRequest('http://localhost:3000/api/webhooks/lemonsqueezy', 'POST', webhookPayload);
        console.log('Webhook response:', webhookRes.data);

        if (!webhookRes.data.success || !webhookRes.data.licenseKey) {
            throw new Error('Failed to generate license key in webhook response');
        }

        const licenseKey = webhookRes.data.licenseKey;
        console.log(`\n2. Retrieved Key: ${licenseKey}`);
        
        console.log('\n3. Validating Key...');
        const validatePayload = {
            licenseKey,
            extensionId: 'test_extension_123'
        };
        const validateRes = await makeRequest('http://localhost:3000/api/license/validate', 'POST', validatePayload);
        console.log('Validation response:', validateRes.data);

        if (validateRes.data.valid) {
            console.log('\n✅ End-to-end flow completed successfully!');
        } else {
            console.log('\n❌ Validation failed!');
        }

    } catch (e) {
        console.error('Error during simulation:', e.message);
    }
}

run();
