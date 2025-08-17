# BMAD Context Engineering Complete System Implementation

## Project Overview

You are implementing the **complete BMAD Context Engineering system** that integrates the best methodologies from BMAD (structured planning), SAGE (adaptive learning), and Archon (AI agent generation) with a fully interactive web Kanban interface and persistent learning capabilities.

### System Vision
Transform the current MVP into a complete system that provides:
- **Enhanced Command Workflow**: PLAN → IMPLEMENT → [OPTIMIZE] → [QA] with full methodology integration
- **Interactive Kanban Board**: Drag-and-drop task management with real-time updates
- **Approval Workflow System**: Markdown-based approvals integrated with web interface
- **Persistent Learning**: Cross-project learning that improves system intelligence over time
- **Methodology-Specific Intelligence**: Tasks adapt based on BMAD, SAGE, and Archon principles

## Current System Analysis

### What Currently Works ✅
- Basic Docker containerization with SQLite database
- tRPC API with basic CRUD operations
- React components with Redux state management
- Socket.io foundation for real-time updates
- Unified project creation utility (`project-create.js`)

### Critical Issues to Fix ❌

#### 1. Non-Interactive Kanban Board
- **Missing**: Drag-and-drop between columns
- **Missing**: Inline task editing capabilities
- **Missing**: Task creation from web interface
- **Missing**: Project tab management (hide/show without deleting)
- **Missing**: Real-time updates via Socket.io

#### 2. Limited Command Integration
- **Missing**: Enhanced methodology integration in commands
- **Missing**: Approval workflow system
- **Missing**: BMAD validation gates
- **Missing**: SAGE learning loops
- **Missing**: Archon agent generation

#### 3. Basic Database Schema
- **Missing**: Methodology-specific task metadata
- **Missing**: Learning and adaptation tracking
- **Missing**: Approval workflow state management
- **Missing**: Pattern recognition for continuous improvement

## Implementation Requirements

### Phase 1: Enhanced Database Schema and Persistent Volumes

#### Database Schema Extensions
```sql
-- Enhanced methodology-specific task metadata
ALTER TABLE tasks ADD COLUMN methodology_type TEXT CHECK(methodology_type IN ('bmad', 'sage', 'archon', 'hybrid'));
ALTER TABLE tasks ADD COLUMN validation_status TEXT DEFAULT 'pending' CHECK(validation_status IN ('pending', 'in_progress', 'passed', 'failed'));
ALTER TABLE tasks ADD COLUMN validation_criteria TEXT; -- JSON array of criteria
ALTER TABLE tasks ADD COLUMN stakeholder_dependencies TEXT; -- JSON array of required approvals
ALTER TABLE tasks ADD COLUMN quality_thresholds TEXT; -- JSON object with metrics
ALTER TABLE tasks ADD COLUMN learning_objectives TEXT; -- JSON array for SAGE tasks
ALTER TABLE tasks ADD COLUMN success_metrics TEXT; -- JSON object with measurable criteria
ALTER TABLE tasks ADD COLUMN agent_requirements TEXT; -- JSON object for Archon tasks
ALTER TABLE tasks ADD COLUMN knowledge_dependencies TEXT; -- JSON array of required knowledge sources

-- Approval workflow system
CREATE TABLE approvals (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  command TEXT NOT NULL,
  phase TEXT NOT NULL,
  file_path TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_by TEXT,
  approved_at TIMESTAMP,
  rejection_reason TEXT,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- SAGE learning and adaptation system
CREATE TABLE learning_sessions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  command TEXT NOT NULL,
  task_id TEXT,
  learning_objective TEXT NOT NULL,
  environmental_context TEXT NOT NULL, -- JSON: complexity, deadlines, tech_stack, team_size
  execution_variations TEXT NOT NULL, -- JSON: different approaches tried
  success_metrics TEXT NOT NULL, -- JSON: quantified results
  outcomes TEXT NOT NULL, -- JSON: what actually happened
  adaptations_made TEXT NOT NULL, -- JSON: changes made based on results
  confidence_level REAL DEFAULT 0.5, -- 0.0 to 1.0
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(task_id) REFERENCES tasks(id) ON DELETE SET NULL
);

-- Pattern recognition for continuous improvement
CREATE TABLE adaptation_patterns (
  id TEXT PRIMARY KEY,
  pattern_type TEXT NOT NULL, -- failure_recovery, optimization_opportunity, success_pattern
  context_signature TEXT NOT NULL, -- hash of similar situations
  situation_characteristics TEXT NOT NULL, -- JSON: tech_stack, complexity, team_factors
  successful_adaptations TEXT NOT NULL, -- JSON: what worked
  failure_patterns TEXT, -- JSON: what didn't work
  frequency_count INTEGER DEFAULT 1,
  success_rate REAL DEFAULT 0.0, -- 0.0 to 1.0
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confidence_score REAL DEFAULT 0.5 -- based on sample size and consistency
);

-- Enhanced agent tracking for Archon methodology
CREATE TABLE agent_sessions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  task_id TEXT,
  agent_type TEXT NOT NULL,
  capabilities_required TEXT NOT NULL, -- JSON array
  knowledge_sources TEXT NOT NULL, -- JSON array
  generated_config TEXT, -- JSON: actual agent configuration used
  performance_metrics TEXT, -- JSON: how well the agent performed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(task_id) REFERENCES tasks(id) ON DELETE SET NULL
);

-- Decision point tracking for system learning
CREATE TABLE decision_points (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  context_type TEXT NOT NULL, -- planning, implementation, optimization, qa
  decision_options TEXT NOT NULL, -- JSON array of options considered
  chosen_option TEXT NOT NULL,
  reasoning TEXT NOT NULL,
  outcome_quality REAL, -- 0.0 to 1.0, filled in later
  environmental_factors TEXT NOT NULL, -- JSON: project context when decision made
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  outcome_recorded_at TIMESTAMP,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);
```

