# Claude Command: Save Progress

This command creates or updates the progress tracking file for an issue, managing implementation progress against the plan with session-by-session tracking.

## Usage

```
/progress-save <issue-id> [mode]
```

Examples:
```
/progress-save 123
/progress-save 456 session
/progress-save scratch milestone
/progress-save 789 complete
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)
- `[mode]` (optional): Update mode
  - `session` (default): Full session progress update
  - `milestone`: Update specific milestone completion
  - `quick`: Quick status update only
  - `complete`: Mark issue as complete

## What This Command Does

### First Time (Creates Progress File)

1. **Validates prerequisites**:
   - Checks for ISSUE-{id}.md (required)
   - Checks for PLAN-{id}.md (required)
   - Ensures issue has a plan to track against

2. **Extracts plan structure**:
   - Reads PLAN-{id}.md implementation steps
   - Creates milestone tracking items
   - Initializes progress template

3. **Creates initial session**:
   - Documents progress tracking start
   - Sets baseline status
   - Prepares for ongoing tracking

### Subsequent Times (Updates Progress)

1. **Analyzes current context**:
   - Reviews conversation for work done
   - Identifies files modified
   - Extracts decisions and changes
   - Detects completed milestones

2. **Updates tracking**:
   - Adds new session entry
   - Updates milestone percentages
   - Recalculates overall progress
   - Maintains cumulative view

## Update Modes

### Session Mode (Default)
Comprehensive session update:
- Full analysis of work completed
- Automatic milestone detection
- Session duration tracking
- Detailed progress documentation

### Milestone Mode
Focused milestone update:
- Prompts for specific milestone status
- Updates completion percentage
- Quick targeted update

### Quick Mode
Brief status update:
- Current focus change
- Quick progress note
- Fast checkpoint

### Complete Mode
Mark issue as complete:
- Final progress update
- All milestones to 100%
- Completion summary

## Progress File Format

```markdown
# Progress - Issue #{issue-id}: {title}

## Overall Status
**Current Phase:** Planning | Implementation | Testing | Complete
**Progress:** {percent}% complete
**Last Updated:** {date} {time}
**Current Focus:** {current-work}

## Plan Milestones
- [x] Milestone 1: {description} [100%]
- [ ] Milestone 2: {description} [60%]
- [ ] Milestone 3: {description} [0%]

## Implementation Log
<!-- Reverse chronological order - newest first -->

### Session: {date} {time}
**Duration:** {start} - {end} ({time})
**Focus:** {work-focus}
**Progress Made:**
- {accomplishment-1}
- {accomplishment-2}

**Milestones Advanced:**
- {milestone}: {old%} → {new%}

**Challenges:**
- {challenge-faced}

**Files Modified:**
- {file-path}: {what-changed}

**Decisions:**
- {decision}: {rationale}

**Next Steps:**
- {next-task}

## Cumulative Changes
**Total Files Modified:** {count}
**Key Files:**
- {file}: {description}

**Dependencies Added:**
- {package}: {purpose}

## Deviations from Plan
- {deviation}: {reason}

## Testing Progress
- [ ] Unit tests written
- [ ] Integration tests written
- [ ] Manual testing completed
- [ ] Edge cases verified

## Notes & Insights
- {insight}

