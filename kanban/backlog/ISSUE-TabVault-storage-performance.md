---
title: Performance bottleneck in storage operations
assignee: frontend-dev
status: backlog
---

# Issue Description
chrome.storage.local.get(['vaults']) retrieves the entire array of all vaults every time a read/write occurs. For Premium users with hundreds of vaults and thousands of tabs, this will cause severe performance degradation and memory spikes. Refactor to store vaults in individual keys or use IndexedDB.

# Acceptance Criteria
- [ ] Fix implemented
- [ ] Tested across edge cases
