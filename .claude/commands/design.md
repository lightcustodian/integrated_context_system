# Design Command

## Purpose
Create project understanding and basic configuration for coding projects through structured analysis and approval phases

## Key Features
- Three-phase process with two human approval gates
- Comprehensive project analysis and understanding demonstration
- Simplified template processing focused on essential information
- System configuration and finalization
- Support for existing project analysis with --existing flag
- Multiple input methods: direct description, --file, --folder, --existing
- Intelligent external documentation gathering

## Usage
```
/design "Project description"
/design --file path/to/requirements.md
/design --folder path/to/requirements/folder
/design --existing
```

## Inputs
- User project description or requirements document (provided in command)
- `--file <requirements_file>` flag if analyzing single requirements file
- `--folder <folder_path>` flag if analyzing entire folder of requirements
- `--existing` flag if analyzing existing project codebase
- `.claude/templates/DESIGN_PLAN_Template.md` (template structure)

## Implementation

### Phase 1: Input Analysis and Project Understanding

#### Step 1: Input Parsing and Agent Loading
**Purpose**: Parse design command inputs, determine project name, and initialize agents

**Inputs**: 
- Command with one of three formats:
  - `/design "Project description"`
  - `/design --file path/to/requirements.md`
  - `/design --folder path/to/requirements/folder`
  - `/design --existing`

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_command="design", current_step=1, step_name="input_parsing"
2. **Parse Input Method**:
   ```javascript
   const args = process.argv.slice(2);
   let inputMethod, inputSource, projectDescription;
   
   if (args[0] === '--file') {
     inputMethod = 'file';
     inputSource = args[1];
   } else if (args[0] === '--folder') {
     inputMethod = 'folder';
     inputSource = args[1];
   } else if (args[0] === '--existing') {
     inputMethod = 'existing';
     inputSource = process.cwd();
   } else {
     inputMethod = 'direct';
     projectDescription = args[0];
   }
   ```
3. **Determine Project Name**: Use current working directory name
   ```javascript
   const path = require('path');
   const projectName = path.basename(process.cwd());
   ```
4. Load STATE_MANAGER agent
5. Load PROJECT_MANAGER agent  
6. Load CONTENT_SUMMARIZER agent
7. Establish MCP connections for documentation and research capabilities
8. Request: "Need: file_operations, web_research, documentation_tools"

**Outputs**: 
- Input method and source identified
- Project name determined from current directory
- Active agents ready for project analysis
- MCP connections established
- Updated `.claude/state/session.json` with input method and project name

**Success Criteria**: 
- Input method correctly parsed and validated
- Project name extracted from current directory
- All required agents loaded successfully
- MCP connections established for research
- System ready for project analysis

#### Step 2: Documentation Review
**Purpose**: Review internal and external documentation to establish context

**Inputs**: 
- docs/internal/ directory contents
- docs/external/ directory contents

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=2, step_name="documentation_review"
2. **Internal Documentation**: 
   - Fully ingest all files in docs/internal/
   - Load existing_project.md if present (from --existing flag analysis)
3. **External Documentation**:
   - Read docs/external/.index.md for documentation overview
   - Identify relevant external docs based on project context
   - Note available documentation for selective loading
4. Document available context and knowledge base

**Outputs**: 
- Internal documentation fully loaded
- External documentation index reviewed
- Context established for project analysis

**Success Criteria**: 
- All internal documentation ingested
- External documentation cataloged
- Context base established

#### Step 3: Input Analysis and Document Processing
**Purpose**: Process user input based on parsed input method and extract project requirements

**Inputs**: 
- Input method and source from Step 1 parsing
- Project name from current directory

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=3, step_name="input_analysis"
2. **Process based on inputMethod from Step 1**:
   ```javascript
   switch (inputMethod) {
     case 'direct':
       // Process user-provided project description
       projectDescription = args[0];
       break;
       
     case 'file':
       // Read and analyze single requirements file
       const fileContent = await fs.readFile(inputSource, 'utf8');
       projectDescription = fileContent;
       break;
       
     case 'folder':
       // Read all files in specified folder
       const folderContents = await readFolderRecursively(inputSource);
       // Apply 1000-line limit per file
       // CONTENT_SUMMARIZER: Create summaries for files >1000 lines
       projectDescription = combineAllRequirements(folderContents);
       break;
       
     case 'existing':
       // Copy project_summary.py and .project_summary.config.json from .claude/utils/ to root
       // Execute: python ./project_summary.py
       // Review project_summary.json output
       // Identify and read relevant project files based on relevance scoring
       const existingAnalysis = await analyzeExistingProject();
       projectDescription = existingAnalysis.summary;
       break;
   }
   ```
