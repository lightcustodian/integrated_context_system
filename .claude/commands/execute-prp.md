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
/execute-prp [--simple] [--feature=FR-001,FR-002] [--auto-deps] [--force] [--single-feature=FR-001]
```

## Options
- `--simple`: Use simplified implementation with basic agents and minimal validation
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
2. Apply --simple mode if specified (basic agents and streamlined validation)
3. Delegate implementation tasks to appropriate specialist agents
4. Coordinate TDD methodology execution across specialists
5. Monitor specialist execution and integrate results
6. Generate comprehensive implementation summary and validation results

**Simple Flag Handling**:
IF --simple flag present:
  Reduce scope of specialist analysis (not which specialists)
  Use streamlined documentation format
  Focus on essential deliverables only
  All specialist agents remain available based on technical requirements
```

### Step 2: REQUIRED - Capability Analysis and MCP Coordination
**REQUIRED ATTEMPT**: This step must be attempted before proceeding to Step 2.1.

#### Capability Analysis Template (REQUIRED ATTEMPT)
```
**Command**: /execute-prp
**Planned Work**: 
- Feature implementation using TDD methodology
- Code writing and test execution coordination
- Integration testing across features
- Quality assurance and validation
- Progress tracking and state management
- Cross-feature dependency resolution

**Required Capabilities Assessment**:
- [ ] file_operations: Reading feature specs, implementing code, updating test files and registries
- [ ] web_search: Research implementation patterns and debugging solutions (if needed)
- [ ] version_control: Committing feature implementations and tracking code changes
- [ ] testing_framework: Executing TDD cycles, running tests, and validating coverage

**MCP Agent Coordination** (REQUIRED):
Load MCP Agent persona: @../agents/core_mcp.md
Request capabilities: "file_operations, version_control, web_search, testing_framework"

**REQUIRED OUTPUT**: MCP Agent must respond with capability confirmation
Expected response format: "Development environment ready: [tools] connected. X tools available."

**MCP Status**: [PENDING → CONNECTED/FAILED]
**Available Tools**: [List tools provided by MCP Agent]
```

#### MCP Coordination Failure Protocol
If MCP Agent coordination fails:
1. **Document Limitations**: Record which capabilities are unavailable
2. **Modify Specialist Assignments**: Adjust specialist tasks to work with local-only capabilities
3. **Include in Summary**: Note capability limitations in final approval gate
4. **Recommend Manual Setup**: Suggest manual tool configuration for missing capabilities

**REQUIREMENT**: MCP coordination must be attempted. If attempt fails, proceed with local-only capabilities and document limitations.

### Step 2.1: Execution Planning and Validation
**PREREQUISITE**: Step 2 (MCP Coordination) must be attempted
**Orchestration Task**: Validate execution environment and determine strategy

**Execution Environment Validation**:
```
1. **Implementation Directory Check**:
   - Verify 1-main/ directory exists, create if missing
   - Verify tests/ directory exists with proper structure
   - Check feature registry exists and is readable
   - Validate PRP documents are accessible
   - Ensure .claude/config/ directory exists for token configuration

2. **Required File Validation**:
   - Verify feature specifications exist for all planned features
   - Check design review standards files are available
   - Validate validation strategy files exist
   - Ensure test framework configuration is accessible
   - Verify token budget configuration file is readable

3. **Execution Safety**:
   - Use absolute paths for all code and test file operations
   - Validate write permissions for implementation directories
   - Check version control accessibility if required
   - Create backup/recovery points before major operations
   - Log all file operations for debugging and recovery
```

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

**Execute Coordinated RED-GREEN-REFACTOR TDD Workflow**:

