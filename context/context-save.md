# Claude Command: Save Context

This command updates the context file for an issue with current progress, discoveries, and work status. It serves as a living document to track implementation progress and preserve context across sessions.

## Usage

```
/context:save <issue-id> [mode]
```

Examples:
```
/context:save 123
/context:save 456 quick
/context:save scratch progress
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)
- `[mode]` (optional): Update mode
  - `progress` (default): Full progress update with prompts
  - `quick`: Quick status update
  - `discovery`: Log a discovery or insight
  - `blocker`: Record a blocking issue

## What This Command Does

1. **Creates or updates CONTEXT-{id}.md**:
   - Creates file if it doesn't exist
   - Appends to existing context log
   - Maintains chronological progress history

2. **Captures current state**:
   - Work completed since last update
   - Current focus and next steps
   - Discoveries and insights
   - Blockers or issues encountered
   - Files modified in current session

3. **Provides session continuity**:
   - Preserves context for future sessions
   - Documents decision rationale
   - Tracks evolving understanding
   - Records problem-solving approach

## Update Modes

### Progress Mode (Default)
Comprehensive update with structured prompts:
- Completed work since last update
- Current progress status
- Next planned actions
- Any discoveries or changes in approach
- Files modified
- Issues or blockers

### Quick Mode
Fast status update:
- Brief progress summary
- Current status (in progress, blocked, completed)
- Next immediate action

### Discovery Mode
Log insights and learnings:
- Technical discoveries
- Changed understanding
- Better approaches identified
- Lessons learned

### Blocker Mode
Record blocking issues:
- Description of blocker
- Attempted solutions
- Help needed
- Workarounds considered

## File Structure

The CONTEXT-{id}.md file maintains:

```markdown
# Context - Issue #123: [Title]

## Current Status
**Status:** In Progress
**Last Updated:** 2025-01-08 14:30
**Current Focus:** Implementing authentication flow

## Progress Log
### 2025-01-08 14:30 - Implementation Update
- ✅ Completed: User login component
- ✅ Completed: JWT token handling
- 🔄 In Progress: Password reset flow (60% complete)
- ⏭️ Next: Email verification system
- 📝 Discovery: Need to handle token refresh edge case

### 2025-01-08 10:15 - Session Start
- Started implementation following plan
- Set up development environment
- Reviewed authentication requirements

## Key Discoveries
- Token refresh needs special handling for concurrent requests
- User session state should persist across browser tabs
- Need to consider mobile app compatibility

## Current Problem
Working on password reset email template integration.
Need to verify SMTP configuration works in all environments.

## Files Modified This Session
- src/components/Login.vue
- src/stores/auth.js
- src/utils/tokenManager.js

## Next Actions
1. Complete password reset flow
2. Add email verification
3. Test authentication across all user flows
4. Update documentation
```

## Workflow Integration

This command supports the development workflow:

1. `/issue:create 123` → `/plan:create 123` → `/plan:save 123`
2. Begin implementation work
3. **`/context:save 123`** ← Regular progress tracking
4. Continue work, repeat context updates
5. Complete implementation

## Context Preservation

Designed to solve the context loss problem:
- **Before approaching context limits**: Quick save of current state
- **Between sessions**: Preserve where you left off
- **During long implementations**: Track evolution of approach
- **When context gets compacted**: Essential information preserved

## Smart Defaults

- Auto-detects git changes for "Files Modified" section
- Suggests next actions based on current progress
- Maintains running log of all updates
- Preserves key insights and discoveries

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments and Validate
- Extract `issue-id` from arguments (required)
- Extract optional `mode` from arguments (default: "progress")
- Find project root (look for .git or package.json)
- Verify issue file exists at: `{project-root}/.claude/issues/{issue-id}/ISSUE-{issue-id}.md`

### Step 2: Check Context File
- Look for existing `CONTEXT-{issue-id}.md` in issue directory
- If doesn't exist, create new context file with header
- If exists, read current content to understand progress history

### Step 3: Determine Update Mode
Based on mode parameter:
- **progress** (default): Full progress update with structured prompts
- **quick**: Brief status update
- **discovery**: Log specific insight or discovery
- **blocker**: Record blocking issue

### Step 4: Capture Update Content
Based on mode, prompt for:

**Progress Mode:**
- Work completed since last update
- Current focus and what you're working on
- Next steps planned
- Any discoveries or insights
- Blockers or issues encountered

**Quick Mode:**
- Brief status update (1-2 sentences)

**Discovery Mode:**
- What was discovered/learned
- How it impacts the work
- Any follow-up actions needed

**Blocker Mode:**
- Description of the blocking issue
- What was attempted
- What help or information is needed

### Step 5: Update Context File
- Append new entry with timestamp
- Maintain chronological order
- Use consistent formatting
- Include mode indicator in entry

### Step 6: Provide Feedback
- Show context file path
- Display what was recorded
- Remind user about context value for future sessions

### Context File Format
```
# Context - Issue #{issue-id}: {title}

## Progress Log

### {date} - {mode}
{captured-content}

### {previous-date} - {previous-mode}
{previous-content}

---
*Created: {date}*
*Last Updated: {current-date}*
```

### Error Handling
- Check if issue file exists, guide user to create it first
- Handle file system errors gracefully
- Provide clear error messages for invalid modes
- Allow user to cancel operation

## Notes

- Context file grows over time - represents full implementation journey
- Safe to update frequently - designed for regular use
- Works offline - just updates local file
- Integrates with existing ISSUE and PLAN files for complete picture
- Essential for maintaining productivity across context limits and sessions