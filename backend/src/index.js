const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');


const app = express();
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', globalLimiter);

// Strict Rate Limiter
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chrome Extensions Backend is running' });
});

// License Validation Endpoint
app.post('/api/license/validate', strictLimiter, async (req, res) => {
  const { licenseKey, extensionId } = req.body;
  
  if (!licenseKey) {
    return res.status(400).json({ valid: false, error: 'License key is required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM licenses WHERE key = $1 AND status = $2',
      [licenseKey, 'active']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ valid: false, error: 'Invalid or inactive license key' });
    }

    const license = result.rows[0];

    // Optional: check expiration
    if (license.expires_at && new Date(license.expires_at) < new Date()) {
       return res.status(403).json({ valid: false, error: 'License key expired' });
    }

    res.json({
      valid: true,
      licenseKey: license.key,
      extensionId: license.extension_id,
      expiresAt: license.expires_at,
      features: ['premium_feature_1', 'premium_feature_2']
    });
  } catch (error) {
    console.error('Error validating license:', error);
    res.status(500).json({ valid: false, error: 'Internal server error' });
  }
});

// Mock Lemonsqueezy Webhook Receiver
app.post('/api/webhooks/lemonsqueezy', strictLimiter, async (req, res) => {
  const signature = req.get('X-Signature');
  if (!signature) {
    return res.status(401).json({ success: false, error: 'Missing signature' });
  }

  const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || 'default_secret';
  try {
    const hmac = crypto.createHmac('sha256', webhookSecret);
    const digest = Buffer.from(hmac.update(req.rawBody || '').digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
      return res.status(401).json({ success: false, error: 'Invalid signature' });
    }
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Signature verification failed' });
  }

  const event = req.body;

  // Extract event name (supporting different payload structures)
  const eventName = event?.meta?.eventName || event?.eventName;
  
  if (eventName === 'order_created') {
    // Generate a mock license key and assign an extension id (mock logic)
    const extensionId = event?.data?.attributes?.custom_data?.extension_id || 'default_extension';
    const newLicenseKey = crypto.randomUUID();

    try {
      await pool.query(
        'INSERT INTO licenses (key, extension_id, status) VALUES ($1, $2, $3)',
        [newLicenseKey, extensionId, 'active']
      );
      console.log(`Generated new license key: ${newLicenseKey} for extension: ${extensionId}`);
      res.status(200).json({ success: true, licenseKey: newLicenseKey });
    } catch (error) {
      console.error('Error inserting new license:', error);
      res.status(500).json({ success: false, error: 'Failed to generate license' });
    }
  } else {
    res.status(200).json({ success: true, message: 'Event ignored' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
});
