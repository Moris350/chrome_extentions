---
id: ISSUE-004
title: "Create extension project template/scaffold"
assignee: unassigned
priority: medium
status: backlog
created: 2026-09-18
started: null
completed: null
labels: [frontend, infra]
role: frontend-dev
---

# ISSUE-004: Create extension project template/scaffold

## Description

Create a reusable project template/scaffold for new Chrome extensions. This template will be copied when starting each new extension project, ensuring consistent structure and standards.

## Acceptance Criteria

- [ ] Create scaffold in `shared/extension-template/`
- [ ] Include Manifest V3 template with common permissions commented out
- [ ] Include popup page scaffold (HTML + CSS + JS)
- [ ] Include options page scaffold
- [ ] Include background service worker template
- [ ] Include content script template
- [ ] Include Freemium license check utility
- [ ] Include icon placeholder set (16, 32, 48, 128px)
- [ ] Include README template for individual extensions
- [ ] Create a script or instructions to init a new extension from template

## Template Structure

```
shared/extension-template/
├── manifest.json
├── src/
│   ├── popup/
│   ├── options/
│   ├── content/
│   ├── background/
│   └── shared/
├── assets/icons/
├── tests/
└── README.md
```

## Log

| Date | Author | Action |
|------|--------|--------|
| 2026-09-18 | system | Created issue |
