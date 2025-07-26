# /init-context - Project Initialization with Multi-Agent Orchestration

**Purpose**: Initialize Context Engineering project structure with comprehensive planning
**Function**: Orchestration Agent coordinates specialist agents to create systematic project setup

## Files Called
- `PLANNING.md` - User-created project configuration (must exist)
- `CLAUDE.md` - AI agent instructions (read for current configuration)
- `.claude/settings.json` - Project configuration and agent assignment rules (read for current settings)
- `2-docs/planning/templates/*.md` - Planning document templates
- `.claude/utils/mcp_health.py` - MCP health monitoring (optional)

## Files Created
- `1-main/` directory - Created if doesn't exist for child project implementation

## Files Populated/Updated
- `.claude/settings.json` - Populated with project-specific configuration and agent assignment rules
- `.claude/state/session.json` - Updated with initialization progress and specialist tracking
- `CLAUDE.md` - Populated with project-specific AI agent instructions and context
- `2-docs/planning/*.md` - Populated with specialist analysis results:
  - `project-analysis.md` - From Analysis Project Agent
  - `market-research.md` - From Content Researcher Agent (if assigned)
  - `technical-research.md` - From Content Researcher Agent (if assigned)  
  - `architecture-vision.md` - From Orchestration synthesis
  - `risk-assessment.md` - From Analysis Risk Agent (if assigned)
- `2-docs/validation/success-criteria.md` - Populated with project-specific success criteria

## Usage
```
/init-context [--tech-stack=python|javascript|typescript] [--project-type=software|marketing|research|design|content]
```

## Orchestration Agent Instructions

### Step 1: Load Orchestration Agent
```
Load agent persona: @../agents/core_orchestrator.md

You are coordinating project initialization. Your task:
1. Analyze PLANNING.md configuration and determine specialist requirements
2. Delegate planning and setup tasks to appropriate specialist agents
3. Coordinate specialist execution and monitor progress
4. Synthesize specialist outputs into cohesive project initialization
5. Generate project structure, configuration files, and templates
```

### Step 2: Project Configuration Analysis
**Orchestration Task**: Analyze PLANNING.md to determine specialist agent requirements

**Decision Logic**:
```
Read PLANNING.md and determine:
- Project type (software, web, script, marketing, research, design, mixed)
- Complexity level (simple, medium, complex) 
- Individual technical requirement levels:
  - Market & Technical Research Requirements (NONE, MINIMAL, STANDARD, COMPREHENSIVE)
  - Risk Management Requirements (NONE, MINIMAL, STANDARD, COMPREHENSIVE)
  - Planning Depth Requirements (NONE, MINIMAL, STANDARD, COMPREHENSIVE)
  - Visual Documentation Requirements (NONE, MINIMAL, STANDARD, COMPREHENSIVE)
  - User Story Development Requirements (NONE, MINIMAL, STANDARD, COMPREHENSIVE)
  - API Specification Requirements (NONE, MINIMAL, STANDARD, COMPREHENSIVE)
- Technology stack preferences
- Quality standards and validation requirements

If PLANNING.md doesn't exist:
  Create from PLANNING_Template.md and request user completion
```

### Step 3: Specialist Agent Assignment and Delegation

**Read Agent Assignment Rules**: Load assignment configuration from `.claude/settings.json`

#### Always Required Specialists

**Analysis Project Agent**:
```
Create subagent with persona: @../agents/analysis_project.md

Your specific task: Comprehensive project analysis and scope definition
Your input context: 
- PLANNING.md configuration and requirements
- Project complexity and type settings
- Quality standards and constraints

Your expected output: 2-docs/planning/project_analysis.md
- Use template: 2-docs/planning/templates/project_analysis_template.md
- Convert template to planning document by removing "_template" from filename and filling with project-specific content
- Fill with project-specific analysis and findings
- Focus on scope, stakeholders, feasibility, and requirements
```

**Content Creator Agent**:
```
Create subagent with persona: @../agents/content_creator.md

Your specific task: Generate project documentation structure and CLAUDE.md
Your input context:
- Project type, complexity, and technology stack
- Planning analysis results from Analysis Project Agent
- Template system requirements

Your expected output: 
- CLAUDE.md with comprehensive agent instructions
- Documentation structure and README framework
- Project-specific content guidelines
```

#### Conditional Specialists Based on Project Type

