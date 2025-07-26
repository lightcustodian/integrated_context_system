# /validate - Comprehensive Validation with Multi-Agent Orchestration

**Purpose**: Comprehensive validation using multi-level approach for all project types
**Function**: Orchestration Agent coordinates specialist validation agents to perform intelligent quality assessment

## Files Called
- `CLAUDE.md` - AI agent instructions (read for current configuration)
- `2-docs/features/feature-registry.json` - Feature tracking and status
- `2-docs/features/FR-XXX-[feature-name].md` - Feature specifications
- `2-docs/context/design_review_standards_software.md` - Quality standards for software components (if project_type is software/web/script)
- `2-docs/context/design_review_standards_non_software.md` - Quality standards for non-software components (if project_type is marketing/research/design/mixed)
- `2-docs/context/validation_strategy_software.md` - Validation approach for software components (if project_type is software/web/script)
- `2-docs/context/validation_strategy_non_software.md` - Validation approach for non-software components (if project_type is marketing/research/design/mixed)
- `2-docs/validation/success-criteria.md` - Project success criteria
- `.claude/settings.json` - Project configuration and agent assignment rules
- `.claude/state/session.json` - Current state
- `1-main/` - Implementation code for validation
- `tests/` - All test files and results for validation

## Files Created
- `2-docs/validation/validation-report-[timestamp].md` - Comprehensive validation report with timestamp

## Files Populated/Updated
- `.claude/state/session.json` - Updated with validation progress and specialist results
- `2-docs/features/feature-registry.json` - Updated with validation results and quality scores
- `tests/` - Updated with test execution logs and coverage reports
- `2-docs/validation/success-criteria.md` - Updated with validation results and achievement status

## Usage
```
/validate [--feature=FR-001,FR-002] [--isolated] [--deep] [--integration] [--all]
```

## Options
- `--feature=ID1,ID2`: Validate specific features (comma-separated)
- `--isolated`: Validate only specified features without dependencies
- `--deep`: Validate features and all dependencies recursively
- `--integration`: Include integration tests in validation
- `--all`: Validate all features in the project

## Orchestration Agent Instructions

### Step 1: Load Orchestration Agent
```
Load agent persona: @../agents/core_orchestrator.md

You are coordinating comprehensive project validation. Your task:
1. Analyze validation requirements and determine specialist validation needs
2. Delegate validation tasks to appropriate specialist agents
3. Coordinate multi-level validation across all project domains
4. Monitor specialist validation execution and integrate results
5. Generate comprehensive validation report with specialist insights
```

### Step 2: Validation Scope Determination
**Orchestration Task**: Determine validation scope and specialist requirements

**Validation Strategy Analysis**:
```
Read agent assignment rules from .claude/settings.json
Load project type from PLANNING.md and settings.json to determine appropriate standards files:
- "software", "web", "script" → Use software-focused validation files
- "marketing", "research", "design" → Use non-software-focused validation files  
- "mixed" → Use both software and non-software validation files

Determine validation approach based on arguments:

Default behavior (no arguments):
- Detect current context and validate appropriate scope
- Include direct dependencies for smart validation
- Use integration tests if cross-feature dependencies exist

Specific features (--feature):
- Validate listed features with appropriate specialists
- Include dependencies unless --isolated specified
- Use --deep for recursive dependency validation

All features (--all):
- Validate entire project systematically with full specialist team
- Include all integration and end-to-end tests
- Provide comprehensive project assessment
```

### Step 3: Specialist Validation Agent Assignment

#### Always Required Validation Specialists

**Validation Coordinator Agent**:
```
Create subagent with persona: @../agents/validation_coordinator.md

Your specific task: Execute systematic validation across all project deliverable types
Your input context:
- Feature registry and completion status
- Quality standards and validation requirements
- Multi-level validation strategy (task, feature, project)
- Integration requirements and cross-feature dependencies

Your expected output:
- Systematic validation execution across all levels
- Quality assessment results and metrics
- Validation compliance verification
- Integration with other specialist validation results
```

