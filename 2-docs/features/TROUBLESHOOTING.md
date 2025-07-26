# Feature Decomposition Troubleshooting Guide

## Overview

This guide provides solutions to common issues encountered when using the Feature Request Decomposition System. Issues are organized by category with step-by-step resolution procedures.

## Feature Creation Issues

### Issue: No Features Generated During Decomposition

**Symptoms**:
- `/create-prp` completes but no features are created
- Feature registry is empty or missing
- Only main PRP is generated

**Possible Causes**:
1. Insufficient detail in PLANNING.md
2. Project complexity set too low
3. ULTRATHINK analysis failed
4. Template generation errors

**Resolution Steps**:

1. **Check PLANNING.md Content**:
   ```bash
   # Verify PLANNING.md exists and has sufficient detail
   cat PLANNING.md
   ```
   
   **Required Content**:
   - Clear project description (minimum 100 words)
   - Specific feature requirements
   - Technical stack information
   - User stories or use cases

2. **Increase Project Complexity**:
   ```bash
   # Try higher complexity setting
   /create-prp --complexity=medium --features=auto
   # or
   /create-prp --complexity=high --features=auto
   ```

3. **Check ULTRATHINK Analysis**:
   ```bash
   # Verify planning documents exist
   ls 2-docs/planning/
   
   # Check if analysis completed
   cat 2-docs/planning/project-analysis.md
   ```

4. **Manual Feature Specification**:
   ```bash
   # If automatic decomposition fails, try manual mode
   /create-prp --features=manual
   ```

5. **Debug Template Generation**:
   ```bash
   # Check template system
   /validate --templates
   
   # Regenerate templates if needed
   /init-context --update --regenerate-templates
   ```

### Issue: Too Many Features Generated

**Symptoms**:
- Excessive number of features (20+ for simple projects)
- Features are too granular
- Complex dependency chains

**Resolution Steps**:

1. **Reduce Complexity Level**:
   ```bash
   /create-prp --complexity=low --features=auto
   ```

2. **Limit Feature Count**:
   ```bash
   /create-prp --max-features=8 --features=auto
   ```

3. **Consolidate Features**:
   ```bash
   # Manually edit feature registry to combine related features
   # Edit 2-docs/features/feature-registry.json
   ```

4. **Simplify PLANNING.md**:
   - Remove overly detailed requirements
   - Focus on core functionality
   - Combine related features in descriptions

### Issue: Circular Dependencies Detected

**Symptoms**:
- Error message about circular dependencies
- Features cannot be executed in any order
- Dependency graph shows cycles

**Resolution Steps**:

1. **Analyze Dependency Graph**:
   ```bash
   /feature-status --dependencies --visualize
   ```

2. **Identify Circular Paths**:
   ```bash
   /feature-status --dependencies --analyze-cycles
   ```

3. **Break Circular Dependencies**:
   
   **Option A: Consolidate Features**
   ```bash
   # Combine circularly dependent features into one
   # Edit feature registry to merge FR-003 and FR-005
   ```
   
   **Option B: Restructure Dependencies**
   ```bash
   # Remove unnecessary dependencies
   # Edit individual feature documents to remove circular refs
   ```
   
   **Option C: Introduce Intermediate Feature**
   ```bash
   # Create shared foundation feature
   # Restructure dependencies through the foundation
   ```

4. **Validate Resolution**:
   ```bash
   /feature-status --dependencies --validate
   ```

## Feature Execution Issues

### Issue: Dependencies Not Satisfied

**Symptoms**:
- Error: "Missing dependencies: FR-001, FR-002"
- Feature execution fails immediately
- Dependency validation errors

**Resolution Steps**:

1. **Check Dependency Status**:
   ```bash
   /feature-status --dependencies
   ```

2. **Auto-Execute Dependencies**:
   ```bash
   /execute-prp --feature=FR-005 --auto-deps
   ```

3. **Manual Dependency Resolution**:
   ```bash
   # Execute dependencies in order
   /execute-prp --feature=FR-001
   /validate --feature=FR-001
   /execute-prp --feature=FR-002
   /validate --feature=FR-002
   /execute-prp --feature=FR-005
   ```

