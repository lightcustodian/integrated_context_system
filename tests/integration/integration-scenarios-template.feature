@integration @features:[FEATURE_IDS]
Feature: [INTEGRATION_FEATURE_NAME]
  As a [USER_ROLE]
  I want [INTEGRATION_CAPABILITY]
  So that [INTEGRATION_BENEFIT]

  Background:
    Given I have the application running
    And all required features are initialized

  Scenario: [INTEGRATION_SCENARIO_NAME]
    Given [GIVEN_CONDITION]
    When [WHEN_ACTION]
    Then [THEN_RESULT]
    And [ADDITIONAL_VERIFICATION]

  Scenario: [INTEGRATION_SCENARIO_NAME_2]
    Given [GIVEN_CONDITION_2]
    When [WHEN_ACTION_2]
    Then [THEN_RESULT_2]
    And [ADDITIONAL_VERIFICATION_2]

  Scenario Outline: [PARAMETERIZED_SCENARIO_NAME]
    Given [GIVEN_CONDITION_WITH_PARAMETER]
    When [WHEN_ACTION_WITH_PARAMETER]
    Then [THEN_RESULT_WITH_PARAMETER]

    Examples:
      | parameter1 | parameter2 | expected_result |
      | value1     | value2     | result1         |
      | value3     | value4     | result2         |
