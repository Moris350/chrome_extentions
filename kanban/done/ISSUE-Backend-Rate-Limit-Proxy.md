---
title: "Security: Rate Limiter Bypassed Behind Proxy (Missing trust proxy)"
assignee: backend-dev
status: backlog
---

# Issue Description
In `backend/src/index.js`, the application uses `express-rate-limit` for DDoS protection and brute-force prevention on `/api/license/validate` and global endpoints. 

However, the Express app does not configure `app.set('trust proxy', 1);`. When deployed to modern cloud environments behind load balancers or reverse proxies (like Cloudflare, Nginx, AWS ALB), Express will use the proxy's IP address as `req.ip` for all requests. 

This results in two major issues:
1. All users share the same rate limit pool, meaning legitimate users will be quickly blocked.
2. An attacker can trivially bypass the rate limit by spoofing the `X-Forwarded-For` header if the proxy isn't configured properly, or by exploiting the shared limits.

# Acceptance Criteria
- [ ] Configure `app.set('trust proxy', ...)` properly so that Express reads the client IP from the `X-Forwarded-For` header safely.
