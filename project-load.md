# Claude Command: Load Project Memory

This command loads specific project documentation files from the .claude/project directory.

## Usage

```
/project-load [filename]
```

Examples:
```
/project-load API.md
/project-load database-schema
/project-load architecture.md
/project-load         # Loads all project files
```

## Parameters

- `[filename]` (optional): Name of the project file to load (with or without .md extension)
  - If omitted, loads all project files from the directory

## What This Command Does

1. **When filename provided**:
   - Loads the specified file from `.claude/project/`
   - Displays the complete contents
   - Provides context about the document

2. **When no filename provided**:
   - Loads all markdown files in `.claude/project/` into memory
   - Shows list of files loaded
   - Contents are available in context but not displayed

## Purpose

This command loads project-wide documentation such as:
- API specifications
- Database schemas
- Architecture decisions
- Environment configurations
- Deployment procedures
- Code conventions
- Integration documentation
- Security guidelines

## Output Format

When loading a specific file:
```
📚 Loading Project Documentation: API.md

════════════════════════════════════════
[File contents displayed here]
════════════════════════════════════════

✅ Loaded: API.md (2.3 KB)
```

When loading all files:
```
📚 Loading All Project Documentation

Found and loaded 3 files:
• API.md (2.3 KB)
• database-schema.md (4.1 KB)  
• architecture.md (3.7 KB)

✅ All project documentation loaded into context
```

## Implementation Instructions for AI

When executing this command, follow these steps:

### IMPORTANT: Tool Usage
- **ALWAYS use Claude Code's internal Read tool** for reading files
- **NEVER use external shells (iTerm MCP, etc.)** for file operations
- **Use the LS tool** for listing directory contents
- **Use the Bash tool only** for checking if paths exist
- All file reading must be done through the Read tool to ensure proper access

### Step 1: Parse Arguments
- Extract filename from arguments (optional)
- If filename provided, normalize (add .md if missing)
- Find project root (look for .git or package.json)

### Step 2: Check Project Directory
- Use LS tool to check `.claude/project/` directory
- If directory doesn't exist:
  - Note that no project documentation exists yet
  - Suggest creating `.claude/project/` directory
  - Explain purpose of project memory

### Step 3A: If Filename Provided
**Load specific file:**
- Path: `.claude/project/{filename}`
- Use Read tool to load the file
- If file exists:
  - Read complete contents using Read tool
  - Display with clear formatting
  - Show file size if available
- If file doesn't exist:
  - Use LS tool to list available files
  - Suggest closest match if possible

### Step 3B: If No Filename Provided
**Load all files:**
- Use LS tool to list `.claude/project/` directory
- Filter for markdown files (*.md)
- For each file found:
  - Use Read tool to load file contents into memory (don't display)
  - Track filename and file size
- Display summary:
  - List filenames with sizes
  - Total number of files loaded
- If no files found:
  - Explain project memory concept
  - Suggest types of documentation to add

### Step 4: Provide Context
Add helpful information:
- For API files: "Reference for backend endpoints"
- For schema files: "Database structure reference"
- For architecture: "System design decisions"
- For empty directory: "Project documentation can be added here"

### Step 5: Error Handling
- No project directory: Info message, explain purpose
- No files in directory: Suggest documentation types
- File not found: Show available files
- Read errors: Show error and suggest checking permissions

### Reading Strategy
- Read files completely into memory
- When loading all: Don't display contents, just show summary
- When loading specific file: Display full contents
- Preserve formatting and code blocks when displaying
- Show file metadata (size, name) in summary

## Integration with Other Commands

- **`/session-load`** - Automatically loads all project files
- **`/issue-save`** - May reference project documentation
- **`/plan-save`** - May incorporate project constraints

## Notes

- Project files are manually created by developers
- No automatic creation or modification of project files
- Files represent stable project knowledge
- Complements issue-specific memory with project-wide context
- Essential for maintaining consistency across features