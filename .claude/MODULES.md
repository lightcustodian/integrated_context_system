# Comprehensive Supported Modules and Design Goals

## Supported Modules

### Core Modules (Required)

1. **commands_system**
   - **Purpose**: Five core commands for complete workflow with enhanced orchestration
   - **Implementation**: Agent-driven command execution with MCP integration
   - **Files**: `.claude/commands/init-context.md`, `.claude/commands/create-prp.md`, `.claude/commands/execute-prp.md`, `.claude/commands/validate.md`, `.claude/commands/help.md`
   - **Used by**: System workflow
   - **Creates**: Command execution framework with external tool coordination

2. **template_engine**
   - **Purpose**: Generates markdown files with placeholder replacement (`[PROJECT_NAME]`, `[TECH_STACK]`)
   - **Implementation**: Agent creates all content, minimal Python utility for placeholder interpolation only when needed
   - **Files**: `.claude/utils/template_engine.py` (~40 lines, optional)
   - **Used by**: All commands
   - **Creates**: CLAUDE.md, PLANNING_Template.md, README.md, configuration files

3. **file_operations**
   - **Purpose**: Creates directories, handles file I/O only when agent capabilities are insufficient
   - **Implementation**: Minimal Python utility class for reliability-critical operations
   - **Files**: `.claude/utils/file_ops.py` (~30 lines, optional)
   - **Used by**: All commands (only when needed)
   - **Creates**: Directories, project structure (when agent cannot reliably perform)

4. **state_management**
   - **Purpose**: Progress tracking, context preservation, validation state, recovery support with tool status
   - **Implementation**: Agent manages state logic, minimal Python for JSON reliability
   - **Files**: `.claude/utils/state_manager.py` (~50 lines, optional), `.claude/state/session.json`, `.claude/settings.json`
   - **Used by**: All commands
   - **Creates**: `.claude/state/session.json`, `.claude/settings.json`, progress tracking data with tool integration status

5. **tech_detection**
   - **Purpose**: Identifies project technology stack (Python, JavaScript, TypeScript, or default to Python)
   - **Implementation**: Agent-driven analysis of project files and structure
   - **Used by**: `/init-context`, `/create-prp`
   - **Creates**: Tech stack configuration data

6. **approval_gates**
   - **Purpose**: Each command produces summary, waits for user approval before proceeding
   - **Implementation**: Agent generates summary including tool status, simple user confirmation prompt
   - **Used by**: All commands
   - **Creates**: Command summaries with tool integration status, user approval prompts

### Feature Modules (Required)

7. **planning_system**
   - **Purpose**: Generates planning documents based on PLANNING.md complexity settings with research tool integration
   - **Implementation**: Agent creates documents using external research tools, templates provide structure
   - **Files**: `2-docs/planning/*.md` (6 planning documents)
   - **Used by**: `/init-context`
   - **Creates**: `2-docs/planning/project-analysis.md`, `2-docs/planning/market-research.md`, `2-docs/planning/technical-research.md`, `2-docs/planning/architecture-vision.md`, `2-docs/planning/risk-assessment.md`, `2-docs/planning/visual-documentation-plan.md`

8. **feature_decomposition**
   - **Purpose**: Breaks complex projects into manageable, progressive feature requests with clear code/non-code separation
   - **Implementation**: Agent analyzes project complexity using research tools and creates multiple features with appropriate task boundaries
   - **Files**: `2-docs/features/FR-XXX-*.md`, `2-docs/features/feature-registry.json`, `2-docs/features/project-requirements.md`, `2-docs/features/project-design.md`
   - **Used by**: `/create-prp`, `/execute-prp`, `/validate`
   - **Creates**: Individual feature documents, feature registry, project-level requirements and design documents

9. **specialized_agents**
   - **Purpose**: Enhanced orchestration agent + specialized roles with external tool access
   - **Implementation**: Agent role definitions in markdown with tool integration capabilities
   - **Files**: Role definitions in `.claude/agents/` directory
   - **Used by**: All commands for different aspects (research, analysis, coding, validation, stakeholder review)
   - **Creates**: Role-specific outputs with tool enhancement, specialized analysis reports, stakeholder validation results

