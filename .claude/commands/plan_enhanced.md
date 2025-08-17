# Enhanced PLAN Command - BMAD+SAGE+Archon Integration

## Purpose
Create comprehensive project plan integrating BMAD validation gates, SAGE adaptive learning, and Archon agent generation with approval workflow and cross-project intelligence.

## Key Features
- **BMAD Integration**: Structured validation gates with stakeholder identification and quality thresholds
- **SAGE Integration**: Adaptive planning based on cross-project learning patterns and failure prevention
- **Archon Integration**: Dynamic agent generation for specialized planning tasks and knowledge base access
- **Settings Configuration**: Web interface approval for methodology parameters (NONE/MINIMAL/STANDARD/COMPREHENSIVE)
- **Prototype Planning**: Systematic breakdown with dependency mapping and validation criteria
- **Approval Workflow**: Interactive web-based approval for understanding, improvements, and plan validation
- **Cross-Project Learning**: Pattern recognition and adaptive planning based on historical project data

## Inputs
- **User Project Context**: Project description, files, or folders from user
- **Learning Patterns**: Cross-project patterns from `../docker/learning/global_patterns.json`
- **Database State**: Project state and settings from enhanced database schema
- **MCP Capabilities**: External tool access via enhanced MCP integration
- **Documentation Context**: Framework and technology documentation for project stack

## Implementation

### Step 1: Initialize Enhanced Planning Session
**Purpose**: Set up comprehensive planning context with methodology integration and learning system initialization

**Inputs**:
- User project input (description, files, or folders)
- Database project state from `project_state` table
- Cross-project learning patterns from JSON storage
- MCP capability requirements

**Implementation**:
```javascript
// Enhanced planning session initialization
import { DatabaseStateManager, ProjectSettingsManager } from '../db/helpers/state_manager.js';
import { LearningManager } from '../db/helpers/learning_manager.js';
import { jsonLearningStorage } from '../utils/json_learning_storage.js';

// 1. Initialize state and learning managers
const stateManager = new DatabaseStateManager(projectId);
const settingsManager = new ProjectSettingsManager(projectId);
const learningManager = new LearningManager(projectId);

// 2. Start learning session for planning optimization
const learningSessionId = await learningManager.startLearningSession('plan', 'hybrid', {
  projectType: projectAnalysis.type,
  complexity: projectAnalysis.complexity,
  techStack: projectAnalysis.technologies,
  timeConstraints: 'normal',
  userExperience: 'experienced'
});

// 3. Set current planning operation
await stateManager.setCurrentOperation('plan', 'initialization', {
  learningSessionId,
  projectAnalysis,
  startTime: Date.now()
});

// 4. Load historical patterns for similar projects
const historicalPatterns = await learningManager.findSimilarContexts(projectAnalysis.context, 'plan');

// 5. Apply automatic planning adaptations
const appliedAdaptations = await learningManager.applyAutomaticAdaptations(projectAnalysis.context, 'plan');

console.log(`🧠 SAGE: Applied ${appliedAdaptations.length} automatic planning adaptations`);
```

**Outputs**:
- Enhanced project state initialized in database
- SAGE learning session started for planning optimization
- Historical patterns loaded for adaptive planning
- Automatic adaptations applied based on similar project experiences

**Success Criteria**:
- Project state successfully stored in database (not session.json)
- Learning session active for pattern capture
- Historical patterns identified and loaded
- Any high-confidence adaptations automatically applied

### Step 2: Project Analysis & Context Understanding (BMAD + SAGE)
**Purpose**: Comprehensive project analysis using BMAD stakeholder identification and SAGE pattern recognition

**Inputs**:
- User project description, files, or folder contents
- Historical project patterns from learning system
- BMAD analysis frameworks
- Technology stack detection algorithms

