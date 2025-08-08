# Agentic Smart Default Application

## Smart Default Coordination Agent

### Agent Assignment Strategy
Load agent persona: @../agents/specialist_design.md for smart default application:

**Agent Capabilities**:
- **Project Type Detection**: Analyze description for technology indicators
- **Complexity Assessment**: Evaluate scope and feature requirements
- **Technology Matching**: Select appropriate default stack based on project characteristics
- **Requirement Configuration**: Set technical requirement levels based on project needs
- **Quality Standards Assignment**: Apply appropriate quality levels for project type

## Context-Aware Default Application

### Project Type Detection Agent Tasks
```markdown
**Technology Stack Detection**:
Agent analyzes project description for indicators:
- "web application" → React/TypeScript frontend, Python/Django backend
- "mobile app" → React Native/TypeScript cross-platform
- "desktop application" → Python/PySide native application
- "API service" → Python/FastAPI microservice architecture
- "data analysis" → Python/Jupyter notebook environment
- "machine learning" → Python/PyTorch or TensorFlow

**Complexity Level Assessment**:
Agent evaluates project scope indicators:
- 1-3 features → Simple complexity, basic requirements
- 4-6 features → Complex complexity, standard requirements  
- 7+ features → Complex complexity, comprehensive requirements
- Enterprise indicators → Complex complexity, comprehensive requirements
- Integration requirements → Complex complexity, enhanced architecture needs
```

### Dynamic Technical Requirements Agent Tasks
```markdown
**Requirement Level Selection**:
Agent configures requirements based on project characteristics:

**Market Research Assignment**:
- Consumer-facing projects → STANDARD (competitive analysis needed)
- Internal tools → MINIMAL (basic market context sufficient)
- Enterprise systems → COMPREHENSIVE (detailed market analysis required)

**Technical Research Assignment**:
- New technology stack → COMPREHENSIVE (thorough research needed)
- Familiar technology → STANDARD (best practices validation)
- Simple CRUD applications → MINIMAL (basic technical guidance)

**Risk Management Assignment**:
- Mission-critical systems → COMPREHENSIVE (extensive risk analysis)
- Business applications → STANDARD (thorough risk assessment)
- Personal projects → MINIMAL (basic risk identification)

**Planning Depth Assignment**:
- Complex multi-phase projects → COMPREHENSIVE (detailed decomposition)
- Standard applications → STANDARD (structured planning)
- Simple deliverables → MINIMAL (basic task breakdown)

**System Architecture Assignment**:
- Distributed systems → COMPREHENSIVE (complex architecture design)
- Single applications → STANDARD (structured architecture)
- Simple tools → MINIMAL (basic architecture documentation)

**Documentation Assignment**:
- Team projects → COMPREHENSIVE (complete documentation suite)
- Personal projects → STANDARD (essential documentation)
- Prototypes → MINIMAL (basic documentation only)
```

### Intelligent Placeholder Replacement Agent Tasks
```markdown
**Technology Stack Replacement**:
Agent replaces placeholders based on detected project type:
- [FRONTEND_TECH_STACK] → React/TypeScript (for web), React Native (for mobile)
- [BACKEND_TECH_STACK] → Python/Django (for web), Python/FastAPI (for API)
- [DATABASE_CHOICE] → PostgreSQL (for production), SQLite (for simple projects)
- [TESTING_FRAMEWORK] → Jest + Pytest (for full stack), Pytest (for backend only)

**Project-Specific Replacement**:
Agent customizes based on project requirements:
- [PROJECT_COMPLEXITY] → Simple (1-3 features) or Complex (4+ features)
- [QUALITY_STANDARDS] → Basic (simple projects) or Comprehensive (complex projects)
- [VALIDATION_APPROACH] → Essential gates (simple) or Multi-level (complex)
- [DOCUMENTATION_LEVEL] → Minimal (personal) or Comprehensive (team/enterprise)
```

## Default Technology Stack Application

