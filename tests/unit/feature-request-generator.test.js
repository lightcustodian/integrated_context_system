/**
 * Unit Tests for FeatureRequestGenerator
 * Tests the core feature decomposition functionality
 */

const { FeatureRequestGenerator } = require('../../.claude/system/feature_request_generator');
const fs = require('fs');
const path = require('path');

describe('FeatureRequestGenerator - Happy Path Tests', () => {
  let generator;
  let mockPlanningContext;
  let mockTechStack;

  beforeEach(() => {
    // Setup mock planning context
    mockPlanningContext = {
      project_analysis: {
        project_name: 'Test Project',
        project_description: 'A test project for feature decomposition',
        complexity_level: 'medium'
      },
      architecture_vision: {
        user_journeys: [
          'User can create tasks',
          'User can view tasks',
          'User can organize tasks'
        ]
      },
      technical_research: {
        tech_stack: 'JavaScript/React',
        complexity_indicators: ['CRUD operations', 'State management', 'UI components']
      }
    };

    mockTechStack = {
      frontend: 'React',
      backend: 'Node.js',
      database: 'LocalStorage'
    };

    generator = new FeatureRequestGenerator(mockPlanningContext, mockTechStack);
  });

  afterEach(() => {
    // Cleanup any test files
    const testFiles = [
      '2-docs/features/feature-registry.json',
      '2-docs/features/FR-001-test-feature.md'
    ];

    testFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
  });

  test('should create FeatureRequestGenerator instance successfully', () => {
    expect(generator).toBeInstanceOf(FeatureRequestGenerator);
    expect(generator.planningContext).toEqual(mockPlanningContext);
    expect(generator.techStack).toEqual(mockTechStack);
  });

  test('should extract features from planning context', async () => {
    const features = await generator.extractFeatures();
    
    expect(Array.isArray(features)).toBe(true);
    expect(features.length).toBeGreaterThan(0);
    
    // Check feature structure
    const firstFeature = features[0];
    expect(firstFeature).toHaveProperty('id');
    expect(firstFeature).toHaveProperty('name');
    expect(firstFeature).toHaveProperty('userStory');
    expect(firstFeature).toHaveProperty('acceptanceCriteria');
    expect(firstFeature.id).toMatch(/^FR-\d{3}$/);
  });

  test('should map dependencies between features correctly', async () => {
    const features = [
      { id: 'FR-001', name: 'Basic CRUD', dependencies: [] },
      { id: 'FR-002', name: 'Advanced Features', dependencies: ['FR-001'] },
      { id: 'FR-003', name: 'UI Components', dependencies: ['FR-001', 'FR-002'] }
    ];

    const dependencies = generator.mapDependencies(features);
    
    expect(dependencies).toHaveProperty('FR-001');
    expect(dependencies).toHaveProperty('FR-002');
    expect(dependencies).toHaveProperty('FR-003');
    
    expect(dependencies['FR-001']).toEqual([]);
    expect(dependencies['FR-002']).toEqual(['FR-001']);
    expect(dependencies['FR-003']).toEqual(['FR-001', 'FR-002']);
  });

  test('should generate feature requests with complete metadata', async () => {
    const mockFeatures = [
      {
        id: 'FR-001',
        name: 'Test Feature',
        userStory: 'As a user, I want to test features',
        acceptanceCriteria: ['Feature should work', 'Feature should be tested']
      }
    ];

    const mockDependencies = { 'FR-001': [] };
    
    const featureRequests = await generator.generateFeatureRequests(mockFeatures, mockDependencies);
    
    expect(Array.isArray(featureRequests)).toBe(true);
    expect(featureRequests.length).toBe(1);
    
    const featureRequest = featureRequests[0];
    expect(featureRequest).toHaveProperty('id', 'FR-001');
    expect(featureRequest).toHaveProperty('name', 'Test Feature');
    expect(featureRequest).toHaveProperty('userStory');
    expect(featureRequest).toHaveProperty('acceptanceCriteria');
    expect(featureRequest).toHaveProperty('dependencies');
    expect(featureRequest).toHaveProperty('testGroups');
  });

  test('should create feature registry with correct structure', async () => {
    const mockFeatureRequests = [
      {
        id: 'FR-001',
        name: 'Test Feature',
        dependencies: [],
        status: 'planned'
      }
    ];

    const registry = generator.createRegistry(mockFeatureRequests);
    
    expect(registry).toHaveProperty('version');
    expect(registry).toHaveProperty('project_id');
    expect(registry).toHaveProperty('features');
    expect(registry).toHaveProperty('dependency_graph');
    expect(registry).toHaveProperty('execution_order');
    expect(registry).toHaveProperty('overall_progress');
    
    expect(Array.isArray(registry.features)).toBe(true);
    expect(registry.features.length).toBe(1);
    expect(registry.features[0].id).toBe('FR-001');
  });

  test('should decompose project end-to-end successfully', async () => {
    const result = await generator.decomposeProject();
    
    expect(result).toHaveProperty('features');
    expect(result).toHaveProperty('registry');
    
    expect(Array.isArray(result.features)).toBe(true);
    expect(result.features.length).toBeGreaterThan(0);
    
    expect(result.registry).toHaveProperty('features');
    expect(result.registry).toHaveProperty('dependency_graph');
    expect(result.registry.features.length).toBe(result.features.length);
  });
});