#### Docker Volume Configuration
Update `docker-compose.yml` to include persistent volumes:
```yaml
version: '3.8'
services:
  bmad-context:
    build: .
    ports:
      - "3010:3010"
      - "3011:3011"
    volumes:
      - learning_data:/app/data          # Persistent SQLite database and learning data
      - approval_files:/app/approvals    # Persistent approval markdown files
      - knowledge_cache:/app/cache       # Downloaded documentation and knowledge base
      - agent_configs:/app/agents        # Generated agent configurations
    environment:
      - NODE_ENV=production
      - DATABASE_PATH=/app/data/bmad.db
      - APPROVALS_PATH=/app/approvals

volumes:
  learning_data:      # Persists across all projects and container restarts
  approval_files:     # Maintains approval history and templates
  knowledge_cache:    # Caches external documentation for offline access
  agent_configs:      # Stores generated agent definitions
```

### Phase 2: Enhanced Command System with Methodology Integration

#### Enhanced PLAN Command
Transform the current basic planning into a comprehensive BMAD+SAGE+Archon planning system:

**File**: `.claude/commands/plan.md`

```markdown
# Enhanced Plan Command - BMAD+SAGE+Archon Integration

## Purpose
Comprehensive project planning using integrated BMAD structured planning, SAGE adaptive learning, and Archon agent generation methodologies.

## Implementation Steps

### Step 1: Load Enhanced Agents and MCP Integration
1. **STATE_MANAGER**: Update state - current_command="plan", current_step=1
2. Load PROJECT_MANAGER agent with methodology integration
3. Load CONTENT_SUMMARIZER agent for documentation processing
4. Load ANALYSIS_PROJECT agent for comprehensive project analysis
5. Request MCP capabilities: "Need: file_operations, version_control, web_search, documentation_access, critical_review"

### Step 2: Project Understanding and Analysis (BMAD Foundation)
1. **Input Processing**: Support three input methods from existing design:
   - Direct description: `/plan "Build task management system"`
   - File-based: `/plan --file requirements.md`
   - Folder-based: `/plan --folder docs/requirements/`
2. **CONTENT_SUMMARIZER**: Process all input sources with 1000-line limit handling
3. **ANALYSIS_PROJECT**: Demonstrate comprehensive understanding:
   - Extract project goals and scope
   - Identify stakeholder requirements
   - Analyze technical complexity factors
   - Ask clarifying questions about ambiguous requirements
4. **Create Approval File**: Generate `/approvals/plan_phase1_understanding.md`
5. **WAIT FOR APPROVAL**: System pauses until human approves understanding

### Step 3: SAGE Learning Integration and Context Analysis
1. **Historical Pattern Analysis**: Query `adaptation_patterns` table for similar projects
2. **Learning Session Creation**: Initialize new learning session in database
3. **Environmental Context Assessment**:
   - Project complexity scoring (1-10)
   - Technology stack familiarity assessment
   - Timeline pressure evaluation
   - Team experience factors
4. **Adaptive Planning Strategy**: Based on historical patterns, adjust planning approach
5. **Success Metrics Definition**: Establish quantifiable success criteria for planning phase

### Step 4: BMAD Structured Planning Workflow
1. **Stakeholder Analysis**:
   - Identify all project stakeholders
   - Define approval requirements and validation gates
   - Create stakeholder communication plan
2. **Requirements Decomposition**:
   - Break requirements into testable components
   - Define acceptance criteria for each component
   - Establish validation methods and quality thresholds
3. **Risk Assessment and Mitigation**:
   - Identify technical, timeline, and resource risks
   - Create mitigation strategies for each risk
   - Define risk monitoring and response plans
4. **Quality Gates Definition**:
   - Define validation criteria for each project phase
   - Establish testing requirements and coverage targets
   - Create quality metrics and measurement procedures

### Step 5: Archon Agent Generation and Knowledge Integration
1. **Agent Requirements Analysis**:
   - Determine what types of AI agents will be needed for this project
   - Identify required capabilities for each agent type
   - Define knowledge base requirements for agent effectiveness
2. **Knowledge Source Identification**:
   - Catalog required external documentation
   - Identify framework and library documentation needs
   - Create knowledge acquisition plan
3. **Agent Configuration Planning**:
   - Design agent specialization for project-specific needs
   - Plan agent collaboration and handoff procedures
   - Define agent performance metrics and evaluation criteria
4. **Dynamic Problem-Solving Preparation**:
   - Identify potential adaptation points during execution
   - Create fallback strategies for common failure modes
   - Design learning feedback loops for continuous improvement

### Step 6: Project Decomposition with Methodology Integration
1. **Prototype Definition** (Enhanced from current system):
   - Break project into 1-3 independently deployable prototypes
   - Each prototype must provide tangible user value
   - Define methodology-specific requirements for each prototype
2. **BMAD Validation Gates**: For each prototype:
   - Define validation criteria and quality thresholds
   - Establish stakeholder approval requirements
   - Create documentation requirements
   - Plan integration dependencies
3. **SAGE Learning Objectives**: For each prototype:
   - Define learning objectives and success metrics
   - Establish adaptation triggers and response strategies
   - Create context signatures for pattern recognition
   - Plan performance data collection
4. **Archon Agent Requirements**: For each prototype:
   - Specify required agent types and capabilities
   - Define knowledge base dependencies
   - Plan agent generation and configuration steps
   - Establish dynamic problem-solving parameters

### Step 7: Enhanced Kanban Task Creation
1. **Project Setup**: Ensure project exists using unified creation utility
2. **Methodology-Specific Task Creation**:
   ```javascript
   const { createProject } = require('../utils/project-create');
   const { createKanbanAPI } = require('../utils/kanban-api');
   
   // Create project with methodology-specific metadata
   const project = await createProject(projectName, projectDescription, 'hybrid');
   
   const kanban = createKanbanAPI();
   
   // Create BMAD planning tasks
   for (const prototype of prototypes) {
     await kanban.createTask(project.id, `BMAD: Validate ${prototype.name}`, 
       `Validation criteria: ${prototype.validation_criteria.join(', ')}`, {
       methodology_type: 'bmad',
       validation_criteria: JSON.stringify(prototype.validation_criteria),
       stakeholder_dependencies: JSON.stringify(prototype.stakeholder_deps),
       quality_thresholds: JSON.stringify(prototype.quality_metrics)
     });
   }
   
   // Create SAGE learning tasks
   for (const learningObjective of sageLearningObjectives) {
     await kanban.createTask(project.id, `SAGE: Learn ${learningObjective.name}`,
       `Learning objective: ${learningObjective.description}`, {
       methodology_type: 'sage',
       learning_objectives: JSON.stringify([learningObjective.name]),
       success_metrics: JSON.stringify(learningObjective.metrics)
     });
   }
   
   // Create Archon agent generation tasks
   for (const agentReq of archonAgentRequirements) {
     await kanban.createTask(project.id, `ARCHON: Generate ${agentReq.type} Agent`,
       `Agent capabilities: ${agentReq.capabilities.join(', ')}`, {
       methodology_type: 'archon',
       agent_requirements: JSON.stringify(agentReq),
       knowledge_dependencies: JSON.stringify(agentReq.knowledge_sources)
     });
   }
   ```

### Step 8: Final Approval and Learning Integration
1. **Create Comprehensive Plan Document**: Generate `/approvals/plan_final_comprehensive.md`
2. **Learning Session Update**: Record planning session outcomes in database
3. **Pattern Recognition**: Update adaptation patterns with planning decisions
4. **WAIT FOR FINAL APPROVAL**: System pauses until human approves complete plan
5. **State Transition**: Update project state to ready for implementation

## Success Criteria
- All three methodologies (BMAD, SAGE, Archon) properly integrated
- Comprehensive project understanding demonstrated and approved
- Stakeholder requirements and validation gates clearly defined
- Learning objectives and success metrics established
- Agent requirements and knowledge dependencies identified
- Kanban board populated with methodology-specific tasks
- Historical learning patterns incorporated into planning decisions
- Two-stage approval process completed successfully
```

