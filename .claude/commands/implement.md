# Implement Command

## Purpose
Build working prototypes using TDD methodology

## Usage
```bash
.claude implement [prototype_name]
```

## Prerequisites
- Plan command completed
- Prototypes defined in state

## Default Behavior
Focus on next incomplete prototype if no prototype_name specified

## Implementation Steps

### Step 1: Load Agents
**State Update**: Update .claude/state/session.json:
- current_command: "implement"
- current_step: 1
- step_name: "load_agents"
- last_updated: [TIMESTAMP]

**Implementation**:
1. Load STATE_MANAGER agent
2. Load PROJECT_MANAGER agent
3. Load CODER agent
4. Load TESTER agent
5. Confirm all agents are ready

### Step 2: Documentation Review
**State Update**: Update .claude/state/session.json:
- current_step: 2
- step_name: "documentation_review"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Internal Documentation**: 
   - Fully ingest all files in docs/internal/
   - Load existing_project.md if present
2. **External Documentation**:
   - Read docs/external/.index.md for documentation overview
   - Selectively load relevant external docs based on prototype needs
   - Focus on technology-specific docs for current prototype
3. Document available context and relevant resources

### Step 3: MCP Integration
**State Update**: Update .claude/state/session.json:
- current_step: 3
- step_name: "mcp_integration"
- last_updated: [TIMESTAMP]

**Implementation**:
1. Request capabilities based on current prototype needs
2. Typical request: "Need: file_operations, version_control, testing_framework"
3. Add specific capabilities for prototype (e.g., database, web_framework)
4. **For Web Projects**: Add "web_automation" capability for Puppeteer validation
5. Confirm all required tools are available

### Step 4: Prototype Analysis
**State Update**: Update .claude/state/session.json:
- current_step: 4
- step_name: "prototype_analysis"
- current_prototype: [PROTOTYPE_NAME]
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Create Requirements Document**: Detailed requirements for this prototype
2. **Create Design Document**: Technical design and architecture
3. **Create Features List**: Break prototype into implementable features
   - Each feature gets own task list
   - Each feature gets own test suite
   - Features are sequential and build on each other

### Step 5: Coding Loop (Per Feature)
**State Update**: Update .claude/state/session.json:
- current_step: 5
- step_name: "coding_loop"
- current_feature: [FEATURE_NAME]
- current_task: [TASK_NAME]
- last_updated: [TIMESTAMP]

**Implementation**:
For each feature in features list:

#### TDD Red-Green-Refactor Cycle:
1. **Git Safety**: Commit current state before starting feature work
   - Run `git status` and `git diff` to understand current state
   - Create commit: "[Implement]: Starting [FEATURE_NAME] - Pre-development checkpoint"
2. **TESTER**: Create tests for current task (RED phase)
3. **Git Checkpoint**: Commit test creation
   - Create commit: "[Implement]: [FEATURE_NAME] tests - Test baseline created"
4. **CODER**: Write minimal code to pass tests (GREEN phase)
5. **TESTER**: Run tests - if fail, return to CODER (max 3 attempts)
6. **Git Success**: Commit working feature implementation
   - Create commit: "[Implement]: [FEATURE_NAME] - Working implementation with passing tests"
7. **CODER**: Refactor code while maintaining test success (REFACTOR phase)
8. **Git Refactor**: Commit refactored code
   - Create commit: "[Implement]: [FEATURE_NAME] - Refactored implementation"
9. **Mark Task Complete**: Update state with task completion

#### Error Handling Per Task:
- Attempt 1: Try different approach
- Attempt 2: Research solution using web_search capability
- Attempt 3: Simplify requirements or break into smaller tasks
- Failure: Present to human with context and recommendations

### Step 6: Feature Validation
**State Update**: Update .claude/state/session.json:
- current_step: 6
- step_name: "feature_validation"
- current_feature: [FEATURE_NAME]
- last_updated: [TIMESTAMP]

