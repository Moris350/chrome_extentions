---
id: ISSUE-Backend-QA-Analytics-Security
title: "QA: Fix Security Flaw in Analytics Endpoint"
assignee: backend-dev
priority: high
status: done
created: 2026-09-18
started: 2026-09-18
completed: 2026-09-18
labels: [backend, security, qa]
role: qa-engineer
---

# ISSUE-Backend-QA-Analytics-Security: Strict limits for analytics

## Description

The analytics endpoint lacks a specific rate limit (relying only on the global one which allows 100/15m) and doesn't restrict payload size. A malicious user could send massive JSON payloads, leading to a DOS attack.

## Acceptance Criteria

- [x] Limit `express.json({ limit: '10kb' })` to prevent large payload attacks
- [x] Apply `strictLimiter` to the `/api/analytics` endpoint

## Log

| Date | Author | Action |
|------|--------|--------|
| 2026-09-18 | qa-engineer | Found security flaw, created issue |
| 2026-09-18 | backend-dev | Added rate limits and size limits, completed issue |
