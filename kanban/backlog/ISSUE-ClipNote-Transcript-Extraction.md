---
title: Make Transcript Extraction Robust and Locale-Independent
assignee: frontend-dev
status: backlog
---

# Description
The current `extractTranscript` function in `content.js` is highly brittle:
1. It searches for a button containing the exact text "show transcript", which completely breaks for non-English users.
2. It uses a hardcoded `1500ms` `setTimeout` to wait for the transcript to render, creating race conditions on slower networks.
3. It fails silently or with blocking `alert()`s if no closed captions exist.

# Acceptance Criteria
- [ ] Use locale-independent selectors (e.g., SVG path checking, ARIA labels, or specific YouTube component tags like `ytd-engagement-panel-section-list-renderer`) to open the transcript.
- [ ] Replace `setTimeout` with `MutationObserver` or polling logic to deterministically wait for the transcript segments to appear in the DOM.
- [ ] Handle videos without transcripts gracefully via non-blocking UI notifications.
