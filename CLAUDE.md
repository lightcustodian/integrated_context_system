# CLAUDE.md - Simple Context Engineering Instructions

## Primary Goals (In Order of Importance)
1. Deliver working prototypes quickly for coding projects
2. Maintain quality through testing and essential documentation
3. Enable recovery from any failure point through state management
4. Keep the system as simple as possible while achieving results

## Response File Requirements
**MANDATORY**: All responses to commands must be provided in a file named:
`response_[date]_[time]_[command_name].md`

Example: `response_2025-08-05_1902_implement.md`

This file must follow the standard approval format and be generated before command completion.

## Project Classification System

### Project Focus
- **Coding Projects Only**: System supports software development, APIs, scripts, and applications
- **Prototype-Based Development**: Each prototype is a complete, deployable deliverable
- **No Multi-Domain**: Does not support marketing, research, or design projects

### Technical Requirements Defaults
- **Market Research**: NONE (coding projects don't need market analysis)
- **Technical Research**: MINIMAL (basic research when needed) 
- **Risk Management**: NONE (keep complexity low)
- **System Architecture**: MINIMAL (basic architecture documentation)

**User Override**: These defaults can be manually adjusted for specific project needs

### Enhanced Input Methods
**Design command supports multiple input sources**:
- **Direct Description**: User provides project description in command
- **--file [filename]**: Analyze single requirements or documentation file
- **--folder [folder_path]**: Ingest entire folder of requirements/documentation
- **--existing**: Analyze existing project codebase using project_summary.py

**Smart Defaults Enhancement**:
- **Context-Aware**: Technical requirements adjusted based on project keywords
- **Project Type Detection**: Banking/financial → elevated security requirements
- **Technology Stack Analysis**: API/service projects → elevated architecture requirements
- **Internal Tools**: Simple scripts maintain minimal requirements

## Success Criteria Framework

### Project Success Measurement
**Primary Validation Gate**: Working prototypes that provide tangible user value

**Universal Standards**:
- All prototypes are independently deployable and functional
- All tests pass for each prototype
- Basic documentation enables understanding and building upon work
- Success criteria documented in DESIGN_PLAN.md achieved

### Command Success Measurement
- Each command must deliver working results (not just planning artifacts)
- Success criteria validated through testing and human approval
- State management tracks progress for recovery capability
- Response files generated for human review and approval

## Process Compliance Standards

### MANDATORY Execution Protocol
**State Management Requirements**:
- (MANDATORY) Update .claude/state/session.json at beginning of each step
- Track progress at command, step, prototype, feature, and task levels
- Maintain complete context for recovery from any failure point

**Agent Coordination Requirements**:
- Use simple, direct handoffs between PROJECT_MANAGER, CODER, TESTER, REVIEWER
- Load appropriate agents for each command as specified
- Generate response files for human approval before command completion

### Command Requirements
Every command must:
- **Load Required Agents**: Specific agents defined for each command
- **Update State**: Granular state tracking throughout execution
- **Deliver Results**: Working prototypes or functional enhancements
- **Generate Approval**: Response file for human review and approval

## Version Control Safety Protocol

### Automatic Git Commit Requirements
**MANDATORY**: Create git commits at these checkpoints to prevent work loss and enable recovery:

**Universal Application**: This protocol applies to ALL development work, including:
- Command-based development (implement, optimize, qa)
- Ad-hoc assistance outside of commands 
- Bug fixes and troubleshooting
- Feature enhancements and modifications

**Required Commit Points**:
1. **Before Each Feature**: Commit current state before starting new feature implementation
2. **After Feature Success**: Commit working feature implementation with passing tests
3. **Before Major Refactoring**: Safety checkpoint before optimization or code restructuring
4. **After Test Suite Creation**: Preserve test baseline and coverage improvements
5. **Before Debugging**: Commit working state before attempting to fix bugs
6. **After Bug Resolution**: Commit successful bug fixes with verification

### Commit Message Format
```
[Context]: [Feature/Task] - [Status]

- What: [Brief description of changes]
- Why: [Purpose/goal of changes]
- Tests: [Pass/Fail status and coverage info]

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Recovery and Rollback Protocol
- **Before Changes**: Always run `git status` and `git diff` to understand current state
- **After Failures**: Use `git diff` to show modifications since last commit
- **Emergency Recovery**: `git reset --hard HEAD` to return to last working state
- **Commit Tracking**: Maintain commit hashes in state file for progress tracking

## Web Frontend Validation Protocol

### Puppeteer Integration Requirements
**For All Web Projects**: Validation must include browser-based verification

**MCP Server Setup**:
- Request `web_automation` capability to access Puppeteer MCP server
- Primary server: `@modelcontextprotocol/server-puppeteer`
- Fallback options: Playwright, Browserbase (see .claude/mcp/mcp_index.json)

### Validation Checkpoints by Context

**Implement Command - Basic Functionality**:
1. Launch browser to target URL (typically `http://localhost:[port]`)
2. Capture screenshot for visual verification
3. Check browser console for JavaScript errors
4. Verify key page elements are present and rendered
5. Test basic user interactions (clicks, form inputs)

**Optimize Command - Performance Validation**:
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

## Simple Context Engineering Commands

### Available Commands
1. **design**: Create project understanding and basic configuration (one time: beginning)
2. **plan**: Break project into usable prototypes and configure system (one time: beginning)
3. **implement**: Build working prototypes using TDD methodology (iterative)
4. **optimize**: Improve performance, code quality, and architecture (iterative)
5. **document**: Generate comprehensive documentation (iterative)  
6. **qa**: Production readiness validation (one time: end)
7. **ce-update**: Update simple_context system itself (one time: end, framework projects only)

### Command Execution Requirements
- Read command file from .claude/commands/[command_name].md for detailed instructions
- Follow state management protocol with granular tracking
- Use specified agents for each command
- Generate response files for human approval
- Maintain MCP integration for external tool access

## Agent System

### 6-Agent Workflow
1. **STATE_MANAGER**: State management, progress tracking, recovery operations
2. **PROJECT_MANAGER**: Simple coordination, MCP integration
3. **CODER**: Writing code, following patterns, implementing features  
4. **TESTER**: Running tests, validation, debugging
5. **REVIEWER**: Quality checks, critical review (used in implement and QA commands)
6. **CONTENT_SUMMARIZER**: Documentation management, external docs fetching, 1000-line file splitting

*Note: All existing agents are preserved but only these 6 are used in standard workflow*

### Context Loading Standards
- **DESIGN_PLAN.md**: Contains project configuration and context (created by design command)
- **Command Files**: Read .claude/commands/[command_name].md for detailed command instructions
- **State File**: .claude/state/session.json tracks progress and enables recovery
- Always read DESIGN_PLAN.md first for project context before executing commands (except design command which creates it)

### File Organization Standards
**Everything stored in ROOT or .claude/ folder only**:
```
Root/
├── DESIGN_PLAN.md (project configuration)
├── [generated project files]
├── docs/
│   ├── internal/        # Project-specific documentation (fully ingested)
│   └── external/        # External documentation (selectively loaded)
│       ├── technologies/# Framework and library documentation
│       ├── concepts/    # Business and technical concepts
│       ├── apis/        # Third-party API documentation
│       └── .index.md    # Master index with 2-3 line summaries
└── .claude/
    ├── commands/        # 7 command files
    ├── agents/          # All agent files (6 active + existing preserved)  
    ├── state/           # session.json, progress tracking, backups
    ├── utils/           # project_summary.py and utilities
    ├── templates/       # DESIGN_PLAN_Template.md and other templates
    ├── planning/        # Planning documents (when technical requirements > defaults)
    │   └── templates/   # Planning document templates
    ├── mcp/            # MCP integration code and configuration
    └── docs/           # CE.md, system documentation
```

### MCP Integration Standards
**PROJECT_MANAGER handles all MCP server coordination**:
- **MCP Code Location**: `.claude/mcp/` directory
- **Context Storage**: External information from MCP servers stored in `docs/external/`
- **Capability Requests**: "Need: file_operations, version_control, testing_framework, [specific_tools]"
- **Health Monitoring**: MCP connection status and fallback procedures
- **Configuration**: MCP server settings and capability mappings in `.claude/mcp/`

### Documentation Management Standards

#### Step 2 Universal Documentation Review
**All commands (except Design) must include Step 2: Documentation Review**:
- **Internal Documentation**: Fully ingest all files in docs/internal/
- **External Documentation**: Read docs/external/.index.md and selectively load relevant docs
- **Context Establishment**: Document available resources and patterns

#### 1000-Line File Limit
**CONTENT_SUMMARIZER enforces file size limits**:
- **Maximum Size**: 1000 lines per documentation file
- **Automatic Splitting**: Large files split into focused topic files
- **Executive Summaries**: Overview documents with references to detailed files
- **Cross-References**: Maintain navigation between split documents

#### External Documentation Structure
```
docs/external/
├── technologies/        # Framework and library docs (mautic.md, django.md)
├── concepts/           # Business concepts (lead_scoring.md, lead_nurturing.md)
├── apis/              # API documentation (payment_gateway.md)
└── .index.md          # Master index with 2-3 line summaries
```

#### Smart Documentation Fetching
**Design command Phase 2 automatically gathers**:
- **Technologies**: Framework/library documentation based on project keywords
- **Integration Points**: API docs for external services
- **Business Concepts**: Research-based summaries for domain-specific needs
- **Security Features**: Guidelines for authentication, encryption, compliance

### Command and Step Structure Requirements

**Every Command Must Include**:
1. **Purpose**: Clear statement of command objectives
2. **Key Features**: List of main capabilities and functionality
3. **Inputs**: Exact file locations and required information sources
4. **Implementation**: Step-by-step process with agent coordination
5. **Outputs**: Specific file locations and deliverable specifications  
6. **Success Criteria**: Measurable completion validation standards

**Every Step Must Include**:
1. **Purpose**: Clear statement of step objectives
2. **Inputs**: Exact sources of required information
3. **Implementation**: Detailed process including STATE_MANAGER updates
4. **Outputs**: Specific deliverable locations and formats
5. **Success Criteria**: Measurable completion validation for this step

## State Management Standards

### Multi-Level State Tracking
Essential for recovery from any failure point:

```json
{
  "current_command": "implement",
  "current_step": 4,
  "step_name": "coding_loop",
  "current_prototype": "P2-email-management", 
  "current_feature": "F1-template-engine",
  "current_task": "T2-variable-substitution",
  "completed_prototypes": ["P1-deployment"],
  "last_updated": "2025-08-05T19:30:00Z"
}
```

### Recovery Capability
- System can resume from any step, prototype, feature, or task level
- Complete context preserved for recovery from failures
- Rollback capability at each tracking level
## Error Handling Standards

### Enhanced 3-Attempt Recovery Pattern
1. **Attempt 1**: [specific_approach_tried] → [specific_failure_reason]
2. **Attempt 2**: [research_conducted] → [alternative_approach] → [result]
3. **Attempt 3**: [simplified_requirements] → [final_result]
4. **Human Escalation**: "Tried X, Y, Z. Specific problem: [problem]. Need guidance on: [specific_questions]"

**Error Context Requirements**:
- Document specific approach tried in each attempt
- Explain exact failure reason, not generic errors
- Show research conducted and alternative approaches
- Present simplified requirements and final results
- Provide specific context and questions for human escalation

### State File Management
- **Session State**: `.claude/state/session.json` tracks current progress and context
- **Recovery Points**: System can resume from any failure point
- **Complete Context**: All necessary information preserved for recovery

## Approval File System

### Human Review Protocol
- Every command generates `response_[date]_[time]_[command_name].md` for human review
- Commands wait for explicit human approval before proceeding
- Approval files serve as audit trail and decision documentation

### Standard Approval File Format
```markdown
# [Command Name] Approval - [Date] [Time]

## Progress Summary
[What was accomplished in this command]

## Deliverables  
[Working prototypes or enhancements created]

## Testing Results
[Test coverage and validation outcomes]

## Next Steps
[What should happen next]

## Human Approval Required
- [ ] Results meet expectations
- [ ] Quality is appropriate  
- [ ] Ready to proceed

## Comments/Modifications
[Human feedback and corrections]
```

## MCP Integration

### Capability-Based Tool Access
**Request Pattern**: `"Need: file_operations, version_control, testing_framework, [specific_tools]"`

**Common Tool Sets**:
- **Web Projects**: file_operations, version_control, testing_framework, web_framework, database
- **API Projects**: file_operations, version_control, testing_framework, database, api_tools
- **Scripts**: file_operations, version_control, testing_framework

**Benefits**: Powerful external tool access with simple coordination

## Quality Standards

### Testing Requirements
- **Implement/Optimize**: Focus on working functionality
- **QA Command**: Appropriate test coverage for production
- **TDD Methodology**: Red-Green-Refactor cycles
- **Validation Gate**: Working prototype (primary quality measure)

### Documentation Standards
**Core Principle**: Enable new Claude Code instance to understand what was built and build upon it
- **Basic Level**: Essential documentation (implement command)  
- **Comprehensive Level**: Full documentation (document command)

---

*Simple Context Engineering Instructions*
*Streamlined system focused on delivering working prototypes quickly*