---
title: "Bug: Duplicate Notes on Fast Navigation (Race Condition)"
assignee: qa-engineer
status: backlog
---

# Issue Description
In `extensions/clip-note/src/content/content.js`, when a user navigates to a new video, `handleNavigation` calls `injectSidebar`. This creates a `setInterval` that waits for the DOM container.
If a user clicks multiple videos quickly, multiple `setInterval` loops are created because the previous intervals are not cleared. 

Once the container is available, all active intervals trigger their callbacks. They clear the interval, optionally call `createSidebar`, and call `loadNotes()`.
Since `loadNotes()` uses `chrome.storage.local.get` (which is asynchronous), the synchronous `content.innerHTML = ''` clearing happens before the asynchronous appends. Thus, multiple async callbacks fire and append the notes to the DOM, leading to duplicated notes appearing in the UI.

# Acceptance Criteria
- [ ] Store the active interval ID in a variable and clear it before creating a new one in `injectSidebar`.
- [ ] Ensure `loadNotes` does not duplicate notes if called multiple times rapidly (e.g. by clearing the DOM inside the async callback, or preventing concurrent loads).
