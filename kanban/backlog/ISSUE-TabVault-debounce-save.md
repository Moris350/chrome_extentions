---
title: Save button lacks debouncing (duplicate vaults)
assignee: frontend-dev
status: backlog
---

# Issue Description
The 'Save Selected Tabs' button does not have a loading state and is not debounced. A user can spam click the button and accidentally create multiple identical vaults. Disable the button during the save operation and add visual feedback (e.g., 'Saved!').

# Acceptance Criteria
- [ ] Fix implemented
- [ ] Tested across edge cases
