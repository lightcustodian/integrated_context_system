# BDD Features Directory

This directory contains Gherkin feature files for behavior-driven development.

## File Organization
- One feature file per major functionality
- Use descriptive names: `task-management.feature`
- Tag scenarios with test groups: @happy_path, @edge_case, @negative_case

## Example Structure
```gherkin
Feature: Task Management
  As a user
  I want to manage my tasks
  So that I can stay organized

  @happy_path
  Scenario: Add a new task
    Given I am on the task manager page
    When I add a task "Buy groceries"
    Then I should see "Buy groceries" in my task list
```

## Best Practices
- Focus on business value and user perspective
- Use clear, non-technical language
- Follow Given-When-Then structure
- Link scenarios to unit tests with @unit-test-group tags
- Keep scenarios focused on one behavior each

## Integration with Test Framework
- Features are executed using [TEST_FRAMEWORK_BDD]
- Step definitions are in `tests/bdd/step_definitions/`
- Mapping to unit tests in `tests/mapping/`