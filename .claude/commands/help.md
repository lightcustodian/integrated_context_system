# help Command

**Purpose**: Provides comprehensive help and command discovery for Context Engineering system  
**Function**: Shows command usage, system status, and intelligent next-step suggestions

## Usage
```
/help [COMMAND_NAME]
/help [--status] [--workflow] [--troubleshoot] [--features] [--commands]
```

## Arguments: $ARGUMENTS
- COMMAND_NAME: Specific command to get detailed help for
- status: Show current system status and active PRP info
- workflow: Show complete workflow guide including feature decomposition
- troubleshoot: Show troubleshooting guide with feature decomposition issues
- features: Show feature decomposition system help
- commands: Show all available commands with feature enhancements
- --workflow: Show recommended workflow and next steps
- --troubleshoot: Show common issues and solutions
- --features: Show feature request decomposition system guide
- --commands: Show enhanced command reference

## Command Logic

### 1. Command Discovery and Help Generation
```javascript
// Initialize command discovery system
const commandDiscovery = new CommandDiscovery();

async function executeHelpCommand(args) {
  const COMMAND_NAME = args[0];
  const flags = parseFlags(args);
  
  if (COMMAND_NAME) {
    return await generateCommandSpecificHelp(COMMAND_NAME);
  } else if (flags.status) {
    return generateEnhancedSystemStatus();
  } else if (flags.workflow) {
    return generateEnhancedWorkflowGuidance();
  } else if (flags.troubleshoot) {
    return generateEnhancedTroubleshootingGuide();
  } else if (flags.features) {
    return generateFeatureDecompositionHelp();
  } else if (flags.commands) {
    return generateEnhancedCommandReference();
  } else {
    return await generateOverallHelp();
  }
}

async function generateCommandSpecificHelp(COMMAND_NAME) {
  const metadata = commandDiscovery.getCommandMetadata(COMMAND_NAME);
  if (!metadata) {
    return `❌ Command '${COMMAND_NAME}' not found. Use '/help' to see available commands.`;
  }

  // Validate command and provide context-aware help
  const validation = await commandDiscovery.validateCommand(COMMAND_NAME, []);
  
  let help = `# ${metadata.name}

## Description
${metadata.description}