10. **validation_framework**
    - **Purpose**: Multi-level validation for both software and non-software projects with testing tool integration
    - **Implementation**: Agent follows validation methodology using testing tools, templates provide structure
    - **Files**: Validation templates, validation strategy documents
    - **Used by**: `/execute-prp`, `/validate`
    - **Creates**: Validation results with tool verification, quality assessments, validation documentation

11. **tdd_support**
    - **Purpose**: Red-Green-Refactor workflow for improved code quality with testing framework integration
    - **Implementation**: Agent follows TDD methodology using testing tools, test templates provide structure
    - **Files**: Test templates and scenarios
    - **Used by**: `/execute-prp`, `/validate`
    - **Creates**: Test files using testing frameworks (Happy Path, Edge Case, Negative Case), TDD workflow documentation

12. **comprehensive_logging**
    - **Purpose**: Track all operations including tool interactions for debugging and recovery
    - **Implementation**: Agent logs decisions and tool usage, minimal Python utilities log critical operations
    - **Files**: `.claude/logs/` directory
    - **Used by**: All commands
    - **Creates**: `.claude/logs/command-execution.log`, `.claude/logs/error.log`, `.claude/logs/mcp-health.log`, operation tracking files

### Integration Modules (Enhanced)

13. **mcp_integration**
    - **Purpose**: Intelligent external tool access through capability-based requests
    - **Implementation**: MCP Agent coordinates tool access, Orchestration Agent requests capabilities, specialists use tools transparently
    - **Files**: `.claude/agents/core_mcp.md`, `.claude/utils/mcp_health.py`, `2-docs/external/mcp_index.json`, `2-docs/external/runtime-mcp-registry.json`
    - **Used by**: All commands for enhanced functionality
    - **Creates**: Tool connection management, capability-based access, health monitoring, external tool integration

14. **external_capabilities**
    - **Purpose**: 25+ external tools for enhanced development, research, testing, and collaboration
    - **Implementation**: Capability-based tool access with automatic fallback and health monitoring
    - **Categories**: Essential (filesystem, git, memory), Development (GitHub, testing, databases), Research (web search, documentation), Marketing (social media, analytics), Design (Figma, image generation)
    - **Used by**: All commands based on capability requirements
    - **Creates**: Enhanced agent capabilities, external service integration, powerful tool access

### Infrastructure Modules (Enhanced)

15. **modular_framework**
    - **Purpose**: Enable easy expansion with new commands, agents, features, and external tools
    - **Implementation**: Detailed README documentation, standardized interfaces, tool integration patterns
    - **Files**: README.md, command file headers, module documentation, MCP configuration
    - **Used by**: System architecture
    - **Creates**: README.md, module documentation, command file headers, tool integration guides

16. **agent_python_separation**
    - **Purpose**: Clear division of responsibilities between Agent, Python utilities, and external tools
    - **Implementation**: Agent handles all logic with tool access, Python handles only reliability-critical operations, MCP handles external tool coordination
    - **Used by**: All system components
    - **Creates**: Clear architectural boundaries, responsibility definitions, tool access patterns

## Design Goals

### Core Design Principles
1. **File Size Limit**: Maximum 500 lines per file for AI agent compatibility
2. **AI-First Design**: Leverage AI agents for intelligence with external tool access, minimal utilities for reliability
3. **Modularity**: Each component is self-contained and replaceable
4. **Simplicity**: Minimize complexity while maintaining powerful functionality through external tools

### System Architecture Goals
5. **Clear Separation**: Claude Code handles logic with tool access, Python handles only reliability-critical file I/O, MCP handles external tool coordination
6. **Traceability**: Clear execution paths and decision points throughout system including tool interactions
7. **Extensibility**: Easy to add new commands, agents, features, and external tools through modular design
8. **Reliability**: Robust error handling, state management, and tool fallback for production use

### User Experience Goals
9. **Documentation-Driven**: README and command headers explain everything clearly including tool capabilities
10. **Progressive Disclosure**: Start simple, add complexity and tool access only when needed
11. **User Control**: Approval gates ensure user oversight and understanding of tool usage
12. **Developer Experience**: Clear documentation, intuitive workflows, and transparent tool integration

