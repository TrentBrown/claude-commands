# Claude Command: Save Plan

This command creates or updates a plan file based on an existing issue. It reads the issue file first, then intelligently extracts technical approach and implementation details from the conversation context, minimizing the need for additional prompts.

## Usage

```
/plan-save <issue-id> [summary]
```

Examples:
```
/plan-save 123
/plan-save 456 "Updated with new authentication approach"
/plan-save scratch
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)
- `[summary]` (optional): Brief description of what was updated in this save

## What This Command Does

### Always First
1. **Reads the issue file**:
   - Ensures we have complete issue context
   - Extracts requirements and background for planning

### If Plan File Doesn't Exist (Creation Mode)

1. **Creates file structure**:
   - Ensures `.claude/issues/{issue-id}/` directory exists
   - Creates `PLAN-{issue-id}.md` file

2. **Performs codebase analysis**:
   - Analyzes project structure and dependencies
   - Identifies relevant files and patterns
   - Generates type-specific analysis suggestions

3. **Proceeds to content extraction** (same as update mode below)

### If Plan File Exists (Update Mode)

1. **Shows overwrite warning**:
   - Warns user that existing plan will be updated
   - Allows user to cancel if needed

2. **Extracts details from conversation context**:
   - Analyzes entire conversation history
   - Extracts technical decisions and approaches
   - Identifies implementation steps and sequencing
   - Captures testing strategies mentioned
   - Notes risks and considerations discussed

3. **Fills gaps if needed**:
   - Reviews extracted information for completeness
   - Only prompts for critical missing planning details
   - Allows user to skip prompts if they prefer

4. **Updates plan file**:
   - Preserves or updates codebase analysis
   - Fills in all planning sections with extracted content
   - Updates timestamp and adds summary note

5. **Presents for review**:
   - Shows comprehensive summary of captured plan
   - Asks user if they want to add or modify anything
   - Saves upon confirmation

## Content Extraction Strategy

The command analyzes conversation context to extract:

### Planning Information
- **Technical Approach**: Architecture decisions, design patterns, frameworks chosen
- **Implementation Steps**: Task breakdowns, sequencing, specific actions
- **Testing Strategy**: Test types, validation approaches, success criteria
- **Risks & Considerations**: Potential issues, edge cases, dependencies

### Type-Specific Extraction

**For `feat` issues:**
- User experience flow and interactions
- API design and data structures
- Integration points

**For `fix` issues:**
- Root cause analysis discussed
- Fix approach and validation
- Regression prevention

**For `refactor` issues:**
- Migration strategy and phases
- Backward compatibility approach
- Rollback considerations

## File Structure

```
.claude/
└── issues/
    └── {issue-id}/
        ├── ISSUE-{issue-id}.md    # Must exist (read first)
        └── PLAN-{issue-id}.md     # Created or updated
```

## Workflow Integration

This command handles both creation and updating in the planning workflow:

1. `/issue-save 123` - Create/update issue with requirements
2. **`/plan-save 123`** - Creates plan if needed, extracts approach from context ← You are here
3. `/progress-save 123` - Track implementation progress

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments and Initial Setup
- Extract `issue-id` from arguments (required)
- Extract optional `summary` parameter
- Find project root (look for .git or package.json)
- If not found, show error about not being in a project directory

### Step 2: Read Issue File (ALWAYS)
- Check for issue file at: `{project-root}/.claude/issues/{issue-id}/ISSUE-{issue-id}.md`
- If doesn't exist, inform user to create issue first with `/issue-save {issue-id}`
- Read and parse the issue file to extract:
  - Issue title (from first line)
  - Issue type (from `**Type:** {type}` line)
  - Description, requirements, and background
  - Technical notes and constraints

### Step 3: Check If Plan File Exists
- Check for file at: `{project-root}/.claude/issues/{issue-id}/PLAN-{issue-id}.md`
- Branch based on whether file exists

### Step 4A: If File Doesn't Exist (Creation Flow)

**Create File Structure:**
- Ensure directory exists: `{project-root}/.claude/issues/{issue-id}/`
- Show creation message: "Creating new plan for Issue #{issue-id}"

**Perform Codebase Analysis:**
Based on issue type, analyze relevant areas:
- Check for common project files (package.json, nuxt.config.*, etc.)
- Identify relevant dependencies from package.json
- Look for file patterns matching issue type (components/, pages/, etc.)
- Generate analysis suggestions based on findings

**Continue to Step 5 (Content Extraction)**

### Step 4B: If File Exists (Update Flow)
- **Show overwrite warning**: "Plan file already exists. This will update/overwrite the current content. Continue? (y/N)"
- If user declines, exit gracefully
- Read existing plan file to understand current state
- The summary parameter is used for tracking changes

### Step 5: Extract Content from Conversation Context

**Analyze entire conversation history to extract:**

**Technical Planning:**
- **Technical Approach**: Look for architecture decisions, "we should use", "the approach is"
- **Implementation Steps**: Numbered lists, task breakdowns, "first we'll", "then we'll"
- **Testing Strategy**: "test by", "verify that", validation approaches
- **Risks**: "watch out for", "potential issues", "edge cases"

**Type-Specific Extraction:**

**For `feat` issues:**
- User flow descriptions and interactions
- API endpoint designs and data models
- Component structure and state management

**For `fix` issues:**
- Root cause analysis ("the problem is caused by")
- Fix approach ("we can fix this by")
- Validation steps ("verify the fix by")

**For `refactor` issues:**
- Current limitations discussed
- Migration approach ("migrate by", "phase 1/2/3")
- Compatibility considerations

### Step 6: Review Extracted Information

**Assess completeness:**
- Check if technical approach is clear
- Verify implementation steps are actionable
- Ensure testing strategy exists
- Confirm risks are identified

**If critical information is missing:**
- Prepare minimal prompts for only missing pieces
- Example: "I've extracted most of the plan. Could you clarify: [missing items]?"
- Allow user to skip with "Let's go with what we have"

### Step 7: Present Summary for Review

Display comprehensive summary:
```
I've captured the following plan from our discussion:

