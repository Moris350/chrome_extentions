---
id: ISSUE-Backend-Feature-Analytics
title: "Identify the lack of telemetry and add analytics endpoint"
assignee: backend-dev
priority: high
status: done
created: 2026-09-18
started: 2026-09-18
completed: 2026-09-18
labels: [backend, analytics, feature]
role: backend-dev
---

# ISSUE-Backend-Feature-Analytics: Add Analytics Endpoint

## Description

The backend currently lacks telemetry to track extension installations and feature usage (e.g., ai_reply_used) for our freemium model. We need a robust `POST /api/analytics` endpoint that tracks anonymous events.

## Acceptance Criteria

- [x] Create `POST /api/analytics` endpoint
- [x] Store event data in a Postgres table `analytics_events`

## Log

| Date | Author | Action |
|------|--------|--------|
| 2026-09-18 | backend-dev | Created issue |
| 2026-09-18 | backend-dev | Completed issue |