**Implementation**:
```javascript
// Enhanced project analysis with methodology integration
async function analyzeProjectWithMethodologies(userInput, historicalPatterns) {
  // BMAD Stakeholder Analysis
  const stakeholderAnalysis = {
    primary_stakeholders: [],
    secondary_stakeholders: [],
    validation_requirements: [],
    approval_gates: []
  };
  
  // Analyze project input for stakeholder identification
  if (userInput.type === 'description') {
    stakeholderAnalysis.primary_stakeholders = extractStakeholders(userInput.content);
  } else if (userInput.type === 'files') {
    stakeholderAnalysis = analyzeFilesForStakeholders(userInput.files);
  }
  
  // SAGE Pattern Matching
  const sageAnalysis = {
    similar_projects: historicalPatterns.filter(p => p.confidence > 0.7),
    risk_patterns: identifyRiskPatterns(userInput, historicalPatterns),
    optimization_opportunities: findOptimizations(userInput, historicalPatterns),
    recommended_approaches: getRecommendedApproaches(historicalPatterns)
  };
  
  // Archon Knowledge Integration
  const archonAnalysis = {
    required_agents: determineRequiredAgents(userInput),
    knowledge_sources: identifyKnowledgeSources(userInput.techStack),
    documentation_needs: assessDocumentationNeeds(userInput),
    integration_points: findIntegrationPoints(userInput)
  };
  
  // Combined analysis with confidence scoring
  return {
    bmad: stakeholderAnalysis,
    sage: sageAnalysis,
    archon: archonAnalysis,
    overall_confidence: calculateOverallConfidence([stakeholderAnalysis, sageAnalysis, archonAnalysis]),
    recommendations: generateRecommendations(stakeholderAnalysis, sageAnalysis, archonAnalysis)
  };
}

// Capture analysis step for learning
learningManager.captureExecutionStep('project_analysis', {
  status: 'success',
  methodologies: ['bmad', 'sage', 'archon'],
  stakeholders_identified: analysis.bmad.primary_stakeholders.length,
  patterns_matched: analysis.sage.similar_projects.length,
  agents_required: analysis.archon.required_agents.length
}, analysisTime);
```

**Outputs**:
- Comprehensive project analysis with BMAD stakeholder identification
- SAGE pattern matching results with confidence scores
- Archon agent requirements and knowledge source identification
- Combined methodology recommendations with optimization opportunities

**Success Criteria**:
- Stakeholders identified using BMAD framework
- Similar project patterns found and analyzed
- Required agents and knowledge sources determined
- Analysis confidence score above threshold (0.7)

### Step 3: Settings Configuration with Web Interface Approval
**Purpose**: Present methodology configuration options in web interface for user approval

**Inputs**:
- Project analysis results from Step 2
- Default methodology settings from database
- User preferences from historical learning patterns

**Implementation**:
```javascript
// Generate project-specific settings recommendations
async function generateSettingsRecommendations(projectAnalysis, userPatterns) {
  const recommendations = {};
  
  // Analyze project to recommend preset configuration
  if (projectAnalysis.complexity === 'high' || projectAnalysis.hasSecurityRequirements) {
    recommendations.preset = 'Enterprise System';
    recommendations.defaults = {
      security_testing: 'COMPREHENSIVE',
      performance_testing: 'STANDARD',
      documentation: 'COMPREHENSIVE',
      sage_learning_depth: 'STANDARD',
      bmad_validation_gates: 'COMPREHENSIVE'
    };
  } else if (projectAnalysis.type === 'webapp') {
    recommendations.preset = 'Web Application';
    recommendations.defaults = {
      security_testing: 'STANDARD',
      performance_testing: 'MINIMAL',
      documentation: 'STANDARD',
      integration_testing: 'STANDARD'
    };
  } else {
    recommendations.preset = 'Standard Project';
    recommendations.defaults = await settingsManager.getProjectSettings(); // Use existing defaults
  }
  
  return recommendations;
}

// Initialize default settings for project
await settingsManager.initializeDefaultSettings();

// Generate recommendations based on analysis
const settingsRecommendations = await generateSettingsRecommendations(projectAnalysis, userPatterns);

// Create settings approval document
const settingsApproval = await approvalManager.createApproval(
  'plan',
  'settings_configuration',
  'settings',
  'Project Methodology Configuration',
  generateSettingsApprovalContent(settingsRecommendations),
  false // Requires user approval
);

// Emit to web interface for settings configuration
socket.emit('settings_approval_required', {
  projectId,
  approvalId: settingsApproval.id,
  recommendations: settingsRecommendations,
  availableSettings: await settingsManager.getSettingsForWebInterface()
});

console.log(`⚙️  Settings configuration available in web interface`);
console.log(`📋 Recommended preset: ${settingsRecommendations.preset}`);

// Wait for settings approval
await waitForSettingsApproval(settingsApproval.id);
```

