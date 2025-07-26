# Feature BDD Scenarios Template
# Feature ID: [FEATURE_ID]
# Feature Name: [FEATURE_NAME]

@feature:[FEATURE_ID]
Feature: [FEATURE_NAME]
  As a [USER_ROLE]
  I want [FEATURE_CAPABILITY]
  So that [USER_BENEFIT]

  Background:
    Given [BACKGROUND_CONDITION_1]
    And [BACKGROUND_CONDITION_2]
    And the system is in a clean state

  # Happy Path Scenarios
  @happy-path @smoke
  Scenario: [HAPPY_SCENARIO_1_NAME]
    Given [HAPPY_GIVEN_CONDITION_1]
    And [HAPPY_GIVEN_CONDITION_2]
    When [HAPPY_WHEN_ACTION_1]
    And [HAPPY_WHEN_ACTION_2]
    Then [HAPPY_THEN_RESULT_1]
    And [HAPPY_THEN_RESULT_2]
    And [HAPPY_THEN_RESULT_3]

  @happy-path
  Scenario: [HAPPY_SCENARIO_2_NAME]
    Given [HAPPY_GIVEN_CONDITION_1]
    When [HAPPY_WHEN_ACTION_1]
    Then [HAPPY_THEN_RESULT_1]

  @happy-path
  Scenario Outline: [HAPPY_SCENARIO_OUTLINE_NAME]
    Given [HAPPY_GIVEN_CONDITION_WITH_PARAM]
    When [HAPPY_WHEN_ACTION_WITH_PARAM]
    Then [HAPPY_THEN_RESULT_WITH_PARAM]

    Examples:
      | [PARAM_1] | [PARAM_2] | [EXPECTED_RESULT] |
      | [VALUE_1] | [VALUE_2] | [RESULT_1]        |
      | [VALUE_3] | [VALUE_4] | [RESULT_2]        |
      | [VALUE_5] | [VALUE_6] | [RESULT_3]        |

  # Edge Case Scenarios
  @edge-case
  Scenario: [EDGE_SCENARIO_1_NAME]
    Given [EDGE_GIVEN_CONDITION_1]
    When [EDGE_WHEN_ACTION_1]
    Then [EDGE_THEN_RESULT_1]

  @edge-case
  Scenario: [EDGE_SCENARIO_2_NAME]
    Given [EDGE_GIVEN_CONDITION_2]
    When [EDGE_WHEN_ACTION_2]
    Then [EDGE_THEN_RESULT_2]

  @edge-case
  Scenario: [BOUNDARY_SCENARIO_NAME]
    Given [BOUNDARY_GIVEN_CONDITION]
    When [BOUNDARY_WHEN_ACTION]
    Then [BOUNDARY_THEN_RESULT]

  @edge-case
  Scenario: [CONCURRENT_SCENARIO_NAME]
    Given [CONCURRENT_GIVEN_CONDITION]
    When [CONCURRENT_WHEN_ACTION]
    Then [CONCURRENT_THEN_RESULT]

  # Negative Case Scenarios
  @negative-case
  Scenario: [NEGATIVE_SCENARIO_1_NAME]
    Given [NEGATIVE_GIVEN_CONDITION_1]
    When [NEGATIVE_WHEN_ACTION_1]
    Then [NEGATIVE_THEN_RESULT_1]
    And [ERROR_MESSAGE_VALIDATION_1]

  @negative-case
  Scenario: [NEGATIVE_SCENARIO_2_NAME]
    Given [NEGATIVE_GIVEN_CONDITION_2]
    When [NEGATIVE_WHEN_ACTION_2]
    Then [NEGATIVE_THEN_RESULT_2]
    And [ERROR_MESSAGE_VALIDATION_2]

  @negative-case
  Scenario: [VALIDATION_ERROR_SCENARIO_NAME]
    Given [VALIDATION_GIVEN_CONDITION]
    When [VALIDATION_WHEN_ACTION]
    Then [VALIDATION_THEN_RESULT]
    And [VALIDATION_ERROR_MESSAGE]

  @negative-case
  Scenario: [AUTHORIZATION_ERROR_SCENARIO_NAME]
    Given [AUTH_GIVEN_CONDITION]
    When [AUTH_WHEN_ACTION]
    Then [AUTH_THEN_RESULT]
    And [AUTH_ERROR_MESSAGE]

  # Performance Scenarios
  @performance
  Scenario: [PERFORMANCE_SCENARIO_NAME]
    Given [PERFORMANCE_GIVEN_CONDITION]
    When [PERFORMANCE_WHEN_ACTION]
    Then [PERFORMANCE_THEN_RESULT]
    And the response time should be less than [RESPONSE_TIME_THRESHOLD] milliseconds

  # Security Scenarios
  @security
  Scenario: [SECURITY_SCENARIO_NAME]
    Given [SECURITY_GIVEN_CONDITION]
    When [SECURITY_WHEN_ACTION]
    Then [SECURITY_THEN_RESULT]
    And [SECURITY_VALIDATION]

  # Accessibility Scenarios
  @accessibility
  Scenario: [ACCESSIBILITY_SCENARIO_NAME]
    Given [ACCESSIBILITY_GIVEN_CONDITION]
    When [ACCESSIBILITY_WHEN_ACTION]
    Then [ACCESSIBILITY_THEN_RESULT]
    And [ACCESSIBILITY_VALIDATION]

  # Integration Scenarios (with other features)
  @integration @features:[FEATURE_ID],[DEPENDENT_FEATURE_ID]
  Scenario: [INTEGRATION_SCENARIO_NAME]
    Given [INTEGRATION_GIVEN_CONDITION]
    And [DEPENDENT_FEATURE_CONDITION]
    When [INTEGRATION_WHEN_ACTION]
    Then [INTEGRATION_THEN_RESULT]
    And [CROSS_FEATURE_VALIDATION]

  # Mobile/Responsive Scenarios
  @mobile @responsive
  Scenario: [MOBILE_SCENARIO_NAME]
    Given [MOBILE_GIVEN_CONDITION]
    And I am using a mobile device
    When [MOBILE_WHEN_ACTION]
    Then [MOBILE_THEN_RESULT]
    And the interface should be mobile-friendly

  # Data Migration/Upgrade Scenarios
  @data-migration
  Scenario: [MIGRATION_SCENARIO_NAME]
    Given [MIGRATION_GIVEN_CONDITION]
    When [MIGRATION_WHEN_ACTION]
    Then [MIGRATION_THEN_RESULT]
    And [DATA_INTEGRITY_VALIDATION]