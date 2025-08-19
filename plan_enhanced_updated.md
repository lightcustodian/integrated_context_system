# Enhanced PLAN Command - BMAD+SAGE+Archon Integration (Updated)

## Purpose
Create comprehensive project plan integrating BMAD validation gates, SAGE adaptive learning, and Archon agent generation with two-stage understanding validation and cross-project intelligence.

## Key Features
- **Two-Stage Understanding**: Quick validation followed by detailed analysis-based improvements
- **BMAD Integration**: Structured validation gates with stakeholder identification and quality thresholds
- **SAGE Integration**: Adaptive planning based on cross-project learning patterns and failure prevention
- **Archon Integration**: Dynamic agent generation for specialized planning tasks and knowledge base access
- **Options-Based Recommendations**: Present alternatives with AI-recommended solutions
- **Interactive Approval Workflow**: Web-based approval for understanding, settings, and plan validation
- **Cross-Project Learning**: Pattern recognition and adaptive planning based on historical project data

## Inputs
- **User Project Context**: Project description, files, or folders from user
- **Learning Patterns**: Cross-project patterns from `../docker/learning/global_patterns.json`
- **Database State**: Project state and settings from enhanced database schema
- **MCP Capabilities**: External tool access via enhanced MCP integration
- **Documentation Context**: Framework and technology documentation for project stack

## Implementation

### Step 1: Initialize Enhanced Planning Session
**Purpose**: Establish technical foundation and load learning context
**Implementation**: **PROGRAMMATIC** - Database operations and system initialization

#### Sub-Steps:
1.1. **Initialize Database Managers** (PROGRAMMATIC) - Opens SQLite database connections
1.2. **Start SAGE Learning Session** (PROGRAMMATIC) - Creates tracking session for pattern capture
1.3. **Load Historical Patterns** (AGENT) - Intelligently selects relevant patterns from past projects
1.4. **Apply Automatic Adaptations** (AGENT) - Contextually applies high-confidence improvements

**Outputs:**
- Database connections established
- Learning session ID for tracking
- Relevant historical patterns loaded
- Automatic improvements applied with reasoning

**Success Criteria:**
- Database connectivity confirmed
- Learning session active
- Historical patterns loaded and filtered for relevance
- Adaptations applied only with high confidence

### Step 2: Initial Understanding & Options Generation
**Purpose**: Quick project interpretation with options and recommendations
**Implementation**: **AGENT-BASED** - Reasoning, option generation, and recommendation logic

#### Sub-Steps:
2.1. **Initial Project Interpretation** (AGENT) - Parse user input for basic understanding
2.2. **Generate Alternative Interpretations** (AGENT) - Create 2-3 different project approaches
2.3. **Technology Stack Options** (AGENT) - Suggest technology alternatives with pros/cons
2.4. **Scope Options** (AGENT) - Present different scope levels (MVP, Standard, Comprehensive)
2.5. **Generate Focused Questions** (AGENT) - Create targeted questions to clarify ambiguities
2.6. **Recommend Preferred Approach** (AGENT) - Select and justify recommended option

**Implementation**:
```javascript
// Agent-based initial understanding with options
const INITIAL_UNDERSTANDING_AGENT = {
  name: 'INITIAL_UNDERSTANDING_AGENT',
  role: 'Generates initial project understanding with options and recommendations',
  capabilities: [
    'project_interpretation',
    'option_generation', 
    'technology_assessment',
    'scope_analysis',
    'question_formulation',
    'recommendation_logic'
  ]
};

// Agent generates initial understanding with options
const initialUnderstanding = await INITIAL_UNDERSTANDING_AGENT.process(userInput);
```

**Outputs:**
- **(USER INTERACTION)**: Initial understanding summary with confidence level
- **(USER INTERACTION)**: 2-3 alternative project interpretations with pros/cons  
- **(USER INTERACTION)**: Technology stack options with recommendations
- **(USER INTERACTION)**: Scope level options (MVP/Standard/Comprehensive)
- **(USER INTERACTION)**: Targeted clarifying questions
- **(APPROVAL REQUIRED)**: Recommended approach with justification

**Success Criteria:**
- Multiple viable interpretations generated
- Clear technology and scope options presented
- Focused questions address key ambiguities
- Recommended approach is well-justified
- User confirms or corrects understanding

### Step 3: Comprehensive Project Analysis & Context Understanding
**Purpose**: Deep analysis using BMAD+SAGE+Archon methodologies with user-confirmed understanding
**Implementation**: **AGENT-BASED** - Complex analysis requiring AI reasoning

