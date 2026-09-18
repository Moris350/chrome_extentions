---
title: Search bar lacks debounce causing performance issues
assignee: qa-engineer
status: backlog
---

# Issue Description
The search bar triggers enderSavedVaults on every single keystroke. When a user has many vaults with hundreds of tabs, this causes the UI to lag significantly while typing. 
We need to add a debounce function to the search input listener to ensure filtering only happens after the user stops typing for ~300ms.

# Acceptance Criteria
- [ ] Search input uses a debounce function (e.g. 300ms delay).
- [ ] UI does not freeze during rapid typing.
