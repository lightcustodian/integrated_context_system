// === tier1-prp.md ===
**Purpose**: Standard PRP template for Tier 1 implementations 
**Function**: Ensures consistent PRP structure and completeness

# PRP: [FEATURE_NAME]

## Metadata
- **Tier**: 1 (Core Implementation)
- **PRP ID**: [AUTO-GENERATED]
- **Complexity**: [LOW/MEDIUM/HIGH]
- **Estimated Effort**: [SMALL/MEDIUM/LARGE]
- **Dependencies**: [LIST_ANY_DEPENDENCIES]
- **Tech Stack**: [AUTO-DETECTED]
- **Created**: [AUTO-GENERATED]

### Iteration Tracking
- **Iteration**: [AUTO-GENERATED]
- **Previous Iteration**: [PREVIOUS_PRP_ID_IF_APPLICABLE]
- **Confidence Progression**: [PREVIOUS_CONFIDENCE_SCORES]

## Goal
[SPECIFIC_MEASURABLE_OUTCOME_WHAT_EXACTLY_NEEDS_TO_BE_BUILT]

## Business Value
- **User Impact**: [HOW_THIS_BENEFITS_USERS]
- **Technical Value**: [HOW_THIS_IMPROVES_THE_CODEBASE]
- **Priority**: [HIGH_MEDIUM_LOW_AND_WHY]

## Context Package

### Required Documentation
- **API Docs**: [URL_AND_SPECIFIC_SECTIONS_NEEDED]
- **Library Docs**: [RELEVANT_DOCUMENTATION_LINKS]
- **Internal Docs**: [PROJECT_SPECIFIC_DOCUMENTATION]
- **RAG Sources**: [EXTERNAL_DOCUMENTATION_VIA_MCP]
  - [TOPIC]: [ENDPOINT] - [USAGE_DESCRIPTION]

### Code Examples
- **Pattern File**: [PATH_TO_EXAMPLE] - [WHAT_PATTERN_TO_FOLLOW]
- **Test Example**: [PATH_TO_TEST] - [TESTING_APPROACH]
- **Integration**: [PATH_TO_INTEGRATION] - [HOW_TO_INTEGRATE]
- **Relevant Examples**: [AUTO_MATCHED_FROM_EXAMPLES_JSON]
  - [EXAMPLE_NAME] (RELEVANCE: [SCORE]) - [DESCRIPTION]

### Critical Constraints
- **Performance**: [ANY_PERFORMANCE_REQUIREMENTS]
- **Security**: [SECURITY_CONSIDERATIONS]
- **Compatibility**: [VERSION_OR_SYSTEM_COMPATIBILITY]
- **Gotchas**: [KNOWN_PITFALLS_TO_AVOID]
- **Iteration Learnings**: [LESSONS_FROM_PREVIOUS_ITERATIONS]

## BDD Scenario
[BDD_SCENARIO]

## Implementation Blueprint

### Phase 1: Core Structure
- [ ] **Task 1**: [SPECIFIC_IMPLEMENTATION_TASK]
  - **Action**: [WHAT_TO_DO]
  - **Pattern**: [REFERENCE_TO_FOLLOW]
  - **Validation**: [HOW_TO_VERIFY_SUCCESS]
  - **Iteration Improvements**: [IMPROVEMENTS_FROM_PREVIOUS_ITERATION]

### Phase 2: Integration
- [ ] **Task 2**: [INTEGRATION_TASK]
  - **Action**: [WHAT_TO_DO]
  - **Dependencies**: [WHAT_MUST_BE_COMPLETE_FIRST]
  - **Validation**: [HOW_TO_VERIFY_SUCCESS]

### Phase 3: Testing & Validation
- [ ] **Task 3**: [TESTING_TASK]
  - **Coverage**: [REQUIRED_TEST_COVERAGE]
  - **Types**: [UNIT_INTEGRATION_ETC]
  - **Validation**: [HOW_TO_VERIFY_SUCCESS]

## Validation Gates

### Level 1: Syntax & Style
```bash
[LEVEL1_VALIDATION_COMMANDS]
```

### Level 2: Unit Tests
```bash
[LEVEL2_VALIDATION_COMMANDS]
```

### Level 3: Integration Tests
```bash
[LEVEL3_VALIDATION_COMMANDS]
```

### Level 4: Quality Gates
```bash
[LEVEL4_VALIDATION_COMMANDS]
```

## Success Criteria
- [ ] All validation gates pass
- [ ] Feature meets specified requirements
- [ ] Tests achieve required coverage (minimum 80%)
- [ ] Documentation is complete and accurate
- [ ] No security vulnerabilities detected
- [ ] Performance benchmarks met
- [ ] Integration with existing systems successful
- [ ] RAG sources properly integrated (if applicable)

## Risk Assessment
- **High Risk**: [IDENTIFY_HIGH_RISK_ASPECTS]
- **Medium Risk**: [IDENTIFY_MEDIUM_RISK_ASPECTS]
- **Low Risk**: [IDENTIFY_LOW_RISK_ASPECTS]
- **Mitigation Strategies**: [HOW_TO_ADDRESS_EACH_RISK]
- **Iteration Risk Reduction**: [HOW_THIS_ITERATION_REDUCES_PREVIOUS_RISKS]

## Confidence Score
- **Initial**: [1_TO_10] (auto-calculated)
- **Current**: [UPDATED_DURING_IMPLEMENTATION]
- **Previous Iterations**: [CONFIDENCE_PROGRESSION_FROM_PREVIOUS_VERSIONS]

### Confidence Factors
- **Pattern Availability**: [NUMBER_AND_QUALITY_OF_SIMILAR_PATTERNS_FOUND]
- **Example Relevance**: [QUALITY_OF_RELEVANT_EXAMPLES]
- **Documentation Coverage**: [COMPLETENESS_OF_AVAILABLE_DOCUMENTATION]
- **RAG Integration**: [QUALITY_AND_RELEVANCE_OF_EXTERNAL_SOURCES]
- **Iteration Bonus**: [CONFIDENCE_BOOST_FROM_PREVIOUS_LEARNINGS]

## Iteration History
[AUTO_POPULATED_IF_THIS_IS_AN_ITERATION]
### Previous Iteration Summary
- **Version**: [PREVIOUS_VERSION_NUMBER]
- **Outcome**: [SUCCESS_PARTIAL_FAILED]
- **Key Learnings**: [WHAT_WAS_LEARNED]
- **Improvements Made**: [HOW_THIS_ITERATION_IMPROVES_ON_PREVIOUS]

---
**Note**: This PRP was generated with Context Engineering v1.0.0 including RAG integration and iteration support.