#### Sub-Steps:
3.1. **BMAD Stakeholder Analysis** (AGENT) - Identifies stakeholders using confirmed understanding
3.2. **SAGE Pattern Matching** (AGENT) - Finds similar projects with refined context
3.3. **Archon Knowledge Integration** (AGENT) - Determines specialized knowledge needed
3.4. **Risk Pattern Analysis** (AGENT) - Identifies potential risks from historical data
3.5. **Generate Combined Recommendations** (AGENT) - Synthesizes all analyses

**Implementation**:
```javascript
// Specialized agents for deep analysis
const METHODOLOGY_ANALYST = {
  name: 'METHODOLOGY_ANALYST',
  role: 'Specializes in BMAD/SAGE/Archon integration',
  capabilities: ['stakeholder_analysis', 'pattern_matching', 'knowledge_integration']
};

const PATTERN_MATCHER = {
  name: 'PATTERN_MATCHER', 
  role: 'Expert at finding and applying historical patterns',
  capabilities: ['similarity_analysis', 'pattern_confidence', 'adaptation_logic']
};

// Comprehensive analysis using confirmed understanding
const projectAnalysis = await METHODOLOGY_ANALYST.analyzeProject(confirmedUnderstanding);
const historicalPatterns = await PATTERN_MATCHER.findSimilarProjects(projectAnalysis);
```

**Outputs:**
- Stakeholder identification with roles and requirements
- Similar project patterns with confidence scores and lessons learned
- Required specialized knowledge domains and agents
- Risk patterns identified from historical failures
- Combined methodology recommendations

**Success Criteria:**
- Stakeholders comprehensively identified using BMAD framework
- High-confidence pattern matches found and analyzed
- Knowledge gaps and required expertise identified
- Risk patterns from similar projects captured
- Analysis confidence score above 0.8

### Step 4: Detailed Understanding & Improvement Approval
**Purpose**: Present comprehensive analysis for user validation and improvement
**Implementation**: **AGENT-BASED** - Synthesis and improvement recommendation

#### Sub-Steps:
4.1. **Generate Detailed Understanding Document** (AGENT) - Comprehensive project narrative
4.2. **Create Improvement Recommendations** (AGENT) - Optimizations based on patterns
4.3. **Formulate Analysis-Based Questions** (AGENT) - Deep questions from analysis
4.4. **Generate Options for Unclear Areas** (AGENT) - Multiple approaches for ambiguous aspects
4.5. **Create Approval Interface** (PROGRAMMATIC) - Web UI presentation

**Implementation**:
```javascript
// Agent for understanding synthesis
const UNDERSTANDING_SYNTHESIZER = {
  name: 'UNDERSTANDING_SYNTHESIZER',
  role: 'Creates comprehensive understanding documents',
  capabilities: ['narrative_generation', 'improvement_analysis', 'question_formulation']
};

const understandingDocument = await UNDERSTANDING_SYNTHESIZER.generateDocument({
  initialUnderstanding: confirmedUnderstanding,
  detailedAnalysis: projectAnalysis,
  historicalPatterns: historicalPatterns,
  improvementOpportunities: improvementRecommendations
});
```

**Outputs:**
- **(APPROVAL REQUIRED)**: Comprehensive understanding document in web interface
- **(USER INTERACTION)**: Improvement recommendations with pattern-based justification
- **(USER INTERACTION)**: Analysis-based clarifying questions for remaining gaps
- **(USER INTERACTION)**: Options for ambiguous project aspects
- Confirmed project scope, stakeholders, and approach

**Success Criteria:**
- Understanding document demonstrates comprehensive project comprehension
- Improvement recommendations are pattern-based and actionable
- Analysis-based questions reveal deeper insights
- User approves understanding and accepts key recommendations

### Step 5: Settings Configuration with Web Interface Approval
**Purpose**: Configure methodology parameters with intelligent recommendations
**Implementation**: **HYBRID** - Agent recommendations with programmatic interface

#### Sub-Steps:
5.1. **Generate Context-Aware Settings** (AGENT) - Recommendations based on analysis
5.2. **Present Configuration Options** (AGENT) - Multiple preset configurations with explanations
5.3. **Create Approval Document** (PROGRAMMATIC) - Web interface formatting
5.4. **Wait for User Approval** (PROGRAMMATIC) - Approval workflow management

