---
title: "Implement Rate Limiting for API Endpoints"
assignee: backend-dev
status: backlog
---

# Issue: Missing Rate Limiting

## Description
The Express server in `backend/src/index.js` currently lacks rate limiting. This exposes endpoints, particularly the `/api/license/validate` endpoint, to brute-force attacks and potential denial-of-service (DoS) conditions.

## Requirements
- Install and configure `express-rate-limit`.
- Apply a global rate limiter to all API routes.
- Apply a stricter rate limiter specifically to the `/api/license/validate` and `/api/webhooks/lemonsqueezy` endpoints to prevent abuse.
