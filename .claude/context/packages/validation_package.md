# Validation Context Package

**Token Budget**: 4K tokens maximum  
**Usage**: Load for validation agents (Validation Coordinator, Validation Assessor, Validation Stakeholder)

## Core Validation Context

### Quality Framework
[[Artifact: validation-strategy]] - Complete validation approach and testing procedures
[[Artifact: success-criteria]] - Project success criteria and acceptance requirements
[[Artifact: quality-standards]] - Quality standards and compliance requirements

### Key Validation Points (300 tokens maximum):
- **Success Criteria**: [measurable outcomes that define project completion]
- **Quality Standards**: [code quality, documentation, performance, security requirements]
- **Test Coverage**: [minimum coverage targets, test types, validation scenarios]
- **Stakeholder Requirements**: [business validation, user acceptance, approval processes]
- **Compliance Needs**: [regulatory, security, accessibility standards]
- **Integration Validation**: [cross-feature testing, system integration requirements]

## Agent-Specific Context Filters

### For Validation Coordinator Agent:
Focus on: Multi-level validation strategy, test execution coordination, quality gate management
Context allocation: 3K tokens (validation points + coordination procedures from artifacts)

### For Validation Assessor Agent:
Focus on: Quality standards enforcement, assessment criteria, compliance verification
Context allocation: 3K tokens (validation points + quality frameworks from artifacts)

### For Validation Stakeholder Agent:
Focus on: Business requirements, user acceptance, stakeholder simulation, approval processes
Context allocation: 3K tokens (validation points + stakeholder requirements from artifacts)

### For Validation Critical Reviewer Agent:
Focus on: Overconfidence detection, risk assessment, critical analysis triggers
Context allocation: 3K tokens (validation points + critical review criteria from artifacts)

## Context Loading Rules
- Load full package for validation commands (/validate)
- Load filtered sections for quality assessment tasks
- Reference artifacts for detailed validation procedures when needed
- Maintain focus on current validation scope while preserving project context