describe('FeatureRequestGenerator - Edge Case Tests', () => {
  test('should handle empty planning context gracefully', async () => {
    const generator = new FeatureRequestGenerator({}, {});
    
    const features = await generator.extractFeatures();
    
    expect(Array.isArray(features)).toBe(true);
    // Should create at least one default feature
    expect(features.length).toBeGreaterThanOrEqual(1);
  });

  test('should handle missing architecture vision', async () => {
    const limitedContext = {
      project_analysis: {
        project_name: 'Limited Project',
        complexity_level: 'low'
      }
    };

    const generator = new FeatureRequestGenerator(limitedContext, {});
    const features = await generator.extractFeatures();
    
    expect(Array.isArray(features)).toBe(true);
    expect(features.length).toBeGreaterThan(0);
  });

  test('should handle circular dependencies detection', () => {
    const generator = new FeatureRequestGenerator({}, {});
    const features = [
      { id: 'FR-001', name: 'Feature A', dependencies: ['FR-002'] },
      { id: 'FR-002', name: 'Feature B', dependencies: ['FR-001'] }
    ];

    expect(() => {
      generator.mapDependencies(features);
    }).toThrow(/circular/i); // Should detect and throw for circular dependencies
  });

  test('should handle large number of features', async () => {
    const complexContext = {
      project_analysis: {
        project_name: 'Complex Project',
        complexity_level: 'high'
      },
      architecture_vision: {
        user_journeys: Array.from({ length: 20 }, (_, i) => `Journey ${i + 1}`)
      }
    };

    const generator = new FeatureRequestGenerator(complexContext, {});
    const features = await generator.extractFeatures();
    
    expect(Array.isArray(features)).toBe(true);
    expect(features.length).toBeGreaterThan(1); // Should create multiple features for complex project
  });
});

describe('FeatureRequestGenerator - Negative Case Tests', () => {
  test('should handle null planning context', () => {
    expect(() => {
      new FeatureRequestGenerator(null, {});
    }).not.toThrow(); // Should handle gracefully
  });

  test('should handle undefined tech stack', () => {
    expect(() => {
      new FeatureRequestGenerator({}, undefined);
    }).not.toThrow(); // Should handle gracefully
  });

  test('should handle invalid feature data', () => {
    const generator = new FeatureRequestGenerator({}, {});
    const invalidFeatures = [
      { id: null, name: '', dependencies: 'invalid' },
      { /* missing required fields */ }
    ];

    expect(() => {
      generator.mapDependencies(invalidFeatures);
    }).not.toThrow(); // Should handle invalid data gracefully
  });

  test('should handle file system errors gracefully', async () => {
    const generator = new FeatureRequestGenerator({}, {});
    
    // Mock file system error
    const originalWriteFileSync = fs.writeFileSync;
    fs.writeFileSync = jest.fn(() => {
      throw new Error('File system error');
    });

    try {
      const result = await generator.decomposeProject();
      // Should still return a result even if file operations fail
      expect(result).toHaveProperty('features');
      expect(result).toHaveProperty('registry');
    } finally {
      // Restore original function
      fs.writeFileSync = originalWriteFileSync;
    }
  });

  test('should validate feature ID format', async () => {
    const generator = new FeatureRequestGenerator({}, {});
    const features = await generator.extractFeatures();
    
    features.forEach(feature => {
      expect(feature.id).toMatch(/^FR-\d{3}$/);
    });
  });
});