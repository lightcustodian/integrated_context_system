# BDD-Unit Test Mapping Directory

This directory contains mapping files that link BDD scenarios to unit tests.

## File Organization
- One mapping file per feature
- Use naming convention: `feature-name-mapping.json`
- JSON format for machine readability

## Example Structure
```json
{
  "feature": "task-management",
  "scenarios": [
    {
      "id": "add-new-task",
      "title": "Add a new task",
      "tags": ["@happy_path", "@unit-test-group:happy"],
      "unit_tests": [
        {
          "file": "tests/unit/task-manager.test.js",
          "group": "happy",
          "test_cases": ["should add task to list", "should mark new task as incomplete"]
        }
      ]
    }
  ]
}
```

## Best Practices
- Maintain complete traceability between BDD scenarios and unit tests
- Update mapping when adding or modifying tests
- Use consistent IDs and naming
- Include all scenarios from feature files
- Link to specific test groups and test cases

## Integration with Test Framework
- Mapping files are used by the validation system
- Helps ensure complete test coverage
- Enables focused test execution for failed scenarios