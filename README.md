# Chrome Extensions Business

> Freemium Chrome Extensions — Build, Ship, Monetize

## Overview

This repository contains the infrastructure for developing, testing, and selling Chrome browser extensions using a Freemium business model.

## Structure

| Directory | Purpose |
|-----------|---------|
| `extensions/` | Individual extension projects |
| `shared/` | Shared utilities and libraries |
| `kanban/` | Task tracking (Markdown-based Kanban board) |
| `docs/` | Business documentation and guides |
| `.agents/` | Agent skills and persistent context |

## Quick Start

1. Check `kanban/BOARD.md` for current tasks
2. Read `.agents/context/PROJECT_STATUS.md` for current state
3. Pick a task from `kanban/backlog/`, assign yourself, and start working

## Business Model

- **Free tier**: Core functionality available to all users
- **Premium tier**: Advanced features via one-time purchase or subscription
- **Distribution**: Chrome Web Store
- **Payments**: Stripe / LemonSqueezy integration

## Team

Managed by an AI agent team — see `GEMINI.md` for roles and workflow.
