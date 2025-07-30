# /create-prp - Project Requirements and Planning with Multi-Agent Orchestration

**Purpose**: Create comprehensive Project Requirements and Planning with intelligent feature decomposition
**Function**: Orchestration Agent coordinates specialist agents to create systematic implementation guidance

## Files Called
- `CLAUDE.md` - AI agent instructions (read for current configuration)
- `2-docs/planning/*.md` - Planning documents from /init-context specialist analysis
- `PLANNING.md` - Original project configuration
- `.claude/settings.json` - Project configuration and agent assignment rules
- `.claude/state/session.json` - Current project state
- `.claude/utils/mcp_health.py` - MCP health monitoring (optional)

## Files Created
- `2-docs/features/FR-XXX-[feature-name].md` - Individual feature documents for each decomposed feature
- Test files using flat naming convention: `FR-[XXX]_[test_type]_[description].[extension]`
  - Example: `FR-001_task_submit-button.py` for task-level testing
  - Example: `FR-001_feature_user-authentication.py` for feature-level testing  
  - Example: `FR-001_project_end-to-end-workflow.py` for project-level testing

## Files Populated/Updated
- `.claude/state/session.json` - Updated with PRP creation progress and specialist tracking
- `2-docs/PRPs/main-prp.md` - Populated with comprehensive project implementation guide using project-prp-template.md
- `2-docs/features/project-requirements.md` - Populated with detailed project requirements
- `2-docs/features/project-design.md` - Populated with high-level project design
- `2-docs/features/feature-registry.json` - Updated with feature tracking and dependencies
- `2-docs/context/design_review_standards_software.md` - Created/updated with coding standards for software projects
- `2-docs/context/design_review_standards_non_software.md` - Created/updated with standards for non-software projects (if applicable)
- `2-docs/context/validation_strategy_software.md` - Created/updated with validation approach for software projects
- `2-docs/context/validation_strategy_non_software.md` - Created/updated with validation approach for non-software projects (if applicable)

## Usage
```
/create-prp
```

## Orchestration Agent Instructions

### Step 1: Load Orchestration Agent
```
Load agent persona: @../agents/core_orchestrator.md

You are coordinating project requirements and planning creation. Your task:
1. Analyze planning context and determine specialist requirements
2. Delegate requirements analysis and feature decomposition to appropriate specialists
3. Coordinate specialist execution and monitor progress
4. Synthesize specialist outputs into cohesive PRP and feature decomposition
5. Generate comprehensive implementation guidance and test strategies
```

### Step 2: REQUIRED - Capability Analysis and MCP Coordination
**REQUIRED ATTEMPT**: This step must be attempted before proceeding to Step 2.1.

#### Capability Analysis Template (REQUIRED ATTEMPT)
```
**Command**: /create-prp
**Planned Work**: 
- Feature decomposition and requirements analysis
- PRP document creation with implementation guidance
- Test strategy design and file scaffolding
- Feature registry creation and dependency mapping
- Implementation standards and quality framework setup
- Comprehensive validation strategy design

**Required Capabilities Assessment**:
- [ ] file_operations: Reading planning documents, creating feature specifications, PRP documents, and test files
- [ ] web_search: Research best practices for feature implementation and testing (if research level > NONE)
- [ ] version_control: Tracking PRP creation and feature documentation changes
- [ ] testing_framework: Test scaffolding creation and TDD methodology setup

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

### Step 2.1: Initialization Validation and Recovery
**PREREQUISITE**: Step 2 (MCP Coordination) must be attempted
**Orchestration Task**: Validate that init-context completed successfully

**Validation Logic**:
```
Check initialization completion status:
- Verify .claude/state/session.json exists and contains "commands_completed": ["/init-context"]
- Verify all required planning documents exist in 2-docs/planning/
- Verify .claude/settings.json is populated with project configuration
- Verify agent assignment rules are loaded

IF initialization validation FAILS:
  EXECUTE /init-context automatically
  WAIT for init-context completion
  VALIDATE initialization again
  PROCEED to Step 2.2 only after successful initialization

IF initialization validation SUCCEEDS:
  PROCEED directly to Step 2.2
```

### Step 2.2: Context Analysis and Validation
**PREREQUISITE**: Step 2.1 (Initialization Validation) must pass
**Orchestration Task**: Validate project structure and analyze context

**Project Structure Validation**:
```
1. **Essential Directory Check**:
   - Verify 2-docs/features/ exists, create if missing
   - Verify 2-docs/PRPs/ exists, create if missing
   - Verify 2-docs/context/ exists, create if missing
   - Verify 2-docs/validation/ exists, create if missing
   - Verify tests/ directory exists, create if missing

