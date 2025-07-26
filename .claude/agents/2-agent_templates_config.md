# Agent Configuration Guide

## Purpose
This file explains how agents work together and provides configuration rules for the orchestration system. **This is NOT a template file** - it's documentation for how the system operates.

## How It's Used
1. **By Orchestration Agent**: To understand which agents to assign for different project types
2. **By Developers**: To understand the agent system architecture
3. **For System Maintenance**: To modify agent assignment rules when needed

## Agent Assignment Rules

### Based on Project Type
```
Software Projects:
- analysis_project (always)
- analysis_tech_detector (always) 
- content_researcher (if planning_depth >= standard)
- analysis_risk (if complexity >= medium)

Marketing Projects:
- analysis_project (always)
- specialist_marketing (always)
- content_researcher (if planning_depth >= standard)

Research Projects:
- analysis_project (always)
- content_researcher (always)
- analysis_risk (if complexity >= medium)

Design Projects:
- analysis_project (always)
- specialist_design (always)
- content_researcher (if planning_depth >= standard)

Mixed Projects:
- analysis_project (always)
- All relevant specialists based on components
- content_researcher (if planning_depth >= standard)
- analysis_risk (if complexity >= medium)
```

### Based on Complexity Level
```
Simple (1-3 features):
- Minimal agent assignment
- Focus on core analysis and content creation

Medium (4-8 features):
- Standard agent assignment
- Include risk analysis and research

Complex (9+ features):
- Full agent assignment
- Include all validation and specialist agents
- Enhanced risk assessment and planning
```

### Based on Planning Depth
```
Minimal:
- analysis_project
- content_creator
- Essential specialists only

Standard:
- analysis_project
- content_researcher
- content_creator
- Relevant specialists

Comprehensive:
- Full agent suite
- analysis_risk
- validation_designer
- All relevant specialists
```

## Quality Standards by Agent Type

### Analysis Agents
- Evidence-based recommendations
- Clear assumptions documentation
- Actionable and realistic outputs
- Project-specific context

### Content Agents  
- Clear, well-structured documentation
- Consistent terminology and style
- Appropriate detail level
- Integration with other outputs

### Code Agents
- Follow established coding standards
- Comprehensive test coverage
- Clear documentation
- Integration compatibility

### Validation Agents
- Systematic validation procedures
- Clear success criteria
- Comprehensive coverage
- Actionable feedback

### Specialist Agents
- Domain expertise application
- Industry best practices
- Specific recommendations
- Integration with overall strategy