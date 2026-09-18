---
title: Replace alert() and confirm() with non-blocking Toasts
assignee: frontend-dev
status: backlog
---

# Issue Description
The code uses lert() for errors (like hitting the 3-vault limit) and confirm() for deleting vaults. These are blocking UI elements that provide a poor UX in a side panel. Replace them with custom toast notifications and inline modals. Additionally, handle API rejections gracefully instead of silently logging to console.error.

# Acceptance Criteria
- [ ] Fix implemented
- [ ] Tested across edge cases