#### Enhanced IMPLEMENT Command
**File**: `.claude/commands/implement.md`

```markdown
# Enhanced Implement Command - Full Methodology Integration

## Purpose
Execute implementation using TDD methodology enhanced with BMAD validation gates, SAGE adaptive learning, and Archon dynamic agent generation.

## Implementation Steps

### Step 1: Enhanced Agent Loading and Learning Context
1. **STATE_MANAGER**: Update state - current_command="implement", current_step=1
2. Load PROJECT_MANAGER with methodology integration
3. Load CODER agent with adaptive capabilities
4. Load TESTER agent with comprehensive validation
5. Load REVIEWER agent with critical analysis
6. **SAGE Learning Context**: Load historical patterns for similar implementation tasks
7. **Adaptation Strategy**: Based on learning patterns, adjust implementation approach

### Step 2: Prototype Analysis and Methodology Assignment
1. **Prototype Selection**: Choose next incomplete prototype or user-specified prototype
2. **Methodology Analysis**: Determine optimal methodology mix for this prototype:
   - High complexity + tight deadlines → SAGE adaptive approach
   - Critical infrastructure + security requirements → BMAD structured validation
   - Novel problems + uncertain requirements → Archon dynamic generation
3. **Context Signature Creation**: Record environmental factors for learning system
4. **Success Metrics Definition**: Establish measurable outcomes for learning feedback

### Step 3: Enhanced TDD with Methodology Integration

#### BMAD-Enhanced TDD Process:
```javascript
// For each feature in prototype:
for (const feature of prototypeFeatures) {
  // BMAD Validation Gate: Pre-implementation validation
  await validateBMADRequirements(feature);
  
  // SAGE Learning: Check historical patterns for similar features
  const historicalPatterns = await queryLearningPatterns(feature.type, feature.complexity);
  
  // Archon Agent Generation: Create specialized agents if needed
  if (feature.requiresSpecializedAgent) {
    await generateArchonAgent(feature.requirements);
  }
  
  // Enhanced TDD Cycle with git commits:
  // 1. RED Phase: Create tests with BMAD validation criteria
  await createEnhancedTests(feature, {
    bmadCriteria: feature.validation_criteria,
    sageMetrics: feature.success_metrics,
    archonCapabilities: feature.agent_requirements
  });
  
  await gitCommit(`[IMPLEMENT]: ${feature.name} tests - Enhanced TDD red phase with methodology validation`);
  
  // 2. GREEN Phase: Implement minimal solution with adaptive approach
  const implementationResult = await implementWithSAGEAdaptation(feature, historicalPatterns);
  
  await gitCommit(`[IMPLEMENT]: ${feature.name} - Green phase implementation using adaptive patterns`);
  
  // 3. REFACTOR Phase: Apply BMAD quality standards
  await refactorWithBMADStandards(feature, feature.quality_thresholds);
  
  await gitCommit(`[IMPLEMENT]: ${feature.name} - Refactored to BMAD quality standards`);
  
  // 4. ARCHON Validation: Use generated agents for specialized validation
  if (feature.archonAgents) {
    await validateWithArchonAgents(feature);
  }
  
  // 5. SAGE Learning Update: Record outcomes for future improvement
  await updateLearningSession(feature, implementationResult);
  
  // 6. Kanban Update: Mark task complete with methodology metadata
  await updateKanbanTask(feature.taskId, {
    status: 'done',
    actual_hours: implementationResult.timeSpent,
    validation_status: 'passed',
    learning_outcomes: implementationResult.learningOutcomes
  });
}
```

### Step 4: Continuous Validation and Adaptation
1. **BMAD Validation Gates**: After each feature:
   - Run comprehensive test suite
   - Validate against quality thresholds
   - Check stakeholder requirements compliance
   - Verify documentation completeness
2. **SAGE Learning Integration**: After each feature:
   - Analyze implementation success vs. predictions
   - Update adaptation patterns based on outcomes
   - Adjust approach for remaining features based on learning
   - Record decision points and reasoning for future analysis
3. **Archon Dynamic Problem-Solving**: When issues arise:
   - Generate specialized debugging agents
   - Create custom validation agents for complex scenarios
   - Adapt agent capabilities based on discovered problems
   - Update agent configurations for similar future situations

### Step 5: Failure Recovery with Enhanced Methodologies
**Enhanced Failure Recovery Strategy**:
```
Attempt 1: SAGE Adaptive Approach
- Query historical patterns for similar failures
- Apply previously successful recovery strategies
- Update failure pattern database with new approaches