### Web Application Defaults (Agent-Applied)
```markdown
**Technology Selection Agent Process**:
When project description indicates web application:
1. **Frontend Detection**: Agent selects React/TypeScript for interactive UIs
2. **Backend Selection**: Agent chooses Python/Django for full-featured backends
3. **Database Assignment**: Agent applies PostgreSQL for production applications
4. **Testing Framework**: Agent configures Jest (frontend) + Pytest (backend)
5. **Build Tools**: Agent sets up Vite for frontend build optimization
```

### Mobile Application Defaults (Agent-Applied)
```markdown
**Mobile Stack Selection Agent Process**:
When project description indicates mobile application:
1. **Cross-Platform Detection**: Agent selects React Native/TypeScript
2. **Backend Integration**: Agent chooses Python/FastAPI for API services
3. **State Management**: Agent configures Redux Toolkit for complex state
4. **Testing Strategy**: Agent sets up Jest + Detox for comprehensive testing
5. **Build Pipeline**: Agent establishes Expo or bare React Native setup
```

### API/Microservice Defaults (Agent-Applied)
```markdown
**API Service Selection Agent Process**:  
When project description indicates API or microservice:
1. **Framework Selection**: Agent chooses Python/FastAPI for performance
2. **Database Integration**: Agent applies PostgreSQL with SQLAlchemy ORM
3. **Authentication**: Agent configures JWT or OAuth2 based on requirements
4. **Documentation**: Agent sets up automatic OpenAPI/Swagger generation
5. **Testing Framework**: Agent establishes Pytest with API testing capabilities
```

## Agent-Based Configuration Validation

### Configuration Consistency Agent Tasks
```markdown
**Consistency Validation Agent Process**:
Agent validates all default selections for compatibility:
1. **Technology Compatibility**: Verify frontend/backend integration capabilities
2. **Requirement Alignment**: Ensure technical requirements match technology choices
3. **Quality Standards**: Confirm quality levels are appropriate for technology stack
4. **Testing Strategy**: Validate testing frameworks support selected technologies
5. **Integration Feasibility**: Verify all components can integrate successfully

**Recommendation Generation**:
Agent provides alternatives when defaults don't fit:
- Alternative technology stacks for specific requirements
- Modified technical requirement levels for better alignment
- Adjusted quality standards for project constraints
- Custom configuration options for unique project needs
```

### Smart Default Override Agent Tasks
```markdown
**Override Decision Agent Process**:
Agent determines when to override standard defaults:
1. **Constraint Analysis**: Identify project-specific constraints requiring custom approach
2. **Requirement Conflicts**: Detect when standard defaults conflict with requirements
3. **Performance Needs**: Recognize when performance requirements need different stack
4. **Integration Requirements**: Identify when existing system integration affects choices
5. **Team Expertise**: Consider when team skills require different technology choices

**Custom Configuration Generation**:
Agent creates project-specific configurations when needed:
- Custom technology combinations for unique requirements
- Specialized requirement levels for industry-specific needs
- Tailored quality standards for project constraints
- Modified validation approaches for specific project types
```

## Quality Standards Agent Assignment

### Quality Level Selection Agent Tasks
```markdown
**Quality Standards Assignment Agent Process**:
Agent determines appropriate quality levels based on project characteristics:

**Simple Projects Quality Assignment**:
- Code Quality: Basic syntax and formatting standards
- Testing Coverage: Essential functionality testing (60%+ coverage)
- Documentation: README and basic code comments
- Validation: Core functionality verification

**Complex Projects Quality Assignment**:
- Code Quality: Comprehensive analysis (security, performance, maintainability)
- Testing Coverage: Multi-level testing (80%+ coverage, integration, e2e)
- Documentation: Complete technical documentation and user guides
- Validation: Multi-domain validation (code, business, integration, stakeholder)
```

### Validation Framework Agent Configuration
```markdown
**Validation Strategy Selection Agent Process**:
Agent configures validation approach based on project needs:

**Essential Validation (Simple Projects)**:
- Input file existence validation
- Technical requirements consistency check
- Template file completeness verification
- Basic functionality validation

**Comprehensive Validation (Complex Projects)**:
- Multi-level validation gates (design, implementation, integration, stakeholder, QA)
- Extensive quality framework (code, performance, security, accessibility, business)
- Complete testing strategy (unit, integration, system, user acceptance, regression)
- Continuous quality monitoring and improvement tracking
```