const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chrome Extensions Backend is running' });
});

// Mock License Validation Endpoint
app.post('/api/license/validate', (req, res) => {
  const { licenseKey, extensionId } = req.body;
  
  if (!licenseKey) {
    return res.status(400).json({ valid: false, error: 'License key is required' });
  }

  // TODO: Connect to Postgres to validate actual license
  // Mock response for now
  res.json({
    valid: true,
    licenseKey,
    extensionId,
    expiresAt: null, // Lifetime
    features: ['premium_feature_1', 'premium_feature_2']
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
});