**Outputs**:
- Project-specific settings recommendations based on analysis
- Settings approval card created in web interface
- Preset configuration recommended with explanation
- Settings configuration awaiting user approval in web interface

**Success Criteria**:
- Settings recommendations generated based on project analysis
- Web interface displays settings approval cards with color-coded options
- User can modify settings and approve configuration
- Settings approval properly captured in database

### Step 4: MCP Integration & Capability Assessment
**Purpose**: Enhanced MCP integration with methodology-specific capability requests

**Inputs**:
- Project technology stack and requirements
- Settings configuration from Step 3
- MCP capability mappings
- Methodology-specific tool requirements

**Implementation**:
```javascript
// Enhanced MCP capability assessment
async function assessMethodologyCapabilities(projectSettings, techStack) {
  const requiredCapabilities = ['file_operations', 'version_control'];
  
  // Add capabilities based on methodology settings
  if (projectSettings.security_testing !== 'NONE') {
    requiredCapabilities.push('security_scanning', 'vulnerability_assessment');
  }
  
  if (projectSettings.performance_testing !== 'NONE') {
    requiredCapabilities.push('performance_testing', 'load_testing');
  }
  
  if (projectSettings.sage_learning_depth !== 'NONE') {
    requiredCapabilities.push('pattern_analysis', 'learning_storage');
  }
  
  if (projectSettings.archon_agent_generation !== 'NONE') {
    requiredCapabilities.push('agent_generation', 'knowledge_base_access');
  }
  
  // Add tech-stack specific capabilities
  if (techStack.includes('react')) {
    requiredCapabilities.push('component_testing', 'ui_testing');
  }
  
  if (techStack.includes('api') || techStack.includes('backend')) {
    requiredCapabilities.push('api_testing', 'database_operations');
  }
  
  return requiredCapabilities;
}

// Request enhanced capabilities from MCP Agent
const requiredCapabilities = await assessMethodologyCapabilities(projectSettings, projectAnalysis.techStack);

console.log(`🔧 Requesting MCP capabilities: ${requiredCapabilities.join(', ')}`);

// Use existing MCP Agent via core_mcp.md pattern
const mcpResult = await requestMCPCapabilities(requiredCapabilities);

if (mcpResult.success) {
  console.log(`✅ MCP Integration: ${mcpResult.connectedCapabilities.length} capabilities available`);
} else {
  console.log(`⚠️  MCP Integration: Some capabilities unavailable, proceeding with available tools`);
}

// Capture MCP integration results for learning
learningManager.captureExecutionStep('mcp_integration', {
  status: mcpResult.success ? 'success' : 'partial',
  requested_capabilities: requiredCapabilities.length,
  available_capabilities: mcpResult.connectedCapabilities.length,
  methodology_integration: true
}, mcpIntegrationTime);
```

**Outputs**:
- Methodology-specific MCP capabilities requested and established
- Enhanced tool ecosystem available for development phases
- Capability availability status for different methodology settings
- Learning data captured for MCP integration effectiveness

**Success Criteria**:
- MCP capabilities successfully established for project requirements
- Methodology-specific tools available (security, performance, learning, etc.)
- Fallback procedures configured for unavailable capabilities
- Integration status properly logged for learning system