**Implementation**:
1. **TESTER**: Run complete feature test suite
2. **TESTER**: Validate feature integration with existing code
3. **Web Validation** (for web projects):
   - Launch browser to target URL (typically `http://localhost:[port]`)
   - Capture screenshot for visual verification
   - Check browser console for JavaScript errors
   - Verify key page elements are present and rendered
   - Test basic user interactions (clicks, form inputs)
   - Document validation results
4. **TESTER**: Perform basic user acceptance testing
5. Mark feature complete in state

### Step 7: Prototype Validation
**Purpose**: Validate prototype completeness, deployability, and quality before marking complete

**Inputs**: 
- Completed prototype with all features implemented
- Test results from all feature validations
- Implementation documentation

**State Update**: Update .claude/state/session.json:
- current_step: 7
- step_name: "prototype_validation"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **TESTER**: Run full prototype test suite
2. **TESTER**: Validate all features work together
3. **Comprehensive Web Validation** (for web projects):
   - Launch full application in browser
   - Test complete user workflows end-to-end
   - Verify all features work together in browser environment
   - Check for responsive design on different screen sizes (if applicable)
   - Validate error handling and edge cases in browser
   - Capture comprehensive screenshots and console logs
   - Document complete validation results
4. **REVIEWER** (important agent addition): 
   - Critical review of implementation
   - Code quality assessment
   - Architectural compliance check
   - Security and performance review
   - Review web validation results (for web projects)
5. **TESTER**: Create deployment test to verify prototype runs standalone
6. **Git Final**: Commit completed prototype
   - Create commit: "[Implement]: [PROTOTYPE_NAME] - Complete working prototype"
7. Mark prototype complete in state

### Step 8: Iteration Loop (if not approved)
**State Update**: Update .claude/state/session.json:
- current_step: 8
- step_name: "iteration_loop"
- last_updated: [TIMESTAMP]

**Implementation**:
1. Generate response_[date]_[time]_implement.md with:
   - Prototype implementation summary
   - Test results and coverage
   - REVIEWER feedback and recommendations
   - Request for approval or feedback
2. If human requests changes:
   - Return to Step 5 for specific features
   - Apply requested modifications
   - Re-run validation (Step 7)
3. If approved:
   - Mark prototype complete
   - Check for next prototype to implement

## Inputs
- DESIGN_PLAN.md for technology stack and architecture
- Prototype definitions from plan command
- .claude/state/session.json for current progress
- Test frameworks and dependencies

## Outputs
- Working prototype code
- Complete test suite
- Implementation documentation
- Updated .claude/state/session.json with completion status
- response_[date]_[time]_implement.md for human approval

## Success Criteria
- All tests pass (100% of defined tests)
- Prototype runs independently
- Git commits created at all checkpoints (minimum 4 commits per feature)
- Web validation completed successfully (for web projects):
  - Page loads without critical errors
  - Core functionality is interactive and responsive
  - Visual elements render correctly
  - User workflows complete successfully
- REVIEWER approval received
- Human approval received for prototype
- State properly tracks all progress

## Recovery Support
If command interrupted:
- Check `.claude/state/session.json` for last completed step (1-8)
- Resume from interrupted step with STATE_MANAGER context restoration
- Validate previous work before proceeding:
  - Step 1: Verify agent loading
  - Step 2: Check documentation review status
  - Step 3: Re-establish MCP connections if needed
  - Step 4: Review prototype analysis completeness
  - Step 5: Check current feature/task position in TDD cycle
  - Step 6: Verify feature validation status
  - Step 7: Check prototype validation progress
  - Step 8: Review iteration status and human feedback
- **TDD Recovery**: Resume from exact position in Red-Green-Refactor cycle
- **Feature Recovery**: Continue from last incomplete feature
- Re-load required agents and restore code context
- Continue from exact interruption point without losing progress