2. **Required File Validation**:
   - Verify all initialization files exist (from Step 2.1)
   - Check feature registry location is writable
   - Validate template file availability
   - Ensure PRP template exists and is accessible
   - Verify token budget configuration is available

3. **Path Safety**:
   - Use absolute paths for all file operations
   - Validate directory permissions before file creation
   - Create missing parent directories as needed
   - Log all directory creation for troubleshooting
```

**Decision Logic**:
```
Read agent assignment rules from .claude/settings.json
Load comprehensive project context:
- Read all planning documents from 2-docs/planning/
- Extract project requirements, goals, and constraints
- Analyze complexity indicators and feature boundaries
- Validate that initialization is complete

Determine specialist needs based on:
- Project type from PLANNING.md and settings.json (software, web, script, marketing, research, design, mixed)
- Technical requirements levels from PLANNING.md (what level of research, risk management, planning depth, etc.)
- Feature decomposition requirements based on project scope and goals
- Available planning documents and their completeness
```

### Step 3: Specialist Agent Assignment and Delegation

#### Always Required Specialists

**Analysis Project Agent** (for additional analysis if needed):
```
Create subagent with persona: @../agents/analysis_project.md

Your specific task: Validate and enhance project analysis for feature decomposition
Your input context:
- Existing project analysis from 2-docs/planning/project_analysis.md
- Project complexity and feature decomposition requirements
- Feature boundary identification needs

Your expected output: Enhanced project analysis focusing on:
- Feature decomposition guidance
- Component boundary identification
- Dependency relationship mapping
- Implementation priority recommendations
```

**Content Creator Agent**:
```
Create subagent with persona: @../agents/content_creator.md

Your specific task: Create project requirements and design documents
Your input context:
- All planning documents from specialist analysis
- Project complexity and scope from analysis
- Feature decomposition strategy

Your expected output:
- 2-docs/features/project-requirements.md (comprehensive requirements)
- 2-docs/features/project-design.md (high-level system design)
- Feature documentation templates and structure
- Implementation guidance for /execute-prp including:
  - TDD methodology details for Code Writer and Code Tester Agents
  - Test file organization and naming conventions
  - Agent coordination patterns and responsibilities
  - Design review standards and coding patterns
```

#### Conditional Specialists Based on Project Type

**If project_type is "software", "web", or "script":**

**Analysis Tech Detector Agent** (if not already completed):
```
Create subagent with persona: @../agents/analysis_tech_detector.md

Your specific task: Validate technology configuration for feature implementation
Your input context:
- Current technology stack configuration
- Feature implementation requirements
- Testing framework needs for feature development

Your expected output: Enhanced technology configuration including:
- Feature-specific technology requirements
- Testing framework configuration for TDD
- Development environment optimization
- Integration testing setup requirements
```

**If Planning Depth Requirements >= "STANDARD" from PLANNING.md:**

**Validation Designer Agent**:
```
Create subagent with persona: @../agents/validation_designer.md

Your specific task: Design comprehensive test strategy for feature decomposition
Your input context:
- Feature decomposition requirements
- Project complexity and quality standards
- Multi-level testing needs (task, feature, project)

Your expected output: Enhanced test strategy including:
- Task-level testing framework (Happy Path, Edge Case, Negative Case)
- Feature-level testing and integration approach
- Project-level testing and validation procedures
- Test scaffolding and templates
- 2-docs/validation/success-criteria.md (if not created during init-context)
```

**If project_type is "marketing", "research", "design", or "mixed":**

**Validation Stakeholder Agent**:
```
Create subagent with persona: @../agents/validation_stakeholder.md

Your specific task: Design stakeholder validation for non-code deliverables
Your input context:
- Project type and non-code component requirements
- Stakeholder needs and business requirements
- Quality standards for non-technical deliverables

Your expected output: Stakeholder validation framework including:
- Non-code component validation procedures
- Business requirement validation processes
- Stakeholder review and approval workflows
- Quality standards for content, design, marketing deliverables
```

### Step 4: Feature Decomposition Analysis and Creation
**Orchestration Task**: Coordinate feature decomposition based on specialist analysis

**Feature Decomposition Decision**:
```
Based on specialist analysis and project scope, determine decomposition approach:

