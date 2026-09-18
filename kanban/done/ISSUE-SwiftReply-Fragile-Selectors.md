---
title: "Replace Fragile Gmail DOM Selectors"
assignee: "frontend-dev"
status: "backlog"
---

# Issue: Fragile Gmail DOM Selectors

## Description
The script relies on obfuscated Gmail CSS classes like `.btC`, `.aDh`, and `.gU.Up` to locate the toolbar. Google frequently updates these class names, which will break the extension silently.

## Recommendation
- Rely on more stable attributes, such as `aria-label` or `role`.
- Use a DOM traversal strategy starting from a known stable element (like `[role="button"][data-tooltip^="Send"]`).
- Implement a fallback mechanism or an auto-updating selector config fetched from the backend.
