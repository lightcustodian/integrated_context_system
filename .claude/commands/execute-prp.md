# /execute-prp - Feature Execution with Multi-Agent Orchestration

**Purpose**: Execute features using TDD methodology with intelligent feature orchestration
**Function**: Orchestration Agent coordinates specialist agents to implement features through systematic Red-Green-Refactor cycles

## Files Called
- `CLAUDE.md` - AI agent instructions (read for current configuration)
- `2-docs/PRPs/main-prp.md` - Project orchestrator and implementation guidance
- `2-docs/features/feature-registry.json` - Feature tracking and dependencies
- `2-docs/features/FR-XXX-[feature-name].md` - Individual feature specifications
- `2-docs/context/design_review_standards_software.md` - Quality standards for software components (if project_type is software/web/script)
- `2-docs/context/design_review_standards_non_software.md` - Quality standards for non-software components (if project_type is marketing/research/design/mixed)
- `2-docs/context/validation_strategy_software.md` - Testing approach for software components (if project_type is software/web/script)
- `2-docs/context/validation_strategy_non_software.md` - Testing approach for non-software components (if project_type is marketing/research/design/mixed)
- `.claude/settings.json` - Project configuration and agent assignment rules
- `.claude/state/session.json` - Current state and progress
- Test files using flat naming convention: `FR-[XXX]_[test_type]_[description].[extension]`

## Files Created
- None - This command only populates/updates existing files

## Files Populated/Updated
- `.claude/state/session.json` - Updated with execution progress and specialist tracking
- `1-main/` - Populated with implementation code (based on tech stack)
- Test files updated with actual implementations and results using flat naming: `FR-[XXX]_[test_type]_[description].[extension]`
- `2-docs/features/feature-registry.json` - Updated with completion status and confidence scores
- `2-docs/features/FR-XXX-[feature-name].md` - Updated with implementation notes and results

## Usage
```
/execute-prp [--feature=FR-001,FR-002] [--auto-deps] [--force] [--single-feature=FR-001]
```

## Options
- `--feature=ID1,ID2`: Execute specific features (comma-separated)
- `--auto-deps`: Automatically include and execute dependencies
- `--force`: Bypass dependency checks and execute anyway
- `--single-feature=ID`: Execute only one feature without dependencies

## Orchestration Agent Instructions

### Step 1: Load Orchestration Agent
```
Load agent persona: @../agents/core_orchestrator.md

You are coordinating feature implementation. Your task:
1. Analyze execution requirements and determine specialist needs
2. Delegate implementation tasks to appropriate specialist agents
3. Coordinate TDD methodology execution across specialists
4. Monitor specialist execution and integrate results
5. Generate comprehensive implementation summary and validation results
```

### Step 2: Execution Planning and Validation
**Orchestration Task**: Determine execution strategy and specialist requirements

**Execution Strategy Analysis**:
```
Read agent assignment rules from .claude/settings.json
Parse command line arguments:
- No arguments: Execute all incomplete features in dependency order
- --feature=ID1,ID2: Execute specified features with dependency validation
- --auto-deps: Automatically include and execute dependencies for specified features
- --force: Bypass dependency checks and execute anyway
- --single-feature=ID: Execute only one feature (validate dependencies but don't auto-execute)

Load execution context:
- Read feature registry and validate structure
- Check feature dependencies and execution order
- Verify all required features have complete specifications
- Validate that create-prp has been completed
- Load appropriate design review standards and validation strategy files based on project type
```

### Step 3: Specialist Agent Assignment for Implementation

#### Always Required Implementation Specialists

**Code Writer Agent** (for software features):
```
Create subagent with persona: @../agents/code_writer.md

Your specific task: Implement features using TDD methodology
Your input context:
- Feature specifications and requirements
- Pre-created test files using flat naming convention
- Technology stack and development environment
- Design review standards and coding patterns from appropriate standards file

Your expected output:
- Working implementation code in 1-main/
- Code following Red-Green-Refactor TDD cycles
- Implementation meeting all feature acceptance criteria
- Code quality meeting design review standards
```

**Code Tester Agent** (for test execution and validation):
```
Create subagent with persona: @../agents/code_tester.md

Your specific task: Execute comprehensive test validation
Your input context:
- Pre-created test files from /create-prp using flat naming convention
- Implementation code from Code Writer Agent
- Testing framework configuration
- Quality standards and coverage requirements from validation strategy files

Your expected output:
- Complete test execution results (Happy Path, Edge Case, Negative Case)
- Test failure analysis and debugging guidance
- Integration test results and validation
- Test coverage reports and quality metrics
```

