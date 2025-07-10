# Claude Command: Save Plan

This command captures the results of an interactive planning session by analyzing the conversation and updating the plan file with the technical decisions and implementation details discussed.

## Usage

```
/save-plan <issue-id> [summary]
```

Examples:
```
/save-plan 123
/save-plan 456 "Updated with new authentication approach"
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)
- `[summary]` (optional): Brief description of what was updated in this save

## What This Command Does

1. **Validates environment**:
   - Checks that PLAN-{id}.md exists
   - Ensures we're in the correct project context

2. **Analyzes conversation**:
   - Reviews recent chat history for technical decisions
   - Extracts implementation steps and approaches
   - Identifies risks, considerations, and testing strategies
   - Looks for specific technical details and code examples

3. **Updates plan file**:
   - Preserves original overview and codebase analysis
   - Fills in the planning session results:
     - Technical Approach
     - Implementation Steps
     - Testing Strategy
     - Risks & Considerations
     - Type-specific sections

4. **Presents for review**:
   - Shows what was extracted from the conversation
   - Prompts user to review and request changes if needed
   - Updates timestamp and adds summary note

## Conversation Analysis

The command looks for key patterns in the chat history:
- **Technical decisions**: "We should use...", "The approach is...", "Let's implement..."
- **Implementation steps**: Numbered lists, task breakdowns, sequential actions
- **Architecture choices**: Framework decisions, design patterns, data flow
- **Risk identification**: "Watch out for...", "Potential issues...", "Consider..."
- **Testing approaches**: "We need to test...", "Verify that...", "Check for..."
- **Code specifics**: File names, function names, specific implementation details

## File Updates

The command updates the existing PLAN-{id}.md file by:
- **Preserving**: Overview, Codebase Analysis sections (from create-plan)
- **Updating**: Technical Approach, Implementation Steps, Testing Strategy, Risks
- **Adding**: Timestamp and summary of changes
- **Maintaining**: Plan versioning history

## Workflow Integration

This command is the capture point in the planning workflow:

1. `/create-plan 123` - Creates structured template with analysis
2. Interactive planning session in plan mode
3. **`/save-plan 123`** - Captures session results ← You are here
4. `/update-context 123` - Track progress during implementation

## Review and Revision

After analysis, the command:
- Shows extracted content for user review
- Asks: "Does this capture our discussion accurately?"
- Offers options to:
  - Accept and save
  - Request specific revisions
  - Manual edit the file directly

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments and Validate
- Extract `issue-id` from arguments (required)
- Extract optional `summary` from remaining arguments
- Find project root (look for .git or package.json)
- Verify plan file exists at: `{project-root}/.claude/issues/{issue-id}/PLAN-{issue-id}.md`

### Step 2: Read Current Plan
- Read the existing plan file
- Extract current structure and any existing content
- Identify which sections are still placeholder vs. filled

### Step 3: Analyze Recent Conversation
- Review recent chat history (last 10-20 messages)
- Extract technical decisions made during planning
- Identify implementation approaches discussed
- Note any risks or considerations mentioned
- Capture testing strategies discussed

### Step 4: Interactive Content Capture
Prompt for specific planning elements:
- **Technical Approach**: How will this be implemented?
- **Implementation Steps**: What are the specific steps?
- **Testing Strategy**: How will this be tested?
- **Risks & Considerations**: What should be watched out for?
- **Additional Notes**: Any other important planning details?

### Step 5: Update Plan File
- Replace placeholder sections with captured content
- Preserve original structure and metadata
- Add current date as "Last Updated"
- Include summary if provided

### Step 6: Provide Success Feedback
- Show plan file path
- Display summary if provided
- Remind user this creates immutable planning record
- Suggest next steps (begin implementation, track with `/update-context`)

### Content Structure
Update plan file maintaining this format:
```
# Plan - Issue #{issue-id}: {title}

## Overview
{existing-overview}

## Codebase Analysis
{existing-analysis}

## Technical Approach
{captured-technical-approach}

## Implementation Steps
{captured-implementation-steps}

## Testing Strategy
{captured-testing-strategy}

## Risks & Considerations
{captured-risks-and-considerations}

{type-specific-sections}

---
*Created: {originalDate}*
*Last Updated: {currentDate}*
{summary-line-if-provided}
```

### Error Handling
- Check if plan file exists, guide user to create it first
- Handle conversation analysis gracefully if no planning content found
- Provide clear error messages for file system issues
- Allow user to cancel operation

## Notes

- Works best when planning discussions are detailed and specific
- Can handle multiple save operations (updates existing content)
- Preserves all original template structure and codebase analysis
- Plan becomes immutable reference after saving (use versioning for major revisions)
- Analysis focuses on actionable technical details rather than general discussion