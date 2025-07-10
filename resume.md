# Claude Command: Resume

This command restores full context for an issue when starting a new session by aggregating information from all available sources.

## Usage

```
/resume <issue-id>
```

Examples:
```
/resume 123
/resume scratch
```

## Parameters

- `<issue-id>` (required): Issue identifier to resume work on

## What This Command Does

1. **Reads all issue-related files**:
   - ISSUE-{id}.md for requirements and background
   - PLAN-{id}.md for technical approach and implementation steps
   - CONTEXT-{id}.md for progress history and discoveries

2. **Analyzes current working state**:
   - Git status and recent commits
   - Modified files and staged changes
   - Branch information and remote status

3. **Presents comprehensive context summary**:
   - Issue overview and key requirements
   - Implementation approach and current progress
   - Important discoveries and decisions made
   - Active blockers or issues to address
   - Immediate next steps

4. **Provides actionable guidance**:
   - What to work on next
   - Files that may need attention
   - Context for recent changes
   - Reminders of important constraints or decisions

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments and Validate
- Extract `issue-id` from arguments (required)
- Find project root (look for .git or package.json)
- Verify issue directory exists at: `{project-root}/.claude/issues/{issue-id}/`

### Step 2: Read Issue Files
Read and parse all available files in order of importance:

**Required:**
- `ISSUE-{issue-id}.md` - Extract title, type, description, requirements, acceptance criteria

**Optional (gracefully handle if missing):**
- `PLAN-{issue-id}.md` - Extract technical approach, implementation steps, risks
- `CONTEXT-{issue-id}.md` - Extract recent progress entries, discoveries, blockers

### Step 3: Analyze Git Context
Gather git-related context:
- Current branch and remote status
- Recent commits (last 10-20) that might relate to the issue
- Current working tree status (modified, staged, untracked files)
- Any work-in-progress changes

### Step 4: Generate Context Summary
Create a comprehensive but organized summary:

**Issue Overview:**
- Issue title and type
- Key requirements and acceptance criteria
- Background context and motivation

**Technical Approach:**
- Implementation plan overview
- Current phase/step in implementation
- Key technical decisions made

**Progress Summary:**
- Work completed so far
- Important discoveries or insights
- Current blockers or challenges
- Recent session summaries

**Current State:**
- Git working tree status
- Recent relevant commits
- Files that may need attention

**Next Steps:**
- Immediate actions to take
- Priority items from context
- Suggested focus areas

### Step 5: Present Information
Format the summary in a clear, scannable way:
- Use headers and bullet points for easy scanning
- Highlight critical information (blockers, deadlines, decisions)
- Include file references with line numbers when relevant
- Keep each section concise but comprehensive

### Step 6: Provide Action Guidance
End with specific, actionable guidance:
- What file(s) to look at first
- What task to start with
- Any important reminders or constraints
- Suggested next update-context timing

### Error Handling
- If issue directory doesn't exist, suggest creating issue first
- If no files exist, provide guidance on workflow setup
- If git repository issues, provide clear error messages
- Gracefully handle missing optional files

### Context Recovery Template
Present information using this structure:
```
# Resuming Work on Issue #{issue-id}: {title}

## 📋 Issue Overview
- **Type**: {type}
- **Status**: {inferred-from-context}
- **Priority**: {from-context-or-size}

**Key Requirements:**
{bullet-points-from-issue}

## 🛠 Technical Approach
{summary-from-plan}

**Current Implementation Phase:**
{inferred-from-context-and-plan}

## 📈 Progress Summary
**Completed:**
{from-context-entries}

**Key Discoveries:**
{important-insights-from-context}

**Active Blockers:**
{current-issues-to-address}

## 💻 Current Working State
**Git Status:**
{working-tree-status}

**Recent Commits:**
{relevant-recent-commits}

**Modified Files:**
{files-needing-attention}

## 🎯 Next Steps
1. {immediate-action-from-context}
2. {follow-up-tasks}
3. {suggested-focus-areas}

## 💡 Important Reminders
{key-constraints-decisions-or-notes}
```

## Workflow Integration

This command supports seamless context recovery:

1. Start new Claude session
2. **`/resume {issue-id}`** ← Restore full context
3. Continue implementation work
4. Use `/update-context {issue-id}` to track new progress
5. Repeat cycle as needed

## Notes

- Designed for quick context restoration across sessions
- Aggregates information from multiple sources automatically
- Provides actionable guidance for immediate productivity
- Safe to run multiple times - always gives current state
- Essential for maintaining productivity across context limits