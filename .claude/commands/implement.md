# Enhanced IMPLEMENT Command - BMAD+SAGE+Archon Integration

## Purpose
Implement individual prototypes using TDD methodology enhanced with BMAD validation, SAGE learning, and Archon specialized agents, with real-time Kanban updates and dependency tracking.

## Key Features
- **TDD Red-Green-Refactor**: Enhanced with methodology-specific validation at each step
- **SAGE Dependency Tracking**: Automatic change impact analysis and validation task creation
- **BMAD Validation Gates**: Progressive validation throughout implementation process
- **Archon Agent Generation**: Dynamic specialized agents for implementation challenges
- **Real-time Kanban Updates**: Live task progress updates during implementation
- **Git Safety Protocol**: Methodology-enhanced commits with learning pattern integration
- **Prototype-Specific Implementation**: Handles one prototype at a time with user selection
- **Continuous Learning**: SAGE pattern capture and adaptive behavior throughout implementation

## Inputs
- **Database Project State**: Enhanced project state from `project_state` table
- **Prototype Definitions**: Prototype list and specifications from enhanced PLAN command
- **Project Settings**: Methodology configuration from `project_settings` table
- **Learning Patterns**: Cross-project implementation patterns from JSON storage
- **MCP Capabilities**: Enhanced tool ecosystem from previous MCP integration
- **User Selection**: Specific prototype number or "next" for sequential implementation

## Implementation

### Step 1: Prototype Selection & Context Analysis
**Purpose**: Select prototype for implementation and analyze context using SAGE patterns and BMAD validation requirements
**Implementation**: **HYBRID** - Programmatic selection with agent pattern analysis

**Inputs**:
- Database project state with prototype definitions
- User prototype selection (number or "next")
- Learning patterns for implementation optimization
- Current project dependency state

#### Sub-Steps:
1.1. **Initialize Database Managers** (PROGRAMMATIC) - Opens SQLite database connections for state management
1.2. **Load Project State & Prototypes** (PROGRAMMATIC) - Retrieves prototype definitions from database
1.3. **Select Target Prototype** (HYBRID)
   - **What it does**: Determines which prototype to implement based on user input or automatically selects next available prototype in sequence
   - **Programmatic Role**: Handles user input parsing and prototype lookup from database
   - **Agent Role**: PATTERN_MATCHER validates selection against dependencies and provides implementation recommendations
1.4. **Start SAGE Learning Session** (PROGRAMMATIC) - Creates tracking session for implementation pattern capture
1.5. **Analyze Dependency State** (AGENT) - PATTERN_MATCHER analyzes current codebase state for dependency tracking
1.6. **Apply SAGE Implementation Patterns** (AGENT) - PATTERN_MATCHER loads and applies relevant implementation patterns from similar projects

**Implementation**:
```javascript
// Enhanced prototype selection with methodology integration
import { DatabaseStateManager, ApprovalManager } from '../db/helpers/state_manager.js';
import { LearningManager } from '../db/helpers/learning_manager.js';

// 1. Initialize enhanced implementation session
const stateManager = new DatabaseStateManager(projectId);
const learningManager = new LearningManager(projectId);
const approvalManager = new ApprovalManager(projectId);

// 2. Load project state and prototype definitions
const projectState = await stateManager.getProjectState();
const prototypes = projectState.step_context.prototypes || [];

// 3. Select prototype for implementation
let selectedPrototype;
if (userSelection === 'next' || !userSelection) {
  // Find next incomplete prototype
  selectedPrototype = prototypes.find(p => p.status !== 'completed') || prototypes[0];
} else {
  // User specified prototype number
  const prototypeNum = parseInt(userSelection.replace('P', ''));
  selectedPrototype = prototypes.find(p => p.id === `P${prototypeNum}`);
}

if (!selectedPrototype) {
  throw new Error('No prototype available for implementation');
}

// 4. Start learning session for implementation
const learningSessionId = await learningManager.startLearningSession('implement', 'hybrid', {
  prototype: selectedPrototype.name,
  features: selectedPrototype.features,
  complexity: selectedPrototype.estimated_effort > 20 ? 'high' : 'medium',
  validation_gates: selectedPrototype.validation_gates.length,
  dependencies: selectedPrototype.dependencies
});

// 5. Set current implementation operation
await stateManager.setCurrentOperation('implement', 'prototype_selection', {
  selectedPrototype: selectedPrototype.id,
  learningSessionId,
  implementationStart: Date.now(),
  prototypeContext: selectedPrototype
});

// 6. Analyze current codebase state for dependency tracking
const currentCodebaseState = await analyzeDependencyState(projectId);

// 7. Apply SAGE implementation patterns
const implementationPatterns = await learningManager.findSimilarContexts({
  prototype_type: selectedPrototype.name,
  feature_count: selectedPrototype.features.length,
  validation_gates: selectedPrototype.validation_gates.length
}, 'implement');

const appliedAdaptations = await learningManager.applyAutomaticAdaptations({
  prototype: selectedPrototype.name,
  features: selectedPrototype.features,
  implementation_context: 'tdd'
}, 'implement');

console.log(`🎯 Selected: ${selectedPrototype.name} (${selectedPrototype.features.length} features)`);
console.log(`🧠 SAGE: Applied ${appliedAdaptations.length} implementation adaptations`);
console.log(`🔍 BMAD: ${selectedPrototype.validation_gates.length} validation gates configured`);
```

**Outputs**:
- Prototype selected for implementation with full context analysis
- SAGE learning session started for implementation optimization
- Historical implementation patterns loaded and applied
- Current codebase dependency state analyzed
- Implementation operation configured in database state
- **(USER FEEDBACK)**: Selected prototype confirmation with feature overview

**Success Criteria**:
- Prototype successfully selected (user choice or next available)
- Learning session active for implementation pattern capture
- Dependency state baseline established for change tracking
- Implementation context properly initialized in database

