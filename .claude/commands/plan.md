# Plan Command

## Purpose
Break project into usable prototypes and configure system for implementation

## Key Features
- PROJECT_MANAGER coordination and MCP integration setup
- Planning document creation when technical requirements exceed defaults
- State management configuration and progress tracking setup
- Simplified project decomposition into independently deployable prototypes
- Command approval with human review gate

## Inputs
- `DESIGN_PLAN.md` from completed design command (project root)
- `.claude/state/session.json` with design command completion status
- Technical requirements settings from DESIGN_PLAN.md

## Implementation

### Step 1: Load Project Manager
**Purpose**: Initialize PROJECT_MANAGER agent and establish project context

**Inputs**: 
- `DESIGN_PLAN.md` from project root
- `.claude/state/session.json` for previous command status

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_command="plan", current_step=1, step_name="load_project_manager"
2. Load STATE_MANAGER agent
3. Load PROJECT_MANAGER agent
4. Review DESIGN_PLAN.md for project context, technology stack, and requirements
5. Initialize planning session with project parameters
6. Validate design command completion

**Outputs**: 
- PROJECT_MANAGER agent loaded with project context
- Updated `.claude/state/session.json` with step progress
- Planning session initialized

**Success Criteria**: 
- PROJECT_MANAGER agent successfully loaded
- DESIGN_PLAN.md reviewed and understood
- Project context established for planning
- State properly updated

### Step 2: Documentation Review
**Purpose**: Review internal and external documentation to establish context

**Inputs**: 
- docs/internal/ directory contents
- docs/external/ directory contents

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=2, step_name="documentation_review"
2. **Internal Documentation**: 
   - Fully ingest all files in docs/internal/
   - Load existing_project.md if present (for existing projects)
3. **External Documentation**:
   - Read docs/external/.index.md for documentation overview
   - Selectively load relevant external docs based on current planning needs
4. Document available context and relevant external resources

**Outputs**: 
- Internal documentation fully loaded
- Relevant external documentation identified
- Context established for planning phase

**Success Criteria**: 
- All internal documentation ingested
- Relevant external documentation cataloged
- Context base established for planning

### Step 3: Capability Analysis and MCP Integration
**Purpose**: Analyze required external tool capabilities and establish MCP connections

**Inputs**: 
- Technology stack from DESIGN_PLAN.md
- Project requirements and complexity

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=3, step_name="capability_analysis_mcp"
2. Analyze required capabilities based on technology stack
3. Request capabilities: "Need: file_operations, version_control, testing_framework, [others based on stack]"
4. Establish MCP connections for required tools
5. Set up fallback chains for critical tools
6. Validate all required capabilities are available

**Outputs**: 
- MCP connections established for project needs
- Capability availability confirmed
- Fallback procedures configured
- Updated state with MCP status

**Success Criteria**: 
- All required MCP capabilities successfully connected
- Fallback chains configured for critical tools
- No blocking capability failures
- Integration ready for implementation phase

### Step 4: Create Planning Documents (if necessary)
**Purpose**: Generate planning documents when technical requirements exceed default levels

**Inputs**: 
- Technical requirements settings from DESIGN_PLAN.md
- Project technology stack and architecture decisions

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=4, step_name="create_planning_documents"
2. Check technical requirement levels from DESIGN_PLAN.md:
   - If Technical Research = MINIMAL: Create `.claude/planning/technical-requirements.md`
   - If System Architecture = MINIMAL: Create `.claude/planning/system-architecture.md`
   - If Market Research > NONE: Create `.claude/planning/competitive-analysis.md`
3. Use templates from `.claude/planning/templates/` if they exist
4. Skip document creation if all requirements at NONE/default levels
5. Generate only necessary documents based on actual requirements

**Outputs**: 
- `.claude/planning/technical-requirements.md` (if Technical Research = MINIMAL)
- `.claude/planning/system-architecture.md` (if System Architecture = MINIMAL)
- `.claude/planning/competitive-analysis.md` (if Market Research > NONE)
- Additional planning docs as required by settings in `.claude/planning/`
- Updated state with document creation status

**Success Criteria**: 
- Required planning documents created based on technical requirements
- Documents contain relevant information for implementation
- No unnecessary documents generated
- All created documents properly stored in .claude/planning/

### Step 5: Configure State Management and Progress Tracking
**Purpose**: Set up comprehensive state management and progress tracking systems