## Usage
\`${metadata.usage}\`

## Arguments
`;

  for (const arg of metadata.arguments) {
    help += `- **${arg.name}** (${arg.type})`;
    if (arg.description) help += `: ${arg.description}`;
    if (arg.values) help += ` [${arg.values.join('|')}]`;
    help += '\n';
  }

  help += `
## Examples
`;
  for (const example of metadata.examples) {
    help += `\`${example}\`\n`;
  }

  help += `
## Prerequisites
`;
  for (const prereq of metadata.prerequisites) {
    const satisfied = await commandDiscovery.checkPrerequisite(prereq, COMMAND_NAME);
    const status = satisfied ? '✅' : '❌';
    help += `${status} ${prereq}\n`;
  }

  help += `
## Expected Outputs
`;
  for (const output of metadata.outputs) {
    help += `- ${output}\n`;
  }

  // Add validation issues if any
  if (!validation.valid) {
    help += `\n## ⚠️ Current Issues
`;
    for (const error of validation.errors) {
      help += `- ${error}\n`;
    }
    
    if (validation.suggestions.length > 0) {
      help += `\n## 💡 Suggestions
`;
      for (const suggestion of validation.suggestions) {
        help += `- ${suggestion}\n`;
      }
    }
  } else {
    help += `\n✅ All prerequisites satisfied. Ready to run!`;
  }

  return help;
}
```

### 2. System Status Generation
```javascript
function generateSystemStatus() {
  let status = `# Context Engineering System Status

## 🔧 System Configuration
`;
  
  try {
    // Check initialization status
    if (fileExists('.claude/settings.json')) {
      const settings = JSON.parse(readFile('.claude/settings.json'));
      status += `✅ **System**: Initialized (v${settings.version || '1.0.0'})\n`;
      status += `✅ **Tech Stack**: ${settings.TECH_STACK || 'Auto-detected'}\n`;
      
      // Check enabled features
      if (settings.features) {
        status += `✅ **Features**: ${Object.keys(settings.features).filter(f => settings.features[f]).join(', ')}\n`;
      }
    } else {
      status += `❌ **System**: Not initialized - run \`/init-context\` first\n`;
      return status;
    }
    
    // Check current session
    const CURRENT_SESSION = readStateFile('current-session.json');
    if (CURRENT_SESSION) {
      status += `\n## 📋 Current Session
`;
      status += `- **Project**: ${CURRENT_SESSION.PROJECT_NAME}\n`;
      status += `- **Phase**: ${CURRENT_SESSION.CURRENT_PHASE}\n`;
      
      if (CURRENT_SESSION.ACTIVE_PRP) {
        status += `- **Active PRP**: ${CURRENT_SESSION.ACTIVE_PRP}\n`;
        if (CURRENT_SESSION.iteration && CURRENT_SESSION.iteration > 1) {
          status += `- **Iteration**: ${CURRENT_SESSION.iteration}\n`;
        }
      } else {
        status += `- **Active PRP**: None\n`;
      }
      
      if (CURRENT_SESSION.LAST_VALIDATION) {
        const validationAge = Date.now() - new Date(CURRENT_SESSION.LAST_VALIDATION).getTime();
        const hoursAgo = Math.floor(validationAge / (1000 * 60 * 60));
        status += `- **Last Validation**: ${hoursAgo}h ago\n`;
      }
    }
    
    // Check PRP history
    const PRP_HISTORY = readStateFile('prp-history.json');
    if (PRP_HISTORY) {
      status += `\n## 📊 PRP Statistics
`;
      status += `- **Total Created**: ${PRP_HISTORY.TOTAL_CREATED}\n`;
      status += `- **Total Completed**: ${PRP_HISTORY.TOTAL_COMPLETED}\n`;
      status += `- **Success Rate**: ${PRP_HISTORY.TOTAL_CREATED > 0 ? Math.round((PRP_HISTORY.TOTAL_COMPLETED / PRP_HISTORY.TOTAL_CREATED) * 100) : 0}%\n`;
      if (PRP_HISTORY.AVERAGE_CONFIDENCE) {
        status += `- **Average Confidence**: ${PRP_HISTORY.AVERAGE_CONFIDENCE}/10\n`;
      }
    }
    
    // Check RAG integration
    if (fileExists('2-docs/external/mcp-index.json')) {
      const MCP_INDEX = JSON.parse(readFile('2-docs/external/mcp-index.json'));
      const RAG_SOURCES = Object.keys(MCP_INDEX).filter(k => !k.startsWith('_')).length;
      status += `\n## 🔍 RAG Integration
`;
      status += `✅ **MCP Index**: Configured\n`;
      status += `- **Available Sources**: ${RAG_SOURCES}\n`;
    }
    
    // Check examples
    if (fileExists('2-docs/context/examples/examples.json')) {
      const EXAMPLES_INDEX = JSON.parse(readFile('2-docs/context/examples/examples.json'));
      status += `\n## 📚 Examples
`;
      status += `✅ **Examples Index**: ${EXAMPLES_INDEX.examples?.length || 0} examples\n`;
    }
    
  } catch (error) {
    status += `\n⚠️ **Error reading system status**: ${error.message}\n`;
  }
  
  return status;
}

