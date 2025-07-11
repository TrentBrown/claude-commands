# Claude Command: Save Issue

This command captures the details of an issue by analyzing discussions and updating the issue file with comprehensive requirements, background, and acceptance criteria.

## Usage

```
/issue:save <issue-id> [summary]
```

Examples:
```
/issue:save 4708
/issue:save 123 "Updated requirements after stakeholder review"
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)
- `[summary]` (optional): Brief description of what was updated in this save

## What This Command Does

1. **Validates environment**:
   - Checks that ISSUE-{id}.md exists
   - Ensures we're in the correct project context

2. **Captures issue details**:
   - Prompts for comprehensive issue information
   - Gathers requirements and background context
   - Defines clear acceptance criteria
   - Collects technical constraints and estimates
   - Includes type-specific details (user stories, bug reproduction, etc.)

3. **Updates issue file**:
   - Preserves original creation metadata
   - Fills in all template sections with captured content
   - Updates timestamp and adds summary note
   - Maintains proper issue structure

4. **Presents for review**:
   - Shows what was captured
   - Prompts user to review and request changes if needed
   - Allows iteration until satisfied

## Content Capture

The command prompts for structured information based on issue type:

### Base Information (all types)
- **Title**: Clear, actionable issue title
- **Description**: What needs to be done and why
- **Background**: Context and motivation
- **Requirements**: Specific technical requirements
- **Acceptance Criteria**: How to know when complete
- **Technical Notes**: Constraints, dependencies, hints
- **Size Estimate**: Complexity/effort estimate (XS/S/M/L/XL)

### Type-Specific Sections

**For `feat` issues:**
- User story format
- User experience considerations
- API requirements (if applicable)

**For `fix` issues:**
- Bug reproduction steps
- Expected vs actual behavior
- Environment details
- Error messages/logs

**For `refactor` issues:**
- Current limitations/problems
- Desired end state
- Migration considerations

## File Updates

The command updates the existing ISSUE-{id}.md file by:
- **Preserving**: Creation date, original structure
- **Updating**: All content sections with captured information
- **Adding**: Updated timestamp and optional summary
- **Maintaining**: Type-specific template structure

## Workflow Integration

This command completes the symmetric issue workflow:

1. `/issue:create 123 feat` - Creates structured template
2. Research requirements, discuss with stakeholders
3. **`/issue:save 123`** - Captures comprehensive issue details ← You are here
4. `/plan:create 123` - Generate implementation plan
5. `/plan:save 123` - Capture planning results
6. `/context:save 123` - Track implementation progress

## Review and Iteration

After capturing content, the command:
- Shows complete issue summary for review
- Asks: "Does this accurately capture the issue requirements?"
- Offers options to:
  - Accept and save
  - Request specific revisions
  - Edit the file manually

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments and Validate
- Extract `issue-id` from arguments (required)
- Extract optional `summary` from remaining arguments
- Find project root (look for .git or package.json)
- Verify issue file exists at: `{project-root}/.claude/issues/{issue-id}/ISSUE-{issue-id}.md`

### Step 2: Read and Parse Existing Issue
- Read the existing issue file
- Extract current issue type (from `**Type:** {type}` line)
- Extract creation date (from `*Created: {date}*` line)
- Preserve these for final output

### Step 3: Interactive Content Capture
Based on the issue type, prompt for comprehensive information:

**Base Information (all types):**
- Issue title (clear and actionable)
- Description (what needs to be done and why)
- Background/Context (motivation for this work)
- Requirements (specific technical requirements)
- Acceptance Criteria (how to know when complete)
- Technical Notes (constraints, dependencies, hints)
- Size Estimate (XS/S/M/L/XL complexity)

**Type-Specific Information:**

**For `feat` issues:**
- User story (As a [user], I want [functionality] so that [benefit])
- User experience considerations
- API requirements (or "N/A" if not applicable)

**For `fix` issues:**
- Bug reproduction steps (step-by-step)
- Expected behavior
- Actual behavior
- Environment details (OS, browser, version, etc.)

**For `refactor` issues:**
- Current limitations/problems
- Desired end state
- Migration considerations

### Step 4: Present Summary for Review
Display comprehensive summary of captured information:
- Title, type, description, background, requirements
- Acceptance criteria, technical notes, size estimate
- All type-specific content
- Ask: "Does this accurately capture the issue requirements? (y/N)"

### Step 5: Update Issue File
If user confirms, update the issue file with:
- Preserve original creation date
- Update all content sections with captured information
- Set current date as "Last Updated"
- Add summary note if provided
- Maintain proper markdown structure

### Step 6: Provide Success Feedback
- Show file path where issue was saved
- Display summary if provided
- Remind user of next steps in workflow

### Content Template Structure
Generate updated content using this structure:
```
# Issue #{issue-id}: {title}

## Type
**Type:** {type}

## Description
{description}

## Background/Context
{background}

## Requirements
{requirements}

## Acceptance Criteria
{acceptanceCriteria}

## Technical Notes
{technicalNotes}

## References
- External Issue: [Link to proprietary system]
- Related: 

## Estimate
**Size:** {sizeEstimate}

{type-specific-sections}

---
*Created: {originalDate}*
*Last Updated: {currentDate}*
{summary-line-if-provided}
```

### Error Handling
- Check if issue file exists, guide user to create it first
- Handle invalid issue types gracefully
- Provide clear error messages for file system issues
- Allow user to cancel operation at any point

## Notes

- Works with issues created by `/issue:create` command
- Can be run multiple times to refine issue content
- Maintains all original template structure and metadata
- Issue becomes comprehensive reference after saving
- Compatible with existing workflow and file structure