**Validation Assessor Agent**:
```
Create subagent with persona: @../agents/validation_assessor.md

Your specific task: Perform quality standards enforcement and assessment
Your input context:
- Design review standards and quality requirements
- Project deliverables and implementation results
- Code quality metrics and documentation standards
- Quality gate requirements and acceptance criteria

Your expected output:
- Quality assessment scores and detailed analysis
- Standards compliance verification
- Quality improvement recommendations
- Quality trends and metrics analysis
```

#### Conditional Specialists Based on Project Type

**If project includes software components:**

**Code Tester Agent** (for technical validation):
```
Create subagent with persona: @../agents/code_tester.md

Your specific task: Execute comprehensive code validation and testing
Your input context:
- Implementation code and test suites
- Test coverage requirements and quality standards
- Integration testing needs and performance criteria
- Security and reliability validation requirements

Your expected output:
- Complete test execution results and coverage analysis
- Code quality validation and performance assessment
- Security vulnerability assessment
- Technical validation summary and recommendations
```

**Code Integration Tester Agent** (for integration validation):
```
Create subagent with persona: @../agents/code_integration_tester.md

Your specific task: Validate system integration and cross-feature interactions
Your input context:
- Feature interactions and integration points
- System integration requirements and test scenarios
- End-to-end workflow validation needs
- Performance and scalability validation requirements

Your expected output:
- Integration test execution results
- Cross-feature interaction validation
- System performance and reliability assessment
- Integration issue identification and resolution recommendations
```

**If project includes non-software components:**

**Validation Stakeholder Agent**:
```
Create subagent with persona: @../agents/validation_stakeholder.md

Your specific task: Simulate stakeholder review and validate business requirements
Your input context:
- Non-code deliverables (content, design, marketing materials)
- Business objectives and stakeholder expectations
- User experience and business value requirements
- Stakeholder acceptance criteria and approval processes

Your expected output:
- Stakeholder approval simulation results
- Business requirement satisfaction assessment
- User experience and value validation
- Stakeholder feedback and approval recommendations
```

**Content Technical Writer Agent** (for documentation validation):
```
Create subagent with persona: @../agents/content_technical_writer.md

Your specific task: Validate documentation quality and completeness
Your input context:
- Technical documentation and user guides
- API documentation and developer resources
- Content quality standards and style guidelines
- Documentation completeness and accuracy requirements

Your expected output:
- Documentation quality assessment
- Content accuracy and completeness validation
- Style and consistency verification
- Documentation improvement recommendations
```

#### Domain-Specific Specialists (as needed)

**If project includes marketing components:**

**Specialist Marketing Agent**:
```
Create subagent with persona: @../agents/specialist_marketing.md

Your specific task: Validate marketing deliverables and campaign effectiveness
Your input context:
- Marketing materials and campaign content
- Brand compliance and messaging consistency
- Market positioning and competitive analysis
- Campaign effectiveness and success metrics

Your expected output:
- Marketing deliverable quality validation
- Brand compliance and consistency assessment
- Campaign effectiveness evaluation
- Marketing optimization recommendations
```

**If project includes design components:**

**Specialist Design Agent**:
```
Create subagent with persona: @../agents/specialist_design.md

Your specific task: Validate design quality and user experience
Your input context:
- Design deliverables and user interface components
- User experience requirements and accessibility standards
- Design system consistency and visual guidelines
- Usability and accessibility validation needs

Your expected output:
- Design quality and consistency validation
- User experience and accessibility assessment
- Visual design and brand compliance verification
- Design improvement and optimization recommendations
```

### Step 4: Multi-Level Validation Strategy Execution
**Orchestration Task**: Coordinate systematic multi-level validation

**Task-Level Validation (Granular) - Coordinated across specialists:**
```
Individual deliverable quality assessment:
- Code Tester Agent: Code tests (Happy Path, Edge Case, Negative Case)
- Validation Stakeholder Agent: Content validation (quality standards, brand compliance)
- Specialist Design Agent: Design validation (accessibility, usability standards)
- Validation Assessor Agent: Quality standards enforcement across all domains
```

