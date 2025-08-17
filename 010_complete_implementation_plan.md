# 010 - Complete BMAD+SAGE+Archon Integration Implementation Plan

## Project Overview

**Purpose**: Transform MVP Context Engineering system into complete integrated BMAD+SAGE+Archon system with full methodology integration, interactive Kanban board, and persistent learning capabilities.

**Key Features**: 
- Interactive web-based Kanban board with real-time CLI synchronization
- Enhanced commands with full methodology integration (BMAD planning, SAGE learning, Archon generation)
- Web-based approval system with markdown editing
- Persistent learning system with cross-project intelligence
- Database-based state management with real-time updates

**Inputs**: 
- Current MVP system in Docker environment
- Existing `.claude/` command and MCP infrastructure
- User requirements from extensive methodology analysis
- Current SQLite database schema and React components

**Implementation**: Complete system transformation addressing all current issues while preserving proven components (MCP integration, command structure, Docker architecture)

**Outputs**:
- Enhanced command files with methodology integration
- Interactive Kanban board with full functionality
- Approval workflow system integrated in web interface  
- Learning system with JSON storage and database migration path
- Real-time synchronization between CLI and web interface

**Success Criteria**:
- All current Kanban issues resolved (editing, drag-drop, real-time updates)
- Commands demonstrate BMAD+SAGE+Archon methodology integration
- Approval workflows work seamlessly in web interface
- Learning system captures and applies patterns across projects
- Database-based state management provides persistent project context

---

## Phase 1: Foundation Enhancement

### Purpose
Establish enhanced database schema, state management, and core infrastructure to support methodology integration and learning systems.

### Step 1.1: Enhanced Database Schema
**Purpose**: Extend SQLite schema to support methodology metadata, learning data, approval workflows, and centralized state management

**Inputs**:
- Current database schema from Docker SQLite instance
- Methodology requirements from BMAD, SAGE, Archon analysis
- Learning system data requirements