Decomposition Criteria (applies to all project types):
- Default to MORE feature decomposition when in doubt
- If choosing between 2 or 3+ features, always choose the higher number
- Can the project be completed as a single cohesive deliverable? → Consider decomposition anyway for better organization
- Does the project have multiple distinct deliverables or phases? → Feature decomposition required
- Are there clear boundaries between different aspects of the work? → Feature decomposition beneficial
- When uncertain about boundaries, err on the side of more granular features

Feature Decomposition Guidelines for all project types:
- Each feature should represent a complete, testable deliverable
- Features should have clear boundaries and minimal dependencies
- Features can be coding deliverables, content deliverables, design deliverables, or mixed
- Maintain feature focus while enabling integration across all deliverable types
- Consider stakeholder review and approval workflows for each feature type

Examples:
- Coding projects: Features = functional components, APIs, user interfaces
- Marketing projects: Features = campaign phases, content types, channel strategies  
- Research projects: Features = research phases, analysis components, report sections
- Design projects: Features = design systems, user flows, visual components
- Mixed projects: Features = any combination of the above with clear boundaries
```

**If decomposition is needed, coordinate feature creation:**
```
For each identified feature boundary:
1. Use specialist analysis to define feature scope and requirements
2. Create individual feature documents following established template
3. Ensure feature dependencies are properly mapped
4. Validate feature boundaries with specialist recommendations
```

### Step 5: Test Strategy Implementation
**Orchestration Task**: Coordinate comprehensive test strategy creation

**Create executable test files for each task:**
```
Using Validation Designer Agent output and specialist recommendations:

**CRITICAL REQUIREMENT**: Create actual executable test files that will initially fail, not just scaffolding.

**Task-Level Test Creation (Per Individual Task)**:
For each task within each feature:
1. Create executable test file using naming convention: FR-[XXX]_task_[task-description].[extension]
2. Include the test file content directly in the feature document under each task
3. Tests must be syntactically valid and executable
4. Tests must initially fail with meaningful error messages
5. Tests must validate the specific task functionality

**Test Content Requirements**:
- **For coding projects**: Create actual unit tests with appropriate assertions
  ```python
  # Example: FR-001_task_submit-button.py
  def test_submit_button_exists():
      """Test that submit button exists in the interface"""
      # This should fail initially - button not implemented yet
      assert False, "Submit button not implemented - create submit button element"
  
  def test_submit_button_click_functionality():
      """Test that submit button performs expected action when clicked"""
      # This should fail initially - functionality not implemented
      assert False, "Submit button click functionality not implemented"
  ```

- **For non-coding projects**: Create validation checklists with specific criteria
  ```markdown
  # FR-001_task_content-review.md
  ## Content Review Validation Checklist
  - [ ] Brand compliance verified (FAIL: Brand guidelines not applied)
  - [ ] Grammar and style checked (FAIL: Content not reviewed for grammar)
  - [ ] Accuracy validated (FAIL: Fact-checking not completed)
  ```

**Feature Document Integration**:
For each task in FR-XXX-[feature-name].md, include:
```markdown
### Task: [TASK_NAME]
**Description**: [TASK_DESCRIPTION]
**Acceptance Criteria**: [CRITERIA]

**Test File**: FR-XXX_task_[task-name].[ext]
```
[COMPLETE_TEST_FILE_CONTENT]
```

**Test File Creation Process**:
1. **Happy Path Test**: Test the primary success scenario (should fail initially)
2. **Edge Case Test**: Test boundary conditions and edge cases (should fail initially)  
3. **Negative Case Test**: Test error handling and validation (should fail initially)
4. **Copy test content into task section of feature document for human review**
5. **Save separate test file in tests/ directory for execution**

**File Structure Created**:
- `tests/FR-001_task_submit-button.py` - Executable test file
- `2-docs/features/FR-001-user-interface.md` - Feature document containing copy of test for human review
- Both locations must have identical test content

**Validation Requirements**:
- All tests must be executable in their target framework
- All tests must fail initially with descriptive error messages
- Test failure messages must indicate what needs to be implemented
- Tests must be specific to the task, not generic placeholders

**Feature-Level Test Creation**:
Create integration tests using naming convention: FR-[XXX]_feature_[feature-description].[extension]
- Test interactions between tasks within the feature
- Test feature as complete unit of functionality
- Include copy of test in feature document for human review
- Save executable test file in tests/ directory

**Project-Level Test Creation**:
Create end-to-end tests using naming convention: FR-[XXX]_project_[project-description].[extension]
- Test workflows that span multiple features
- Test complete user journeys and system integration
- Include copy of test in feature document for human review
- Save executable test file in tests/ directory
```