4. **Force Execution (Use with Caution)**:
   ```bash
   # Only if you're certain dependencies aren't needed
   /execute-prp --feature=FR-005 --force
   ```

### Issue: Feature Execution Hangs or Times Out

**Symptoms**:
- Feature execution doesn't complete
- Process appears stuck
- No progress updates

**Resolution Steps**:

1. **Check System Resources**:
   ```bash
   # Monitor CPU and memory usage
   # Kill hanging processes if necessary
   ```

2. **Execute in Phases**:
   ```bash
   /execute-prp --feature=FR-001 --phase=requirements
   /execute-prp --feature=FR-001 --phase=design
   /execute-prp --feature=FR-001 --phase=implementation
   ```

3. **Reduce Complexity**:
   ```bash
   # Break feature into smaller sub-features
   # Edit feature document to simplify requirements
   ```

4. **Check for Infinite Loops**:
   ```bash
   # Review feature implementation for recursive calls
   # Check BDD scenarios for circular references
   ```

### Issue: Feature Implementation Fails

**Symptoms**:
- Feature execution completes but validation fails
- Implementation doesn't match requirements
- Integration tests fail

**Resolution Steps**:

1. **Validate Requirements**:
   ```bash
   /validate --feature=FR-001 --level=requirements
   ```

2. **Check Implementation Quality**:
   ```bash
   /validate --feature=FR-001 --level=comprehensive
   ```

3. **Review Feature Design**:
   ```bash
   # Check if design matches requirements
   cat 2-docs/features/FR-001/design.md
   ```

4. **Iterative Refinement**:
   ```bash
   # Re-execute with refined requirements
   /execute-prp --feature=FR-001 --phase=requirements --refine
   /execute-prp --feature=FR-001 --phase=implementation
   ```

## Validation Issues

### Issue: Integration Tests Failing

**Symptoms**:
- Individual features pass validation
- Integration tests fail
- Cross-feature functionality broken

**Resolution Steps**:

1. **Isolate Integration Issues**:
   ```bash
   /validate --feature=FR-001 --isolated
   /validate --feature=FR-003 --isolated
   /validate --feature=FR-001,FR-003 --integration
   ```

2. **Check Data Flow**:
   ```bash
   /validate --data-flow --features=FR-001,FR-003
   ```

3. **Validate Integration Points**:
   ```bash
   # Review integration points in feature documents
   cat 2-docs/features/FR-001/FR-001.md | grep -A 10 "Integration Points"
   ```

4. **Debug Integration Scenarios**:
   ```bash
   /validate --feature=FR-001,FR-003 --integration --debug
   ```

5. **Fix Integration Issues**:
   ```bash
   # Update integration test scenarios
   # Edit tests/integration/feature-interactions/
   
   # Re-run integration tests
   /validate --integration
   ```

### Issue: Validation Timeouts

**Symptoms**:
- Validation process doesn't complete
- Timeout errors in validation
- Partial validation results

**Resolution Steps**:

1. **Run Isolated Validation**:
   ```bash
   /validate --feature=FR-001 --isolated
   ```

2. **Validate in Stages**:
   ```bash
   /validate --feature=FR-001 --level=basic
   /validate --feature=FR-001 --level=full
   ```

3. **Check Resource Usage**:
   ```bash
   # Monitor system resources during validation
   # Close unnecessary applications
   ```

4. **Optimize Validation**:
   ```bash
   # Skip expensive validations temporarily
   /validate --feature=FR-001 --skip-performance
   ```

### Issue: Test Failures

**Symptoms**:
- Unit tests failing
- BDD scenarios not passing
- Test coverage insufficient

**Resolution Steps**:

1. **Analyze Test Failures**:
   ```bash
   /validate --feature=FR-001 --verbose
   ```

2. **Run Test Groups Separately**:
   ```bash
   /validate --feature=FR-001 --test-group=happy-path
   /validate --feature=FR-001 --test-group=edge-case
   /validate --feature=FR-001 --test-group=negative-case
   ```

3. **Update Test Scenarios**:
   ```bash
   # Edit BDD scenarios to match implementation
   # Update test expectations
   ```

