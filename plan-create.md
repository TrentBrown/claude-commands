# Claude Command: Create Plan

This command creates a new plan file based on an existing issue, with codebase analysis and structured planning template.

## Usage

```
/plan-create <issue-id>
```

Examples:
```
/plan-create 123
/plan-create scratch
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)

## What This Command Does

1. **Validates environment**:
   - Checks for CLAUDE.md (suggests `/init` if missing)
   - Checks for ISSUE-{id}.md (suggests `/issue-create` if missing)

2. **Handles existing plans**:
   - If PLAN-{id}.md exists, creates versioned backup (PLAN-{id}-v1.md, etc.)
   - Always creates fresh PLAN-{id}.md

3. **Gathers context**:
   - Reads ISSUE-{id}.md for requirements and background
   - Reads CLAUDE.md for project context
   - Performs targeted codebase analysis based on issue type

4. **Creates structured plan**:
   - Populates overview from issue description
   - Includes codebase analysis findings
   - Creates type-specific template sections
   - Provides suggestions for deeper analysis

5. **Prompts next steps**:
   - Suggests entering plan mode for interactive planning
   - Explains workflow with `/plan-save` command

## File Structure Created

```
.claude/
└── issues/
    └── {issue-id}/
        ├── ISSUE-{issue-id}.md    # Must exist
        ├── PLAN-{issue-id}.md     # Created/updated
        └── PLAN-{issue-id}-v1.md  # Previous version (if existed)
```

## Plan Template Structure

### Basic Template (all types)
- Overview (auto-populated from issue)
- Codebase Analysis (auto-generated)
- Technical Approach (empty - for planning session)
- Implementation Steps (empty - for planning session)
- Testing Strategy (empty - for planning session)
- Risks & Considerations (empty - for planning session)

### Type-Specific Additions

**For `feat` issues:**
- User Experience Considerations
- API Design (if applicable)

**For `fix` issues:**
- Root Cause Analysis
- Testing & Validation

**For `refactor` issues:**
- Migration Strategy
- Backward Compatibility

## Codebase Analysis

The command performs intelligent analysis based on issue type:
- **File pattern matching** for relevant components
- **Dependency analysis** for required packages
- **Similar code detection** for patterns and examples
- **Architectural considerations** based on project structure

Analysis is designed to be helpful but not overwhelming, with suggestions for deeper investigation.

## Workflow Integration

This command is designed to work with the planning workflow:

1. `/plan-create 123` - Creates structured plan with analysis
2. Enter plan mode manually for interactive planning session
3. `/plan-save 123` - Captures planning results from conversation
4. `/context-save 123` - Track ongoing progress

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments and Validate
- Extract `issue-id` from arguments (required)
- Find project root (look for .git or package.json)
- Check for CLAUDE.md file at project root (suggest `/init` if missing)
- Verify issue file exists at: `{project-root}/.claude/issues/{issue-id}/ISSUE-{issue-id}.md`

### Step 2: Handle Existing Plans
- Check if `PLAN-{issue-id}.md` exists in issue directory
- If exists, find next version number (PLAN-{issue-id}-v1.md, v2.md, etc.)
- Move existing plan to versioned file before creating new one

### Step 3: Read Issue Context
- Read and parse the issue file to extract:
  - Issue title (from first line)
  - Issue type (from `**Type:** {type}` line)
  - Description section content
  - Requirements section content

### Step 4: Generate Plan Template
- Use the inline template function below to generate the plan template
- Create basic plan structure with:
  - Overview (populated from issue description)
  - Codebase Analysis (to be filled with project-specific analysis)
  - Template sections for planning session

### Step 5: Perform Codebase Analysis
Based on issue type, analyze relevant areas:
- Check for common project files (package.json, nuxt.config.*, etc.)
- Identify relevant dependencies from package.json
- Look for file patterns matching issue type (components/, pages/, etc.)
- Generate analysis suggestions based on findings

### Step 6: Create Complete Plan File
- Write plan file with:
  - Issue overview and context
  - Codebase analysis results
  - Type-specific template sections
  - Placeholder content for planning session

### Step 7: Provide Success Feedback
- Show plan file path
- Display issue type and analysis summary
- Remind user of next steps (planning session, then `/plan-save`)

### Template Structure
Generate plan using this format:
```
# Plan - Issue #{issue-id}: {title}

## Overview
{description-from-issue}

## Codebase Analysis
**Project Structure:**
{detected-files-and-directories}

**Relevant Dependencies:**
{relevant-packages-from-package-json}

**Analysis Suggestions:**
{type-specific-suggestions}

## Technical Approach
*To be filled during planning session*

## Implementation Steps
*To be filled during planning session*

## Testing Strategy
*To be filled during planning session*

## Risks & Considerations
*To be filled during planning session*

{type-specific-sections}

---
*Created: {date}*
*Last Updated: {date}*
```

### Error Handling
- Guide user to create issue first if missing
- Suggest `/init` if CLAUDE.md missing
- Handle file system errors gracefully
- Provide clear error messages for common issues

## Notes

- Plan files become immutable after `/plan-save` - use versioning for revisions
- Codebase analysis suggestions help guide deeper investigation
- Template sections are left empty for collaborative planning session
- Always creates a fresh plan to incorporate latest codebase state

## Inline Template Function

Use this JavaScript code to generate the plan template:

```javascript
function getPlanTemplate(issueId, issueTitle, issueDescription) {
    const date = new Date().toISOString().split('T')[0];
    
    return `# Plan - Issue #${issueId}: ${issueTitle}

## Overview
${issueDescription || 'To be defined during planning session'}

## Codebase Analysis
**Project Structure:**
- Standard project structure detected

**Relevant Dependencies:**
- No specific dependencies identified

**Analysis Suggestions:**
- Manual codebase review recommended

## Technical Approach
*To be filled during planning session*

## Implementation Steps
*To be filled during planning session*

## Testing Strategy
*To be filled during planning session*

## Risks & Considerations
*To be filled during planning session*

---
*Created: ${date}*
*Last Updated: ${date}*`;
}
```