Attempt 2: BMAD Structured Analysis
- Systematic failure root cause analysis
- Structured problem decomposition
- Methodical validation of each component

Attempt 3: Archon Dynamic Generation
- Generate specialized problem-solving agents
- Create custom analysis tools for specific failure type
- Apply novel approaches not in historical patterns

Failure Escalation: Human Intervention
- Present comprehensive analysis from all three methodologies
- Provide learning insights and recommended approaches
- Update learning system with human-provided solutions
```

### Step 6: Prototype Completion with Comprehensive Validation
1. **BMAD Final Validation**:
   - Complete test suite execution
   - Stakeholder validation checklist completion
   - Quality metrics achievement verification
   - Documentation completeness review
2. **SAGE Learning Completion**:
   - Final learning session outcome recording
   - Pattern recognition and adaptation update
   - Success metric achievement analysis
   - Knowledge transfer to future prototypes
3. **Archon Agent Performance Evaluation**:
   - Agent effectiveness measurement
   - Configuration optimization for future use
   - Knowledge base expansion based on discoveries
   - Dynamic problem-solving capability assessment
4. **Enhanced Web Validation** (for web projects):
   - Comprehensive browser testing across all supported browsers
   - Mobile responsiveness verification
   - Performance metric capture (Core Web Vitals)
   - Accessibility compliance validation
   - User journey testing with real data
5. **Final Git Commit**: `[IMPLEMENT]: ${prototypeName} - Complete prototype with full methodology integration`

### Step 7: Approval and Learning Integration
1. **Generate Implementation Report**: Create `/approvals/implement_${prototypeName}_complete.md`
2. **Learning Analysis**: Create comprehensive learning summary
3. **Pattern Recognition Update**: Update database with new successful patterns
4. **WAIT FOR APPROVAL**: System pauses for human validation
5. **State Transition**: Mark prototype complete and ready for next phase

## Success Criteria
- All features implemented using enhanced TDD with full methodology integration
- BMAD validation gates successfully passed
- SAGE learning objectives achieved and recorded
- Archon agents successfully generated and utilized
- Comprehensive test coverage with all tests passing
- Git commits created at all major milestones
- Web validation completed successfully (for web projects)
- Learning system updated with implementation outcomes
- Pattern recognition database enhanced with new successful approaches
- Human approval received for prototype completion
```

### Phase 3: Interactive Kanban Board with Real-time Updates

#### Enhanced KanbanBoard Component
**File**: `client/src/components/KanbanBoard.tsx`

