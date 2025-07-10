#!/usr/bin/env node

/**
 * Templates Helper for Claude Commands
 * 
 * This module provides template utilities for AI-driven commands.
 * It should only contain pure template functions - no workflow logic.
 */

// Get current date in ISO format
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

// Base issue template
function getBaseIssueTemplate(issueId, type) {
    const date = getCurrentDate();
    
    return `# Issue #${issueId}: [Title]

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
}

// Fix-specific template additions
function getFixTemplateAdditions() {
    return `

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
- Other relevant details: `;
}

// Feature-specific template additions
function getFeatTemplateAdditions() {
    return `

## User Story
As a [user type], I want [functionality] so that [benefit].

## Design Notes
<!-- UI/UX considerations, mockups, user flow -->`;
}

// Get complete issue template based on type
function getIssueTemplate(issueId, type) {
    const baseTemplate = getBaseIssueTemplate(issueId, type);
    
    switch (type) {
        case 'fix':
            return baseTemplate.replace('---', getFixTemplateAdditions() + '\n\n---');
        case 'feat':
            return baseTemplate.replace('---', getFeatTemplateAdditions() + '\n\n---');
        default:
            return baseTemplate;
    }
}

// Basic plan template
function getPlanTemplate(issueId, issueTitle, issueDescription) {
    const date = getCurrentDate();
    
    return `# Plan - Issue #${issueId}: ${issueTitle}

## Overview
${issueDescription || 'To be defined during planning session'}

## Codebase Analysis
**Project Structure:**
- Standard project structure detected

**Relevant Dependencies:**
- No specific dependencies identified

**Analysis Suggestions:**
- Manual codebase review recommended

## Technical Approach
*To be filled during planning session*

## Implementation Steps
*To be filled during planning session*

## Testing Strategy
*To be filled during planning session*

## Risks & Considerations
*To be filled during planning session*

---
*Created: ${date}*
*Last Updated: ${date}*`;
}

// Export functions for use by AI
export {
    getCurrentDate,
    getBaseIssueTemplate,
    getFixTemplateAdditions,
    getFeatTemplateAdditions,
    getIssueTemplate,
    getPlanTemplate
};

// For direct execution (testing purposes)
if (import.meta.url === `file://${process.argv[1]}`) {
    console.log('Templates module loaded. Available functions:');
    console.log('- getIssueTemplate(issueId, type)');
    console.log('- getPlanTemplate(issueId, title, description)');
    console.log('- getCurrentDate()');
}