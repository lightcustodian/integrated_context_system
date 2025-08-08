# Progressive Error Recovery System

## Error Message Format Standard

**Unified Error Format**:
```
ERROR [COMMAND]: [SPECIFIC_ISSUE]
CONTEXT: [WHAT_WAS_BEING_ATTEMPTED]
IMPACT: [WHAT_CANNOT_PROCEED]
SOLUTION: [SPECIFIC_RECOVERY_STEPS]  
MANUAL: [MANUAL_FALLBACK_OPTION]
REFERENCE: [DOCUMENTATION_SECTION]
```

## Progressive Recovery Implementation

### Step 1: Automatic Repair
- **Template Missing**: Regenerate from planning_templates_complete.md
- **File Corruption**: Restore from .claude/state/backups/
- **Invalid Config**: Reset to project defaults from DESIGN_PLAN.md

### Step 2: Guided Manual Recovery
- **Specific Instructions**: Clear steps with file paths and commands
- **Validation Checks**: How to verify repair was successful
- **Alternative Methods**: Multiple paths to resolution

### Step 3: Command Sequence Fallback  
- **Re-run Strategy**: Safe command re-execution from last good state
- **Dependency Reset**: Clear and rebuild prerequisite relationships
- **State Cleanup**: Remove corrupted progress tracking

### Step 4: Human Escalation
- **Escalation Triggers**: Three consecutive failures, data integrity issues
- **Context Package**: Complete error history and system state
- **Expert Guidance**: Specific technical intervention points

## Error Recovery Examples

### Missing Template File
```
ERROR [PLAN]: Template file missing - market_research_template.md
CONTEXT: Attempting to generate planning documents for Market Research requirement  
IMPACT: Cannot create market_research.md - specialist assignment blocked
SOLUTION: Run '/plan --repair-templates' to regenerate missing template files
MANUAL: Copy template from planning_templates_complete.md Section 2
REFERENCE: CLAUDE.md Section "Template System Standards"
```

### Configuration File Corruption
```
ERROR [DESIGN]: DESIGN_PLAN.md corrupted or missing technical requirements
CONTEXT: Loading project configuration for planning workflow execution
IMPACT: Cannot determine specialist assignments - planning blocked
SOLUTION: Run '/design --restore [project-name]' to regenerate configuration
MANUAL: Restore from .claude/state/backups/[latest]/ directory
REFERENCE: CLAUDE.md Section "State Management Standards"
```

### Cross-Reference Validation Failure
```
ERROR [VALIDATE]: Cross-reference validation failed - broken links detected
CONTEXT: Validating documentation consistency across project files
IMPACT: Documentation integrity compromised - quality standards not met
SOLUTION: Run '/validate --repair-references' to fix broken cross-references
MANUAL: Review and update file paths in affected documents manually
REFERENCE: CLAUDE.md Section "Information Management Standards"
```

## Agent-Based Error Recovery

### Recovery Coordination Agent
Load agent persona: @../agents/validation_coordinator.md for error recovery:
- **Error Classification**: Automatic categorization and severity assessment
- **Recovery Strategy Selection**: Choose appropriate recovery approach
- **Recovery Execution**: Coordinate repair actions across affected systems
- **Recovery Validation**: Verify successful repair and system health

### Recovery Success Validation
- **System Health Check**: All core functions operational
- **Data Integrity Verification**: No corruption in project files
- **Workflow Continuity**: Next command can execute normally
- **Quality Standards Maintained**: Recovery preserves project quality levels