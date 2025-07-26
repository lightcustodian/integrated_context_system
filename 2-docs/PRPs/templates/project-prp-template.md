# Project Requirements and Planning (PRP) - Orchestrator

## Project Overview

**Project Name**: [PROJECT_NAME]  
**Project ID**: [PROJECT_ID]  
**Created**: [CREATION_DATE]  
**Last Updated**: [LAST_UPDATED_DATE]  
**Status**: [PROJECT_STATUS]  
**Overall Progress**: [OVERALL_PROGRESS_PERCENTAGE]%  
**Overall Confidence**: [OVERALL_CONFIDENCE_SCORE]

## Project Summary

[PROJECT_DESCRIPTION]

This PRP serves as the orchestrator and index for the feature-decomposed implementation of [PROJECT_NAME]. Instead of containing detailed implementation instructions, this document provides high-level project context, feature coordination, and progress tracking across all decomposed features.

## Feature Decomposition Overview

This project has been intelligently decomposed into **[TOTAL_FEATURES]** discrete feature requests using ULTRATHINK analysis. Each feature is a buildable unit of functionality with complete TDD scaffolding, dependency tracking, and independent validation capabilities.

### Decomposition Strategy

The feature decomposition was based on:
- **Project Complexity**: [COMPLEXITY_ANALYSIS]
- **User Journey Analysis**: [USER_JOURNEY_COMPLEXITY]
- **Technical Architecture**: [TECHNICAL_COMPLEXITY]
- **Risk Factors**: [RISK_CONSIDERATIONS]
- **Success Metrics**: [SUCCESS_METRIC_PRIORITIES]

### Feature Categories

Features are organized into the following categories:

#### Core Features ([CORE_FEATURE_COUNT] features)
- [CORE_FEATURE_1]: [BRIEF_DESCRIPTION]
- [CORE_FEATURE_2]: [BRIEF_DESCRIPTION]
- [CORE_FEATURE_3]: [BRIEF_DESCRIPTION]

#### Enhancement Features ([ENHANCEMENT_FEATURE_COUNT] features)
- [ENHANCEMENT_FEATURE_1]: [BRIEF_DESCRIPTION]
- [ENHANCEMENT_FEATURE_2]: [BRIEF_DESCRIPTION]

#### Integration Features ([INTEGRATION_FEATURE_COUNT] features)
- [INTEGRATION_FEATURE_1]: [BRIEF_DESCRIPTION]
- [INTEGRATION_FEATURE_2]: [BRIEF_DESCRIPTION]

## Feature Registry

The complete feature registry is maintained in `2-docs/features/feature-registry.json`. Key metrics:

- **Total Features**: [TOTAL_FEATURES]
- **Completed Features**: [COMPLETED_FEATURES]
- **In Progress Features**: [IN_PROGRESS_FEATURES]
- **Blocked Features**: [BLOCKED_FEATURES]
- **Average Confidence**: [AVERAGE_CONFIDENCE_SCORE]

### Execution Order

Features are implemented in the following dependency-aware order:

1. **Phase 1 - Foundation** ([PHASE_1_FEATURE_COUNT] features)
   - [PHASE_1_FEATURE_1] (FR-[ID])
   - [PHASE_1_FEATURE_2] (FR-[ID])
   - [PHASE_1_FEATURE_3] (FR-[ID])

2. **Phase 2 - Core Functionality** ([PHASE_2_FEATURE_COUNT] features)
   - [PHASE_2_FEATURE_1] (FR-[ID]) - depends on [DEPENDENCIES]
   - [PHASE_2_FEATURE_2] (FR-[ID]) - depends on [DEPENDENCIES]
   - [PHASE_2_FEATURE_3] (FR-[ID]) - depends on [DEPENDENCIES]

3. **Phase 3 - Advanced Features** ([PHASE_3_FEATURE_COUNT] features)
   - [PHASE_3_FEATURE_1] (FR-[ID]) - depends on [DEPENDENCIES]
   - [PHASE_3_FEATURE_2] (FR-[ID]) - depends on [DEPENDENCIES]

4. **Phase 4 - Integration & Polish** ([PHASE_4_FEATURE_COUNT] features)
   - [PHASE_4_FEATURE_1] (FR-[ID]) - depends on [DEPENDENCIES]
   - [PHASE_4_FEATURE_2] (FR-[ID]) - depends on [DEPENDENCIES]

## Project Context

### ULTRATHINK Analysis Summary

The following ULTRATHINK analysis informed the feature decomposition:

#### Project Analysis
- **Market Research**: [MARKET_RESEARCH_SUMMARY]
- **Technical Research**: [TECHNICAL_RESEARCH_SUMMARY]
- **Architecture Vision**: [ARCHITECTURE_VISION_SUMMARY]
- **Risk Assessment**: [RISK_ASSESSMENT_SUMMARY]
- **Visual Documentation Plan**: [VISUAL_DOCUMENTATION_SUMMARY]

#### Key Insights
1. [KEY_INSIGHT_1]
2. [KEY_INSIGHT_2]
3. [KEY_INSIGHT_3]

