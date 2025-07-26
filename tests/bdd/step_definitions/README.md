# BDD Step Definitions Directory

This directory contains step definition files that implement the steps in Gherkin feature files.

## File Organization
- One step definition file per feature file
- Use naming convention: `feature-name.steps.js`
- Group related steps together

## Example Structure
```javascript
const { Given, When, Then } = require('jest-cucumber');

Given('I am on the task manager page', () => {
  // Implementation
});

When('I add a task {string}', (taskName) => {
  // Implementation
});

Then('I should see {string} in my task list', (taskName) => {
  // Implementation
});
```

## Best Practices
- Keep step definitions focused and reusable
- Use dependency injection for test context
- Implement proper assertions
- Handle test data setup and teardown
- Use parameter types for complex arguments

## Integration with Test Framework
- Step definitions are executed by [TEST_FRAMEWORK_BDD]
- Feature files are in `tests/bdd/features/`
- Support code can be placed in `tests/bdd/support/`