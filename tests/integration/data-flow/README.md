# Data Flow Integration Tests

This directory contains tests that validate data flow between features. These tests ensure that data is correctly passed, transformed, and maintained across feature boundaries.

## Purpose

Data flow tests verify:
- Data consistency across features
- Proper data transformation between features
- Data integrity in multi-feature workflows
- Correct handling of shared data structures

## Test Categories

### 1. Data Consistency Tests
Verify that data remains consistent when accessed by multiple features:
- Shared data models
- Cross-feature data updates
- Concurrent data access

### 2. Data Transformation Tests
Verify that data is correctly transformed when passed between features:
- Format conversions
- Data enrichment
- Data validation

### 3. Data Integrity Tests
Verify that data integrity is maintained across feature boundaries:
- Referential integrity
- Data validation rules
- Transaction consistency

## Test Structure

```javascript
// data-flow-{scenario}.test.js
describe('Data Flow: {Scenario Description}', () => {
  test('should maintain data consistency across features', async () => {
    // 1. Setup initial data state
    // 2. Perform operations across multiple features
    // 3. Verify data consistency
  });

  test('should transform data correctly between features', async () => {
    // 1. Create data in Feature A format
    // 2. Pass data to Feature B
    // 3. Verify correct transformation
  });

  test('should handle data validation across features', async () => {
    // 1. Create invalid data
    // 2. Attempt cross-feature operation
    // 3. Verify proper error handling
  });
});
```

## Example Tests

### Task Data Flow Example
```javascript
// task-data-flow.test.js
// @features:FR-001,FR-002,FR-003
// @data-flow

describe('Task Data Flow Integration', () => {
  test('task creation flows correctly to hierarchy and calendar', async () => {
    // 1. Create task via CRUD feature (FR-001)
    const task = await createTask({
      title: 'Test Task',
      dueDate: '2025-01-20',
      parentGroup: 'Work Projects'
    });

    // 2. Verify task appears in hierarchy (FR-002)
    const hierarchy = await getTaskHierarchy();
    expect(hierarchy.groups['Work Projects'].tasks).toContain(task.id);

    // 3. Verify task appears in calendar (FR-003)
    const calendarTasks = await getCalendarTasks('2025-01-20');
    expect(calendarTasks).toContainEqual(
      expect.objectContaining({
        id: task.id,
        title: 'Test Task',
        parentGroup: 'Work Projects'
      })
    );
  });

  test('task updates propagate across all features', async () => {
    // Test that updating a task in one feature updates it everywhere
  });

  test('task deletion removes from all features', async () => {
    // Test that deleting a task removes it from hierarchy and calendar
  });
});
```

## Running Data Flow Tests

```bash
# Run all data flow tests
npm run test:integration:data-flow

# Run specific data flow scenario
npm run test:integration -- tests/integration/data-flow/task-data-flow.test.js

# Run with verbose output to see data flow
npm run test:integration:data-flow -- --verbose
```

## Best Practices

1. **Test Complete Flows**: Test entire data journeys from creation to consumption
2. **Verify Transformations**: Ensure data transformations are correct and reversible
3. **Test Edge Cases**: Include boundary conditions and error scenarios
4. **Use Real Data**: Use realistic data that represents actual use cases
5. **Validate Schemas**: Ensure data conforms to expected schemas at each step
6. **Test Performance**: Verify that data flow doesn't create performance bottlenecks

## Common Data Flow Patterns

### 1. Create-Read Pattern
```javascript
// Feature A creates data → Feature B reads data
const data = await featureA.create(input);
const result = await featureB.read(data.id);
expect(result).toMatchObject(expectedOutput);
```

### 2. Transform-Pass Pattern
```javascript
// Feature A transforms data → passes to Feature B
const transformed = await featureA.transform(input);
const result = await featureB.process(transformed);
expect(result).toBeDefined();
```

### 3. Update-Propagate Pattern
```javascript
// Feature A updates data → changes propagate to Feature B
await featureA.update(id, changes);
const updated = await featureB.get(id);
expect(updated).toMatchObject(changes);
```

## Debugging Data Flow Issues

1. **Add Logging**: Log data at each transformation step
2. **Verify Schemas**: Check that data matches expected schemas
3. **Test Isolation**: Isolate each step of the data flow
4. **Check Timing**: Verify that async operations complete in correct order
5. **Validate State**: Ensure system state is correct before and after operations