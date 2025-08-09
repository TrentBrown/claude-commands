# Claude Command: Save Issue

This command creates or updates an issue file with comprehensive requirements, background, and acceptance criteria. It intelligently extracts details from the conversation context, minimizing the need for additional prompts.

## Usage

```
/issue-save <issue-id> [type-or-summary]
```

Examples:
```
/issue-save 4708
/issue-save 123 feat
/issue-save 456 "Updated requirements after stakeholder review"
/issue-save scratch fix
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)
- `[type-or-summary]` (optional): 
  - If issue file doesn't exist: Issue type (feat, fix, docs, style, refactor, perf, test, chore)
  - If issue file exists: Brief description of what was updated in this save

## What This Command Does

### If Issue File Doesn't Exist (Creation Mode)

1. **Determines issue type**:
   - Uses provided type parameter if given
   - Or infers from conversation context (looking for keywords like "bug", "feature", "refactor")
   - Or prompts user to select from: feat, fix, docs, style, refactor, perf, test, chore

2. **Creates file structure**:
   - Creates `.claude/issues/{issue-id}/` directory
   - Generates type-specific template
   - Creates `ISSUE-{issue-id}.md` file

3. **Proceeds to content extraction** (same as update mode below)

### If Issue File Exists (Update Mode)

1. **Validates environment**:
   - Checks that ISSUE-{id}.md exists
   - Reads existing type and metadata

2. **Extracts details from conversation context**:
   - Analyzes the entire conversation history
   - Intelligently extracts requirements, background, acceptance criteria
   - Identifies technical constraints and implementation details
   - Captures any bug reproduction steps, user stories, or design notes mentioned
   - Infers size estimate based on discussion complexity

3. **Fills gaps if needed**:
   - Reviews extracted information for completeness
   - Only prompts for critical missing information
   - Allows user to skip prompts if they prefer

4. **Updates issue file**:
   - Preserves original creation metadata
   - Fills in all template sections with extracted/captured content
   - Updates timestamp and adds summary note
   - Maintains proper issue structure

5. **Presents for review**:
   - Shows comprehensive summary of captured details
   - Asks user if they want to add or modify anything
   - Saves upon confirmation

## Content Extraction Strategy

The command analyzes conversation context to extract:

### Base Information (all types)
- **Title**: Inferred from problem statement or main topic discussed
- **Description**: Synthesized from user's explanation of the need
- **Background**: Context and motivation mentioned in discussion
- **Requirements**: Technical requirements stated or implied
- **Acceptance Criteria**: Success conditions mentioned or inferred
- **Technical Notes**: Constraints, dependencies, tools discussed
- **Size Estimate**: Inferred from scope of discussion (XS/S/M/L/XL)

### Type-Specific Extraction

**For `feat` issues:**
- User stories from user need descriptions
- UX considerations from interface discussions
- API requirements from endpoint/data discussions

**For `fix` issues:**
- Bug symptoms and reproduction steps mentioned
- Error messages or logs shared
- Environment details from context

**For `refactor` issues:**
- Current problems/limitations discussed
- Desired improvements mentioned
- Migration or compatibility concerns raised

## File Structure

```
.claude/
└── issues/
    └── {issue-id}/
        └── ISSUE-{issue-id}.md
```

## Workflow Integration

This command handles both creation and saving in the issue workflow:

1. **`/issue-save 123 [type]`** - Creates template if needed, extracts details from context ← You are here
2. `/plan-create 123` - Generate implementation plan
3. `/plan-save 123` - Capture planning results
4. `/context-save 123` - Track implementation progress

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments and Initial Setup
- Extract `issue-id` from arguments (required)
- Extract optional second parameter (could be type or summary)
- Find project root (look for .git or package.json)
- If not found, show error about not being in a project directory

### Step 2: Check If Issue File Exists
- Check for file at: `{project-root}/.claude/issues/{issue-id}/ISSUE-{issue-id}.md`
- Branch based on whether file exists

### Step 3A: If File Doesn't Exist (Creation Flow)

**Determine Issue Type:**
- If second parameter is a valid type (feat, fix, docs, style, refactor, perf, test, chore), use it
- Otherwise, analyze conversation context to infer type:
  - Keywords like "bug", "error", "broken", "not working" → fix
  - Keywords like "feature", "add", "new", "implement" → feat
  - Keywords like "refactor", "restructure", "reorganize", "cleanup" → refactor
  - Keywords like "performance", "slow", "optimize", "speed up" → perf
  - Keywords like "documentation", "docs", "readme" → docs
  - Keywords like "test", "testing", "coverage" → test
- If unable to infer with confidence, prompt user to select type

**Create File Structure:**
- Create directory: `{project-root}/.claude/issues/{issue-id}/`
- Generate template using the inline template function (see below)
- Write template to `ISSUE-{issue-id}.md`
- Show creation confirmation

**Continue to Step 4 (Content Extraction)**

### Step 3B: If File Exists (Update Flow)
- Read the existing issue file
- **Show overwrite warning**: "Issue file already exists. This will update/overwrite the current content. Continue? (y/N)"
- If user declines, exit gracefully
- Extract current issue type (from `**Type:** {type}` line)
- Extract creation date (from `*Created: {date}*` line)
- Preserve these for final output
- The second parameter (if provided) is treated as a summary

### Step 4: Extract Content from Conversation Context

**Analyze entire conversation history to extract:**

**Base Information:**
- **Title**: Look for clear problem statements, feature requests, or main topics
- **Description**: Synthesize from user's explanations and requirements
- **Background**: Extract motivation, why this is needed, problems being solved
- **Requirements**: List all technical requirements mentioned or implied
- **Acceptance Criteria**: Extract success conditions, "done when" statements
- **Technical Notes**: Capture mentioned tools, frameworks, constraints, dependencies
- **Size Estimate**: Infer from discussion scope (simple mention=XS, detailed discussion=M-L, complex multi-part=XL)

**Type-Specific Extraction:**

**For `feat` issues:**
- Convert user need descriptions to user story format
- Extract any UI/UX considerations mentioned
- Note API endpoints, data structures, integrations discussed

**For `fix` issues:**
- Extract any mentioned reproduction steps or sequences
- Capture error messages, stack traces, logs shared
- Note environment details (browser, OS, versions) if mentioned
- Identify expected vs actual behavior from descriptions

**For `refactor` issues:**
- Extract current pain points and limitations
- Capture desired end state or improvements
- Note any migration or backward compatibility concerns

### Step 5: Review Extracted Information

**Assess completeness:**
- Check if title is clear and actionable
- Verify description explains the what and why
- Ensure at least 2-3 acceptance criteria exist
- Confirm technical context is sufficient

**If critical information is missing:**
- Prepare a minimal prompt for only the missing pieces
- Example: "I've extracted most details from our discussion. Could you briefly provide: [missing items]?"
- Allow user to skip with "Let's go with what we have"

### Step 6: Present Summary for Review

Display comprehensive summary:
```
I've captured the following from our discussion:

**Title:** [extracted title]
**Type:** [type]
**Description:** [extracted description]

**Requirements:**
[extracted requirements]

**Acceptance Criteria:**
[extracted criteria]

[Include type-specific sections]

Would you like to:
1. Save as-is
2. Add or modify anything specific
3. Let me fill in a few missing details
```

### Step 7: Handle User Response

**If user wants to modify:**
- Accept specific additions/changes
- Update the extracted content accordingly

**If user identifies gaps:**
- Prompt for only those specific items
- Keep prompts concise and focused

**If user approves:**
- Proceed to save

### Step 8: Update Issue File

Write the issue file with:
- Preserve original creation date (or use current date if new)
- All extracted and refined content
- Current date as "Last Updated"
- Summary note if provided
- Proper markdown structure

### Step 9: Provide Success Feedback
- Show file path where issue was saved
- Display whether issue was created or updated
- Brief summary of what was captured
- Suggest next step: "Ready to create a plan? Use `/plan-create {issue-id}`"

### Content Extraction Tips

**Look for these patterns in conversation:**
- "I need..." → requirement
- "The problem is..." → background/context
- "It should..." → acceptance criteria
- "Currently..." → current state (for refactors)
- "When I..." → reproduction steps (for bugs)
- "Users want..." → user story elements
- "Make sure..." → technical notes/constraints
- "Don't forget..." → additional requirements

**Inference rules:**
- If user describes a problem without solution → likely a fix
- If user requests new capability → likely a feat
- If user wants to improve existing code → likely a refactor
- If discussion is brief/simple → likely XS or S
- If multiple components discussed → likely M or larger

### Error Handling
- Handle file system errors gracefully
- If context is completely inadequate, explain what's needed
- Allow user to cancel operation at any point

## Inline Template Function

Use this JavaScript code to generate the issue template:

```javascript
function getIssueTemplate(issueId, type) {
    const date = new Date().toISOString().split('T')[0];

    let template = `# Issue #${issueId}: [Title]

## Type
**Type:** ${type}

## Description
<!-- Clear, concise description of what needs to be done -->

## Background/Context
<!-- Why is this needed? What problem does it solve? -->

## Requirements
<!-- What specifically needs to be implemented/fixed/changed? -->

## Acceptance Criteria
<!-- How do we know when this is complete? -->
- [ ]
- [ ]
- [ ]

## Technical Notes
<!-- Technical constraints, dependencies, implementation hints -->

## References
<!-- Links to external issue tracker, designs, docs, related PRs -->
- External Issue: [Link to proprietary system]
- Related:

## Estimate
<!-- Rough size estimate: XS | S | M | L | XL -->
**Size:**

---
*Created: ${date}*
*Last Updated: ${date}*`;

    // Add type-specific sections
    if (type === 'fix') {
        template = template.replace('---', `

## Bug Details
**Steps to Reproduce:**
1.
2.
3.

**Expected Behavior:**

**Actual Behavior:**

**Environment:**
- OS:
- Browser/Version:
- Other relevant details:

---`);
    } else if (type === 'feat') {
        template = template.replace('---', `

## User Story
As a [user type], I want [functionality] so that [benefit].

## Design Notes
<!-- UI/UX considerations, mockups, user flow -->

---`);
    } else if (type === 'refactor') {
        template = template.replace('---', `

## Current State
<!-- What are the current limitations/problems? -->

## Desired State
<!-- What should the end result look like? -->

## Migration Notes
<!-- Backward compatibility, data migration, etc. -->

---`);
    }

    return template;
}
```

## Notes

- This command now intelligently extracts information from conversation context
- Minimizes user prompts by inferring details from discussion
- Only asks for critical missing information
- Can be run multiple times to refine issue content
- Maintains all original template structure and metadata
- The command adapts to the amount of context available