**RED PHASE - Coordinated by Code Tester Agent:**
```
Task Assignment: Execute pre-created tests to establish failing baseline
For each test group (Happy Path → Edge Case → Negative Case):
1. Load pre-created test files from /create-prp using flat naming convention
2. Run tests to verify they fail initially (establishing RED state)
3. Analyze and document specific failure reasons and expected behaviors
4. Validate that test failures are for correct reasons (not syntax errors)
5. Report detailed test failure analysis to Orchestration Agent
6. Provide failure context to Code Writer Agent for implementation guidance

RED Phase Success Criteria:
- All tests fail for expected functional reasons (not syntax/setup errors)
- Test failure messages clearly indicate what functionality is missing
- Test infrastructure is working correctly
```

**GREEN PHASE - Coordinated by Code Writer Agent:**
```
Task Assignment: Implement minimal code to make tests pass
For each test group:
1. Receive test failure analysis from Code Tester Agent
2. Implement minimal code to make specific failing tests pass
3. Focus on making tests green with simplest possible solution
4. Coordinate with Code Tester Agent for immediate validation
5. Enter Focused Mode if tests still fail:
   - Analyze specific test failures with Code Tester Agent
   - Implement targeted fixes based on failure analysis
   - Re-run only the failed tests for faster feedback
   - Maximum 3 focused attempts before escalation using token-efficient protocol:
     
   **Token-Efficient Escalation Protocol**:
   - **Attempts 1-3**: Direct implementation attempts with immediate test feedback
   - **After 3 failures**: Single comprehensive analysis gathering:
     * Complete failure analysis and error patterns
     * Test expectations and acceptance criteria review
     * Missing context or requirements identification  
     * Implementation approach validation
   - **Final attempt**: One informed retry with all gathered information
   - **Human escalation**: If final attempt fails, provide complete context:
     * Summary of all attempts and specific failures
     * Analysis of root cause and blocking factors
     * Specific information needed to resolve issue
     * Recommended next steps for human intervention
6. Verify all tests in current group are GREEN before proceeding

GREEN Phase Success Criteria:
- All tests in current group pass consistently
- Implementation is minimal and focused on test requirements
- No regression in previously passing tests
```

**REFACTOR PHASE - Coordinated by Code Writer Agent:**
```
Task Assignment: Improve code quality while maintaining GREEN test status
For each test group:
1. Improve code quality, structure, and maintainability
2. Apply design patterns and best practices from design review standards
3. Ensure code meets all quality standards and conventions
4. Coordinate with Code Tester Agent to verify tests remain GREEN after each refactoring step
5. If any tests fail during refactoring, immediately revert changes
6. Continue refactoring only when tests remain consistently GREEN
7. Document refactoring decisions and trade-offs

REFACTOR Phase Success Criteria:
- Code quality meets design review standards
- All tests remain GREEN throughout refactoring
- Code is maintainable and follows established patterns
- No functionality changes, only quality improvements
```

### Step 5: Sequential Feature Validation Coordination
**Orchestration Task**: Coordinate individual feature validation with progressive integration

**After completing all task-level TDD cycles:**

**Individual Feature Validation** (Isolation Testing):
```
1. **Isolated Feature Testing**:
   - Execute validation strategy from appropriate validation strategy files
   - Run feature tests in isolation using mocks for dependencies
   - Validate feature meets all acceptance criteria independently
   - Verify feature boundary definitions and interface contracts

2. **Dependency Interface Validation**:
   - Test feature interfaces with mock implementations of dependencies
   - Validate data contracts and communication protocols
   - Ensure feature can operate with dependency abstractions
   - Document interface requirements for integration testing
```

**Progressive Integration Testing** (Available Dependencies Only):
```
3. **Available Integration Testing**:
   - Identify which dependent features are already completed
   - Run integration tests only with completed dependencies
   - Use mocks/stubs for incomplete dependencies
   - Document integration test results and pending integrations

4. **Integration Queue Management**:
   - Add feature to integration testing queue for future completed features
   - Schedule re-integration testing when dependencies become available
   - Track integration test debt and completion status
```

