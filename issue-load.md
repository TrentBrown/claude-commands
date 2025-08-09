# Claude Command: Load Issue

This command loads an existing issue file into the conversation context to provide background and requirements for the current work session.

## Usage

```
/issue-load <issue-id>
```

Examples:
```
/issue-load 123
/issue-load 456
/issue-load scratch
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)

## What This Command Does

1. **Validates environment**:
   - Finds project root (looks for .git or package.json)
   - Checks that issue file exists

2. **Reads issue file**:
   - Loads `ISSUE-{issue-id}.md` from `.claude/issues/{issue-id}/`
   - Displays the complete issue content

3. **Provides context**:
   - Makes issue requirements available for reference
   - Enables informed planning and implementation
   - Shows current issue status and details

## File Structure

```
.claude/
└── issues/
    └── {issue-id}/
        └── ISSUE-{issue-id}.md    # File to be loaded
```

## Workflow Integration

This command is useful for:
- Starting work on an existing issue
- Reviewing requirements before implementation
- Refreshing context during a work session
- Preparing for planning with `/plan-save`

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments
- Extract `issue-id` from arguments (required)
- Validate that issue-id is provided

### Step 2: Find Project Root
- Look for .git directory or package.json file
- Start from current directory and walk up the directory tree
- If not found, show error about not being in a project directory

### Step 3: Check Issue File Exists
- Check for file at: `{project-root}/.claude/issues/{issue-id}/ISSUE-{issue-id}.md`
- If doesn't exist, inform user that issue doesn't exist
- Suggest using `/issue-save {issue-id}` to create it

### Step 4: Read and Display Issue
- Read the complete issue file
- Display it with a header indicating what's being loaded
- Format: 
  ```
  Loading Issue #{issue-id}...
  
  [Full contents of issue file]
  ```

### Step 5: Provide Context Summary
- After displaying, provide a brief summary:
  - Issue type
  - Title (if clear from content)
  - Size estimate (if present)
- Suggest next actions based on workflow:
  - "Ready to plan? Use `/plan-save {issue-id}`"
  - "Ready to implement? Review the requirements above"

### Error Handling
- If file doesn't exist, provide clear guidance
- Handle file system errors gracefully
- Suggest alternatives if issue can't be loaded

## Notes

- This command only reads and displays, never modifies
- Useful for quick context refresh without loading entire session
- Can be used multiple times in a session
- Complements `/session-load` for more focused context loading