---
id: ISSUE-002
title: "Set up development environment & tooling"
assignee: unassigned
priority: medium
status: backlog
created: 2026-09-18
started: null
completed: null
labels: [infra]
role: frontend-dev
---

# ISSUE-002: Set up development environment & tooling

## Description

Set up the standard development environment and tooling for Chrome extension development, including linting, formatting, testing framework, and build scripts.

## Acceptance Criteria

- [ ] Create `package.json` with dev dependencies (Jest, ESLint, Prettier)
- [ ] Configure ESLint for Chrome extension development
- [ ] Configure Prettier for consistent formatting
- [ ] Set up Jest with `jest-chrome` for Chrome API mocking
- [ ] Create npm scripts for lint, format, test
- [ ] Add `.gitignore` for node_modules, .env, build artifacts
- [ ] Create `.editorconfig` for consistent editor settings
- [ ] Document setup in `docs/dev-setup.md`

## Notes

- Keep tooling minimal — no heavy build systems unless needed
- Prefer zero-config tools where possible

## Log

| Date | Author | Action |
|------|--------|--------|
| 2026-09-18 | system | Created issue |
