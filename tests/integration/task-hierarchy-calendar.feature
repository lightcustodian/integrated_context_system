@integration @features:FR-001,FR-002,FR-003
Feature: Task Hierarchy and Calendar Integration
  As a user
  I want hierarchical tasks to display properly in calendar views
  So that I can see task organization in my daily planning

  Background:
    Given I have the task management system running
    And I have the calendar view feature enabled

  Scenario: Create hierarchical task and view in daily calendar
    Given I have created a project group 'Work Projects'
    When I create a task 'Review Documentation' under 'Work Projects'
    And I set the due date to today
    And I navigate to the daily calendar view
    Then I should see 'Review Documentation' in today's calendar
    And it should show the parent group 'Work Projects'
    And the task should be properly categorized

  Scenario: Update hierarchical task reflects in calendar
    Given I have a project group 'Personal Tasks'
    And I have a task 'Buy groceries' under 'Personal Tasks'
    And the task is scheduled for today
    When I update the task title to 'Buy organic groceries'
    And I navigate to the daily calendar view
    Then I should see 'Buy organic groceries' in today's calendar
    And it should still show the parent group 'Personal Tasks'

  Scenario Outline: Multiple hierarchy levels display correctly
    Given I have a project group '<level1>'
    And I have a subgroup '<level2>' under '<level1>'
    When I create a task '<task>' under '<level2>'
    And I set the due date to today
    And I navigate to the daily calendar view
    Then I should see '<task>' in today's calendar
    And it should show the full hierarchy '<level1> > <level2>'

    Examples:
      | level1        | level2      | task                |
      | Work Projects | Development | Code Review         |
      | Personal      | Health      | Doctor Appointment  |
      | Learning      | Programming | Study JavaScript    |
