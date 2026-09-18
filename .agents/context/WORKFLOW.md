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
4. Create Kanban issues with acceptance criteria

### Phase 2: Development (Frontend + Backend Devs)
1. Frontend creates extension scaffold
2. Backend sets up license/payment endpoints (if needed)
3. Implement features following Kanban priorities
4. Write tests alongside code

### Phase 3: Quality Assurance (QA Engineer)
1. Run Pre-Release Checklist
2. Test cross-browser (Chrome, Edge, Brave)
3. Performance benchmarking
4. Report bugs as Kanban issues

### Phase 4: Launch (Marketing/SEO)
1. Write Chrome Web Store listing
2. Create screenshots and promotional assets
3. Build landing page
4. Submit to Chrome Web Store
5. Execute launch strategy (Product Hunt, Reddit, etc.)

### Phase 5: Iterate
1. Monitor reviews and analytics
2. Fix bugs rapidly (within 24h)
3. Plan v2 features based on feedback
4. Update PROJECT_STATUS.md

---

## 🌿 Git Flow

### Branches
- `main` — Production-ready code
- `develop` — Integration branch
- `feature/<extension>/<feature>` — Feature branches
- `fix/<extension>/<bug>` — Bug fix branches
- `release/<extension>/<version>` — Release preparation

### Commit Message Format
```
[component] type: short description

Types: feat, fix, refactor, docs, test, chore, style
Examples:
  [tab-manager] feat: add keyboard shortcut for quick switch
  [backend] fix: handle expired license gracefully
  [kanban] chore: move completed tasks to done
```

### Pull Request Flow
1. Create feature branch from `develop`
2. Implement changes
3. Move Kanban issue to `review/`
4. QA reviews and tests
5. Merge to `develop`
6. When ready for release → merge `develop` to `main`

---

## 🤝 Agent Coordination

### How Agents Communicate
- **Kanban issues** are the primary coordination mechanism
- Each issue has a clear `assignee` field
- Agents read `PROJECT_STATUS.md` at session start
- Agents update `PROJECT_STATUS.md` after completing significant work

### Handoff Protocol
1. **PM → Dev**: PM creates issue with acceptance criteria, Dev picks it up
2. **Dev → QA**: Dev moves issue to `review/`, QA picks it up
3. **QA → Dev**: If QA finds bugs, creates new issue and moves original back to `in-progress/`
4. **QA → Marketing**: After QA passes, Marketing creates CWS listing
5. **Marketing → PM**: After launch, PM monitors metrics and plans next iteration

---

## 📁 Where Things Go

| What | Where |
|------|-------|
| Extension source code | `extensions/<name>/` |
| Shared utilities | `shared/` |
| Backend services | `backend/` |
| Kanban issues | `kanban/<column>/` |
| Research docs | `docs/research/` |
| Marketing assets | `docs/marketing/` |
| API docs | `docs/api/` |
| QA reports | `docs/qa/` |
