---
title: "Popup Does Not Close on Escape Key"
assignee: "frontend-dev"
status: "backlog"
---

# Issue: Popup Does Not Close on Escape Key

## Description
The SwiftReply tone selection popup can only be closed by clicking outside of it. It does not listen for the `Escape` key, which is a standard accessibility and UX expectation for any custom modal, dialog, or popup.

## Recommendation
- Attach a `keydown` event listener to the `document` when the popup is opened.
- If the `Escape` key is pressed, remove the popup and clean up the event listener.