3. Store extracted project description and requirements
   - **CONTENT_SUMMARIZER**: Create docs/internal/existing_project.md with comprehensive analysis
6. Extract key project information and requirements
7. Identify project type, scope, and technology stack

**Outputs**: 
- Processed requirements documentation
- existing_project.md (if --existing flag used)
- Project structure understanding
- Updated state with analysis results

**Success Criteria**: 
- All input sources processed appropriately
- Key requirements extracted and documented
- Project structure and technology understood
- Large files handled with 1000-line splitting

#### Step 4: Comprehensive Project Analysis and Understanding Demonstration
**Purpose**: Analyze project comprehensively and demonstrate understanding to user

**Inputs**: 
- Processed requirements from Step 3
- Project scope and goals
- Documentation context from Step 2

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=4, step_name="project_analysis"
2. Analyze project complexity and requirements
3. Demonstrate understanding of project goals and scope
4. Ask clarifying questions about ambiguous requirements
5. Confirm project is coding-focused and suitable for prototype-based development
6. Identify initial technology stack considerations

**Outputs**: 
- Comprehensive project analysis
- Clarification questions for user
- Updated state with analysis results

**Success Criteria**: 
- Project scope clearly understood and coding-focused
- All requirements clarified with user
- Project confirmed suitable for prototype-based development
- Technology considerations identified

#### Step 5: Phase 1 Approval
**Purpose**: Get human approval before proceeding to template processing

**Inputs**: 
- Project analysis from Steps 1-4
- User clarifications and feedback

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=5, step_name="phase_1_approval"
2. Generate `response_[date]_[time]_design_phase1.md` with:
   - Project analysis summary
   - Requirements understanding
   - Technology considerations
   - Phase 1 approval request
3. **STOP** - Wait for human approval in `approval_[date]_[time]_design_phase1.md`

**Outputs**: 
- `response_[date]_[time]_design_phase1.md` for human review
- **PAUSE** - Phase 2 does not begin until Phase 1 approved by user

**Success Criteria**: 
- Human approves project analysis and understanding
- All clarifications resolved
- Permission granted to proceed to Phase 2

### Phase 2: Template Processing and File Generation

#### Step 6: External Documentation Gathering
**Purpose**: Gather relevant external documentation based on project requirements

**Inputs**: 
- Approved project analysis from Phase 1
- Technology stack and integration requirements

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=6, step_name="external_documentation"
2. **CONTENT_SUMMARIZER**: Analyze project for documentation needs:
   - Technologies mentioned → fetch framework/library docs
   - Integration points → fetch API documentation
   - Business concepts → research and summarize best practices
   - Security features → fetch security guidelines
3. **Documentation Fetching Process**:
   - Use MCP web research capabilities
   - Apply 1000-line limit per document
   - Split large docs into focused topic files
   - Create executive summaries for all fetched docs
4. **Organization**:
   - Store in docs/external/technologies/, docs/external/concepts/, docs/external/apis/
   - Update docs/external/.index.md with 2-3 line summaries

**Outputs**: 
- External documentation in docs/external/ organized by category
- Executive summaries for all documentation
- Updated .index.md with documentation catalog

**Success Criteria**: 
- All relevant external documentation gathered
- Documentation properly categorized and summarized
- 1000-line limit enforced with appropriate splitting
- Index file updated with all documentation

#### Step 7: Template Processing and File Generation
**Purpose**: Create DESIGN_PLAN.md using simplified template focused on essential information

**Inputs**: 
- Approved project analysis from Phase 1
- `.claude/templates/DESIGN_PLAN_Template.md`
- External documentation from Step 6
- Default technical requirements

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=7, step_name="template_processing"
2. Load simplified DESIGN_PLAN_Template.md from .claude/templates/
3. Apply Smart Defaults based on project analysis:
   - Analyze keywords and project type
   - Set appropriate technical requirement levels
   - Adjust defaults based on project complexity
4. Create DESIGN_PLAN.md with essential information:
   - **Tech Stack**: Complete technology stack selection
   - **Basic Architecture**: High-level system architecture
   - Project goals and success criteria
   - Smart default technical requirements applied
   - Cross-references to external documentation
5. Focus on information needed by other commands

