# Task Onboarding — How to Pick Up Work

> Read this file whenever you are instructed to "pick up a task from the backlog" or "start working on issues."

---

## 1. Fetching Open Tasks (GitHub Issues)

We manage all tasks via **GitHub Issues** on the repository: `Moris350/chrome_extentions`.
We NO LONGER use local markdown files for Kanban.

**How to find tasks:**
Use the `github-mcp-server` tool or run a curl command to list open issues:
```bash
curl -s -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" "https://api.github.com/repos/Moris350/chrome_extentions/issues?state=open"
```

## 2. Choosing a Task

1. Identify an open issue that matches your agent role (e.g., if you are the Frontend Dev, pick a UI issue).
2. Read the issue body and acceptance criteria.
3. If you need clarification, leave a comment on the issue using the MCP tool or curl.

## 3. Execution Phase

1. **Research First:** Don't write code blindly. Check the relevant `extensions/<name>/` folder.
2. **Context:** Ensure you read `PROJECT_STATUS.md` so you know the current architecture.
3. **Implement:** Write the code. Ensure it works. Add console logs if you need to debug via Node/Puppeteer.
4. **Commit:** `git add .` and `git commit -m "feat/fix: <description> (Closes #<issue_number>)"`

## 4. Closing the Loop

Once your code is pushed:
1. Close the GitHub issue (using the MCP `issue_write` tool with `state: "closed"`, or via curl).
2. **CRITICAL:** Update `.agents/context/PROJECT_STATUS.md` with a 1-sentence summary of what you just built. This ensures the next subagent or session knows what was completed.
3. Report back to the Parent Agent or User that the task is done.
