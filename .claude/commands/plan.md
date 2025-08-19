# Enhanced PLAN Command - BMAD+SAGE+Archon Integration (Updated)

## MANDATORY EXECUTION PROTOCOL
**ALL STEPS AND SUB-STEPS ARE MANDATORY REQUIREMENTS, NOT SUGGESTIONS**
- Every step MUST be executed in exact order
- NO steps may be skipped or simplified
- All file paths and API endpoints are EXPLICIT REQUIREMENTS
- Web interface integration is MANDATORY for user visibility
- Failure to execute any step is a command failure

## Purpose
Create comprehensive project plan integrating BMAD validation gates, SAGE adaptive learning, and Archon agent generation with two-stage understanding validation and cross-project intelligence.

## MANDATORY Inputs (Exact Locations)
- **User Project Context**: Project description from command arguments
- **Learning Patterns**: MUST read `../docker/learning/global_patterns.json`
- **Database**: MUST connect to `../docker/server/data/bmad.db`
- **Web API**: MUST use `http://localhost:3010/trpc/` for all operations
- **Session State**: MUST update `.claude/state/session.json`

## MANDATORY Outputs (Exact Locations)
- **Web Interface**: ALL tasks MUST be visible at `http://localhost:3011`
- **Database Records**: Project and tasks MUST be stored in SQLite database
- **Response File**: MUST create `response_[date]_[time]_plan.md`
- **Session State**: MUST update `.claude/state/session.json`
- **Learning Updates**: MUST update `../docker/learning/global_patterns.json`

## MANDATORY Implementation

### Step 1: Initialize Enhanced Planning Session
**MANDATORY**: Execute ALL sub-steps without exception

#### MANDATORY Sub-Steps:
**1.1. Database Connection** 
- MUST connect to `http://localhost:3010/health` and verify response
- IF connection fails: STOP command and report error
- MUST NOT proceed without database connectivity

**1.2. Learning Pattern Loading**
- MUST read file `../docker/learning/global_patterns.json`
- MUST filter patterns where tags contain project-relevant keywords
- MUST store filtered patterns for use in subsequent steps
- IF file doesn't exist: create empty patterns structure

**1.3. Session Initialization**
- MUST update `.claude/state/session.json` with:
  - current_command: "plan"
  - current_step: 1
  - project_type: extracted from user input
  - timestamp: current ISO timestamp
  - current_project_id: null (will be set in Step 3)

**1.4. Web Interface Check**
- MUST verify `http://localhost:3011` is accessible
- IF not accessible: STOP and report error

**MANDATORY Outputs:**
- Connection confirmed to docker environment
- Learning patterns loaded from `../docker/learning/global_patterns.json`
- Session state updated in `.claude/state/session.json`
- Web interface accessibility confirmed

### Step 2: Research Understanding & Analysis
**MANDATORY**: Generate ALL analysis components

#### MANDATORY Sub-Steps:
**2.1. Project Interpretation**
- MUST analyze user input and extract: core features, constraints, technology hints
- MUST generate project summary (2-3 sentences)

**2.2. Alternative Approaches**
- MUST create exactly 3 approaches: MVP, Standard, Enhanced
- MUST include for each: feature list (5-8 items), timeline estimate, complexity rating

**2.3. Technology Stack Options**
- MUST create exactly 3 technology options with pros/cons
- MUST include effort estimates and learning curve ratings

**2.4. Focused Questions**
- MUST generate 3-5 specific questions to clarify ambiguities
- MUST prioritize questions by impact on project scope

**2.5. Recommended Approach**
- MUST select ONE approach and justify with 2-3 concrete reasons

**MANDATORY Outputs:**
- Project interpretation document stored internally
- 3 alternative approaches with complete specifications
- 3 technology options with detailed analysis
- 3-5 focused clarification questions
- 1 recommended approach with justification

### Step 3: Create Project in Web Interface
**MANDATORY**: Project MUST be created and visible in web interface

#### MANDATORY Sub-Steps:
**3.1. Create Project via API**
- MUST POST to `http://localhost:3010/trpc/project.create`
- MUST use format: `{"name": "[project_name]", "description": "[description]", "methodology": "hybrid", "status": "active"}`
- MUST capture project ID from response
- IF API fails: STOP command and report error

**3.2. Update Session State**
- MUST update `.claude/state/session.json` with:
  - current_project_id: [captured_project_id]
  - current_project_name: [project_name]
  - project_created_timestamp: current ISO timestamp

**3.3. Verify Web Interface**
- MUST verify project appears at `http://localhost:3011`
- IF project not visible: STOP command and report error

**MANDATORY Outputs:**
- Project created in database with captured ID
- Project visible in web interface at `http://localhost:3011`
- Session state updated with project details

### Step 4: Comprehensive Project Analysis
**MANDATORY**: Execute complete BMAD+SAGE+Archon analysis

#### MANDATORY Sub-Steps:
**4.1. BMAD Stakeholder Analysis**
- MUST identify: Primary User, Developer, QA Tester, End Users
- MUST define success criteria for each stakeholder (2-3 per stakeholder)

