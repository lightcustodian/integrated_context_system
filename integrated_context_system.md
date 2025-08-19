# Integrated Context System - Complete Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Key Features & Design Principles](#key-features--design-principles)
4. [Command Reference](#command-reference)
   - [PLAN Command](#plan-command)
   - [IMPLEMENT Command](#implement-command)
   - [OPTIMIZE Command](#optimize-command)
   - [QA Command](#qa-command)
5. [Enhancement Systems](#enhancement-systems)
6. [Usage Guide](#usage-guide)

---

## System Overview

The Integrated Context System is a sophisticated AI-driven development framework that orchestrates software projects through four sequential commands: PLAN, IMPLEMENT, OPTIMIZE, and QA. Built on three advanced methodologies—BMAD (Breakthrough Method of Agile AI-Driven Development https://github.com/bmad-code-org/BMAD-METHOD), SAGE (Self-Assessment, Adaptive Planning, Goal-oriented Execution, and Experience Integration), and Archon (Specialized Agent Architecture)—the system delivers working prototypes through intelligent automation, cross-project learning, and comprehensive quality assurance.

### Core Philosophy
- **Prototype-First Development**: Every iteration produces a deployable, working prototype
- **AI-Agent Orchestration**: Specialized agents handle complex reasoning and pattern recognition
- **Continuous Learning**: Cross-project intelligence improves with each execution
- **Recovery-Oriented**: Built-in rollback and error recovery at every step
- **Real-Time Transparency**: Live progress tracking with intelligent ETA estimation
- **Human Approval Workflow**: All command completions require human review via response files

### Development Flow
```
PLAN → IMPLEMENT → OPTIMIZE → QA → Production
  ↓        ↓          ↓        ↓
Prototypes → TDD → Performance → Certification
```

---

## Architecture

### Directory Structure
```
integrated_context_system/
├── CLAUDE.md                          # Main system instructions
├── integrated_context_system.md       # This documentation
├── .claude/                           # Core system files
│   ├── commands/                      # Command definitions
│   │   ├── plan.md                   # PLAN command specification
│   │   ├── implement.md              # IMPLEMENT command specification
│   │   ├── optimize.md               # OPTIMIZE command specification
│   │   └── qa.md                     # QA command specification
│   ├── agents/                        # Agent definitions (17 active agents, 42 total available)
│   │   ├── pattern_matcher.md        # Cross-command pattern recognition
│   │   ├── learning_analyzer.md      # Learning system analyzer
│   │   ├── methodology_analyst.md    # BMAD/SAGE integration specialist
│   │   ├── capability_assessor.md    # MCP capability assessment
│   │   ├── risk_analyst.md           # Risk identification and mitigation
│   │   ├── security_optimizer.md     # Security-aware optimization
│   │   └── [11+ more active specialized agents]
│   ├── mcp/                          # Model Context Protocol integration
│   │   └── mcp_index.json           # MCP server configurations
│   ├── state/                         # Session state management
│   │   └── session.json              # Current session state
│   ├── utils/                         # Utility scripts
│   └── templates/                     # Project templates
├── ../docker/                         # Docker implementation (parallel directory)
│   ├── client/                        # React/TypeScript frontend
│   │   ├── src/                      
│   │   │   ├── components/           # Kanban board, task cards
│   │   │   └── api/                  # Socket.io, tRPC integration
│   │   └── package.json
│   ├── server/                        # Node.js backend
│   │   ├── src/
│   │   │   ├── db/                   # SQLite database
│   │   │   ├── socket/               # Real-time updates
│   │   │   ├── trpc/                 # API router
│   │   │   └── utils/                # Enhancement systems
│   │   │       ├── enhanced_error_recovery.js
│   │   │       ├── realtime_state_validator.js
│   │   │       ├── smart_dependency_validator.js
│   │   │       ├── agent_reuse_registry.js
│   │   │       ├── progress_transparency_system.js
│   │   │       ├── cross_command_intelligence.js
│   │   │       ├── git_analysis.js
│   │   │       ├── metrics_calculator.js
│   │   │       └── performance_analysis.js
│   │   └── package.json
│   ├── learning/                      # JSON learning storage
│   │   ├── global_patterns.json
│   │   ├── methodology_effectiveness.json
│   │   ├── dependency_patterns.json
│   │   └── user_patterns.json
│   ├── docker-compose.yml             # Container orchestration
│   ├── Dockerfile                     # Container definition
│   └── start.js                       # Application entry point
└── docs/
    ├── internal/                      # Project documentation
    └── external/                      # External references

```

### Technology Stack
- **Backend**: Node.js, Express, Socket.io, tRPC
- **Frontend**: React, TypeScript, Tailwind CSS
- **Database**: SQLite with state management
- **Learning Storage**: JSON-based pattern storage
- **Real-time**: Socket.io for live updates
- **Testing**: Jest, TDD methodology, Puppeteer for web UI validation
- **Version Control**: Git with safety commits
- **Web Validation**: Puppeteer for browser-based testing and UI verification

### Methodology Integration

#### BMAD (Business-driven Methodology)
- Stakeholder analysis and requirements mapping
- Validation gates at each development phase
- Quality-driven acceptance criteria
- Production readiness certification

#### SAGE (Strategic Adaptive Growth Engine)
- Cross-project pattern learning
- Adaptive behavior based on historical success
- Dependency impact analysis
- Performance optimization patterns

#### Archon (Specialized Agent Architecture)
- 17 specialized agents actively used across commands with intelligent reuse
- 95% agent reuse efficiency across command executions
- Context-aware agent adaptation and specialization
- Performance tracking and optimization

---

## Key Features & Design Principles

### Core Features

1. **Intelligent Command Orchestration**
   - Sequential command flow with dependency management
   - Auto-provisioning of missing dependencies
   - Cross-command intelligence sharing
   - Real-time progress tracking

2. **Advanced Error Recovery**
   - Step-level rollback capabilities
   - Git commit checkpoints
   - Database state recovery
   - Automatic failure recovery

3. **Real-Time Validation**
   - Pre-step state validation
   - Dependency checking
   - Resource availability verification
   - Fully integrated MCP capability assessment and tool access

4. **Agent Intelligence**
   - 17 specialized agents actively used across all commands
   - Cross-command agent reuse (95% efficiency)
   - Performance-based agent selection from 42 available specialists
   - Context adaptation capabilities

5. **Learning System**
   - JSON-based pattern capture during execution
   - Cross-project intelligence sharing via JSON storage
   - Success/failure pattern analysis with persistent JSON records
   - Continuous improvement through structured JSON learning data

6. **User Experience**
   - Real-time Kanban board updates
   - Live progress with ETA
   - Structured approval workflows with response files
   - Recovery guidance
   - Human review checkpoints at command completion

7. **Response File System**
   - Mandatory response files for all command completions
   - Format: `[auto-increment starting at last unused #]_[task_name].md` (e.g., `055_plan_approval.md`)
   - Structured approval format for human review
   - Complete audit trail of AI decisions and recommendations

### Design Principles

1. **Prototype-First**: Every iteration produces working, deployable code
2. **Test-Driven**: TDD methodology with Red-Green-Refactor cycles
3. **Recovery-Oriented**: Failures are expected and handled gracefully
4. **Learning-Based**: System improves with each execution
5. **Transparency**: Real-time visibility into all operations
6. **Modularity**: Components are independent and reusable
7. **Intelligence Sharing**: Patterns flow between commands automatically

---

## Command Reference

### PLAN Command

#### Purpose
Create comprehensive project plan with methodology integration, two-stage understanding validation, and cross-project intelligence application.

#### Key Features
- Two-stage understanding (research → user approval)
- BMAD stakeholder analysis and validation gates
- SAGE pattern matching from similar projects
- Archon specialized agent generation
- Options-based recommendations with AI reasoning
- Interactive approval workflow
- Prototype-based planning

#### Inputs
- User project description/requirements
- Learning patterns from `../docker/learning/`
- Database project state
- MCP capability requirements
- Documentation context

#### Implementation

##### Step 1: Initialize Enhanced Planning Session
**Type**: PROGRAMMATIC
**Tasks**:
1. Initialize database managers
2. Start SAGE learning session
3. Load historical patterns (AGENT)
4. Apply automatic adaptations (AGENT)

##### Step 2: Research Understanding & Analysis
**Type**: AGENT-BASED (no user interaction)
**Tasks**:
1. Initial project interpretation
2. Generate alternative interpretations (2-3 options)
3. Technology stack options with pros/cons
4. Scope options (MVP/Standard/Comprehensive)
5. Generate focused questions
6. Recommend preferred approach

##### Step 3: User Understanding Verification & Approval
**Type**: HYBRID
**Tasks**:
1. Generate understanding summary (AGENT)
2. Present options and recommendations
3. Collect user feedback
4. Update project context (AGENT)
**User Interaction**: APPROVAL REQUIRED

##### Step 4: Comprehensive Project Analysis
**Type**: AGENT-BASED
**Tasks**:
1. BMAD stakeholder analysis
2. SAGE pattern matching
3. Archon knowledge integration
4. Risk pattern analysis
5. Generate combined recommendations

##### Step 5: Settings Configuration
**Type**: HYBRID
**Tasks**:
1. Generate context-aware settings (AGENT)
2. Present configuration options (AGENT)
3. Create approval document
4. Wait for user approval
**User Interaction**: APPROVAL REQUIRED

##### Step 6: MCP Integration & Capability Assessment
**Type**: HYBRID
**Tasks**:
1. Assess methodology-specific capabilities (AGENT)
2. Request MCP capabilities
3. Validate tool integration
4. Configure fallback options (AGENT)

##### Step 7: Enhanced Prototype Planning
**Type**: HYBRID
**Tasks**:
1. Apply SAGE sizing patterns
2. Intelligent feature extraction (AGENT)
3. Generate BMAD validation gates (AGENT)
4. SAGE dependency analysis (AGENT)
5. Create prototype definitions

##### Step 8: Comprehensive Plan Generation & Approval
**Type**: HYBRID
**Tasks**:
1. Generate implementation plan (AGENT)
2. Create risk analysis & mitigation (AGENT)
3. Design success metrics (AGENT)
4. Create Kanban task structure
5. Present for final approval
**User Interaction**: APPROVAL REQUIRED

##### Step 9: Finalize Planning & Learning Capture
**Type**: HYBRID
**Tasks**:
1. Update project state
2. Analyze planning success patterns (AGENT)
3. Capture methodology effectiveness (AGENT)
4. Save learning session
5. Update cross-project intelligence

#### Outputs
- Prototype definitions with validation gates
- Methodology configuration settings
- Risk analysis and mitigation strategies
- Kanban board with task structure
- Cross-project learning patterns captured in JSON
- Implementation-ready project plan
- **Response file**: `[XXX]_plan_approval.md` using auto-increment format for human approval

#### Success Criteria
- User approves understanding (Step 3)
- User approves settings (Step 5)
- User approves final plan (Step 8)
- All prototypes have clear business value
- Validation gates are measurable
- Learning patterns captured

---

### IMPLEMENT Command

#### Purpose
Execute TDD implementation of prototypes with real-time tracking, BMAD validation, and automatic dependency management.

#### Key Features
- 6-step TDD loop (Feature Selection → RED → GREEN → REFACTOR → Validation → Loop Control)
- BMAD validation with automatic remediation
- SAGE pattern application during refactoring
- Real-time Kanban updates
- Git safety commits
- Dependency impact analysis
- Prototype approval workflow

#### Inputs
- Prototype definitions from PLAN
- BMAD validation gates
- Project settings and methodology configuration
- Learning patterns
- MCP capabilities

#### Implementation

##### Step 1: Prototype Selection & Context Analysis
**Type**: HYBRID
**Tasks**:
1. Initialize database managers
2. Load project state & prototypes
3. Select target prototype (user choice or next)
4. Start SAGE learning session
5. Analyze dependency state (AGENT)
6. Apply SAGE implementation patterns (AGENT)

##### Step 2: Pre-Implementation BMAD Validation & Setup
**Type**: HYBRID
**Tasks**:
1. BMAD prerequisite validation (AGENT)
2. Dependency validation
3. MCP capability assessment (AGENT)
4. Request MCP capabilities
5. Capture validation results

##### Step 3: TDD Feature Loop (Iterative)
**Type**: HYBRID - Complex nested loop structure

###### Step 3.1: Feature Selection & Test Design
**Type**: AGENT-BASED
**Tasks**:
1. Select next feature
2. Load feature requirements
3. Design test strategy (TEST_CREATOR agent)
4. Validate test coverage (AGENT)
5. Update Kanban status

###### Step 3.2: RED Phase - Create Failing Tests
**Type**: AGENT-BASED
**Tasks**:
1. Generate unit tests (TEST_CREATOR)
2. Generate integration tests (TEST_CREATOR)
3. Generate BMAD validation tests (TEST_CREATOR)
4. Execute test suite
5. Capture test metrics

###### Step 3.3: GREEN Phase - Implement Feature
**Type**: AGENT-BASED
**Tasks**:
1. Analyze failing tests (FEATURE_IMPLEMENTER)
2. Generate implementation code (FEATURE_IMPLEMENTER)
3. Execute tests incrementally
4. Validate test passage
5. Handle test failures (AGENT)

###### Step 3.4: REFACTOR Phase - Apply SAGE Patterns
**Type**: AGENT-BASED
**Tasks**:
1. Load SAGE patterns (PATTERN_REFACTORER)
2. Analyze optimization opportunities (PATTERN_REFACTORER)
3. Apply high-confidence patterns (PATTERN_REFACTORER)
4. Validate test compatibility
5. Capture pattern effectiveness

###### Step 3.5: BMAD Validation & Commit
**Type**: HYBRID
**Tasks**:
1. Execute BMAD validation gates (AGENT)
2. Handle validation failures (auto-create fix tasks)
3. Execute validation fixes (automatic)
4. Re-validate after fixes
5. Create Git safety commit

###### Step 3.6: Loop Control & Progress Assessment
**Type**: PROGRAMMATIC
**Tasks**:
1. Update feature status
2. Assess prototype progress (AGENT)
3. Check remaining features
4. Update Kanban board
5. Loop decision (continue or exit)

##### Step 4: Dependency Impact Analysis
**Type**: HYBRID
**Tasks**:
1. Extract feature changes
2. SAGE dependency analysis (AGENT)
3. Create validation tasks
4. Update Kanban board

##### Step 5: Prototype Completion & BMAD Validation
**Type**: HYBRID
**Tasks**:
1. Run comprehensive test suite
2. Execute BMAD validation gates (AGENT)
3. Store validation results
4. Calculate completion metrics
5. Update project state

##### Step 6: Prototype Approval Workflow
**Type**: HYBRID
**Tasks**:
1. Generate approval document (AGENT)
2. Create approval interface
3. Handle approval/rejection
**User Interaction**: APPROVAL REQUIRED

##### Step 7: Learning Session Completion
**Type**: HYBRID
**Tasks**:
1. Capture implementation metrics
2. Analyze implementation patterns (LEARNING_ANALYZER)
3. Update cross-project intelligence
4. Update project state

#### Outputs
- Working prototype implementation
- Comprehensive test coverage
- BMAD validation results
- Git commit history
- Dependency validation tasks
- Learning patterns captured in JSON
- **Web validation results** (Puppeteer-based for web projects)
- **Response file**: `[XXX]_implement_approval.md` using auto-increment format for human approval

#### Success Criteria
- All tests pass (100% GREEN)
- BMAD validation gates pass
- User approves prototype
- Learning patterns captured
- No unresolved dependencies

---

### OPTIMIZE Command

#### Purpose
Systematic performance optimization with security integration, specialized agent generation, and cross-project pattern application.

#### Key Features
- SAGE optimization pattern recognition
- BMAD performance target establishment
- Archon specialized optimization agents
- Security-aware optimization
- Real-time progress tracking
- Before/after comparison
- Approval workflow

#### Inputs
- Completed prototypes from IMPLEMENT
- Performance baselines
- Learning patterns
- Project settings
- User optimization preferences

#### Implementation

##### Step 1: Optimization Context Analysis
**Type**: HYBRID
**Tasks**:
1. Initialize enhanced managers
2. Load SAGE optimization patterns (PATTERN_MATCHER)
3. Start optimization learning session
4. Apply automatic adaptations (PATTERN_MATCHER)

##### Step 2: BMAD Performance & Security Benchmarking
**Type**: HYBRID
**Tasks**:
1. Establish BMAD performance targets (PERFORMANCE_TARGET_AGENT)
2. Execute comprehensive performance analysis
3. Establish security baseline
4. Identify performance gaps

##### Step 3: Archon Agent Generation
**Type**: AGENT-BASED
**Tasks**:
1. Analyze performance bottlenecks
2. Generate specialized agents (CPU, Memory, Database, Security optimizers)
3. Configure agent capabilities

##### Step 4: Systematic Optimization Implementation
**Type**: HYBRID
**Tasks**:
1. Execute optimizations (specialized agents)
2. Measure performance impact
3. Security impact monitoring
4. Real-time progress updates
5. Git safety commits

##### Step 5: BMAD Quality Gate Validation
**Type**: HYBRID
**Tasks**:
1. Validate performance targets
2. Validate code quality gates (AGENT)
3. Enhanced security validation
4. Security remediation (SECURITY_OPTIMIZER)

##### Step 6: Optimization Approval & Documentation
**Type**: HYBRID
**Tasks**:
1. Generate optimization approval document (AGENT)
2. Create approval interface
3. Wait for user approval
**User Interaction**: APPROVAL REQUIRED

#### Outputs
- Optimized system with measured improvements
- Performance comparison report
- Security assessment results
- Quality gate validation
- Learning patterns captured in JSON
- **Web performance metrics** (Puppeteer-based for web projects)
- **Response file**: `[XXX]_optimize_approval.md` using auto-increment format for human approval

#### Success Criteria
- Performance targets met
- Security posture maintained/improved
- Quality gates pass
- User approves optimizations
- No performance regressions

---

### QA Command

#### Purpose
Comprehensive production readiness validation with multi-layered security assessment, specialized testing agents, and certification workflow.

#### Key Features
- BMAD production readiness gates
- SAGE testing pattern application
- Archon specialized testing agents (10+ types)
- Deep security review with remediation
- Cross-project quality patterns
- Production certification
- Deployment recommendations

#### Inputs
- Optimized system from OPTIMIZE
- Quality requirements
- Testing patterns
- Production environment specs
- User quality standards

#### Implementation

##### Step 1: Production Readiness Assessment
**Type**: HYBRID
**Tasks**:
1. Initialize enhanced QA session
2. Load testing patterns from SAGE (PATTERN_MATCHER)
3. Define BMAD readiness gates (AGENT)
4. Optimize testing strategy (STRATEGY_OPTIMIZER)

##### Step 2: Archon Testing Agent Generation
**Type**: HYBRID
**Tasks**:
1. Generate testing agents by domain:
   - Functional testing
   - Performance testing
   - Security testing (5 specialized agents)
   - Compatibility testing
   - Usability testing
2. Create comprehensive test suite
3. Configure test automation

##### Step 3: Quality Validation Execution
**Type**: HYBRID
**Tasks**:
1. Execute test categories
2. Deep security analysis (multiple security agents)
3. Automatic security remediation
4. Real-time progress updates
5. Create fix tasks for failures

##### Step 4: Comprehensive Security Review
**Type**: AGENT-BASED
**Tasks**:
1. Advanced threat modeling
2. Security architecture review
3. Compliance assessment
4. Penetration testing simulation
5. Comprehensive remediation strategy
6. Automated remediation execution
7. Security metrics calculation

##### Step 5: SAGE Learning Integration
**Type**: HYBRID
**Tasks**:
1. Capture quality patterns (LEARNING_ANALYZER)
2. Update cross-project intelligence
3. Generate quality recommendations (AGENT)

##### Step 6: Production Deployment Certification
**Type**: HYBRID
**Tasks**:
1. Generate production certification (AGENT)
2. Create approval interface
3. Wait for final approval
**User Interaction**: APPROVAL REQUIRED

##### Step 7: Final Learning Session
**Type**: HYBRID
**Tasks**:
1. Finalize learning session
2. Update project state
3. Generate final report (LEARNING_ANALYZER)

#### Outputs
- Production readiness certification
- Comprehensive test results
- Security assessment with remediation
- Quality patterns captured in JSON
- **Comprehensive web validation report** (Puppeteer full user journey testing)
- Deployment recommendations
- Risk assessment
- **Response file**: `[XXX]_qa_approval.md` using auto-increment format for human approval

#### Success Criteria
- All BMAD quality gates pass
- Security score ≥ 80/100
- No critical vulnerabilities
- User approves certification
- Production deployment authorized

---

## Web Frontend Validation Protocol

### Puppeteer Integration Requirements
**For Web Frontend Projects Only**: Browser-based validation for web UI projects

**Direct Puppeteer Usage**:
- Install via npm: `npm install puppeteer --save-dev`
- Use direct Node.js integration for browser automation
- Primary method: Direct Puppeteer npm package
- Integration with existing testing framework

### Validation Checkpoints by Command Context

**IMPLEMENT Command - Basic Functionality**:
1. Launch browser to target URL (typically `http://localhost:[port]`)
2. Capture screenshot for visual verification
3. Check browser console for JavaScript errors
4. Verify key page elements are present and rendered
5. Test basic user interactions (clicks, form inputs)

**OPTIMIZE Command - Performance Validation**:
1. Measure page load time and performance metrics
2. Check for console warnings about performance issues
3. Verify optimizations don't break functionality
4. Capture before/after performance comparisons

**QA Command - Comprehensive Testing**:
1. Full user journey testing with Puppeteer
2. Cross-browser compatibility checks (if applicable)
3. Accessibility validation and screen reader compatibility
4. Mobile responsiveness verification
5. Error handling and edge case testing

### Validation Success Criteria
**Completion Requirements**:
- Page loads without critical errors (4xx/5xx HTTP errors, JS exceptions)
- Core functionality is interactive and responsive
- Visual elements render correctly (no broken layouts, missing images)
- User workflows complete successfully end-to-end

### Fallback Strategy
**If Puppeteer Unavailable**:
1. Use `curl` or `wget` for HTTP response validation
2. Parse HTML response for required elements and structure
3. Check API endpoints directly if applicable
4. **Request human visual verification** with specific checklist
5. Document fallback approach used in response file

### Integration with Development Context
**Technology Stack Considerations**:
- **React/TypeScript/Tailwind**: Focus on component rendering and responsive design
- **Python APIs with frontend**: Validate API responses and frontend integration
- **Full-stack applications**: Test both backend functionality and frontend UX

---

## Enhancement Systems

### 1. Enhanced Error Recovery
**Location**: `docker/server/src/utils/enhanced_error_recovery.js`
- Step-level checkpoints with rollback
- Git, database, file state recovery
- Automatic recovery on failure
- Recovery history tracking

### 2. Real-time State Validation
**Location**: `docker/server/src/utils/realtime_state_validator.js`
- Pre-step validation of all dependencies
- Parallel validation execution
- Critical vs warning classification
- Performance metrics

### 3. Smart Dependency Validation
**Location**: `docker/server/src/utils/smart_dependency_validator.js`
- Auto-provision missing dependencies
- Execute provider steps automatically
- Fallback strategies
- Cross-command dependency mapping

### 4. Agent Reuse Registry
**Location**: `docker/server/src/utils/agent_reuse_registry.js`
- 95% agent reuse efficiency
- Cross-command compatibility matrix
- Performance-based selection
- Automatic cleanup

### 5. Progress Transparency System
**Location**: `docker/server/src/utils/progress_transparency_system.js`
- Real-time progress updates
- ETA calculation with learning
- Multi-level progress tracking
- Socket.io integration

### 6. Cross-Command Intelligence
**Location**: `docker/server/src/utils/cross_command_intelligence.js`
- Pattern transfer between commands
- Real-time learning capture
- Risk identification
- Optimization suggestions

---

## Usage Guide

### Starting a New Project

1. **Initialize the System**
```bash
cd integrated_context_system
npm install
```

2. **Run PLAN Command**
```bash
# Provide project description
/plan "Create a task management API with user authentication"
```

3. **Review and Approve**
- Approve understanding (Step 3)
- Approve settings (Step 5)
- Approve final plan (Step 8)

4. **Execute IMPLEMENT Command**
```bash
# Implement first prototype
/implement P1
# Or implement next prototype
/implement next
```

5. **Run OPTIMIZE Command**
```bash
# Optimize all prototypes
/optimize all
# Or specific prototype
/optimize P1
```

6. **Execute QA Command**
```bash
# Run comprehensive QA
/qa
```

### Working with Existing Projects

1. **Analyze Existing Codebase**
```bash
/plan --existing
```

2. **Resume from Interruption**
- System automatically recovers from last checkpoint
- State preserved in database and JSON storage

### Monitoring Progress

- **Kanban Board**: Real-time task updates at `http://localhost:3000`
- **Socket.io Events**: Live progress notifications
- **Progress Logs**: Detailed execution logs with ETA

### Handling Failures

- **Automatic Recovery**: System attempts rollback and retry
- **Manual Intervention**: Review fix tasks in Kanban board
- **Recovery Guidance**: System provides specific recovery steps

### Customization

#### Adjust Methodology Settings
- Edit settings in PLAN Step 5
- Modify technical requirements
- Configure validation gates

#### Add Custom Agents
- Create agent definition in `.claude/agents/`
- Update compatibility matrix
- Register in agent registry

#### Extend Learning Patterns
- Patterns stored in `../docker/learning/`
- Automatically captured during execution
- Cross-project intelligence sharing

---

## Building on This System

### Extension Points

1. **New Commands**: Add to `.claude/commands/`
2. **Custom Agents**: Define in `.claude/agents/`
3. **MCP Servers**: Configure in `.claude/mcp/mcp_index.json`
4. **Learning Patterns**: Extend JSON schemas in `../docker/learning/`
5. **Validation Gates**: Add to BMAD framework
6. **UI Components**: Extend React components in `../docker/client/`

### API Integration

- **tRPC Router**: `../docker/server/src/trpc/router.js`
- **Socket.io Handlers**: `../docker/server/src/socket/handlers.js`
- **Database Helpers**: `../docker/server/src/db/helpers/`

### Best Practices

1. **Always use TDD**: RED → GREEN → REFACTOR
2. **Create Git commits**: At each successful step
3. **Capture patterns**: Let SAGE learn from successes/failures
4. **Monitor agents**: Check reuse efficiency regularly
5. **Review approvals**: Carefully review AI recommendations
6. **Test thoroughly**: Use QA command before production

---

## Conclusion

The Integrated Context System represents a sophisticated AI-driven development framework that combines advanced methodologies (BMAD+SAGE+Archon) with practical software engineering practices. Through its four-command structure, intelligent agent orchestration, continuous learning, and comprehensive error recovery, it provides a robust foundation for rapid prototype development with production-quality results.

The system's strength lies in its ability to learn from each execution, share intelligence across commands, and automatically handle complex scenarios that would typically require manual intervention. With the recent enhancement implementations, the system now offers unprecedented reliability, transparency, and efficiency in AI-assisted software development.

For questions or contributions, refer to the individual command specifications in `.claude/commands/` and the enhancement system implementations in `docker/server/src/utils/`.