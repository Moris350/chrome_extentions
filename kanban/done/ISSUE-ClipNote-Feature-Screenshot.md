---
title: Implement Video Canvas Screenshot Feature
assignee: frontend-dev
status: backlog
---

# Description
The manifest and `license.js` define screenshot limits for the free tier (15 max), but the actual screenshot functionality is entirely missing from `content.js`. 

# Acceptance Criteria
- [ ] Add a "Take Screenshot" button to the extension sidebar.
- [ ] Capture the current frame of the YouTube `<video>` element using the HTML5 Canvas API (`drawImage`).
- [ ] Save the screenshot or allow the user to download it.
- [ ] Enforce the 15 screenshot limit for free users by checking and updating `screenshotCount` in `chrome.storage.sync`.
- [ ] Prevent capturing if the tier limit is reached, showing an upsell prompt.
