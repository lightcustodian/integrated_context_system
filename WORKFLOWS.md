# Context Engineering Dual-Purpose Workflows

This document describes both **General Development** and **Context Engineering** workflows available in the unified system.

## Quick Start Guide

### For Simple Projects (General Development)
```bash
/design "Build a task manager web app"
/implement
/validate
```

### For Complex Projects (Context Engineering)
```bash
/design "Build an enterprise task management system" --ce
/init-context
/create-prp
/execute-prp
/validate
```

## Workflow Comparison

| Aspect | General Development | Context Engineering |
|--------|-------------------|-------------------|
| **Complexity** | 1-3 features, basic functionality | 4+ features, complex systems |
| **Planning** | Minimal, auto-generated | Comprehensive, human-reviewed |
| **Agents** | 4 core agents | 22+ specialist agents |
| **Documentation** | Basic comments only | Full technical documentation |
| **Testing** | Unit tests only | Multi-level testing framework |
| **Approval Gates** | Minimal (end result only) | Multiple (planning, PRP, features) |
| **Time Investment** | Quick implementation | Thorough upfront planning |

## General Development Workflow

### When to Use
- **Simple projects** with 1-3 main features
- **Quick prototypes** or proof-of-concepts
- **Personal projects** with basic requirements
- **Learning projects** or experiments
- **Time-sensitive** implementations

### Commands and Flow

#### `/design` - Project Setup
**Purpose**: Analyze requirements and create project configuration
```bash
/design "project description"
/design --file requirements.txt
/design --convert existing-planning.md
```

**What it does**:
- Analyzes your project description or file
- Creates PLANNING.md with simple defaults
- Identifies potential issues in your approach
- Recommends better methods if applicable
- Sets up basic project structure

**Output**: `response_[timestamp].md` with analysis and `PLANNING.md`

#### `/implement` - Streamlined Implementation
**Purpose**: Complete implementation from planning to working code
```bash
/implement
/implement --validate
/implement --feature-only
```

**What it does**:
- Runs simplified versions of init-context, create-prp, and execute-prp
- Uses basic agents only (orchestrator, code writer, code tester)
- Applies TDD methodology with simple quality standards
- Skips approval gates for continuous flow
- Focuses on working implementation quickly

**Output**: Working code, basic tests, minimal documentation

#### `/validate` - Quality Check
**Purpose**: Verify implementation meets requirements
```bash
/validate
/validate --quick
```

**What it does**:
- Validates code quality and functionality
- Runs test suites and checks coverage
- Provides improvement recommendations
- Ensures basic quality standards are met

**Output**: Validation report with quality scores

### General Development Example

**Project**: Simple Task Manager Web App

```bash
# Step 1: Design and Planning
/design "Build a web app for managing personal tasks with add, edit, delete, and mark complete functionality"

# Review response_[timestamp].md and approve

# Step 2: Implementation
/implement --validate

# Step 3: Review Results
# - Working task manager app
# - Basic unit tests
# - Simple documentation
# - Quality validation report
```

**Time**: 30-60 minutes total
**Agents Used**: 4 core agents
**Documentation**: Basic README and code comments

## Context Engineering Workflow

### When to Use
- **Complex projects** with 4+ features
- **Enterprise systems** with integration needs
- **High-quality deliverables** requiring comprehensive planning
- **Team projects** with multiple stakeholders
- **Mission-critical** implementations

### Commands and Flow

#### `/design --ce` - Comprehensive Planning Setup
**Purpose**: Analyze requirements for complex project implementation
```bash
/design "project description" --ce
/design --file detailed-requirements.md --ce
```

**What it does**:
- Performs comprehensive project analysis
- Creates PLANNING.md with full CE capabilities enabled
- Identifies complexity levels and specialist needs
- Sets up comprehensive technical requirements
- Configures system for full orchestration

**Output**: `response_[timestamp].md` with detailed analysis and enhanced `PLANNING.md`

#### `/init-context` - Project Initialization
**Purpose**: Create comprehensive project structure and planning documents
```bash
/init-context
/init-context --simple  (for reduced complexity)
```

**What it does**:
- Assigns specialist agents based on project complexity
- Creates comprehensive planning documents
- Performs market and technical research (if enabled)
- Establishes architecture vision
- Sets up validation frameworks

**Output**: Complete project planning suite in `2-docs/planning/`
**Approval Gate**: Review all planning documents before proceeding

#### `/create-prp` - Feature Decomposition and Requirements
**Purpose**: Break project into manageable features with detailed requirements
```bash
/create-prp
/create-prp --simple  (for minimal decomposition)
```

**What it does**:
- Decomposes project into discrete features
- Creates detailed feature specifications
- Establishes test strategies for each feature
- Generates comprehensive PRP document
- Sets up feature registry and dependencies

**Output**: Feature documents in `2-docs/features/` and main PRP
**Approval Gate**: Review feature breakdown and requirements before implementation

#### `/execute-prp` - Systematic Implementation
**Purpose**: Implement features using TDD methodology with quality controls
```bash
/execute-prp
/execute-prp --feature=FR-001,FR-002
/execute-prp --simple  (for streamlined implementation)
```

**What it does**:
- Implements features using coordinated specialist agents
- Applies rigorous TDD methodology (RED-GREEN-REFACTOR)
- Performs progressive integration testing
- Maintains comprehensive documentation
- Tracks progress and quality metrics

**Output**: Complete implementation with comprehensive testing
**Approval Gate**: Review implementation results and quality metrics

#### `/validate` - Comprehensive Quality Assurance
**Purpose**: Multi-level validation across all project domains
```bash
/validate
/validate --deep
/validate --integration
```

