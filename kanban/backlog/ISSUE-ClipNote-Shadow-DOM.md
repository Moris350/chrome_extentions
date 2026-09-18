---
title: Isolate Sidebar CSS using Shadow DOM
assignee: frontend-dev
status: backlog
---

# Description
The sidebar is currently injected directly into `ytd-watch-flexy`. This exposes our extension UI to YouTube's complex global CSS, risking layout breakage. Additionally, our classes (`.btn-primary`) could theoretically conflict with or bleed into the host page.

# Acceptance Criteria
- [ ] Wrap the `clipnote-sidebar` in a Shadow Root (`attachShadow({ mode: 'open' })`).
- [ ] Inject `content.css` directly into the Shadow DOM to ensure complete styling isolation.
- [ ] Verify that the sidebar does not break YouTube's theater mode or fullscreen layouts.
