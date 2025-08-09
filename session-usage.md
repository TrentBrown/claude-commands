# Claude Command: Session Usage

This command estimates the token usage and context window consumption for loading an issue's full context with `/session-load`.

## Usage

```
/session-usage <issue-id>
```

Examples:
```
/session-usage 123
/session-usage scratch
```

## Parameters

- `<issue-id>` (required): Issue identifier (number or "scratch" for small scope work)

## What This Command Does

1. **Analyzes file sizes**:
   - Checks if issue files exist
   - Counts characters, words, and lines in each file
   - Estimates tokens for each file

2. **Calculates token estimates**:
   - Input tokens: All file contents
   - Output tokens: Estimated summary generation
   - Total tokens: Combined estimate

3. **Provides cost estimates**:
   - Shows token counts per file
   - Estimates total context size
   - Indicates which model will be used
   - Suggests optimization if needed

## Token Estimation Method

The command uses these approximations:
- **Character-based**: ~4 characters per token (conservative)
- **Word-based**: ~1.3 tokens per word (typical for English)
- **Code multiplier**: ~1.5x for code-heavy content
- **Markdown overhead**: ~1.2x for formatting

The final estimate uses the higher of character or word-based calculations.

## Output Format

```
📊 Token Estimate for Issue #123

File Analysis:
═══════════════════════════════════════
ISSUE-123.md
  Size: 2.3 KB (487 words)
  Tokens: ~632 tokens

PLAN-123.md  
  Size: 4.1 KB (823 words)
  Tokens: ~1,070 tokens

PROGRESS-123.md
  Size: 5.7 KB (1,205 words)
  Tokens: ~1,567 tokens

LEARNINGS-123.md
  Size: 3.2 KB (651 words)
  Tokens: ~846 tokens

═══════════════════════════════════════
Input Total: ~4,115 tokens
Output Estimate: ~500 tokens (summary)
───────────────────────────────────────
Total Estimate: ~4,615 tokens

Context Window Usage:
───────────────────────────────────────
Opus 4 (200K):   2.3% ✅
Sonnet 4 (200K): 2.3% ✅

💡 Status: Plenty of room (97.7% available)

Model Selection Impact:
───────────────────────────────────────
🎯 Default mode: Will use Opus 4 (below 50% usage)
   Automatic switch to Sonnet 4 at: ~100,000 tokens
   💡 Tip: Stay under 100K to keep using Opus 4
```

## Token Guidelines

### Context Window Limits
- **Opus 4**: 200,000 tokens
- **Sonnet 4**: 200,000 tokens

### Claude Code Model Selection
- **Default (recommended)**: Opus 4 for up to 50% usage, then Sonnet 4
- **Opus**: Always Opus 4 (reaches usage limits faster)
- **Sonnet**: Always Sonnet 4 (for daily use)

### Size Categories & Recommendations
- **Small context**: < 2,000 tokens (< 1% window)
  - ✅ Optimal for speed and cost
  - No optimization needed
- **Medium context**: 2,000-8,000 tokens (1-4% window)
  - ✅ Standard usage, plenty of room
  - No immediate concerns
- **Large context**: 8,000-20,000 tokens (4-10% window)
  - ⚠️ Getting substantial, monitor growth
  - Consider periodic cleanup
- **Very large**: 20,000-50,000 tokens (10-25% window)
  - ⚠️ Significant usage, optimization recommended
  - Archive old content regularly
- **Huge context**: 50,000-100,000 tokens (25-50% window)
  - 🚨 Major portion of context window
  - In Default mode: Still using Opus 4
  - Optimization strongly recommended
- **Massive context**: > 100,000 tokens (> 50% window)
  - 🚨 Over half the context window
  - In Default mode: Now using Sonnet 4
  - Urgent optimization required

### Optimization Strategies

1. **For PROGRESS files**:
   - Archive old sessions periodically
   - Keep only recent 5-10 sessions
   - Summarize completed milestones

2. **For LEARNINGS files**:
   - Extract key insights to separate docs
   - Remove redundant discoveries
   - Consolidate similar learnings

