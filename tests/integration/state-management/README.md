# State Management Integration Tests

This directory contains tests that validate state consistency and management across multiple features. These tests ensure that application state remains coherent when multiple features interact.

## Purpose

State management tests verify:
- State consistency across features
- Proper state transitions in multi-feature scenarios
- State isolation between features
- Correct handling of shared state

## Test Categories

### 1. State Consistency Tests
Verify that application state remains consistent across features:
- Shared state updates
- State synchronization
- Concurrent state modifications

### 2. State Transition Tests
Verify that state transitions work correctly across feature boundaries:
- Multi-step workflows
- State machine transitions
- Error state handling

### 3. State Isolation Tests
Verify that features maintain proper state isolation:
- Feature-specific state
- State encapsulation
- State boundary enforcement

## Test Structure

```javascript
// state-{scenario}.test.js
describe('State Management: {Scenario Description}', () => {
  beforeEach(() => {
    // Initialize clean state
  });

  test('should maintain state consistency across features', async () => {
    // 1. Set initial state
    // 2. Perform operations across features
    // 3. Verify state consistency
  });

  test('should handle concurrent state modifications', async () => {
    // 1. Setup concurrent operations
    // 2. Execute operations simultaneously
    // 3. Verify final state is correct
  });

  afterEach(() => {
    // Clean up state
  });
});
```

## Example Tests

### Task State Management Example
```javascript
// task-state-management.test.js
// @features:FR-001,FR-002,FR-006
// @state-management

describe('Task State Management Integration', () => {
  test('task status updates consistently across features', async () => {
    // 1. Create task in CRUD feature (FR-001)
    const task = await createTask({
      title: 'Test Task',
      status: 'pending'
    });

    // 2. Start time tracking (FR-006)
    await startTimeTracking(task.id);
    
    // 3. Verify task status updated in hierarchy (FR-002)
    const hierarchyTask = await getTaskFromHierarchy(task.id);
    expect(hierarchyTask.status).toBe('in_progress');
    expect(hierarchyTask.timeTracking.active).toBe(true);

    // 4. Complete task in CRUD feature
    await updateTask(task.id, { status: 'completed' });

    // 5. Verify time tracking stopped automatically
    const timeTrackingState = await getTimeTrackingState(task.id);
    expect(timeTrackingState.active).toBe(false);
    expect(timeTrackingState.totalTime).toBeGreaterThan(0);
  });

  test('state isolation between different task groups', async () => {
    // Test that operations on one task group don't affect others
    const group1Tasks = await createTaskGroup('Work', ['Task 1', 'Task 2']);
    const group2Tasks = await createTaskGroup('Personal', ['Task 3', 'Task 4']);

    // Modify group1
    await updateTaskGroup('Work', { status: 'archived' });

    // Verify group2 is unaffected
    const group2State = await getTaskGroupState('Personal');
    expect(group2State.status).toBe('active');
    expect(group2State.tasks).toHaveLength(2);
  });

  test('handles state conflicts gracefully', async () => {
    // Test concurrent modifications to the same state
    const task = await createTask({ title: 'Conflict Test' });

    // Simulate concurrent updates
    const update1 = updateTask(task.id, { priority: 'high' });
    const update2 = updateTask(task.id, { status: 'in_progress' });

    await Promise.all([update1, update2]);

    // Verify final state is consistent
    const finalTask = await getTask(task.id);
    expect(finalTask.priority).toBe('high');
    expect(finalTask.status).toBe('in_progress');
  });
});
```

## State Management Patterns

### 1. Shared State Pattern
```javascript
// Multiple features share common state
const sharedState = await getSharedState();
await featureA.updateSharedState(changes);
const updatedState = await featureB.getSharedState();
expect(updatedState).toMatchObject(changes);
```

### 2. State Synchronization Pattern
```javascript
// State changes in one feature trigger updates in others
await featureA.performAction();
await waitForStateSync();
const featureBState = await featureB.getState();
expect(featureBState).toReflectChangesFrom(featureA);
```

### 3. State Isolation Pattern
```javascript
// Features maintain isolated state
await featureA.setState(stateA);
await featureB.setState(stateB);
expect(await featureA.getState()).toEqual(stateA);
expect(await featureB.getState()).toEqual(stateB);
```

## Running State Management Tests

```bash
# Run all state management tests
npm run test:integration:state

# Run specific state scenario
npm run test:integration -- tests/integration/state-management/task-state-management.test.js

# Run with state debugging
npm run test:integration:state -- --verbose --debug-state
```

## Best Practices

1. **Clean State**: Always start with clean state for each test
2. **Verify Isolation**: Ensure features don't interfere with each other's state
3. **Test Concurrency**: Test concurrent state modifications
4. **Handle Conflicts**: Test how the system handles state conflicts
5. **Monitor Performance**: Ensure state operations don't create bottlenecks
6. **Document State Flow**: Clearly document how state flows between features

## Common State Issues

### 1. Race Conditions
```javascript
// Problem: Concurrent state updates
// Solution: Use proper synchronization
test('handles concurrent updates correctly', async () => {
  const promises = [
    updateState('key1', 'value1'),
    updateState('key2', 'value2')
  ];
  await Promise.all(promises);
  // Verify both updates succeeded
});
```

### 2. State Leakage
```javascript
// Problem: State from one test affects another
// Solution: Proper cleanup
afterEach(async () => {
  await clearAllState();
});
```

### 3. Stale State
```javascript
// Problem: Features reading outdated state
// Solution: Ensure state synchronization
test('reads fresh state after updates', async () => {
  await updateState('key', 'newValue');
  await waitForStateSync();
  const state = await readState('key');
  expect(state).toBe('newValue');
});
```

## Debugging State Issues

1. **State Snapshots**: Take snapshots of state at key points
2. **State History**: Track state changes over time
3. **Isolation Testing**: Test each feature's state management in isolation
4. **Timing Analysis**: Verify timing of state updates
5. **Conflict Detection**: Identify and resolve state conflicts