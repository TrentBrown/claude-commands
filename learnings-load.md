# Claude Command: Load Learnings

This command loads the project learnings file into the conversation context to provide accumulated knowledge, patterns, and best practices discovered during the project.

## Usage

```
/learnings-load
```

Examples:
```
/learnings-load
```

## Parameters

None required - this command loads the project-wide learnings file.

## What This Command Does

1. **Validates environment**:
   - Finds project root (looks for .git or package.json)
   - Checks that learnings file exists

2. **Reads learnings file**:
   - Loads `LEARNINGS.md` from `.claude/` directory
   - Displays all accumulated project learnings

3. **Provides project wisdom**:
   - Makes discovered patterns available for reference
   - Shows gotchas and best practices
   - Displays project-specific conventions and decisions

## File Structure

```
.claude/
└── LEARNINGS.md    # Project learnings file to be loaded
```

## Workflow Integration

This command is useful for:
- Starting work with awareness of past discoveries
- Avoiding previously encountered issues
- Understanding project-specific patterns
- Onboarding to a project's accumulated knowledge

## Implementation Instructions for AI

When executing this command, follow these steps:

### IMPORTANT: Tool Usage
- **ALWAYS use Claude Code's internal Read tool** for reading files
- **NEVER use external shells (iTerm MCP, etc.)** for file operations
- **Use the Bash tool only** for checking if directories exist
- All file reading must be done through the Read tool to ensure proper access

### Step 1: Find Project Root
- Look for .git directory or package.json file
- Start from current directory and walk up the directory tree
- If not found, show error about not being in a project directory

### Step 2: Check Learnings File Exists
- Use Read tool to check file at: `{project-root}/.claude/LEARNINGS.md`
- If doesn't exist, inform user that no learnings have been saved yet
- Suggest that learnings will be created as discoveries are made

### Step 3: Read and Display Learnings
- Use Read tool to load the complete learnings file
- Display it with a header indicating what's being loaded
- Format:
  ```
  Loading Project Learnings...
  
  [Full contents of LEARNINGS.md]
  ```

### Step 4: Provide Context Summary
- After displaying, highlight:
  - Number of learning entries
  - Key categories covered (if organized by sections)
  - Most recent additions (if timestamps present)
- Note: "Keep these learnings in mind during implementation"

### Step 5: Suggest Related Actions
- If working on an issue:
  - "These learnings may inform your approach"
- If discovering new patterns:
  - "New discoveries can be saved with `/learnings-save`"

### Error Handling
- If file doesn't exist, explain it will be created when needed
- Handle file system errors gracefully
- Don't treat missing file as error (learnings accumulate over time)

## Notes

- This command only reads and displays, never modifies
- Learnings file grows over time with project discoveries
- Contains project-specific wisdom not in documentation
- Complements `/session-load` for focused knowledge loading
- No issue-id parameter as learnings are project-wide