### Step 2: Pre-Implementation BMAD Validation & Setup
**Purpose**: Validate prerequisites and set up implementation environment with BMAD gates and MCP capabilities
**Implementation**: **HYBRID** - Agent validation reasoning with programmatic setup

**Inputs**:
- Selected prototype with validation gate requirements
- Project methodology settings
- MCP capability requirements for implementation
- Current project validation status

#### Sub-Steps:
2.1. **BMAD Prerequisite Validation** (AGENT) - Validates implementation prerequisites using BMAD methodology reasoning
2.2. **Dependency Validation** (PROGRAMMATIC) - Checks status of dependent prototypes
2.3. **MCP Capability Assessment** (AGENT) - Determines required tools based on prototype features and methodology settings
2.4. **Request MCP Capabilities** (PROGRAMMATIC) - Establishes tool connections via MCP integration
2.5. **Capture Validation Results** (PROGRAMMATIC) - Persists validation results for learning system

**Implementation**:
```javascript
// Enhanced pre-implementation validation with BMAD gates
async function validateImplementationPrerequisites(prototype, projectSettings) {
  const validationResults = [];
  
  // BMAD Prerequisite Validation
  for (const gate of prototype.validation_gates) {
    if (gate.prerequisite) {
      const validation = await validateGatePrerequisite(gate);
      validationResults.push({
        gate_type: gate.gate_type,
        status: validation.passed ? 'ready' : 'blocked',
        issues: validation.issues || [],
        methodology: 'bmad'
      });
    }
  }
  
  // Check for dependent prototypes
  if (prototype.dependencies && prototype.dependencies.length > 0) {
    for (const dependency of prototype.dependencies) {
      const depStatus = await checkPrototypeDependency(dependency);
      if (!depStatus.completed) {
        validationResults.push({
          gate_type: 'dependency',
          status: 'blocked',
          issues: [`Dependent prototype not completed: ${dependency}`],
          methodology: 'bmad'
        });
      }
    }
  }
  
  return validationResults;
}

// Validate implementation prerequisites
const validationResults = await validateImplementationPrerequisites(selectedPrototype, projectSettings);
const blockedValidations = validationResults.filter(v => v.status === 'blocked');

if (blockedValidations.length > 0) {
  console.log(`❌ Implementation blocked by ${blockedValidations.length} validation issues:`);
  blockedValidations.forEach(v => {
    console.log(`   - ${v.gate_type}: ${v.issues.join(', ')}`);
  });
  throw new Error('Implementation prerequisites not met');
}

// Request implementation-specific MCP capabilities
const implementationCapabilities = [
  'file_operations', 'version_control', 'testing_framework'
];

// Add capabilities based on prototype features
if (selectedPrototype.features.some(f => f.includes('api') || f.includes('backend'))) {
  implementationCapabilities.push('api_testing', 'database_operations');
}

if (selectedPrototype.features.some(f => f.includes('ui') || f.includes('component'))) {
  implementationCapabilities.push('ui_testing', 'component_testing');
}

// Add methodology-specific capabilities
if (projectSettings.security_testing !== 'NONE') {
  implementationCapabilities.push('security_scanning');
}

if (projectSettings.performance_testing !== 'NONE') {
  implementationCapabilities.push('performance_testing');
}

// Request MCP capabilities
const mcpResult = await requestMCPCapabilities(implementationCapabilities);

console.log(`🔧 MCP Integration: ${mcpResult.connectedCapabilities.length} capabilities ready`);

// Capture validation step for learning
learningManager.captureExecutionStep('pre_implementation_validation', {
  status: 'success',
  validation_gates_checked: validationResults.length,
  blocked_validations: blockedValidations.length,
  mcp_capabilities: mcpResult.connectedCapabilities.length,
  methodology_integration: true
}, validationTime);
```

**Outputs**:
- BMAD prerequisite validation completed with any blocking issues identified
- Implementation-specific MCP capabilities established
- Prototype dependency validation confirmed
- Validation results captured for learning system
- **(USER NOTIFICATION)**: Validation status report with any blocking issues requiring attention

**Success Criteria**:
- All BMAD prerequisite validations pass or blocking issues resolved
- Required MCP capabilities successfully established
- Prototype dependencies validated as complete
- Implementation environment fully prepared

### Step 3: TDD Feature Loop - Iterative Implementation
**Purpose**: Execute TDD cycles for each feature with comprehensive failure recovery and monitoring
**Implementation**: **HYBRID** - Agent-driven with programmatic execution and loop control

**Inputs**:
- Selected prototype features for implementation
- BMAD validation criteria and gates
- SAGE learning patterns for optimization
- Real-time Kanban board connection

#### Loop Structure: For Each Feature in Prototype

#### Step 3.1: Feature Selection & Test Design
**Purpose**: Select next feature and design comprehensive test strategy
**Implementation**: **AGENT-BASED** - TEST_CREATOR agent designs test approach

##### Sub-Steps:
3.1.1. **Select Next Feature** (PROGRAMMATIC) - Get next unimplemented feature from list
3.1.2. **Load Feature Requirements** (PROGRAMMATIC) - Retrieve feature specifications and acceptance criteria  
3.1.3. **Design Test Strategy** (AGENT) - TEST_CREATOR analyzes requirements and creates test plan
3.1.4. **Validate Test Coverage** (AGENT) - Ensure tests cover all BMAD validation gates
3.1.5. **Update Kanban Status** (PROGRAMMATIC) - Mark feature as in-progress

**Outputs**: 
- Feature selected for implementation
- Comprehensive test strategy with coverage mapping
- BMAD validation requirements identified
- **(USER VISIBILITY)**: Kanban board updated with current feature