function readStateFile(filename) {
  try {
    const content = readFile(`.claude/state/${filename}`);
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}
```

### 3. Workflow Guidance
```javascript
function generateWorkflowGuidance() {
  const CURRENT_SESSION = readStateFile('current-session.json');
  const NEXT_COMMAND = commandDiscovery.suggestNextCommand();
  
  let guidance = `# Context Engineering Workflow

## 🎯 Recommended Workflow

### 1. System Setup (One-time)
\`\`\`
/init-context [PROJECT_TYPE] [TECH_STACK]
\`\`\`
- Sets up directory structure
- Auto-detects tech stack
- Creates initial templates
- Configures validation commands

### 2. Feature Development Cycle

#### a) Plan Feature
\`\`\`
/create-prp <FEATURE_NAME> [--type=feature|bugfix|refactor]
\`\`\`
- Analyzes requirements
- Researches similar patterns
- Integrates RAG sources
- Generates implementation blueprint

#### b) Implement Feature
\`\`\`
/execute-prp [--phase=planning|implementation|testing|review]
\`\`\`
- Executes implementation plan
- Runs validation gates
- Handles iterative development
- Tracks progress

#### c) Validate Quality
\`\`\`
/validate [--level=basic|full|prp] [--fix_issues]
\`\`\`
- Runs comprehensive quality checks
- Validates against success criteria
- Auto-fixes common issues
- Updates confidence scores

#### d) Iterate if Needed
\`\`\`
/create-prp <FEATURE_NAME> --iterate=<PRP_ID>
\`\`\`
- Creates improved version
- Incorporates lessons learned
- Builds on previous iteration
- Tracks confidence progression

## 🎯 Your Current Status
`;

  if (CURRENT_SESSION) {
    guidance += `**Current Phase**: ${CURRENT_SESSION.CURRENT_PHASE}\n\n`;
    guidance += `**Suggested Next Step**: ${NEXT_COMMAND}\n\n`;
    
    // Phase-specific guidance
    switch (CURRENT_SESSION.CURRENT_PHASE) {
      case 'initialization':
        guidance += `### Getting Started
1. Review auto-generated CLAUDE.md
2. Add examples to 2-docs/context/examples/
3. Configure RAG sources in 2-docs/external/
4. Create your first PRP with \`/create-prp <FEATURE_NAME>\``;
        break;
        
      case 'prp-created':
        guidance += `### Ready for Implementation
1. Review the generated PRP
2. Run \`/execute-prp\` to begin implementation
3. Monitor validation gates during development
4. Use \`/validate\` to check progress`;
        break;
        
      case 'executing':
        guidance += `### Implementation in Progress
1. Continue following the PRP blueprint
2. Run \`/validate\` regularly to check progress
3. Address any validation failures promptly
4. Update PRP if requirements change`;
        break;
        
      case 'completed':
        guidance += `### Ready for Next Feature
1. Review completed PRP for lessons learned
2. Create new PRP with \`/create-prp <NEXT_FEATURE>\`
3. Or iterate on existing feature if improvements needed
4. Update project patterns based on successful implementation`;
        break;
    }
  } else {
    guidance += `**Status**: System not initialized\n`;
    guidance += `**First Step**: Run \`/init-context\` to get started\n`;
  }
  
  guidance += `\n\n## 💡 Pro Tips

### Effective PRP Creation
- Use descriptive feature names
- Provide comprehensive INITIAL.md files
- Leverage examples and patterns
- Configure RAG sources for external docs

### Iterative Development
- Start with simple implementations
- Use \`--iterate\` for improvements
- Learn from validation failures
- Build confidence through iteration

### Quality Assurance
- Run validation frequently
- Address issues immediately
- Use \`--FIX_ISSUES\` for auto-fixes
- Maintain high confidence scores

### RAG Integration
- Configure MCP endpoints for external docs
- Use topic-based organization
- Validate endpoint availability
- Cache frequently used sources`;

  return guidance;
}
```

### 4. Troubleshooting Guide
```javascript
function generateTroubleshootingGuide() {
  return `# Troubleshooting Guide

## 🚨 Common Issues & Solutions

### System Initialization Issues

#### "No project root detected"
**Problem**: System can't find project root directory
**Solutions**:
- Run \`git init\` to create git repository
- Ensure you're in the correct project directory
- Create package.json, pyproject.toml, or equivalent project file
- Check directory permissions

#### "Tech stack detection failed"
**Problem**: System can't identify your technology stack
**Solutions**:
- Manually specify tech stack: \`/init-context web python\`
- Add standard project files (package.json, requirements.txt, etc.)
- Review fallback templates and customize manually
- Check CLAUDE.md for accuracy

#### "Permission denied" errors
**Problem**: Insufficient file system permissions
**Solutions**:
- Check directory ownership and permissions
- Run with appropriate user privileges
- Ensure write access to project directory
- Check for file locks or readonly attributes

### PRP Creation Issues

#### "No patterns found in codebase"
**Problem**: System can't find similar implementation patterns
**Solutions**:
- Add examples to 2-docs/context/examples/
- Create reference implementations manually
- Use generic patterns from templates
- Review and update core-patterns.md

#### "RAG sources unavailable"
**Problem**: External documentation sources not accessible
**Solutions**:
- Check network connectivity
- Verify MCP endpoint URLs in mcp-index.json
- Test endpoints manually: \`curl -X GET "endpoint-url"\`
- Use local documentation in rag-sources/
- Check authentication credentials

#### "Insufficient context for PRP generation"
**Problem**: Not enough information to create comprehensive PRP
**Solutions**:
- Provide more detailed INITIAL.md file
- Add relevant examples and documentation
- Configure additional RAG sources
- Include specific requirements and constraints

### Implementation Issues

#### "Validation gates failing"
**Problem**: Code doesn't pass quality checks
**Solutions**:
- Review validation commands in CLAUDE.md
- Run \`/validate --FIX_ISSUES\` for auto-fixes
- Check tech stack configuration
- Update validation rules if needed
- Address specific validation failures

#### "Low confidence scores"
**Problem**: System confidence in implementation is low
**Solutions**:
- Add more relevant examples
- Improve pattern documentation
- Use iteration to build confidence: \`--iterate=PRP_ID\`
- Simplify complex requirements
- Provide more specific constraints

#### "State file corruption"
**Problem**: System state files are corrupted or inconsistent
**Solutions**:
- System will auto-restore from backups
- Manual restore: copy from .claude/state/*.backup.*
- Reset state: delete state files and re-run /init-context
- Check for concurrent access issues

### Iteration Issues

#### "Previous iteration not found"
**Problem**: Can't find PRP to iterate on
**Solutions**:
- Check PRP ID spelling and format
- Look in PRPs/completed/ and PRPs/history/
- Use \`/help --status\` to see available PRPs
- Create new PRP instead of iteration

#### "Iteration confidence not improving"
**Problem**: Successive iterations don't show improvement
**Solutions**:
- Review iteration history for patterns
- Simplify approach or break into smaller features
- Add more specific examples and constraints
- Consider different implementation strategy

### Performance Issues

#### "Command execution slow"
**Problem**: Commands take too long to execute
**Solutions**:
- Enable caching in mcp-index.json
- Use local documentation copies
- Optimize MCP server response times
- Reduce context size if very large
- Check network latency for RAG sources

#### "Large context size warnings"
**Problem**: Context exceeds token limits
**Solutions**:
- Filter examples more aggressively
- Use summary documentation instead of full docs
- Break complex features into smaller PRPs
- Optimize RAG source content

## 🔧 Debug Commands

### System Diagnostics
\`\`\`bash
# Check system status
/help --status

# Validate configuration
/validate --level=full

# Test tech stack detection
/init-context --dry-run

# Check command discovery
/help
\`\`\`

### PRP Diagnostics
\`\`\`bash
# Validate specific PRP
/validate --PRP_ID=<PRP_ID>

# Check PRP history
/help --status

# Test pattern matching
/create-prp test-feature --complexity=low

# Review iteration chain
cat 2-docs/PRPs/history/<PRP_ID>-v*.md
\`\`\`

### RAG Diagnostics
\`\`\`bash
# Test MCP endpoints
curl -X GET "http://localhost:5000/docs/api"

# Check RAG configuration
cat 2-docs/external/mcp-index.json

# Validate examples index
cat 2-docs/context/examples/examples.json

# Test external connectivity
/validate --level=full
\`\`\`

## 📞 Getting Help

### Self-Service Resources
1. \`/help <command>\` - Detailed command help
2. \`/help --workflow\` - Workflow guidance
3. \`/help --status\` - System status check
4. 2-docs/external/README.md - RAG integration guide

### Manual Inspection
1. Check .claude/state/ files for system state
2. Review CLAUDE.md for configuration
3. Examine PRPs/history/ for iteration patterns
4. Look at validation/ files for quality criteria

### Recovery Procedures

#### Full System Reset
\`\`\`bash
# Backup current state
cp -r 2-docs/.claude/state 2-docs/.claude/state.backup

# Reset system
rm -rf 2-docs/.claude
/init-context

# Restore custom configuration if needed
\`\`\`

#### PRP Recovery
\`\`\`bash
# Restore from history
cp 2-docs/PRPs/history/<PRP_ID>-v1.md 2-docs/PRPs/active/

# Or restart PRP
/create-prp <FEATURE_NAME> --complexity=low
\`\`\`

## 📊 Health Checks

Run these regularly to maintain system health:

1. **Weekly**: \`/validate --level=full\`
2. **After changes**: \`/help --status\`
3. **Before major features**: Test workflow with simple PRP
4. **Monthly**: Clean up old backups and history files

---

*If issues persist, check the Context Engineering documentation or create a simple test PRP to isolate the problem.*`;
}
```

### 5. Overall Help Generation
```javascript
async function generateOverallHelp() {
  const commands = await commandDiscovery.discoverCommands();
  const SYSTEM_STATUS = getSystemStatusSummary();
  const NEXT_COMMAND = commandDiscovery.suggestNextCommand();
  
  let help = `# Context Engineering Command Center

## 🚀 Available Commands

`;

  // Group commands by phase
  const phases = {
    initialization: [],
    planning: [],
    implementation: [],
    validation: [],
    utility: []
  };

  for (const cmd of commands) {
    const phase = cmd.phase || 'utility';
    phases[phase]?.push(cmd);
  }

  // Display commands by phase
  for (const [phase, cmds] of Object.entries(phases)) {
    if (cmds.length > 0) {
      help += `### ${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase\n`;
      for (const cmd of cmds) {
        const status = cmd.exists ? '✅' : '❌';
        help += `${status} **/${cmd.name}**: ${cmd.description || cmd.purpose || 'No description'}\n`;
      }
      help += '\n';
    }
  }

  help += `## 🎯 Quick Start

### First Time Setup
1. \`/init-context [PROJECT_TYPE] [TECH_STACK]\` - Initialize the system
2. \`/help --status\` - Check system configuration
3. Add examples to 2-docs/context/examples/
4. Configure RAG sources in 2-docs/external/

### Development Workflow
1. \`/create-prp <FEATURE_NAME>\` - Plan new feature
2. \`/execute-prp\` - Implement the feature
3. \`/validate\` - Check quality and completeness
4. Iterate with \`/create-prp <feature> --iterate=<PRP_ID>\` if needed

## 📋 System Status
${SYSTEM_STATUS}

## 🎯 Suggested Next Step
${NEXT_COMMAND}

## 🔧 Additional Help
- \`/help <command>\` - Detailed help for specific command
- \`/help --status\` - Full system status and diagnostics
- \`/help --workflow\` - Complete workflow guidance
- \`/help --troubleshoot\` - Common issues and solutions

## ✨ Key Features
- **Tech Stack Auto-Detection**: Automatically configures for your technology
- **RAG Integration**: Connects to external documentation sources
- **PRP Iteration**: Improve implementations through iteration
- **State Management**: Robust state tracking with conflict resolution
- **Command Discovery**: Intelligent help and next-step suggestions
- **Validation Gates**: Multi-level quality assurance

---
*Context Engineering v1.0.0 - Making AI coding assistants work reliably*`;

  return help;
}

function getSystemStatusSummary() {
  try {
    if (!fileExists('2-docs/.claude/settings.json')) {
      return '❌ **System**: Not initialized';
    }
    
    const CURRENT_SESSION = readStateFile('current-session.json');
    if (!CURRENT_SESSION) {
      return '⚠️ **System**: Initialized but no active session';
    }
    
    let status = `✅ **System**: Operational (${CURRENT_SESSION.PROJECT_NAME})`;
    if (CURRENT_SESSION.ACTIVE_PRP) {
      status += `\n📋 **Active PRP**: ${CURRENT_SESSION.ACTIVE_PRP}`;
      if (CURRENT_SESSION.iteration > 1) {
        status += ` (iteration ${CURRENT_SESSION.iteration})`;
      }
    }
    
    return status;
  } catch (error) {
    return `⚠️ **System**: Error reading status`;
  }
}
```

### 6. Enhanced System Status with Feature Decomposition
```javascript
function generateEnhancedSystemStatus() {
  const enhancedStatus = commandDiscovery.getEnhancedSystemStatus();
  
  let status = `# Context Engineering System Status (Enhanced)

## 🔧 System Configuration
`;
  
  try {
    // Basic system status
    if (fileExists('.claude/settings.json')) {
      const settings = JSON.parse(readFile('.claude/settings.json'));
      status += `✅ **System**: Initialized (v${settings.version || '1.0.0'})\n`;
      status += `✅ **Tech Stack**: ${settings.TECH_STACK || 'Auto-detected'}\n`;
      
      // Enhanced features
      if (settings.features) {
        const enabledFeatures = Object.keys(settings.features).filter(f => settings.features[f].enabled);
        status += `✅ **Features**: ${enabledFeatures.join(', ')}\n`;
      }
    } else {
      status += `❌ **System**: Not initialized - run \`/init-context\` first\n`;
      return status;
    }
    
    // Feature Decomposition Status
    if (enhancedStatus.featureDecomposition) {
      const fd = enhancedStatus.featureDecomposition;
      status += `\n## 🎯 Feature Decomposition
`;
      status += `- **Status**: ${fd.enabled ? '✅ Enabled' : '❌ Disabled'}\n`;
      if (fd.enabled) {
        status += `- **Total Features**: ${fd.totalFeatures}\n`;
        status += `- **Completed**: ${fd.completedFeatures}\n`;
        status += `- **In Progress**: ${fd.inProgressFeatures}\n`;
        status += `- **Overall Progress**: ${fd.overallProgress}%\n`;
        if (fd.lastUpdated) {
          const updateAge = Date.now() - new Date(fd.lastUpdated).getTime();
          const hoursAgo = Math.floor(updateAge / (1000 * 60 * 60));
          status += `- **Last Updated**: ${hoursAgo}h ago\n`;
        }
      }
    }
    
    // Enhanced Commands
    if (enhancedStatus.enhancedCommands) {
      const ec = enhancedStatus.enhancedCommands;
      status += `\n## 🚀 Command System
`;
      status += `- **Total Commands**: ${ec.total}\n`;
      status += `- **Enhanced Commands**: ${ec.enhanced}\n`;
      status += `- **Basic Commands**: ${ec.basic}\n`;
    }
    
    // System Health
    if (enhancedStatus.systemHealth) {
      const health = enhancedStatus.systemHealth;
      status += `\n## 💊 System Health
`;
      status += `- **Health Score**: ${health.score}/100 (${health.status.toUpperCase()})\n`;
      if (health.issues.length > 0) {
        status += `- **Issues**: ${health.issues.length}\n`;
        health.issues.forEach(issue => {
          status += `  - ${issue}\n`;
        });
      }
    }
    
    // Current Session (Enhanced)
    const CURRENT_SESSION = readStateFile('current-session.json');
    if (CURRENT_SESSION) {
      status += `\n## 📋 Current Session
`;
      status += `- **Project**: ${CURRENT_SESSION.PROJECT_NAME}\n`;
      status += `- **Phase**: ${CURRENT_SESSION.CURRENT_PHASE}\n`;
      
      if (CURRENT_SESSION.ACTIVE_PRP) {
        status += `- **Active PRP**: ${CURRENT_SESSION.ACTIVE_PRP}\n`;
      }
      
      // Feature-specific session info
      if (CURRENT_SESSION.CURRENT_FEATURE) {
        status += `- **Current Feature**: ${CURRENT_SESSION.CURRENT_FEATURE}\n`;
      }
      
      if (CURRENT_SESSION.FEATURE_PROGRESS) {
        const progressEntries = Object.entries(CURRENT_SESSION.FEATURE_PROGRESS);
        if (progressEntries.length > 0) {
          status += `- **Feature Progress**: ${progressEntries.length} features tracked\n`;
        }
      }
    }
    
  } catch (error) {
    status += `\n⚠️ **Error reading enhanced system status**: ${error.message}\n`;
  }
  
  return status;
}
```

### 7. Enhanced Workflow Guidance with Feature Decomposition
```javascript
function generateEnhancedWorkflowGuidance() {
  const CURRENT_SESSION = readStateFile('current-session.json');
  const NEXT_COMMAND = commandDiscovery.suggestNextCommand();
  
  let guidance = `# Context Engineering Workflow (Enhanced)

## 🎯 Feature Request Decomposition Workflow

### 1. System Setup (One-time)
\`\`\`
/init-context [PROJECT_TYPE] [TECH_STACK]
\`\`\`
- Sets up directory structure with feature support
- Auto-detects tech stack and configures templates
- Enables feature decomposition capabilities
- Creates integration test scaffolding

### 2. Enhanced Feature Development Cycle

#### a) Plan with Intelligent Decomposition
\`\`\`
/create-prp <PROJECT_NAME> [--complexity=low|medium|high] [--features=auto]
\`\`\`
- Analyzes project complexity using ULTRATHINK
- Decomposes into multiple progressive feature requests
- Creates dependency relationships between features
- Generates integration test scaffolding
- Updates main PRP to orchestrator role

#### b) Multi-Feature Implementation
\`\`\`
/execute-prp [--feature=FR-001] [--auto-deps] [--force]
\`\`\`
- Execute all features: \`/execute-prp\`
- Execute specific feature: \`/execute-prp --feature=FR-001\`
- Execute with dependencies: \`/execute-prp --feature=FR-003 --auto-deps\`
- Force execution: \`/execute-prp --force\`

#### c) Feature-Specific Validation
\`\`\`
/validate [--feature=FR-001,FR-003] [--isolated] [--deep] [--integration]
\`\`\`
- Validate specific features with dependency awareness
- Run integration tests across features
- Smart validation with direct dependencies
- Deep validation with recursive dependencies

#### d) Feature Management
\`\`\`
/feature-status [FR-001] [--summary] [--dependencies] [--progress]
\`\`\`
- Track individual feature progress
- View dependency relationships
- Monitor overall project completion
- Identify blocked or failed features

## 🎯 Your Current Status
`;

  if (CURRENT_SESSION) {
    guidance += `**Current Phase**: ${CURRENT_SESSION.CURRENT_PHASE}\n`;
    guidance += `**Suggested Next Step**: ${NEXT_COMMAND.command} - ${NEXT_COMMAND.reason}\n\n`;
    
    // Feature decomposition status
    if (CURRENT_SESSION.FEATURE_DECOMPOSITION?.enabled) {
      const fd = CURRENT_SESSION.FEATURE_DECOMPOSITION;
      guidance += `**Feature Decomposition**: ✅ Enabled\n`;
      guidance += `**Total Features**: ${fd.total_features || 0}\n`;
      guidance += `**Completed Features**: ${fd.completed_features || 0}\n`;
      guidance += `**Overall Progress**: ${fd.overall_progress || 0}%\n\n`;
    }
    
    // Phase-specific guidance with feature decomposition
    switch (CURRENT_SESSION.CURRENT_PHASE) {
      case 'initialization':
        guidance += `### Getting Started with Feature Decomposition
1. Review auto-generated CLAUDE.md and feature templates
2. Create PLANNING.md with project complexity details
3. Run \`/create-prp <PROJECT_NAME> --complexity=medium\` for intelligent decomposition
4. Review generated feature requests and dependency graph`;
        break;
        
      case 'prp-created':
        if (CURRENT_SESSION.FEATURE_DECOMPOSITION?.enabled) {
          guidance += `### Multi-Feature Implementation Ready
1. Review generated feature requests in 2-docs/features/
2. Check dependency order with \`/feature-status --dependencies\`
3. Start with first feature: \`/execute-prp --feature=FR-001\`
4. Or execute all features: \`/execute-prp --auto-deps\``;
        } else {
          guidance += `### Single Feature Implementation Ready
1. Review the generated PRP
2. Run \`/execute-prp\` to begin implementation
3. Monitor validation gates during development`;
        }
        break;
        
      case 'executing':
        guidance += `### Implementation in Progress
1. Monitor feature progress with \`/feature-status --progress\`
2. Validate completed features: \`/validate --feature=FR-001\`
3. Handle dependency issues with \`/execute-prp --auto-deps\`
4. Run integration tests: \`/validate --integration\``;
        break;
        
      case 'completed':
        guidance += `### Features Complete - Next Steps
1. Review overall progress: \`/feature-status --summary\`
2. Run final validation: \`/validate --deep --integration\`
3. Plan next iteration or new project
4. Update patterns based on successful features`;
        break;
    }
  } else {
    guidance += `**Status**: System not initialized\n`;
    guidance += `**First Step**: Run \`/init-context\` to get started with feature decomposition\n`;
  }
  
  guidance += `\n\n## 💡 Feature Decomposition Pro Tips

### Effective Feature Planning
- Use descriptive project names for better decomposition
- Set appropriate complexity levels (low/medium/high)
- Review generated feature dependencies before implementation
- Ensure PLANNING.md has sufficient detail for ULTRATHINK analysis

### Multi-Feature Implementation
- Start with foundational features (usually FR-001)
- Use \`--auto-deps\` to handle dependencies automatically
- Validate features individually before integration testing
- Monitor progress with \`/feature-status --progress\`

### Dependency Management
- Review dependency graph: \`/feature-status --dependencies\`
- Handle circular dependencies by feature consolidation
- Use \`--force\` only when absolutely necessary
- Validate dependencies: \`/validate --deep\`

### Integration Testing
- Run integration tests after feature completion
- Use \`/validate --integration\` for cross-feature testing
- Address integration failures before proceeding
- Maintain traceability between features and tests

### Quality Assurance
- Validate frequently: \`/validate --feature=FR-XXX\`
- Use isolated validation for debugging: \`--isolated\`
- Run comprehensive validation before completion: \`--deep --integration\`
- Monitor system health: \`/help --status\``;

  return guidance;
}
```

### 8. Enhanced Troubleshooting with Feature Decomposition
```javascript
function generateEnhancedTroubleshootingGuide() {
  const basicGuide = generateTroubleshootingGuide();
  const featureGuide = commandDiscovery.getFeatureDecompositionTroubleshooting();
  
  return basicGuide + '\n\n' + featureGuide;
}
```

### 9. Feature Decomposition Help
```javascript
function generateFeatureDecompositionHelp() {
  return commandDiscovery.generateFeatureDecompositionHelp();
}
```

### 10. Enhanced Command Reference
```javascript
function generateEnhancedCommandReference() {
  const commands = commandDiscovery.discoverCommands();
  
  let reference = `# Enhanced Command Reference

## 🚀 Feature Request Decomposition Commands

`;

  // Group enhanced commands
  const enhancedCommands = commands.filter(cmd => cmd.featureDecomposition);
  const basicCommands = commands.filter(cmd => !cmd.featureDecomposition);

  // Enhanced commands section
  if (enhancedCommands.length > 0) {
    reference += `### Enhanced Commands with Feature Decomposition\n\n`;
    
    enhancedCommands.forEach(cmd => {
      reference += `#### /${cmd.name}\n`;
      reference += `**Purpose**: ${cmd.purpose}\n`;
      reference += `**Usage**: \`${cmd.usage}\`\n`;
      
      if (cmd.parameters && cmd.parameters.length > 0) {
        reference += `**Parameters**:\n`;
        cmd.parameters.forEach(param => {
          reference += `- \`${param.name}\` (${param.type})`;
          if (param.description) reference += `: ${param.description}`;
          if (param.values) reference += ` [${param.values.join('|')}]`;
          reference += '\n';
        });
      }
      
      if (cmd.examples && cmd.examples.length > 0) {
        reference += `**Examples**:\n`;
        cmd.examples.forEach(example => {
          reference += `- \`${example}\`\n`;
        });
      }
      
      reference += '\n';
    });
  }

  // Basic commands section
  if (basicCommands.length > 0) {
    reference += `### Standard Commands\n\n`;
    
    basicCommands.forEach(cmd => {
      reference += `#### /${cmd.name}\n`;
      reference += `**Purpose**: ${cmd.purpose || cmd.function}\n`;
      reference += `**Usage**: \`${cmd.usage}\`\n\n`;
    });
  }

  reference += `## 🎯 Command Workflow

### Feature Decomposition Workflow
1. \`/init-context\` - Initialize system with feature decomposition
2. \`/create-prp --complexity=medium\` - Create features with intelligent decomposition
3. \`/feature-status --summary\` - Review generated features
4. \`/execute-prp --auto-deps\` - Implement features with dependency management
5. \`/validate --integration\` - Validate with cross-feature testing
6. \`/feature-status --progress\` - Monitor overall progress

### Single Feature Workflow
1. \`/init-context\` - Initialize system
2. \`/create-prp <FEATURE_NAME>\` - Create single feature
3. \`/execute-prp\` - Implement feature
4. \`/validate\` - Validate implementation

## 🔧 Utility Commands
- \`/help --status\` - Enhanced system status with feature tracking
- \`/help --features\` - Feature decomposition system guide
- \`/help --workflow\` - Enhanced workflow with feature decomposition
- \`/help --troubleshoot\` - Troubleshooting including feature issues

---
*Enhanced Command Reference - Context Engineering with Feature Request Decomposition*`;

  return reference;
}
```

## Error Handling

```javascript
const helpErrorHandlers = {
  'command-not-found': (COMMAND_NAME) => {
    return `❌ Command '${COMMAND_NAME}' not found.\n\nAvailable commands:\n${listAvailableCommands()}\n\nUse \`/help --commands\` to see enhanced command reference.`;
  },
  'state-read-error': (filename) => {
    return `⚠️ Could not read state file: ${filename}\n\nTry running \`/init-context\` to reinitialize the system.`;
  },
  'discovery-failed': () => {
    return `⚠️ Command discovery failed.\n\nCheck that .claude/commands/ directory exists and contains command files.`;
  },
  'feature-decomposition-error': (error) => {
    return `⚠️ Feature decomposition system error: ${error}\n\nUse \`/help --features\` for feature decomposition guidance.`;
  }
};
```

## State Updates
- No state modifications (read-only command)
- Tracks help usage patterns (optional)
- Updates last accessed timestamp for commands

## Command Discovery Integration

### 1. Initialize Command Discovery
- Execute: `const discovery = require('./system/command_discovery.js')`
- Call: `const commands = discovery.discoverCommands()`
- Call: `const SYSTEM_STATUS = discovery.getSystemStatus()`

### 2. Generate Context-Aware Help
- For specific command: `discovery.generateHelp(COMMAND_NAME)`
- For general help: `discovery.generateOverallHelp()`
- Next step suggestion: `discovery.suggestNextCommand()`

### 3. Validate Command Prerequisites
- Before suggesting commands: `discovery.validateCommand(COMMAND_NAME, args)`
- Check: System state and file prerequisites
- Provide: Specific guidance for unmet prerequisites

### 4. System Status Integration
- Current phase: Read from current-session.json
- Active PRP: Display if available
- Validation status: Show last validation results
- MCP servers: Display availability status
```

## Files Created/Modified
- No files created or modified (informational command only)

## Validation Checks
- ✅ Command metadata accuracy
- ✅ System status verification
- ✅ State file integrity
- ✅ Command prerequisite validation

## Success Criteria
- Provides accurate, helpful information for all commands
- Shows current system status and context
- Suggests appropriate next steps based on current state
- Helps troubleshoot common issues
- Enables effective command discovery and usage