---
*Created: {date}*
*Progress Version: 1.0*
```

## Workflow Integration

Progress tracking throughout implementation:

1. `/issue-create 123` → `/issue-save 123`
2. `/plan-create 123` → `/plan-save 123`
3. Start implementation work
4. **`/progress-save 123`** ← Creates progress file and tracks
5. Continue working
6. **`/progress-save 123`** ← Updates progress
7. Repeat until complete

## Smart Detection

Automatically detects:
- **First run** vs subsequent updates
- **Milestone completion** from conversation
- **File changes** from git and commands
- **Test creation** from file patterns
- **Documentation updates**

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments and Validate
- Extract `issue-id` from arguments (required)
- Extract optional `mode` (default: "session")
- Find project root (look for .git or package.json)
- Check if PROGRESS-{id}.md exists

### Step 2: Handle File Creation or Update

**If PROGRESS file doesn't exist:**
- Verify ISSUE-{id}.md exists (error if missing)
- Verify PLAN-{id}.md exists (error if missing)
- Read issue title and plan content
- Extract milestones from plan implementation steps
- Create initial progress file with template
- Add initial session entry

**If PROGRESS file exists:**
- Read current progress state
- Proceed to update based on mode

### Step 3: Process Based on Mode

**Session Mode (default):**
- Analyze conversation history for:
  - Commands executed
  - Files created/modified
  - Problems solved
  - Decisions made
- Check git status if available
- Detect milestone progress
- Create comprehensive session entry

**Milestone Mode:**
- Show current milestones and status
- Prompt for milestone to update
- Get new percentage
- Update specific milestone

**Quick Mode:**
- Prompt for status update
- Update current focus
- Add brief log entry

**Complete Mode:**
- Set all milestones to 100%
- Update phase to "Complete"
- Add completion summary

### Step 4: Update Progress File
- Calculate new overall progress percentage
- Update Overall Status section
- Add new session entry to top of log
- Update milestone checkboxes/percentages
- Update cumulative sections

### Step 5: Provide Feedback
- Show what was recorded
- Display current progress
- Highlight any completed milestones
- Suggest next actions

### Milestone Extraction (First Run)
When parsing PLAN file:
1. Find "Implementation Steps" section
2. Extract numbered/bulleted items
3. Create milestone for each major step
4. Use first line as milestone description
5. Initialize all at 0%

### Progress Calculation
```javascript
function calculateOverallProgress(milestones) {
    if (milestones.length === 0) return 0;
    const total = milestones.reduce((sum, m) => sum + m.percentage, 0);
    return Math.round(total / milestones.length);
}
```

### Error Handling
- Missing ISSUE: "Issue not found. Create with: /issue-create {id}"
- Missing PLAN: "Plan not found. Create with: /plan-create {id}"
- No plan milestones: Use generic milestones
- Invalid percentage: Validate 0-100 range

## Inline Template Function

```javascript
function createProgressFile(issueId, issueTitle, milestones) {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].slice(0, 5);
    
    const milestonesFormatted = milestones.map(m => 
        `- [ ] ${m}: [0%]`
    ).join('\n');
    
    return `# Progress - Issue #${issueId}: ${issueTitle}

## Overall Status
**Current Phase:** Implementation
**Progress:** 0% complete
**Last Updated:** ${date} ${time}
**Current Focus:** Starting implementation

## Plan Milestones
${milestonesFormatted}

## Implementation Log
<!-- Reverse chronological order - newest first -->

### Session: ${date} ${time}
**Duration:** ${time} - ongoing
**Focus:** Progress tracking setup
**Progress Made:**
- Initialized progress tracking
- Extracted milestones from plan
- Ready to begin implementation

**Milestones Advanced:**
- None yet - just starting

**Challenges:**
- None yet

**Files Modified:**
- PROGRESS-${issueId}.md: Created

**Decisions:**
- Using structured progress tracking

**Next Steps:**
- Begin first milestone implementation

## Cumulative Changes
**Total Files Modified:** 1
**Key Files:**
- PROGRESS-${issueId}.md: Progress tracking

**Dependencies Added:**
- None yet

## Deviations from Plan
- None yet

## Testing Progress
- [ ] Unit tests written
- [ ] Integration tests written
- [ ] Manual testing completed
- [ ] Edge cases verified

## Notes & Insights
- Progress tracking initialized from plan

---
*Created: ${date}*
*Progress Version: 1.0*`;
}

function addSessionEntry(content, mode, sessionData) {
    // This is conceptual - AI will handle the actual implementation
    // Shows the structure of what to add
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].slice(0, 5);
    
    return `### Session: ${date} ${time}
**Duration:** ${sessionData.duration}
**Focus:** ${sessionData.focus}
**Progress Made:**
${sessionData.progress.map(p => `- ${p}`).join('\n')}

**Milestones Advanced:**
${sessionData.milestones.map(m => `- ${m}`).join('\n')}

**Challenges:**
${sessionData.challenges.map(c => `- ${c}`).join('\n')}

**Files Modified:**
${sessionData.files.map(f => `- ${f}`).join('\n')}

**Decisions:**
${sessionData.decisions.map(d => `- ${d}`).join('\n')}

**Next Steps:**
${sessionData.nextSteps.map(n => `- ${n}`).join('\n')}
`;
}
```

## Notes

- Single command handles both creation and updates
- Creates progress file automatically on first use
- Maintains complete session history
- Tracks against plan milestones
- Supports multiple update modes
- Essential for long-running implementations