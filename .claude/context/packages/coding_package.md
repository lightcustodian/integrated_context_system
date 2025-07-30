# Coding Context Package

**Token Budget**: 4K tokens maximum  
**Usage**: Load for implementation agents (Code Writer, Code Tester, Code Integration Tester)

## Core Coding Context

### Technical Foundation
[[Artifact: technical-stack-config]] - Complete technology stack configuration and setup
[[Artifact: design-review-standards]] - Code quality standards and review procedures
[[Artifact: architecture-vision]] - System architecture and component relationships

### Key Technical Points (300 tokens maximum):
- **Tech Stack**: [primary language, framework, database, testing tools]
- **Code Standards**: [style guide, naming conventions, file organization]
- **Quality Requirements**: [test coverage targets, performance criteria, security standards]
- **Development Environment**: [setup requirements, tools, dependencies]
- **Integration Points**: [APIs, external services, database schemas]
- **Deployment Process**: [build steps, deployment targets, environment configuration]

## Agent-Specific Context Filters

### For Code Writer Agent:
Focus on: Implementation patterns, code standards, architecture guidelines, feature specifications
Context allocation: 3K tokens (technical points + implementation guidance from artifacts)

### For Code Tester Agent:
Focus on: Testing frameworks, coverage requirements, test patterns, quality validation
Context allocation: 3K tokens (technical points + testing strategy from artifacts)

### For Code Integration Tester Agent:
Focus on: Integration patterns, API contracts, cross-feature dependencies, system testing
Context allocation: 3K tokens (technical points + integration requirements from artifacts)

### For Validation Assessor Agent:
Focus on: Quality standards, review procedures, acceptance criteria, compliance requirements
Context allocation: 3K tokens (technical points + quality frameworks from artifacts)

## Context Loading Rules
- Load full package for implementation commands (/execute-prp)
- Load filtered sections for code review and validation tasks
- Reference artifacts for detailed specifications when needed
- Maintain focus on current feature while preserving integration context