### Technology Stack

- **Frontend**: [FRONTEND_TECH_STACK]
- **Backend**: [BACKEND_TECH_STACK]
- **Database**: [DATABASE_TECH_STACK]
- **Testing**: [TESTING_TECH_STACK]
- **Deployment**: [DEPLOYMENT_TECH_STACK]

### Architecture Overview

```
[ARCHITECTURE_DIAGRAM_PLACEHOLDER]
```

Key architectural decisions:
- [ARCHITECTURAL_DECISION_1]
- [ARCHITECTURAL_DECISION_2]
- [ARCHITECTURAL_DECISION_3]

## Integration Strategy

### Cross-Feature Integration

The following integration patterns are used across features:

#### Data Integration
- **Shared Data Models**: [SHARED_DATA_MODELS]
- **Data Flow Patterns**: [DATA_FLOW_PATTERNS]
- **Data Consistency**: [DATA_CONSISTENCY_STRATEGY]

#### UI Integration
- **Component Sharing**: [COMPONENT_SHARING_STRATEGY]
- **State Management**: [STATE_MANAGEMENT_STRATEGY]
- **Navigation Flow**: [NAVIGATION_FLOW_STRATEGY]

#### API Integration
- **Service Interfaces**: [SERVICE_INTERFACE_STRATEGY]
- **Event Handling**: [EVENT_HANDLING_STRATEGY]
- **Error Propagation**: [ERROR_PROPAGATION_STRATEGY]

### Integration Testing

Integration testing is organized into three tiers:

1. **Unit Level**: Individual feature tests
2. **Integration Level**: Cross-feature interaction tests
3. **End-to-End Level**: Complete user journey tests

Key integration test scenarios:
- [INTEGRATION_SCENARIO_1]
- [INTEGRATION_SCENARIO_2]
- [INTEGRATION_SCENARIO_3]

## Risk Management

### Project-Level Risks

#### High-Risk Areas
1. **Risk**: [HIGH_RISK_1]
   - **Impact**: [IMPACT_LEVEL]
   - **Probability**: [PROBABILITY_LEVEL]
   - **Mitigation**: [MITIGATION_STRATEGY]
   - **Affected Features**: [AFFECTED_FEATURE_LIST]

2. **Risk**: [HIGH_RISK_2]
   - **Impact**: [IMPACT_LEVEL]
   - **Probability**: [PROBABILITY_LEVEL]
   - **Mitigation**: [MITIGATION_STRATEGY]
   - **Affected Features**: [AFFECTED_FEATURE_LIST]

#### Medium-Risk Areas
1. **Risk**: [MEDIUM_RISK_1]
   - **Mitigation**: [MITIGATION_STRATEGY]
   - **Affected Features**: [AFFECTED_FEATURE_LIST]

### Risk Mitigation Status
- **High-Risk Features**: [HIGH_RISK_FEATURE_COUNT]
- **Medium-Risk Features**: [MEDIUM_RISK_FEATURE_COUNT]
- **Low-Risk Features**: [LOW_RISK_FEATURE_COUNT]
- **Overall Risk Level**: [OVERALL_RISK_LEVEL]

## Quality Assurance

### Testing Strategy

#### Test Coverage Requirements
- **Unit Test Coverage**: [UNIT_TEST_COVERAGE_TARGET]%
- **Integration Test Coverage**: [INTEGRATION_TEST_COVERAGE_TARGET]%


#### Current Test Status
- **Total Unit Tests**: [TOTAL_UNIT_TESTS]
- **Total Integration Tests**: [TOTAL_INTEGRATION_TESTS]

- **Overall Test Coverage**: [OVERALL_TEST_COVERAGE]%

### Validation Gates

Each feature must pass validation gates at three levels:
1. **Pre-Implementation**: Requirements and design validation
2. **Implementation**: Code quality and test validation
3. **Post-Implementation**: Integration and performance validation

#### Validation Status
- **Features with All Gates Passed**: [ALL_GATES_PASSED_COUNT]
- **Features with Partial Gates Passed**: [PARTIAL_GATES_PASSED_COUNT]
- **Features with No Gates Passed**: [NO_GATES_PASSED_COUNT]
- **Overall Validation Score**: [OVERALL_VALIDATION_SCORE]

## Performance Requirements

### System Performance Targets
- **Response Time**: [RESPONSE_TIME_TARGET]
- **Throughput**: [THROUGHPUT_TARGET]
- **Concurrent Users**: [CONCURRENT_USERS_TARGET]
- **Resource Usage**: [RESOURCE_USAGE_TARGET]

### Feature Performance Requirements
Individual features have specific performance requirements documented in their respective feature request documents.

## Success Metrics

### Project Success Criteria
1. **Functional Completeness**: [FUNCTIONAL_COMPLETENESS_CRITERIA]
2. **Performance Benchmarks**: [PERFORMANCE_BENCHMARK_CRITERIA]
3. **Quality Standards**: [QUALITY_STANDARD_CRITERIA]
4. **User Satisfaction**: [USER_SATISFACTION_CRITERIA]