**Implementation**:
```sql
-- State Management (replaces session.json)
CREATE TABLE project_state (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  current_command TEXT,
  current_step TEXT,
  current_prototype TEXT,
  step_context TEXT, -- JSON
  command_history TEXT, -- JSON array
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Methodology Configuration
CREATE TABLE project_settings (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  setting_name TEXT NOT NULL,
  setting_value TEXT NOT NULL, -- NONE, MINIMAL, STANDARD, COMPREHENSIVE
  methodology TEXT, -- bmad, sage, archon, general
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enhanced Tasks with Methodology Support
ALTER TABLE tasks ADD COLUMN methodology_type TEXT DEFAULT 'general';
ALTER TABLE tasks ADD COLUMN task_metadata TEXT; -- JSON for methodology-specific data
ALTER TABLE tasks ADD COLUMN prototype_number INTEGER;
ALTER TABLE tasks ADD COLUMN is_prototype BOOLEAN DEFAULT FALSE;
ALTER TABLE tasks ADD COLUMN command_source TEXT; -- plan, implement, optimize, qa

-- Approval Workflow System
CREATE TABLE approvals (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  command TEXT NOT NULL,
  phase TEXT NOT NULL,
  approval_type TEXT NOT NULL, -- understanding, plan, prototype, settings
  content TEXT, -- markdown content
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SAGE Learning System
CREATE TABLE learning_sessions (
  id TEXT PRIMARY KEY,
  project_id TEXT,
  command TEXT,
  methodology TEXT,
  context_data TEXT, -- JSON: project complexity, tech stack, etc.
  execution_data TEXT, -- JSON: approaches tried, outcomes
  success_metrics TEXT, -- JSON: measurable results
  lessons_learned TEXT,
  pattern_signature TEXT, -- hash for similar situation recognition
  confidence_score REAL DEFAULT 0.5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pattern Recognition for Adaptive Behavior
CREATE TABLE adaptation_patterns (
  id TEXT PRIMARY KEY,
  pattern_type TEXT, -- dependency_change, failure_recovery, optimization
  situation_context TEXT, -- JSON: when this pattern applies
  recommended_actions TEXT, -- JSON: what to do
  success_rate REAL DEFAULT 0.5,
  usage_count INTEGER DEFAULT 1,
  last_used TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Outputs**:
- Enhanced database schema in Docker SQLite instance
- Migration scripts for existing data preservation
- Database connection utilities for state management

**Success Criteria**:
- All new tables created without data loss
- Existing MVP data migrated successfully
- Database supports both current MVP and new methodology features

### Step 1.2: JSON Learning Storage System
**Purpose**: Establish JSON-based storage for cross-project learning in Docker persistent volumes

**Inputs**:
- Docker volume configuration
- Learning data schema requirements
- Cross-project sharing requirements

**Implementation**:
```javascript
// Storage structure in ../docker/learning/
{
  "global_patterns": {
    "dependency_tracking": [
      {
        "pattern": "react_component_change_affects_parent",
        "confidence": 0.85,
        "contexts": ["react", "typescript", "component_library"],
        "recommended_actions": ["check_parent_imports", "run_integration_tests"]
      }
    ],
    "implementation_patterns": [
      {
        "pattern": "tdd_faster_with_simple_tests_first",
        "confidence": 0.9,
        "contexts": ["time_pressure", "new_feature"],
        "adaptation": "start_with_happy_path_test"
      }
    ]
  },
  "methodology_effectiveness": {
    "bmad_validation_success_rate": 0.88,
    "sage_adaptation_improvement": 0.65,
    "archon_agent_generation_utility": 0.75
  }
}
```

**Outputs**:
- JSON storage structure in Docker persistent volumes
- Learning data collection utilities
- Cross-project pattern recognition system

**Success Criteria**:
- JSON files persist across Docker container restarts
- Learning data accumulates across all projects
- Pattern recognition functions operate on stored data

---

## Phase 2: Enhanced Command System

### Purpose
Transform basic commands into methodology-integrated workflows with proper structure and SAGE learning integration.

### Step 2.1: Enhanced PLAN Command
**Purpose**: Integrate BMAD structured planning, SAGE adaptive planning, and Archon agent generation into comprehensive planning workflow

**Inputs**:
- Current plan.md command file
- BMAD planning methodology requirements
- SAGE learning patterns from JSON storage
- Archon agent generation capabilities
- User project description/files/folders

**Implementation**:

**Purpose**: Create comprehensive project plan integrating BMAD validation gates, SAGE adaptive learning, and Archon agent generation with approval workflow

**Key Features**:
- Multi-input analysis (description, files, folders)
- BMAD structured validation with stakeholder identification
- SAGE pattern recognition from cross-project learning
- Archon agent generation for specialized planning tasks
- Settings configuration with web interface approval
- Prototype breakdown with dependency mapping

**Inputs**:
- `.claude/state/` - Current session context (migrated to database)
- `../docker/learning/` - Cross-project learning patterns
- `.claude/mcp/` - MCP server capabilities via core_mcp agent
- User input: Project description, files, or folders
- `docs/external/` - External documentation and frameworks

**Implementation Steps**:

1. **Analysis & Understanding** (BMAD + SAGE)
   - Load historical patterns for similar projects from learning system
   - Analyze input using BMAD stakeholder identification
   - Apply SAGE adaptive planning based on project context
   - Request MCP capabilities: file_operations, web_search, documentation_analysis

2. **Settings Configuration** (Web Interface Integration)
   - Generate project-specific settings recommendations
   - Create settings approval cards in Kanban interface
   - Present preset configurations based on project analysis
   - Wait for user configuration approval before proceeding

3. **Agent Generation** (Archon Integration)
   - Generate specialized planning agents based on project requirements
   - Create agents for: architecture analysis, technology recommendations, risk assessment
   - Integrate agent outputs into planning documentation

4. **Prototype Planning** (BMAD Structured Approach)
   - Break project into logical prototypes with clear deliverables
   - Map prototype dependencies and validation gates
   - Create BMAD validation criteria for each prototype
   - Generate approval workflows for each planning phase

5. **Documentation Generation**
   - Create comprehensive planning documents based on settings
   - Generate Understanding/Improvement approval document
   - Create Plan/Design approval document
   - Store all documents in approval system for web interface editing

**Outputs**:
- Enhanced `plan.md` command file with full methodology integration
- Project settings configuration in database
- Prototype task list in Kanban board (visually distinct)
- Approval documents in web interface for user review
- SAGE learning patterns updated with planning session data
- MCP integration for external capability requests

**Success Criteria**:
- Plan command demonstrates understanding of project goals
- Settings approval cards appear in web interface with proper functionality
- Prototypes are created as visually distinct tasks in Kanban board
- All approval documents are editable in web interface
- Learning system captures planning patterns for future projects

### Step 2.2: Enhanced IMPLEMENT Command
**Purpose**: Transform implementation into TDD-driven methodology-integrated workflow with real-time Kanban updates and dependency tracking

**Inputs**:
- Current implement.md command file
- Prototype list from Plan command (stored in database)
- SAGE learning patterns for implementation approaches
- TDD workflow requirements
- Git safety protocol requirements

**Implementation**:

**Purpose**: Implement individual prototypes using TDD methodology enhanced with BMAD validation, SAGE learning, and Archon specialized agents

**Key Features**:
- Prototype-specific implementation with TDD Red-Green-Refactor
- SAGE dependency change tracking and adaptation
- BMAD validation gates during implementation
- Real-time Kanban task updates
- Git safety commits with learning pattern application

**Inputs**:
- Database: Project state, prototype list, settings configuration
- `../docker/learning/` - Implementation patterns and dependency tracking
- `.claude/mcp/` - Development tool capabilities
- User selection: Specific prototype or next in sequence
- Current codebase state for dependency analysis

**Implementation Steps**:

1. **Prototype Selection & Analysis** (SAGE Adaptive)
   - Default to next prototype in sequence or user-specified prototype
   - Analyze prototype dependencies using SAGE patterns
   - Check for any plan changes that might affect this prototype
   - Generate adaptation tasks if dependencies have changed

2. **Pre-Implementation Validation** (BMAD Gates)
   - Verify all prerequisite prototypes are completed
   - Check validation criteria for current prototype
   - Request MCP capabilities: file_operations, version_control, testing_framework
   - Create git safety commit before implementation begins

3. **TDD Implementation Loop** (Enhanced with Methodologies)
   - **Red Phase**: Create failing tests with BMAD validation criteria
   - **Green Phase**: Implement minimal code to pass tests
   - **Refactor Phase**: Apply SAGE learning patterns for optimization
   - **Validation Phase**: BMAD quality gate checks
   - Real-time Kanban task updates throughout process

4. **Dependency Impact Analysis** (SAGE Core Feature)
   - After each implementation change, analyze impact on other components
   - Use SAGE patterns to identify potential cascading effects
   - Generate validation tasks for affected components
   - Create additional test tasks if dependency issues detected

5. **Prototype Completion** (Approval Workflow)
   - Run comprehensive test suite with BMAD validation criteria
   - Create prototype approval task in Kanban interface
   - Generate learning data for SAGE system improvement
   - Git commit with prototype completion markers

**Outputs**:
- Enhanced `implement.md` command file with methodology integration
- Real-time task updates in Kanban board during implementation
- Prototype approval tasks with user testing instructions
- Git commits with dependency tracking and learning integration
- SAGE learning data updated with implementation patterns
- Dependency validation tasks if changes affect other components

**Success Criteria**:
- Implementation follows TDD Red-Green-Refactor with methodology enhancements
- Dependency changes automatically trigger validation task creation
- Kanban board updates in real-time during implementation process
- Prototype approval workflow functions correctly in web interface
- Learning system captures implementation patterns and dependency issues

### Step 2.3: Enhanced OPTIMIZE & QA Commands
**Purpose**: Create methodology-integrated optimization and quality assurance commands with learning system integration

**Inputs**:
- Current optimize.md and qa.md command files
- BMAD validation frameworks
- SAGE learning patterns for optimization approaches
- Archon agent generation for specialized quality tasks

**Implementation**:
Similar structure to Plan and Implement commands, with methodology-specific enhancements for optimization and quality validation.

**Outputs**:
- Enhanced optimize.md and qa.md command files
- Integration with approval workflow system
- Learning pattern capture for optimization and quality approaches

**Success Criteria**:
- Optional commands function correctly when user chooses to include them
- Full methodology integration matches Plan and Implement command depth
- Learning system captures optimization and quality patterns

---

## Phase 3: Interactive Kanban Board

### Purpose
Transform static Kanban board into fully interactive interface with real-time updates, methodology awareness, and approval workflow integration.

### Step 3.1: Interactive Task Management
**Purpose**: Implement drag-and-drop, inline editing, and real-time synchronization for Kanban board

**Inputs**:
- Current React components: KanbanBoard.tsx, TaskCard.tsx, ProjectTabs.tsx
- Database schema with enhanced task metadata
- Socket.io infrastructure for real-time updates

**Implementation**:

```typescript
// Enhanced TaskCard.tsx with inline editing and methodology awareness
interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string, updates: Partial<Task>) => void;
  onMove: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  isEditable: boolean;
  methodologyConfig: MethodologyConfig;
}