#### Conditional Specialists Based on Project Type and Complexity

**If project includes non-code components:**

**Validation Stakeholder Agent**:
```
Create subagent with persona: @../agents/validation_stakeholder.md

Your specific task: Validate non-code deliverables and business requirements
Your input context:
- Non-code feature deliverables
- Business requirements and stakeholder expectations
- Quality standards for content, design, marketing components from non-software standards files
- Project-specific validation criteria

Your expected output:
- Stakeholder validation results for non-code components
- Business requirement satisfaction assessment
- Quality validation for content and design deliverables
- Stakeholder approval simulation and feedback
```

**If integration testing is complex:**

**Code Integration Tester Agent**:
```
Create subagent with persona: @../agents/code_integration_tester.md

Your specific task: Execute comprehensive integration testing
Your input context:
- Completed feature implementations
- Feature dependencies and integration points
- Integration test files using flat naming convention
- Cross-feature interaction requirements

Your expected output:
- Integration test execution results
- Cross-feature functionality validation
- Data flow and state consistency testing
- Integration issue identification and resolution guidance
```

**If additional test coverage is needed:**

**Code Test Writer Agent**:
```
Create subagent with persona: @../agents/code_test_writer.md

Your specific task: Enhance test coverage based on implementation
Your input context:
- Implemented code and feature functionality
- Existing test coverage analysis
- Validation Strategy files from /create-prp (software or non-software versions)
- Coverage gaps and additional testing needs

Your expected output:
- Additional tests for comprehensive coverage using flat naming convention
- Enhanced integration test scenarios
- End-to-end test implementations
- Test coverage validation and improvement recommendations
```

### Step 4: Feature Implementation Loop Coordination
**Orchestration Task**: Coordinate systematic feature implementation

**For each feature in execution order:**

**Load Feature Context** (Orchestration Task):
```
1. Read feature specification document
2. Extract requirements, design, and task list
3. Load associated test files using flat naming convention: FR-[XXX]_[test_type]_[description].[extension]
4. Prepare feature-specific implementation environment
5. Assign appropriate specialists based on feature type
```

**Execute Coordinated TDD Workflow**:

**RED PHASE - Coordinated by Code Tester Agent:**
```
Task Assignment: Execute pre-created tests to establish baseline
For each test group (Happy Path → Edge Case → Negative Case):
1. Load pre-created test files from /create-prp using flat naming convention
2. Run tests (should fail initially)
3. Verify tests fail for correct reasons
4. Report test failure analysis to Orchestration Agent
```

**GREEN PHASE - Coordinated by Code Writer Agent:**
```
Task Assignment: Implement minimal code to make tests pass
For each test group:
1. Implement minimal code to make tests pass
2. Focus on making tests green, not perfect code
3. Coordinate with Code Tester Agent for validation
4. Enter Focused Mode if tests still fail:
   - Analyze specific test failures with Code Tester Agent
   - Implement targeted fixes
   - Re-run failed tests only
   - Maximum 3 focused attempts before escalation to Orchestration Agent
```

**REFACTOR PHASE - Coordinated by Code Writer Agent:**
```
Task Assignment: Improve code quality while maintaining test success
For each test group:
1. Improve code quality while keeping tests green
2. Apply design patterns and best practices
3. Ensure code meets design review standards
4. Coordinate with Code Tester Agent to verify tests still pass
5. If tests fail, revert refactoring and try different approach
```

### Step 5: Feature-Level Validation Coordination
**Orchestration Task**: Coordinate comprehensive feature validation

**After completing all task-level TDD cycles:**

**Feature Testing Coordination**:
```
Coordinate between Code Tester Agent and other specialists:
- Execute validation strategy from appropriate validation strategy files
- Run integration tests for this feature using flat naming convention
- Validate feature meets all acceptance criteria
- Verify feature integrates properly with dependencies
```

**Stakeholder Validation** (for non-code components):
```
If Validation Stakeholder Agent assigned:
- Simulate stakeholder review and approval processes
- Validate deliverable quality against project standards
- Ensure feature meets business requirements and user needs
- Document any issues or recommendations for improvement
```

### Step 6: Integration Validation Coordination
**Orchestration Task**: Coordinate cross-feature integration validation

**After each feature completion:**
```
Coordinate integration testing between specialists:
- Code Integration Tester Agent: Run integration tests between features using flat naming
- Code Tester Agent: Validate data flow and state consistency
- Validation Stakeholder Agent: Test business workflow integration (if applicable)
- Update integration test results in feature registry
```

