---
id: ISSUE-009
title: Rewrite ClipNote to include Free Transcript Extraction and Section Summaries
assignee: frontend-dev
status: backlog
---

# Task
Make ClipNote robust and add transcript-based section summaries.

## Requirements
1. Research how to extract YouTube transcripts via DOM (e.g., clicking 'Show transcript' and reading elements) or by intercepting the `ytInitialPlayerResponse` JSON.
2. Update `extensions/clip-note/src/content/content.js`.
3. Add a "Summarize Current Section" button to the sidebar.
4. When clicked, extract the transcript text around the current timestamp.
5. Attempt to use Chrome's local AI (`window.ai.languageModel`) to summarize it for free. If unavailable, format the extracted transcript text cleanly as the note.
6. Ensure DOM injection into `ytd-watch-flexy` works reliably.
7. Commit changes to Git and move to `review`.