**Implementation**:
```javascript
// Hybrid approach: Agent reasoning + programmatic interface
const SETTINGS_ADVISOR = {
  name: 'SETTINGS_ADVISOR',
  role: 'Recommends methodology configurations',
  capabilities: ['configuration_analysis', 'preset_selection', 'trade_off_analysis']
};

const settingsRecommendations = await SETTINGS_ADVISOR.recommendSettings({
  projectAnalysis: projectAnalysis,
  userPreferences: userPreferences,
  historicalOutcomes: historicalPatterns
});

// Programmatic interface management
await settingsManager.presentConfigurationOptions(settingsRecommendations);
```

**Outputs:**
- **(APPROVAL REQUIRED)**: Settings configuration in web interface
- **(USER INTERACTION)**: Multiple preset options with trade-off analysis
- Context-aware recommendations with justification
- Saved methodology configuration for project

**Success Criteria:**
- Settings recommendations based on project-specific analysis
- Multiple viable configuration options presented
- Trade-offs clearly explained for each option
- User approves configuration matching project needs

### Step 6: MCP Integration & Capability Assessment
**Purpose**: Establish enhanced tool ecosystem for methodology implementation
**Implementation**: **HYBRID** - Agent assessment with programmatic connections

#### Sub-Steps:
6.1. **Assess Methodology-Specific Capabilities** (AGENT) - Determines tools needed for settings
6.2. **Request MCP Capabilities** (PROGRAMMATIC) - Establishes tool connections
6.3. **Validate Tool Integration** (PROGRAMMATIC) - Tests tool availability and functionality
6.4. **Configure Fallback Options** (AGENT) - Alternative approaches for unavailable tools

**Implementation**:
```javascript
// Agent determines needed capabilities based on methodology
const CAPABILITY_ASSESSOR = {
  name: 'CAPABILITY_ASSESSOR',
  role: 'Determines required tools and capabilities',
  capabilities: ['tool_requirement_analysis', 'methodology_mapping', 'fallback_planning']
};

const requiredCapabilities = await CAPABILITY_ASSESSOR.assessRequirements({
  projectSettings: approvedSettings,
  technologyStack: projectAnalysis.techStack,
  validationGates: plannedValidationGates
});

// Programmatic MCP integration
const mcpResult = await requestMCPCapabilities(requiredCapabilities);
```

**Outputs:**
- Methodology-specific capabilities identified and requested
- Tool connections established with status reporting
- Fallback procedures configured for unavailable tools
- Enhanced development ecosystem ready for implementation

**Success Criteria:**
- All critical capabilities connected or fallbacks configured
- Methodology-specific tools available for validation gates
- Integration status clearly documented
- No blocking capability failures

### Step 7: Enhanced Prototype Planning with Validation Gates
**Purpose**: Create detailed prototypes with BMAD gates and SAGE dependency analysis
**Implementation**: **HYBRID** - Agent planning with programmatic structuring

#### Sub-Steps:
7.1. **Apply SAGE Sizing Patterns** (HYBRID)
   - **What it does**: Uses historical data from similar projects to determine optimal prototype size (small=1-2 weeks, medium=3-4 weeks, large=5-8 weeks) based on project complexity, team size, and timeline constraints
   - **Agent Role**: PATTERN_MATCHER analyzes project context and selects appropriate sizing strategy from historical patterns
   - **Programmatic Role**: Applies the selected sizing rules to feature groupings and calculates effort estimates
7.2. **Intelligent Feature Extraction** (AGENT) - Groups features by business value and dependencies
7.3. **Generate BMAD Validation Gates** (AGENT) - Creates appropriate quality checkpoints
7.4. **SAGE Dependency Analysis** (AGENT) - Maps risks and inter-prototype dependencies
7.5. **Create Prototype Definitions** (HYBRID)
   - **What it does**: Generates formal prototype specifications with all metadata including business descriptions, technical requirements, success criteria, validation approaches, effort estimates, and database-ready structure
   - **Agent Role**: PROTOTYPE_PLANNER writes business-focused descriptions, success criteria, and validation approaches using natural language
   - **Programmatic Role**: Structures the agent-generated content into database schema format and creates Kanban task definitions

