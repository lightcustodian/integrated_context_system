# Project Planning Configuration

**Purpose**: Defines the scope and depth of Context Engineering analysis and planning
**Function**: Configures system behavior for research, risk management, and documentation

## Project Overview [Multi-line responses are allowed for the items below]
- **Project Name**: Simple Task Manager
- **Project Type**: web
- **Primary Goal**: Create a basic web application for managing personal tasks with add, edit, delete, and mark complete functionality
- **Target Users**: Individual users who want to organize their daily tasks
- **Success Metrics**: Users can successfully create, manage, and complete tasks with an intuitive interface
- **Examples**: In the `2-docs/context/examples/` folder, there are examples of:
  - Basic CRUD operations for web applications
  - Simple HTML forms and JavaScript interactions
  - Local storage implementation for data persistence
  - Responsive CSS layouts for mobile and desktop
- **Documentation**: 
  - MDN Web Docs for HTML, CSS, and JavaScript: https://developer.mozilla.org/
  - Local Storage API documentation: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  - CSS Flexbox guide: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- **Other Considerations**: 
  - Keep it simple - avoid over-engineering for this basic task manager
  - Focus on vanilla JavaScript to avoid framework complexity
  - Ensure mobile responsiveness since users will access on phones
  - Use local storage instead of a database to keep setup minimal
  - AI assistants often overcomplicate simple CRUD operations - stick to basic patterns

## Configuration Summary

Based on your selections in the Technical Requirements section, the Context Engineering system will:

1. **Research Phase**: STANDARD market and technical research
2. **Risk Management**: STANDARD risk assessment and mitigation
3. **Planning Depth**: STANDARD project planning and documentation
4. **Visual Documentation**: STANDARD diagram and visualization support
5. **User Stories**: STANDARD user story development
6. **API Documentation**: STANDARD API specification and documentation

**Estimated Additional Time**: +30-45 minutes total
**Planning Artifacts Generated**: Basic configuration files, simple architecture diagram, core user stories
**Recommended For**: Simple web applications, personal projects, learning exercises

---
**Instructions**: 
1. Select one option for each requirement category
2. Save this file as `PLANNING.md` in your project root
3. Run `/init-context` to begin Context Engineering with your selected configuration
4. The system will automatically detect and use your planning configuration

**Note**: You can update this configuration at any time and re-run `/init-context` to apply changes.
---
# Technical Requirements

## Market & Technical Research Requirements
**Research Level**: MINIMAL

### NONE
- **Description**: Skip market and technical research
- **System Provides**: Basic tech stack detection only
- **Use When**: Internal tools, proof of concepts, well-understood domains
- **Time Impact**: Minimal

### MINIMAL ✓
- **Description**: Essential competitive and technical landscape analysis
- **System Provides**: 
  - Industry best practices research
  - Technology stack validation
  - Basic competitor feature analysis
  - Common implementation patterns
- **Use When**: Standard business applications, established markets
- **Time Impact**: +15-30 minutes to init-context

### STANDARD
- **Description**: Deep market analysis and technical feasibility study
- **System Provides**:
  - Detailed competitor analysis with feature comparisons
  - Market size and opportunity assessment
  - Technical risk analysis and alternatives evaluation
  - Industry trend analysis and future considerations
  - Regulatory and compliance requirements research
- **Use When**: Innovative products, new markets, high-stakes projects
- **Time Impact**: +45-90 minutes to init-context

### COMPREHENSIVE
- **Description**: Executive-level market intelligence and technical strategy
- **System Provides**:
  - Complete competitive landscape mapping
  - Business model analysis and recommendations
  - Technology roadmap and evolution planning
  - Partnership and integration opportunities
  - Investment and resource requirement analysis
- **Use When**: Startup products, enterprise initiatives, market disruption
- **Time Impact**: +2-4 hours to init-context

## Risk Management Requirements
**Risk Management Level**: MINIMAL

### NONE
- **Description**: Skip formal risk management
- **System Provides**: Basic validation gates only
- **Use When**: Low-risk projects, prototypes, internal tools
- **Risk Coverage**: None

### MINIMAL ✓
- **Description**: Essential risk identification and mitigation
- **System Provides**:
  - Technical risk assessment (complexity, dependencies)
  - Basic mitigation strategies
  - Implementation risk monitoring
- **Use When**: Standard projects with known technologies
- **Risk Coverage**: Technical and implementation risks

### STANDARD
- **Description**: Multi-dimensional risk analysis and management
- **System Provides**:
  - Technical, business, and operational risk assessment
  - Detailed mitigation strategies with contingency plans
  - Risk monitoring throughout implementation
  - Risk-adjusted validation gates
- **Use When**: Business-critical applications, complex integrations
- **Risk Coverage**: Technical, business, operational, and timeline risks

### COMPREHENSIVE
- **Description**: Full enterprise risk management framework
- **System Provides**:
  - Complete risk taxonomy and assessment
  - Risk quantification and impact analysis
  - Multi-layered mitigation strategies
  - Continuous risk monitoring and reporting
  - Stakeholder risk communication plans
- **Use When**: Enterprise systems, regulated industries, high-value projects
- **Risk Coverage**: All risk categories with quantitative analysis