**4.2. SAGE Pattern Matching**
- MUST query loaded patterns from Step 1.2 for similar projects
- MUST score patterns by relevance (0.0-1.0)
- MUST select top 3 patterns with confidence > 0.6

**4.3. Risk Analysis**
- MUST identify 3-5 technical risks from pattern analysis
- MUST provide mitigation strategy for each risk

**4.4. Combined Recommendations**
- MUST synthesize analysis into comprehensive recommendations

**MANDATORY Outputs:**
- Stakeholder matrix with success criteria
- Top 3 relevant patterns with confidence scores
- Risk analysis with mitigation strategies
- Combined methodology recommendations

### Step 5: Prototype Planning with Web Interface Tasks
**MANDATORY**: Create prototypes AND tasks in web interface

#### MANDATORY Sub-Steps:
**5.1. Prototype Design**
- MUST create exactly 3 prototypes following SAGE sizing patterns
- MUST ensure each prototype has 3-6 discrete tasks
- MUST assign priorities: Prototype 1 (high), Prototype 2 (medium), Prototype 3 (low)

**5.2. Task Creation via API**
- FOR EACH prototype task, MUST POST to `http://localhost:3010/trpc/task.create`
- MUST use format: `{"projectId": "[project_id]", "title": "[task_title]", "description": "[task_description]", "status": "todo", "priority": "[high/medium/low]", "assignedTo": "claude", "estimatedHours": [hours]}`
- MUST capture task IDs from responses
- IF any task creation fails: STOP command and report error

**5.3. Validation Gates**
- MUST create 1 validation task per prototype
- MUST set validation tasks with priority matching parent prototype

**MANDATORY Outputs:**
- 3 prototypes with 3-6 tasks each (9-18 total tasks)
- ALL tasks visible in web interface at `http://localhost:3011`
- Task IDs captured and stored
- Validation gates defined for each prototype

### Step 6: Implementation Plan Generation
**MANDATORY**: Create comprehensive plan with timeline

#### MANDATORY Sub-Steps:
**6.1. Timeline Creation**
- MUST create day-by-day implementation timeline
- MUST map tasks to specific days/time blocks
- MUST include testing and validation time

**6.2. Success Metrics**
- MUST define 5-8 measurable success metrics
- MUST include performance targets and quality gates

**6.3. Risk Mitigation Plan**
- MUST expand Step 4.3 risks into detailed mitigation plan
- MUST include contingency procedures

**MANDATORY Outputs:**
- Detailed implementation timeline
- Measurable success metrics
- Risk mitigation plan with procedures

### Step 7: Learning Capture and Pattern Updates
**MANDATORY**: Update learning patterns for future projects

#### MANDATORY Sub-Steps:
**7.1. Pattern Analysis**
- MUST analyze what planning decisions were made
- MUST identify successful pattern applications

**7.2. Update Global Patterns**
- MUST add new patterns to `../docker/learning/global_patterns.json`
- MUST update existing pattern confidence scores
- MUST save file with proper JSON formatting

**7.3. Session Documentation**
- MUST document planning session effectiveness
- MUST record timing data and decision quality

**MANDATORY Outputs:**
- Updated `../docker/learning/global_patterns.json`
- Planning session documented
- Pattern effectiveness recorded

### Step 8: Final Approval Generation
**MANDATORY**: Create response file with complete plan

#### MANDATORY Sub-Steps:
**8.1. Web Interface Verification**
- MUST verify ALL tasks visible at `http://localhost:3011`
- MUST count tasks and confirm total matches expected
- IF mismatch: STOP and report error

**8.2. Response File Creation**
- MUST create `response_[date]_[time]_plan.md` with:
  - Project name and ID
  - Total task count and web interface URL
  - Complete implementation plan
  - Risk analysis and mitigation
  - Success metrics
  - Timeline breakdown
  - Human approval checklist

**8.3. Session State Finalization**
- MUST update `.claude/state/session.json` with:
  - current_step: "completed"
  - tasks_created: [total_count]
  - completion_timestamp: current ISO timestamp

**MANDATORY Outputs:**
- Response file created at `response_[date]_[time]_plan.md`
- ALL tasks confirmed visible in web interface
- Session state marked complete
- Project ready for implement command

## MANDATORY Web Interface Requirements
**The user MUST be able to see ALL project information in web interface:**

1. **Project Visibility**: Project MUST appear at `http://localhost:3011`
2. **Task Visibility**: ALL tasks MUST appear in Kanban board
3. **Task Organization**: Tasks MUST be organized by priority/prototype
4. **Progress Tracking**: User can see task status and progress
5. **Interactive Elements**: User can interact with tasks in web interface

## MANDATORY Error Handling
**If ANY step fails:**
1. STOP command execution immediately
2. Report specific error and step that failed
3. Provide exact instructions to resolve
4. DO NOT continue with subsequent steps
5. DO NOT create partial deliverables

## MANDATORY Success Criteria
- Docker environment connected and operational
- Project created and visible in web interface
- ALL prototype tasks created in Kanban board  
- Learning patterns loaded and updated
- Response file generated with complete plan
- User can view ALL progress at `http://localhost:3011`