3. **For PLAN files**:
   - Remove completed implementation details
   - Keep only active/upcoming milestones
   - Archive detailed research

## Implementation Instructions for AI

When executing this command, follow these steps:

### Step 1: Parse and Validate
- Extract `issue-id` from arguments (required)
- Find project root (look for .git or package.json)
- Build base path: `.claude/issues/{issue-id}/`

### Step 2: Check File Existence
For each file type (ISSUE, PLAN, PROGRESS, LEARNINGS):
- Check if file exists at expected path
- If not found, note as "Not found (0 tokens)"
- Continue checking other files

### Step 3: Analyze Each File
For each existing file:
1. Read file contents
2. Count:
   - File size in bytes
   - Number of characters
   - Number of words (split by whitespace)
   - Number of lines
3. Detect content type:
   - High code content (many special chars, indentation)
   - High markdown (many #, *, -, [, ])
   - Mostly prose

### Step 4: Calculate Token Estimates
For each file:
1. Character-based: `chars / 4`
2. Word-based: `words * 1.3`
3. Apply multipliers:
   - Code-heavy: multiply by 1.5
   - Markdown-heavy: multiply by 1.2
4. Use the higher estimate

### Step 5: Generate Summary
Show:
1. Per-file analysis with size and token estimates
2. Total input tokens (sum of all files)
3. Estimated output tokens (~500 for typical summary)
4. Grand total estimate
5. Context window usage percentage:
   - Calculate: (total_tokens / 200000) * 100
   - Format to 1 decimal place
   - Show for both Opus 4 and Sonnet 4 (same limit)
   - Show with visual indicator (✅/⚠️/🚨)
6. Model selection impact:
   - If in Default mode and < 50%: "Will use Opus 4"
   - If in Default mode and ≥ 50%: "Will use Sonnet 4"
   - Show switching threshold in tokens
7. Available context percentage
8. Size category classification
9. Status message based on usage:
   - < 5%: "Plenty of room (X% available)"
   - 5-10%: "Good headroom (X% available)"
   - 10-25%: "Monitor usage (X% available)"
   - 25-50%: "Consider archiving (X% available)"
   - > 50%: "Optimization urgent (X% available) - Sonnet 4 active"

### Step 6: Provide Recommendations
Based on context window percentage:
- < 1%: "✅ Minimal usage - no action needed"
- 1-4%: "✅ Healthy usage - continue normally"
- 4-10%: "✅ Moderate usage - periodic cleanup beneficial"
- 10-25%: "⚠️ Significant usage - schedule regular archiving"
- 25-50%: "⚠️ High usage - optimize soon (approaching Sonnet switch)"
- > 50%: "🚨 Critical usage - now using Sonnet 4 in Default mode"

Include specific suggestions:
- Which file is largest (target for optimization)
- How many old sessions to consider archiving
- Whether to split into multiple issues

### Error Handling
- Missing issue directory: Show all files as "Not found"
- Unreadable files: Skip and note in output
- No files found: Suggest creating issue first

### Example Calculations
```
File: PROGRESS-123.md
Content: 1,500 words, 8,500 characters
Type: Markdown + prose

Character method: 8,500 / 4 = 2,125 tokens
Word method: 1,500 * 1.3 = 1,950 tokens
Markdown multiplier: 2,125 * 1.2 = 2,550 tokens
Final estimate: ~2,550 tokens

Context usage: 2,550 / 200,000 = 1.3%
```

## Notes

- Token counts are estimates; actual usage may vary
- Claude Code uses Opus 4 and Sonnet 4 models
- Default mode automatically switches at 50% usage
- Both models share the same 200K token limit
- System prompts and formatting add overhead
- Binary files (images) use different token calculations
- Consider running periodically to monitor context growth
- Use before `/session-load` to estimate costs

## Related Commands

- `/model` - View or change the model selection mode
- `/session-load` - Actually loads the estimated context
- `/progress-save` - Adds to context size
- `/learnings-save` - Adds to context size
- `/session-save` - Updates both progress and learnings