#### Step 3.2: RED Phase - Create Failing Tests
**Purpose**: Generate comprehensive failing test suite for current feature
**Implementation**: **AGENT-BASED** - TEST_CREATOR agent creates tests

##### Sub-Steps:
3.2.1. **Generate Unit Tests** (AGENT) - Create focused unit tests for feature logic
3.2.2. **Generate Integration Tests** (AGENT) - Create tests for feature integration points
3.2.3. **Generate BMAD Validation Tests** (AGENT) - Create tests for validation gate requirements
3.2.4. **Execute Test Suite** (PROGRAMMATIC) - Run tests to confirm they fail appropriately
3.2.5. **Capture Test Metrics** (PROGRAMMATIC) - Record test creation metrics for learning

**Outputs**:
- Complete failing test suite for feature
- Test coverage report
- BMAD validation test mapping
- **(USER VISIBILITY)**: Real-time progress update showing test creation

#### Step 3.3: GREEN Phase - Implement Feature
**Purpose**: Write minimal code to pass tests using agent intelligence
**Implementation**: **AGENT-BASED** - FEATURE_IMPLEMENTER agent writes code

##### Sub-Steps:
3.3.1. **Analyze Failing Tests** (AGENT) - Understand what code is needed to pass tests
3.3.2. **Generate Implementation Code** (AGENT) - Write minimal code to satisfy test requirements
3.3.3. **Execute Tests Incrementally** (PROGRAMMATIC) - Run tests as code is developed
3.3.4. **Validate Test Passage** (PROGRAMMATIC) - Confirm all tests pass
3.3.5. **Handle Test Failures** (AGENT) - Analyze and fix any remaining test failures

**Failure Handling**: If tests don't pass after implementation:
1. **Retry with Simplification** (AGENT) - Simplify implementation approach
2. **Analyze Test Issues** (AGENT) - Check if tests need adjustment
3. **Human Escalation** if both approaches fail

**Outputs**:
- Working code that passes all tests
- Implementation documentation
- Test passage confirmation
- **(USER VISIBILITY)**: Real-time progress showing implementation status

#### Step 3.4: REFACTOR Phase - Apply SAGE Patterns  
**Purpose**: Optimize code using historical patterns while maintaining tests
**Implementation**: **AGENT-BASED** - PATTERN_REFACTORER agent applies optimizations

##### Sub-Steps:
3.4.1. **Load SAGE Patterns** (AGENT) - Retrieve relevant patterns from JSON learning storage
3.4.2. **Analyze Optimization Opportunities** (AGENT) - Identify areas for pattern application
3.4.3. **Apply High-Confidence Patterns** (AGENT) - Transform code using patterns >0.75 confidence
3.4.4. **Validate Test Compatibility** (PROGRAMMATIC) - Ensure all tests still pass
3.4.5. **Capture Pattern Effectiveness** (PROGRAMMATIC) - Record pattern application results

**Outputs**:
- Optimized code with applied patterns
- Pattern application report
- Test compatibility confirmation
- **(USER VISIBILITY)**: Progress update with optimization details

#### Step 3.5: BMAD Validation & Commit
**Purpose**: Validate feature against methodology gates and create safety commit
**Implementation**: **HYBRID** - Agent validation with programmatic commits

##### Sub-Steps:
3.5.1. **Execute BMAD Validation Gates** (AGENT) - Validate feature against all required gates
3.5.2. **Handle Validation Failures** (AGENT) - **Auto-create fix tasks for failures**
3.5.3. **Execute Validation Fixes** (AGENT) - **Automatically implement validation fixes**
3.5.4. **Re-validate After Fixes** (AGENT) - Ensure validation passes after fixes
3.5.5. **Create Git Safety Commit** (PROGRAMMATIC) - Commit working feature with methodology markers

**BMAD Failure Handling** (Based on your requirements):
- **Automatically create fix tasks** in Kanban board
- **Automatically implement fixes** without user approval  
- **Do not continue** with other features until fixed
- **Restart validation** after fixes applied

**Outputs**:
- BMAD validation confirmation or fix tasks created and resolved
- Git commit with feature implementation
- Validation report with any issues resolved
- **(USER VISIBILITY)**: Validation status and any fixes applied

#### Step 3.6: Loop Control & Progress Assessment
**Purpose**: Determine next iteration or prototype completion
**Implementation**: **PROGRAMMATIC** - Loop control with agent progress assessment

##### Sub-Steps:
3.6.1. **Update Feature Status** (PROGRAMMATIC) - Mark current feature as completed
3.6.2. **Assess Prototype Progress** (AGENT) - Evaluate overall prototype completion
3.6.3. **Check Remaining Features** (PROGRAMMATIC) - Identify any unimplemented features
3.6.4. **Update Kanban Board** (PROGRAMMATIC) - Refresh project status display
3.6.5. **Loop Decision** (PROGRAMMATIC) - Continue to next feature or complete prototype

**Loop Conditions**:
- **Continue Loop**: If unimplemented features remain
- **Exit Loop**: If all features completed and BMAD validation passed
- **Error State**: If validation failures cannot be auto-resolved

**Outputs**:
- Updated prototype status
- Next feature identified or prototype completion confirmed
- Progress metrics and completion assessment
- **(USER VISIBILITY)**: Comprehensive progress dashboard update

### Loop Exit: Prototype Implementation Complete
**Condition**: All features implemented, tested, and BMAD-validated
**Final Actions**: 
- Comprehensive metrics calculation
- Learning pattern updates
- Prototype status update to completed
- Handoff preparation for next prototype or optimization phase

