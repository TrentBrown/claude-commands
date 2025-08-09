# Claude Command: Load Plan

This command loads an existing plan file into the conversation context to provide technical approach and implementation steps for the current work session.

## Usage

```
/plan-load <issue-id>
```

Examples:
```
/plan-load 123
/plan-load 456
/plan-load scratch
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)

## What This Command Does

1. **Validates environment**:
   - Finds project root (looks for .git or package.json)
   - Checks that plan file exists

2. **Reads plan file**:
   - Loads `PLAN-{issue-id}.md` from `.claude/issues/{issue-id}/`
   - Displays the complete plan content

3. **Provides implementation guidance**:
   - Makes technical approach available for reference
   - Shows implementation steps and testing strategy
   - Displays risks and considerations

## File Structure

```
.claude/
└── issues/
    └── {issue-id}/
        └── PLAN-{issue-id}.md    # File to be loaded
```

## Workflow Integration

This command is useful for:
- Starting implementation of a planned issue
- Reviewing technical approach before coding
- Refreshing plan details during implementation
- Understanding risks and testing requirements

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments
- Extract `issue-id` from arguments (required)
- Validate that issue-id is provided

### Step 2: Find Project Root
- Look for .git directory or package.json file
- Start from current directory and walk up the directory tree
- If not found, show error about not being in a project directory

### Step 3: Check Plan File Exists
- Check for file at: `{project-root}/.claude/issues/{issue-id}/PLAN-{issue-id}.md`
- If doesn't exist, inform user that plan doesn't exist
- Suggest using `/plan-save {issue-id}` to create it

### Step 4: Read and Display Plan
- Read the complete plan file
- Display it with a header indicating what's being loaded
- Format:
  ```
  Loading Plan for Issue #{issue-id}...
  
  [Full contents of plan file]
  ```

### Step 5: Provide Implementation Summary
- After displaying, provide a brief summary:
  - Key technical decisions
  - Number of implementation steps
  - Main risks to watch for
- Suggest next actions:
  - "Ready to implement? Follow the steps above"
  - "Track progress with `/progress-save {issue-id}`"

### Step 6: Optional Issue Context
- Check if corresponding issue file exists
- If user hasn't loaded the issue, suggest:
  - "Load issue context with `/issue-load {issue-id}` for complete requirements"

### Error Handling
- If file doesn't exist, provide clear guidance
- Handle file system errors gracefully
- Suggest creating plan if missing

## Notes

- This command only reads and displays, never modifies
- Useful for quick plan review without loading entire session
- Can be used multiple times in a session
- Works well with `/issue-load` for complete context