### Step 6: Feature Registry and Documentation Creation
**Orchestration Task**: Create comprehensive feature tracking and documentation

**Feature Registry Creation**:
```json
Create 2-docs/features/feature-registry.json with specialist input:
{
  "project_id": "[PROJECT_NAME]",
  "total_features": N,
  "execution_order": ["FR-001", "FR-002", "..."],
  "specialist_inputs": {
    "analysis_project": "Enhanced feature boundary analysis",
    "content_creator": "Requirements and design documentation",
    "validation_designer": "Comprehensive test strategy"
  },
  "features": [
    {
      "id": "FR-001",
      "name": "[Feature Name]",
      "user_story": "[User story text]",
      "dependencies": [],
      "dependents": ["FR-002"],
      "priority": "high",
      "status": "planned",
      "specialist_analysis": "[Key insights from specialists]",
      "file_path": "2-docs/features/FR-001-feature-name.md",
      "test_files": [
        "FR-001_task_submit-button.py",
        "FR-001_feature_task-management.py",
        "FR-001_project_full-workflow.py"
      ]
    }
  ]
}
```

### Step 7: Implementation Standards Creation
**Orchestration Task**: Ensure implementation standards exist for /execute-prp

**Create Required Standards Files**:
```
Determine required standards files based on project type from PLANNING.md with fallback logic:

Project Type Detection with Fallbacks:
1. READ project type from PLANNING.md
2. IF project type detection fails OR project type is undefined:
   DEFAULT to "mixed" (ensures all required files are created)
3. IF PLANNING.md is missing or corrupted:
   DEFAULT to "mixed" and log warning

Project Type Mapping with Guaranteed Coverage:
- "software", "web", "script" → Software-focused project
- "marketing", "research", "design" → Non-software-focused project  
- "mixed" OR detection failure → Both software and non-software components

Required Files Creation Logic (Guaranteed Execution):

IF project type is Software-focused OR Mixed OR detection failed:
- CREATE 2-docs/context/design_review_standards_software.md (from Validation Designer Agent or basic template)
- CREATE 2-docs/context/validation_strategy_software.md (from Validation Designer Agent or basic template)

IF project type is Non-software-focused OR Mixed OR detection failed:
- CREATE 2-docs/context/design_review_standards_non_software.md (from Validation Designer Agent or basic template)
- CREATE 2-docs/context/validation_strategy_non_software.md (from Validation Designer Agent or basic template)

Fallback File Creation (if Validation Designer Agent unavailable):
- Copy from existing templates in 2-docs/context/ directory
- Use basic default templates if no templates exist
- Log which files were created via fallback method

Validation Check:
- VERIFY all required files exist before proceeding to Step 8
- IF any files missing, RETRY creation with basic templates
- These files are REQUIRED by /execute-prp for proper agent coordination
```

### Step 8: Main PRP Creation
**Orchestration Task**: Create comprehensive PRP as orchestrator document