**If project_type includes "software" OR "web" OR "script":**

**Analysis Tech Detector Agent**:
```
Create subagent with persona: @../agents/analysis_tech_detector.md

Your specific task: Detect and configure technology stack
Your input context:
- Existing project files and structure
- Technology preferences from PLANNING.md
- Project requirements and constraints

Your expected output: Technology configuration including:
- Primary language and framework detection
- Testing framework setup
- Development tools and dependencies
- Project structure recommendations
```

**If project_type includes "marketing":**

**Specialist Marketing Agent**:
```
Create subagent with persona: @../agents/specialist_marketing.md

Your specific task: Marketing-specific planning and requirements analysis
Your input context:
- Project goals and target market from PLANNING.md
- Brand requirements and positioning needs
- Marketing objectives and constraints

Your expected output: Marketing-specific sections in planning documents:
- Market analysis and competitive landscape
- Target audience and positioning strategy
- Marketing objectives and success metrics
```

**If project_type includes "design":**

**Specialist Design Agent**:
```
Create subagent with persona: @../agents/specialist_design.md

Your specific task: Design requirements and user experience planning
Your input context:
- User requirements and design standards
- Accessibility needs and brand guidelines
- Technical constraints and platform requirements

Your expected output: Design-specific sections in planning documents:
- User experience requirements and guidelines
- Design system needs and specifications
- Accessibility and usability standards
```

#### Conditional Specialists Based on Technical Requirements

**If Market & Technical Research Requirements >= "MINIMAL":**

**Content Researcher Agent**:
```
Create subagent with persona: @../agents/content_researcher.md

Your specific task: Market and technical research for project context
Your input context:
- Project type, industry, and technology stack
- Research scope from project analysis
- Available MCP servers for enhanced research

Your expected output:
- 2-docs/planning/market_research.md (use template: 2-docs/planning/templates/market_research_template.md)
- 2-docs/planning/technical_research.md (use template: 2-docs/planning/templates/technical_research_template.md)
- Convert templates to planning documents by removing "_template" from filename and filling with project-specific content
- Research-based recommendations and insights
```

**If Risk Management Requirements >= "MINIMAL":**

**Analysis Risk Agent**:
```
Create subagent with persona: @../agents/analysis_risk.md

Your specific task: Comprehensive risk assessment and mitigation planning
Your input context:
- Project analysis results and complexity factors
- Market and technical research findings
- Project constraints and timeline

Your expected output: 2-docs/planning/risk_assessment.md
- Use template: 2-docs/planning/templates/risk_assessment_template.md
- Convert template to planning document by removing "_template" from filename and filling with project-specific content
- Identify risks across technical, business, and operational domains
- Provide specific mitigation strategies and contingency plans
```

**If Planning Depth Requirements >= "STANDARD":**

**Validation Designer Agent**:
```
Create subagent with persona: @../agents/validation_designer.md

Your specific task: Design comprehensive validation framework for project
Your input context:
- Project type, complexity, and quality requirements
- Specialist analysis and research results
- Validation needs across all project domains

Your expected output:
- 2-docs/context/design_review_standards_software.md (for software/web/script projects)
- 2-docs/context/design_review_standards_non_software.md (for non-software projects)
- 2-docs/context/validation_strategy_template.md
- 2-docs/context/validation_adaptations.md
- 2-docs/validation/success_criteria.md
```

### Step 4: Architecture and Vision Planning
**Orchestration Task**: Create architecture vision based on specialist outputs

**After specialist analysis is complete:**
```
Using integrated outputs from Analysis Project Agent and other specialists:
1. Synthesize high-level system architecture approach
2. Create 2-docs/planning/architecture_vision.md
3. Include integration points and design principles  
4. Document technology decisions and rationale
5. Use template: 2-docs/planning/templates/architecture_vision_template.md
6. Convert template to planning document by removing "_template" from filename and filling with project-specific content
```

### Step 5: Project Structure and Template Generation

**Orchestration Task**: Generate standardized project structure and templates

**Ensure project structure exists:**
```
Verify and create only missing directories as needed:
- 1-main/ (if doesn't exist)
- Any missing subdirectories in 2-docs/ structure
- tests/ subdirectories (if project requires testing)

Note: Most directory structure should already exist in Context Engineering parent project
```

### Step 6: Configuration and State Management