4. **Regenerate Tests**:
   ```bash
   /execute-prp --feature=FR-001 --phase=tests --regenerate
   ```

## State Management Issues

### Issue: Feature Registry Corruption

**Symptoms**:
- Feature registry file is malformed
- Cannot load feature information
- Inconsistent feature states

**Resolution Steps**:

1. **Backup Current Registry**:
   ```bash
   cp 2-docs/features/feature-registry.json 2-docs/features/feature-registry.json.backup
   ```

2. **Validate Registry Format**:
   ```bash
   # Check JSON syntax
   cat 2-docs/features/feature-registry.json | python -m json.tool
   ```

3. **Regenerate Registry**:
   ```bash
   /create-prp --regenerate-registry
   ```

4. **Restore from Backup**:
   ```bash
   # If regeneration fails, restore from backup
   cp 2-docs/features/feature-registry.json.backup 2-docs/features/feature-registry.json
   ```

### Issue: Inconsistent Feature States

**Symptoms**:
- Feature status doesn't match actual state
- Progress percentages are incorrect
- Dependency states are inconsistent

**Resolution Steps**:

1. **Audit Feature States**:
   ```bash
   /feature-status --audit
   ```

2. **Reset Feature States**:
   ```bash
   /feature-status --reset-states
   ```

3. **Manual State Correction**:
   ```bash
   /feature-status FR-001 --update-status=completed --update-progress=100
   ```

4. **Validate State Consistency**:
   ```bash
   /feature-status --validate-consistency
   ```

## Performance Issues

### Issue: Slow Feature Decomposition

**Symptoms**:
- `/create-prp` takes very long to complete
- High CPU usage during decomposition
- Memory usage spikes

**Resolution Steps**:

1. **Reduce Project Complexity**:
   ```bash
   /create-prp --complexity=low --features=auto
   ```

2. **Limit Analysis Depth**:
   ```bash
   # Simplify PLANNING.md to reduce analysis complexity
   # Remove detailed technical specifications temporarily
   ```

3. **Use Incremental Decomposition**:
   ```bash
   # Decompose in phases
   /create-prp --phase=core-features
   /create-prp --phase=enhancement-features --append
   ```

4. **Monitor Resource Usage**:
   ```bash
   # Close other applications
   # Ensure sufficient RAM and disk space
   ```

### Issue: Slow Feature Execution

**Symptoms**:
- Individual feature execution is slow
- Long delays between execution phases
- System becomes unresponsive

**Resolution Steps**:

1. **Profile Feature Execution**:
   ```bash
   /execute-prp --feature=FR-001 --profile
   ```

2. **Execute in Smaller Phases**:
   ```bash
   /execute-prp --feature=FR-001 --phase=requirements
   /execute-prp --feature=FR-001 --phase=design
   /execute-prp --feature=FR-001 --phase=tasks
   /execute-prp --feature=FR-001 --phase=implementation
   ```

3. **Optimize Feature Complexity**:
   ```bash
   # Simplify feature requirements
   # Break complex features into smaller ones
   ```

4. **Parallel Execution**:
   ```bash
   # Execute independent features in parallel
   /execute-prp --feature=FR-001 &
   /execute-prp --feature=FR-002 &
   wait
   ```

## File System Issues

### Issue: Permission Errors

**Symptoms**:
- Cannot create feature directories
- File write permissions denied
- Template generation fails

**Resolution Steps**:

1. **Check Directory Permissions**:
   ```bash
   ls -la 2-docs/features/
   ```

2. **Fix Permissions**:
   ```bash
   # On Unix/Linux/Mac
   chmod -R 755 2-docs/features/
   
   # On Windows
   # Right-click folder → Properties → Security → Edit permissions
   ```

3. **Check Disk Space**:
   ```bash
   df -h  # Unix/Linux/Mac
   # Check available disk space on Windows through File Explorer
   ```

4. **Run with Elevated Privileges**:
   ```bash
   # If necessary, run commands with administrator privileges
   # Be cautious with this approach
   ```

### Issue: Missing Feature Files

**Symptoms**:
- Feature directories exist but files are missing
- Cannot find feature documents
- Broken file references

