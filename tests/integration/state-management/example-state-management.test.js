/**
 * Example State Management Integration Test
 * Features: FR-001, FR-002, FR-003
 * Type: state_management
 * 
 * This is an example state management test demonstrating state consistency across features
 */

const { setupIntegrationTest, teardownIntegrationTest } = require('../setup');

describe('Example State Management Integration', () => {
  let testContext;

  beforeAll(async () => {
    testContext = await setupIntegrationTest({
      features: ['FR-001', 'FR-002', 'FR-003'],
      testType: 'state_management',
      testName: 'Example State Management Integration'
    });
  });

  afterAll(async () => {
    await teardownIntegrationTest(testContext);
  });

  beforeEach(async () => {
    await testContext.resetState();
    await testContext.clearAllStates();
  });

  afterEach(async () => {
    await testContext.cleanupTestData();
  });

  test('should maintain state consistency across features', async () => {
    // Arrange
    const initialSharedState = {
      currentUser: 'test-user',
      sessionId: 'session-123',
      preferences: { theme: 'dark' },
      version: 1
    };

    await testContext.initializeSharedState(initialSharedState);

    // Act - Update state from different features
    await testContext.setupFeature('FR-001', {
      state: { ...initialSharedState, lastAction: 'FR-001-action' }
    });

    await testContext.setupFeature('FR-002', {
      state: { ...initialSharedState, lastAction: 'FR-002-action' }
    });

    // Assert
    const fr001State = await testContext.getStateFromFeature('FR-001');
    const fr002State = await testContext.getStateFromFeature('FR-002');

    // Verify shared state consistency
    expect(fr001State.currentUser).toBe(fr002State.currentUser);
    expect(fr001State.sessionId).toBe(fr002State.sessionId);
    
    // Verify feature-specific state isolation
    expect(fr001State.lastAction).not.toBe(fr002State.lastAction);
  });

  test('should handle state isolation between features', async () => {
    // Arrange
    const fr001PrivateState = {
      privateData: 'FR-001-private',
      internalCounter: 42
    };

    const fr002PrivateState = {
      privateData: 'FR-002-private',
      internalCounter: 24
    };

    // Act
    await testContext.setupFeature('FR-001', { state: fr001PrivateState });
    await testContext.setupFeature('FR-002', { state: fr002PrivateState });

    // Assert
    const fr001State = await testContext.getStateFromFeature('FR-001');
    const fr002State = await testContext.getStateFromFeature('FR-002');

    // Verify state isolation
    expect(fr001State.privateData).toBe('FR-001-private');
    expect(fr002State.privateData).toBe('FR-002-private');
    expect(fr001State.internalCounter).not.toBe(fr002State.internalCounter);
  });

  test('should synchronize state changes across features', async () => {
    // Arrange
    const synchronizedState = {
      sharedCounter: 0,
      lastModified: new Date().toISOString(),
      modifiedBy: null
    };

    await testContext.initializeSharedState(synchronizedState);

    // Act - Simulate concurrent state updates
    await testContext.setupFeature('FR-001', {
      state: {
        ...synchronizedState,
        sharedCounter: 1,
        modifiedBy: 'FR-001'
      }
    });

    await testContext.setupFeature('FR-002', {
      state: {
        ...synchronizedState,
        sharedCounter: 2,
        modifiedBy: 'FR-002'
      }
    });

    // Assert
    const consistencyResult = await testContext.verifyStateConsistency(['FR-001', 'FR-002']);
    expect(consistencyResult.consistent).toBe(true);

    // Verify final state reflects latest update
    const fr001FinalState = await testContext.getStateFromFeature('FR-001');
    const fr002FinalState = await testContext.getStateFromFeature('FR-002');

    global.testUtils.expectStateConsistency([fr001FinalState, fr002FinalState]);
  });

  test('should handle state conflicts and resolution', async () => {
    // Arrange
    const conflictingState = {
      conflictField: 'initial-value',
      version: 1,
      lastModified: new Date().toISOString()
    };

    await testContext.initializeSharedState(conflictingState);

    // Act - Create conflicting updates
    const fr001Update = {
      ...conflictingState,
      conflictField: 'FR-001-value',
      version: 2,
      updatedBy: 'FR-001'
    };

    const fr002Update = {
      ...conflictingState,
      conflictField: 'FR-002-value',
      version: 2,
      updatedBy: 'FR-002'
    };

    await testContext.setupFeature('FR-001', { state: fr001Update });
    await testContext.setupFeature('FR-002', { state: fr002Update });

    // Assert
    const consistencyResult = await testContext.verifyStateConsistency(['FR-001', 'FR-002']);
    
    // Verify conflict was detected and resolved
    expect(consistencyResult.consistent).toBe(true);
    
    // Verify final state has conflict resolution metadata
    const finalState = await testContext.getStateFromFeature('FR-001');
    expect(finalState.version).toBeGreaterThan(2);
  });

  test('should maintain performance with frequent state updates', async () => {
    // Arrange
    const baseState = {
      counter: 0,
      updateHistory: []
    };

    await testContext.initializeSharedState(baseState);

    // Act - Perform many rapid state updates
    const updateCount = 100;
    const startTime = Date.now();

    for (let i = 0; i < updateCount; i++) {
      await testContext.setupFeature('FR-001', {
        state: {
          ...baseState,
          counter: i,
          updateHistory: [...baseState.updateHistory, `update-${i}`]
        }
      });
    }

    const executionTime = Date.now() - startTime;

    // Assert
    expect(executionTime).toBeLessThan(10000); // Should complete within 10 seconds

    const finalState = await testContext.getStateFromFeature('FR-001');
    expect(finalState.counter).toBe(updateCount - 1);
    expect(finalState.updateHistory).toHaveLength(updateCount);
  });
});