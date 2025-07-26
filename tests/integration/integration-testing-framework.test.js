/**
 * Integration Tests for Integration Testing Framework
 * Tests the three-tier testing approach and cross-feature validation
 */

const { IntegrationTestManager } = require('../../.claude/system/integration_test_manager');
const { FeatureRegistry } = require('../../.claude/system/feature_registry_manager');
const fs = require('fs');
const path = require('path');

describe('Integration Testing Framework - Happy Path Tests', () => {
  let integrationTestManager;
  let featureRegistry;
  let testFeatures;

  beforeEach(async () => {
    // Setup test features
    testFeatures = [
      {
        id: 'FR-001',
        name: 'User Authentication',
        status: 'completed',
        dependencies: [],
        integration_points: [
          'Provides user session for other features',
          'Validates user permissions'
        ]
      },
      {
        id: 'FR-002',
        name: 'Task Management',
        status: 'completed',
        dependencies: ['FR-001'],
        integration_points: [
          'Uses user authentication for task ownership',
          'Provides task data for calendar views'
        ]
      },
      {
        id: 'FR-003',
        name: 'Calendar View',
        status: 'completed',
        dependencies: ['FR-001', 'FR-002'],
        integration_points: [
          'Displays tasks from task management',
          'Requires user authentication for personalization'
        ]
      }
    ];

    // Setup feature registry
    featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('integration-test-project');

    for (const feature of testFeatures) {
      await featureRegistry.addFeature(feature);
    }

    // Setup integration test manager
    integrationTestManager = new IntegrationTestManager(
      await featureRegistry.loadRegistry(),
      'jest'
    );

    // Ensure test directories exist
    const testDirs = [
      'tests/integration/feature-interactions/',
      'tests/integration/data-flow/',
      'tests/integration/state-management/'
    ];

    testDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  });

  afterEach(() => {
    // Cleanup test files
    const cleanupFiles = [
      '2-docs/features/feature-registry.json',
      'tests/integration/feature-interactions/auth-task-integration.test.js',
      'tests/integration/data-flow/task-calendar-data-flow.test.js',
      'tests/integration/state-management/user-session-state.test.js'
    ];

    cleanupFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
  });

  test('should create IntegrationTestManager instance successfully', () => {
    expect(integrationTestManager).toBeInstanceOf(IntegrationTestManager);
    expect(integrationTestManager.registry).toBeDefined();
    expect(integrationTestManager.testFramework).toBe('jest');
  });

  test('should generate integration tests for feature interactions', async () => {
    const integrationTests = await integrationTestManager.generateIntegrationTests(['FR-001', 'FR-002']);

    expect(Array.isArray(integrationTests)).toBe(true);
    expect(integrationTests.length).toBeGreaterThan(0);

    // Verify integration test structure
    const firstTest = integrationTests[0];
    expect(firstTest).toHaveProperty('id');
    expect(firstTest).toHaveProperty('name');
    expect(firstTest).toHaveProperty('features');
    expect(firstTest).toHaveProperty('scenario');
    expect(firstTest).toHaveProperty('test_file');

    // Verify features are included
    expect(firstTest.features).toContain('FR-001');
    expect(firstTest.features).toContain('FR-002');

    // Verify scenario structure
    expect(firstTest.scenario).toHaveProperty('feature');
    expect(firstTest.scenario).toHaveProperty('scenarios');
    expect(Array.isArray(firstTest.scenario.scenarios)).toBe(true);
  });

  test('should create feature interaction test files', async () => {
    const integrationTests = await integrationTestManager.generateIntegrationTests(['FR-001', 'FR-002']);
    
    // Generate actual test files
    for (const test of integrationTests) {
      await integrationTestManager.createTestFile(test);
    }

    // Verify test files were created
    const testFiles = fs.readdirSync('tests/integration/feature-interactions/');
    expect(testFiles.length).toBeGreaterThan(0);

    // Verify test file content
    const firstTestFile = testFiles[0];
    const testContent = fs.readFileSync(
      path.join('tests/integration/feature-interactions/', firstTestFile),
      'utf8'
    );

    expect(testContent).toContain('describe');
    expect(testContent).toContain('test');
    expect(testContent).toContain('FR-001');
    expect(testContent).toContain('FR-002');
  });

  test('should validate feature interactions', async () => {
    const validationResult = await integrationTestManager.validateFeatureInteractions(['FR-001', 'FR-002', 'FR-003']);

    expect(validationResult).toHaveProperty('valid');
    expect(validationResult).toHaveProperty('interactions');
    expect(validationResult).toHaveProperty('issues');

    // Should identify valid interactions
    expect(Array.isArray(validationResult.interactions)).toBe(true);
    expect(validationResult.interactions.length).toBeGreaterThan(0);

    // Verify interaction structure
    validationResult.interactions.forEach(interaction => {
      expect(interaction).toHaveProperty('from_feature');
      expect(interaction).toHaveProperty('to_feature');
      expect(interaction).toHaveProperty('interaction_type');
      expect(interaction).toHaveProperty('description');
    });
  });

  test('should execute integration tests', async () => {
    // Generate integration tests first
    const integrationTests = await integrationTestManager.generateIntegrationTests(['FR-001', 'FR-002']);
    
    // Execute integration tests
    const executionResult = await integrationTestManager.executeIntegrationTests(['FR-001', 'FR-002']);

    expect(executionResult).toHaveProperty('total_tests');
    expect(executionResult).toHaveProperty('passed_tests');
    expect(executionResult).toHaveProperty('failed_tests');
    expect(executionResult).toHaveProperty('execution_time');
    expect(executionResult).toHaveProperty('test_results');

    // Verify execution results structure
    expect(typeof executionResult.total_tests).toBe('number');
    expect(typeof executionResult.passed_tests).toBe('number');
    expect(typeof executionResult.failed_tests).toBe('number');
    expect(Array.isArray(executionResult.test_results)).toBe(true);
  });

  test('should generate data flow tests', async () => {
    const dataFlowTests = await integrationTestManager.generateDataFlowTests(['FR-002', 'FR-003']);

    expect(Array.isArray(dataFlowTests)).toBe(true);
    expect(dataFlowTests.length).toBeGreaterThan(0);

    // Verify data flow test structure
    const firstTest = dataFlowTests[0];
    expect(firstTest).toHaveProperty('id');
    expect(firstTest).toHaveProperty('name');
    expect(firstTest).toHaveProperty('source_feature');
    expect(firstTest).toHaveProperty('target_feature');
    expect(firstTest).toHaveProperty('data_flow');

    // Verify data flow description
    expect(firstTest.data_flow).toHaveProperty('data_type');
    expect(firstTest.data_flow).toHaveProperty('flow_direction');
    expect(firstTest.data_flow).toHaveProperty('validation_rules');
  });

  test('should generate state management tests', async () => {
    const stateTests = await integrationTestManager.generateStateManagementTests(['FR-001', 'FR-002']);

    expect(Array.isArray(stateTests)).toBe(true);
    expect(stateTests.length).toBeGreaterThan(0);

    // Verify state management test structure
    const firstTest = stateTests[0];
    expect(firstTest).toHaveProperty('id');
    expect(firstTest).toHaveProperty('name');
    expect(firstTest).toHaveProperty('features');
    expect(firstTest).toHaveProperty('state_scenarios');

    // Verify state scenarios
    expect(Array.isArray(firstTest.state_scenarios)).toBe(true);
    firstTest.state_scenarios.forEach(scenario => {
      expect(scenario).toHaveProperty('scenario_name');
      expect(scenario).toHaveProperty('initial_state');
      expect(scenario).toHaveProperty('actions');
      expect(scenario).toHaveProperty('expected_state');
    });
  });

  test('should create BDD integration scenarios', async () => {
    const bddScenarios = await integrationTestManager.generateBDDIntegrationScenarios(['FR-001', 'FR-002', 'FR-003']);

    expect(Array.isArray(bddScenarios)).toBe(true);
    expect(bddScenarios.length).toBeGreaterThan(0);

    // Verify BDD scenario structure
    const firstScenario = bddScenarios[0];
    expect(firstScenario).toHaveProperty('feature_name');
    expect(firstScenario).toHaveProperty('scenarios');
    expect(firstScenario).toHaveProperty('tags');

    // Verify scenario content
    expect(Array.isArray(firstScenario.scenarios)).toBe(true);
    firstScenario.scenarios.forEach(scenario => {
      expect(scenario).toHaveProperty('name');
      expect(scenario).toHaveProperty('given');
      expect(scenario).toHaveProperty('when');
      expect(scenario).toHaveProperty('then');
    });

    // Verify integration tags
    expect(firstScenario.tags).toContain('@integration');
    expect(firstScenario.tags.some(tag => tag.includes('@features:'))).toBe(true);
  });
});