### Quality and Maintenance Goals
13. **Quality Focus**: Multi-level validation methodology for all project types with tool verification
14. **Backward Compatibility**: Support existing projects through modular framework and graceful tool degradation
15. **Error Handling**: Agent handles logic errors, minimal Python handles critical operation errors, MCP handles tool failures with fallback
16. **Recovery**: State management enables recovery from any interruption point including tool connection restoration

### Operational Goals
17. **Fail-Safe**: System can recover from any interruption point including tool failures
18. **Performance**: Minimize AI agent context switching and complexity, optimize tool connection reuse
19. **Maintainability**: Clear separation of concerns and responsibilities including tool management
20. **Flexibility**: Support multiple tech stacks, project types (software and non-software), and external tool configurations

### Integration Goals
21. **Agent-Driven Compatibility**: AI agent handles version checking, module compatibility, and tool coordination
22. **Graceful Degradation**: System works with partial/missing components and tool failures
23. **Context Preservation**: Maintain project settings, user preferences, and tool status across sessions
24. **Validation State**: Track which validation steps have passed including tool-based validations for recovery

## Enhanced Multi-Agent Orchestration

### Core Agents with Tool Integration
- **Orchestration Agent**: Primary coordinator managing overall workflow and tool coordination
- **MCP Agent**: External tool connection management and capability-based access
- **Analyzer Agent**: Project analysis, requirement gathering, complexity assessment with research tools
- **Researcher Agent**: Market research, technical research, best practice identification using web search and documentation tools

### Implementation Agents with Tool Access
- **Code Writer Agent**: Code implementation, TDD methodology execution using file operations, version control, and testing tools
- **Validation Agent**: Quality validation for all deliverable types using testing frameworks and validation tools
- **Validation Designer Agent**: Create comprehensive validation approaches with tool integration
- **Stakeholder Agent**: Simulate stakeholder review and approval processes (for non-software components)

### Communication Agents with External Capabilities
- **Summarizer Agent**: Progress summaries, documentation synthesis, report generation using documentation tools
- **Content Creator Agent**: Documentation creation, user guides, technical writing with content creation tools

### Specialist Agents with Domain Tools
- **Marketing Specialist**: Marketing strategy, campaigns, content marketing using social media and analytics tools
- **Web Design Specialist**: UI/UX design, user experience optimization using design tools
- **Finance Specialist**: Financial modeling, budget analysis, cost optimization using data analysis tools
- **Security Specialist**: Security architecture, vulnerability assessment using security tools
- **Performance Specialist**: Performance optimization, scalability analysis using monitoring tools

## Module Dependencies

### Command → Module Mapping with Tool Integration
- **`/init-context`**: commands_system, template_engine, file_operations, state_management, tech_detection, approval_gates, planning_system, specialized_agents, mcp_integration, external_capabilities, comprehensive_logging
- **`/create-prp`**: commands_system, template_engine, file_operations, state_management, tech_detection, approval_gates, feature_decomposition, specialized_agents, mcp_integration, external_capabilities, comprehensive_logging, validation_framework
- **`/execute-prp`**: commands_system, file_operations, state_management, approval_gates, feature_decomposition, specialized_agents, tdd_support, validation_framework, mcp_integration, external_capabilities, comprehensive_logging
- **`/validate`**: commands_system, file_operations, state_management, approval_gates, feature_decomposition, specialized_agents, validation_framework, mcp_integration, external_capabilities, comprehensive_logging
- **`/help`**: commands_system, state_management, specialized_agents, mcp_integration

### Infrastructure Used by All
- modular_framework (documentation and structure)
- agent_python_separation (architectural principle)
- mcp_integration (external tool access)

## Implementation Notes

### Enhanced Agent Responsibilities
- All logic and decision making with external tool access
- Content creation (documentation, code, test scenarios, non-software deliverables) using appropriate tools
- Research and analysis using web search and documentation tools
- Problem solving and optimization with structured reasoning tools
- Version checking and module compatibility
- User interaction and guidance
- Stakeholder simulation and validation
- Multi-level validation execution with testing and validation tools

### MCP Agent Responsibilities
- Capability-to-server mapping and connection management
- Tool health monitoring and automatic fallback
- Transparent tool access for specialist agents
- Connection optimization and reuse
- Emergency capability expansion during execution

