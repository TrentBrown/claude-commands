# Claude Command: Save Learnings

This command creates or updates a learnings file for an issue, extracting important insights, discoveries, and knowledge gained during implementation that should persist beyond the current session.

## Usage

```
/learnings-save <issue-id>
```

Examples:
```
/learnings-save 123
/learnings-save scratch
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)

## File Locations

This command works with files in the following locations:
- **Issue file**: `.claude/issues/{issue-id}/ISSUE-{issue-id}.md` (optional, for issue title)
- **Learnings file**: `.claude/issues/{issue-id}/LEARNINGS-{issue-id}.md` (created/updated by this command)

The command searches for these files relative to the project root (directory containing `.git` or `package.json`).

## What This Command Does

1. **Analyzes conversation context**:
   - Identifies realizations and "aha" moments
   - Extracts technical discoveries
   - Finds deviations from original plan
   - Captures problem-solving approaches
   - Notes tool/library evaluations

2. **Organizes by category**:
   - Groups related learnings together
   - Updates existing sections with new insights
   - Maintains dates for temporal context
   - Merges similar discoveries

3. **Creates reusable knowledge**:
   - Future-friendly reference format
   - Actionable insights with context
   - Cross-references to code/files
   - Preserves the "why" behind decisions

## Learnings File Format

```markdown
# Learnings - Issue #{issue-id}: {title}

## Key Insights
<!-- High-level realizations with dates -->
- [{date}] {insight-1}
- [{date}] {insight-2}
- [{date}] {insight-3}

## Technical Discoveries

### {Technology/Component}
*First discovered: {date}, Last updated: {date}*

**What we learned:**
{detailed-explanation}

**Why it matters:**
{significance}

**Example:**
```code
// Code example if relevant
```

### {Another Technology}
*Added: {date}*

{discovery-details}

## Architecture Decisions

### {Decision-Title}
*Decided: {date}*

**Context:** {what-we-were-solving}
**Choice:** {what-we-chose}
**Rationale:** {why-we-chose-it}
**Trade-offs:** {what-we-gave-up}

## Performance Findings

### {Finding-Title}
*Discovered: {date}*

- Measurement: {before/after}
- Optimization: {what-we-did}
- Impact: {result}

## Gotchas & Workarounds

### {Issue-Title}
*Found: {date}*

**Problem:** {what-goes-wrong}
**Symptoms:** {how-to-recognize}
**Solution:** {how-to-fix}
**Root Cause:** {why-it-happens}

## Tool & Library Notes

### {Tool/Library Name}
*Evaluated: {date}*

- **Purpose:** {what-we-needed}
- **Finding:** {what-we-discovered}
- **Recommendation:** {use-or-avoid}

## Plan Deviations

### {What Changed}
*Changed: {date}*

**Original:** {planned-approach}
**Actual:** {what-we-did}
**Reason:** {why-we-pivoted}

## Quick Reference
<!-- Actionable guidelines -->
- Always: {important-practice}
- Never: {common-mistake}
- Check: {before-doing-x}
- Consider: {for-similar-problems}

---
*Created: {date}*
*Last Updated: {date}*
```

## Organization Strategy

### How learnings are organized:
1. **Key Insights** - Brief, dated bullet points for quick scanning
2. **Detailed Sections** - Grouped by topic with full context
3. **Embedded Dates** - Shows when discovered/updated
4. **Quick Reference** - Actionable guidelines at the end

### How updates work:
- **New topic** → Create new section with "Added: {date}"
- **Existing topic** → Update section, change "Last updated: {date}"
- **Related insight** → Add to existing section with date
- **Contradicting info** → Keep both with dates, note evolution

## Examples of Learnings to Capture

### Automatic Detection Patterns
- "I realized that..." → Key Insight
- "It turns out..." → Technical Discovery
- "Actually, we should..." → Architecture Decision
- "The problem was..." → Gotcha/Workaround
- "Performance improved when..." → Performance Finding
- "Don't do X because..." → Quick Reference
- "For future reference..." → Various sections

### What makes a good learning:
✅ **Good:** "[2024-01-15] React's StrictMode causes effects to run twice in development, which exposed our cleanup issue"
❌ **Too vague:** "React is tricky"

✅ **Good:** "Database queries were slow until we added a composite index on (user_id, created_at)"
❌ **Obvious:** "Adding indexes makes queries faster"

## Workflow Integration

Best times to save learnings:
- After solving a tricky problem
- When changing approach from plan
- After performance optimization
- When finding unexpected behavior
- Before context rotation
- At issue completion

Example workflow:
1. Working on implementation
2. Discover API has undocumented requirement
3. **`/learnings-save 123`** ← Captures the discovery
4. Continue work, find performance issue
5. **`/learnings-save 123`** ← Adds performance finding
6. Future session can reference learnings

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse Arguments and Validate
- Extract `issue-id` from arguments (required)
- Find project root (look for .git or package.json)
- Check if `.claude/issues/{id}/LEARNINGS-{id}.md` exists

### Step 2: Analyze Conversation Context
Scan conversation for learning indicators:
- Problem-solution sequences
- Realizations and discoveries
- Performance measurements
- Plan deviations with reasons
- Debugging journeys
- Tool/library evaluations
- Architecture decisions

### Step 3: Extract and Categorize
For each learning found:
1. Determine category (insight, technical, performance, etc.)
2. Extract the key information
3. Note any code examples or file references
4. Capture the context and rationale

### Step 4: Handle File Updates

**If creating new file:**
- Use full template structure
- Add all categorized learnings with today's date
- Include issue title from ISSUE file if available

**If updating existing file:**
1. Read current content
2. For each new learning:
   - Check if topic already exists
   - If yes: Update section, update "Last updated" date
   - If no: Create new section with "Added" date
3. Add new Key Insights with dates
4. Update file's "Last Updated" date

### Step 5: Format Content
- Make learnings specific and actionable
- Include enough context for future reference
- Add code examples where helpful
- Ensure each learning has date context
- Keep Quick Reference section concise

### Step 6: Provide Feedback
- Summarize what was captured
- Show which sections were updated
- Highlight most important new learnings
- Remind about future reference value

### Merge Logic Examples
```javascript
// Conceptual merging approach
if (existingSection.topic === newLearning.topic) {
    // Update existing section
    existingSection.content += '\n\n' + newLearning.content;
    existingSection.lastUpdated = today;
} else {
    // Create new section
    newSection = {
        title: newLearning.topic,
        added: today,
        content: newLearning.content
    };
}

// Key insights always append with date
keyInsights.push(`[${today}] ${newInsight}`);
```

### Quality Filters
Only capture learnings that are:
- Non-obvious (not common knowledge)
- Specific (not vague generalizations)
- Actionable (can guide future work)
- Contextual (includes the "why")

## Error Handling
- No `.claude/issues/{id}/ISSUE-{id}.md` file: Create learnings anyway, note as "General Learnings"
- No new learnings found: Inform user, suggest what to look for
- Very long conversation: Focus on most significant learnings

## Notes

- File grows over time but stays organized by topic
- Dates provide temporal context without cluttering
- Categories make it easy to find specific information
- Merging prevents duplicate information
- Perfect for team knowledge sharing
- Can promote cross-issue learnings to CLAUDE.md