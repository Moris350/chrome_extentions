---
title: "Fix Hardcoded Popup Positioning Off-screen Edge Case"
assignee: "frontend-dev"
status: "backlog"
---

# Issue: Hardcoded Popup Positioning Off-screen Edge Case

## Description
The tone selection popup is positioned using hardcoded math:
\`\`\`javascript
popup.style.top = \`\${rect.top + window.scrollY - 150}px\`;
\`\`\`
If the "Smart Reply" button is near the top of the viewport, subtracting 150px will push the popup off-screen, making it unclickable.

## Recommendation
- Implement boundary collision detection.
- Calculate the available viewport space and render the popup below the button if there isn't enough space above.
- Alternatively, use a robust positioning library like Floating UI or Popper.js.
