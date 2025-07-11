# Claude Command: Create Issue

This command creates a new issue folder and ISSUE.md file with a structured template.

## Usage

```
/issue:create <issue-id> [type]
```

Examples:
```
/issue:create 123
/issue:create 456 feat
/issue:create scratch fix
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)
- `[type]` (optional): Issue type. If not provided, you'll be prompted to select from:
  - `feat`: A new feature
  - `fix`: A bug fix  
  - `docs`: Documentation changes
  - `style`: Code style changes (formatting, etc)
  - `refactor`: Code changes that neither fix bugs nor add features
  - `perf`: Performance improvements
  - `test`: Adding or fixing tests
  - `chore`: Changes to the build process, tools, etc.

## What This Command Does

1. **Creates issue folder structure**:
   - Creates `.claude/issues/{issue-id}/` directory if it doesn't exist
   - Sets up proper project organization

2. **Generates issue template**:
   - Creates `ISSUE-{issue-id}.md` with structured template
   - Uses type-specific template sections based on issue type
   - Auto-populates metadata (dates, issue ID, type)

3. **Provides foundation for workflow**:
   - Creates placeholder sections for comprehensive issue capture
   - Sets up structure for `/save-issue` command to fill in details
   - Establishes consistent format across all issues

## File Structure Created

```
.claude/
└── issues/
    └── {issue-id}/
        └── ISSUE-{issue-id}.md
```

## Templates

The command uses different templates based on the issue type:

### Base Template (all types)
- Issue header with ID and title placeholder
- Type specification
- Description and background sections
- Requirements and acceptance criteria
- Technical notes and references
- Size estimate

### Type-Specific Additions

**For `fix` issues:**
- Bug details section with steps to reproduce
- Expected vs actual behavior
- Environment details

**For `feat` issues:**
- User story template
- Design notes section

## Workflow Integration

This command starts the symmetric issue workflow:

1. **`/issue:create 123 feat`** - Creates structured template ← You are here
2. Research requirements, discuss with stakeholders
3. **`/issue:save 123`** - Captures comprehensive issue details
4. **`/plan:create 123`** - Generate implementation plan
5. **`/plan:save 123`** - Capture planning results
6. **`/context:save 123`** - Track implementation progress

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments
- Extract `issue-id` from command arguments (required)
- Extract `type` from command arguments (optional)
- If no type provided, prompt user to select from: feat, fix, docs, style, refactor, perf, test, chore

### Step 2: Validate Arguments
- Ensure issue-id is provided
- If type is provided, validate it's one of the supported types
- If type is invalid, show error and exit

### Step 3: Find Project Root
- Look for .git directory or package.json file
- Start from current directory and walk up the directory tree
- If not found, show error about not being in a project directory

### Step 4: Set Up File Structure
- Create directory: `{project-root}/.claude/issues/{issue-id}/`
- Target file: `{project-root}/.claude/issues/{issue-id}/ISSUE-{issue-id}.md`
- If file already exists, prompt user for overwrite confirmation

### Step 5: Generate Template Content
- Import templates.js helper: `import { getIssueTemplate } from './templates.js'`
- Generate appropriate template using: `getIssueTemplate(issueId, type)`
- This will create type-specific template with proper sections

### Step 6: Write File and Provide Feedback
- Write the template content to the target file
- Show success message with file path
- Display issue type and next steps
- Remind user about the workflow: create-issue → save-issue → create-plan

### Error Handling
- Check if templates.js helper exists, if not show error
- Handle file system errors gracefully
- Provide clear error messages for common issues

### Example Execution Flow
```
User: /issue:create 123 feat
AI: 
1. Validates arguments (id=123, type=feat)
2. Finds project root
3. Creates .claude/issues/123/ directory
4. Generates feat template with user story sections
5. Writes to ISSUE-123.md
6. Shows success message and next steps
```

## Notes

- If the issue folder already exists, the command will warn before overwriting
- The file will be created with placeholder content for `/save-issue` to fill in
- All dates are auto-populated in ISO format
- Issue ID is automatically inserted throughout the template
- Template structure matches the comprehensive format expected by `/save-issue`