**Implementation**:
```javascript
// Enhanced TDD implementation with methodology integration
async function implementPrototypeWithTDD(prototype, projectSettings, socket) {
  const features = prototype.features;
  
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    
    console.log(`\n🔴 RED: Writing tests for ${feature}`);
    
    // Update Kanban board with current feature progress
    await updateKanbanTask(prototype.kanbanTaskId, {
      status: 'in-progress',
      description: `Implementing feature ${i + 1}/${features.length}: ${feature}`,
      progress: Math.round((i / features.length) * 100)
    });
    
    // Emit real-time update to web interface
    socket.emit('implementation_progress', {
      projectId,
      prototypeId: prototype.id,
      currentFeature: feature,
      progress: i / features.length,
      phase: 'red'
    });
    
    // RED PHASE: Create failing tests with BMAD validation criteria
    const testResults = await createFailingTests(feature, prototype.validation_gates, projectSettings);
    
    // Capture test creation for learning
    learningManager.captureExecutionStep('test_creation', {
      status: 'success',
      feature: feature,
      test_count: testResults.testsCreated,
      validation_gates: testResults.validationTests,
      phase: 'red'
    }, testResults.duration);
    
    console.log(`✅ Created ${testResults.testsCreated} tests (${testResults.validationTests} validation tests)`);
    
    // Update progress
    socket.emit('implementation_progress', {
      projectId,
      prototypeId: prototype.id,
      currentFeature: feature,
      progress: (i + 0.33) / features.length,
      phase: 'green'
    });
    
    console.log(`\n🟢 GREEN: Implementing ${feature}`);
    
    // GREEN PHASE: Implement minimal code to pass tests
    const implementationResults = await implementFeature(feature, testResults.tests, projectSettings);
    
    // Run tests to verify implementation
    const testRunResults = await runTests(testResults.tests);
    
    if (!testRunResults.passed) {
      console.log(`❌ Tests failed for ${feature}:`);
      testRunResults.failures.forEach(failure => console.log(`   - ${failure}`));
      
      // SAGE: Capture implementation failure for learning
      learningManager.captureAdaptation(
        'test_failure',
        'analyze_failure_and_retry',
        'pending',
        0.8
      );
      
      // Retry implementation with SAGE learning patterns
      const retryResults = await retryImplementationWithSAGE(feature, testRunResults.failures, learningManager);
      
      if (!retryResults.success) {
        throw new Error(`Failed to implement ${feature} after retry`);
      }
    }
    
    // Capture successful implementation
    learningManager.captureExecutionStep('feature_implementation', {
      status: 'success',
      feature: feature,
      implementation_time: implementationResults.duration,
      test_pass_rate: testRunResults.passRate,
      phase: 'green'
    }, implementationResults.duration);
    
    console.log(`✅ Implementation complete for ${feature}`);
    
    // Update progress
    socket.emit('implementation_progress', {
      projectId,
      prototypeId: prototype.id,
      currentFeature: feature,
      progress: (i + 0.66) / features.length,
      phase: 'refactor'
    });
    
    console.log(`\n🔵 REFACTOR: Optimizing ${feature}`);
    
    // REFACTOR PHASE: Apply SAGE learning patterns for optimization
    const refactorResults = await refactorWithSAGEPatterns(feature, implementationResults.code, learningManager);
    
    // Verify refactoring didn't break tests
    const postRefactorTests = await runTests(testResults.tests);
    
    if (!postRefactorTests.passed) {
      console.log(`⚠️  Refactoring broke tests, rolling back`);
      await rollbackRefactoring(feature);
    } else {
      console.log(`✅ Refactoring complete for ${feature}`);
      
      // Capture successful refactoring
      learningManager.captureExecutionStep('feature_refactoring', {
        status: 'success',
        feature: feature,
        optimization_applied: refactorResults.optimizations,
        performance_improvement: refactorResults.performanceGain,
        phase: 'refactor'
      }, refactorResults.duration);
    }
    
    // VALIDATION PHASE: BMAD quality gate checks
    console.log(`\n🔍 VALIDATION: BMAD quality gates for ${feature}`);
    
    const validationResults = await runBMADValidation(feature, prototype.validation_gates, projectSettings);
    
    if (!validationResults.passed) {
      console.log(`❌ BMAD validation failed for ${feature}:`);
      validationResults.failures.forEach(failure => console.log(`   - ${failure}`));
      
      // Create validation fix tasks
      const fixTasks = await createValidationFixTasks(feature, validationResults.failures, projectId);
      
      console.log(`📋 Created ${fixTasks.length} validation fix tasks`);
    } else {
      console.log(`✅ BMAD validation passed for ${feature}`);
    }
    
    // Git safety commit after each feature
    const commitMessage = `Implement ${feature} with TDD + BMAD validation\n\n🤖 Enhanced with SAGE learning patterns\n🎯 Feature ${i + 1}/${features.length} for ${prototype.name}`;
    
    await gitSafetyCommit(commitMessage, {
      feature: feature,
      prototype: prototype.name,
      validation_status: validationResults.passed ? 'passed' : 'needs_fixes',
      methodology: 'bmad_sage_archon'
    });
    
    console.log(`📝 Git commit: ${feature} implementation complete`);
    
    // Final progress update for this feature
    socket.emit('implementation_progress', {
      projectId,
      prototypeId: prototype.id,
      currentFeature: feature,
      progress: (i + 1) / features.length,
      phase: 'complete'
    });
  }
  
  return {
    featuresImplemented: features.length,
    allTestsPassing: true,
    validationStatus: 'complete'
  };
}

// Execute TDD implementation loop
const implementationResults = await implementPrototypeWithTDD(selectedPrototype, projectSettings, socket);

console.log(`🎉 Prototype implementation complete: ${selectedPrototype.name}`);
console.log(`📊 Features implemented: ${implementationResults.featuresImplemented}`);
```

**Outputs**:
- Complete TDD implementation of all prototype features
- Real-time Kanban board updates throughout implementation process
- BMAD validation gates applied at each feature completion
- SAGE learning patterns captured and applied during implementation
- Git safety commits with methodology integration markers
- **(USER VISIBILITY)**: Live progress updates in web interface showing current feature and phase
- **(USER NOTIFICATION)**: Feature completion notifications with validation status

