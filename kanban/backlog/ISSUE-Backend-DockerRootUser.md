---
title: "Implement Docker Security Best Practices (Non-root user)"
assignee: backend-dev
status: backlog
---

# Issue: Docker security best practices (non-root users)

## Description
The `Dockerfile` for the backend server (`backend/Dockerfile`) runs the Node.js application as the `root` user by default. This violates the principle of least privilege. If the Node.js application is compromised, the attacker would have root access within the container, escalating the potential impact.

## Requirements
- Modify `backend/Dockerfile` to use a non-root user.
- The `node` image already provides a built-in `node` user. Use `USER node` before the `CMD` instruction.
- Ensure file permissions (like ownership of `/app`) are correctly set via `chown` when copying files.
