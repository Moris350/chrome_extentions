---
title: URL validation required before saving/restoring
assignee: frontend-dev
status: backlog
---

# Issue Description
When restoring tabs, chrome.tabs.create({ url: tab.url }) is called blindly. We must validate URLs to prevent execution of restricted or potentially malicious schemes (e.g., ile://, chrome://, or obscure script schemes if not caught by Chrome's default filters).

# Acceptance Criteria
- [ ] Fix implemented
- [ ] Tested across edge cases
