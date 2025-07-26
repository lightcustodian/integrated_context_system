Feature: [FEATURE_NAME]
  As a [USER_ROLE]
  I want [GOAL]
  So that [BENEFIT]

  Background:
    Given [COMMON_SETUP_CONDITION]

  @happy_path @unit-test-group:happy
  Scenario: [HAPPY_PATH_SCENARIO]
    Given [PRECONDITION]
    When [ACTION]
    Then [EXPECTED_OUTCOME]

  @edge_case @unit-test-group:edge
  Scenario: [EDGE_CASE_SCENARIO]
    Given [EDGE_CONDITION]
    When [ACTION]
    Then [EDGE_OUTCOME]

  @negative_case @unit-test-group:negative
  Scenario: [NEGATIVE_CASE_SCENARIO]
    Given [INVALID_CONDITION]
    When [ACTION]
    Then [ERROR_HANDLING_OUTCOME]