---
title: "Implement Async Loading State for AI Responses"
assignee: "frontend-dev"
status: "backlog"
---

# Issue: Missing Async Loading State and Error Handling

## Description
Currently, `insertGeneratedResponse` assumes the AI response is instantaneous. When connected to a real LLM API, generation can take 5+ seconds. 

## Recommendation
- Show a clear visual loading indicator (e.g., a spinner inside the compose box or on the button).
- Disable the "Smart Reply" button during generation to prevent multiple rapid requests.
- Handle edge cases: API timeouts, network failures, and empty AI responses gracefully (show an error toast or message, then revert).
