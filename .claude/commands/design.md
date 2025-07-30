# /design - Unified Project Design and Planning

**Purpose**: Create project planning configuration and analyze design documents for both general development and Context Engineering workflows
**Function**: Generate PLANNING.md, analyze provided documents, and configure system based on project requirements

## Usage
```
/design "project description" [--ce] [--convert existing-file] [--file external-file]
```

## Arguments
- `"project description"`: Natural language description of the project
- `--ce`: Enable Context Engineering mode with comprehensive planning
- `--convert existing-file`: Convert existing planning file to CE format
- `--file external-file`: Use external file as project requirements input

## Files Created
- `PLANNING.md` - Project configuration with appropriate defaults
- `response_[timestamp].md` - Analysis and understanding verification

## Files Updated
- `.claude/settings.json` - Updated based on project complexity and mode
- Project structure initialized as needed

## User Response File
Please provide your response in: `response_[timestamp].md`

Include:
- Confirmation that my understanding is correct
- Any corrections to my analysis
- Additional requirements or constraints
- Approval to proceed with next steps

**Chat Response**: "I've created response_[timestamp].md with my project analysis. Please review and respond in that file."

## Orchestration Agent Instructions

### Step 1: Load Orchestration Agent
```
Load agent persona: @../agents/core_orchestrator.md

You are coordinating project design and planning. Your task:
1. Analyze provided input (description, file, or conversion request)
2. Generate comprehensive project understanding and analysis
3. Create appropriate PLANNING.md with smart defaults
4. Configure system for chosen workflow mode
5. Provide design analysis with mistake identification and better methods
```

### Step 2: Input Analysis and Document Processing

#### If --file flag present:
```
**Read and Analyze External File**:
1. Read the provided file completely
2. Extract project goals, requirements, and constraints
3. Identify project type, complexity, and technical needs
4. Analyze the approach and identify any design issues
5. Generate project understanding based on file content

**Standard Analysis Framework**:
- What are the goals as stated in the document?
- What help/implementation is requested?
- Are there questions about the goals or methods?
- Will the proposed approach achieve the stated goals?
- What additional information is needed?
- What mistakes can be identified in the design?
- What better methods could accomplish the goals?
```

#### If --convert flag present:
```
**Convert Existing Planning**:
1. Read the existing planning file
2. Analyze current format and content
3. Convert to Context Engineering PLANNING.md format
4. Add missing technical requirement sections
5. Apply appropriate defaults for CE mode
6. Preserve all existing project information
```

#### If description only:
```
**Generate from Description**:
1. Parse the project description
2. Infer project type, complexity, and requirements
3. Generate comprehensive project analysis
4. Apply appropriate defaults based on inferred characteristics
5. Create PLANNING.md with smart defaults
```

### Step 3: Comprehensive Project Analysis

**Always perform this analysis regardless of input type:**

```
**Project Understanding Verification**:
Generate comprehensive analysis covering:

1. **Goals Analysis**:
   - Primary project objectives
   - Success criteria and outcomes
   - Stakeholder value and benefits
   - Scope and boundaries

2. **Technical Analysis**:
   - Technology stack requirements
   - Complexity assessment
   - Integration needs
   - Quality standards required

3. **Implementation Analysis**:
   - Approach feasibility
   - Resource requirements
   - Timeline considerations
   - Risk factors

4. **Design Review** (if applicable):
   - Mistakes identified in proposed approach
   - Better methods to accomplish goals
   - Alternative strategies worth considering
   - Implementation improvements recommended

5. **Questions and Clarifications**:
   - What additional information is needed?
   - Are there ambiguities in requirements?
   - What assumptions need validation?
   - Are there conflicting requirements?
```

### Step 4: PLANNING.md Generation

```
**Create PLANNING.md with Smart Defaults**:

IF --ce flag present OR complex project detected:
  **Context Engineering Mode**:
  - Set complexity to Medium or Complex
  - Enable appropriate technical requirements (MINIMAL/STANDARD)
  - Include comprehensive planning options
  - Add all CE-specific sections

ELSE:
  **General Development Mode**:
  - Set complexity to Simple (default)
  - Set all technical requirements to NONE (default)
  - Use minimal planning approach
  - Focus on implementation essentials

**Template Population**:
1. Fill project name, type, and description
2. Set appropriate complexity level
3. Apply smart defaults for technical requirements
4. Configure token optimization settings
5. Set quality and testing standards appropriately
6. Include inferred user stories and requirements
```

### Step 5: System Configuration

```
**Configure System Based on Mode**:

**General Mode Configuration**:
- Update settings.json with simple mode defaults
- Set workflow mode to "simple"
- Configure basic agent assignments
- Apply streamlined quality standards

**Context Engineering Mode Configuration**:
- Update settings.json with CE capabilities
- Set workflow mode to "comprehensive"
- Enable full agent assignment rules
- Apply comprehensive quality frameworks
```

### Step 6: Response File Generation

```
**Create response_[timestamp].md with:**

# Project Analysis Response - [timestamp]

## My Understanding

### Project Goals
[Detailed understanding of what the project aims to achieve]

### Implementation Requirements
[What specific help/implementation is needed]

### Success Criteria
[How success will be measured]

## Project Analysis

### Project Type and Complexity
- **Type**: [software/web/marketing/research/design/mixed]
- **Complexity**: [Simple/Medium/Complex]
- **Technical Requirements**: [Summary of needs]

### Technology and Implementation
- **Tech Stack**: [Recommended/detected technology choices]
- **Key Features**: [Primary functionality to implement]
- **Integration Points**: [External systems/APIs needed]

## Design Review (if applicable)

### Mistakes Identified
[Specific issues found in proposed approach with explanations]

### Better Methods Recommended
[Alternative approaches that would better achieve goals]

### Implementation Improvements
[Specific enhancements to proposed design]

## Questions and Clarifications

### About Goals
[Any questions about project objectives]

### About Implementation
[Questions about technical approach]

### About Requirements
[Clarifications needed on specifications]

## Recommended Next Steps

### Immediate Actions
1. [First step recommendation]
2. [Second step recommendation]

### Workflow Recommendation
- **For Simple Projects**: Use /implement for streamlined development
- **For Complex Projects**: Use /init-context → /create-prp → /execute-prp workflow
- **For Design Analysis**: Address identified issues before implementation

### Additional Information Needed
[Specific details required to proceed effectively]

## Configuration Applied

### PLANNING.md Created
- **Mode**: [General/Context Engineering]
- **Defaults Applied**: [Summary of smart defaults]
- **Next Command**: [Recommended next step]

### System Configuration
- **Settings Updated**: [Changes made to system configuration]
- **Workflow Mode**: [Simple/Comprehensive]
- **Agent Assignment**: [Planned specialist coordination]
```

## Success Criteria
- [ ] Input thoroughly analyzed and understood
- [ ] PLANNING.md created with appropriate defaults
- [ ] System configured for chosen workflow mode
- [ ] Comprehensive analysis provided in response file
- [ ] Design issues identified and better methods recommended (if applicable)
- [ ] Clear next steps provided

## Workflow Integration

### General Development Path
```
/design "description" → /implement → /validate
```

### Context Engineering Path
```
/design "description" --ce → /init-context → /create-prp → /execute-prp → /validate
```

### Document Analysis Path
```
/design --file document.md → [Review response file] → [Choose appropriate workflow]
```

### Conversion Path
```
/design --convert existing-planning.md --ce → /create-prp → /execute-prp → /validate
```

---
*Generated by Context Engineering v4.0 Unified System*
*Bridges general development and comprehensive Context Engineering workflows*