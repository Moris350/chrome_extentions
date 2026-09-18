---
title: Side panel doesn't react to tab changes
assignee: frontend-dev
status: backlog
---

# Issue Description
The side panel fetches tabs on DOMContentLoaded, but does not listen for chrome.tabs.onUpdated, chrome.tabs.onRemoved, or chrome.tabs.onCreated. If a user closes a tab while the panel is open, the list becomes stale. Implement event listeners to keep the active tabs list synchronized.

# Acceptance Criteria
- [ ] Fix implemented
- [ ] Tested across edge cases