### Step 5: Prototype Planning with BMAD Validation Gates
**Purpose**: Systematic prototype breakdown with BMAD validation criteria and SAGE dependency analysis

**Inputs**:
- Project scope and analysis from Steps 2-4
- BMAD validation framework requirements
- SAGE dependency patterns from learning system
- User methodology settings

**Implementation**:
```javascript
// Enhanced prototype planning with methodology integration
async function planPrototypesWithMethodologies(projectScope, settings, learningPatterns) {
  const prototypes = [];
  
  // Apply SAGE patterns for prototype sizing
  const sizePatterns = learningPatterns.filter(p => p.pattern_type === 'prototype_sizing');
  const recommendedSize = sizePatterns.length > 0 ? sizePatterns[0].recommended_actions : 'medium';
  
  // Break down project using BMAD systematic approach
  const projectFeatures = extractFeatures(projectScope);
  const featureGroups = groupFeaturesByValue(projectFeatures, recommendedSize);
  
  for (let i = 0; i < featureGroups.length; i++) {
    const group = featureGroups[i];
    
    // BMAD Validation Gates for this prototype
    const validationGates = [];
    
    if (settings.security_testing !== 'NONE') {
      validationGates.push({
        gate_type: 'security',
        criteria: generateSecurityCriteria(group.features, settings.security_testing),
        methodology: 'bmad'
      });
    }
    
    if (settings.performance_testing !== 'NONE') {
      validationGates.push({
        gate_type: 'performance',
        criteria: generatePerformanceCriteria(group.features, settings.performance_testing),
        methodology: 'bmad'
      });
    }
    
    // SAGE Dependency Analysis
    const dependencyAnalysis = await analyzeDependencies(group.features, learningPatterns);
    
    // Archon Agent Requirements
    const requiredAgents = determinePrototypeAgents(group.features, settings);
    
    const prototype = {
      id: `P${i + 1}`,
      name: group.name,
      description: group.description,
      features: group.features,
      validation_gates: validationGates,
      dependencies: dependencyAnalysis.dependencies,
      risk_factors: dependencyAnalysis.risks,
      required_agents: requiredAgents,
      estimated_effort: calculateEffort(group.features, learningPatterns),
      success_criteria: generateSuccessCriteria(group.features, validationGates),
      methodology_integration: {
        bmad_gates: validationGates.length,
        sage_patterns: dependencyAnalysis.patterns_applied,
        archon_agents: requiredAgents.length
      }
    };
    
    prototypes.push(prototype);
  }
  
  return prototypes;
}

const prototypes = await planPrototypesWithMethodologies(projectScope, projectSettings, historicalPatterns);

// Store prototype information in database with methodology metadata
for (const prototype of prototypes) {
  await createPrototypeTask(projectId, prototype);
}

// Capture prototype planning for learning
learningManager.captureExecutionStep('prototype_planning', {
  status: 'success',
  prototype_count: prototypes.length,
  avg_validation_gates: prototypes.reduce((sum, p) => sum + p.validation_gates.length, 0) / prototypes.length,
  methodology_integration: true,
  dependency_analysis: true
}, prototypeTime);
```

**Outputs**:
- Systematic prototype breakdown with BMAD validation gates
- SAGE dependency analysis and risk identification
- Archon agent requirements for each prototype
- Methodology-integrated success criteria and effort estimates

**Success Criteria**:
- Prototypes designed with appropriate BMAD validation gates
- Dependencies analyzed using SAGE patterns
- Each prototype has clear success criteria and effort estimates
- Combined prototypes fulfill complete project scope

### Step 6: Understanding & Improvement Approval
**Purpose**: Generate comprehensive understanding document for user validation and improvement suggestions

**Inputs**:
- Complete project analysis and prototype planning
- Methodology integration results
- Learning patterns and adaptations applied
- Risk analysis and dependency mapping