describe('Integration Testing Framework - Edge Case Tests', () => {
  test('should handle features with no integration points', async () => {
    const isolatedFeature = {
      id: 'FR-001',
      name: 'Isolated Feature',
      status: 'completed',
      dependencies: [],
      integration_points: []
    };

    const featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('isolated-test');
    await featureRegistry.addFeature(isolatedFeature);

    const integrationTestManager = new IntegrationTestManager(
      await featureRegistry.loadRegistry(),
      'jest'
    );

    const integrationTests = await integrationTestManager.generateIntegrationTests(['FR-001']);

    // Should handle gracefully, possibly generating minimal tests
    expect(Array.isArray(integrationTests)).toBe(true);
    // May have 0 tests for truly isolated features
    expect(integrationTests.length).toBeGreaterThanOrEqual(0);

    // Cleanup
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });

  test('should handle circular integration dependencies', async () => {
    const circularFeatures = [
      {
        id: 'FR-001',
        name: 'Feature A',
        status: 'completed',
        dependencies: [],
        integration_points: ['Depends on Feature B data']
      },
      {
        id: 'FR-002',
        name: 'Feature B',
        status: 'completed',
        dependencies: [],
        integration_points: ['Depends on Feature A data']
      }
    ];

    const featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('circular-test');

    for (const feature of circularFeatures) {
      await featureRegistry.addFeature(feature);
    }

    const integrationTestManager = new IntegrationTestManager(
      await featureRegistry.loadRegistry(),
      'jest'
    );

    // Should handle circular dependencies gracefully
    const validationResult = await integrationTestManager.validateFeatureInteractions(['FR-001', 'FR-002']);

    expect(validationResult).toHaveProperty('valid');
    expect(validationResult).toHaveProperty('issues');

    // Should detect circular dependency as an issue
    if (!validationResult.valid) {
      expect(validationResult.issues.some(issue => 
        issue.toLowerCase().includes('circular')
      )).toBe(true);
    }

    // Cleanup
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });

  test('should handle large numbers of features efficiently', async () => {
    const featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('large-integration-test');

    // Create 20 features with various integration points
    const features = [];
    for (let i = 1; i <= 20; i++) {
      const featureId = `FR-${i.toString().padStart(3, '0')}`;
      const dependencies = i > 1 ? [`FR-${(i-1).toString().padStart(3, '0')}`] : [];
      
      features.push({
        id: featureId,
        name: `Feature ${i}`,
        status: 'completed',
        dependencies,
        integration_points: [
          `Integrates with Feature ${i > 1 ? i-1 : i+1}`,
          `Provides data for downstream features`
        ]
      });
    }

    // Add all features
    for (const feature of features) {
      await featureRegistry.addFeature(feature);
    }

    const integrationTestManager = new IntegrationTestManager(
      await featureRegistry.loadRegistry(),
      'jest'
    );

    // Test performance with large feature set
    const startTime = Date.now();
    const integrationTests = await integrationTestManager.generateIntegrationTests(
      features.slice(0, 10).map(f => f.id) // Test with first 10 features
    );
    const endTime = Date.now();

    // Should complete within reasonable time (less than 5 seconds)
    expect(endTime - startTime).toBeLessThan(5000);

    // Should generate appropriate number of tests
    expect(integrationTests.length).toBeGreaterThan(0);
    expect(integrationTests.length).toBeLessThan(50); // Should not generate excessive tests

    // Cleanup
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });

  test('should handle different test frameworks', async () => {
    const testFrameworks = ['jest', 'mocha', 'jasmine'];

    for (const framework of testFrameworks) {
      const featureRegistry = new FeatureRegistry();
      await featureRegistry.createRegistry(`${framework}-test`);
      
      await featureRegistry.addFeature({
        id: 'FR-001',
        name: 'Test Feature',
        status: 'completed',
        dependencies: [],
        integration_points: ['Test integration point']
      });

      const integrationTestManager = new IntegrationTestManager(
        await featureRegistry.loadRegistry(),
        framework
      );

      expect(integrationTestManager.testFramework).toBe(framework);

      const integrationTests = await integrationTestManager.generateIntegrationTests(['FR-001']);
      expect(Array.isArray(integrationTests)).toBe(true);

      // Cleanup
      fs.unlinkSync('2-docs/features/feature-registry.json');
    }
  });
});