### Current Progress Metrics
- **Features Completed**: [COMPLETED_FEATURES]/[TOTAL_FEATURES] ([COMPLETION_PERCENTAGE]%)
- **Average Feature Confidence**: [AVERAGE_CONFIDENCE_SCORE]
- **Test Coverage**: [CURRENT_TEST_COVERAGE]%
- **Validation Score**: [CURRENT_VALIDATION_SCORE]

## Implementation Workflow

### Development Process

1. **Feature Selection**: Choose next feature based on dependency order
2. **Context Loading**: Load feature requirements, design, and dependencies
3. **TDD Implementation**: Follow Red-Green-Refactor cycles
4. **Test Validation**: Verify behavior against test scenarios
5. **Integration Testing**: Test cross-feature interactions
6. **Validation Gates**: Pass all required validation checkpoints

### TDD Methodology Details
**Red-Green-Refactor Workflow**:
- **RED Phase**: [RED_PHASE_INSTRUCTIONS]
- **GREEN Phase**: [GREEN_PHASE_INSTRUCTIONS]  
- **REFACTOR Phase**: [REFACTOR_PHASE_INSTRUCTIONS]
- **Focused Mode**: [FOCUSED_MODE_DETAILS]

### Test File Organization
**Test Structure**: [TEST_FILE_STRUCTURE]
**Naming Convention**: [TEST_NAMING_CONVENTION]
**Test Groups**: [TEST_GROUP_ORGANIZATION]

### Specialist Agent Coordination
**Code Writer Agent**: [CODE_WRITER_COORDINATION]
**Code Tester Agent**: [CODE_TESTER_COORDINATION]
**Integration Patterns**: [AGENT_INTEGRATION_PATTERNS]

### Command Usage

```bash
# Execute all incomplete features in dependency order
/execute-prp

# Execute specific features
/execute-prp --feature=FR-001,FR-003

# Execute with automatic dependency resolution
/execute-prp --feature=FR-005 --auto-deps

# Validate features with integration tests
/validate --feature=FR-001,FR-002 --integration

# Smart validation with dependencies
/validate --deep
```

## Monitoring and Reporting

### Progress Tracking
- **Daily Progress Reports**: Automated generation of progress summaries
- **Feature Status Dashboard**: Real-time view of feature completion status
- **Risk Monitoring**: Continuous monitoring of risk factors and mitigation status
- **Quality Metrics**: Ongoing tracking of test coverage and validation scores

### Reporting Schedule
- **Weekly Status Reports**: Every [REPORTING_DAY]
- **Milestone Reviews**: At completion of each phase
- **Risk Reviews**: [RISK_REVIEW_FREQUENCY]
- **Quality Reviews**: [QUALITY_REVIEW_FREQUENCY]

## Documentation References

### Feature Documentation
- **Feature Registry**: `2-docs/features/feature-registry.json`
- **Individual Features**: `2-docs/features/FR-XXX-[feature-name].md`
- **Feature Documentation**: `2-docs/features/README.md`

### Planning Documentation
- **Project Analysis**: `2-docs/planning/project-analysis.md`
- **Market Research**: `2-docs/planning/market-research.md`
- **Technical Research**: `2-docs/planning/technical-research.md`
- **Architecture Vision**: `2-docs/planning/architecture-vision.md`
- **Risk Assessment**: `2-docs/planning/risk-assessment.md`
- **Visual Documentation Plan**: `2-docs/planning/visual-documentation-plan.md`

### Testing Documentation
- **Integration Tests**: `tests/integration/README.md`
- **Test Configuration**: `tests/config/`


### System Documentation
- **Context Engineering**: `context_engineering_explanation.md`
- **Feature Request System**: `feature_request_system.md`
- **Command Reference**: `.claude/commands/`

### Implementation Standards
- **Design Review Standards**: `2-docs/context/design_review_standards_software.md` (for software components)
- **Design Review Standards**: `2-docs/context/design_review_standards_non_software.md` (for non-software components, if applicable)
- **Validation Strategy**: `2-docs/context/validation_strategy_software.md` (for software components)
- **Validation Strategy**: `2-docs/context/validation_strategy_non_software.md` (for non-software components, if applicable)
- **Coding Patterns**: [CODING_PATTERNS_REFERENCE]
- **TDD Methodology**: [TDD_METHODOLOGY_DETAILS]

## Appendices

### Appendix A: Feature Dependency Graph
[DEPENDENCY_GRAPH_VISUALIZATION]

### Appendix B: Integration Test Matrix
[INTEGRATION_TEST_MATRIX]

### Appendix C: Risk Register
[DETAILED_RISK_REGISTER]

### Appendix D: Performance Benchmarks
[PERFORMANCE_BENCHMARK_DETAILS]

---

**Note**: This PRP serves as the orchestrator for a feature-decomposed project. Detailed implementation instructions are found in individual feature request documents in `2-docs/features/`. Use the Context Engineering commands (`/execute-prp`, `/validate`) to implement and validate individual features according to their dependency order.