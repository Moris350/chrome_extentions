---
title: "Security: License Cross-Extension Bypass"
assignee: backend-dev
status: backlog
---

# Issue Description
In `backend/src/index.js`, the `/api/license/validate` endpoint accepts `extensionId` in the request body but does not use it when querying the database.

```javascript
    const result = await pool.query(
      'SELECT * FROM licenses WHERE key = $1 AND status = $2',
      [licenseKey, 'active']
    );
```

This means a user could purchase a license for a cheaper extension (or obtain a free one), and then use that same valid license key to authenticate against a more expensive extension. The server will respond with `valid: true` as long as the key exists and is active. 

# Acceptance Criteria
- [ ] Update the SQL query in `/api/license/validate` to strictly require the `extension_id` to match the provided `extensionId`.
- [ ] Return a generic `Invalid or inactive license key` error to prevent leaking which extension the key actually belongs to.