**Success Criteria**:
- All prototype features implemented using TDD Red-Green-Refactor cycles
- BMAD validation gates pass or create appropriate fix tasks
- Real-time progress updates visible in Kanban web interface
- Learning patterns captured for future implementation optimization
- Git commits maintain development safety and traceability

### Step 4: Dependency Impact Analysis & Validation Task Creation
**Purpose**: Use SAGE system to analyze implementation changes for dependency impacts and create validation tasks
**Implementation**: **HYBRID** - Agent analysis with programmatic task creation

**Inputs**:
- Implementation changes from Step 3
- Current project dependency map
- SAGE dependency tracking patterns
- Historical change impact data

#### Sub-Steps:
4.1. **Extract Feature Changes** (PROGRAMMATIC) - Analyzes git diff and code changes from implementation
4.2. **SAGE Dependency Analysis** (AGENT) - Analyzes potential impacts using machine learning patterns and dependency reasoning
4.3. **Create Validation Tasks** (HYBRID)
   - **What it does**: Creates specific validation tasks for high-confidence dependency impacts
   - **Agent Role**: Identifies which dependencies require validation and determines validation approach
   - **Programmatic Role**: Creates Kanban tasks with appropriate priority and assignment
4.4. **Update Kanban Board** (PROGRAMMATIC) - Adds dependency validation tasks to project board

**Implementation**:
```javascript
// Enhanced dependency impact analysis with SAGE learning
async function analyzeDependencyImpacts(implementedFeatures, prototype, learningManager) {
  const impactAnalysis = [];
  
  for (const feature of implementedFeatures) {
    console.log(`🔍 Analyzing dependency impact for: ${feature}`);
    
    // Get changes made during feature implementation
    const featureChanges = await getFeatureChanges(feature);
    
    for (const change of featureChanges) {
      // Use SAGE to analyze potential impacts
      const impacts = await learningManager.analyzeDependencyChange(
        change.component,
        projectId,
        change.type
      );
      
      if (impacts.length > 0) {
        console.log(`⚠️  Potential impacts detected for ${change.component}:`);
        impacts.forEach(impact => {
          console.log(`   - ${impact.affectedComponent}: ${impact.recommendedAction} (confidence: ${impact.confidence.toFixed(2)})`);
        });
        
        impactAnalysis.push({
          feature,
          component: change.component,
          impacts: impacts
        });
      }
    }
  }
  
  // Create summary of all impacts
  const highConfidenceImpacts = impactAnalysis
    .flatMap(analysis => analysis.impacts)
    .filter(impact => impact.confidence > 0.75);
  
  if (highConfidenceImpacts.length > 0) {
    console.log(`🎯 Created ${highConfidenceImpacts.length} high-confidence validation tasks`);
    
    // Update Kanban board with new validation tasks
    for (const impact of highConfidenceImpacts) {
      socket.emit('dependency_validation_task_created', {
        projectId,
        prototypeId: prototype.id,
        taskTitle: `Validate: ${impact.affectedComponent}`,
        confidence: impact.confidence,
        riskLevel: impact.riskLevel
      });
    }
  }
  
  return impactAnalysis;
}

// Run dependency impact analysis
const dependencyImpacts = await analyzeDependencyImpacts(
  selectedPrototype.features,
  selectedPrototype,
  learningManager
);

// Capture dependency analysis for learning
learningManager.captureExecutionStep('dependency_impact_analysis', {
  status: 'success',
  features_analyzed: selectedPrototype.features.length,
  impacts_detected: dependencyImpacts.length,
  validation_tasks_created: dependencyImpacts.flatMap(d => d.impacts).filter(i => i.confidence > 0.75).length,
  methodology: 'sage'
}, dependencyAnalysisTime);

console.log(`🔗 Dependency analysis complete: ${dependencyImpacts.length} potential impacts analyzed`);
```

**Outputs**:
- Comprehensive dependency impact analysis using SAGE patterns
- High-confidence validation tasks automatically created
- Real-time notification of dependency validation needs
- Learning data captured for dependency pattern improvement
- **(USER NOTIFICATION)**: Dependency impact summary with created validation tasks
- **(USER VISIBILITY)**: New validation tasks visible in Kanban board with risk levels

**Success Criteria**:
- All implementation changes analyzed for dependency impacts
- High-confidence dependency issues result in validation task creation
- SAGE learning system captures dependency patterns for future use
- Kanban board updated with appropriate validation tasks

### Step 5: Prototype Completion & BMAD Validation
**Purpose**: Complete prototype implementation with comprehensive BMAD validation and create approval workflow
**Implementation**: **HYBRID** - Agent validation reasoning with programmatic execution

**Inputs**:
- Completed prototype implementation
- All BMAD validation gate requirements
- Comprehensive test suite results
- Dependency validation status

#### Sub-Steps:
5.1. **Run Comprehensive Test Suite** (PROGRAMMATIC) - Executes all tests and generates coverage reports
5.2. **Execute BMAD Validation Gates** (AGENT) - Applies methodology-specific validation reasoning to assess quality
5.3. **Store Validation Results** (PROGRAMMATIC) - Persists validation outcomes in database
5.4. **Calculate Completion Metrics** (PROGRAMMATIC) - Computes implementation metrics and performance data
5.5. **Update Project State** (PROGRAMMATIC) - Updates database with prototype completion status

