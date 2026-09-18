---
id: ISSUE-Backend-Feature-HealthCheck
title: "Feature: Add Uptime and DB Status to Health Check"
assignee: backend-dev
priority: medium
status: done
created: 2026-09-18
started: 2026-09-18
completed: 2026-09-18
labels: [backend, infrastructure, feature]
role: backend-dev
---

# ISSUE-Backend-Feature-HealthCheck: Enhanced health check

## Description

The load balancer needs a more robust health check endpoint to determine if the instance should receive traffic. The current `/api/health` endpoint only returns a static "ok". We should update it to include process uptime and the database connection status.

## Acceptance Criteria

- [x] Update `GET /api/health` to return `process.uptime()`
- [x] Check the DB status (e.g. `SELECT 1`) before returning ok

## Log

| Date | Author | Action |
|------|--------|--------|
| 2026-09-18 | backend-dev | Created issue |
| 2026-09-18 | backend-dev | Updated health endpoint, completed issue |
