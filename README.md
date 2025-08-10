# Claude Commands

A comprehensive AI-driven command system for [Claude Code](https://claude.ai/code) that streamlines issue tracking, planning, and development workflows.

> **📖 Note**: This README provides a quick overview. For detailed implementation instructions, command parameters, and technical documentation, see **[CLAUDE.md](./CLAUDE.md)**.

## Overview

This repository contains a collection of intelligent commands that enhance your Claude Code experience by providing structured workflows for:

- 📝 **Issue Management** - Create and track issues with intelligent context extraction
- 📋 **Planning** - Generate implementation plans with codebase analysis
- 📊 **Progress Tracking** - Monitor implementation progress across sessions
- 🧠 **Learning Capture** - Save and retrieve project discoveries
- 🔄 **Session Management** - Load and save complete context between sessions
- 📦 **Git Integration** - Smart commits with conventional format and emoji

## Quick Start

1. Clone this repository to your home directory:
   ```bash
   git clone https://github.com/TrentBrown/claude-commands.git ~/.claude/commands
   ```
2. Use commands like `/issue-save`, `/plan-save`, `/session-load` in Claude Code in any project
3. Commands intelligently extract information from conversation context, minimizing prompts

## Key Features

- **Context-Aware**: Commands extract details from your conversation, reducing manual input
- **Unified Workflows**: Single commands handle both creation and updates
- **Granular Loading**: Load specific files or complete context as needed
- **Safety First**: Overwrite warnings protect existing work
- **Project Memory**: Accumulate learnings and patterns over time

## Available Commands

### Core Workflow Commands
- `/issue-save <id> [type]` - Create or update issues with smart extraction
- `/plan-save <id>` - Generate or update implementation plans
- `/progress-save <id>` - Track implementation progress
- `/learnings-save` - Capture project discoveries

### Context Loading Commands
- `/session-load <id>` - Load complete issue context
- `/issue-load <id>` - Load specific issue file
- `/plan-load <id>` - Load specific plan file
- `/progress-load <id>` - Load progress history
- `/learnings-load` - Load project learnings

### Utility Commands
- `/session-save <id>` - Save current session state
- `/session-usage` - Analyze token usage
- `/git-commit` - Create smart conventional commits

## 📚 Full Documentation

**⚠️ This README is just an overview!** For comprehensive documentation including:
- Detailed command parameters and options
- Step-by-step implementation instructions
- Content extraction strategies
- Type-specific templates
- Workflow integration patterns
- Error handling details
- AI-driven architecture explanation

**→ See [CLAUDE.md](./CLAUDE.md) for the complete documentation ←**

## Project Structure

```
~/.claude/
├── commands/           # This repository (global commands)
│   ├── *.md           # Command implementation files
│   ├── templates.js   # Issue and plan templates
│   └── git/           # Git helpers

[Your Project]/.claude/
└── issues/            # Project-specific issues (created by commands)
    └── {issue-id}/
        ├── ISSUE-{id}.md
        ├── PLAN-{id}.md
        └── PROGRESS.md
```

## How It Works

1. **Markdown-Driven**: Each `.md` file contains comprehensive instructions that Claude Code follows
2. **Context Extraction**: Commands analyze conversation history to extract relevant information
3. **Smart Defaults**: Infers issue types, requirements, and technical decisions from context
4. **Progressive Enhancement**: Start simple, commands adapt to available information

## Example Workflow

```bash
# 1. Discuss a new feature with Claude
"I need to add user authentication to the app..."

# 2. Save the issue with context extraction
/issue-save 123 feat

# 3. Discuss technical approach
"We should use JWT tokens with refresh..."

# 4. Save the plan
/plan-save 123

# 5. Track progress as you work
/progress-save 123

# 6. Load everything in next session
/session-load 123
```

## Want More Details?

This README covers the basics. For deep dives into:
- **How each command works internally** 
- **Customizing commands for your workflow**
- **Understanding the AI-driven architecture**
- **Extending the system with new commands**

**→ Check out [CLAUDE.md](./CLAUDE.md) - The Complete Technical Guide**

## Contributing

Feel free to fork, customize, and submit pull requests. These commands are designed to be modified - just update the markdown instructions! See [CLAUDE.md](./CLAUDE.md) for implementation patterns.

## License

MIT - See LICENSE file for details

---

**Note**: This is an unofficial tool that enhances Claude Code. For official Claude Code documentation, visit [docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code).