**Implementation**:
```javascript
// Comprehensive prototype completion with BMAD validation
async function completePrototypeValidation(prototype, projectSettings, learningManager) {
  console.log(`\n🎯 Completing prototype validation: ${prototype.name}`);
  
  // Run comprehensive test suite
  console.log(`🧪 Running comprehensive test suite...`);
  const testResults = await runComprehensiveTests(prototype);
  
  if (!testResults.passed) {
    console.log(`❌ Test suite failed: ${testResults.failures.length} failures`);
    testResults.failures.forEach(failure => console.log(`   - ${failure}`));
    throw new Error('Test suite must pass before prototype completion');
  }
  
  console.log(`✅ Test suite passed: ${testResults.passedTests}/${testResults.totalTests} tests`);
  
  // Execute all BMAD validation gates
  console.log(`🔍 Executing BMAD validation gates...`);
  const validationResults = [];
  
  for (const gate of prototype.validation_gates) {
    console.log(`   Validating ${gate.gate_type}...`);
    
    const gateResult = await executeValidationGate(gate, prototype, projectSettings);
    validationResults.push(gateResult);
    
    if (!gateResult.passed) {
      console.log(`   ❌ ${gate.gate_type} validation failed: ${gateResult.issues.join(', ')}`);
    } else {
      console.log(`   ✅ ${gate.gate_type} validation passed`);
    }
  }
  
  const failedValidations = validationResults.filter(v => !v.passed);
  
  // Store validation results in database
  for (const result of validationResults) {
    await storeValidationGateResult(projectId, prototype.id, result);
  }
  
  // Calculate prototype completion metrics
  const completionMetrics = {
    features_implemented: prototype.features.length,
    test_coverage: testResults.coverage,
    validation_gates_passed: validationResults.filter(v => v.passed).length,
    validation_gates_total: validationResults.length,
    implementation_time: Date.now() - implementationStartTime,
    dependency_validations_created: dependencyImpacts.flatMap(d => d.impacts).length
  };
  
  return {
    prototype_status: failedValidations.length === 0 ? 'completed' : 'needs_validation_fixes',
    validation_results: validationResults,
    test_results: testResults,
    completion_metrics: completionMetrics,
    failed_validations: failedValidations
  };
}

const prototypeCompletion = await completePrototypeValidation(selectedPrototype, projectSettings, learningManager);

// Update prototype status in database
await stateManager.updateState({
  current_prototype: null,
  step_context: {
    ...projectState.step_context,
    prototypes: projectState.step_context.prototypes.map(p => 
      p.id === selectedPrototype.id 
        ? { ...p, status: prototypeCompletion.prototype_status, completion_metrics: prototypeCompletion.completion_metrics }
        : p
    )
  }
});

// Update Kanban task status
await updateKanbanTask(selectedPrototype.kanbanTaskId, {
  status: prototypeCompletion.prototype_status === 'completed' ? 'done' : 'review',
  description: `Prototype completion: ${prototypeCompletion.validation_results.filter(v => v.passed).length}/${prototypeCompletion.validation_results.length} validations passed`
});

console.log(`📊 Prototype completion metrics:`);
console.log(`   Features: ${prototypeCompletion.completion_metrics.features_implemented}`);
console.log(`   Test coverage: ${prototypeCompletion.completion_metrics.test_coverage}%`);
console.log(`   Validation gates: ${prototypeCompletion.completion_metrics.validation_gates_passed}/${prototypeCompletion.completion_metrics.validation_gates_total}`);
console.log(`   Implementation time: ${Math.round(prototypeCompletion.completion_metrics.implementation_time / 1000 / 60)} minutes`);
```

**Outputs**:
- Comprehensive prototype validation with BMAD gate execution
- Complete test suite results with coverage metrics
- Prototype completion status and metrics stored in database
- Kanban board updated with completion status
- **(USER VISIBILITY)**: Completion metrics dashboard with test coverage and validation results

**Success Criteria**:
- All prototype features implemented and tested
- BMAD validation gates executed with results stored
- Prototype completion metrics calculated and stored
- Kanban board reflects accurate completion status

### Step 6: Prototype Approval Workflow
**Purpose**: Create prototype approval task for user testing and validation
**Implementation**: **HYBRID** - Agent analysis with programmatic approval workflow

**Inputs**:
- Completed prototype with validation results
- Test suite and coverage reports
- BMAD validation gate outcomes
- Implementation metrics and learning data

#### Sub-Steps:
6.1. **Generate Approval Document** (AGENT) - Creates comprehensive analysis and recommendation document
6.2. **Create Approval Interface** (PROGRAMMATIC) - Presents approval document in web interface
6.3. **Handle Approval/Rejection** (HYBRID)
   - **What it does**: Manages user approval workflow with intelligent rejection handling
   - **Programmatic Role**: Handles approval workflow mechanics and status tracking
   - **Agent Role**: Creates detailed fix tasks when user rejects with specific feedback analysis

**Implementation**:
```javascript
// Create comprehensive prototype approval document
const approvalDocument = `
# Prototype Implementation Approval: ${selectedPrototype.name}

## Implementation Summary
**Prototype**: ${selectedPrototype.name}
**Features Implemented**: ${prototypeCompletion.completion_metrics.features_implemented}
**Implementation Time**: ${Math.round(prototypeCompletion.completion_metrics.implementation_time / 1000 / 60)} minutes
**Status**: ${prototypeCompletion.prototype_status}

## Features Completed
${selectedPrototype.features.map(feature => `- ✅ ${feature}`).join('\n')}

## Test Results
- **Total Tests**: ${prototypeCompletion.test_results.totalTests}
- **Passed**: ${prototypeCompletion.test_results.passedTests}
- **Coverage**: ${prototypeCompletion.test_results.coverage}%
- **Test Status**: ${prototypeCompletion.test_results.passed ? '✅ PASSED' : '❌ FAILED'}

## BMAD Validation Results
${prototypeCompletion.validation_results.map(result => 
  `- **${result.gate_type.toUpperCase()}**: ${result.passed ? '✅ PASSED' : '❌ FAILED'} ${result.passed ? '' : '- ' + result.issues.join(', ')}`
).join('\n')}

