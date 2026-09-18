---
title: "Improve MutationObserver Performance and Targeting"
assignee: "frontend-dev"
status: "backlog"
---

# Issue: MutationObserver Performance Hit

## Description
In `src/content/content.js`, a `MutationObserver` is observing the entire `document.body` for `childList` and `subtree` changes. Gmail has a highly dynamic DOM, meaning this observer will fire thousands of times per minute, causing significant CPU usage and UI lag.

## Recommendation
- Scope the `MutationObserver` to a more specific container (e.g., the main Gmail UI wrapper) instead of `document.body`.
- Throttle or debounce the callback more intelligently.
- Check if elements actually belong to a compose dialog before traversing them.