**Cross-Feature Validation**:
```
Orchestrate comprehensive cross-feature testing:
- Test interactions between completed features
- Validate system behavior with multiple features
- Ensure no regressions in previously completed features
- Document integration test outcomes with specialist input
```

### Step 7: Progress Tracking and State Management
**Orchestration Task**: Coordinate progress tracking across all specialists

**Update Feature Status**:
```
Integrate specialist results:
- Mark feature as 'completed' in registry
- Update confidence score based on specialist test results
- Record completion timestamp and validation results
- Track any issues or technical debt identified by specialists
```

**Update Project Progress**:
```
Synthesize specialist progress:
- Calculate overall completion percentage
- Update execution order for remaining features
- Identify newly available features (dependencies satisfied)
- Update session state with current progress and specialist contributions
```

### Step 8: Project-Level Testing Coordination (if all features complete)
**Orchestration Task**: Coordinate comprehensive project validation

**When all features are implemented:**

**Test Writer Agent Enhancement**:
```
If Code Test Writer Agent assigned:
- Review Validation Strategy files created by /create-prp (software or non-software versions)
- Analyze implemented code and feature interactions
- Identify gaps in integration testing
- Create additional tests using flat naming convention for comprehensive coverage
```

**Comprehensive Testing Execution**:
```
Coordinate final validation across all specialists:
- Code Tester Agent: Execute all tests using validation strategy guidelines
- Code Integration Tester Agent: Run comprehensive integration test suite
- Validation Stakeholder Agent: Execute end-to-end user journey validation
- Validate complete system functionality across all domains
```

### Step 9: Quality Assurance and Validation Coordination
**Orchestration Task**: Coordinate comprehensive quality validation

**Code Quality Validation** (Code Writer + Code Tester coordination):
```
- Verify adherence to design review standards from appropriate standards files
- Check naming conventions and coding patterns
- Validate documentation completeness
- Ensure security and performance requirements met
```

**Testing Validation** (Code Tester + Code Test Writer coordination):
```
- Verify minimum test coverage achieved (80%+ for code)
- Validate test scenarios align with implementation
- Check test isolation and reliability
- Ensure integration tests cover feature interactions
```

**Non-Code Quality Validation** (Validation Stakeholder coordination):
```
If applicable:
- Validate content quality and brand compliance using non-software standards
- Ensure business requirement satisfaction
- Verify stakeholder acceptance criteria met
- Confirm non-code deliverable quality standards
```

### Step 10: Comprehensive Summary and Approval Gate
**Generate orchestrated execution summary:**

**Specialist Agent Summary**:
- **Code Writer Agent**: Implementation results, code quality, and TDD execution
- **Code Tester Agent**: Test execution results, coverage metrics, and quality validation
- **Code Integration Tester Agent**: Integration testing results and cross-feature validation (if used)
- **Code Test Writer Agent**: Additional test coverage and enhancement results (if used)
- **Validation Stakeholder Agent**: Non-code validation and stakeholder approval results (if used)

**Integration Results**:
- Features completed and their status with specialist validation
- Test results across all levels (task, feature, integration)
- Code quality metrics and specialist validation results
- Any issues encountered and specialist-recommended resolutions

**Progress Summary**:
- Overall project completion percentage
- Remaining features and their readiness
- Integration test results and coverage from specialists
- Confidence scores and quality metrics from specialist validation

**Next Steps**:
- Recommendations for next execution cycle based on specialist input
- Issues requiring attention identified by specialists
- Validation and testing recommendations from specialist analysis
- Suggestions for project completion

## Success Criteria
- [ ] All specialist agents successfully coordinated
- [ ] Specified features implemented using coordinated TDD methodology
- [ ] Unit tests pass for all test groups (Happy, Edge, Negative) as validated by specialists
- [ ] Integration tests validate feature interactions through specialist coordination
- [ ] Code quality meets design review standards as verified by specialists
- [ ] Feature registry updated with specialist validation results
- [ ] No regressions in previously completed features
- [ ] Project-level validation completed if all features done

## Recovery Support
If execution is interrupted:
- Check specialist completion status and partial results
- Resume from last successful specialist task completion
- Validate consistency across specialist work
- Update registry and dependencies with specialist input

## Python Utilities Used
- Minimal file operations only if specialist capabilities insufficient
- Network timeout handling for MCP integration

---
*Generated by Context Engineering v3.0 with Multi-Agent Orchestration*
*Next Step: Run /validate to ensure quality and completeness with specialist validation*