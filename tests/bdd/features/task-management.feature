Feature: Task Management
  As an individual user
  I want to manage my personal tasks
  So that I can stay organized and productive

  Background:
    Given I am on the task manager page
    And the task list is initially empty

  @happy_path @unit-test-group:happy
  Scenario: Add a new task
    When I add a task "Buy groceries"
    Then I should see "Buy groceries" in my task list
    And the task should be marked as incomplete

  @happy_path @unit-test-group:happy
  Scenario: Mark task as complete
    Given I have a task "Buy groceries" in my list
    When I mark "Buy groceries" as complete
    Then "Buy groceries" should be marked as completed

  @happy_path @unit-test-group:happy
  Scenario: Edit an existing task
    Given I have a task "Buy groceries" in my list
    When I edit "Buy groceries" to "Buy organic groceries"
    Then I should see "Buy organic groceries" in my task list
    And I should not see "Buy groceries" in my task list

  @happy_path @unit-test-group:happy
  Scenario: Delete a task
    Given I have a task "Buy groceries" in my list
    When I delete the task "Buy groceries"
    Then "Buy groceries" should be removed from my task list

  @edge_case @unit-test-group:edge
  Scenario: Add task with special characters
    When I add a task "Review @project #1 (urgent!)"
    Then I should see "Review @project #1 (urgent!)" in my task list

  @edge_case @unit-test-group:edge
  Scenario: Add a very long task description
    When I add a task with a description of 200 characters
    Then the task should be added successfully
    And the task description should be displayed properly

  @edge_case @unit-test-group:edge
  Scenario: Mark completed task as incomplete
    Given I have a completed task "Buy groceries" in my list
    When I mark "Buy groceries" as incomplete
    Then "Buy groceries" should be marked as incomplete

  @negative_case @unit-test-group:negative
  Scenario: Try to add empty task
    When I try to add an empty task
    Then I should see an error message "Task cannot be empty"
    And no new task should be added to the list

  @negative_case @unit-test-group:negative
  Scenario: Try to edit task with empty description
    Given I have a task "Buy groceries" in my list
    When I try to edit "Buy groceries" to an empty description
    Then I should see an error message "Task cannot be empty"
    And the task should remain unchanged

  @negative_case @unit-test-group:negative
  Scenario: Try to delete non-existent task
    When I try to delete a non-existent task
    Then I should see an error message "Task not found"