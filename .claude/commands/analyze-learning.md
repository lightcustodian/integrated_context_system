# Analyze Learning Command

Perform comprehensive learning analysis of current project to generate insights for cross-project orchestration improvement and CRP system enhancement.

## Command Purpose
Generate structured learning analysis that can be aggregated across multiple child projects to identify effective orchestration patterns, CRP system effectiveness, and comprehensive improvement opportunities.

## Specialist Agent Assignment
**Primary Agent**: Analysis Learning Agent
- **Task**: Comprehensive learning analysis across all project domains
- **Input**: Complete project execution data, CRP system performance, critical review impact
- **Output**: Structured learning report with actionable recommendations

**Supporting Agents** (if needed):
- **Content Summarizer Agent**: For large project data consolidation
- **Validation Assessor Agent**: For quality validation of learning analysis

## Execution Process

### 1. Project Context and Performance Assessment
**Analysis Learning Agent analyzes**:
- Project type, complexity, and execution timeline
- Command sequence execution and completion status
- CRP system performance and 20K context budget effectiveness
- Critical review impact and overconfidence intervention results
- MCP tool integration success and value assessment

### 2. CRP System Effectiveness Analysis
**Comprehensive CRP evaluation**:
- **20K Context Budget Performance**: Usage patterns, exception handling success, optimization effectiveness
- **Goal Reinforcement Impact**: Alignment maintenance success across all specialist interactions
- **Context Quality Control**: Pollution prevention success and information architecture effectiveness
- **Exception Handling Assessment**: Large document processing and task decomposition effectiveness

### 3. Critical Review Impact Assessment
**ken-you-reflect integration analysis**:
- **Overconfidence Detection Success**: Claims challenged and intervention effectiveness
- **Risk Assessment Accuracy**: How well risk scores predicted actual project issues
- **Priority Action Outcomes**: Whether forced priority focus improved project results
- **Context Pollution Prevention**: Critical review impact on maintaining context quality

### 4. Orchestration Pattern Recognition
**Multi-domain pattern analysis**:
- **Specialist Coordination**: Most effective assignment sequences and task decomposition strategies
- **Context Management**: Successful context optimization and handoff patterns
- **Tool Integration**: Most valuable MCP tool combinations and usage patterns
- **Quality Outcomes**: Patterns that consistently produce high-quality deliverables

### 5. Learning Report Generation
**Analysis Learning Agent generates**:
- Comprehensive learning analysis with quantified effectiveness metrics
- Pattern recognition results with replication guidance
- Framework enhancement recommendations with implementation details
- Cross-project aggregation readiness assessment

## Files Called
- `.claude/state/session.json` - Project execution state and specialist interaction history
- `CLAUDE.md` - Project configuration and CRP system implementation status
- `2-docs/features/feature-registry.json` - Feature development outcomes and quality metrics
- `2-docs/validation/validation-report-*.md` - Validation results and quality assessments
- All specialist agent outputs from project execution phases
- MCP tool integration status and effectiveness data (from session.json and command execution records)

## Files Created
- `2-docs/learning/learning-analysis-[timestamp].md` - Comprehensive learning analysis report
- `2-docs/learning/pattern-recognition-[timestamp].json` - Structured pattern data for aggregation

## Files Populated/Updated
- `.claude/state/session.json` - Updated with learning analysis completion and insights
- `2-docs/learning/aggregated-insights.md` - Cross-project pattern aggregation (if exists)

## Orchestration Agent Instructions

### Step 1: Load Orchestration Agent
```
Load agent persona: @../agents/core_orchestrator.md

You are coordinating comprehensive learning analysis for Context Engineering framework improvement. Your task:
1. Analyze complete project execution data including CRP system performance
2. Delegate learning analysis to Analysis Learning Agent with full project context
3. Coordinate pattern recognition across all domains (orchestration, CRP, critical review, outcomes)
4. Generate comprehensive learning report for cross-project improvement
5. Ensure learning insights support continuous framework enhancement
```

### Step 2: REQUIRED - Capability Analysis and MCP Coordination
**BLOCKING STEP**: This step must complete before proceeding to Step 3.

#### Capability Analysis Template (REQUIRED)
```
**Command**: /analyze-learning
**Planned Work**: 
- Comprehensive project execution analysis and pattern recognition
- CRP system effectiveness evaluation and optimization assessment
- Critical review impact analysis and intervention effectiveness study
- Orchestration pattern recognition and framework improvement recommendations
- Learning report generation and cross-project aggregation preparation

**Required Capabilities Assessment**:
- [ ] file_operations: Reading project execution data, specialist outputs, and creating learning reports
- [ ] memory: Accessing comprehensive project history and specialist interaction patterns
- [ ] reflektion: Pattern recognition and learning analysis (if available via MCP)
- [ ] structured_reasoning: Complex analysis and recommendation generation

**MCP Agent Coordination** (REQUIRED):
Load MCP Agent persona: @../agents/core_mcp.md
Request capabilities: "file_operations, memory, reflektion, structured_reasoning"

**REQUIRED OUTPUT**: MCP Agent must respond with capability confirmation
Expected response format: "Learning environment ready: [tools] connected. X tools available."

**MCP Status**: [PENDING → CONNECTED/FAILED]
**Available Tools**: [List tools provided by MCP Agent]
```

### Step 3: Analysis Learning Agent Assignment
**PREREQUISITE**: Step 2 (MCP Coordination) must be completed
**Orchestration Task**: Delegate comprehensive learning analysis