**Outputs**: 
- `DESIGN_PLAN.md` in project root with essential project configuration
- Updated state with template processing completion

**Success Criteria**: 
- DESIGN_PLAN.md contains Tech Stack and Basic Architecture
- Smart defaults appropriately applied
- External documentation referenced
- Cross-references properly established

#### Step 8: Phase 2 Approval
**Purpose**: Get human approval of DESIGN_PLAN.md before system finalization

**Inputs**: 
- Completed `DESIGN_PLAN.md` from Step 7
- Template processing results
- External documentation gathered

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=8, step_name="phase_2_approval"
2. Generate `response_[date]_[time]_design_phase2.md` with:
   - DESIGN_PLAN.md summary
   - Tech stack and architecture decisions
   - External documentation summary
   - Phase 2 approval request
3. **STOP** - Wait for human approval in `approval_[date]_[time]_design_phase2.md`

**Outputs**: 
- `response_[date]_[time]_design_phase2.md` for human review
- **PAUSE** - Phase 3 does not begin until Phase 2 approved by user

**Success Criteria**: 
- Human approves DESIGN_PLAN.md content
- Tech stack and architecture decisions validated
- External documentation approved
- Permission granted to proceed to Phase 3

### Phase 3: System Configuration and Finalization

#### Step 9: System Configuration and Finalization
**Purpose**: Initialize project state management, finalize system setup, and create Kanban project

**Inputs**: 
- Approved `DESIGN_PLAN.md` from Phase 2
- Project technology stack and requirements
- System configuration needs

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=9, step_name="system_finalization"
2. Initialize project state management structure
3. Configure MCP capabilities based on approved technology stack
4. Set up project structure expectations
5. Create docs/internal/ and docs/external/ if not existing
6. **PROJECT CREATION**: Call unified project creation to establish project state
   ```javascript
   // Use centralized project creation utility (single source of truth)
   const { createProject } = require('../utils/project-create');
   
   console.log(`📋 Calling unified project creation for: ${projectName}`);
   
   try {
     // Call unified project creation - handles Kanban + session state
     const project = await createProject(projectName, projectDescription, 'hybrid');
     
     if (project) {
       console.log(`✅ Project ready: ${projectName}`);
       console.log(`📋 Project ID: ${project.id}`);
       console.log(`🌐 Kanban Board: http://localhost:3011`);
     } else {
       console.log(`⚠️ Kanban system unavailable - continuing with local state only`);
     }
   } catch (error) {
     console.error(`❌ Project creation failed: ${error.message}`);
     console.log(`⚠️ Continuing without Kanban integration`);
   }
   ```
7. Finalize system configuration
8. Generate final approval file for command completion

**Outputs**: 
- `.claude/state/session.json` fully initialized with project context and Kanban integration
- Kanban project created and linked to session
- System configured for approved technology stack
- Directory structure established
- `response_[date]_[time]_design_final.md` for human approval

**Success Criteria**: 
- State management fully initialized
- Kanban project created and linked
- MCP capabilities configured for technology stack
- Documentation directories established
- System ready for plan command
- Human approves final configuration

## Outputs
- `DESIGN_PLAN.md` with complete project configuration including Tech Stack and Basic Architecture
- `docs/internal/existing_project.md` (if --existing flag used)
- `docs/external/` populated with relevant documentation
- `.claude/state/session.json` fully initialized with project context
- Three approval files: phase1, phase2, and final
- System configured and ready for plan command

## Success Criteria
- All three phases completed with human approval at gates
- Project scope clearly defined and confirmed coding-focused
- Technology stack and basic architecture approved by user
- External documentation appropriately gathered and organized
- DESIGN_PLAN.md contains essential information for other commands
- System properly initialized and ready for planning phase
- Two formal approval points successfully navigated

## Recovery Support
If command interrupted:
- Check `.claude/state/session.json` for last completed step (1-9)
- Resume from interrupted step with STATE_MANAGER context restoration
- Validate previous work before proceeding:
  - Step 1: Verify agent loading and MCP connections
  - Step 2: Check documentation review status
  - Step 3: Review input analysis and existing project processing
  - Step 4: Check project analysis completeness
  - Step 5: Review Phase 1 approval status
  - Step 6: Check external documentation gathering progress
  - Step 7: Verify DESIGN_PLAN.md creation
  - Step 8: Review Phase 2 approval status
  - Step 9: Check system finalization status
- Re-load required agents and restore project context
- Continue from exact interruption point without repeating completed work