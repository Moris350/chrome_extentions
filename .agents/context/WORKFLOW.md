# Workflow — How We Work

> This file defines the standard workflow for all agents in the Chrome Extensions business.

---

## 🔄 Development Cycle

```
Idea → Research → Spec → Build → Test → List → Launch → Iterate
```

### Phase 1: Research & Planning (Product Manager)
1. Research market opportunity
2. Analyze competitors on Chrome Web Store
3. Define MVP feature set (Free vs Premium split)
4. Create **GitHub Issues** using `github-mcp-server` or `curl` with clear acceptance criteria.

### Phase 2: Development (Frontend + Backend Devs)
1. Pick up an open GitHub Issue.
2. Implement features following priorities.
3. Write tests alongside code.
4. Push to branch and open a PR, or push directly to `main` for hotfixes.

### Phase 3: Quality Assurance (QA Engineer)
1. Run Pre-Release Checklist
2. Test cross-browser (Chrome, Edge, Brave)
3. Performance benchmarking
4. Report bugs as **GitHub Issues**

### Phase 4: Launch (Marketing/SEO)
1. Write Chrome Web Store listing
2. Create screenshots and promotional assets
3. Submit to Chrome Web Store

### Phase 5: Iterate
1. Monitor reviews and analytics
2. Fix bugs rapidly (within 24h)
3. Update `PROJECT_STATUS.md`

---

## 🌿 Git Flow

### Branches
- `main` — Production-ready code
- `feature/<extension>/<feature>` — Feature branches
- `fix/<extension>/<bug>` — Bug fix branches

### Commit Message Format
```
[component] type: short description

Types: feat, fix, refactor, docs, test, chore, style
Examples:
  [tab-manager] feat: add keyboard shortcut for quick switch
  [backend] fix: handle expired license gracefully
```

---

## 🤝 Agent Coordination (GitHub Kanban)

### How Agents Communicate
- **GitHub Issues** are the primary coordination mechanism. We use the repository `Moris350/chrome_extentions`.
- Agents query open issues using `github-mcp-server` (`issue_read` / `search_issues`) or via direct `curl`.
- Agents update `PROJECT_STATUS.md` after completing significant work to pass context to the next session or subagent.

### Handoff Protocol
1. **PM → Dev**: PM creates GitHub Issue with acceptance criteria.
2. **Dev → Dev**: Dev picks up the issue, works on it, commits, and closes the issue.
3. **Subagents**: When a Parent Agent launches Subagents, it gives them explicit instructions to pull issues from GitHub, fix them, commit, and close them.

---

## 📁 Where Things Go

| What | Where |
|------|-------|
| Extension source code | `extensions/<name>/` |
| Shared utilities | `shared/` |
| Backend services | `backend/` |
| Kanban issues | **GitHub Issues (Moris350/chrome_extentions)** |
| Memory/Context | `.agents/context/` |
