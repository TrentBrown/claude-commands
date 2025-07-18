# Claude Command: Save Session

This command saves all session progress and learnings for an issue by invoking the progress and learnings save commands.

## Usage

```
/session-save <issue-id>
```

Examples:
```
/session-save 123
/session-save scratch
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)

## What This Command Does

1. **Saves implementation progress**:
   - Invokes `/progress-save {issue-id}`
   - Updates milestone completion
   - Records session work details
   - Tracks files modified

2. **Captures learnings**:
   - Invokes `/learnings-save {issue-id}`
   - Extracts insights from conversation
   - Updates knowledge base
   - Documents discoveries

3. **Provides summary**:
   - Shows what was saved
   - Displays current progress percentage
   - Highlights key learnings captured
   - Suggests next steps

## Purpose

This is a convenience command for end-of-session checkpointing. It ensures both tangible progress and intangible insights are captured before:
- Taking a break
- Switching to another issue
- Ending the work day
- Context rotation risk

## Workflow Integration

Typical session workflow:

1. **Start session**: `/session-load 123`
2. **Work on implementation**
3. **End session**: `/session-save 123` ← You are here
4. **Next session**: `/session-load 123` again

Can also be used during long sessions:
- Regular checkpoints every few hours
- Before tackling a different aspect
- After solving a complex problem
- When significant progress is made

## What Gets Saved

### Progress (via /progress-save)
- Session duration and focus
- Completed work items
- Milestone advancement
- Files modified
- Challenges encountered
- Next steps identified

### Learnings (via /learnings-save)
- Technical discoveries
- Architecture decisions
- Performance findings
- Gotchas and workarounds
- Tool evaluations
- Plan deviations

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse and Validate
- Extract `issue-id` from arguments (required)
- Verify issue directory exists

### Step 2: Invoke Progress Save
- Execute `/progress-save {issue-id}` command
- Capture the output/results
- Note any errors but continue

### Step 3: Invoke Learnings Save
- Execute `/learnings-save {issue-id}` command
- Capture the output/results
- Note any errors but continue

### Step 4: Provide Combined Summary
Show a unified summary including:
- Issue ID and title (if available)
- Progress update summary:
  - Current overall progress percentage
  - Milestones advanced this session
  - Key accomplishments
- Learnings captured:
  - Number of new insights
  - Key discoveries
  - Important decisions
- File update status:
  - ✓ PROGRESS-{id}.md updated
  - ✓ LEARNINGS-{id}.md updated/created
- Suggested next action:
  - If progress < 100%: "Resume with `/session-load {id}`"
  - If progress = 100%: "Issue complete! Review files before closing."

### Step 5: Handle Errors Gracefully
- If progress save fails: Note it but continue with learnings
- If learnings save fails: Note it but show progress summary
- If both fail: Explain what went wrong and suggest manual saves

### Example Output Format
```
📊 Session saved for Issue #123

Progress Update:
✓ Overall progress: 45% → 65% (+20%)
✓ Milestone "Implement auth flow" completed
✓ 5 files modified this session
✓ Next focus: Email verification system

Learnings Captured:
✓ 3 new technical discoveries
✓ 1 architecture decision documented
✓ 2 gotchas recorded for future reference

Files Updated:
✓ PROGRESS-123.md (last session added)
✓ LEARNINGS-123.md (3 sections updated)

💡 Resume work with: /session-load 123
```

## Error Handling
- Missing issue directory: Suggest creating issue first
- No PLAN file: Allow save but note planning recommended
- Command failures: Report but continue with other saves
- No changes detected: Note but complete successfully

## Notes

- Does NOT create a separate CONTEXT file
- Preserves the session workflow without redundancy
- Ensures comprehensive capture of both progress and insights
- Quick and convenient for end-of-session routine
- Can be run multiple times without issues