**Implementation**:
```javascript
// Generate comprehensive understanding document
const understandingDocument = `
# Project Understanding & Improvement Recommendations

## Project Analysis Summary
**Project Type**: ${projectAnalysis.type}
**Complexity**: ${projectAnalysis.complexity}
**Technology Stack**: ${projectAnalysis.techStack.join(', ')}
**Stakeholders**: ${projectAnalysis.bmad.primary_stakeholders.join(', ')}

## Methodology Integration Applied
### BMAD Framework
- **Validation Gates**: ${prototypes.reduce((sum, p) => sum + p.validation_gates.length, 0)} total gates across prototypes
- **Stakeholder Analysis**: ${projectAnalysis.bmad.primary_stakeholders.length} primary stakeholders identified
- **Quality Thresholds**: Defined for security, performance, and integration testing

### SAGE Adaptive Learning
- **Similar Projects**: Found ${projectAnalysis.sage.similar_projects.length} similar project patterns
- **Applied Adaptations**: ${appliedAdaptations.length} automatic improvements applied
- **Risk Patterns**: ${projectAnalysis.sage.risk_patterns.length} potential risks identified
- **Learning Session**: Active session capturing patterns for future projects

### Archon Agent Generation
- **Required Agents**: ${archonAnalysis.required_agents.length} specialized agents identified
- **Knowledge Sources**: Integration with ${archonAnalysis.knowledge_sources.length} documentation sources
- **Dynamic Capabilities**: Agent generation enabled for specialized tasks

## Recommended Improvements
${generateImprovementRecommendations(projectAnalysis, appliedAdaptations, prototypes)}

## Questions for Clarification
${generateClarifyingQuestions(projectAnalysis, prototypes)}

## Prototype Overview
${prototypes.map((p, i) => `
### ${p.name}
- **Features**: ${p.features.join(', ')}
- **Validation Gates**: ${p.validation_gates.length} (${p.validation_gates.map(g => g.gate_type).join(', ')})
- **Dependencies**: ${p.dependencies.length} dependencies identified
- **Estimated Effort**: ${p.estimated_effort} hours
`).join('\n')}

## Approval Required
Please review the analysis above and confirm:
1. Project understanding is accurate and complete
2. Recommended improvements are acceptable
3. Methodology integration approach is appropriate
4. Prototype breakdown meets project needs
`;

// Create approval document
const understandingApproval = await approvalManager.createApproval(
  'plan',
  'understanding_improvement',
  'understanding',
  'Project Understanding & Improvement Recommendations',
  understandingDocument,
  false
);

// Emit to web interface
socket.emit('approval_required', {
  projectId,
  approvalId: understandingApproval.id,
  type: 'understanding_improvement',
  title: 'Project Understanding & Improvement Recommendations'
});

console.log(`📋 Understanding & Improvement approval available in web interface`);

// Wait for approval
await waitForApproval(understandingApproval.id);
```

**Outputs**:
- Comprehensive understanding document with methodology integration
- Improvement recommendations based on learning patterns
- Clarifying questions for project refinement
- Approval document available in web interface for editing and approval

**Success Criteria**:
- Understanding document demonstrates comprehensive project comprehension
- Improvement recommendations are relevant and actionable
- User approves understanding and accepts recommendations
- Clarifying questions addressed and incorporated

### Step 7: Plan & Design Documentation Approval
**Purpose**: Generate final planning documentation and obtain user approval for implementation

**Inputs**:
- Approved understanding and improvements from Step 6
- Complete prototype breakdown with methodology integration
- Validation gates and success criteria
- MCP integration and capability status

**Implementation**:
```javascript
// Generate comprehensive plan document
const planDocument = `
# Project Implementation Plan

## Project Overview
**Name**: ${projectName}
**Type**: ${projectAnalysis.type}
**Technology Stack**: ${projectAnalysis.techStack.join(', ')}
**Methodology Configuration**: ${Object.entries(projectSettings).filter(([k,v]) => v !== 'NONE').map(([k,v]) => `${k}: ${v}`).join(', ')}

