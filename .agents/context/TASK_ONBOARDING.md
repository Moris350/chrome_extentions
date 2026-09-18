# Task Onboarding — How to Start Working on Tasks

> Read this when you start a new session or pick up a new task.

---

## 🚀 Session Start Checklist

Every time you start a new session or recover from a Compact:

1. **Read `PROJECT_STATUS.md`** — Know what's currently happening
2. **Check `kanban/BOARD.md`** — See all active tasks
3. **Check `kanban/in-progress/`** — See if you have any tasks already assigned
4. **Read the relevant skill** in `.agents/skills/<your-role>/SKILL.md`

---

## 📋 How to Pick Up a Task

### Step 1: Find a Task
Browse `kanban/backlog/` for unassigned tasks that match your role.

### Step 2: Assign Yourself
Edit the issue's YAML frontmatter:
```yaml
assignee: <your-role>  # e.g., frontend-dev, backend-dev, qa-engineer
status: in-progress
started: YYYY-MM-DD
```

### Step 3: Move the File
Move the issue file from `kanban/backlog/` to `kanban/in-progress/`:
```bash
git mv kanban/backlog/ISSUE-XXX-description.md kanban/in-progress/
git commit -m "[kanban] chore: assign ISSUE-XXX to <your-role>"
```

### Step 4: Do the Work
- Follow the acceptance criteria in the issue
- Follow your skill's coding standards
- Keep changes focused and small

### Step 5: Ready for Review
Move to review when done:
```bash
git mv kanban/in-progress/ISSUE-XXX-description.md kanban/review/
git commit -m "[kanban] chore: ISSUE-XXX ready for review"
```

### Step 6: Update Status
Update the issue frontmatter:
```yaml
status: review
completed: YYYY-MM-DD
```

---

## 📝 How to Create a New Task

Create a new `.md` file in `kanban/backlog/` using this template:

```markdown
---
id: ISSUE-XXX
title: "Short descriptive title"
assignee: unassigned
priority: high | medium | low
status: backlog
created: YYYY-MM-DD
labels: [feature, bug, research, infra, marketing]
role: product-manager | frontend-dev | backend-dev | marketing-seo | qa-engineer
---

# ISSUE-XXX: Short descriptive title

## Description
Clear description of what needs to be done.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Notes
Any additional context or references.
```

**Issue ID format**: `ISSUE-XXX` where XXX is the next sequential number.
Check existing issues to find the next available number.

---

## ✅ When a Task is Done

After QA review passes:
```bash
git mv kanban/review/ISSUE-XXX-description.md kanban/done/
git commit -m "[kanban] chore: ISSUE-XXX completed"
```

Then **update `PROJECT_STATUS.md`** if the completed work is significant.

---

## ⚡ Quick Reference

| Action | Command |
|--------|---------|
| See all tasks | `ls kanban/*/` |
| My in-progress | `grep -r "assignee: <role>" kanban/in-progress/` |
| Create issue | Add `.md` to `kanban/backlog/` |
| Start task | `git mv kanban/backlog/ISSUE-XXX.md kanban/in-progress/` |
| Submit for review | `git mv kanban/in-progress/ISSUE-XXX.md kanban/review/` |
| Complete task | `git mv kanban/review/ISSUE-XXX.md kanban/done/` |