**Stakeholder Validation** (for non-code components):
```
If Validation Stakeholder Agent assigned:
- Simulate stakeholder review and approval processes
- Validate deliverable quality against project standards
- Ensure feature meets business requirements and user needs
- Document any issues or recommendations for improvement
```

### Step 6: Progressive Integration Validation Coordination
**Orchestration Task**: Coordinate progressive cross-feature integration as dependencies become available

**After each feature completion:**
```
1. **Immediate Integration Testing**:
   - Code Integration Tester Agent: Run integration tests with all completed features
   - Test newly possible feature combinations and workflows
   - Validate data flow and state consistency across completed feature set
   - Update integration test matrix with new integration coverage

2. **Regression Testing**:
   - Re-run integration tests for previously completed features
   - Ensure new feature doesn't break existing integrations
   - Validate system stability with expanded feature set
   - Update regression test results in feature registry
```

**Dynamic Integration Validation**:
```
3. **Integration Opportunity Detection**:
   - Analyze feature dependency graph for newly satisfied dependencies
   - Identify integration tests that can now run with real implementations
   - Replace mocks with actual implementations where dependencies are complete
   - Schedule integration testing for newly available feature combinations

4. **Business Workflow Testing** (if applicable):
   - Validation Stakeholder Agent: Test business workflows spanning completed features
   - Identify partial workflows that are now testable end-to-end
   - Document workflow coverage and remaining integration gaps
```

**Final System Integration** (All Features Complete):
```
5. **Complete System Integration**:
   - Remove all mocks and test real integrations across entire system
   - Run comprehensive end-to-end integration test suite
   - Validate complete system behavior and performance
   - Generate final integration validation report
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

### Step 8: Progressive Project-Level Testing Coordination
**Orchestration Task**: Coordinate project validation at appropriate milestones

**Continuous Integration Testing** (After Each Feature):
```
1. **Completed Feature Set Testing**:
   - Test workflows that span currently completed features
   - Validate partial system behavior and user workflows
   - Identify integration issues early in development cycle
   - Update project-level test coverage metrics

2. **Workflow Milestone Testing**:
   - Detect when core user workflows become testable end-to-end
   - Run project-level tests for workflows spanning completed features
   - Test partial system functionality that provides user value
   - Document workflow coverage and completion status
```

**Milestone-Based Testing** (At Logical Completion Points):
```
3. **Core Feature Milestone**:
   - Trigger when all core features complete (even if enhancements pending)
   - Run core workflow testing and primary use case validation
   - Test fundamental system functionality and basic user journeys
   - Generate milestone validation report

4. **Feature Category Completion**:
   - Trigger after each major feature category completion
   - Test category-specific workflows and functionality
   - Validate feature category integration and consistency
   - Update overall project completion assessment
```

**Complete System Testing** (All Features Implemented):

**Conditional Test Selection** (Based on Completion Status):
```
5. **Smart Test Execution**:
   - Core workflow tests: Run when core features complete
   - Enhancement tests: Run when enhancement features complete  
   - Integration tests: Run when feature dependencies are satisfied
   - Full system tests: Run only when everything complete
   - Performance tests: Run at milestones and final completion
```

**Test Writer Agent Enhancement** (All Features Complete):
```
6. **Comprehensive Test Coverage**:
   - Code Test Writer Agent: Review all implemented code and interactions
   - Analyze Validation Strategy files for complete coverage requirements
   - Identify gaps in integration testing across full system
   - Create additional tests using flat naming convention for comprehensive coverage
   - Generate final test coverage report
```

**Final System Testing Execution** (Complete Implementation):
```
7. **Complete System Validation**:
   - Code Tester Agent: Execute all tests using validation strategy guidelines
   - Code Integration Tester Agent: Run comprehensive integration test suite
   - Validation Stakeholder Agent: Execute end-to-end user journey validation
   - Validate complete system functionality across all domains
   - Generate final project-level testing report
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