# Chrome Extensions Business — Agent Rules

> **This file is auto-loaded at every session start and after every Compact.**
> It provides the full business context, team structure, and workflow for all agents.

---

## 🏢 Business Context

We are building and selling **Chrome Extensions** using a **Freemium model** with **minimal human friction**.
Revenue comes from free extensions with premium features unlocked via one-time payment or subscription.

**Core principles:**
- Build extensions that solve real pain points
- Freemium: free core → paid premium features
- Automate everything — minimize manual human interaction
- Ship fast, iterate based on Chrome Web Store reviews and analytics
- Every extension is a standalone product in `extensions/<extension-name>/`

---

## 👥 Agent Team Roles

| Role | Skill Name | Focus |
|------|-----------|-------|
| 🎯 Product Manager | `product-manager` | Research, roadmap, feature prioritization, competitive analysis |
| 🎨 Frontend Dev | `frontend-dev` | Extension UI, Chrome APIs, manifest.json, popup/options/content scripts |
| ⚙️ Backend Dev | `backend-dev` | APIs, payment (Stripe/LemonSqueezy), licensing, analytics backend |
| 📈 Marketing/SEO | `marketing-seo` | Chrome Web Store optimization, landing pages, SEO, growth |
| 🧪 QA Engineer | `qa-engineer` | Testing, automation, cross-browser, performance, review |

---

## 📋 Kanban Workflow

All tasks live in `kanban/` as individual Markdown files with YAML frontmatter.

**Columns (directories):**
1. `kanban/backlog/` — New tasks waiting to be picked up
2. `kanban/in-progress/` — Assigned and being worked on
3. `kanban/review/` — Ready for review
4. `kanban/done/` — Completed

**To work on a task:**
1. Read `TASK_ONBOARDING.md` in `.agents/context/`
2. Pick an issue from `kanban/backlog/`
3. Update the `assignee` field in the issue's frontmatter to your role
4. Move the file to `kanban/in-progress/`
5. When done, move to `kanban/review/`
6. After review passes, move to `kanban/done/`
7. Git commit after each move

---

## 🧠 Persistent Memory — MUST READ at Session Start

At the start of every session or after Compact, **immediately read these context files**:

1. **`.agents/context/PROJECT_STATUS.md`** — Current state of all extensions and what's in progress
2. **`.agents/context/WORKFLOW.md`** — Git flow, release process, how agents coordinate
3. **`.agents/context/TROUBLESHOOTING.md`** — Known issues and solutions
4. **`.agents/context/TASK_ONBOARDING.md`** — How to pick up and work on tasks

**⚠️ CRITICAL**: After completing significant work, **update `PROJECT_STATUS.md`** so the next session has current context.

---

## 📁 Project Structure

```
chrome_extentions/
├── .agents/skills/          # Agent role definitions
├── .agents/context/         # Persistent memory files
├── extensions/              # Individual extension projects
├── shared/                  # Shared code/utilities across extensions
├── kanban/                  # Task tracking (Markdown + Git)
├── docs/                    # Business documentation
└── GEMINI.md                # This file (auto-loaded)
```

---

## 🔧 Development Standards

- **Manifest V3** for all extensions
- **Vanilla JS** or lightweight frameworks (no heavy dependencies)
- **Semantic versioning** for releases
- **Git commit messages**: `[component] type: description` (e.g., `[tab-manager] feat: add dark mode`)
- **One branch per extension feature**: `feature/<extension>/<feature-name>`
- **Chrome Web Store** as primary distribution channel