## Implementation Strategy
### Development Approach
- **Framework**: BMAD+SAGE+Archon integrated methodology
- **Implementation**: TDD with methodology-specific validation
- **Learning**: SAGE pattern capture and adaptive improvement
- **Quality**: BMAD validation gates at each prototype

### Prototype Implementation Sequence
${prototypes.map((p, i) => `
#### Prototype ${i + 1}: ${p.name}
**Purpose**: ${p.description}
**Features**: 
${p.features.map(f => `- ${f}`).join('\n')}

**Validation Gates**:
${p.validation_gates.map(g => `- ${g.gate_type.toUpperCase()}: ${g.criteria.join(', ')}`).join('\n')}

**Success Criteria**:
${p.success_criteria.map(c => `- ${c}`).join('\n')}

**Dependencies**: ${p.dependencies.length > 0 ? p.dependencies.join(', ') : 'None'}
**Estimated Effort**: ${p.estimated_effort} hours
**Required Agents**: ${p.required_agents.join(', ')}
`).join('\n')}

## Methodology Integration Details
### BMAD Validation Framework
- **Security Gates**: ${prototypes.reduce((sum, p) => sum + p.validation_gates.filter(g => g.gate_type === 'security').length, 0)} across all prototypes
- **Performance Gates**: ${prototypes.reduce((sum, p) => sum + p.validation_gates.filter(g => g.gate_type === 'performance').length, 0)} across all prototypes
- **Integration Gates**: ${prototypes.reduce((sum, p) => sum + p.validation_gates.filter(g => g.gate_type === 'integration').length, 0)} across all prototypes

### SAGE Learning Integration
- **Pattern Recognition**: Active learning from ${appliedAdaptations.length} similar project patterns
- **Adaptive Behavior**: Automatic adaptation based on historical success/failure patterns
- **Dependency Tracking**: Continuous monitoring for change impact analysis

### Archon Agent Support
- **Specialized Agents**: ${archonAnalysis.required_agents.length} agents will be generated for project-specific tasks
- **Knowledge Integration**: Access to ${archonAnalysis.knowledge_sources.length} external knowledge sources
- **Dynamic Problem Solving**: Agent generation for emerging challenges

## Risk Analysis & Mitigation
${generateRiskAnalysis(prototypes, projectAnalysis.sage.risk_patterns)}

## Success Metrics
- **Technical**: All validation gates pass for each prototype
- **Learning**: Improvement in similar project patterns (measured via SAGE)
- **Quality**: Code coverage, performance benchmarks, security scans
- **User Value**: Each prototype provides tangible, deployable functionality

## Next Steps
1. **Implement Command**: Begin prototype implementation with enhanced methodology integration
2. **Continuous Learning**: SAGE system captures patterns throughout development
3. **Validation Gates**: BMAD validation at each prototype completion
4. **Adaptive Improvement**: Real-time adaptation based on emerging challenges
`;

// Create plan approval document
const planApproval = await approvalManager.createApproval(
  'plan',
  'plan_design',
  'plan',
  'Project Implementation Plan & Design',
  planDocument,
  false
);

// Create Kanban tasks for each prototype (visually distinct)
for (const prototype of prototypes) {
  await createPrototypeKanbanTask(projectId, prototype);
}

// Emit to web interface
socket.emit('approval_required', {
  projectId,
  approvalId: planApproval.id,
  type: 'plan_design',
  title: 'Project Implementation Plan & Design'
});

console.log(`📋 Plan & Design approval available in web interface`);
console.log(`🎯 ${prototypes.length} prototype tasks created in Kanban board`);

// Wait for final approval
await waitForApproval(planApproval.id);
```

**Outputs**:
- Comprehensive implementation plan with methodology integration
- Prototype tasks created in Kanban board (visually distinct)
- Plan approval document available in web interface
- Complete project planning ready for implementation phase