## SAGE Learning Integration
- **Adaptations Applied**: ${appliedAdaptations.length} automatic improvements
- **Dependency Validations Created**: ${dependencyImpacts.flatMap(d => d.impacts).filter(i => i.confidence > 0.75).length}
- **Implementation Patterns Captured**: Active learning session recording patterns for future projects

## Deployment Information
- **Deployment Status**: ${getDeploymentStatus(selectedPrototype)}
- **Access URL**: ${getPrototypeURL(selectedPrototype)}
- **Testing Instructions**: 
  1. Access the prototype at the URL above
  2. Test each implemented feature for functionality
  3. Verify user experience meets expectations
  4. Check for any integration issues

## User Testing Required
Please test the prototype and verify:
- [ ] All features work as expected
- [ ] User interface is intuitive and responsive
- [ ] No critical bugs or issues
- [ ] Performance is acceptable
- [ ] Integration with existing systems works correctly

## Approval Status
- [ ] **APPROVE**: Prototype meets requirements and is ready for production
- [ ] **REJECT**: Issues found that need to be addressed

### If Rejecting, Please Provide Details:
[Space for rejection comments and specific issues to address]

## Next Steps After Approval
${getNextPrototypeInfo(projectState.step_context.prototypes, selectedPrototype)}
`;

// Create prototype approval
const prototypeApproval = await approvalManager.createApproval(
  'implement',
  'prototype_completion',
  'prototype',
  `Prototype Approval: ${selectedPrototype.name}`,
  approvalDocument,
  false
);

// Emit to web interface
socket.emit('prototype_approval_required', {
  projectId,
  approvalId: prototypeApproval.id,
  prototypeName: selectedPrototype.name,
  completionMetrics: prototypeCompletion.completion_metrics,
  validationResults: prototypeCompletion.validation_results,
  deploymentUrl: getPrototypeURL(selectedPrototype)
});

console.log(`📋 Prototype approval available in web interface`);
console.log(`🌐 Prototype URL: ${getPrototypeURL(selectedPrototype)}`);
console.log(`✅ User testing and approval required before proceeding`);

// Wait for approval or rejection
const approvalResult = await waitForApproval(prototypeApproval.id);

if (approvalResult.status === 'rejected') {
  // Handle rejection - create fix tasks
  console.log(`❌ Prototype rejected: ${approvalResult.rejection_reason}`);
  
  const fixTask = await createTask({
    projectId,
    title: `Fix rejected prototype: ${selectedPrototype.name}`,
    description: `Rejection reason: ${approvalResult.rejection_reason}\n\nOriginal prototype features:\n${selectedPrototype.features.map(f => `- ${f}`).join('\n')}`,
    status: 'todo',
    methodologyType: 'general',
    commandSource: 'implement'
  });
  
  console.log(`📋 Created fix task: ${fixTask.id}`);
  
  // Capture rejection for learning
  learningManager.captureAdaptation(
    'user_rejection',
    'created_fix_task',
    'pending',
    0.9
  );
  
} else {
  console.log(`✅ Prototype approved: ${selectedPrototype.name}`);
  
  // Update prototype status to approved
  await updatePrototypeStatus(selectedPrototype.id, 'approved');
  
  // Capture successful approval for learning
  learningManager.captureExecutionStep('prototype_approval', {
    status: 'success',
    prototype: selectedPrototype.name,
    approval_time: approvalResult.approval_time,
    user_feedback: approvalResult.feedback || 'approved'
  }, 0);
}
```

**Outputs**:
- Comprehensive prototype approval document with testing instructions
- User testing requirements and validation checklist
- Approval workflow integrated with web interface
- Rejection handling with automatic fix task creation
- **(APPROVAL REQUIRED)**: Prototype testing and validation approval in web interface
- **(USER INTERACTION)**: Testing instructions with deployment URL and validation checklist
- **(USER FEEDBACK)**: Approval or rejection with detailed feedback collection

**Success Criteria**:
- Prototype approval document provides complete testing information
- User can approve or reject with detailed feedback
- Rejection automatically creates fix tasks with specific requirements
- Approval process properly integrated with web interface

### Step 7: Learning Session Completion & Cross-Project Pattern Update
**Purpose**: Finalize SAGE learning session and update cross-project patterns for future implementation optimization
**Implementation**: **HYBRID** - Agent analysis with programmatic persistence

**Inputs**:
- Complete implementation session data
- Prototype completion metrics
- User approval feedback
- Dependency tracking results

#### Sub-Steps:
7.1. **Capture Implementation Metrics** (PROGRAMMATIC) - Collects and organizes all implementation data
7.2. **Analyze Implementation Patterns** (AGENT) - LEARNING_ANALYZER identifies successful patterns and areas for improvement
7.3. **Update Cross-Project Intelligence** (HYBRID)
   - **What it does**: Updates global pattern library with new successful implementation approaches
   - **Agent Role**: Analyzes which patterns should be added/updated and determines confidence scores
   - **Programmatic Role**: Updates JSON files and database records with new pattern data
7.4. **Update Project State** (PROGRAMMATIC) - Final state management and session completion

