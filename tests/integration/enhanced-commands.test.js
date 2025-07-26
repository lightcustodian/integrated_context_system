/**
 * Integration Tests for Enhanced Command Functionality
 * Tests the integration between commands and feature decomposition system
 */

const fs = require('fs');
const path = require('path');
const { FeatureRequestGenerator } = require('../../.claude/system/feature_request_generator');
const { DependencyManager } = require('../../.claude/system/dependency_manager');
const { FeatureRegistry } = require('../../.claude/system/feature_registry_manager');
const { IntegrationTestManager } = require('../../.claude/system/integration_test_manager');

describe('Enhanced Commands Integration - Happy Path Tests', () => {
  let testProjectDir;
  let featureRegistry;

  beforeEach(async () => {
    // Setup test project structure
    testProjectDir = 'test-project-integration';
    
    // Create test directories
    const testDirs = [
      '2-docs/features/',
      '2-docs/PRPs/active/',
      '.claude/state/',
      'tests/integration/'
    ];

    testDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Initialize feature registry
    featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry(testProjectDir);
  });

  afterEach(() => {
    // Cleanup test files
    const cleanupPaths = [
      '2-docs/features/feature-registry.json',
      '2-docs/features/FR-001-test-feature.md',
      '.claude/state/current-session.json',
      'MIGRATION_GUIDE.md'
    ];

    cleanupPaths.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  });

  test('should integrate /create-prp with feature decomposition', async () => {
    // Mock planning context for create-prp
    const planningContext = {
      project_analysis: {
        project_name: 'Integration Test Project',
        project_description: 'Testing feature decomposition integration',
        complexity_level: 'medium'
      },
      architecture_vision: {
        user_journeys: [
          'User can create items',
          'User can view items',
          'User can manage items'
        ]
      }
    };

    const techStack = {
      frontend: 'React',
      backend: 'Node.js'
    };

    // Test feature generation
    const generator = new FeatureRequestGenerator(planningContext, techStack);
    const decompositionResult = await generator.decomposeProject();

    expect(decompositionResult).toHaveProperty('features');
    expect(decompositionResult).toHaveProperty('registry');
    expect(decompositionResult.features.length).toBeGreaterThan(0);

    // Verify feature registry creation
    expect(decompositionResult.registry).toHaveProperty('features');
    expect(decompositionResult.registry).toHaveProperty('dependency_graph');
    expect(decompositionResult.registry).toHaveProperty('execution_order');

    // Test that features have proper structure for /execute-prp
    decompositionResult.features.forEach(feature => {
      expect(feature).toHaveProperty('id');
      expect(feature).toHaveProperty('name');
      expect(feature).toHaveProperty('user_story');
      expect(feature).toHaveProperty('test_groups');
      expect(feature.id).toMatch(/^FR-\d{3}$/);
    });
  });

  test('should integrate /execute-prp with dependency management', async () => {
    // Setup test features with dependencies
    const testFeatures = [
      {
        id: 'FR-001',
        name: 'Base Feature',
        status: 'completed',
        dependencies: [],
        test_groups: {
          happy_path: ['base_feature_success'],
          edge_case: ['base_feature_edge'],
          negative_case: ['base_feature_error']
        }
      },
      {
        id: 'FR-002',
        name: 'Dependent Feature',
        status: 'planned',
        dependencies: ['FR-001'],
        test_groups: {
          happy_path: ['dependent_feature_success'],
          edge_case: ['dependent_feature_edge'],
          negative_case: ['dependent_feature_error']
        }
      }
    ];

    // Add features to registry
    for (const feature of testFeatures) {
      await featureRegistry.addFeature(feature);
    }

    // Test dependency management integration
    const dependencyManager = new DependencyManager(await featureRegistry.loadRegistry());
    
    // Test single feature execution
    const singleFeatureOrder = dependencyManager.getExecutionOrder(['FR-002']);
    expect(singleFeatureOrder).toContain('FR-001'); // Should include dependency
    expect(singleFeatureOrder).toContain('FR-002');
    expect(singleFeatureOrder.indexOf('FR-001')).toBeLessThan(singleFeatureOrder.indexOf('FR-002'));

    // Test dependency validation
    const validationResult = dependencyManager.validateDependencies(['FR-002']);
    expect(validationResult.valid).toBe(true); // FR-001 is completed

    // Test auto-dependency resolution
    const resolvedDeps = dependencyManager.resolveDependencies('FR-002', true);
    expect(resolvedDeps).toEqual(['FR-001', 'FR-002']);
  });

  test('should integrate /validate with feature-specific validation', async () => {
    // Setup test features
    const testFeature = {
      id: 'FR-001',
      name: 'Validation Test Feature',
      status: 'testing',
      dependencies: [],
      validation_gates: [
        'Unit tests pass',
        'Integration tests pass',
        'Code review complete'
      ],
      test_groups: {
        happy_path: ['validation_success'],
        edge_case: ['validation_edge'],
        negative_case: ['validation_error']
      }
    };

    await featureRegistry.addFeature(testFeature);

    // Test feature-specific validation
    const registry = await featureRegistry.loadRegistry();
    const feature = registry.features.find(f => f.id === 'FR-001');
    
    expect(feature).toBeDefined();
    expect(feature.validation_gates).toBeDefined();
    expect(Array.isArray(feature.validation_gates)).toBe(true);
    expect(feature.test_groups).toBeDefined();
    expect(feature.test_groups.happy_path).toBeDefined();
    expect(feature.test_groups.edge_case).toBeDefined();
    expect(feature.test_groups.negative_case).toBeDefined();

    // Test validation gate structure
    expect(feature.validation_gates.length).toBeGreaterThan(0);
    feature.validation_gates.forEach(gate => {
      expect(typeof gate).toBe('string');
      expect(gate.length).toBeGreaterThan(0);
    });
  });

  test('should integrate commands with state management', async () => {
    // Test state management integration
    const testFeature = {
      id: 'FR-001',
      name: 'State Management Test',
      status: 'in-progress',
      completion_percentage: 50,
      confidence_score: 0.8,
      dependencies: []
    };

    await featureRegistry.addFeature(testFeature);

    // Verify state is tracked in registry
    const registry = await featureRegistry.loadRegistry();
    expect(registry.overall_progress).toBeDefined();
    expect(registry.overall_progress.total_features).toBe(1);
    expect(registry.overall_progress.completion_percentage).toBeGreaterThan(0);

    // Test feature status updates
    await featureRegistry.updateFeatureStatus('FR-001', 'completed', 100);
    
    const updatedRegistry = await featureRegistry.loadRegistry();
    const updatedFeature = updatedRegistry.features.find(f => f.id === 'FR-001');
    expect(updatedFeature.status).toBe('completed');
    expect(updatedFeature.completion_percentage).toBe(100);
  });

  test('should integrate with integration testing framework', async () => {
    // Setup features for integration testing
    const features = [
      {
        id: 'FR-001',
        name: 'Feature A',
        status: 'completed',
        dependencies: []
      },
      {
        id: 'FR-002',
        name: 'Feature B',
        status: 'completed',
        dependencies: ['FR-001']
      }
    ];

    for (const feature of features) {
      await featureRegistry.addFeature(feature);
    }

    // Test integration test manager
    const integrationTestManager = new IntegrationTestManager(
      await featureRegistry.loadRegistry(),
      'jest'
    );

    // Test integration test generation
    const integrationTests = await integrationTestManager.generateIntegrationTests(['FR-001', 'FR-002']);
    
    expect(Array.isArray(integrationTests)).toBe(true);
    expect(integrationTests.length).toBeGreaterThan(0);

    // Verify integration test structure
    integrationTests.forEach(test => {
      expect(test).toHaveProperty('id');
      expect(test).toHaveProperty('name');
      expect(test).toHaveProperty('features');
      expect(test).toHaveProperty('scenario');
      expect(Array.isArray(test.features)).toBe(true);
    });

    // Test feature interaction validation
    const interactionValidation = await integrationTestManager.validateFeatureInteractions(['FR-001', 'FR-002']);
    expect(interactionValidation).toHaveProperty('valid');
    expect(interactionValidation).toHaveProperty('interactions');
  });
});

