# /create-prp - Project Requirements and Planning with Multi-Agent Orchestration

**Purpose**: Create comprehensive Project Requirements and Planning with intelligent feature decomposition
**Function**: Orchestration Agent coordinates specialist agents to create systematic implementation guidance

## Files Called
- `2-docs/planning/*.md` - Planning documents from /init-context specialist analysis
- `PLANNING.md` - Original project configuration
- `.claude/settings.json` - Project configuration and agent assignment rules
- `.claude/state/session.json` - Current project state
- `.claude/utils/mcp_client.py` - Enhanced research capabilities (optional)

## Files Created
- `2-docs/PRPs/main-prp.md` - Comprehensive project implementation guide
- `2-docs/features/project-requirements.md` - Detailed project requirements
- `2-docs/features/project-design.md` - High-level project design
- `2-docs/features/FR-001-[feature-name].md` - Individual feature documents
- `2-docs/features/feature-registry.json` - Feature tracking and dependencies
- Test scaffolding for each feature (unit, integration, BDD)
- Integration test templates for cross-feature validation

## Usage
```
/create-prp [--complexity=low|medium|high] [--max-features=10] [--no-decomposition]
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

### Step 2: Context Analysis and Validation
**Orchestration Task**: Analyze project context and determine specialist requirements

**Decision Logic**:
```
Read agent assignment rules from .claude/settings.json
Load comprehensive project context:
- Read all planning documents from 2-docs/planning/
- Extract project requirements, goals, and constraints
- Analyze complexity indicators and feature boundaries
- Validate that initialization is complete

Determine specialist needs based on:
- Project type (software, marketing, research, design, mixed)
- Project complexity (simple, medium, complex)
- Feature decomposition requirements
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
```

#### Conditional Specialists Based on Project Type

**If project involves software development:**

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

**If project involves complex feature decomposition:**

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
- Test scaffolding and BDD scenario templates
```

**If project type includes non-software components:**

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
Based on specialist analysis, determine decomposition approach:
- Simple projects (1-3 features): Single comprehensive PRP
- Medium projects (4-8 features): Moderate feature decomposition
- Complex projects (9+ features): Comprehensive feature decomposition

Feature Decomposition Guidelines from specialists:
- Code-focused features: Minimize non-code tasks to essential documentation
- Non-code-focused features: Minimize code tasks to essential automation
- Clear separation: Maintain feature focus while enabling integration
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

**Delegate test scaffolding creation:**
```
Using Validation Designer Agent output and specialist recommendations:

Task-Level Testing (Happy Path, Edge Case, Negative Case):
- Create test templates in tests/unit/FR-XXX/ for each feature
- Generate BDD scenarios in tests/bdd/features/FR-XXX.feature
- Set up test group organization and execution order

Feature-Level Testing:
- Create Feature Testing Review List for manual validation
- Set up integration test templates in tests/integration/
- Configure stakeholder validation for non-code components

Project-Level Testing:
- Create Project Testing Review List for comprehensive validation
- Plan Test Writer agent enhancement process
- Set up end-to-end test structure in tests/e2e/
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
      "complexity": "medium",
      "priority": "high",
      "status": "planned",
      "specialist_analysis": "[Key insights from specialists]",
      "file_path": "2-docs/features/FR-001-feature-name.md",
      "test_files": {
        "unit": ["tests/unit/FR-001/"],
        "integration": ["tests/integration/FR-001/"],
        "bdd": ["tests/bdd/features/FR-001.feature"]
      }
    }
  ]
}
```

### Step 7: Main PRP Creation
**Orchestration Task**: Create comprehensive PRP as orchestrator document

**Main PRP Generation**:
```
Create 2-docs/PRPs/main-prp.md integrating all specialist outputs:

For Feature-Decomposed Projects:
- Project overview synthesizing specialist analysis
- Feature summary with specialist insights
- Execution strategy based on specialist recommendations
- Integration testing approach from validation design
- Progress tracking framework with specialist input
- Links to individual feature documents

For Single-Feature Projects:
- Comprehensive implementation guide
- Complete requirements and design from specialists
- Detailed task breakdown with specialist analysis
- Full testing strategy from validation design
```

### Step 8: Integration and Quality Control
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

### Step 9: Comprehensive Summary and Approval Gate
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