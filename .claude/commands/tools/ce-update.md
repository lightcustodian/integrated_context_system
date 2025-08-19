# CE-Update Command

## Purpose
Update simple_context system itself (for framework enhancement projects)

## Usage
```bash
.claude ce-update
```

## Prerequisites
- QA command completed
- Project involves enhancements to simple_context framework itself

## When to Use
This command is only used when the project itself was building enhancements to the simple_context system (e.g., new commands, agents, or core functionality improvements)

## Implementation Steps

### Step 1: Load Agents
**State Update**: Update .claude/state/session.json:
- current_command: "ce-update"
- current_step: 1
- step_name: "load_agents"
- last_updated: [TIMESTAMP]

**Implementation**:
1. Load STATE_MANAGER agent
2. Load PROJECT_MANAGER agent
3. Load CODER agent
4. Confirm agents are ready for framework updates

### Step 2: Documentation Review
**State Update**: Update .claude/state/session.json:
- current_step: 2
- step_name: "documentation_review"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Internal Documentation**: 
   - Fully ingest all files in docs/internal/
   - Review framework documentation standards
   - Load CE.md for framework understanding
2. **External Documentation**:
   - Read docs/external/.index.md for documentation overview
   - Review Context Engineering framework documentation
   - Load relevant system architecture guides
3. Document framework enhancement context

### Step 3: MCP Integration
**State Update**: Update .claude/state/session.json:
- current_step: 3
- step_name: "mcp_integration"
- last_updated: [TIMESTAMP]

**Implementation**:
1. Request framework management capabilities
2. Request: "Need: file_operations, version_control, documentation_tools"
3. Confirm all required tools are available

### Step 4: Detect Framework Changes
**State Update**: Update .claude/state/session.json:
- current_step: 4
- step_name: "detect_framework_changes"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **New Commands**: Identify any new .claude/commands/ files created
2. **Agent Changes**: Detect new or modified agents in .claude/agents/
3. **Process Changes**: Identify modifications to core workflows or state management
4. **Template Updates**: Find new or updated template files
5. **Tool Integration**: Detect new MCP integrations or capability mappings
6. **Configuration Changes**: Identify updates to .claude/settings.json or other config

### Step 5: Update System Documentation
**State Update**: Update .claude/state/session.json:
- current_step: 5
- step_name: "update_system_documentation"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Update CE.md**: Reflect new capabilities and system changes
2. **Update Command Documentation**: Ensure all commands are documented
3. **Update Agent Documentation**: Document new or changed agents
4. **Update Process Documentation**: Reflect workflow or state management changes
5. **Update Examples**: Provide examples of new functionality
6. **Update Architecture Documentation**: Reflect system architecture changes

### Step 6: Version Control Integration
**State Update**: Update .claude/state/session.json:
- current_step: 6
- step_name: "version_control_integration"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Stage Changes**: Add all framework updates to version control
2. **Create Framework Commit**: Commit changes with descriptive message
3. **Tag Version**: Create version tag if significant framework changes
4. **Update Change Log**: Document what changed and why
5. **Backup Current State**: Ensure recovery is possible if issues arise

### Step 7: Validate Framework Integrity
**State Update**: Update .claude/state/session.json:
- current_step: 7
- step_name: "validate_framework_integrity"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Command Validation**: Verify all commands still function properly
2. **Agent Integration**: Test agent loading and coordination
3. **State Management**: Verify state tracking still works
4. **MCP Integration**: Confirm external tool access functions
5. **Template Processing**: Validate template system works with changes
6. **End-to-End Test**: Run simple workflow to ensure system coherence

### Step 8: Update Command Templates
**State Update**: Update .claude/state/session.json:
- current_step: 8
- step_name: "update_command_templates"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **DESIGN_PLAN_Template.md**: Update if project structure changed
2. **Response Templates**: Update if approval process changed
3. **State Templates**: Update if state structure changed
4. **Agent Templates**: Update if agent interfaces changed
5. **Documentation Templates**: Update if documentation standards changed

### Step 9: Framework Update Approval
**State Update**: Update .claude/state/session.json:
- current_step: 9
- step_name: "framework_update_approval"
- framework_update_status: "pending_approval"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Change Summary**: Document all framework changes made
2. **Impact Assessment**: Analyze how changes affect existing workflows
3. **Testing Results**: Report framework integrity validation results
4. **Migration Guide**: Create guide for users of previous version (if needed)
5. Generate response_[date]_[time]_ce-update.md with:
   - Complete list of framework changes
   - Validation test results
   - Updated system capabilities
   - Any breaking changes or migration requirements
   - Confirmation system is ready for use

## Inputs
- Completed project that enhanced simple_context framework
- .claude/state/session.json for project context
- All new or modified framework files

## Outputs
- Updated CE.md system documentation
- Updated command and agent documentation
- Version controlled framework changes
- Framework integrity validation results
- Updated templates and configuration
- response_[date]_[time]_ce-update.md for human approval

## Outputs
- Updated framework documentation in `.claude/docs/`
- Version controlled framework changes with proper commit history
- Framework integrity validation results
- Updated templates and configuration files
- `response_[date]_[time]_ce-update.md` for human approval

## Success Criteria
- All framework changes are properly documented
- System documentation reflects new capabilities
- Framework integrity is validated through testing
- Version control contains complete change history
- Templates and configuration are updated appropriately
- System is ready for use with new enhancements
- Human approves framework updates

## Recovery Support
If command interrupted:
- Check `.claude/state/session.json` for last completed step (1-9)
- Resume from interrupted step with STATE_MANAGER context restoration
- Validate previous work before proceeding:
  - Step 1: Verify agent loading
  - Step 2: Check documentation review status
  - Step 3: Re-establish MCP connections if needed
  - Step 4: Check framework change detection and analysis
  - Step 5: Review documentation updates in `.claude/docs/`
  - Step 6: Validate version control integration status
  - Step 7: Confirm framework integrity validation results
  - Step 8: Check template and configuration update status
  - Step 9: Review approval status and remaining framework updates
- **Framework Recovery**: Resume from specific framework area being updated
- **Rollback Capability**: Restore to previous working state if validation fails
- Re-load required agents and restore framework update context
- Continue from exact interruption point without repeating completed updates

## Important Notes
- This command is only used for projects that enhance the simple_context system itself
- Most projects will never use this command
- Changes to core framework require careful testing and validation
- Breaking changes should be clearly documented and justified
- System should remain backward compatible when possible