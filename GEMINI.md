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
| ⚙️ Backend Dev | `backend-dev` | APIs, payment, licensing, analytics backend |
| 📈 Marketing/SEO | `marketing-seo` | Chrome Web Store optimization, landing pages, SEO, growth |
| 🧪 QA Engineer | `qa-engineer` | Testing, automation, cross-browser, performance, review |

---

## 📋 GitHub Kanban Workflow (CRITICAL)

All tasks and project management are handled via **GitHub Issues** and the GitHub Project Board.
We NO LONGER use local markdown files for Kanban.

**To work on a task:**
1. Read `TASK_ONBOARDING.md` in `.agents/context/`
2. Use the `github-mcp-server` tool or `curl` to fetch open issues from the repository `Moris350/chrome_extentions`.
3. Pick an issue, and assign it to yourself (or comment that you are working on it).
4. Do the development work on a feature branch (e.g., `feature/issue-123`).
5. Git commit, push, and use the MCP tool to **close the issue** (update state to `closed`).
6. Update `PROJECT_STATUS.md`.

---

## 🧠 Persistent Memory — MUST READ at Session Start

At the start of every session, or immediately after a Compact, or when spawning a new SUBAGENT, **you MUST immediately read these context files**:

1. **`.agents/context/PROJECT_STATUS.md`** — Current state of all extensions and what's in progress
2. **`.agents/context/WORKFLOW.md`** — Git flow, release process, how agents coordinate
3. **`.agents/context/TROUBLESHOOTING.md`** — Known issues and solutions
4. **`.agents/context/TASK_ONBOARDING.md`** — How to pick up and work on GitHub issues

**⚠️ CRITICAL**: After completing significant work, **update `PROJECT_STATUS.md`** so the next session has current context.

---

## 📁 Project Structure

```
chrome_extentions/
├── .agents/skills/          # Agent role definitions
├── .agents/context/         # Persistent memory files (MUST BE READ)
├── extensions/              # Individual extension projects
├── shared/                  # Shared code/utilities across extensions
├── docs/                    # Business documentation
└── GEMINI.md                # This file (auto-loaded via user rules)
```

---

## 🔧 Development Standards

- **Manifest V3** for all extensions
- **Vanilla JS** or lightweight frameworks
- **Git commit messages**: `[component] type: description`
- **One branch per extension feature**: `feature/<extension>/<feature-name>`