```typescript
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskEditModal from './TaskEditModal';
import ApprovalViewer from './ApprovalViewer';
import { trpc } from '../api/trpc';
import { socket } from '../api/socket';
import { setTasks, moveTask, updateTask, addTask } from '../store/taskSlice';
import { RootState } from '../store/store';
import { Task } from '../store/taskSlice';
import './KanbanBoard.css';

interface KanbanBoardProps {
  projectId: string;
}

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: '#e74c3c' },
  { id: 'in-progress', title: 'In Progress', color: '#f39c12' },
  { id: 'review', title: 'Review', color: '#9b59b6' },
  { id: 'done', title: 'Done', color: '#27ae60' },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ projectId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks[projectId] || []);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>('todo');
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);

  // Enhanced task loading with methodology metadata
  const { data: taskData, refetch: refetchTasks } = trpc.task.listByProject.useQuery(
    { projectId },
    { enabled: !!projectId }
  );

  // Load pending approvals for this project
  const { data: approvalData, refetch: refetchApprovals } = trpc.approval.listByProject.useQuery(
    { projectId },
    { enabled: !!projectId }
  );

  useEffect(() => {
    if (taskData) {
      dispatch(setTasks({ projectId, tasks: taskData }));
    }
  }, [taskData, projectId, dispatch]);

  useEffect(() => {
    if (approvalData) {
      setPendingApprovals(approvalData.filter(a => a.status === 'pending'));
    }
  }, [approvalData]);

  // Enhanced real-time updates with methodology integration
  useEffect(() => {
    socket.emit('join-project', projectId);
    
    // Listen for real-time task updates
    socket.on('task:updated', (updatedTask: Task) => {
      if (updatedTask.project_id === projectId) {
        dispatch(updateTask(updatedTask));
      }
    });

    // Listen for new tasks from CLI commands
    socket.on('task:created', (newTask: Task) => {
      if (newTask.project_id === projectId) {
        dispatch(addTask(newTask));
      }
    });

    // Listen for approval updates
    socket.on('approval:created', (approval) => {
      if (approval.project_id === projectId) {
        refetchApprovals();
      }
    });

    // Listen for approval status changes
    socket.on('approval:updated', (approval) => {
      if (approval.project_id === projectId) {
        refetchApprovals();
        // Trigger CLI command continuation if approved
        if (approval.status === 'approved') {
          socket.emit('approval-granted', { approvalId: approval.id });
        }
      }
    });
    
    return () => {
      socket.off('task:updated');
      socket.off('task:created');
      socket.off('approval:created');
      socket.off('approval:updated');
      socket.emit('leave-project', projectId);
    };
  }, [projectId, dispatch]);

  // Enhanced drag and drop with methodology validation
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const task = tasks.find(t => t.id === draggableId);
    if (!task) return;

    // Check methodology-specific validation before move
    if (task.methodology_type === 'bmad' && destination.droppableId === 'done') {
      const validationPassed = await validateBMADCompletion(task);
      if (!validationPassed) {
        alert('Task cannot be moved to Done: BMAD validation criteria not met');
        return;
      }
    }

    // Update local state immediately for responsive UI
    dispatch(moveTask({
      projectId,
      taskId: draggableId,
      sourceStatus: source.droppableId,
      targetStatus: destination.droppableId,
      sourceIndex: source.index,
      targetIndex: destination.index,
    }));

    // Emit to other clients for real-time sync
    socket.emit('task:move', {
      taskId: draggableId,
      sourceStatus: source.droppableId,
      targetStatus: destination.droppableId,
      projectId,
    });

    // Update server with methodology validation
    try {
      await trpc.task.updateWithMethodology.mutate({
        taskId: draggableId,
        updates: {
          status: destination.droppableId as any,
          column_order: destination.index,
        },
        validateMethodology: true
      });
    } catch (error) {
      console.error('Failed to update task position:', error);
      refetchTasks(); // Revert on error
    }
  };

  // Enhanced task creation with methodology selection
  const handleTaskCreate = async (taskData: any) => {
    try {
      const enhancedTaskData = {
        ...taskData,
        projectId,
        status: selectedColumn as any,
        methodology_type: taskData.methodology || 'hybrid',
        validation_criteria: taskData.validationCriteria ? JSON.stringify(taskData.validationCriteria) : null,
        learning_objectives: taskData.learningObjectives ? JSON.stringify(taskData.learningObjectives) : null,
        agent_requirements: taskData.agentRequirements ? JSON.stringify(taskData.agentRequirements) : null,
      };

      await trpc.task.create.mutate(enhancedTaskData);
      await refetchTasks();
      setShowTaskForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  // Enhanced task editing with methodology metadata
  const handleTaskEdit = async (taskId: string, updates: any) => {
    try {
      await trpc.task.updateWithMethodology.mutate({
        taskId,
        updates,
        validateMethodology: true
      });
      await refetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  // Methodology validation helper
  const validateBMADCompletion = async (task: Task): Promise<boolean> => {
    if (!task.validation_criteria) return true;
    
    try {
      const criteria = JSON.parse(task.validation_criteria);
      // Check if all validation criteria are met
      const validationResult = await trpc.task.validateBMADCriteria.query({
        taskId: task.id,
        criteria
      });
      return validationResult.allPassed;
    } catch {
      return true; // Allow move if validation check fails
    }
  };

  const handleAddTask = (columnId: string) => {
    setSelectedColumn(columnId);
    setShowTaskForm(true);
  };

  const getTasksForColumn = (columnId: string) => {
    return tasks
      .filter(task => task.status === columnId)
      .sort((a, b) => a.column_order - b.column_order);
  };

  // Get methodology-specific styling
  const getMethodologyColor = (methodology: string) => {
    switch (methodology) {
      case 'bmad': return '#3498db';
      case 'sage': return '#e67e22';
      case 'archon': return '#9b59b6';
      case 'hybrid': return '#1abc9c';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="kanban-board">
      {/* Pending Approvals Section */}
      {pendingApprovals.length > 0 && (
        <div className="approvals-section">
          <h3>Pending Approvals ({pendingApprovals.length})</h3>
          <div className="approval-cards">
            {pendingApprovals.map(approval => (
              <ApprovalViewer key={approval.id} approval={approval} />
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-columns">
          {COLUMNS.map((column) => {
            const columnTasks = getTasksForColumn(column.id);
            
            return (
              <div key={column.id} className="kanban-column">
                <div 
                  className="column-header"
                  style={{ borderTopColor: column.color }}
                >
                  <h3>{column.title}</h3>
                  <div className="column-stats">
                    <span className="task-count">{columnTasks.length}</span>
                    <div className="methodology-indicators">
                      {['bmad', 'sage', 'archon', 'hybrid'].map(methodology => {
                        const count = columnTasks.filter(t => t.methodology_type === methodology).length;
                        return count > 0 ? (
                          <span 
                            key={methodology}
                            className="methodology-indicator"
                            style={{ backgroundColor: getMethodologyColor(methodology) }}
                            title={`${count} ${methodology.toUpperCase()} tasks`}
                          >
                            {count}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                isDragging={snapshot.isDragging}
                                onEdit={() => setEditingTask(task)}
                                showMethodologyIndicator={true}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                
                <button
                  className="add-task-btn"
                  onClick={() => handleAddTask(column.id)}
                >
                  + Add Task
                </button>
              </div>
            );
          })}
        </div>
      </DragDropContext>
      
      {/* Enhanced Task Forms */}
      {showTaskForm && (
        <TaskForm
          onSubmit={handleTaskCreate}
          onCancel={() => setShowTaskForm(false)}
          defaultStatus={selectedColumn}
          showMethodologyOptions={true}
        />
      )}

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onSave={handleTaskEdit}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

// Helper function to validate BMAD completion
const validateBMADCompletion = async (task: Task): Promise<boolean> => {
  // Implementation of BMAD validation logic
  return true;
};

export default KanbanBoard;
```

#### Enhanced TaskCard Component
**File**: `client/src/components/TaskCard.tsx`