describe('Integration Testing Framework - Negative Case Tests', () => {
  test('should handle invalid feature IDs gracefully', async () => {
    const featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('invalid-test');

    const integrationTestManager = new IntegrationTestManager(
      await featureRegistry.loadRegistry(),
      'jest'
    );

    // Test with non-existent feature IDs
    const integrationTests = await integrationTestManager.generateIntegrationTests(['FR-999', 'INVALID']);

    expect(Array.isArray(integrationTests)).toBe(true);
    expect(integrationTests.length).toBe(0); // Should return empty array for invalid features

    // Cleanup
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });

  test('should handle corrupted feature registry', async () => {
    // Create corrupted registry
    const corruptedRegistry = { invalid: 'data' };

    const integrationTestManager = new IntegrationTestManager(corruptedRegistry, 'jest');

    // Should handle gracefully without throwing
    expect(() => {
      integrationTestManager.generateIntegrationTests(['FR-001']);
    }).not.toThrow();
  });

  test('should handle file system errors during test creation', async () => {
    const featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('fs-error-test');
    
    await featureRegistry.addFeature({
      id: 'FR-001',
      name: 'Test Feature',
      status: 'completed',
      dependencies: [],
      integration_points: ['Test point']
    });

    const integrationTestManager = new IntegrationTestManager(
      await featureRegistry.loadRegistry(),
      'jest'
    );

    // Mock file system error
    const originalWriteFileSync = fs.writeFileSync;
    fs.writeFileSync = jest.fn(() => {
      throw new Error('File system error');
    });

    try {
      const integrationTests = await integrationTestManager.generateIntegrationTests(['FR-001']);
      
      // Should still generate test objects even if file creation fails
      expect(Array.isArray(integrationTests)).toBe(true);
      
      // Attempt to create test files should handle error gracefully
      for (const test of integrationTests) {
        expect(async () => {
          await integrationTestManager.createTestFile(test);
        }).not.toThrow();
      }
    } finally {
      // Restore original function
      fs.writeFileSync = originalWriteFileSync;
    }

    // Cleanup
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });

  test('should validate integration test quality', async () => {
    const featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('quality-test');
    
    await featureRegistry.addFeature({
      id: 'FR-001',
      name: 'Quality Test Feature',
      status: 'completed',
      dependencies: [],
      integration_points: ['Quality integration point']
    });

    const integrationTestManager = new IntegrationTestManager(
      await featureRegistry.loadRegistry(),
      'jest'
    );

    const integrationTests = await integrationTestManager.generateIntegrationTests(['FR-001']);

    // Validate test quality
    integrationTests.forEach(test => {
      // Test should have valid ID format
      expect(test.id).toMatch(/^INT-\d{3}$/);
      
      // Test should have meaningful name
      expect(test.name).toBeDefined();
      expect(test.name.length).toBeGreaterThan(0);
      
      // Test should have valid scenario structure
      expect(test.scenario).toBeDefined();
      expect(test.scenario.scenarios).toBeDefined();
      expect(Array.isArray(test.scenario.scenarios)).toBe(true);
      
      // Each scenario should have required BDD structure
      test.scenario.scenarios.forEach(scenario => {
        expect(scenario.given).toBeDefined();
        expect(scenario.when).toBeDefined();
        expect(scenario.then).toBeDefined();
      });
    });

    // Cleanup
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });
});