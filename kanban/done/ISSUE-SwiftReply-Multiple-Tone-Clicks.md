---
title: "Fix Race Condition on Multiple Tone Clicks"
assignee: "frontend-dev"
status: "backlog"
---

# Issue: Race Condition on Multiple Tone Clicks

## Description
When a user clicks a tone button in the SwiftReply popup, the button itself is disabled (`pointer-events: none`). However, the rest of the popup remains active during the 1.5s generation delay. A user can click multiple different tones (e.g., "Agree", then "Decline") before the popup closes. 

This causes:
1. Multiple LLM generation calls.
2. The user's usage count being incremented multiple times, unfairly depleting their free limit.
3. Multiple responses being inserted into the Gmail compose box simultaneously.

## Recommendation
- Disable the entire popup (`pointer-events: none` on the popup container) as soon as ANY tone button is clicked.
- Alternatively, add a loading state that prevents other buttons from being clicked while `insertGeneratedResponse` is awaiting.
