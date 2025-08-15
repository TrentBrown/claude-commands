# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands Directory Structure

This is a collection of **AI-driven Claude Code commands** where:
- **Markdown files (`.md`)** contain comprehensive AI execution instructions and are the primary workflow drivers
- **JavaScript files (`.js`)** provide only utility functions and templates - no workflow logic
- **AI interprets and executes** the markdown instructions to perform command operations

## Available AI-Driven Commands

### Issue Management Commands
- `/issue-save <issue-id> [type-or-summary]` - AI creates issue template if needed, then extracts details from context
  - If issue doesn't exist: Creates template with specified type (or infers from context)
  - If issue exists: Updates with comprehensive details (optional summary for tracking)
- `/plan-save <issue-id> [summary]` - AI creates plan if needed, extracts approach from context
  - Always reads issue file first for complete context
  - If plan doesn't exist: Creates plan with codebase analysis
  - If plan exists: Updates with extracted planning details

### Session Management Commands
- `/session-load <issue-id>` - AI loads complete context for an issue (issue, plan, progress, learnings, project docs)
- `/session-save <issue-id>` - AI saves current session state and progress
- `/session-usage` - AI analyzes and reports on session token usage

### Memory Loading Commands
- `/issue-load <issue-id>` - AI loads just the issue file for quick reference
- `/plan-load <issue-id>` - AI loads just the plan file for implementation guidance
- `/progress-load <issue-id>` - AI loads just the progress file to see work history
- `/learnings-load` - AI loads project learnings for accumulated wisdom
- `/project-load [filename]` - AI loads project documentation (specific file or all if no filename)

### Progress & Learning Commands
- `/progress-save <issue-id> [mode]` - AI saves implementation progress (modes: progress, quick, discovery, blocker)
- `/learnings-save [topic]` - AI captures and saves project learnings and discoveries

### Development Commands
- `/git-commit [--no-verify]` - AI executes intelligent commit workflow with conventional commits and emoji
  - AI runs pre-commit checks (lint, build) unless `--no-verify` specified
  - AI analyzes changes using git/commit-helpers.js to suggest appropriate commit messages
  - AI supports extensive emoji mapping for commit types

## Project Structure

```
/Users/trent.brown/.claude/commands/
├── issue-save.md          # AI execution instructions for issue creation and capture
├── issue-load.md          # AI execution instructions for loading issue files
├── plan-save.md           # AI execution instructions for plan creation and capture
├── plan-load.md           # AI execution instructions for loading plan files
├── progress-save.md       # AI execution instructions for saving progress
├── progress-load.md       # AI execution instructions for loading progress files
├── learnings-save.md      # AI execution instructions for saving learnings
├── learnings-load.md      # AI execution instructions for loading project learnings
├── project-load.md        # AI execution instructions for loading project documentation
├── session-load.md        # AI execution instructions for loading full session context
├── session-save.md        # AI execution instructions for saving session state
├── session-usage.md       # AI execution instructions for analyzing token usage
├── git-commit.md          # AI execution instructions for commit workflow
├── git/
│   └── commit-helpers.js  # Utility functions for commit analysis and emoji mapping
└── templates.js           # Template utility functions for issues and plans
```

## AI-Driven Issue Management Workflow

The commands implement a structured issue management workflow driven by AI:

1. **Issue Management**: `/issue-save <id> [type]` - AI creates template if needed and extracts details from context
2. **Planning**: `/plan-save <id> [summary]` - AI creates plan if needed and extracts approach from context
3. **Progress Tracking**: `/progress-save <id> [mode]` - AI tracks implementation progress
4. **Learning Capture**: `/learnings-save [topic]` - AI saves discoveries and patterns
5. **Session Management**:
   - `/session-load <id>` - AI loads complete context for an issue
   - `/session-save <id>` - AI saves current session state
   - `/session-usage` - AI analyzes token usage
6. **Focused Context Loading**:
   - `/issue-load <id>` - AI loads specific issue file
   - `/plan-load <id>` - AI loads specific plan file
   - `/progress-load <id>` - AI loads specific progress file
   - `/learnings-load` - AI loads project learnings
   - `/project-load [file]` - AI loads project documentation

## Issue Types and Templates

Supported issue types with specialized templates:
- `feat` - New features (includes user story, UX considerations, API requirements)
- `fix` - Bug fixes (includes reproduction steps, expected/actual behavior, environment)
- `refactor` - Code refactoring (includes migration strategy, backward compatibility)
- `docs` - Documentation changes
- `style` - Code style changes
- `perf` - Performance improvements
- `test` - Testing related changes
- `chore` - Build process, tooling changes

## Commit Message Standards

The commit command enforces conventional commit format with emoji:
- Format: `<emoji> <type>: <description>`
- Automatic change analysis for appropriate commit type suggestion
- Comprehensive emoji mapping for different change types
- Pre-commit validation (lint, build checks)

## Project Memory

The `.claude/project/` directory provides persistent project-wide documentation:

### Purpose
- Store stable project knowledge that applies across all issues
- Document APIs, schemas, architecture decisions, conventions
- Provide reference material that AI can access during any session
- Complement issue-specific memory with project-wide context

### Usage
- **Creating**: Developers manually create markdown files in `.claude/project/`
- **Loading**: Automatically loaded by `/session-load` command
- **Accessing**: Use `/project-load [filename]` to load specific files
- **Loading All**: Use `/project-load` without arguments to load all project files

### Common Project Documentation Types
- `API.md` - Backend API specifications and endpoints
- `database-schema.md` - Database structure and relationships
- `architecture.md` - System design and architectural decisions
- `deployment.md` - Deployment procedures and environments
- `conventions.md` - Code style and project conventions
- `security.md` - Security guidelines and requirements
- `integrations.md` - Third-party service integrations

## Code Analysis Features

The planning commands include intelligent codebase analysis:
- Dependency analysis from package.json
- Project structure detection
- Type-specific file pattern matching
- Analysis suggestions based on issue type

## File Organization

Issues are organized in `.claude/issues/<issue-id>/` containing:
- `ISSUE-<id>.md` - Issue documentation
- `PLAN-<id>.md` - Implementation plan
- `PROGRESS.md` - Progress tracking for the issue

Project-wide files in `.claude/`:
- `LEARNINGS.md` - Accumulated project learnings and discoveries
- `CLAUDE.md` - Project-specific instructions for Claude

Project documentation in `.claude/project/`:
- Any number of markdown files with project-specific documentation
- Examples: `API.md`, `database-schema.md`, `architecture.md`, `deployment.md`
- Created and maintained manually by developers
- Loaded automatically by `/session-load` command

## AI-Driven Architecture

- **Markdown files** contain comprehensive step-by-step instructions that AI follows
- **JavaScript helpers** provide only utility functions (templates, analysis, emoji mapping)
- **AI interprets natural language** instructions to execute complex workflows
- **No hardcoded workflow logic** - all decision-making is AI-driven based on markdown instructions
- **Flexible and adaptable** - AI can handle edge cases and adapt to different contexts
- **Easy to modify** - workflow changes only require markdown updates, not code changes

## Development Notes

- ES modules used for JavaScript utilities
- Project root detection looks for `.git` or `package.json`
- Error handling and validation built into AI instruction sets
- All file operations are AI-managed based on markdown instructions
- Commands extract information from conversation context to minimize prompts