```typescript
import React, { useState } from 'react';
import { Task } from '../store/taskSlice';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  isDragging: boolean;
  onEdit?: () => void;
  showMethodologyIndicator?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  isDragging, 
  onEdit,
  showMethodologyIndicator = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const getAssigneeIcon = (assignedTo: string) => {
    switch (assignedTo) {
      case 'human': return '👤';
      case 'claude': return '🤖';
      case 'automated': return '⚙️';
      default: return '❓';
    }
  };

  const getMethodologyColor = (methodology: string) => {
    switch (methodology) {
      case 'bmad': return '#3498db';
      case 'sage': return '#e67e22';
      case 'archon': return '#9b59b6';
      case 'hybrid': return '#1abc9c';
      default: return '#95a5a6';
    }
  };

  const getValidationStatus = () => {
    if (task.methodology_type === 'bmad' && task.validation_status) {
      const statusIcons = {
        'pending': '⏳',
        'in_progress': '🔄',
        'passed': '✅',
        'failed': '❌'
      };
      return statusIcons[task.validation_status] || '❓';
    }
    return null;
  };

  const parseJSONSafely = (jsonString: string | null) => {
    if (!jsonString) return null;
    try {
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  };

  const validationCriteria = parseJSONSafely(task.validation_criteria);
  const learningObjectives = parseJSONSafely(task.learning_objectives);
  const agentRequirements = parseJSONSafely(task.agent_requirements);

  return (
    <div className={`task-card ${isDragging ? 'dragging' : ''} ${task.methodology_type || 'default'}`}>
      <div className="task-header">
        <div className="task-indicators">
          <span 
            className="task-priority"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
            title={`${task.priority} priority`}
          />
          <span className="task-assignee" title={`Assigned to ${task.assigned_to}`}>
            {getAssigneeIcon(task.assigned_to)}
          </span>
          {showMethodologyIndicator && task.methodology_type && (
            <span 
              className="methodology-badge"
              style={{ backgroundColor: getMethodologyColor(task.methodology_type) }}
              title={`${task.methodology_type.toUpperCase()} methodology`}
            >
              {task.methodology_type.charAt(0).toUpperCase()}
            </span>
          )}
          {getValidationStatus() && (
            <span className="validation-status" title={`Validation ${task.validation_status}`}>
              {getValidationStatus()}
            </span>
          )}
        </div>
        
        {onEdit && (
          <button 
            className="edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            title="Edit task"
          >
            ✏️
          </button>
        )}
      </div>
      
      <h4 className="task-title" onClick={() => setIsExpanded(!isExpanded)}>
        {task.title}
      </h4>
      
      {task.description && (
        <p className="task-description">
          {isExpanded ? task.description : `${task.description.slice(0, 100)}${task.description.length > 100 ? '...' : ''}`}
        </p>
      )}

      {/* Methodology-specific metadata display */}
      {isExpanded && (
        <div className="task-metadata">
          {validationCriteria && validationCriteria.length > 0 && (
            <div className="metadata-section">
              <strong>Validation Criteria:</strong>
              <ul>
                {validationCriteria.map((criteria: string, index: number) => (
                  <li key={index}>{criteria}</li>
                ))}
              </ul>
            </div>
          )}
          
          {learningObjectives && learningObjectives.length > 0 && (
            <div className="metadata-section">
              <strong>Learning Objectives:</strong>
              <ul>
                {learningObjectives.map((objective: string, index: number) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          )}
          
          {agentRequirements && (
            <div className="metadata-section">
              <strong>Agent Requirements:</strong>
              <p>Type: {agentRequirements.type}</p>
              {agentRequirements.capabilities && (
                <p>Capabilities: {agentRequirements.capabilities.join(', ')}</p>
              )}
            </div>
          )}
        </div>
      )}
      
      {(task.estimated_hours || task.actual_hours) && (
        <div className="task-footer">
          {task.estimated_hours && (
            <span className="task-hours" title="Estimated hours">
              ⏱️ {task.estimated_hours}h
            </span>
          )}
          {task.actual_hours && (
            <span className="task-hours actual" title="Actual hours">
              ✓ {task.actual_hours}h
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
```

### Phase 4: Approval Workflow System

#### ApprovalViewer Component
**File**: `client/src/components/ApprovalViewer.tsx`

```typescript
import React, { useState } from 'react';
import { trpc } from '../api/trpc';
import { socket } from '../api/socket';
import './ApprovalViewer.css';

interface ApprovalViewerProps {
  approval: {
    id: string;
    project_id: string;
    command: string;
    phase: string;
    content: string;
    status: string;
    created_at: string;
  };
}

const ApprovalViewer: React.FC<ApprovalViewerProps> = ({ approval }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedContent, setEditedContent] = useState(approval.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleApprove = async () => {
    try {
      await trpc.approval.update.mutate({
        id: approval.id,
        status: 'approved',
        content: editedContent
      });
      
      // Emit socket event to notify CLI command to continue
      socket.emit('approval-granted', { approvalId: approval.id });
    } catch (error) {
      console.error('Failed to approve:', error);
    }
  };

  const handleReject = async () => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      await trpc.approval.update.mutate({
        id: approval.id,
        status: 'rejected',
        rejection_reason: reason
      });
      
      // Emit socket event to notify CLI command of rejection
      socket.emit('approval-rejected', { 
        approvalId: approval.id,
        reason 
      });
    } catch (error) {
      console.error('Failed to reject:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await trpc.approval.update.mutate({
        id: approval.id,
        content: editedContent
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save edit:', error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="approval-card">
      <div className="approval-header">
        <h4>{approval.command.toUpperCase()} - {approval.phase}</h4>
        <div className="approval-actions">
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>
      
      <div className="approval-meta">
        <span className="approval-time">Created: {formatTimestamp(approval.created_at)}</span>
        <span className={`approval-status ${approval.status}`}>
          {approval.status.toUpperCase()}
        </span>
      </div>

      {isExpanded && (
        <div className="approval-content">
          {isEditing ? (
            <div className="approval-editor">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="approval-textarea"
                rows={20}
              />
              <div className="editor-actions">
                <button onClick={handleSaveEdit} className="btn btn-primary">
                  Save Changes
                </button>
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(approval.content);
                  }} 
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="approval-display">
              <pre className="approval-text">{editedContent}</pre>
              <div className="approval-actions-full">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn btn-secondary"
                >
                  Edit
                </button>
                <button 
                  onClick={handleReject}
                  className="btn btn-danger"
                >
                  Reject
                </button>
                <button 
                  onClick={handleApprove}
                  className="btn btn-success"
                >
                  Approve
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApprovalViewer;
```

### Phase 5: Enhanced tRPC Router with Methodology Support

#### Enhanced tRPC Router
**File**: `server/src/trpc/router.js`

Add these new procedures to the existing router:

```javascript
// Enhanced task procedures with methodology support
const enhancedTaskRouter = router({
  // ... existing procedures ...

  updateWithMethodology: publicProcedure
    .input(z.object({
      taskId: z.string(),
      updates: z.record(z.any()),
      validateMethodology: z.boolean().default(false)
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const { taskId, updates, validateMethodology } = input;
      
      const oldTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);
      
      // Methodology-specific validation
      if (validateMethodology && oldTask.methodology_type === 'bmad') {
        if (updates.status === 'done') {
          const validationResult = await validateBMADCompletion(oldTask);
          if (!validationResult.passed) {
            throw new Error(`BMAD validation failed: ${validationResult.errors.join(', ')}`);
          }
        }
      }
      
      // Apply updates
      const fields = Object.keys(updates).map(k => `${k} = ?`).join(', ');
      const values = Object.values(updates);
      
      db.prepare(`UPDATE tasks SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
        .run(...values, taskId);
      
      // Record learning data for SAGE methodology
      if (oldTask.methodology_type === 'sage' && updates.status === 'done') {
        await recordLearningOutcome(oldTask, updates);
      }
      
      await logTransaction('update', 'task', taskId, oldTask, updates, ctx.userSource);
      
      ctx.io?.emit('task:updated', { id: taskId, ...updates });
      
      return { id: taskId, ...updates };
    }),

  validateBMADCriteria: publicProcedure
    .input(z.object({
      taskId: z.string(),
      criteria: z.array(z.string())
    }))
    .query(async ({ input }) => {
      // Implementation of BMAD validation logic
      const db = getDb();
      const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(input.taskId);
      
      const validationResults = await Promise.all(
        input.criteria.map(async (criterion) => {
          // Implement specific validation logic for each criterion
          return await validateCriterion(task, criterion);
        })
      );
      
      return {
        allPassed: validationResults.every(r => r.passed),
        results: validationResults
      };
    }),

  recordLearningOutcome: publicProcedure
    .input(z.object({
      taskId: z.string(),
      learningData: z.record(z.any())
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      
      db.prepare(`
        INSERT INTO learning_sessions (id, project_id, task_id, learning_objective, 
                                     environmental_context, execution_variations, 
                                     success_metrics, outcomes, adaptations_made)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        uuidv4(),
        input.learningData.projectId,
        input.taskId,
        JSON.stringify(input.learningData.objectives),
        JSON.stringify(input.learningData.context),
        JSON.stringify(input.learningData.variations),
        JSON.stringify(input.learningData.metrics),
        JSON.stringify(input.learningData.outcomes),
        JSON.stringify(input.learningData.adaptations)
      );
      
      return { success: true };
    })
});

// Approval workflow procedures
const approvalRouter = router({
  listByProject: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.prepare(`
        SELECT * FROM approvals 
        WHERE project_id = ? 
        ORDER BY created_at DESC
      `).all(input.projectId);
    }),

  create: publicProcedure
    .input(z.object({
      projectId: z.string(),
      command: z.string(),
      phase: z.string(),
      content: z.string(),
      filePath: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const id = uuidv4();
      
      db.prepare(`
        INSERT INTO approvals (id, project_id, command, phase, file_path, content)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(id, input.projectId, input.command, input.phase, input.filePath, input.content);
      
      ctx.io?.emit('approval:created', { id, ...input });
      
      return { id, ...input };
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(['pending', 'approved', 'rejected']).optional(),
      content: z.string().optional(),
      rejection_reason: z.string().optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const { id, ...updates } = input;
      
      const fields = Object.keys(updates).map(k => `${k} = ?`).join(', ');
      const values = Object.values(updates);
      
      db.prepare(`UPDATE approvals SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
        .run(...values, id);
      
      ctx.io?.emit('approval:updated', { id, ...updates });
      
      return { id, ...updates };
    })
});

// Learning and adaptation procedures
const learningRouter = router({
  getPatterns: publicProcedure
    .input(z.object({
      contextType: z.string().optional(),
      patternType: z.string().optional()
    }))
    .query(async ({ input }) => {
      const db = getDb();
      let query = 'SELECT * FROM adaptation_patterns WHERE 1=1';
      const params = [];
      
      if (input.contextType) {
        query += ' AND context_signature LIKE ?';
        params.push(`%${input.contextType}%`);
      }
      
      if (input.patternType) {
        query += ' AND pattern_type = ?';
        params.push(input.patternType);
      }
      
      query += ' ORDER BY confidence_score DESC, frequency_count DESC';
      
      const patterns = db.prepare(query).all(...params);
      
      return patterns.map(p => ({
        ...p,
        situation_characteristics: JSON.parse(p.situation_characteristics),
        successful_adaptations: JSON.parse(p.successful_adaptations),
        failure_patterns: p.failure_patterns ? JSON.parse(p.failure_patterns) : null
      }));
    }),

  recordPattern: publicProcedure
    .input(z.object({
      patternType: z.string(),
      contextSignature: z.string(),
      situationCharacteristics: z.record(z.any()),
      successfulAdaptations: z.record(z.any()),
      failurePatterns: z.record(z.any()).optional()
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      
      // Check if pattern exists
      const existing = db.prepare(`
        SELECT * FROM adaptation_patterns 
        WHERE pattern_type = ? AND context_signature = ?
      `).get(input.patternType, input.contextSignature);
      
      if (existing) {
        // Update existing pattern
        db.prepare(`
          UPDATE adaptation_patterns 
          SET frequency_count = frequency_count + 1,
              last_updated = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(existing.id);
      } else {
        // Create new pattern
        db.prepare(`
          INSERT INTO adaptation_patterns 
          (id, pattern_type, context_signature, situation_characteristics, 
           successful_adaptations, failure_patterns)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(
          uuidv4(),
          input.patternType,
          input.contextSignature,
          JSON.stringify(input.situationCharacteristics),
          JSON.stringify(input.successfulAdaptations),
          JSON.stringify(input.failurePatterns || {})
        );
      }
      
      return { success: true };
    })
});

// Update main router
export const appRouter = router({
  project: projectRouter,
  task: enhancedTaskRouter,
  state: stateRouter,
  agent: agentRouter,
  sync: syncRouter,
  approval: approvalRouter,
  learning: learningRouter
});
```

### Phase 6: Enhanced Command Utilities

#### Enhanced Kanban API Utility
**File**: `.claude/utils/kanban-api.js`

```javascript
const axios = require('axios');

class KanbanAPI {
  constructor(baseURL = 'http://localhost:3010') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'x-source': 'claude-code'
      }
    });
  }

  async isAvailable() {
    try {
      await this.client.get('/health');
      return true;
    } catch {
      return false;
    }
  }

  // Enhanced project creation with methodology support
  async createProject(name, description = '', methodology = 'hybrid') {
    try {
      const response = await this.client.post('/trpc/project.create', {
        json: { name, description, methodology }
      });
      return response.data.result.data.json;
    } catch (error) {
      console.error('Failed to create project:', error.response?.data || error.message);
      throw error;
    }
  }

  // Enhanced task creation with methodology metadata
  async createTask(projectId, title, description = '', options = {}) {
    const taskData = {
      projectId,
      title,
      description,
      status: options.status || 'todo',
      priority: options.priority || 'medium',
      assignedTo: options.assignedTo || 'human',
      estimatedHours: options.estimatedHours,
      methodology_type: options.methodology_type || 'hybrid',
      validation_criteria: options.validation_criteria,
      learning_objectives: options.learning_objectives,
      agent_requirements: options.agent_requirements,
      metadata: options.metadata || {}
    };

    try {
      const response = await this.client.post('/trpc/task.create', {
        json: taskData
      });
      return response.data.result.data.json;
    } catch (error) {
      console.error('Failed to create task:', error.response?.data || error.message);
      throw error;
    }
  }

  // Enhanced task update with methodology validation
  async updateTask(taskId, updates, validateMethodology = false) {
    try {
      const response = await this.client.post('/trpc/task.updateWithMethodology', {
        json: { taskId, updates, validateMethodology }
      });
      return response.data.result.data.json;
    } catch (error) {
      console.error('Failed to update task:', error.response?.data || error.message);
      throw error;
    }
  }

  // Create approval workflow
  async createApproval(projectId, command, phase, content, filePath) {
    try {
      const response = await this.client.post('/trpc/approval.create', {
        json: { projectId, command, phase, content, filePath }
      });
      return response.data.result.data.json;
    } catch (error) {
      console.error('Failed to create approval:', error.response?.data || error.message);
      throw error;
    }
  }

  // Wait for approval
  async waitForApproval(approvalId, timeoutMs = 300000) { // 5 minute timeout
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Approval timeout - no response received'));
      }, timeoutMs);

      // Poll for approval status
      const checkApproval = async () => {
        try {
          const response = await this.client.get(`/trpc/approval.get`, {
            params: { id: approvalId }
          });
          const approval = response.data.result.data.json;
          
          if (approval.status === 'approved') {
            clearTimeout(timeout);
            resolve(approval);
          } else if (approval.status === 'rejected') {
            clearTimeout(timeout);
            reject(new Error(`Approval rejected: ${approval.rejection_reason}`));
          } else {
            // Still pending, check again in 2 seconds
            setTimeout(checkApproval, 2000);
          }
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      };

      checkApproval();
    });
  }

  // Record learning session
  async recordLearning(taskId, learningData) {
    try {
      const response = await this.client.post('/trpc/task.recordLearningOutcome', {
        json: { taskId, learningData }
      });
      return response.data.result.data.json;
    } catch (error) {
      console.error('Failed to record learning:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get adaptation patterns for SAGE learning
  async getAdaptationPatterns(contextType = null, patternType = null) {
    try {
      const response = await this.client.get('/trpc/learning.getPatterns', {
        params: { contextType, patternType }
      });
      return response.data.result.data.json;
    } catch (error) {
      console.error('Failed to get patterns:', error.response?.data || error.message);
      return [];
    }
  }

  // Record new adaptation pattern
  async recordPattern(patternData) {
    try {
      const response = await this.client.post('/trpc/learning.recordPattern', {
        json: patternData
      });
      return response.data.result.data.json;
    } catch (error) {
      console.error('Failed to record pattern:', error.response?.data || error.message);
      throw error;
    }
  }

  // ... existing methods ...
}

const createKanbanAPI = () => new KanbanAPI();

module.exports = { createKanbanAPI, KanbanAPI };
```

## Implementation Steps Summary

### Step 1: Database and Volume Setup
1. **Update docker-compose.yml** with persistent volumes
2. **Run database migrations** to add new tables and columns
3. **Test volume persistence** by restarting containers

### Step 2: Enhanced Commands
1. **Implement enhanced PLAN command** with full methodology integration
2. **Implement enhanced IMPLEMENT command** with TDD and methodology support
3. **Create approval workflow integration** in commands
4. **Test command execution** with new Kanban integration

### Step 3: Interactive Kanban Board
1. **Update React components** with drag-and-drop and editing capabilities
2. **Implement real-time Socket.io updates**
3. **Add methodology-specific UI elements**
4. **Test cross-browser compatibility**

### Step 4: Approval System
1. **Create ApprovalViewer component** with markdown editing
2. **Implement approval workflow** in tRPC router
3. **Test approval process** from command creation to web approval

### Step 5: Learning System
1. **Implement SAGE learning data collection**
2. **Create pattern recognition algorithms**
3. **Test adaptive behavior** across multiple project executions

## Success Criteria

### Functionality
- [ ] Enhanced commands (PLAN, IMPLEMENT) work with full methodology integration
- [ ] Interactive Kanban board supports drag-and-drop, editing, and real-time updates
- [ ] Approval workflow allows markdown editing and automatic command continuation
- [ ] Learning system accumulates knowledge across projects
- [ ] All methodology-specific metadata displays correctly in web interface

### Technical
- [ ] Docker volumes persist data across container restarts
- [ ] Real-time Socket.io updates work bidirectionally between CLI and web
- [ ] Database schema supports all methodology-specific requirements
- [ ] Cross-browser compatibility maintained
- [ ] Performance remains acceptable with enhanced features

### User Experience
- [ ] Commands demonstrate clear understanding of methodology benefits
- [ ] Web interface provides intuitive project and task management
- [ ] Approval process is smooth and doesn't disrupt workflow
- [ ] Learning insights are visible and actionable
- [ ] System feels responsive and reliable

This implementation transforms the basic MVP into a complete, intelligent Context Engineering system that learns and adapts while providing an excellent user experience through both CLI and web interfaces.