**Technical Approach:**
[extracted approach]

**Implementation Steps:**
[extracted steps]

**Testing Strategy:**
[extracted testing]

**Risks & Considerations:**
[extracted risks]

[Include type-specific sections if relevant]

Would you like to:
1. Save as-is
2. Add or modify anything specific
3. Let me fill in a few missing details
```

### Step 8: Handle User Response

**If user wants to modify:**
- Accept specific additions/changes
- Update the extracted content accordingly

**If user identifies gaps:**
- Prompt for only those specific items
- Keep prompts concise and focused

**If user approves:**
- Proceed to save

### Step 9: Update Plan File

Write the plan file with:
- Issue context from the issue file
- Codebase analysis (new or updated)
- All extracted planning content
- Current date as "Last Updated"
- Summary note if provided
- Proper markdown structure

### Step 10: Provide Success Feedback
- Show file path where plan was saved
- Display whether plan was created or updated
- Brief summary of what was captured
- Suggest next step: "Ready to start implementation? Track progress with `/progress-save {issue-id}`"

### Content Extraction Tips

**Look for these patterns in conversation:**
- "We should..." → technical approach
- "First/Next/Then..." → implementation steps
- "Test by..." → testing strategy
- "Be careful of..." → risks
- "The architecture..." → technical approach
- "Component/Module..." → implementation details
- "Validate that..." → testing approach
- "Migration path..." → refactor strategy

**Inference rules:**
- If discussing data flow → likely technical approach
- If numbered lists → likely implementation steps
- If "verify" or "check" → likely testing strategy
- If "potential issue" → likely risk
- Detailed discussion → comprehensive plan
- Brief discussion → high-level plan

### Codebase Analysis Patterns

**For all types, check:**
- Project structure (src/, lib/, components/, etc.)
- Configuration files (*.config.js, *.json)
- Package.json for dependencies and scripts
- Test file patterns (*.test.*, *.spec.*)

**Type-specific analysis:**
- **feat**: Look for similar features, component patterns
- **fix**: Look for related error handling, test coverage
- **refactor**: Look for current implementation, dependencies

### Error Handling
- If issue file missing, guide user to create it first
- Handle file system errors gracefully
- If context is inadequate for planning, explain what's needed
- Allow user to cancel operation at any point

## Plan Template Structure

Use this template for new plans:

```
# Plan - Issue #{issue-id}: {title}

## Overview
{description-from-issue}

## Codebase Analysis
**Project Structure:**
{detected-structure}

**Relevant Dependencies:**
{relevant-packages}

**Analysis Suggestions:**
{type-specific-suggestions}

## Technical Approach
{extracted-or-captured-approach}

## Implementation Steps
{extracted-or-captured-steps}

## Testing Strategy
{extracted-or-captured-testing}

## Risks & Considerations
{extracted-or-captured-risks}

{type-specific-sections if applicable}

---
*Created: {date}*
*Last Updated: {date}*
{summary-line-if-provided}
```

## Notes

- Always reads issue file first to ensure complete context
- Intelligently extracts planning details from conversation
- Minimizes prompts by inferring from discussion
- Single plan file per issue (no versioning)
- Can be run multiple times to refine plan content
- Combines creation and update functionality seamlessly