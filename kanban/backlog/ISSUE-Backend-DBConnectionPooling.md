---
title: "Fix Database Connection Pooling Configuration"
assignee: backend-dev
status: backlog
---

# Issue: Database connection pooling issues

## Description
The `pg` Pool is instantiated in `backend/src/index.js` with only basic connection credentials. It relies entirely on default pool settings (e.g., `max: 10`), which can lead to connection exhaustion under load or stalled connections without explicit timeout settings.

## Requirements
- Configure the Postgres `Pool` with explicit parameters:
  - `max`: Set an appropriate maximum number of clients in the pool (e.g., 20).
  - `idleTimeoutMillis`: Close idle clients after a certain period (e.g., 30000ms).
  - `connectionTimeoutMillis`: Timeout for acquiring a new connection (e.g., 2000ms).
- Ensure the pool gracefully handles scaling and connections don't leak.
