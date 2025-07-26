/**
 * Example Data Flow Integration Test
 * Features: FR-001, FR-003
 * Type: data_flow
 * 
 * This is an example data flow test demonstrating data consistency between features
 */

const { setupIntegrationTest, teardownIntegrationTest } = require('../setup');

describe('Example Data Flow Integration', () => {
  let testContext;

  beforeAll(async () => {
    testContext = await setupIntegrationTest({
      features: ['FR-001', 'FR-003'],
      testType: 'data_flow',
      testName: 'Example Data Flow Integration'
    });
  });

  afterAll(async () => {
    await teardownIntegrationTest(testContext);
  });

  beforeEach(async () => {
    await testContext.resetState();
    await testContext.clearDataStores();
  });

  afterEach(async () => {
    await testContext.cleanupTestData();
  });

  test('should flow data from FR-001 to FR-003 correctly', async () => {
    // Arrange
    const sourceData = {
      id: 'test-001',
      name: 'Test Data',
      value: 42,
      timestamp: new Date().toISOString()
    };

    await testContext.setupFeature('FR-001', { data: sourceData });

    // Act
    const dataFlowResult = await testContext.executeDataFlow({
      from: 'FR-001',
      to: 'FR-003',
      operation: 'transfer',
      transformations: []
    });

    // Assert
    expect(dataFlowResult.success).toBe(true);
    expect(dataFlowResult.recordsProcessed).toBe(1);
    expect(dataFlowResult.errors).toHaveLength(0);
    
    // Verify data integrity
    const targetFeature = await testContext.setupFeature('FR-003');
    global.testUtils.expectDataFlow(sourceData, targetFeature.data);
  });

  test('should maintain data integrity during flow', async () => {
    // Arrange
    const criticalData = {
      id: 'critical-001',
      checksum: 'abc123',
      version: '1.0.0',
      sensitiveInfo: 'protected'
    };

    await testContext.setupFeature('FR-001', { data: criticalData });

    // Act
    const dataFlowResult = await testContext.executeDataFlow({
      from: 'FR-001',
      to: 'FR-003',
      operation: 'secure_transfer',
      integrityChecks: ['checksum', 'version']
    });

    // Assert
    expect(dataFlowResult.success).toBe(true);
    
    // Verify data wasn't corrupted
    const targetFeature = await testContext.setupFeature('FR-003');
    expect(targetFeature.data.checksum).toBe(criticalData.checksum);
    expect(targetFeature.data.version).toBe(criticalData.version);
  });

  test('should handle data transformation correctly', async () => {
    // Arrange
    const rawData = {
      user_name: 'john_doe',
      user_email: 'john@example.com',
      creation_date: '2025-01-17'
    };

    const transformationRules = [
      { type: 'rename', source: 'user_name', target: 'name' },
      { type: 'rename', source: 'user_email', target: 'email' },
      { type: 'rename', source: 'creation_date', target: 'created' }
    ];

    await testContext.setupFeature('FR-001', { data: rawData });

    // Act
    const dataFlowResult = await testContext.executeDataFlow({
      from: 'FR-001',
      to: 'FR-003',
      operation: 'transform',
      transformationRules
    });

    // Assert
    expect(dataFlowResult.success).toBe(true);
    
    // Verify transformations were applied
    const expectedData = {
      name: 'john_doe',
      email: 'john@example.com',
      created: '2025-01-17'
    };
    
    const targetFeature = await testContext.setupFeature('FR-003');
    global.testUtils.expectDataFlow(rawData, targetFeature.data, transformationRules);
  });

  test('should handle large data volumes efficiently', async () => {
    // Arrange
    const largeDataSet = Array.from({ length: 1000 }, (_, index) => ({
      id: index,
      data: `record_${index}`,
      timestamp: new Date().toISOString()
    }));

    await testContext.setupFeature('FR-001', { data: largeDataSet });

    // Act
    const startTime = Date.now();
    const dataFlowResult = await testContext.executeDataFlow({
      from: 'FR-001',
      to: 'FR-003',
      operation: 'bulk_transfer',
      batchSize: 100
    });
    const executionTime = Date.now() - startTime;

    // Assert
    expect(dataFlowResult.success).toBe(true);
    expect(executionTime).toBeLessThan(5000); // Should complete within 5 seconds
    
    const targetFeature = await testContext.setupFeature('FR-003');
    expect(Array.isArray(targetFeature.data)).toBe(true);
  });
});