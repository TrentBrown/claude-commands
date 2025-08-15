# Claude Command: Load Session

This command loads all relevant files for an issue to restore full context when starting or resuming work.

## Usage

```
/session-load <issue-id>
```

Examples:
```
/session-load 123
/session-load scratch
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)

## What This Command Does

1. **Loads issue definition**:
   - Reads ISSUE-{id}.md
   - Shows requirements and acceptance criteria
   - Displays issue type and metadata

2. **Loads implementation plan**:
   - Reads PLAN-{id}.md
   - Shows technical approach
   - Displays implementation steps

3. **Loads current progress**:
   - Reads PROGRESS-{id}.md
   - Shows completion percentage
   - Highlights current focus
   - Lists recent accomplishments

4. **Loads accumulated learnings**:
   - Reads LEARNINGS-{id}.md
   - Shows key insights
   - Displays important discoveries
   - References gotchas to remember

5. **Loads project documentation**:
   - Reads all files from .claude/project/
   - Shows available project references
   - Includes API specs, schemas, architecture
   - Provides project-wide context

6. **Provides unified summary**:
   - Current status overview
   - What's been done
   - What's left to do
   - Important context to remember

## Purpose

This command fully restores context when:
- Starting a new work session
- Returning after a break
- Switching between issues
- After context rotation
- Onboarding someone new to the issue

## File Loading Order

Files are loaded in logical sequence:
1. **ISSUE** - Understanding what we're building
2. **PLAN** - How we're building it
3. **PROGRESS** - Where we are now
4. **LEARNINGS** - What we've discovered
5. **PROJECT** - Project-wide documentation and context

## Output Format

The command provides a structured summary:

```
📋 Loading Issue #123: [Title]

════════════════════════════════════════
ISSUE SUMMARY
════════════════════════════════════════
Type: feat
Requirements: [Brief summary]
Acceptance Criteria: X items

════════════════════════════════════════
PLAN OVERVIEW  
════════════════════════════════════════
Approach: [Brief summary]
Total Steps: X milestones

════════════════════════════════════════
CURRENT PROGRESS
════════════════════════════════════════
Overall: 65% complete
Current Focus: [What we're working on]
Last Session: [Date and accomplishments]

Milestones:
✅ Setup project structure [100%]
✅ Implement auth flow [100%]
🔄 Email verification [40%]
⭕ Testing suite [0%]

════════════════════════════════════════
KEY LEARNINGS
════════════════════════════════════════
Recent Insights:
• [Important discovery 1]
• [Important discovery 2]

Watch out for:
• [Gotcha to remember]

════════════════════════════════════════
PROJECT DOCUMENTATION
════════════════════════════════════════
Available References:
• API.md - Backend API specifications
• database-schema.md - Database structure
• architecture.md - System design

💡 Load specific docs: /project-load <file>

════════════════════════════════════════
READY TO CONTINUE
════════════════════════════════════════
Next Steps:
1. [Immediate next task]
2. [Following task]

💡 Save progress with: /session-save 123
```

## Workflow Integration

Standard session workflow:

1. **`/session-load 123`** ← Start here
2. Review loaded context
3. Continue implementation
4. `/progress-save 123` (optional during work)
5. `/learnings-save 123` (optional when discovering)
6. `/session-save 123` (at session end)

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse and Validate
- Extract `issue-id` from arguments (required)
- Find project root (look for .git or package.json)
- Check issue directory exists

### Step 2: Load Files in Order

**Load ISSUE file:**
- Path: `.claude/issues/{id}/ISSUE-{id}.md`
- Extract: Title, type, requirements, acceptance criteria
- If missing: Show error and suggest `/issue-create {id}`

**Load PLAN file:**
- Path: `.claude/issues/{id}/PLAN-{id}.md`
- Extract: Approach, implementation steps, key decisions
- If missing: Note but continue (plan optional)

**Load PROGRESS file:**
- Path: `.claude/issues/{id}/PROGRESS-{id}.md`
- Extract: Current percentage, milestones, last session
- If missing: Note "No progress tracked yet"

**Load LEARNINGS file:**
- Path: `.claude/issues/{id}/LEARNINGS-{id}.md`
- Extract: Recent insights, gotchas, quick reference
- If missing: Note "No learnings captured yet"

**Load PROJECT files:**
- Path: `.claude/project/` directory
- Read all markdown files in directory
- Extract: Filenames and brief descriptions
- If directory missing or empty: Note "No project documentation"
- Show list of available files with short descriptions

### Step 3: Generate Summary
Create structured output with:
1. Issue overview (title, type, core requirement)
2. Plan summary (approach in 1-2 sentences)
3. Progress status:
   - Overall percentage
   - Current milestone
   - Last session summary
   - Milestone checklist
4. Key learnings:
   - 2-3 most recent/important insights
   - Critical gotchas to remember
5. Project documentation:
   - List of available project files
   - Brief description of each
   - Note most relevant files for current issue
6. Next steps:
   - From progress file "Next Steps"
   - Or from uncompleted milestones

### Step 4: Provide Context
Add helpful context:
- If starting fresh (0% progress): "Ready to begin implementation"
- If mid-progress: "Continuing from {last session focus}"
- If near complete: "Final steps remaining"
- If complete: "Implementation complete - review and test"

### Step 5: Error Handling
- No issue file: Critical error, suggest creating issue
- No plan file: Warning, suggest creating plan  
- No progress: Info, note tracking will start
- No learnings: Info, normal for new issues
- Multiple missing: Suggest starting with issue creation

### File Reading Strategy
- Read files fully but summarize intelligently
- Focus on actionable information
- Preserve specific technical details from learnings
- Show progress visually with symbols

## Notes

- Provides complete context restoration
- Loads all files but presents digestible summary
- Emphasizes what's immediately relevant
- Works with partial file sets (degrades gracefully)
- Essential for maintaining momentum across sessions
- Eliminates "where was I?" confusion