### Python Utility Responsibilities (Minimal)
- Network timeout handling (MCP integration only)
- Critical file operations (only when agent reliability is insufficient)
- JSON operations (only when structure consistency is critical)
- Template interpolation (only when needed for reliability)

### Total Code Estimate
- **Python Utilities**: ~200 lines total across all modules (increased for MCP health monitoring)
- **Agent Logic**: 0 lines (handled in markdown documentation)
- **Templates**: Markdown files with placeholders
- **Documentation**: Comprehensive README and command documentation
- **MCP Configuration**: JSON configuration files for external tool access

## External Tool Categories

### Essential Tools (Always Available)
- **Filesystem**: File operations and project structure access
- **Git**: Version control and change tracking
- **Memory**: Session persistence and context continuity
- **Sequential Thinking**: Dynamic problem-solving and structured analysis

### Development Tools
- **GitHub/GitLab**: Repository management and collaboration
- **Testing Frameworks**: Jest, pytest, Playwright for automated testing
- **Databases**: PostgreSQL, SQLite for data operations
- **Docker**: Container management and deployment

### Research and Information Tools
- **Web Search**: Brave Search, Exa, DuckDuckGo for current information
- **Documentation**: Context7, Firecrawl for up-to-date documentation
- **Academic Research**: arXiv for scholarly papers
- **Content Analysis**: Excel, data analysis tools

### Marketing and Social Tools
- **Social Media**: Twitter, LinkedIn, Facebook for marketing
- **Design**: Figma, EverArt for visual content creation
- **Analytics**: Performance tracking and measurement
- **Communication**: Slack for team coordination

### Specialized Tools
- **Browser Automation**: Puppeteer, Playwright for web automation
- **Time Operations**: Scheduling and timezone handling
- **Custom Development**: FastMCP for custom tool creation

## Project Type Support with Tool Integration

### Software Development Projects
- Full TDD support with testing frameworks (Jest, pytest, Playwright)
- Code quality validation using code analysis tools
- Technical documentation with documentation tools
- Performance and security validation with specialized tools
- Repository management with GitHub/GitLab integration

### Non-Software Projects
- Stakeholder Agent validation for deliverable quality
- Content quality standards with content creation tools
- Project-specific validation criteria (marketing with social media tools, research with web search, design with design tools)
- Integration validation for mixed projects

### Mixed Projects
- Clear separation between code and non-code features
- Coordinated validation across different deliverable types using appropriate tools
- Interface validation between code and non-code components
- Specialized agent coordination with domain-specific tool access

## Validation Framework Enhancement with Tool Integration

### Multi-Level Validation with Tools
- **Task-Level**: Individual deliverable validation (code tests with testing frameworks, content quality with content tools, design standards with design tools)
- **Feature-Level**: Component integration and stakeholder validation using integration testing tools
- **Project-Level**: Complete project acceptance and success criteria validation using comprehensive tool suite

### Validation Adaptations with External Tools
- **Software Projects**: Code testing with Jest/pytest, integration testing with Playwright, performance testing with monitoring tools
- **Non-Software Projects**: Content validation with content tools, stakeholder review simulation, quality standards with domain tools
- **Mixed Projects**: Coordinated validation across all deliverable types using appropriate tool combinations

## Capability-Based Tool Access

### Efficient Tool Management
- **One Request Per Command**: Orchestration Agent analyzes all planned work and requests all needed capabilities upfront
- **Server Type Connections**: One connection per server type (filesystem, git, web_search, etc.) with automatic fallback chains
- **Persistent Connections**: Maintain connections throughout command execution, reuse across commands
- **Emergency Expansion**: Handle unexpected capability needs during execution

### Tool Categories and Capabilities
- **file_operations**: filesystem server for file management
- **version_control**: git server for repository operations
- **web_search**: brave-search → exa → duckduckgo fallback chain
- **testing_framework**: jest for JS/TS, pytest for Python
- **database_operations**: postgres → sqlite fallback
- **social_media**: twitter → linkedin → facebook fallback
- **design_access**: figma for design system integration
- **web_automation**: puppeteer → playwright → browserbase fallback

This enhanced framework ensures consistent quality and systematic development across all project types while providing powerful external tool access through intelligent orchestration, maintaining the flexibility to handle diverse development needs with professional-grade external capabilities.