**Success Criteria**:
- Implementation plan demonstrates clear methodology integration
- All prototypes have defined validation gates and success criteria
- Kanban board shows prototype tasks visually distinct from regular tasks
- User approves complete plan and authorizes implementation to begin

### Step 8: Finalize Planning & Save Learning Session
**Purpose**: Complete planning phase with learning pattern capture and state management

**Inputs**:
- Approved plan from Step 7
- Complete learning session data
- Project state and configuration
- Prototype and validation gate definitions

**Implementation**:
```javascript
// Finalize planning session
await stateManager.updateState({
  current_phase: 'implementation_ready',
  current_command: null,
  planning_completed: true,
  prototypes_defined: prototypes.length,
  methodology_integration: 'complete',
  step_context: {
    prototypes,
    validationGates: prototypes.reduce((gates, p) => gates.concat(p.validation_gates), []),
    mcpCapabilities: mcpResult.connectedCapabilities,
    appliedAdaptations,
    learningSessionId
  }
});

// Save learning session with planning results
learningManager.captureExecutionStep('planning_completion', {
  status: 'success',
  prototype_count: prototypes.length,
  validation_gates: prototypes.reduce((sum, p) => sum + p.validation_gates.length, 0),
  adaptations_applied: appliedAdaptations.length,
  methodology_integration: 'complete',
  user_approval: 'approved'
}, planningDuration);

const sessionId = await learningManager.saveLearningSession();

// Update cross-project patterns
await jsonLearningStorage.recordPatternUsage(
  'implementation_patterns',
  'prototype_planning_with_methodology_integration',
  true,
  {
    project_type: projectAnalysis.type,
    complexity: projectAnalysis.complexity,
    prototype_count: prototypes.length,
    methodology_settings: projectSettings
  }
);

console.log(`🧠 Learning session saved: ${sessionId}`);
console.log(`✅ Planning phase complete - ready for implementation`);
console.log(`🎯 Next: Run '/implement' to begin prototype development`);
```

**Outputs**:
- Planning phase completed with comprehensive state management
- Learning session saved with methodology integration patterns
- Cross-project patterns updated for future planning sessions
- Project ready for implementation phase with enhanced command

**Success Criteria**:
- Planning state properly saved in database (not session.json)
- Learning patterns captured and stored for future projects
- Cross-project learning updated with successful planning approach
- Implementation phase can begin with full methodology integration

## Outputs
- **Enhanced Database State**: Complete project state stored in database with methodology configuration
- **Prototype Tasks**: Visually distinct prototype tasks created in Kanban board
- **Approval Documents**: Understanding/improvement and plan/design approvals completed via web interface
- **Learning Data**: SAGE learning session captured planning patterns for future projects
- **MCP Integration**: Enhanced capability access for methodology-specific tools
- **Validation Framework**: BMAD validation gates defined for each prototype
- **Agent Requirements**: Archon agent specifications for specialized tasks

## Success Criteria
- **Methodology Integration**: BMAD+SAGE+Archon successfully integrated into planning process
- **Database State Management**: Project state managed via database (not session.json)
- **Web Interface Approval**: Settings and plan approvals completed via interactive web interface
- **Learning System Active**: SAGE learning capturing patterns for adaptive improvement
- **Prototype Planning**: Systematic breakdown with validation gates and dependency analysis
- **Cross-Project Intelligence**: Historical patterns applied and new patterns captured
- **Implementation Ready**: Project fully planned and ready for enhanced implement command
- **User Approval**: Human validation of understanding, improvements, and complete plan

## Recovery Support
Enhanced recovery using database state management:
- **State Recovery**: Resume from any step using database project state
- **Learning Session Recovery**: Restore learning session and continue pattern capture
- **MCP Connection Recovery**: Re-establish methodology-specific capabilities as needed
- **Approval Recovery**: Check approval status and resume from web interface state
- **Prototype Recovery**: Restore prototype definitions and validation gates from database