**Resolution Steps**:

1. **Check File Structure**:
   ```bash
   find 2-docs/features/ -name "*.md" -type f
   ```

2. **Regenerate Missing Files**:
   ```bash
   /create-prp --regenerate-files --feature=FR-001
   ```

3. **Restore from Templates**:
   ```bash
   # Copy from template and customize
   cp 2-docs/features/templates/feature-request-template.md 2-docs/features/FR-001/FR-001.md
   ```

4. **Validate File Integrity**:
   ```bash
   /validate --files --feature=FR-001
   ```

## Integration Issues

### Issue: Template System Conflicts

**Symptoms**:
- Template generation errors
- Inconsistent file formats
- Placeholder replacement failures

**Resolution Steps**:

1. **Validate Template System**:
   ```bash
   /validate --templates
   ```

2. **Regenerate Templates**:
   ```bash
   /init-context --update --regenerate-templates
   ```

3. **Check Template Conflicts**:
   ```bash
   # Look for conflicting template definitions
   grep -r "FEATURE_NAME" 2-docs/features/templates/
   ```

4. **Reset Template System**:
   ```bash
   /init-context --reset-templates
   ```

### Issue: Context Engineering Integration Problems

**Symptoms**:
- Feature decomposition conflicts with existing PRP
- State management inconsistencies
- Command conflicts

**Resolution Steps**:

1. **Check System Compatibility**:
   ```bash
   /validate --system-compatibility
   ```

2. **Update Context Engineering System**:
   ```bash
   /init-context --update --enable-feature-decomposition
   ```

3. **Migrate Existing Project**:
   ```bash
   /create-prp --convert-existing --backup
   ```

4. **Resolve Command Conflicts**:
   ```bash
   # Check for conflicting command definitions
   /help --commands --check-conflicts
   ```

## Emergency Recovery Procedures

### Complete System Reset

**When to Use**: When multiple systems are failing and normal troubleshooting isn't working.

**Steps**:
1. **Backup Current State**:
   ```bash
   cp -r 2-docs/features/ 2-docs/features-backup/
   cp -r .claude/state/ .claude/state-backup/
   ```

2. **Reset Feature System**:
   ```bash
   /init-context --reset-feature-system
   ```

3. **Regenerate from PLANNING.md**:
   ```bash
   /create-prp --fresh-start --complexity=medium
   ```

4. **Restore Critical Data**:
   ```bash
   # Manually restore important customizations from backup
   ```

### Rollback to Previous State

**When to Use**: When recent changes have broken the system.

**Steps**:
1. **Check State History**:
   ```bash
   cat .claude/state/prp-history.json
   ```

2. **Rollback to Previous Version**:
   ```bash
   /rollback --to-version=previous
   ```

3. **Validate Rollback**:
   ```bash
   /validate --system-health
   ```

## Getting Help

### Diagnostic Information Collection

When reporting issues, collect this diagnostic information:

```bash
# System information
/help --system-info

# Feature status
/feature-status --summary --dependencies

# Validation results
/validate --health-check

# Error logs
cat .claude/logs/feature-decomposition.log

# Configuration
cat .claude/settings.json
```

### Common Support Scenarios

1. **Feature Won't Execute**: Provide dependency graph and error messages
2. **Integration Failures**: Include integration test results and feature definitions
3. **Performance Issues**: Include system resource usage and timing information
4. **File System Issues**: Include directory structure and permission information

### Self-Help Resources

- **Quick Reference**: `2-docs/features/QUICK_REFERENCE.md`
- **Best Practices**: `2-docs/features/BEST_PRACTICES.md`
- **Integration Guide**: `2-docs/features/INTEGRATION_GUIDE.md`
- **Technical Architecture**: `2-docs/features/TECHNICAL_ARCHITECTURE.md`

## Conclusion

Most issues with the Feature Request Decomposition System can be resolved through systematic troubleshooting. Start with the simplest solutions (checking dependencies, validating files) before moving to more complex recovery procedures.

Remember that the system is designed to be resilient and self-healing in many cases. When in doubt, use the validation commands to check system health and the help system to get guidance on specific issues.