**What it does**:
- Coordinates multiple validation specialists
- Performs task, feature, and project-level validation
- Validates code quality, documentation, and business requirements
- Generates comprehensive validation report
- Provides detailed improvement recommendations

**Output**: Comprehensive validation report with quality scores across all domains

#### `/analyze-learning` - Continuous Improvement
**Purpose**: Extract insights for framework and process improvement
```bash
/analyze-learning
```

**What it does**:
- Analyzes orchestration effectiveness across the project
- Identifies successful patterns and improvement opportunities
- Generates insights for future project enhancement
- Contributes to cross-project learning aggregation

**Output**: Learning analysis report for framework improvement

### Context Engineering Example

**Project**: Enterprise Task Management System with User Management, Team Collaboration, Reporting, and API Integration

```bash
# Step 1: Comprehensive Design Analysis
/design "Build an enterprise task management system with user authentication, team collaboration features, advanced reporting dashboard, and REST API for third-party integrations" --ce

# Review response_[timestamp].md and approve approach

# Step 2: Project Initialization
/init-context

# Review comprehensive planning documents in 2-docs/planning/:
# - project-analysis.md (complexity and scope)
# - market-research.md (competitive analysis)
# - technical-research.md (implementation approaches)
# - architecture-vision.md (system design)
# - risk-assessment.md (risk mitigation)

# Step 3: Feature Requirements and Planning
/create-prp

# Review feature breakdown in 2-docs/features/:
# - FR-001-user-authentication.md
# - FR-002-task-management.md
# - FR-003-team-collaboration.md
# - FR-004-reporting-dashboard.md
# - FR-005-api-integration.md
# - main-prp.md (comprehensive project guide)

# Step 4: Systematic Implementation
/execute-prp

# Monitor implementation progress:
# - TDD implementation with comprehensive testing
# - Progressive integration across features
# - Quality validation at each step
# - Documentation generation throughout

# Step 5: Comprehensive Validation
/validate --deep --integration

# Review validation report:
# - Code quality metrics across all features
# - Integration testing results
# - Business requirement validation
# - Security and performance assessment

# Step 6: Learning Analysis (Optional)
/analyze-learning

# Review learning insights for future projects
```

**Time**: 4-8 hours total (with human review gates)
**Agents Used**: 15-22 specialist agents
**Documentation**: Comprehensive technical documentation, user guides, API docs

## Choosing the Right Workflow

### Use General Development When:
- ✅ Project has **1-3 main features**
- ✅ **Simple to moderate complexity**
- ✅ **Time-sensitive** delivery needed
- ✅ **Personal or small team** project
- ✅ **Learning or experimentation** focus
- ✅ **Basic quality standards** sufficient

### Use Context Engineering When:
- ✅ Project has **4+ complex features**
- ✅ **Enterprise or production** system
- ✅ **High quality standards** required
- ✅ **Multiple stakeholders** involved
- ✅ **Long-term maintainability** important
- ✅ **Comprehensive documentation** needed
- ✅ **Risk mitigation** is critical

### Hybrid Approach:
You can start with General Development and upgrade to Context Engineering:
```bash
# Start simple
/design "project description"
/implement

# Later upgrade for additional features
/design --convert PLANNING.md --ce
/create-prp
/execute-prp --feature=new-features
```

## Command Reference

### Flags and Options

#### Global Flags
- `--simple`: Use simplified workflow with basic agents
- `--ce`: Enable Context Engineering mode with full capabilities

#### Design Command
- `/design "description"`: Create planning from description
- `/design --file path`: Analyze external requirements file
- `/design --convert file --ce`: Convert existing planning to CE format

#### Implementation Commands
- `/implement`: Streamlined implementation workflow
- `/implement --validate`: Include validation step
- `/implement --feature-only`: Skip setup, implement features only

#### Context Engineering Commands
- `/init-context`: Project initialization with specialists
- `/create-prp`: Feature decomposition and requirements
- `/execute-prp`: Systematic feature implementation
- `/validate`: Comprehensive quality validation
- `/analyze-learning`: Extract improvement insights

#### Validation Options
- `/validate --quick`: Basic validation only
- `/validate --deep`: Comprehensive validation with all specialists
- `/validate --integration`: Include integration testing
- `/validate --feature=FR-001,FR-002`: Validate specific features

## Response File System

All commands generate response files for human review:
- **Format**: `response_[timestamp].md`
- **Contents**: Analysis, questions, recommendations, next steps
- **Purpose**: Ensure human understanding and approval before proceeding

### Response File Workflow
1. **Command executes** and generates response file
2. **Human reviews** analysis and recommendations
3. **Human responds** in the same file with corrections/approvals
4. **Next command** proceeds based on human input

## Quality Standards

### General Development Quality
- ✅ **Unit testing** with basic coverage
- ✅ **Code quality** standards (syntax, formatting)
- ✅ **Basic documentation** (README, code comments)
- ✅ **Functional requirements** met

### Context Engineering Quality
- ✅ **Multi-level testing** (unit, integration, end-to-end)
- ✅ **Comprehensive code quality** (security, performance, maintainability)
- ✅ **Complete documentation** (technical, user, API)
- ✅ **Business requirements** validation
- ✅ **Stakeholder approval** simulation
- ✅ **Quality metrics** tracking across all domains
- ✅ **Continuous improvement** through learning analysis

## Getting Help

- `/help`: System status and available commands
- Review `CLAUDE.md`: Complete system documentation
- Check `2-docs/context/`: Quality standards and validation procedures
- Examine response files: Detailed analysis and recommendations for each project

---

**Context Engineering v4.0 Unified System**
*Bridging simple development and comprehensive engineering workflows*