---
title: "Implement Cryptographic Signature Validation for Webhooks"
assignee: backend-dev
status: done
---

# Issue: Missing cryptographic signature validation for Webhooks (LemonSqueezy)

## Description
The webhook receiver endpoint `/api/webhooks/lemonsqueezy` in `backend/src/index.js` currently trusts incoming requests implicitly. It reads `req.body` and creates active license keys in the database without validating the request signature. This is a critical security vulnerability, allowing attackers to forge webhook payloads and generate free licenses.

## Requirements
- Use LemonSqueezy's (or Stripe's) signing secret to compute the HMAC signature of the raw request body.
- Compare the computed signature against the `x-signature` header provided in the request.
- Ensure the raw body is used for signature validation (may require configuring express.raw() for the webhook route).
- Reject any request with a missing or invalid signature with a 401 Unauthorized status.
