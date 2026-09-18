---
title: Handle YouTube SPA Navigation and Persist Notes State
assignee: frontend-dev
status: backlog
---

# Description
YouTube operates as a Single Page Application (SPA). Currently, `content.js` relies on `DOMContentLoaded` or a simple interval to inject the sidebar. When a user clicks a new video from the sidebar (without a full page refresh), the extension fails to re-initialize properly, and previous notes bleed into the new video's context. Furthermore, notes are only stored in the DOM and are completely lost upon a page reload or accidental sidebar close.

# Acceptance Criteria
- [ ] Listen to YouTube's specific navigation events (e.g., `yt-navigate-finish`) or `popstate` to detect video changes.
- [ ] Clear the UI of old notes when a new video loads.
- [ ] Persist notes per video ID using `chrome.storage.local` so they survive page reloads.
- [ ] Ensure the sidebar correctly anchors to `ytd-watch-flexy` even if the container is dynamically replaced.
