# Planning Context Package

**Token Budget**: 4K tokens maximum  
**Usage**: Load for analysis and planning agents (Analysis Project, Content Creator, Content Researcher)

## Core Planning Context

### Project Foundation
[[Artifact: planning-analysis]] - Complete project analysis and scope definition
[[Artifact: market-research]] - Market research findings and competitive analysis (if conducted)
[[Artifact: risk-assessment]] - Risk analysis results and mitigation strategies (if conducted)

### Key Planning Points (300 tokens maximum):
- **Project Goal**: [concise primary objective statement]
- **Success Criteria**: [3-5 measurable outcomes that define project success]
- **Primary Constraints**: [key limitations: budget, timeline, technical, regulatory]
- **Technical Approach**: [core technical decisions and architecture direction]
- **Target Users**: [primary user personas and usage scenarios]
- **Integration Requirements**: [existing systems, APIs, or dependencies]

## Agent-Specific Context Filters

### For Analysis Project Agent:
Focus on: Project scope, feasibility assessment, complexity analysis, dependency mapping
Context allocation: 3K tokens (planning points + scope analysis from artifacts)

### For Content Creator Agent:
Focus on: Requirements documentation, user stories, design specifications, acceptance criteria
Context allocation: 3K tokens (planning points + requirements sections from artifacts)

### For Content Researcher Agent:
Focus on: Market context, competitive analysis, technical research, best practices
Context allocation: 3K tokens (planning points + research findings from artifacts)

### For Risk Assessment Agent:
Focus on: Risk factors, mitigation strategies, contingency planning, compliance requirements
Context allocation: 3K tokens (planning points + risk analysis from artifacts)

## Context Loading Rules
- Load full package for planning-heavy commands (/init-context, /create-prp)
- Load filtered sections for specific agent assignments
- Reference artifacts by ID when detailed content needed
- Maintain token efficiency through focused context selection