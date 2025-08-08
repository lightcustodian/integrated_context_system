# Validation Gates Implementation

## Input File Existence Validation

### Implementation Strategy
```markdown
**Before Each Command Execution**:
- [ ] Verify all required input files exist and are readable
- [ ] Validate file format matches expected structure  
- [ ] Confirm file contains required information sections
- [ ] Check file permissions allow read/write access
- FAIL if any required files missing, corrupted, or inaccessible

**Required Files by Command**:
- /design: None (creates initial files)
- /plan: DESIGN_PLAN.md, SUPPLEMENT.md (optional)
- /create-prp: DESIGN_PLAN.md, 2-docs/planning/ documents
- /execute-prp: DESIGN_PLAN.md, 2-docs/features/, 2-docs/PRPs/main-prp.md
- /validate: Complete project implementation, all previous outputs
```

### Error Recovery for Missing Files
- **Missing DESIGN_PLAN.md**: Suggest re-running /design command
- **Missing Planning Documents**: Suggest re-running /plan command  
- **Missing Template Files**: Automatic regeneration from planning_templates_complete.md
- **Corrupted Files**: Restore from .claude/state/backups/

## Technical Requirements Consistency Validation

### Implementation Strategy
```markdown
**Technical Requirements Validation**:
- [ ] Verify all 6 technical requirements have valid levels (NONE/MINIMAL/STANDARD/COMPREHENSIVE)
- [ ] Ensure complexity level aligns with requirement selections
- [ ] Validate technology stack compatibility with requirements
- [ ] Check specialist assignments match requirement levels
- FAIL if requirements are inconsistent or impossible to fulfill

**Consistency Rules**:
- Simple projects: Requirements generally NONE or MINIMAL
- Complex projects: Requirements generally MINIMAL or higher
- Technology stack must support selected requirement levels
- Specialist capabilities must match requirement complexity
```

### Agent-Based Consistency Checking
Load agent persona: @../agents/validation_assessor.md for consistency validation:
- **Requirement Analysis**: Deep analysis of requirement level compatibility
- **Technology Validation**: Verify tech stack supports all requirements
- **Capability Assessment**: Ensure specialist agents can fulfill requirements
- **Recommendation Generation**: Suggest adjustments for consistency

## Template File Completeness Validation

### Implementation Strategy  
```markdown
**Template File Validation**:
- [ ] Verify all required template files exist in 2-docs/planning/templates/
- [ ] Validate template files follow underscore naming convention
- [ ] Confirm templates contain required sections and placeholders
- [ ] Check template file accessibility and readability
- FAIL if any required templates missing or malformed

**Required Template Files** (based on Technical Requirements):
- project_analysis_template.md (always required)
- market_research_template.md (if Market Research ≥ MINIMAL)
- technical_research_template.md (if Technical Research ≥ MINIMAL)  
- risk_management_template.md (if Risk Management ≥ MINIMAL)
- planning_depth_template.md (if Planning Depth ≥ MINIMAL)
- system_architecture_template.md (if System Architecture ≥ MINIMAL)
- documentation_template.md (if Documentation ≥ MINIMAL)
```

### Automatic Template Repair
- **Missing Templates**: Auto-generate from planning_templates_complete.md
- **Corrupted Templates**: Restore from template source
- **Naming Issues**: Auto-rename to follow underscore convention
- **Content Validation**: Verify required placeholders and structure

## Proactive Prerequisite Checking

### Implementation Strategy
```markdown
**Before Command Execution**:
- [ ] Check all prerequisite commands have completed successfully
- [ ] Verify required outputs from previous commands exist
- [ ] Validate session state indicates readiness for current command
- [ ] Confirm no blocking errors or incomplete operations
- FAIL if prerequisites not met or system not ready

**Command Prerequisites**:
- /design: None (entry point)
- /plan: /design completed, DESIGN_PLAN.md exists
- /create-prp: /plan completed, planning documents exist
- /execute-prp: /create-prp completed, feature specifications exist
- /validate: Implementation completed, deliverables exist
```

### Step-by-Step Validation

### Implementation Strategy  
```markdown
**During Command Execution**:
- [ ] Validate each step completion before proceeding to next step
- [ ] Check step outputs meet success criteria requirements
- [ ] Verify step state is properly recorded for recovery
- [ ] Confirm no errors or warnings from step execution
- FAIL if any step fails validation or produces incomplete results

**Step Success Validation**:
- Purpose achieved as specified in step definition
- All required outputs created and accessible
- Success criteria met as documented in command specification
- Next step prerequisites established successfully
```

## Automatic State Management

### Implementation Strategy
```markdown
**Session State Tracking**:
- [ ] Update .claude/state/session.json after each successful step
- [ ] Record command completion status and next recommended command
- [ ] Create recovery points before major operations
- [ ] Track quality metrics and optimization impact
- [ ] Backup state files with rotation policy

**Recovery Point Creation**:
- Before each command execution (for rollback capability)
- After successful template processing (for corruption recovery)
- Following successful specialist coordination (for agent failures)
- Upon completion of major milestones (for workflow continuity)
```

### Clear Error Recovery

### Implementation Strategy
```markdown
**Error Recovery Pathways**:
- [ ] Attempt automatic repair using progressive recovery steps
- [ ] Provide clear manual recovery instructions with specific steps
- [ ] Offer command re-execution from last known good state
- [ ] Enable human escalation with complete context package
- [ ] Maintain system integrity throughout recovery process

**Recovery Success Validation**:
- System returns to operational state
- All data integrity maintained
- Workflow can continue normally
- Quality standards preserved
```

## Essential Validation Only

### Implementation Strategy
```markdown
**Validation Prioritization**:
Focus on validations that prevent system failure:
- [ ] Input file existence (HIGH IMPACT, LOW COMPLEXITY)
- [ ] Technical requirements consistency (HIGH IMPACT, MEDIUM COMPLEXITY)  
- [ ] Template file completeness (HIGH IMPACT, LOW COMPLEXITY)
- [ ] Prerequisites satisfaction (HIGH IMPACT, LOW COMPLEXITY)

Skip validations that add complexity without preventing failure:
- Content quality assessment (subjective, complex, low failure prevention)
- Cross-reference completeness (medium impact, high complexity)
- Performance optimization validation (nice-to-have, not failure prevention)
```

## Minimal Complexity Validation

### Implementation Strategy
```markdown
**Complexity Reduction Approach**:
- [ ] Use simple file existence checks over complex parsing
- [ ] Implement basic format validation over comprehensive analysis
- [ ] Apply essential logic checks over exhaustive rule validation  
- [ ] Focus on blocking errors over quality improvements
- [ ] Prefer automatic repair over complex manual procedures

**Complexity Guidelines**:
- If validation requires > 3 steps → Consider simplification
- If validation needs specialized parsing → Use basic checks instead
- If validation is subjective → Skip in favor of objective measures
- If validation adds > 10% to command time → Evaluate necessity
```