**Feature-Level Validation (Comprehensive) - Integrated specialist validation:**
```
Complete feature functionality validation:
- Validation Coordinator Agent: Feature acceptance criteria verification
- Code Integration Tester Agent: Integration tests with dependent features
- Validation Stakeholder Agent: Business logic and stakeholder approval simulation
- Specialist Agents: Domain-specific feature validation
```

**Project-Level Validation (Exhaustive) - Full specialist coordination:**
```
System-wide validation and integration:
- All Validation Agents: Cross-domain integration and user journey validation
- Code Integration Tester Agent: Full system integration testing
- Validation Stakeholder Agent: End-to-end workflow and business value validation
- Validation Assessor Agent: Complete project acceptance criteria assessment
```

### Step 5: Validation Execution Coordination
**Orchestration Task**: Coordinate validation execution across all specialists

**Software Project Validation** (if applicable):
```
Code Quality Validation - Code Tester + Validation Assessor coordination:
- Syntax checking and code formatting validation
- Adherence to design review standards
- Documentation completeness and accuracy assessment
- Security vulnerability and performance validation

Test Execution and Analysis - Code Tester + Code Integration Tester coordination:
- Unit test execution (Happy Path → Edge Case → Negative Case)
- Integration tests for feature interactions
- BDD scenarios and acceptance criteria validation
- Test coverage analysis and reliability assessment

Integration Validation - Code Integration Tester + Validation Coordinator coordination:
- Cross-feature functionality testing
- Data flow and state consistency validation
- API integration and error handling validation
- Performance and scalability assessment
```

**Non-Software Project Validation** (if applicable):
```
Content Quality Validation - Validation Stakeholder + Content Technical Writer coordination:
- Grammar, style, and readability assessment
- Brand compliance and consistency checking
- Fact verification and source validation
- Legal compliance and accessibility review

Stakeholder Review Process - Validation Stakeholder + Specialist Agents coordination:
- Simulate stakeholder review and approval processes
- Validate against business objectives and user needs
- Assess practical applicability and business value
- Ensure acceptance criteria fulfillment

Domain-Specific Validation - Specialist Agents coordination:
- Marketing: Campaign effectiveness, message consistency, brand alignment
- Design: User experience, accessibility, visual consistency
- Content: Editorial standards, SEO optimization, publication readiness
```

**Mixed Project Coordination** (for projects with both code and non-code):
```
Interface Validation - All relevant specialists coordination:
- Data exchange between code and content components
- API integration with non-code systems
- Workflow integration and handoff points
- Performance impact of integrated components

Cross-Domain Review - Validation Coordinator + All Specialists:
- Technical feasibility of non-code requirements
- Content accuracy of technical documentation
- User experience coherence across domains
- Business value integration assessment
```

### Step 6: Integration Test Execution (when --integration specified)
**Orchestration Task**: Coordinate comprehensive integration testing

**Feature Interaction Testing - Code Integration Tester + Code Tester coordination:**
```
- Test communication between features
- Validate shared resources and data flow
- Check event handling and propagation
- Verify error handling across features
```

**System Integration Testing - All technical specialists coordination:**
```
- Database connectivity and transactions validation
- External API interactions and fallback testing
- Configuration loading and validation
- End-to-end user journey testing across all domains
```

### Step 7: Quality Assessment and Scoring Coordination
**Orchestration Task**: Generate comprehensive quality metrics from all specialists

**Code Quality Scores** (from Code Tester + Validation Assessor):
```
- Test coverage percentage (minimum 80%) with detailed analysis
- Code complexity and maintainability assessment
- Documentation completeness and quality scoring
- Security and performance ratings with recommendations
```

**Content Quality Scores** (from Validation Stakeholder + Content Technical Writer):
```
- Stakeholder approval simulation results and feedback
- Brand compliance and consistency ratings
- Accuracy and reliability assessment scores
- User experience and accessibility compliance scores
```

**Integration Quality Scores** (from Code Integration Tester + Validation Coordinator):
```
- Cross-feature compatibility rating and analysis
- System stability and reliability metrics
- Performance and scalability assessment scores
- Error handling and recovery effectiveness ratings
```