**Implementation**:
```javascript
// Finalize implementation learning session
async function finalizeImplementationLearning(selectedPrototype, approvalResult, learningManager) {
  // Capture final implementation metrics
  learningManager.captureExecutionStep('implementation_completion', {
    status: approvalResult.status === 'approved' ? 'success' : 'rejected',
    prototype: selectedPrototype.name,
    features_count: selectedPrototype.features.length,
    implementation_time: prototypeCompletion.completion_metrics.implementation_time,
    validation_gates_passed: prototypeCompletion.completion_metrics.validation_gates_passed,
    test_coverage: prototypeCompletion.test_results.coverage,
    dependency_validations: dependencyImpacts.flatMap(d => d.impacts).length,
    user_approval: approvalResult.status,
    methodology_integration: 'complete'
  }, prototypeCompletion.completion_metrics.implementation_time);
  
  // Save learning session to database
  const sessionId = await learningManager.saveLearningSession();
  
  // Update cross-project patterns
  await jsonLearningStorage.recordPatternUsage(
    'implementation_patterns',
    'prototype_implementation_with_methodology_integration',
    approvalResult.status === 'approved',
    {
      prototype_type: selectedPrototype.name,
      feature_count: selectedPrototype.features.length,
      validation_gates: selectedPrototype.validation_gates.length,
      implementation_approach: 'tdd_with_bmad_sage_archon',
      success_metrics: prototypeCompletion.completion_metrics
    }
  );
  
  console.log(`🧠 Learning session saved: ${sessionId}`);
  console.log(`📊 Cross-project patterns updated for future implementation optimization`);
  
  return sessionId;
}

// Finalize learning
const learningSessionId = await finalizeImplementationLearning(selectedPrototype, approvalResult, learningManager);

// Update project state with completion
await stateManager.updateState({
  current_command: null,
  current_step: null,
  step_context: {
    ...projectState.step_context,
    last_implemented_prototype: selectedPrototype.id,
    learning_session_id: learningSessionId,
    implementation_completed: new Date().toISOString()
  }
});

// Final status report
const remainingPrototypes = projectState.step_context.prototypes.filter(p => 
  p.status !== 'completed' && p.status !== 'approved'
);

console.log(`\n🎉 Implementation Complete: ${selectedPrototype.name}`);
console.log(`📊 Methodology Integration Summary:`);
console.log(`   - BMAD Validation Gates: ${prototypeCompletion.completion_metrics.validation_gates_passed}/${prototypeCompletion.completion_metrics.validation_gates_total} passed`);
console.log(`   - SAGE Adaptations Applied: ${appliedAdaptations.length}`);
console.log(`   - Dependency Validations Created: ${dependencyImpacts.flatMap(d => d.impacts).filter(i => i.confidence > 0.75).length}`);
console.log(`   - Learning Patterns Captured: Session ${learningSessionId}`);

if (remainingPrototypes.length > 0) {
  console.log(`\n🎯 Next Steps:`);
  console.log(`   Remaining prototypes: ${remainingPrototypes.length}`);
  console.log(`   Next prototype: ${remainingPrototypes[0].name}`);
  console.log(`   Run: /implement (for next prototype) or /implement P${remainingPrototypes[0].id.replace('P', '')} (specific prototype)`);
} else {
  console.log(`\n✅ All prototypes completed! Ready for optimize or qa phases.`);
}
```

**Outputs**:
- SAGE learning session completed and saved to database
- Cross-project implementation patterns updated for future optimization
- Project state updated with implementation completion status
- Summary of methodology integration effectiveness
- **(USER FEEDBACK)**: Implementation completion summary with next steps guidance

**Success Criteria**:
- Learning session successfully captured implementation patterns
- Cross-project learning database updated with new patterns
- Project state properly reflects implementation completion
- Clear guidance provided for next development steps

## Agent Profiles Required

### PATTERN_MATCHER (Existing)
**Role**: Expert at finding and applying historical implementation patterns
**Capabilities**: similarity_analysis, pattern_confidence, adaptation_logic, dependency_tracking

### METHODOLOGY_ANALYST (From Plan_Enhanced)
**Role**: Specializes in BMAD/SAGE/Archon integration and analysis
**Capabilities**: stakeholder_analysis, pattern_matching, knowledge_integration, methodology_validation

### VALIDATION_DESIGNER (Enhanced)
**Role**: Creates appropriate validation gates and success criteria for implementation
**Capabilities**: quality_gate_design, testing_strategy, acceptance_criteria, bmad_validation

### LEARNING_ANALYZER (Existing)
**Role**: Analyzes implementation effectiveness for continuous improvement
**Capabilities**: pattern_extraction, effectiveness_analysis, recommendation_generation

## Outputs
- **Completed Prototype**: Fully implemented prototype with TDD methodology and validation
- **Real-time Kanban Updates**: Live progress tracking throughout implementation process
- **BMAD Validation Results**: Comprehensive validation gate execution and results storage
- **SAGE Learning Capture**: Implementation patterns captured in JSON for future project optimization
- **Dependency Validation Tasks**: Automatic creation of validation tasks for dependency impacts
- **Git Safety Commits**: Methodology-enhanced commits with learning pattern integration
- **Web Validation Results**: Puppeteer-based browser testing and UI verification (for web projects)
- **Prototype Approval**: Web-based approval workflow with user testing instructions
- **Cross-Project Learning**: Updated JSON patterns for improved future implementations
- **Response File**: `[XXX]_implement_approval.md` using auto-increment format for human approval and audit trail

## Success Criteria
- **TDD Methodology**: Complete Red-Green-Refactor cycles with methodology enhancement
- **Real-time Integration**: Kanban board updates throughout implementation process
- **BMAD Validation**: All validation gates executed with appropriate pass/fail handling
- **SAGE Learning**: Implementation patterns captured and applied for optimization
- **Dependency Tracking**: Change impacts analyzed and validation tasks created automatically
- **User Approval**: Prototype testing and approval workflow completed via web interface
- **Database State Management**: All project state managed via database (not session.json)
- **Methodology Integration**: BMAD+SAGE+Archon successfully integrated throughout implementation

## Recovery Support
Enhanced recovery using database state management:
- **Implementation Recovery**: Resume from any TDD phase using database state
- **Learning Session Recovery**: Restore learning session and continue pattern capture
- **Prototype Recovery**: Restore prototype context and continue from interruption point
- **Validation Recovery**: Check validation gate status and resume from last completed gate
- **Approval Recovery**: Check approval status and resume from web interface state