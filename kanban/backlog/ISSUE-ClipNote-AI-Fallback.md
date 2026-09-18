---
title: Improve AI Summarization Fallback and Capabilities Check
assignee: frontend-dev
status: backlog
---

# Description
The current AI summarization implementation has several major flaws:
1. **Bad Fallback UX**: If `window.ai.languageModel` is unavailable or fails, it blindly dumps the entire raw transcript (up to 3 minutes of text) into a single note as a "[Summary]", creating a massive wall of text.
2. **Missing Capabilities Check**: It calls `window.ai.languageModel.create()` without checking `capabilities()` first, which is required for the Chrome AI API.
3. **Blocking UI**: It uses `alert()` for error messages, which blocks the main thread and provides poor UX.

# Acceptance Criteria
- [ ] Implement `window.ai.languageModel.capabilities()` check before session creation.
- [ ] If AI fails or is unavailable, show a clean, non-blocking toast notification instead of dumping the raw transcript.
- [ ] Replace all `alert()` calls with a custom toast/notification system.
- [ ] Parse and render the AI summary output gracefully (e.g., basic markdown formatting).