**Main PRP Generation**:
```
Create 2-docs/PRPs/main-prp.md using template: 2-docs/PRPs/templates/project-prp-template.md

Populate template with specialist outputs:

**Basic Project Information**:
- [PROJECT_NAME]: From PLANNING.md
- [PROJECT_DESCRIPTION]: From project analysis
- [PROJECT_ID]: Generate from project name
- [CREATION_DATE]: Current timestamp
- [PROJECT_STATUS]: "In Planning" or "Ready for Implementation"

**Feature Information**:
- [TOTAL_FEATURES]: From feature decomposition analysis
- [CORE_FEATURE_COUNT] and feature lists: From feature registry
- [EXECUTION_ORDER]: From feature dependency analysis
- [PHASE_1_FEATURE_COUNT] etc.: Organize features into implementation phases

**Technical Information**:
- [TECHNOLOGY_STACK]: From Analysis Tech Detector Agent
- [FRONTEND_TECH_STACK], [BACKEND_TECH_STACK], etc.: Break down by component
- [CODING_PATTERNS_REFERENCE]: From Analysis Tech Detector Agent
- [ARCHITECTURAL_DECISION_1] etc.: From architecture vision

**Implementation Guidance for /execute-prp**:
- [TDD_METHODOLOGY_DETAILS]: Standard Red-Green-Refactor workflow
- [RED_PHASE_INSTRUCTIONS]: "Execute pre-created tests (should fail initially)"
- [GREEN_PHASE_INSTRUCTIONS]: "Implement minimal code to make tests pass"
- [REFACTOR_PHASE_INSTRUCTIONS]: "Improve code quality while keeping tests green"
- [FOCUSED_MODE_DETAILS]: "Maximum 3 focused attempts on failed tests before escalation"
- [TEST_FILE_STRUCTURE]: From test strategy (flat naming: FR-XXX_type_description.ext)
- [TEST_NAMING_CONVENTION]: "FR-[XXX]_[test_type]_[description].[extension]"
- [TEST_GROUP_ORGANIZATION]: "Happy Path, Edge Case, Negative Case"

**Agent Coordination Details**:
- [CODE_WRITER_COORDINATION]: "Implements features using TDD methodology with design review standards"
- [CODE_TESTER_COORDINATION]: "Executes tests and validates results with coverage requirements"
- [AGENT_INTEGRATION_PATTERNS]: "Code Writer and Code Tester coordinate through Orchestration Agent"

**Analysis Summaries**:
- [COMPLEXITY_ANALYSIS]: From Analysis Project Agent
- [MARKET_RESEARCH_SUMMARY]: From Content Researcher Agent (if available)
- [TECHNICAL_RESEARCH_SUMMARY]: From Content Researcher Agent (if available)
- [ARCHITECTURE_VISION_SUMMARY]: From planning documents
- [RISK_ASSESSMENT_SUMMARY]: From Analysis Risk Agent (if available)
- [TEST_STRATEGY]: From Validation Designer Agent

For Single-Feature Projects:
- Use same template but populate with single feature information
- Set [TOTAL_FEATURES] to 1
- Populate execution phases with single feature tasks
```

### Step 9: Integration and Quality Control
**Orchestration Integration Tasks**:
1. **Validate Specialist Outputs**: Ensure all requirements and features are complete and consistent
2. **Resolve Conflicts**: Address any contradictions between specialist recommendations
3. **Integration Check**: Verify all specialist outputs work together cohesively
4. **Gap Analysis**: Identify any missing elements in feature decomposition or testing strategy

**Design Review Validation** (using specialist input):
- Interface consistency across features
- Dependency clarity and clean boundaries
- Implementation coherence and patterns
- Naming conventions and standards alignment

**Testing Framework Validation** (using Validation Designer output):
- Test coverage alignment with implementation requirements
- Red-Green-Refactor flow readiness
- Integration test compatibility across features
- Test data consistency and isolation

### Step 10: Comprehensive Summary and Approval Gate
**Generate orchestrated approval gate summary:**

**Specialist Agent Summary**:
- **Analysis Project Agent**: Enhanced project analysis and feature boundary insights (if used)
- **Content Creator Agent**: Requirements and design documentation creation
- **Validation Designer Agent**: Comprehensive test strategy and framework design (if used)
- **Specialist Agents**: Domain-specific analysis and validation procedures (if used)

**Integration Results**:
- Feature breakdown rationale with specialist input
- Execution order and dependencies validated by specialists
- Test strategy overview from validation design
- Next steps for implementation with specialist recommendations

**Quality Assessment**: 
- Project requirements clearly documented with specialist validation
- Feature boundaries logically defined using specialist analysis
- Dependencies properly mapped and validated
- Test strategies comprehensive and specialist-approved
- Integration points documented with specialist oversight
- Ready for systematic implementation

## Success Criteria
- [ ] All specialist outputs successfully integrated
- [ ] Project requirements clearly documented
- [ ] Feature boundaries logically defined
- [ ] Dependencies properly mapped
- [ ] Test strategies comprehensive
- [ ] Integration points documented
- [ ] Ready for systematic implementation

## Recovery Support
If creation is interrupted:
- Check existing feature documents and specialist outputs
- Resume from last completed specialist task
- Validate consistency across existing specialist work
- Update registry and dependencies appropriately

## Python Utilities Used
- Minimal file operations only if agent capabilities insufficient
- Network timeout handling for MCP integration

---
*Generated by Context Engineering v3.0 with Multi-Agent Orchestration*
*Next Step: Review specialist outputs and feature breakdown, then run /execute-prp*