```
Create subagent with persona: @../agents/analysis_learning.md

Your specific task: Perform comprehensive learning analysis across all project domains with focus on CRP system effectiveness and orchestration pattern recognition

Your input context:
- Complete project execution history from session state and specialist outputs
- CRP system implementation and performance data from orchestrator interactions
- Critical review findings and intervention effectiveness from validation cycles
- MCP tool integration patterns and success metrics from project execution
- Feature development outcomes and quality metrics from registry and validation reports

Your expected output:
- Structured learning analysis report with quantified effectiveness metrics
- Pattern recognition results with clear correlation to project outcomes
- Framework enhancement recommendations with specific implementation guidance
- Cross-project aggregation readiness assessment with confidence indicators

Available tools: [Tools confirmed by MCP Agent in Step 2]

Execute comprehensive learning analysis as defined in your persona file, focusing on:
1. CRP system effectiveness (20K budget, exception handling, context quality)
2. Critical review impact (overconfidence detection, risk mitigation)
3. Orchestration pattern recognition (specialist coordination, tool integration)
4. Framework improvement opportunities (evidence-based recommendations)
```

### Step 4: Learning Analysis Execution Coordination
**Orchestration Task**: Monitor and support learning analysis execution

**Learning Data Collection with Partial Data Handling**:
```
Ensure Analysis Learning Agent has access to available data with graceful handling of missing information:

**Always Available Data** (analyze even if incomplete):
- .claude/state/session.json - Execution state and command progression
- 2-docs/features/feature-registry.json - Feature outcomes (if features were created)
- CLAUDE.md - Project configuration and agent assignment rules

**Conditionally Available Data** (analyze if present, note absence if missing):
- All specialist interaction logs with context usage and effectiveness data
- CRP system performance metrics including budget utilization and exception handling
- Critical review intervention results and risk assessment accuracy
- MCP tool integration success patterns and value assessment
- 2-docs/validation/validation-report-*.md - Quality assessment results
- Project outcome correlation data and quality metrics

**Partial Data Analysis Protocol**:
- **Document missing data**: Clearly note what data is unavailable and why
- **Analyze available data**: Extract maximum insights from available information
- **Confidence adjustment**: Lower confidence scores when key data is missing
- **Progressive learning**: Update analysis as more data becomes available in future runs
- **Missing data impact**: Explain how missing data affects analysis reliability
```

**Pattern Recognition Support**:
```
If reflektion MCP server available:
- Support Analysis Learning Agent in using pattern recognition tools
- Ensure comprehensive analysis across all learning domains
- Validate pattern reliability and generalizability assessment

If reflektion unavailable:
- Guide systematic analysis using built-in methodology
- Ensure comprehensive coverage of all learning domains
- Support evidence-based pattern identification and correlation analysis
```

### Step 5: Learning Report Integration and Quality Validation
**Orchestration Task**: Validate and integrate learning analysis results

**Report Quality Assessment**:
```
Validate learning analysis report contains:
- Quantified effectiveness metrics for CRP system components
- Evidence-based pattern recognition with clear outcome correlation
- Specific, actionable framework enhancement recommendations
- Realistic confidence assessment and implementation readiness evaluation
- Cross-project aggregation compatibility and comparison enablement
```

**Integration Preparation**:
```
Ensure learning insights are formatted for:
- Cross-project pattern aggregation and comparison
- Framework enhancement implementation guidance
- Continuous improvement of Context Engineering effectiveness
- Evidence-based evolution of orchestration methodology
```

### Step 6: Comprehensive Approval Gate
**Generate comprehensive learning analysis summary:**

**Analysis Learning Agent Output**:
- **Learning Analysis Report**: Comprehensive analysis with quantified CRP and orchestration effectiveness
- **Pattern Recognition Results**: Evidence-based patterns with outcome correlation and replication guidance
- **Framework Enhancement Recommendations**: Specific improvements with implementation details and expected impact
- **Aggregation Readiness**: Assessment of learning confidence and cross-project applicability

**Learning Insights Integration**:
- **CRP System Effectiveness**: Quantified assessment of 20K budget, exception handling, and context quality management
- **Critical Review Impact**: Measured effectiveness of overconfidence detection and risk mitigation interventions
- **Orchestration Optimization**: Identified patterns for improved specialist coordination and tool integration
- **Framework Evolution**: Evidence-based recommendations for continuous Context Engineering improvement

**Cross-Project Value**:
- **Pattern Reliability**: Assessment of learning confidence and generalizability across similar projects
- **Implementation Readiness**: Evaluation of framework enhancement readiness and validation requirements
- **Aggregation Potential**: Preparation for meaningful cross-project comparison and systematic improvement
- **Continuous Improvement**: Foundation for evidence-based Context Engineering methodology evolution

## Quality Standards
- Analysis must include quantified metrics for CRP system effectiveness
- Patterns must show clear correlation with measurable project outcomes
- Recommendations must be specific, actionable, and include expected impact
- Report must enable meaningful cross-project comparison and aggregation
- Assessment must validate learning confidence and generalizability

## Success Criteria
- **Comprehensive Coverage**: Analysis addresses all major project domains and CRP components
- **Evidence-Based Insights**: All findings supported by specific project data and measurements
- **Actionable Recommendations**: Clear guidance for framework improvements with implementation steps
- **Aggregation Readiness**: Report format enables cross-project pattern recognition and enhancement

## Integration Points
- **Provides**: Complete learning analysis for continuous framework improvement
- **Enables**: Cross-project orchestration enhancement and CRP system optimization
- **Supports**: Evidence-based evolution of Context Engineering methodology
- **Requires**: Complete project execution data including CRP performance and critical review impact