describe('Enhanced Commands Integration - Edge Case Tests', () => {
  test('should handle mixed legacy and feature decomposition modes', async () => {
    // Create legacy PRP structure
    const legacyPRPDir = '2-docs/PRPs/active/';
    if (!fs.existsSync(legacyPRPDir)) {
      fs.mkdirSync(legacyPRPDir, { recursive: true });
    }

    const legacyPRP = `# Legacy PRP
## User Story
As a user, I want legacy compatibility

## Implementation
- Legacy implementation steps
`;

    fs.writeFileSync(path.join(legacyPRPDir, 'legacy-prp.md'), legacyPRP);

    // Also create feature decomposition structure
    const featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('mixed-mode-project');
    
    await featureRegistry.addFeature({
      id: 'FR-001',
      name: 'New Feature',
      status: 'planned',
      dependencies: []
    });

    // Verify both structures coexist
    expect(fs.existsSync(path.join(legacyPRPDir, 'legacy-prp.md'))).toBe(true);
    expect(fs.existsSync('2-docs/features/feature-registry.json')).toBe(true);

    const registry = await featureRegistry.loadRegistry();
    expect(registry.features.length).toBe(1);

    // Cleanup
    fs.unlinkSync(path.join(legacyPRPDir, 'legacy-prp.md'));
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });

  test('should handle large numbers of features efficiently', async () => {
    const featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('large-project');

    // Create 50 features to test scalability
    const features = [];
    for (let i = 1; i <= 50; i++) {
      const featureId = `FR-${i.toString().padStart(3, '0')}`;
      const dependencies = i > 1 ? [`FR-${(i-1).toString().padStart(3, '0')}`] : [];
      
      features.push({
        id: featureId,
        name: `Feature ${i}`,
        status: 'planned',
        dependencies
      });
    }

    // Add all features
    const startTime = Date.now();
    for (const feature of features) {
      await featureRegistry.addFeature(feature);
    }
    const endTime = Date.now();

    // Should complete within reasonable time (less than 5 seconds)
    expect(endTime - startTime).toBeLessThan(5000);

    // Verify all features were added
    const registry = await featureRegistry.loadRegistry();
    expect(registry.features.length).toBe(50);

    // Test dependency management with large dataset
    const dependencyManager = new DependencyManager(registry);
    const executionOrder = dependencyManager.getExecutionOrder(features.map(f => f.id));
    
    expect(executionOrder.length).toBe(50);
    expect(executionOrder[0]).toBe('FR-001'); // First feature should have no dependencies
    expect(executionOrder[49]).toBe('FR-050'); // Last feature should be at the end

    // Cleanup
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });

  test('should handle command parameter combinations', async () => {
    const featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('param-test-project');

    // Setup test features
    const features = [
      { id: 'FR-001', name: 'Base', status: 'completed', dependencies: [] },
      { id: 'FR-002', name: 'Level 1', status: 'completed', dependencies: ['FR-001'] },
      { id: 'FR-003', name: 'Level 2', status: 'planned', dependencies: ['FR-002'] }
    ];

    for (const feature of features) {
      await featureRegistry.addFeature(feature);
    }

    const dependencyManager = new DependencyManager(await featureRegistry.loadRegistry());

    // Test --feature=FR-001,FR-003 (specific features)
    const specificFeatures = dependencyManager.getExecutionOrder(['FR-001', 'FR-003']);
    expect(specificFeatures).toContain('FR-001');
    expect(specificFeatures).toContain('FR-002'); // Should include dependency
    expect(specificFeatures).toContain('FR-003');

    // Test --auto-deps behavior
    const autoDeps = dependencyManager.resolveDependencies('FR-003', true);
    expect(autoDeps).toEqual(['FR-001', 'FR-002', 'FR-003']);

    // Test --force behavior (bypass dependency checks)
    const forceExecution = dependencyManager.getExecutionOrder(['FR-003'], { force: true });
    expect(forceExecution).toContain('FR-003');

    // Cleanup
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });
});