**Inputs**: 
- Project structure and requirements from DESIGN_PLAN.md
- Existing state file from design command

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=5, step_name="configure_state_management"
2. Initialize detailed state tracking structure for implementation
3. Set up multi-level tracking (command/step/prototype/feature/task)
4. Configure backup and recovery procedures
5. Validate state file integrity and structure
6. Prepare state management for prototype tracking

**Outputs**: 
- Enhanced `.claude/state/session.json` with implementation tracking structure
- Backup procedures configured
- Recovery mechanisms validated
- State management ready for implementation phase

**Success Criteria**: 
- State management fully configured for multi-level tracking
- Backup and recovery procedures operational
- State file structure supports implementation workflow
- All tracking levels properly initialized

### Step 6: Simplified Project Decomposition into 1 or more Prototypes
**Purpose**: Break project into independently deployable prototypes with detailed capabilities

**Inputs**: 
- Project scope and goals from DESIGN_PLAN.md
- Technology stack and architecture decisions
- Success criteria and requirements

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=6, step_name="prototype_decomposition"
2. Analyze project scope for logical prototype boundaries
3. Create 1 or more prototypes, each must be:
   - Independently testable and deployable
   - Provides tangible user value
   - Can function as standalone system
4. **Provide details of capabilities/features each Prototype will contain**:
   - List specific features and functionality
   - Define user-facing capabilities
   - Specify technical components
5. Ensure **combination of Prototypes fulfills complete project scope**
6. Apply "When in doubt, split" rule for simpler prototypes
7. Define prototype sequence and minimal dependencies

**Outputs**: 
- Prototype breakdown with detailed capabilities for each prototype
- Feature lists and technical specifications per prototype
- Prototype sequence and dependency mapping
- Updated state with prototype structure
- Validation that combined prototypes fulfill project scope

**Success Criteria**: 
- Project broken into logical, deployable prototypes
- Each prototype has detailed capabilities and features defined
- Combined prototypes fulfill complete project scope
- Each prototype independently valuable and testable
- Prototype sequence supports incremental delivery

### Step 7: Command Approval: Response File Generation
**Purpose**: Generate approval file and wait for human approval before proceeding

**Inputs**: 
- Complete prototype breakdown from Step 6
- MCP integration status from Step 3
- Created planning documents from Step 4
- State management configuration from Step 5

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=7, step_name="command_approval"
2. Generate `response_[date]_[time]_plan.md` including:
   - Prototype breakdown with detailed capabilities
   - Technology stack configuration summary
   - MCP capabilities established
   - Planning documents created
   - Next steps and recommendations
3. **Command does not end until approved by User**
4. Wait for `approval_[date]_[time]_plan.md` from human

**Outputs**: 
- `response_[date]_[time]_plan.md` for human review
- **STOP** - Command paused until human approval received
- State updated with approval pending status

**Success Criteria**: 
- Response file generated with complete planning summary
- Human reviews and approves prototype breakdown
- All planning elements validated by user
- Permission granted to proceed to implementation
- State properly reflects approval status

## Outputs
- Updated `.claude/state/session.json` with complete prototype structure
- Planning documents in `.claude/planning/` (when technical requirements > defaults)
- MCP capability connections established and validated
- `response_[date]_[time]_plan.md` for human approval
- System configured and ready for implementation phase

## Success Criteria
- Project successfully broken into logical, deployable prototypes
- Each prototype has detailed capabilities and provides independent value
- Combined prototypes fulfill complete project scope
- MCP integration functional for all required capabilities
- State management configured for multi-level tracking
- Planning documents created as required by technical settings
- Human approves complete planning approach and prototype breakdown
- System ready for implement command execution

## Recovery Support
If command interrupted:
- Check `.claude/state/session.json` for last completed step (1-7)
- Resume from interrupted step with STATE_MANAGER context restoration
- Validate previous work before proceeding:
  - Step 1: Verify PROJECT_MANAGER agent loading
  - Step 2: Check documentation review status
  - Step 3: Check MCP capability connections and re-establish if needed
  - Step 4: Validate planning documents in `.claude/planning/`
  - Step 5: Confirm state management configuration
  - Step 6: Review prototype breakdown completeness
  - Step 7: Check approval file generation status
- Re-load required agents and MCP connections as needed
- Continue from exact interruption point without repeating completed work