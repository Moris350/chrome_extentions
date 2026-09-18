---
title: Implement Clickable Timestamps to Seek Video
assignee: frontend-dev
status: backlog
---

# Description
Notes currently show a timestamp `[MM:SS]`, but it is plain text. To meet enterprise UX standards, users expect to be able to click on a note's timestamp to instantly seek the video to that exact moment.

# Acceptance Criteria
- [ ] Wrap the timestamp text in an interactive element (e.g., `<a>` or `<button>`).
- [ ] Add an event listener to the timestamp that updates the `currentTime` of the YouTube `<video>` element.
- [ ] Add appropriate hover states/CSS to indicate the timestamp is interactive.
