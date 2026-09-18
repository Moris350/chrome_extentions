---
title: Fix Canvas Screenshot Edge Case - Multiple Video Elements
assignee: frontend-dev
status: done
---

# Description
When using `document.querySelector('video')`, it might select the wrong video element if there are multiple videos on the page (e.g., ad videos, previews, or hidden elements). This can lead to a blank or incorrect screenshot.

# Acceptance Criteria
- [x] Update the video selector to target `.html5-main-video` specifically for YouTube.
- [x] Fallback to `video` if `.html5-main-video` is not found to remain somewhat generic.
- [x] Ensure the video width and height are strictly positive before capturing.
