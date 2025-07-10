# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands Directory Structure

This is a collection of **AI-driven Claude Code commands** where:
- **Markdown files (`.md`)** contain comprehensive AI execution instructions and are the primary workflow drivers
- **JavaScript files (`.js`)** provide only utility functions and templates - no workflow logic
- **AI interprets and executes** the markdown instructions to perform command operations

## Available AI-Driven Commands

### Issue Management Commands
- `/create-issue <issue-id> [type]` - AI creates structured issue templates using templates.js helpers
- `/save-issue <issue-id> [summary]` - AI conducts interactive content capture for comprehensive issue details  
- `/create-plan <issue-id>` - AI generates planning templates with intelligent codebase analysis
- `/save-plan <issue-id>` - AI captures planning session results through conversation analysis
- `/update-context <issue-id>` - AI updates progress tracking during implementation

### Development Commands
- `/commit [--no-verify]` - AI executes intelligent commit workflow with conventional commits and emoji
  - AI runs pre-commit checks (lint, build) unless `--no-verify` specified
  - AI analyzes changes using commit-helpers.js to suggest appropriate commit messages
  - AI supports extensive emoji mapping for commit types

## Project Structure

```
/Users/trent.brown/.claude/commands/
├── commit.md              # AI execution instructions for commit workflow
├── create-issue.md        # AI execution instructions for issue creation
├── create-plan.md         # AI execution instructions for plan generation
├── save-issue.md          # AI execution instructions for issue data capture
├── save-plan.md           # AI execution instructions for plan saving
├── update-context.md      # AI execution instructions for context tracking
├── commit-helpers.js      # Utility functions for commit analysis and emoji mapping
└── templates.js           # Template utility functions for issues and plans
```

## AI-Driven Issue Management Workflow

The commands implement a structured issue management workflow driven by AI:

1. **Issue Creation**: `/create-issue <id> [type]` - AI creates structured templates using templates.js
2. **Issue Completion**: `/save-issue <id>` - AI conducts interactive data capture with type-specific prompts
3. **Planning**: `/create-plan <id>` - AI generates planning templates with intelligent codebase analysis
4. **Plan Completion**: `/save-plan <id>` - AI analyzes conversation and captures planning results
5. **Implementation Tracking**: `/update-context <id>` - AI tracks progress with multiple modes (progress, quick, discovery, blocker)

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
- `PLAN-<id>-v<n>.md` - Versioned plan history

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
- Versioning system for plan files to maintain history
- Error handling and validation built into AI instruction sets
- All file operations are AI-managed based on markdown instructions