**Implementation**:
```javascript
// Specialized agents for prototype planning
const PROTOTYPE_PLANNER = {
  name: 'PROTOTYPE_PLANNER',
  role: 'Expert at breaking projects into deployable prototypes',
  capabilities: ['feature_analysis', 'value_grouping', 'dependency_mapping']
};

const VALIDATION_DESIGNER = {
  name: 'VALIDATION_DESIGNER',
  role: 'Creates appropriate validation gates and success criteria',
  capabilities: ['quality_gate_design', 'testing_strategy', 'acceptance_criteria']
};

const prototypes = await PROTOTYPE_PLANNER.planPrototypes({
  projectScope: confirmedScope,
  historicalPatterns: historicalPatterns,
  methodologySettings: approvedSettings
});

const validationGates = await VALIDATION_DESIGNER.designGates(prototypes);
```

**Outputs:**
- Systematically planned prototypes with clear business value
- BMAD validation gates tailored to each prototype
- SAGE-based dependency analysis with risk mitigation
- Prototype definitions ready for implementation
- Effort estimates based on historical patterns

**Success Criteria:**
- Each prototype provides independent deployable value
- Validation gates appropriate for methodology settings
- Dependencies clearly mapped with risk assessment
- Combined prototypes fulfill complete project scope
- Implementation sequence optimizes for early value delivery

### Step 8: Comprehensive Plan Generation & Approval
**Purpose**: Create final implementation plan with methodology integration
**Implementation**: **AGENT-BASED** - Plan synthesis and documentation

#### Sub-Steps:
8.1. **Generate Implementation Plan** (AGENT) - Comprehensive planning document
8.2. **Create Risk Analysis & Mitigation** (AGENT) - Pattern-based risk management
8.3. **Design Success Metrics** (AGENT) - Measurable outcomes for each phase
8.4. **Create Kanban Task Structure** (PROGRAMMATIC) - Visual project board
8.5. **Present for Final Approval** (PROGRAMMATIC) - Web interface presentation

**Implementation**:
```javascript
// Agent for comprehensive plan generation
const IMPLEMENTATION_PLANNER = {
  name: 'IMPLEMENTATION_PLANNER', 
  role: 'Creates comprehensive implementation plans',
  capabilities: ['plan_synthesis', 'documentation_generation', 'success_metrics']
};

const RISK_ANALYST = {
  name: 'RISK_ANALYST',
  role: 'Identifies and quantifies project risks',
  capabilities: ['risk_identification', 'impact_analysis', 'mitigation_planning']
};

const implementationPlan = await IMPLEMENTATION_PLANNER.generatePlan({
  prototypes: approvedPrototypes,
  validationGates: validationGates,
  methodologySettings: approvedSettings,
  riskAnalysis: await RISK_ANALYST.analyzeRisks(prototypes)
});
```

**Outputs:**
- **(APPROVAL REQUIRED)**: Complete implementation plan in web interface
- **(USER INTERACTION)**: Risk analysis with mitigation strategies
- Kanban board populated with prototype and validation tasks
- Success metrics and acceptance criteria
- Implementation sequence with dependency management

**Success Criteria:**
- Implementation plan demonstrates clear methodology integration
- Risk analysis covers identified patterns and mitigation strategies
- Success metrics are measurable and tied to business value
- Kanban structure supports visual progress tracking
- User approves complete plan for implementation

### Step 9: Finalize Planning & Learning Capture
**Purpose**: Persist planning decisions and capture patterns for future projects
**Implementation**: **HYBRID** - Agent analysis with programmatic persistence

#### Sub-Steps:
9.1. **Update Project State** (PROGRAMMATIC) - Database persistence of planning results
9.2. **Analyze Planning Success Patterns** (AGENT) - LEARNING_ANALYZER identifies what worked well in this planning session
9.3. **Capture Methodology Effectiveness** (AGENT) - LEARNING_ANALYZER records how well BMAD/SAGE/Archon integration worked
9.4. **Save Learning Session** (PROGRAMMATIC) 
   - **What it does**: Persists all captured learning data (successful decisions, user feedback, timing data, methodology effectiveness scores) to database tables and JSON storage for future retrieval and analysis
9.5. **Update Cross-Project Intelligence** (HYBRID)
   - **What it does**: Updates the global pattern library (global_patterns.json) with new successful patterns discovered during this planning session, including confidence scores and applicability contexts
   - **Agent Role**: LEARNING_ANALYZER analyzes which patterns should be added/updated and determines their confidence scores
   - **Programmatic Role**: Updates JSON files and database records with the new pattern data

