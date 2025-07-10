#!/usr/bin/env node

/**
 * Commit Helpers for Claude Commands
 * 
 * This module provides utility functions for commit operations.
 * It should only contain helper functions - no workflow logic.
 */

// Comprehensive emoji mapping for commit types
const commitEmojis = {
    feat: '✨',
    fix: '🐛',
    docs: '📝',
    style: '💄',
    refactor: '♻️',
    perf: '⚡️',
    test: '✅',
    chore: '🔧',
    ci: '🚀',
    revert: '⏪️',
    wip: '🚧',
    hotfix: '🚑️',
    security: '🔒️',
    deps: '📦',
    config: '🔧',
    lint: '🚨',
    ui: '💫',
    accessibility: '♿️',
    seo: '🔍️',
    analytics: '📈',
    database: '🗃️',
    mobile: '📱',
    responsive: '📱',
    ux: '🚸',
    business: '👔',
    arch: '🏗️',
    dead: '⚰️',
    assets: '🍱',
    review: '👌',
    mock: '🤡',
    flag: '🚩',
    catch: '🥅',
    logs: '🔊',
    typo: '✏️',
    move: '🚚',
    license: '📄',
    breaking: '💥',
    deploy: '🚀',
    docker: '🐳',
    k8s: '☸️',
    release: '🔖',
    downgrade: '⬇️',
    upgrade: '⬆️',
    pin: '📌',
    merge: '🔀',
    bad: '💩',
    snapshot: '📸',
    experiment: '⚗️',
    beer: '🍺',
    texts: '💬',
    critical: '🚑️',
    animation: '💫',
    wastebasket: '🗑️',
    passportcontrol: '🛂',
    validation: '🦺',
    types: '🏷️',
    seed: '🌱',
    egg: '🥚',
    see_no_evil: '🙈',
    camera_flash: '📸',
    thread: '🧵',
    heavy_minus_sign: '➖',
    heavy_plus_sign: '➕',
    pushpin: '📌',
    construction_worker: '👷',
    chart_with_upwards_trend: '📈',
    recycle: '♻️',
    building_construction: '🏗️',
    iphone: '📱',
    clown_face: '🤡',
    alembic: '⚗️',
    seedling: '🌱',
    triangular_flag_on_post: '🚩',
    goal_net: '🥅',
    dizzy: '💫',
    passport_control: '🛂',
    adhesive_bandage: '🩹',
    monocle_face: '🧐',
    coffin: '⚰️',
    test_tube: '🧪',
    necktie: '👔',
    stethoscope: '🩺',
    bricks: '🧱',
    technologist: '🧑‍💻'
};

// Analyze changes to suggest commit type and description
function analyzeChanges(diffOutput, files) {
    let commitType = 'fix';
    let description = 'misc changes';
    
    // File-based analysis
    const hasTests = files.some(f => /test|spec|\.test\.|\.spec\./.test(f));
    const hasDocs = files.some(f => /README|\.md|docs\//.test(f));
    const hasDeps = files.some(f => /package\.json|yarn\.lock|package-lock\.json/.test(f));
    const hasStyles = files.some(f => /\.css|\.scss|\.sass|style/.test(f));
    const hasConfig = files.some(f => /config|\.config\.|\.rc\.|\.json$/.test(f));
    
    // Content-based analysis
    const hasNewFunctions = /^\+.*function|^\+.*class|^\+.*const.*=|^\+.*let.*=|^\+.*var.*=/.test(diffOutput);
    const hasFixKeywords = /fix|bug|error|issue|resolve/.test(diffOutput.toLowerCase());
    const hasRefactorKeywords = /refactor|reorganize|restructure|cleanup|clean up/.test(diffOutput.toLowerCase());
    const hasVueChanges = /vue|nuxt|router|store|userStore|token|migration/.test(diffOutput.toLowerCase());
    const hasFeatureKeywords = /add|new|feature|implement|create/.test(diffOutput.toLowerCase());
    const hasRemoval = /remove|delete|drop/.test(diffOutput.toLowerCase());
    const hasTypeChanges = /typescript|\.ts$|\.d\.ts$|interface|type /.test(diffOutput);
    
    // Determine commit type and description
    if (hasTests) {
        commitType = 'test';
        description = 'update tests';
    } else if (hasDocs) {
        commitType = 'docs';
        description = 'update documentation';
    } else if (hasDeps) {
        commitType = 'chore';
        description = 'update dependencies';
    } else if (hasStyles) {
        commitType = 'style';
        description = 'update styles';
    } else if (hasConfig) {
        commitType = 'chore';
        description = 'update configuration';
    } else if (hasVueChanges && hasFixKeywords) {
        commitType = 'fix';
        description = 'resolve Vue 3 migration issues';
    } else if (hasNewFunctions && hasFeatureKeywords) {
        commitType = 'feat';
        description = 'add new functionality';
    } else if (hasRefactorKeywords) {
        commitType = 'refactor';
        description = 'refactor code structure';
    } else if (hasFixKeywords) {
        commitType = 'fix';
        description = 'fix issues';
    } else if (hasRemoval) {
        commitType = 'refactor';
        description = 'remove unused code';
    } else if (hasTypeChanges) {
        commitType = 'feat';
        description = 'add type definitions';
    } else if (hasFeatureKeywords) {
        commitType = 'feat';
        description = 'add new features';
    }

    // Get appropriate emoji
    const emoji = commitEmojis[commitType] || commitEmojis.fix;
    
    return {
        type: commitType,
        emoji,
        description,
        message: `${emoji} ${commitType}: ${description}`
    };
}

// Get emoji for a specific commit type
function getEmojiForType(commitType) {
    return commitEmojis[commitType] || commitEmojis.fix;
}

// Check if a commit type is valid
function isValidCommitType(type) {
    return commitEmojis.hasOwnProperty(type);
}

// Get all available commit types
function getAvailableCommitTypes() {
    return Object.keys(commitEmojis);
}

// Create formatted commit message
function createCommitMessage(type, description, emoji = null) {
    const commitEmoji = emoji || getEmojiForType(type);
    return `${commitEmoji} ${type}: ${description}`;
}

// Export functions for use by AI
export {
    commitEmojis,
    analyzeChanges,
    getEmojiForType,
    isValidCommitType,
    getAvailableCommitTypes,
    createCommitMessage
};

// For direct execution (testing purposes)
if (import.meta.url === `file://${process.argv[1]}`) {
    console.log('Commit helpers module loaded. Available functions:');
    console.log('- analyzeChanges(diffOutput, files)');
    console.log('- getEmojiForType(commitType)');
    console.log('- createCommitMessage(type, description)');
    console.log('- isValidCommitType(type)');
    console.log('- getAvailableCommitTypes()');
}