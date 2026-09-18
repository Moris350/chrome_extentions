---
title: "Security/Logic Flaw: Free Tier Vault Limit Bypass"
assignee: qa-engineer
status: backlog
---

# Issue Description
The recent pricing fix in `extensions/tab-vault/src/panel/panel.js` contains a logic flaw that allows users to bypass the Free Tier limitations.

The current check only prevents saving *new* vaults if the user already has 3 or more:
\`\`\`javascript
if (!premium && vaults.length >= 3) {
  alert("Free users can only save up to 3 vaults. Please upgrade to Premium!");
  return;
}
\`\`\`

**Vulnerabilities:**
1. **No limit on tabs per vault:** A free user can keep 2 vaults and save an unlimited number of tabs in a 3rd vault, bypassing the intended pricing friction.
2. **Local Storage Manipulation:** A user can easily open Chrome DevTools and modify `chrome.storage.local` to inject 100 vaults. The current code does not restrict *reading* or *restoring* these vaults, it only restricts the UI button for creating new ones.
3. **Downgrade loophole:** If a user cancels premium, they retain full access to all vaults created during the premium period.

# Acceptance Criteria
- [ ] Enforce a maximum number of tabs per vault for free users (e.g., 10 tabs).
- [ ] On load/render, if a free user has >3 vaults, lock or hide the extra vaults, prompting them to upgrade to restore access.
- [ ] Validate array size bounds when reading from `chrome.storage.local`, not just before writing.