describe('Enhanced Commands Integration - Negative Case Tests', () => {
  test('should handle corrupted feature registry gracefully', async () => {
    // Create corrupted registry file
    const corruptedRegistry = '{ invalid json content }';
    fs.writeFileSync('2-docs/features/feature-registry.json', corruptedRegistry);

    const featureRegistry = new FeatureRegistry();
    
    // Should handle corrupted file gracefully
    const registry = await featureRegistry.loadRegistry();
    expect(registry).toBeDefined();
    expect(registry.features).toBeDefined();

    // Cleanup
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });

  test('should handle missing dependency features', async () => {
    const featureRegistry = new FeatureRegistry();
    await featureRegistry.createRegistry('missing-deps-project');

    // Create feature with non-existent dependency
    const featureWithMissingDep = {
      id: 'FR-001',
      name: 'Feature with Missing Dependency',
      status: 'planned',
      dependencies: ['FR-999'] // Non-existent feature
    };

    await featureRegistry.addFeature(featureWithMissingDep);

    const dependencyManager = new DependencyManager(await featureRegistry.loadRegistry());
    
    // Should detect missing dependency
    const validationResult = dependencyManager.validateDependencies(['FR-001']);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.missing_dependencies).toContain('FR-999');

    // Cleanup
    fs.unlinkSync('2-docs/features/feature-registry.json');
  });

  test('should handle file system permission errors', async () => {
    const featureRegistry = new FeatureRegistry();
    
    // Mock file system error
    const originalWriteFileSync = fs.writeFileSync;
    fs.writeFileSync = jest.fn(() => {
      throw new Error('Permission denied');
    });

    try {
      // Should handle file system errors gracefully
      const result = await featureRegistry.createRegistry('permission-test');
      expect(result).toBe(false); // Should return false on error
    } finally {
      // Restore original function
      fs.writeFileSync = originalWriteFileSync;
    }
  });

  test('should validate command parameter formats', () => {
    const featureRegistry = new FeatureRegistry();
    const dependencyManager = new DependencyManager({
      features: [],
      dependency_graph: {}
    });

    // Test invalid feature ID formats
    const invalidFeatureIds = ['invalid', 'FR-', 'FR-ABC', '001'];
    
    invalidFeatureIds.forEach(invalidId => {
      const validationResult = dependencyManager.validateDependencies([invalidId]);
      expect(validationResult.valid).toBe(false);
    });

    // Test valid feature ID formats
    const validFeatureIds = ['FR-001', 'FR-999'];
    
    validFeatureIds.forEach(validId => {
      // Should not throw error for valid format (even if feature doesn't exist)
      expect(() => {
        dependencyManager.validateDependencies([validId]);
      }).not.toThrow();
    });
  });
});