**Implementation**:
```javascript
// Agent analyzes planning effectiveness
const LEARNING_ANALYZER = {
  name: 'LEARNING_ANALYZER',
  role: 'Analyzes planning effectiveness for future improvement',
  capabilities: ['pattern_extraction', 'effectiveness_analysis', 'recommendation_generation']
};

const planningLessons = await LEARNING_ANALYZER.analyzePlanningSession({
  initialUnderstanding: initialUnderstanding,
  finalPlan: approvedPlan,
  userFeedback: userApprovals,
  methodologyIntegration: methodologyResults
});

// Programmatic persistence
await stateManager.saveProjectState({
  phase: 'implementation_ready',
  prototypes: approvedPrototypes,
  validationGates: validationGates,
  learningSession: learningSessionId
});
```

**Outputs:**
- Project state saved with complete planning context
- Learning patterns captured from planning process
- Methodology effectiveness documented
- Cross-project intelligence updated
- Implementation phase ready to begin

**Success Criteria:**
- All planning decisions persisted in database
- Learning patterns captured for future projects
- Methodology integration effectiveness measured
- Cross-project pattern library updated
- Ready for enhanced implement command

## New Agent Profiles Required

### INITIAL_UNDERSTANDING_AGENT
**Role**: Generates quick project interpretation with options and recommendations
**Capabilities**: project_interpretation, option_generation, technology_assessment, scope_analysis

### METHODOLOGY_ANALYST  
**Role**: Specializes in BMAD/SAGE/Archon integration and analysis
**Capabilities**: stakeholder_analysis, pattern_matching, knowledge_integration

### PATTERN_MATCHER
**Role**: Expert at finding and applying historical project patterns
**Capabilities**: similarity_analysis, pattern_confidence, adaptation_logic

### UNDERSTANDING_SYNTHESIZER
**Role**: Creates comprehensive understanding documents and improvements
**Capabilities**: narrative_generation, improvement_analysis, question_formulation

### SETTINGS_ADVISOR
**Role**: Recommends methodology configurations based on project analysis
**Capabilities**: configuration_analysis, preset_selection, trade_off_analysis

### CAPABILITY_ASSESSOR
**Role**: Determines required tools and capabilities for methodology implementation
**Capabilities**: tool_requirement_analysis, methodology_mapping, fallback_planning

### PROTOTYPE_PLANNER
**Role**: Expert at breaking projects into deployable prototypes with business value
**Capabilities**: feature_analysis, value_grouping, dependency_mapping

### VALIDATION_DESIGNER
**Role**: Creates appropriate validation gates and success criteria
**Capabilities**: quality_gate_design, testing_strategy, acceptance_criteria

### IMPLEMENTATION_PLANNER
**Role**: Creates comprehensive implementation plans with methodology integration
**Capabilities**: plan_synthesis, documentation_generation, success_metrics

### RISK_ANALYST
**Role**: Identifies and quantifies project risks with mitigation strategies
**Capabilities**: risk_identification, impact_analysis, mitigation_planning

### LEARNING_ANALYZER
**Role**: Analyzes planning effectiveness for continuous improvement
**Capabilities**: pattern_extraction, effectiveness_analysis, recommendation_generation

## Outputs
- **Two-Stage Understanding**: Quick validation followed by comprehensive analysis
- **Options-Based Recommendations**: Multiple approaches with AI-recommended solutions
- **Enhanced Database State**: Complete project state with methodology configuration
- **Specialized Agent Network**: 11 specialized agents for different planning aspects
- **Interactive Approval Workflow**: Multiple approval points with user control
- **Prototype Task Structure**: Kanban board with visually distinct prototype tasks
- **Learning Intelligence**: Captured patterns for cross-project improvement
- **Implementation Readiness**: Fully planned project ready for enhanced implement command

## Success Criteria
- **Two-Stage Understanding**: User confirms understanding early and validates detailed analysis
- **Options-Based Planning**: Multiple viable approaches presented with clear recommendations
- **Methodology Integration**: BMAD+SAGE+Archon successfully integrated throughout planning
- **Agent Specialization**: Complex reasoning tasks handled by specialized agents
- **Minimal Human Involvement**: Strategic approval points without excessive interaction
- **Database State Management**: All state managed via database (not session.json files)
- **Cross-Project Learning**: Patterns captured and applied for continuous improvement
- **Implementation Ready**: Project fully planned with clear next steps for implementation

## Recovery Support
Enhanced recovery using database state and agent coordination:
- **State Recovery**: Resume from any step using database project state
- **Agent Recovery**: Reload specialized agents and continue from interruption point  
- **Learning Session Recovery**: Restore learning context and continue pattern capture
- **Approval Recovery**: Check approval status in web interface and resume workflow
- **Prototype Recovery**: Restore prototype definitions and validation gates from database