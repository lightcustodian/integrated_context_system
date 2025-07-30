# /implement - Streamlined Implementation Alias

**Purpose**: Streamlined implementation workflow that combines init-context, create-prp, and execute-prp with simple defaults
**Function**: Alias command that runs the full CE workflow with simplified settings for general development

## Usage
```
/implement [description] [--validate] [--feature-only]
```

## Arguments
- `description`: Optional project description (creates basic PLANNING.md if none exists)
- `--validate`: Run validation after implementation
- `--feature-only`: Skip project setup, only implement features

## Files Called
- `PLANNING.md` - Project configuration (created if missing)
- All files from init-context, create-prp, and execute-prp commands

## Files Created/Updated
- All files from init-context, create-prp, and execute-prp commands
- Basic PLANNING.md (if missing) with simple defaults

## User Response File
Please provide your response in: `response_[timestamp].md`

Include:
- Confirmation that implementation approach is correct
- Any additional requirements or constraints
- Approval to proceed with implementation

**Chat Response**: "I've created response_[timestamp].md with my implementation plan. Please review and respond in that file."

## Orchestration Agent Instructions

### Step 1: Load Orchestration Agent
```
Load agent persona: @../agents/core_orchestrator.md

You are coordinating streamlined implementation. Your task:
1. Check for PLANNING.md and create simple version if missing
2. Run /init-context --simple for basic project setup
3. Run /create-prp --simple for minimal feature decomposition
4. Run /execute-prp --simple for streamlined implementation
5. Optionally run /validate if --validate flag present
6. Provide implementation summary and next steps

**Streamlined Workflow**:
- Skip comprehensive planning phases
- Use basic agents only
- Minimize approval gates
- Focus on working implementation
- Apply simple quality standards
```

### Step 2: Environment Check and Setup
```
**Check for PLANNING.md**:
IF PLANNING.md does not exist:
  Create basic PLANNING.md with:
  - Project name from description argument
  - Simple complexity level (checked)
  - All technical requirements set to NONE (checked)
  - Basic project type detection
  - General development defaults

IF --feature-only flag present:
  Skip to Step 5 (execute-prp)
ELSE:
  Proceed with full workflow
```

### Step 3: Streamlined Project Initialization
```
**Execute /init-context --simple**:
- Use simple mode defaults from settings.json
- Skip comprehensive specialist analysis
- Create basic project structure only
- Use minimal documentation requirements
- Generate basic configuration files

**No approval gate** - proceed automatically to Step 4
```

### Step 4: Minimal Feature Planning
```
**Execute /create-prp --simple**:
- Use minimal feature decomposition (1-3 features max)
- Skip comprehensive specialist analysis
- Create basic test files for TDD
- Generate simple PRP document
- Use streamlined documentation

**No approval gate** - proceed automatically to Step 5
```

### Step 5: Streamlined Implementation
```
**Execute /execute-prp --simple**:
- Use core agents only (code_writer, code_tester, validation_assessor)
- Apply TDD methodology with basic quality standards
- Skip complex integration testing
- Use minimal approval gates
- Focus on working implementation

**Focused Implementation Process**:
1. Load existing feature specifications (from create-prp)
2. Execute TDD cycles with basic validation
3. Implement features with core agents only
4. Apply simple quality checks
5. Generate implementation summary
```

### Step 6: Optional Validation
```
IF --validate flag present:
  **Execute /validate**:
  - Use project type appropriate validation
  - Apply basic quality standards
  - Generate validation report
  - Provide improvement recommendations

ELSE:
  **Provide Implementation Summary**:
  - Features implemented
  - Tests executed and results
  - Code quality assessment
  - Next steps for development
```

### Step 7: Implementation Summary and Next Steps
```
**Generate comprehensive summary**:
- Features successfully implemented
- Test results and coverage
- Code quality metrics
- Integration points validated
- Issues identified and resolved
- Recommendations for next development cycle

**Next Steps Guidance**:
- How to extend the implementation
- Testing and validation recommendations
- Documentation and deployment considerations
- Path to more comprehensive CE workflow if needed
```

## Success Criteria
- [ ] Project setup completed (if needed)
- [ ] Features identified and decomposed
- [ ] Implementation code working and tested
- [ ] Basic quality validation passed
- [ ] Clear next steps provided

## Integration with CE Workflow
This command provides a bridge to full Context Engineering:
- **Simple projects**: Use /implement for complete workflow
- **Complex projects**: Use /design → /init-context → /create-prp → /execute-prp → /validate
- **Mixed approach**: Use /implement then upgrade to full CE for additional features

## Recovery Support
If implementation is interrupted:
- Check which CE command was executing
- Resume from that command with --simple flag
- Maintain continuity with existing project state

---
*Generated by Context Engineering v4.0 Unified System*
*Provides streamlined access to full CE capabilities through simplified workflow*