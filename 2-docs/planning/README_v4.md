# Planning Templates Directory

## Directory Structure
```
2-docs/
├── planning/
│   ├── templates/                      # Template files for planning documents
│   │   ├── project_analysis.md        # Project analysis template
│   │   ├── market_research.md          # Market research template  
│   │   ├── technical_research.md       # Technical research template
│   │   ├── architecture_vision.md      # Architecture vision template
│   │   ├── risk_assessment.md          # Risk assessment template
│   │   └── visual_documentation_plan.md # Visual documentation template
│   ├── project_analysis.md            # Actual project analysis (created by agent)
│   ├── market_research.md             # Actual market research (created by agent)
│   ├── technical_research.md          # Actual technical research (created by agent)
│   ├── architecture_vision.md         # Actual architecture vision (created by agent)
│   ├── risk_assessment.md             # Actual risk assessment (created by agent)
│   └── visual_documentation_plan.md   # Actual visual documentation plan (created by agent)
```

## How Agents Use Templates

### Agent Instructions Pattern
```markdown
# In any planning agent file:

## Primary Task
Create [DOCUMENT_NAME] using the template structure.

## Template Location
Use template: 2-docs/planning/templates/[template_name].md

## Output Location  
Create: 2-docs/planning/[document_name].md

## Instructions
1. Read the template file to understand required structure
2. Fill in all sections with project-specific content
3. Replace all placeholders with actual project information
4. Ensure all sections are complete and relevant
```

### Example Agent Reference
```markdown
# analysis_project.md

## Primary Task
Analyze PLANNING.md and create comprehensive project analysis document using the standard template structure.

## Template Reference
Follow structure from: 2-docs/planning/templates/project_analysis.md

## Output Specification  
Create: 2-docs/planning/project_analysis.md
- Use template structure but fill with project-specific analysis
- Replace all placeholders with actual findings
- Ensure all sections address this specific project
```

## Benefits of This Approach

### 1. **Separation of Concerns**
- **Templates**: Define structure and required sections
- **Agents**: Focus on analysis and content creation
- **Commands**: Focus on orchestration and workflow

### 2. **Maintainability**
- Update templates without touching agent files
- Consistent document structure across all projects
- Easy to enhance template quality over time

### 3. **Flexibility**
- Projects can customize templates if needed
- Agents can add sections beyond template requirements
- Templates can evolve based on experience

### 4. **Clarity**
- Agents know exactly what structure to follow
- Templates provide clear guidance on content expectations
- Consistent output format for all projects

## Template Creation Process

### During /init-context
1. **Check for existing templates**: Look for 2-docs/planning/templates/
2. **Create template directory**: If it doesn't exist
3. **Copy standard templates**: From system templates to project templates
4. **Allow customization**: Projects can modify templates if needed

### Template Usage by Agents
1. **Read template file**: Understand required structure
2. **Create project document**: Following template format
3. **Fill all sections**: With project-specific content
4. **Validate completeness**: Ensure all template sections addressed