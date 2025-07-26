# .claude/agents/ Folder Structure

## Proposed Directory Structure

```
.claude/
├── agents/                             # All agents in single directory
│   ├── core_orchestrator.md           # Main orchestrator for all commands
│   ├── analysis_project.md             # Project analysis and complexity assessment
│   ├── analysis_tech_detector.md       # Technology stack detection
│   ├── analysis_risk.md                # Risk assessment and mitigation
│   ├── code_writer.md                  # TDD implementation agent
│   ├── code_tester.md                  # Test execution agent
│   ├── code_test_writer.md             # Additional test creation
│   ├── code_integration_tester.md      # Cross-feature testing
│   ├── validation_coordinator.md       # General validation coordinator
│   ├── validation_designer.md          # Validation strategy creation
│   ├── validation_stakeholder.md       # Stakeholder simulation
│   ├── validation_assessor.md          # Quality standards enforcement
│   ├── content_creator.md              # Documentation and content creation
│   ├── content_researcher.md           # Market and technical research
│   ├── content_summarizer.md           # Progress summaries and reports
│   ├── content_technical_writer.md     # Technical documentation specialist
│   ├── specialist_marketing.md         # Marketing strategy and content
│   ├── specialist_design.md            # UI/UX and visual design
│   ├── specialist_security.md          # Security assessment
│   ├── specialist_performance.md       # Performance optimization
│   └── specialist_finance.md           # Financial analysis
└── commands/                           # Simplified command files
    ├── init-context.md                 # Orchestration logic only
    ├── create-prp.md                   # Orchestration logic only
    ├── execute-prp.md                  # Orchestration logic only
    ├── validate.md                     # Orchestration logic only
    └── help.md                         # System guidance
```

## Key Benefits

### 1. **Separation of Concerns**
- **Commands**: Focus on workflow orchestration and decision logic
- **Agents**: Focus on specialized task execution and domain expertise

### 2. **Reusability**
- Agents can be used across multiple commands
- Easy to create new commands that leverage existing agents
- Domain specialists can be shared across different project types

### 3. **Modularity** 
- Add new agents without modifying existing commands
- Customize agents for specific projects
- Easy to maintain and update agent personas

### 4. **Clarity**
- Clear separation between "what to do" (commands) and "how to do it" (agents)
- Easier to understand system architecture
- Simplified debugging and enhancement

## Implementation Pattern

### Commands Reference Agents
```markdown
# In init-context.md

## Step 3: Project Analysis Delegation
Based on project complexity, assign tasks to specialist agents:

**Project Analyzer Agent**: @../agents/analysis/project-analyzer.md
- Task: Analyze PLANNING.md and create project-analysis.md
- Input: PLANNING.md, project complexity settings
- Output: 2-docs/planning/project-analysis.md

**Researcher Agent**: @../agents/analysis/researcher.md  
- Task: Conduct market and technical research
- Input: Project type, industry, technology stack
- Output: 2-docs/planning/market-research.md, technical-research.md
```

### Agents Are Self-Contained
```markdown
# project-analyzer.md

You are a **Project Analyzer Agent**. 

## Core Identity
Your expertise is in project analysis, requirement gathering, and complexity assessment.

## Capabilities
- Deep project scope analysis
- Stakeholder identification and needs assessment
- Success criteria validation and refinement
- Resource requirement estimation
- Timeline feasibility assessment

## Working Style
- Systematic analysis using structured frameworks
- Evidence-based recommendations
- Clear documentation of assumptions and constraints
- Proactive identification of potential issues

## Input Requirements
- PLANNING.md with project configuration
- Project complexity level and settings
- Stakeholder information (if available)

## Output Format
Create 2-docs/planning/project-analysis.md with:
1. **Executive Summary**: Key findings and recommendations
2. **Scope Analysis**: Detailed scope boundaries and inclusions/exclusions
3. **Stakeholder Analysis**: Key stakeholders and their needs
4. **Success Criteria**: Validated and refined success metrics
5. **Resource Analysis**: Required resources and constraints
6. **Risk Factors**: Potential challenges and dependencies

## Quality Standards
- All analysis must be specific to the project context
- Recommendations must be actionable and realistic
- Assumptions must be clearly documented
- Analysis must support downstream planning activities

## Integration Points
- Provides input to Risk Analyst Agent for risk assessment
- Supports Researcher Agent with validated project scope
- Enables Architecture Visioning with clear requirements
```

This approach makes your orchestration pattern much cleaner and more powerful!