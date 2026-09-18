---
title: "Security: Stored XSS in ClipNote Markdown Parser"
assignee: qa-engineer
status: backlog
---

# Issue Description
The `parseMarkdown` function in `extensions/clip-note/src/content/content.js` uses `innerHTML` to render user-provided note text without escaping HTML entities. 

```javascript
  function parseMarkdown(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
               .replace(/\*(.*?)\*/g, '<em>$1</em>')
               .replace(/`(.*?)`/g, '<code>$1</code>');
  }

  // ...
  const textSpan = document.createElement('span');
  textSpan.innerHTML = ' ' + parseMarkdown(text);
```

**Vulnerability:**
Stored XSS. A malicious user (or potentially the AI, via prompt injection, though mitigated now) could create a note with text like `<img src=x onerror=alert(1)>`. When `loadNotes` is called, this payload is injected directly into the DOM via `innerHTML`, executing arbitrary JavaScript in the context of the YouTube page.

# Acceptance Criteria
- [ ] Sanitize HTML entities (`<`, `>`, `&`, `"`, `'`) before parsing markdown.
- [ ] Ensure safe rendering of markdown without allowing raw HTML elements.
