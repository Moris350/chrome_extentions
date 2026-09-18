---
id: ISSUE-010
title: Fix SwiftReply AI Gmail DOM Injection
assignee: frontend-dev
status: backlog
---

# Task
Ensure SwiftReply AI actually injects into the Gmail Compose window reliably.

## Requirements
1. Research the latest robust DOM selectors for Gmail's compose box (e.g., `.Am.Al.editable`, `div[role="textbox"]`, and the toolbar `.btC` or `.aDh`).
2. Update `extensions/swift-reply-ai/src/content/content.js`.
3. Inject the "Smart Reply" button smoothly next to the Gmail "Send" button without breaking the UI.
4. Ensure the text gets successfully inserted into the compose box when a tone is selected.
5. Commit changes to Git and move to `review`.