**Domain-Specific Quality Scores** (from Specialist Agents):
```
- Marketing: Campaign effectiveness and brand alignment scores
- Design: User experience and accessibility compliance ratings
- Security: Vulnerability assessment and compliance scores
- Performance: Optimization and scalability effectiveness ratings
```

### Step 8: Validation Report Generation
**Orchestration Task**: Create comprehensive validation report integrating all specialist results

**Executive Summary**:
```
Synthesize specialist validation results:
- Overall validation status and key metrics from all specialists
- Critical issues requiring immediate attention identified by specialists
- Recommendations for project completion from specialist analysis
- Confidence score for project success based on specialist validation
```

**Detailed Results by Specialist**:
```
- Validation Coordinator Agent: Systematic validation results and compliance
- Validation Assessor Agent: Quality assessment and standards compliance
- Code Tester Agent: Technical validation and test execution results (if applicable)
- Code Integration Tester Agent: Integration testing and system validation (if applicable)
- Validation Stakeholder Agent: Business validation and stakeholder approval (if applicable)
- Specialist Agents: Domain-specific validation results and recommendations (if applicable)
```

**Issue Analysis and Integration**:
```
- Categorized list of validation failures from all specialists
- Root cause analysis for critical issues across domains
- Recommended remediation steps coordinated across specialists
- Impact assessment and priority ranking from specialist perspectives
```

**Recommendations and Next Steps**:
```
- Immediate actions for failed validations from specialist analysis
- Suggestions for quality improvements across all domains
- Long-term maintenance and optimization recommendations
- Next steps for project progression based on specialist coordination
```

### Step 9: Registry and State Updates
**Orchestration Task**: Update project state with all specialist validation results

**Update Feature Registry**:
```
Integrate specialist validation results:
- Mark validation status for each feature with specialist input
- Record test results and quality scores from all specialists
- Update confidence scores based on comprehensive specialist validation
- Track validation history and trends across all domains
```

**Update Project State**:
```
Synthesize specialist progress:
- Record validation completion and results from all specialists
- Update overall project progress metrics with specialist input
- Set validation timestamps and versioning
- Prepare state for next development cycle with specialist recommendations
```

### Step 10: Comprehensive Approval Gate
**Generate orchestrated validation summary:**

**Specialist Agent Summary**:
- **Validation Coordinator Agent**: Systematic validation execution and compliance results
- **Validation Assessor Agent**: Quality standards assessment and improvement recommendations
- **Code Tester Agent**: Technical validation and test execution results (if used)
- **Code Integration Tester Agent**: Integration testing and system validation results (if used)
- **Validation Stakeholder Agent**: Business validation and stakeholder approval results (if used)
- **Content Technical Writer Agent**: Documentation quality and completeness validation (if used)
- **Specialist Agents**: Domain-specific validation results and recommendations (if used)

**Integration Results**:
- Overall project health and readiness assessment from all specialists
- Critical issues requiring resolution identified by specialist analysis
- Quality trends and improvement areas across all domains
- Recommendations for next steps based on specialist coordination

**Success Criteria Validation**:
- Verify all project success criteria met through specialist validation
- Check acceptance criteria completion across all domains
- Validate stakeholder requirements fulfillment
- Confirm project ready for delivery or next phase

## Success Criteria
- [ ] All specialist validation agents successfully coordinated
- [ ] Specified features pass validation requirements across all domains
- [ ] Test coverage meets minimum thresholds (80%+ for code) as validated by specialists
- [ ] Integration tests validate feature interactions through specialist coordination
- [ ] Quality standards met for all deliverable types as verified by specialists
- [ ] Stakeholder requirements fulfilled through specialist validation
- [ ] Project success criteria achieved across all domains
- [ ] No critical issues blocking delivery identified by any specialist

## Recovery Support
If validation is interrupted:
- Resume from last completed specialist validation section
- Preserve partial validation results from all specialists
- Continue with remaining specialist validation tasks
- Update registry with completed specialist validations

## Python Utilities Used
- Minimal utilities only for reliability-critical operations
- Network timeout handling for external validation services

---
*Generated by Context Engineering v3.0 with Multi-Agent Orchestration*
*Next Step: Address any validation failures identified by specialists or proceed to project delivery*