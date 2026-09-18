---
title: Lack of loading spinners during async operations
assignee: frontend-dev
status: backlog
---

# Issue Description
enderCurrentTabs and enderSavedVaults are async functions that query tabs and storage. If these take time, the UI appears frozen or empty. Add a loading skeleton or spinner while data is fetching.

# Acceptance Criteria
- [ ] Fix implemented
- [ ] Tested across edge cases
