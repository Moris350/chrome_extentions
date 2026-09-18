---
title: "Restrict CORS Configuration"
assignee: backend-dev
status: backlog
---

# Issue: CORS vulnerabilities

## Description
In `backend/src/index.js`, the application uses `app.use(cors());` with no configuration. This defaults to allowing `*` (all origins). Permissive CORS policies can allow malicious websites to make unauthorized requests to our backend on behalf of users or expose API endpoints to arbitrary origins.

## Requirements
- Restrict the `cors()` middleware to explicitly allow only the origins necessary for the extensions and the landing page.
- Configure `origin` dynamically based on environment variables or specific Chrome Extension IDs (`chrome-extension://<id>`).
- Specify allowed methods (e.g., GET, POST) and headers.