## Planning Depth Requirements
**Planning Level**: MINIMAL

### NONE
- **Description**: Skip formal planning documentation
- **System Provides**: Basic tech stack configuration only
- **Use When**: Quick prototypes, proof of concepts, throwaway projects
- **Planning Artifacts**: None

### MINIMAL ✓
- **Description**: Basic project setup with standard patterns
- **System Provides**:
  - Tech stack configuration
  - Basic directory structure
  - Standard validation gates
- **Use When**: Simple projects, well-understood requirements
- **Planning Artifacts**: Basic configuration files only

### STANDARD
- **Description**: Structured planning with architectural guidance
- **System Provides**:
  - Architecture vision document
  - Implementation phases planning
  - Resource requirement estimation
  - Quality assurance framework
- **Use When**: Most business applications and features
- **Planning Artifacts**: Architecture docs, phase plans, quality framework

### COMPREHENSIVE
- **Description**: Executive-level planning with business alignment
- **System Provides**:
  - Business-aligned technical strategy
  - Multi-phase delivery planning
  - Resource optimization analysis
  - ROI and value delivery planning
  - Stakeholder communication framework
- **Use When**: Enterprise initiatives, product launches, organizational change
- **Planning Artifacts**: Strategic documents, business cases, communication plans

## Visual Documentation Requirements
**Diagram Level**: MINIMAL

### NONE
- **Description**: Text-only documentation
- **System Provides**: Comprehensive text documentation
- **Use When**: Simple projects, internal tools, rapid prototyping

### MINIMAL ✓
- **Description**: Essential system diagrams
- **System Provides**:
  - System architecture diagram
  - Basic data flow diagrams
  - User journey flowcharts
- **Use When**: Standard applications with clear workflows

### STANDARD
- **Description**: Complete visual documentation suite
- **System Provides**:
  - Architecture and system diagrams
  - Detailed user flow and process diagrams
  - Data model and relationship diagrams
  - Sequence and interaction diagrams
  - State and workflow diagrams
- **Use When**: Complex systems, team collaboration, stakeholder communication

### COMPREHENSIVE
- **Description**: Executive and stakeholder presentation materials
- **System Provides**:
  - All standard diagrams plus:
  - Executive summary visualizations
  - Business value and ROI diagrams
  - Timeline and milestone charts
  - Risk and mitigation visualizations
- **Use When**: Stakeholder presentations, funding requests, executive reviews

## User Story Development Requirements
**User Story Level**: MINIMAL

### NONE
- **Description**: Skip formal user story development
- **System Provides**: Basic feature descriptions
- **Use When**: Internal tools, technical utilities, API-only services

### MINIMAL ✓
- **Description**: Essential user stories with acceptance criteria
- **System Provides**:
  - Core user stories for main features
  - Basic acceptance criteria
  - Happy path scenarios
- **Use When**: Standard applications with clear user needs

### STANDARD
- **Description**: Complete user story framework
- **System Provides**:
  - Detailed user personas and journey mapping
  - Complete user story suite (happy path, edge cases, error scenarios)
  - Detailed acceptance criteria with examples
  - User story prioritization and dependencies
- **Use When**: User-facing applications, complex workflows, multiple user types

### COMPREHENSIVE
- **Description**: Behavior-driven development with BDD scenarios
- **System Provides**:
  - Complete user story framework plus:
  - Gherkin BDD scenarios for all stories
  - Automated acceptance test generation
  - User behavior analytics planning
- **Use When**: Quality-critical applications, regulated systems, complex user interactions

## API Specification Requirements
**API Documentation Level**: MINIMAL

### NONE
- **Description**: No formal API documentation
- **System Provides**: Basic code comments only
- **Use When**: Internal utilities, single-purpose tools, no external integrations

### MINIMAL ✓
- **Description**: Essential API documentation
- **System Provides**:
  - Endpoint documentation with examples
  - Request/response schemas
  - Basic error handling documentation
- **Use When**: Simple APIs, internal services, limited integrations

### STANDARD
- **Description**: Complete API specification
- **System Provides**:
  - Full OpenAPI/Swagger specification
  - Interactive API documentation
  - Authentication and authorization documentation
  - Rate limiting and usage guidelines
  - SDK and integration examples
- **Use When**: Public APIs, complex integrations, third-party consumption

### COMPREHENSIVE
- **Description**: Enterprise-grade API governance
- **System Provides**:
  - Complete standard documentation plus:
  - API versioning and lifecycle management
  - SLA and performance specifications
  - Security and compliance documentation
  - Developer onboarding and support materials
- **Use When**: Enterprise APIs, partner integrations, commercial API products

## TDD/BDD Strategy

### Test Framework Configuration
- **Primary Framework**: Jest
- **BDD Framework**: jest-cucumber
- **Test Organization**: happy_path, edge_case, negative_case
- **Coverage Target**: 80% minimum

### BDD Scenario Planning
- **Format**: Gherkin scenarios
- **Organization**: One feature file per major functionality
- **Traceability**: BDD scenarios linked to unit test groups

### Red-Green-Refactor Workflow
- **Enabled**: true
- **Test Groups**: Execute in order (happy → edge → negative)
- **Focused Mode**: Re-run failed test groups only