**Generate `.claude/settings.json`**:
```
Populate settings.json with actual values from PLANNING.md and specialist analysis:
- PROJECT_NAME: Extract from PLANNING.md "Project Name" field
- PROJECT_TYPE: Extract from PLANNING.md "Project Type" field  
- TECH_STACK: Use results from Analysis Tech Detector Agent
- TECH_DETECTION: Include detection confidence and all detected stacks
- Technical requirement levels: Extract all 6 technical requirement selections from PLANNING.md
- Load agent assignment rules from existing system configuration
- Include complete available agents list from system
```

Example populated structure:
```json
{
  "version": "1.0.0",
  "PROJECT_NAME": "Simple Task Manager",
  "PROJECT_TYPE": "web", 
  "TECH_STACK": "javascript",
  "TECH_DETECTION": {
    "primary": "javascript",
    "confidence": "high",
    "ALL_DETECTED": ["html", "css", "javascript"]
  },
  "technical_requirements": {
    "market_research": "MINIMAL",
    "risk_management": "MINIMAL", 
    "planning_depth": "MINIMAL",
    "visual_documentation": "MINIMAL",
    "user_stories": "MINIMAL",
    "api_documentation": "MINIMAL"
  },
  "context_engineering": {
    "version": "3.0",
    "agents": {
      "assignment_rules": {
        // Load from existing system configuration
      },
      "available_agents": [
        // Load complete agent list from system
      ]
    }
  }
}
```

**Initialize `.claude/state/session.json`**:
```json
{
  "project_name": "[PROJECT_NAME]",
  "current_phase": "initialization",
  "tech_stack": "[TECH_STACK]",
  "last_command": "/init-context",
  "specialists_used": [
    // List of specialist agents assigned
  ],
  "progress_tracking": {
    "commands_completed": ["/init-context"],
    "current_step": "awaiting_create_prp"
  }
}
```

### Step 7: Integration and Quality Control

**Orchestration Integration Tasks:**
1. **Validate Specialist Outputs**: Ensure all planning documents are complete and consistent
2. **Resolve Conflicts**: Address any contradictions between specialist recommendations  
3. **Integration Check**: Verify all outputs work together cohesively
4. **Gap Analysis**: Identify any missing elements or insufficient detail
5. **Template Validation**: Ensure all planning templates are properly created

### Step 8: Final Setup and Configuration

**Complete project initialization:**
1. Generate final CLAUDE.md with all project context and agent information
2. Initialize MCP integration if available (via Content Researcher Agent)
3. Set up test framework based on detected technology stack
4. Create comprehensive project README and documentation structure

### Step 9: Comprehensive Summary and Approval Gate

**Generate orchestrated approval gate summary:**

**Specialist Agent Summary:**
- **Analysis Project Agent**: Project analysis findings and scope definition
- **Content Researcher Agent**: Market and technical research insights (if assigned)
- **Analysis Risk Agent**: Risk assessment and mitigation strategies (if assigned) 
- **Specialist Agents**: Domain-specific analysis and recommendations (if assigned)
- **Validation Designer Agent**: Validation framework and quality standards (if assigned)

**Integration Results:**
- All specialist outputs successfully integrated
- No conflicts between specialist recommendations
- Complete project structure and configuration created
- Templates and validation framework ready for use

**Files Created**: Complete list of all files created by all specialist agents

**Next Steps**: Clear description of what `/create-prp` will do based on this initialization

**Quality Assessment**: Validation that all initialization requirements met

## Success Criteria
- [ ] All planning documents reflect project complexity appropriately
- [ ] Technology stack properly detected and configured (if software project)
- [ ] Specialist assignments appropriate for project type and complexity
- [ ] All specialist outputs integrated cohesively
- [ ] Validation framework ready for use
- [ ] Project structure and configuration complete
- [ ] Templates created and ready for use
- [ ] Ready for feature decomposition and planning phase

## Recovery Support
If initialization is interrupted:
- Check `.claude/state/session.json` for specialist completion state
- Resume from last successful specialist completion
- Validate existing specialist outputs before proceeding
- Update state tracking appropriately

## Python Utilities Used
- `.claude/utils/mcp_health.py` - Only for MCP health monitoring and server communication
- Standard agent file operations for all other tasks

---
*Generated by Context Engineering v4.0 with Multi-Agent Orchestration*
*Next Step: Review specialist outputs and planning documents, then run /create-prp*