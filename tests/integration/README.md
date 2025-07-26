# Integration Tests

This directory contains integration tests for the Feature Request Decomposition System. Integration tests verify that multiple features work together correctly and that cross-feature functionality operates as expected.

## Directory Structure

```
tests/integration/
├── README.md                           # This file
├── feature-interactions/               # Tests for feature-to-feature interactions
├── data-flow/                         # Tests for data flow between features
├── state-management/                  # Tests for state consistency across features
├── validation-system-integration.test.js  # Integration test for validation system
└── templates/                         # Templates for generating integration tests
    ├── feature-interaction-template.js
    ├── data-flow-template.js
    └── state-management-template.js
```

## Test Categories

### Feature Interaction Tests (`feature-interactions/`)
These tests verify that features work together correctly when they have dependencies or integration points.

**Example**: Testing that FR-001 (Basic Task CRUD) and FR-003 (Daily Calendar View) work together when creating a task and viewing it in the calendar.

### Data Flow Tests (`data-flow/`)
These tests verify that data flows correctly between features and that data consistency is maintained across feature boundaries.

**Example**: Testing that task data created in FR-001 is properly accessible and displayed in FR-003.

### State Management Tests (`state-management/`)
These tests verify that application state is managed consistently across multiple features and that features don't interfere with each other's state.

**Example**: Testing that state changes in FR-001 don't negatively impact the state used by FR-002.

## Test Naming Convention

Integration tests should follow this naming pattern:
- Feature interactions: `{feature1-id}-{feature2-id}-interaction.test.js`
- Data flow: `{feature-id}-data-flow.test.js`
- State management: `{feature-id}-state-management.test.js`

## Test Tags

Integration tests should use the following tags in their describe blocks:
- `@integration`: Marks the test as an integration test
- `@features:FR-001,FR-002`: Lists the features involved in the test

Example:
```javascript
// @integration @features:FR-001,FR-003
describe('Task CRUD and Calendar View Integration', () => {
  // test cases
});
```

## Running Integration Tests

Integration tests are executed as part of the validation process:

```bash
# Run integration tests for specific features
/validate --feature=FR-001,FR-003 --integration

# Run all integration tests
/validate --all --integration
```

## Test Data Management

Integration tests should:
1. Set up clean test data before each test
2. Clean up test data after each test
3. Use isolated test environments
4. Mock external dependencies when appropriate

## Traceability

Each integration test should be traceable to:
1. The features it tests (via @features tag)
2. The requirements it validates
3. The BDD scenarios it implements

This traceability is maintained in the feature registry and test mapping files.