// Drag-and-drop implementation with validation
const handleDragEnd = (result: DropResult) => {
  if (!result.destination) return;
  
  // BMAD validation: Check if move is allowed based on validation gates
  const isValidMove = validateTaskMove(result.draggableId, result.destination.droppableId);
  if (!isValidMove) {
    showValidationError("Task cannot move until validation criteria are met");
    return;
  }
  
  // Update local state immediately
  updateTaskStatus(result.draggableId, result.destination.droppableId);
  
  // Emit to other clients via Socket.io
  socket.emit('task:moved', { taskId: result.draggableId, newStatus: result.destination.droppableId });
  
  // Update server via tRPC
  updateTaskMutation.mutate({ id: result.draggableId, status: result.destination.droppableId });
};

// Inline editing with methodology metadata
const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, methodologyConfig }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.title);

  const handleSave = () => {
    onEdit(task.id, { title: editContent });
    setIsEditing(false);
    
    // Notify CLI if it's currently working on this task
    socket.emit('task:edited', { taskId: task.id, changes: { title: editContent } });
  };

  return (
    <div className={`task-card ${task.isPrototype ? 'prototype-task' : ''} ${getMethodologyColor(task.methodologyType)}`}>
      {isEditing ? (
        <input 
          value={editContent} 
          onChange={(e) => setEditContent(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <div onClick={() => setIsEditing(true)}>
          {task.title}
          {task.isPrototype && <PrototypeBadge number={task.prototypeNumber} />}
          {getMethodologyIndicator(task.methodologyType)}
        </div>
      )}
    </div>
  );
};
```

**Outputs**:
- Fully interactive Kanban board with drag-and-drop functionality
- Inline task editing with real-time synchronization
- Visual prototype distinction and methodology indicators
- Real-time conflict notification between CLI and web interface

**Success Criteria**:
- Users can edit task titles directly in the Kanban interface
- Drag-and-drop works between all columns with appropriate validation
- Real-time updates work bidirectionally between CLI and web interface
- Prototype tasks are visually distinct from regular tasks

### Step 3.2: Settings Configuration Interface
**Purpose**: Create web-based settings configuration with approval workflow for methodology parameters

**Inputs**:
- Settings configuration data from database
- Methodology requirements (BMAD, SAGE, Archon parameters)
- User interface requirements for color-coded approval system

**Implementation**:

```typescript
// Settings Configuration Component
interface SettingsConfig {
  settingName: string;
  currentValue: 'NONE' | 'MINIMAL' | 'STANDARD' | 'COMPREHENSIVE';
  description: string;
  methodology: 'bmad' | 'sage' | 'archon' | 'general';
  options: {
    level: string;
    description: string;
    impact: string;
  }[];
}

const SettingsCard: React.FC<{ setting: SettingsConfig; onUpdate: (value: string) => void }> = 
  ({ setting, onUpdate }) => {
  
  const getColorClass = (level: string) => {
    const colors = {
      'NONE': 'bg-red-100 border-red-300',
      'MINIMAL': 'bg-yellow-100 border-yellow-300', 
      'STANDARD': 'bg-green-100 border-green-300',
      'COMPREHENSIVE': 'bg-blue-100 border-blue-300'
    };
    return colors[level] || 'bg-gray-100';
  };

  return (
    <div className={`settings-card ${getColorClass(setting.currentValue)} p-4 rounded-lg border-2`}>
      <h3 className="font-semibold">{setting.settingName}</h3>
      <p className="text-sm text-gray-600 mb-3">{setting.description}</p>
      
      <select 
        value={setting.currentValue}
        onChange={(e) => onUpdate(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {setting.options.map(option => (
          <option key={option.level} value={option.level}>
            {option.level} - {option.description}
          </option>
        ))}
      </select>
      
      <button 
        onClick={() => submitSetting(setting.settingName, setting.currentValue)}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Submit
      </button>
    </div>
  );
};

// Settings approval interface with Submit All functionality
const SettingsApprovalInterface: React.FC = () => {
  const [settings, setSettings] = useState<SettingsConfig[]>([]);
  const [presetRecommendation, setPresetRecommendation] = useState<string>('');

  const handleSubmitAll = () => {
    settings.forEach(setting => {
      submitSetting(setting.settingName, setting.currentValue);
    });
    // Notify CLI that settings are approved
    socket.emit('settings:approved', { projectId, settings });
  };

  return (
    <div className="settings-approval-panel">
      <div className="preset-recommendation mb-4 p-3 bg-blue-50 rounded">
        <h3>Recommended Preset: {presetRecommendation}</h3>
        <button onClick={applyPreset}>Apply Recommended Settings</button>
      </div>
      
      <div className="settings-grid grid gap-4">
        {settings.map(setting => (
          <SettingsCard 
            key={setting.settingName} 
            setting={setting} 
            onUpdate={(value) => updateSetting(setting.settingName, value)}
          />
        ))}
      </div>
      
      <div className="submit-actions mt-6">
        <button 
          onClick={handleSubmitAll}
          className="px-6 py-2 bg-green-600 text-white rounded font-semibold"
        >
          Submit All Settings
        </button>
      </div>
    </div>
  );
};
```

**Outputs**:
- Color-coded settings interface with individual and batch approval
- Tooltip descriptions for each setting level
- Preset recommendation system based on project analysis
- Real-time settings approval notification to CLI commands

**Success Criteria**:
- Settings appear as color-coded cards with clear level descriptions
- Individual and "Submit All" functionality works correctly
- CLI commands receive settings approval notifications
- Preset recommendations appear based on project analysis

### Step 3.3: Approval Workflow Interface
**Purpose**: Integrate markdown approval document editing into web interface with approval/rejection workflow

**Inputs**:
- Approval documents generated by enhanced commands
- Markdown editing requirements
- Approval workflow state management

**Implementation**:

```typescript
// Approval Document Editor
interface ApprovalDocument {
  id: string;
  projectId: string;
  command: string;
  phase: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

const ApprovalEditor: React.FC<{ approval: ApprovalDocument }> = ({ approval }) => {
  const [content, setContent] = useState(approval.content);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = () => {
    updateApproval(approval.id, { status: 'approved', content });
    socket.emit('approval:approved', { approvalId: approval.id, projectId: approval.projectId });
  };

  const handleReject = () => {
    updateApproval(approval.id, { 
      status: 'rejected', 
      rejectionReason: rejectionReason 
    });
    
    // Create new task to re-perform the work
    createTask({
      projectId: approval.projectId,
      title: `Rework ${approval.command} - ${approval.phase}`,
      description: `Rejected: ${rejectionReason}`,
      status: 'todo',
      commandSource: approval.command
    });
    
    socket.emit('approval:rejected', { 
      approvalId: approval.id, 
      projectId: approval.projectId,
      rejectionReason 
    });
  };

  return (
    <div className="approval-editor">
      <div className="approval-header">
        <h2>{approval.command} - {approval.phase}</h2>
        <span className={`status-badge ${approval.status}`}>{approval.status}</span>
      </div>
      
      <div className="markdown-editor">
        <ReactMarkdown source={content} />
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-3 border rounded font-mono"
        />
      </div>
      
      <div className="approval-actions">
        <button 
          onClick={handleApprove}
          className="px-4 py-2 bg-green-600 text-white rounded mr-2"
        >
          Approve
        </button>
        
        <div className="reject-section">
          <textarea 
            placeholder="Reason for rejection..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button 
            onClick={handleReject}
            className="px-4 py-2 bg-red-600 text-white rounded"
            disabled={!rejectionReason.trim()}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
```

**Outputs**:
- Markdown editor integrated in web interface for approval documents
- Approval/rejection workflow with automatic task creation on rejection
- Real-time approval notifications to CLI commands
- Rejection reason capture and new task generation

**Success Criteria**:
- Users can edit approval documents directly in web interface
- Approval triggers automatic CLI command continuation
- Rejection creates new tasks with rejection reasons
- All approval state changes are reflected in real-time

---

## Phase 4: Learning System Integration

### Purpose
Implement SAGE passive learning system with pattern recognition and adaptive behavior based on cross-project intelligence.

### Step 4.1: Learning Data Collection
**Purpose**: Capture learning patterns during command execution for SAGE adaptive behavior

**Inputs**:
- Command execution data and outcomes
- User decisions and approval patterns
- Implementation success/failure metrics
- Dependency change impacts

**Implementation**:

```javascript
// Learning data collection during command execution
class LearningCollector {
  constructor(projectId, command) {
    this.projectId = projectId;
    this.command = command;
    this.sessionData = {
      startTime: Date.now(),
      context: {},
      executionSteps: [],
      outcomes: {},
      adaptations: []
    };
  }

  captureContext(context) {
    this.sessionData.context = {
      projectComplexity: context.complexity,
      techStack: context.technologies,
      teamSize: 1, // solo development
      timeConstraints: context.deadline || 'normal',
      userExperience: context.userSkillLevel || 'experienced'
    };
  }

  captureExecutionStep(step, outcome, duration) {
    this.sessionData.executionSteps.push({
      step: step,
      outcome: outcome, // success, failure, adapted
      duration: duration,
      adaptationsMade: outcome.adaptations || [],
      timestamp: Date.now()
    });
  }

  captureAdaptation(trigger, action, result) {
    this.sessionData.adaptations.push({
      trigger: trigger, // dependency_change, test_failure, user_feedback
      action: action,   // created_task, modified_approach, requested_approval
      result: result,   // success, failure, pending
      confidence: this.calculateConfidence(trigger, action, result)
    });
  }

  async saveLearningSession() {
    const sessionSummary = {
      id: generateId(),
      projectId: this.projectId,
      command: this.command,
      methodology: this.getMethodologyUsed(),
      contextData: JSON.stringify(this.sessionData.context),
      executionData: JSON.stringify(this.sessionData.executionSteps),
      successMetrics: JSON.stringify(this.calculateSuccessMetrics()),
      lessonsLearned: this.extractLessons(),
      patternSignature: this.generatePatternSignature(),
      confidenceScore: this.calculateOverallConfidence(),
      createdAt: new Date().toISOString()
    };

    // Save to database
    await saveLearningSession(sessionSummary);
    
    // Update cross-project patterns in JSON storage
    await updateGlobalPatterns(sessionSummary);
  }

  generatePatternSignature() {
    // Create hash of context that can be matched to similar situations
    const contextSignature = {
      complexity: this.sessionData.context.projectComplexity,
      techStack: this.sessionData.context.techStack.sort(),
      constraints: this.sessionData.context.timeConstraints
    };
    return btoa(JSON.stringify(contextSignature));
  }

  extractLessons() {
    return this.sessionData.adaptations
      .filter(adaptation => adaptation.result === 'success')
      .map(adaptation => ({
        lesson: `When ${adaptation.trigger}, ${adaptation.action} was effective`,
        confidence: adaptation.confidence,
        context: this.sessionData.context
      }));
  }
}

// Usage in enhanced commands
// In plan.md command:
const learningCollector = new LearningCollector(projectId, 'plan');
learningCollector.captureContext(projectAnalysis);

// During execution:
learningCollector.captureExecutionStep('stakeholder_analysis', {
  outcome: 'success',
  adaptations: ['used_bmad_framework', 'integrated_sage_patterns']
}, executionTime);

// When adaptation occurs:
learningCollector.captureAdaptation(
  'user_rejected_architecture', 
  'created_alternative_analysis_task', 
  'pending'
);

// At command completion:
await learningCollector.saveLearningSession();
```

**Outputs**:
- Learning data collection integrated into all enhanced commands
- Cross-project pattern storage in Docker JSON files
- Pattern signature generation for similar situation recognition
- Confidence scoring for adaptation effectiveness

**Success Criteria**:
- Learning data is captured automatically during all command executions
- Patterns are stored persistently across Docker container restarts
- Pattern recognition can identify similar project contexts
- Confidence scores improve over time with more data

### Step 4.2: Adaptive Behavior Implementation
**Purpose**: Apply learned patterns to improve command execution and provide intelligent adaptations

**Inputs**:
- Historical learning patterns from JSON storage
- Current project context and execution state
- Pattern similarity matching algorithms

**Implementation**:

```javascript
// Adaptive behavior engine
class AdaptiveBehavior {
  constructor() {
    this.globalPatterns = null;
    this.confidenceThreshold = 0.7;
  }

  async loadLearningPatterns() {
    this.globalPatterns = await loadJSONFile('../docker/learning/global_patterns.json');
  }

  async suggestAdaptations(currentContext, currentStep) {
    const similarContexts = this.findSimilarContexts(currentContext);
    const relevantPatterns = this.getRelevantPatterns(similarContexts, currentStep);
    
    return relevantPatterns
      .filter(pattern => pattern.confidence > this.confidenceThreshold)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3); // Top 3 suggestions
  }

  findSimilarContexts(currentContext) {
    const currentSignature = this.generateContextSignature(currentContext);
    
    return this.globalPatterns.contextPatterns
      .filter(pattern => {
        const similarity = this.calculateSimilarity(currentSignature, pattern.signature);
        return similarity > 0.6; // 60% similarity threshold
      })
      .sort((a, b) => b.similarity - a.similarity);
  }

  async applyAutomaticAdaptations(currentContext, command) {
    const adaptations = await this.suggestAdaptations(currentContext, command);
    const automaticAdaptations = adaptations.filter(a => a.autoApply && a.confidence > 0.85);
    
    for (const adaptation of automaticAdaptations) {
      await this.executeAdaptation(adaptation, currentContext);
      
      // Log automatic adaptation for learning
      console.log(`🧠 SAGE: Applied learned pattern: ${adaptation.description}`);
    }
    
    return automaticAdaptations;
  }

  async checkDependencyImpact(changedComponent, currentProject) {
    const dependencyPatterns = this.globalPatterns.dependencyPatterns || [];
    const potentialImpacts = [];
    
    for (const pattern of dependencyPatterns) {
      if (this.matchesDependencyPattern(pattern, changedComponent, currentProject)) {
        potentialImpacts.push({
          component: pattern.affectedComponent,
          risk: pattern.riskLevel,
          recommendedAction: pattern.recommendedAction,
          confidence: pattern.confidence
        });
      }
    }
    
    // Create validation tasks for high-confidence impacts
    for (const impact of potentialImpacts.filter(i => i.confidence > 0.75)) {
      await this.createValidationTask(impact, currentProject);
    }
    
    return potentialImpacts;
  }

  async createValidationTask(impact, projectId) {
    const task = {
      projectId: projectId,
      title: `Validate: ${impact.component} after dependency change`,
      description: `SAGE detected potential impact: ${impact.recommendedAction}`,
      status: 'todo',
      methodologyType: 'sage',
      taskMetadata: JSON.stringify({
        type: 'dependency_validation',
        trigger: 'sage_adaptation',
        confidence: impact.confidence,
        riskLevel: impact.risk
      }),
      commandSource: 'sage_learning'
    };
    
    await createTask(task);
    
    // Notify web interface
    socket.emit('task:created', { task, source: 'sage_adaptation' });
    
    console.log(`🔍 SAGE: Created validation task for ${impact.component}`);
  }
}

// Integration with enhanced commands
// In implement.md command:
const adaptiveBehavior = new AdaptiveBehavior();
await adaptiveBehavior.loadLearningPatterns();

// Before starting implementation:
const automaticAdaptations = await adaptiveBehavior.applyAutomaticAdaptations(
  projectContext, 
  'implement'
);

// After making changes:
const dependencyImpacts = await adaptiveBehavior.checkDependencyImpact(
  changedComponent, 
  projectId
);

// Display adaptations to user
if (automaticAdaptations.length > 0) {
  console.log("🧠 SAGE Applied Automatic Adaptations:");
  automaticAdaptations.forEach(adaptation => {
    console.log(`  - ${adaptation.description} (confidence: ${adaptation.confidence})`);
  });
}
```

**Outputs**:
- Automatic adaptation application during command execution
- Dependency impact analysis with validation task creation
- Intelligent suggestions based on historical patterns
- Real-time task creation for detected dependency issues

**Success Criteria**:
- SAGE system automatically applies high-confidence adaptations
- Dependency changes trigger appropriate validation task creation
- Learning patterns improve command execution efficiency over time
- Users see clear indication when SAGE adaptations are applied

---

## Phase 5: Real-Time Integration

### Purpose
Establish complete real-time synchronization between CLI commands and web interface with conflict resolution and user priority.

### Step 5.1: Enhanced Socket.io Communication
**Purpose**: Implement comprehensive real-time communication with user priority conflict resolution

**Inputs**:
- Current Socket.io infrastructure
- Enhanced database schema with state management
- User priority requirements for conflict resolution

**Implementation**:

```javascript
// Enhanced server-side Socket.io with conflict resolution
class RealtimeIntegration {
  constructor(io, db) {
    this.io = io;
    this.db = db;
    this.activeCliSessions = new Map(); // Track active CLI sessions
    this.conflictResolver = new ConflictResolver();
  }

  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      socket.on('cli:session_start', (data) => {
        this.activeCliSessions.set(data.projectId, {
          sessionId: socket.id,
          command: data.command,
          step: data.step,
          startTime: Date.now()
        });
        
        // Notify web clients of CLI activity
        socket.broadcast.emit('cli:active', {
          projectId: data.projectId,
          command: data.command,
          status: 'active'
        });
      });

      socket.on('cli:task_update', async (data) => {
        // Check for user modifications before CLI update
        const userModifications = await this.checkUserModifications(data.taskId);
        
        if (userModifications.length > 0) {
          // User has priority - notify CLI of conflict
          socket.emit('cli:conflict_detected', {
            taskId: data.taskId,
            userChanges: userModifications,
            cliChanges: data.updates
          });
          return;
        }
        
        // No conflict - proceed with CLI update
        await this.updateTask(data.taskId, data.updates);
        socket.broadcast.emit('task:updated', data);
      });

      socket.on('web:task_edit', async (data) => {
        const cliSession = this.activeCliSessions.get(data.projectId);
        
        if (cliSession) {
          // CLI is active - notify it of user changes
          this.io.to(cliSession.sessionId).emit('web:user_modification', {
            taskId: data.taskId,
            changes: data.updates,
            timestamp: Date.now()
          });
        }
        
        // Apply user changes immediately (user priority)
        await this.updateTask(data.taskId, data.updates);
        socket.broadcast.emit('task:updated', data);
      });

      socket.on('approval:submitted', async (data) => {
        await this.processApproval(data);
        
        const cliSession = this.activeCliSessions.get(data.projectId);
        if (cliSession) {
          this.io.to(cliSession.sessionId).emit('approval:completed', data);
        }
      });

      socket.on('settings:configured', async (data) => {
        await this.saveProjectSettings(data.projectId, data.settings);
        
        const cliSession = this.activeCliSessions.get(data.projectId);
        if (cliSession) {
          this.io.to(cliSession.sessionId).emit('settings:approved', data);
        }
      });

      socket.on('disconnect', () => {
        // Clean up CLI session if this was a CLI connection
        for (const [projectId, session] of this.activeCliSessions.entries()) {
          if (session.sessionId === socket.id) {
            this.activeCliSessions.delete(projectId);
            socket.broadcast.emit('cli:inactive', { projectId });
            break;
          }
        }
      });
    });
  }

  async checkUserModifications(taskId) {
    const recentModifications = await this.db.query(`
      SELECT * FROM task_modifications 
      WHERE task_id = ? AND source = 'web' 
      AND created_at > datetime('now', '-5 minutes')
    `, [taskId]);
    
    return recentModifications;
  }

  async updateTask(taskId, updates) {
    await this.db.query(`
      UPDATE tasks SET 
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [updates.title, updates.description, updates.status, taskId]);
    
    // Log modification for conflict detection
    await this.db.query(`
      INSERT INTO task_modifications (task_id, changes, source, created_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `, [taskId, JSON.stringify(updates), updates.source || 'system']);
  }
}

// CLI-side conflict handling
class CLIConflictHandler {
  constructor(socket, projectId) {
    this.socket = socket;
    this.projectId = projectId;
    this.setupConflictHandlers();
  }

  setupConflictHandlers() {
    this.socket.on('cli:conflict_detected', (data) => {
      console.log(`⚠️  User modified task while CLI was updating:`);
      console.log(`   User changes: ${JSON.stringify(data.userChanges, null, 2)}`);
      console.log(`   CLI changes: ${JSON.stringify(data.cliChanges, null, 2)}`);
      console.log(`   Proceeding with user version (user priority)`);
      
      // Update local state to match user version
      this.updateLocalTaskState(data.taskId, data.userChanges);
    });

    this.socket.on('web:user_modification', (data) => {
      console.log(`📝 User modified task ${data.taskId} in web interface`);
      console.log(`   Changes: ${JSON.stringify(data.changes, null, 2)}`);
      
      // Update local state to match user modification
      this.updateLocalTaskState(data.taskId, data.changes);
    });
  }

  updateLocalTaskState(taskId, changes) {
    // Update CLI's internal task tracking to match user changes
    const localTask = this.getLocalTask(taskId);
    if (localTask) {
      Object.assign(localTask, changes);
      console.log(`✅ Local task state updated to match user changes`);
    }
  }

  notifyTaskUpdate(taskId, updates) {
    this.socket.emit('cli:task_update', {
      taskId: taskId,
      updates: updates,
      source: 'cli',
      timestamp: Date.now()
    });
  }
}
```

**Outputs**:
- Complete real-time synchronization between CLI and web interface
- User-priority conflict resolution with CLI notification
- Active CLI session tracking and status display
- Automatic state reconciliation after conflicts

**Success Criteria**:
- User changes always take priority over CLI changes
- CLI receives immediate notification of user modifications
- No data loss occurs during conflicts
- Web interface shows clear indication of CLI activity status

### Step 5.2: Database State Management Integration
**Purpose**: Replace session.json with database-based state management for persistent, shareable project state

**Inputs**:
- Current session.json usage patterns
- Enhanced database schema with state management tables
- Real-time synchronization requirements

**Implementation**:

```javascript
// Database state manager replacing session.json
class DatabaseStateManager {
  constructor(db, projectId) {
    this.db = db;
    this.projectId = projectId;
    this.cache = new Map(); // Local cache for performance
  }

  async initializeProject(projectData) {
    const projectState = {
      id: generateId(),
      projectId: this.projectId,
      currentCommand: null,
      currentStep: null,
      currentPrototype: null,
      stepContext: JSON.stringify({}),
      commandHistory: JSON.stringify([]),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.db.query(`
      INSERT INTO project_state (id, project_id, current_command, current_step, 
                                current_prototype, step_context, command_history, 
                                created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, Object.values(projectState));

    this.cache.set('state', projectState);
    return projectState;
  }

  async updateState(updates) {
    const currentState = await this.getState();
    const newState = { ...currentState, ...updates, updatedAt: new Date().toISOString() };

    await this.db.query(`
      UPDATE project_state SET 
        current_command = ?,
        current_step = ?,
        current_prototype = ?,
        step_context = ?,
        command_history = ?,
        updated_at = ?
      WHERE project_id = ?
    `, [
      newState.currentCommand,
      newState.currentStep,
      newState.currentPrototype,
      newState.stepContext,
      newState.commandHistory,
      newState.updatedAt,
      this.projectId
    ]);

    this.cache.set('state', newState);
    
    // Notify web interface of state change
    socket.emit('project:state_updated', {
      projectId: this.projectId,
      state: newState
    });

    return newState;
  }

  async getState() {
    // Check cache first
    if (this.cache.has('state')) {
      return this.cache.get('state');
    }

    const result = await this.db.query(`
      SELECT * FROM project_state WHERE project_id = ? ORDER BY updated_at DESC LIMIT 1
    `, [this.projectId]);

    if (result.length === 0) {
      return await this.initializeProject({});
    }

    const state = result[0];
    this.cache.set('state', state);
    return state;
  }

  async addCommandToHistory(command, result) {
    const currentState = await this.getState();
    const history = JSON.parse(currentState.commandHistory || '[]');
    
    history.push({
      command: command,
      result: result,
      timestamp: new Date().toISOString(),
      duration: result.duration || null
    });

    await this.updateState({
      commandHistory: JSON.stringify(history)
    });
  }

  async setCurrentOperation(command, step, context = {}) {
    await this.updateState({
      currentCommand: command,
      currentStep: step,
      stepContext: JSON.stringify(context)
    });
  }

  async clearCurrentOperation() {
    await this.updateState({
      currentCommand: null,
      currentStep: null,
      stepContext: JSON.stringify({})
    });
  }

  // Migration utility from session.json
  async migrateFromSessionFile(sessionFilePath) {
    try {
      const sessionData = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
      
      await this.updateState({
        currentCommand: sessionData.current_command,
        currentStep: sessionData.current_step,
        currentPrototype: sessionData.current_prototype,
        stepContext: JSON.stringify(sessionData.step_context || {}),
        commandHistory: JSON.stringify(sessionData.command_history || [])
      });

      console.log(`✅ Migrated session data from ${sessionFilePath} to database`);
      
      // Backup and remove old session file
      fs.renameSync(sessionFilePath, `${sessionFilePath}.backup`);
      
    } catch (error) {
      console.log(`ℹ️  No session file to migrate: ${sessionFilePath}`);
    }
  }
}

// Usage in enhanced commands
// Replace session.json usage with database state manager
const stateManager = new DatabaseStateManager(db, projectId);

// Instead of: const sessionData = JSON.parse(fs.readFileSync('.claude/state/session.json'))
const projectState = await stateManager.getState();

// Instead of: sessionData.current_step = 'planning'
await stateManager.setCurrentOperation('plan', 'stakeholder_analysis', {
  stakeholders: analysisResult.stakeholders,
  complexity: analysisResult.complexity
});

// Instead of: fs.writeFileSync('.claude/state/session.json', JSON.stringify(sessionData))
// No action needed - database automatically persists
```

**Outputs**:
- Complete database-based state management system
- Migration utility from existing session.json files
- Real-time state synchronization between CLI and web interface
- Persistent project state that survives container restarts

**Success Criteria**:
- All project state is stored in database instead of session.json files
- State changes are immediately visible in web interface
- CLI commands can resume from any interruption point using database state
- Migration from existing session.json files works correctly

---

## Implementation Timeline

### Week 1-2: Foundation (Phase 1)
- Enhanced database schema implementation
- JSON learning storage system setup
- State management migration from session.json

### Week 3-4: Command Enhancement (Phase 2)
- Enhanced PLAN command with methodology integration
- Enhanced IMPLEMENT command with TDD + SAGE integration
- Basic OPTIMIZE and QA command enhancements

### Week 5-6: Interactive Interface (Phase 3)
- Kanban board interactivity (drag-drop, editing)
- Settings configuration interface
- Approval workflow integration

### Week 7-8: Learning Integration (Phase 4)
- SAGE learning data collection
- Adaptive behavior implementation
- Cross-project pattern recognition

### Week 9-10: Real-Time System (Phase 5)
- Complete Socket.io real-time integration
- Database state management
- Conflict resolution and user priority system

### Week 11-12: Testing & Refinement
- Comprehensive system testing
- Performance optimization
- Documentation and user experience refinement

---

## Success Metrics

### Immediate Technical Success
- ✅ All current Kanban board issues resolved (editing, drag-drop, real-time updates)
- ✅ Enhanced commands demonstrate clear BMAD+SAGE+Archon integration
- ✅ Approval workflows function seamlessly in web interface
- ✅ Database-based state management replaces session.json successfully
- ✅ Real-time synchronization works between CLI and web interface

### Methodology Integration Success
- ✅ BMAD validation gates prevent incomplete work from proceeding
- ✅ SAGE learning system captures and applies patterns across projects
- ✅ Archon agent generation provides specialized capabilities when needed
- ✅ Dependency tracking automatically creates validation tasks when changes occur
- ✅ Cross-project learning improves system performance over time

### User Experience Success
- ✅ Settings configuration is intuitive with clear level descriptions
- ✅ Approval workflow doesn't interrupt development flow
- ✅ Prototype implementation is clearly organized and sequential
- ✅ User changes always take priority over CLI changes without data loss
- ✅ System provides demonstrable productivity improvement

### Long-term Learning Success
- ✅ System gets measurably better at similar projects over time
- ✅ Dependency issues are caught earlier in subsequent projects
- ✅ Implementation patterns become more efficient with accumulated experience
- ✅ User approval patterns inform automatic system adaptations
- ✅ Cross-project intelligence provides relevant suggestions for new projects

This implementation plan transforms your MVP into the complete integrated BMAD+SAGE+Archon Context Engineering system while preserving your proven components and addressing all identified issues. The phased approach ensures each component builds on solid foundations while delivering immediate value.