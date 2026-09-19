# 🛡️ Chrome Extensions & Backend Security Best Practices

> **Note:** This document outlines general theoretical security best practices and mitigation strategies. It does not represent an analysis of this specific codebase.

## 1. Chrome Extension Security (Manifest V3)

### A. Preventing Cross-Site Scripting (XSS)
- **Rule:** Never trust external input (e.g., from web pages, APIs, or user input).
- **Practice:** Avoid using `innerHTML`. Always prefer `textContent` or `innerText` when inserting dynamic data into the DOM.
- **Sanitization:** If HTML parsing is absolutely necessary, use a robust sanitizer library (like DOMPurify) before insertion.

### B. Principle of Least Privilege (Permissions)
- **Rule:** Request only the minimum permissions required for the extension to function.
- **Practice:** 
  - Avoid `<all_urls>` unless strictly necessary; specify exact domains in `host_permissions`.
  - Prefer `activeTab` over persistent host permissions when interaction is triggered by a user action (like clicking the browser action).
  - Remove unused permissions (e.g., `scripting`, `unlimitedStorage`) from `manifest.json`.

### C. Secure Storage and Data Integrity
- **Rule:** Assume `chrome.storage.local` and `chrome.storage.sync` can be read or modified by the user or other processes on the local machine.
- **Practice:** Do not store highly sensitive, unencrypted secrets (like long-lived API keys or personal data) in extension storage without encryption. Validate all data retrieved from storage before using it in application logic to prevent injection if the data was tampered with.

### D. Content Security Policy (CSP)
- **Rule:** Enforce strict execution contexts.
- **Practice:** Rely on the strict default CSP of Manifest V3, which blocks `eval()`, inline scripts, and remote code execution. Do not attempt to weaken this policy.

---

## 2. Backend API Security (Node.js/Express)

### A. Input Validation
- **Rule:** Validate and sanitize all incoming data at the edge.
- **Practice:** Use validation libraries (like Zod or Joi) to enforce strict schemas for all API endpoints. Reject payloads with unexpected types, lengths, or missing fields.

### B. Cross-Origin Resource Sharing (CORS)
- **Rule:** Restrict which origins can communicate with your API.
- **Practice:** Do not use a permissive `*` CORS policy. Explicitly whitelist the exact origins allowed (e.g., `chrome-extension://<your-extension-id>` and your official landing page domain).

### C. Database Security
- **Rule:** Prevent SQL Injection.
- **Practice:** Never construct SQL queries using string concatenation. Always use parameterized queries, prepared statements, or a secure ORM.

### D. Rate Limiting and DoS Protection
- **Rule:** Protect endpoints from abuse and brute-force attacks.
- **Practice:** Implement rate limiting middleware (e.g., `express-rate-limit`) on sensitive endpoints like licensing checks or AI text generation.

### E. Cryptography and Timing Attacks
- **Rule:** Securely verify signatures and hashes.
- **Practice:** When comparing cryptographic signatures (like HMACs from webhooks), use constant-time comparison functions (e.g., `crypto.timingSafeEqual`) to prevent timing attacks.
