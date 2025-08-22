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

5. **Loads recent git commits**:
   - Shows last 5 commits from current branch
   - Includes full commit messages (subject and body)
   - Excludes merge commits for clarity
   - Provides context on recent changes

6. **Loads project documentation**:
   - Reads all files from /docs/
   - Shows available project references
   - Includes API specs, schemas, architecture
   - Provides project-wide context

7. **Loads subproject documentation** (if qp.config.js exists):
   - Checks for qp.config.js in project root
   - Reads subprojects list from config
   - Loads /docs/ files from each subproject
   - Provides cross-project context

8. **Provides unified summary**:
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
5. **GIT COMMITS** - Recent actual changes
6. **PROJECT** - Project-wide documentation and context
7. **SUBPROJECTS** - Documentation from related subprojects (if configured)

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
RECENT COMMITS
════════════════════════════════════════
[hash] [subject line]
[commit body if present]

[hash] [subject line]
[commit body if present]

════════════════════════════════════════
PROJECT DOCUMENTATION
════════════════════════════════════════
Available References:
• API.md - Backend API specifications
• database-schema.md - Database structure
• architecture.md - System design

💡 Load specific docs: /project-load <file>

════════════════════════════════════════
SUBPROJECT DOCUMENTATION
════════════════════════════════════════
Loaded from client:
• API.md - Client API integration

Loaded from lambdas/backend:
• handlers.md - Lambda handler specs

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

### IMPORTANT: Tool Usage
- **ALWAYS use Claude Code's internal Read tool** for reading files
- **NEVER use external shells (iTerm MCP, etc.)** for file operations
- **Use the Bash tool only** for checking directories or file existence
- All file reading must be done through the Read tool to ensure proper access

### Step 1: Parse and Validate
- Extract `issue-id` from arguments (required)
- Find project root (look for .git or package.json)
- Check issue directory exists

### Step 2: Load Files in Order

**Load ISSUE file:**
- Use Read tool with path: `.claude/issues/{id}/ISSUE-{id}.md`
- Extract: Title, type, requirements, acceptance criteria
- If missing: Show error and suggest `/issue-create {id}`

**Load PLAN file:**
- Use Read tool with path: `.claude/issues/{id}/PLAN-{id}.md`
- Extract: Approach, implementation steps, key decisions
- If missing: Note but continue (plan optional)

**Load PROGRESS file:**
- Use Read tool with path: `.claude/issues/{id}/PROGRESS-{id}.md`
- Extract: Current percentage, milestones, last session
- If missing: Note "No progress tracked yet"

**Load LEARNINGS file:**
- Use Read tool with path: `.claude/issues/{id}/LEARNINGS-{id}.md`
- Extract: Recent insights, gotchas, quick reference
- If missing: Note "No learnings captured yet"

**Load GIT COMMITS:**
- Use Bash tool to run: `git log -5 --format="%h %s%n%b" --no-merges`
- Extract: Recent commit hashes, subjects, and bodies
- Show actual changes made to the codebase
- If no commits or git error: Note "No recent commits"
- Keep full commit messages to preserve implementation context

**Load PROJECT files:**
- Use LS tool to list `/docs/` directory
- Use Read tool for each markdown file found
- Extract: Filenames and brief descriptions
- If directory missing or empty: Note "No project documentation"
- Show list of available files with short descriptions

**Load SUBPROJECT files (if configured):**
- Use Read tool to check if `qp.config.js` exists in project root
- If exists:
  - Use Read tool to read the config file
  - Parse to check if `config.subprojects` exists and is a non-empty array
  - For each subproject path in the array:
    - Resolve path: `{projectRoot}/{subprojectPath}/docs/`
    - Use LS tool to check if the directory exists
    - If exists, use Read tool for all `.md` files in that directory
    - Store files with subproject context (don't display contents)
    - Track: subproject name, number of files loaded
- If no qp.config.js: Skip silently
- If qp.config.js exists but no subprojects: Skip silently
- If subproject path doesn't have /docs/: Skip that subproject silently
- Display summary showing files loaded from each subproject (names only)

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
5. Recent commits:
   - Show last 5 non-merge commits
   - Include full commit messages
   - Highlight relevant changes
6. Project documentation:
   - List of available project files
   - Brief description of each
   - Note most relevant files for current issue
7. Subproject documentation (if applicable):
   - List files loaded from each subproject
   - Group by subproject name
   - Show only if subprojects exist
8. Next steps:
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
- qp.config.js errors: Handle gracefully
  - Import errors: Skip subproject loading silently
  - Invalid config structure: Skip subproject loading silently
  - Invalid subproject paths: Skip that specific subproject

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