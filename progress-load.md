# Claude Command: Load Progress

This command loads the progress tracking file for a specific issue into the conversation context to provide implementation status and history.

## Usage

```
/progress-load <issue-id>
```

Examples:
```
/progress-load 123
/progress-load 456
/progress-load scratch
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)

## What This Command Does

1. **Validates environment**:
   - Finds project root (looks for .git or package.json)
   - Checks that progress file exists

2. **Reads progress file**:
   - Loads `PROGRESS.md` from `.claude/issues/{issue-id}/`
   - Displays all progress entries chronologically

3. **Provides implementation history**:
   - Shows what has been completed
   - Displays current blockers or issues
   - Reveals implementation decisions and discoveries

## File Structure

```
.claude/
└── issues/
    └── {issue-id}/
        ├── ISSUE-{issue-id}.md
        ├── PLAN-{issue-id}.md
        └── PROGRESS.md         # Progress tracking file to be loaded
```

## Workflow Integration

This command is useful for:
- Resuming work on an in-progress issue
- Understanding what's already been done
- Reviewing implementation decisions
- Identifying current blockers
- Continuing from where you left off

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments
- Extract `issue-id` from arguments (required)
- Validate that issue-id is provided

### Step 2: Find Project Root
- Look for .git directory or package.json file
- Start from current directory and walk up the directory tree
- If not found, show error about not being in a project directory

### Step 3: Check Progress File Exists
- Check for file at: `{project-root}/.claude/issues/{issue-id}/PROGRESS.md`
- If doesn't exist, inform user that no progress has been tracked yet
- Suggest starting work and using `/context-save {issue-id}` to track progress

### Step 4: Read and Display Progress
- Read the complete progress file
- Display it with a header indicating what's being loaded
- Format:
  ```
  Loading Progress for Issue #{issue-id}...
  
  [Full contents of PROGRESS.md]
  ```

### Step 5: Provide Status Summary
- After displaying, analyze and summarize:
  - Total number of progress entries
  - Most recent update timestamp
  - Current status (in progress, blocked, etc.)
  - Key accomplishments so far
- Identify next steps from the progress:
  - Uncompleted tasks mentioned
  - Blockers that need resolution
  - TODOs or follow-ups noted

### Step 6: Suggest Related Context
- Check what other files exist for this issue:
  - "Load full issue with `/issue-load {issue-id}`"
  - "Load plan with `/plan-load {issue-id}`"
  - "Load complete context with `/session-load {issue-id}`"

### Step 7: Suggest Next Actions
- Based on progress status:
  - If blocked: "Address the blocker mentioned above"
  - If in progress: "Continue with the next steps identified"
  - If appears complete: "Consider if ready to close the issue"
- Remind: "Track new progress with `/context-save {issue-id}`"

### Error Handling
- If file doesn't exist, explain no progress tracked yet
- Handle file system errors gracefully
- Don't treat missing file as error (progress starts when work begins)

## Notes

- This command only reads and displays, never modifies
- Progress files contain chronological implementation history
- Each entry is timestamped for tracking
- Useful for handoffs between sessions or team members
- Complements other load commands for complete context