/**
 * Example Feature Integration Test
 * Features: FR-001, FR-002
 * Type: feature_interaction
 * 
 * This is an example integration test demonstrating how features interact
 */

const { setupIntegrationTest, teardownIntegrationTest } = require('../setup');

describe('Example Feature Integration', () => {
  let testContext;

  beforeAll(async () => {
    testContext = await setupIntegrationTest({
      features: ['FR-001', 'FR-002'],
      testType: 'feature_interaction',
      testName: 'Example Feature Integration'
    });
  });

  afterAll(async () => {
    await teardownIntegrationTest(testContext);
  });

  beforeEach(async () => {
    await testContext.resetState();
  });

  afterEach(async () => {
    await testContext.cleanupTestData();
  });

  test('should integrate FR-001 with FR-002 successfully', async () => {
    // Arrange
    await testContext.setupFeature('FR-001', {
      status: 'ready',
      data: { test: 'data' }
    });
    
    await testContext.setupFeature('FR-002', {
      status: 'ready',
      dependencies: ['FR-001']
    });

    // Act
    const integrationResult = await testContext.executeIntegration('FR-002', ['FR-001']);

    // Assert
    expect(integrationResult.success).toBe(true);
    expect(integrationResult.features).toContain('FR-001');
    expect(integrationResult.features).toContain('FR-002');
    
    global.testUtils.expectFeatureIntegration('FR-001', 'FR-002', integrationResult);
  });

  test('should handle FR-001 failure gracefully in FR-002', async () => {
    // Arrange
    await testContext.setupFeature('FR-002', {
      status: 'ready',
      dependencies: ['FR-001']
    });

    // Simulate FR-001 failure
    await testContext.simulateFeatureFailure('FR-001', {
      error: 'Simulated dependency failure'
    });

    // Act
    const result = await testContext.executeWithFailure('FR-002');

    // Assert
    expect(result.gracefulDegradation).toBe(true);
    expect(result.error).toContain('gracefully');
  });

  test('should maintain feature boundaries during interaction', async () => {
    // Arrange
    await testContext.setupFeature('FR-001', {
      privateData: 'should not be accessible'
    });
    
    await testContext.setupFeature('FR-002', {
      privateData: 'different private data'
    });

    // Act
    const fr001State = await testContext.getStateFromFeature('FR-001');
    const fr002State = await testContext.getStateFromFeature('FR-002');

    // Assert
    expect(fr001State).not.toEqual(fr002State);
    expect(fr001State.privateData).not.toEqual(fr002State.privateData);
  });
});