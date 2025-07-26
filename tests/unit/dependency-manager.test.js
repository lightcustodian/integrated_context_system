/**
 * Unit Tests for DependencyManager
 * Tests dependency management and validation functionality
 */

const { DependencyManager } = require('../../.claude/system/dependency_manager');
const fs = require('fs');

describe('DependencyManager - Happy Path Tests', () => {
  let dependencyManager;
  let mockFeatureRegistry;

  beforeEach(() => {
    // Setup mock feature registry
    mockFeatureRegistry = {
      version: '1.0.0',
      project_id: 'test-project',
      features: [
        {
          id: 'FR-001',
          name: 'Basic Feature',
          status: 'completed',
          dependencies: []
        },
        {
          id: 'FR-002',
          name: 'Dependent Feature',
          status: 'planned',
          dependencies: ['FR-001']
        },
        {
          id: 'FR-003',
          name: 'Complex Feature',
          status: 'planned',
          dependencies: ['FR-001', 'FR-002']
        }
      ],
      dependency_graph: {
        'FR-001': [],
        'FR-002': ['FR-001'],
        'FR-003': ['FR-001', 'FR-002']
      }
    };

    dependencyManager = new DependencyManager(mockFeatureRegistry);
  });

  test('should create DependencyManager instance successfully', () => {
    expect(dependencyManager).toBeInstanceOf(DependencyManager);
    expect(dependencyManager.registry).toEqual(mockFeatureRegistry);
  });

  test('should build dependency graph correctly', () => {
    const graph = dependencyManager.buildDependencyGraph();
    
    expect(graph).toHaveProperty('FR-001');
    expect(graph).toHaveProperty('FR-002');
    expect(graph).toHaveProperty('FR-003');
    
    expect(graph['FR-001']).toEqual([]);
    expect(graph['FR-002']).toEqual(['FR-001']);
    expect(graph['FR-003']).toEqual(['FR-001', 'FR-002']);
  });

  test('should validate dependencies correctly', () => {
    // Test valid dependency chain
    const validationResult = dependencyManager.validateDependencies(['FR-002']);
    
    expect(validationResult).toHaveProperty('valid');
    expect(validationResult).toHaveProperty('missing_dependencies');
    expect(validationResult).toHaveProperty('satisfied_dependencies');
    
    // FR-002 depends on FR-001, which is completed
    expect(validationResult.valid).toBe(true);
    expect(validationResult.missing_dependencies).toEqual([]);
  });

  test('should detect missing dependencies', () => {
    // Test with incomplete dependencies
    const validationResult = dependencyManager.validateDependencies(['FR-003']);
    
    // FR-003 depends on FR-001 (completed) and FR-002 (planned)
    expect(validationResult.valid).toBe(false);
    expect(validationResult.missing_dependencies).toContain('FR-002');
  });

  test('should calculate execution order using topological sort', () => {
    const executionOrder = dependencyManager.getExecutionOrder(['FR-001', 'FR-002', 'FR-003']);
    
    expect(Array.isArray(executionOrder)).toBe(true);
    expect(executionOrder).toContain('FR-001');
    expect(executionOrder).toContain('FR-002');
    expect(executionOrder).toContain('FR-003');
    
    // FR-001 should come before FR-002
    const fr001Index = executionOrder.indexOf('FR-001');
    const fr002Index = executionOrder.indexOf('FR-002');
    expect(fr001Index).toBeLessThan(fr002Index);
    
    // FR-002 should come before FR-003
    const fr003Index = executionOrder.indexOf('FR-003');
    expect(fr002Index).toBeLessThan(fr003Index);
  });

  test('should resolve dependencies with auto-resolve option', () => {
    const resolvedDeps = dependencyManager.resolveDependencies('FR-003', true);
    
    expect(Array.isArray(resolvedDeps)).toBe(true);
    expect(resolvedDeps).toContain('FR-001');
    expect(resolvedDeps).toContain('FR-002');
    expect(resolvedDeps).toContain('FR-003');
    
    // Should be in correct execution order
    const fr001Index = resolvedDeps.indexOf('FR-001');
    const fr002Index = resolvedDeps.indexOf('FR-002');
    const fr003Index = resolvedDeps.indexOf('FR-003');
    
    expect(fr001Index).toBeLessThan(fr002Index);
    expect(fr002Index).toBeLessThan(fr003Index);
  });

  test('should get direct dependencies only', () => {
    const directDeps = dependencyManager.getDirectDependencies('FR-003');
    
    expect(Array.isArray(directDeps)).toBe(true);
    expect(directDeps).toEqual(['FR-001', 'FR-002']);
  });

  test('should get all transitive dependencies', () => {
    const allDeps = dependencyManager.getAllDependencies('FR-003');
    
    expect(Array.isArray(allDeps)).toBe(true);
    expect(allDeps).toContain('FR-001');
    expect(allDeps).toContain('FR-002');
  });

  test('should find dependents of a feature', () => {
    const dependents = dependencyManager.getDependents('FR-001');
    
    expect(Array.isArray(dependents)).toBe(true);
    expect(dependents).toContain('FR-002');
    expect(dependents).toContain('FR-003');
  });
});

describe('DependencyManager - Edge Case Tests', () => {
  test('should handle empty feature registry', () => {
    const emptyRegistry = {
      features: [],
      dependency_graph: {}
    };

    const manager = new DependencyManager(emptyRegistry);
    const executionOrder = manager.getExecutionOrder([]);
    
    expect(Array.isArray(executionOrder)).toBe(true);
    expect(executionOrder.length).toBe(0);
  });

  test('should handle single feature with no dependencies', () => {
    const singleFeatureRegistry = {
      features: [
        { id: 'FR-001', name: 'Single Feature', dependencies: [] }
      ],
      dependency_graph: {
        'FR-001': []
      }
    };

    const manager = new DependencyManager(singleFeatureRegistry);
    const executionOrder = manager.getExecutionOrder(['FR-001']);
    
    expect(executionOrder).toEqual(['FR-001']);
  });

  test('should handle complex dependency chains', () => {
    const complexRegistry = {
      features: [
        { id: 'FR-001', name: 'Base', dependencies: [] },
        { id: 'FR-002', name: 'Level 1A', dependencies: ['FR-001'] },
        { id: 'FR-003', name: 'Level 1B', dependencies: ['FR-001'] },
        { id: 'FR-004', name: 'Level 2', dependencies: ['FR-002', 'FR-003'] },
        { id: 'FR-005', name: 'Level 3', dependencies: ['FR-004'] }
      ],
      dependency_graph: {
        'FR-001': [],
        'FR-002': ['FR-001'],
        'FR-003': ['FR-001'],
        'FR-004': ['FR-002', 'FR-003'],
        'FR-005': ['FR-004']
      }
    };

    const manager = new DependencyManager(complexRegistry);
    const executionOrder = manager.getExecutionOrder(['FR-001', 'FR-002', 'FR-003', 'FR-004', 'FR-005']);
    
    // Verify correct ordering
    const fr001Index = executionOrder.indexOf('FR-001');
    const fr002Index = executionOrder.indexOf('FR-002');
    const fr003Index = executionOrder.indexOf('FR-003');
    const fr004Index = executionOrder.indexOf('FR-004');
    const fr005Index = executionOrder.indexOf('FR-005');
    
    expect(fr001Index).toBeLessThan(fr002Index);
    expect(fr001Index).toBeLessThan(fr003Index);
    expect(fr002Index).toBeLessThan(fr004Index);
    expect(fr003Index).toBeLessThan(fr004Index);
    expect(fr004Index).toBeLessThan(fr005Index);
  });

  test('should handle partial feature selection', () => {
    const manager = new DependencyManager(mockFeatureRegistry);
    
    // Request only FR-002, should include its dependency FR-001
    const partialOrder = manager.getExecutionOrder(['FR-002']);
    
    expect(partialOrder).toContain('FR-001');
    expect(partialOrder).toContain('FR-002');
    expect(partialOrder.indexOf('FR-001')).toBeLessThan(partialOrder.indexOf('FR-002'));
  });

  test('should handle non-existent feature IDs gracefully', () => {
    const manager = new DependencyManager(mockFeatureRegistry);
    
    const validationResult = manager.validateDependencies(['FR-999']);
    
    expect(validationResult.valid).toBe(false);
    expect(validationResult.missing_dependencies).toContain('FR-999');
  });
});

describe('DependencyManager - Negative Case Tests', () => {
  test('should detect circular dependencies', () => {
    const circularRegistry = {
      features: [
        { id: 'FR-001', name: 'Feature A', dependencies: ['FR-002'] },
        { id: 'FR-002', name: 'Feature B', dependencies: ['FR-001'] }
      ],
      dependency_graph: {
        'FR-001': ['FR-002'],
        'FR-002': ['FR-001']
      }
    };

    const manager = new DependencyManager(circularRegistry);
    
    expect(() => {
      manager.getExecutionOrder(['FR-001', 'FR-002']);
    }).toThrow(/circular dependency/i);
  });

  test('should handle null or undefined registry', () => {
    expect(() => {
      new DependencyManager(null);
    }).toThrow();

    expect(() => {
      new DependencyManager(undefined);
    }).toThrow();
  });

  test('should handle malformed dependency graph', () => {
    const malformedRegistry = {
      features: [
        { id: 'FR-001', name: 'Feature', dependencies: ['FR-002'] }
      ],
      dependency_graph: {
        'FR-001': 'invalid-format' // Should be array
      }
    };

    const manager = new DependencyManager(malformedRegistry);
    
    expect(() => {
      manager.validateDependencies(['FR-001']);
    }).not.toThrow(); // Should handle gracefully
  });

  test('should provide clear error messages for dependency violations', () => {
    const manager = new DependencyManager(mockFeatureRegistry);
    
    const validationResult = manager.validateDependencies(['FR-003']);
    
    expect(validationResult).toHaveProperty('error_message');
    expect(validationResult.error_message).toContain('missing dependencies');
    expect(validationResult.error_message).toContain('FR-002');
  });

  test('should handle empty feature ID arrays', () => {
    const manager = new DependencyManager(mockFeatureRegistry);
    
    const executionOrder = manager.getExecutionOrder([]);
    expect(executionOrder).toEqual([]);
    
    const validationResult = manager.validateDependencies([]);
    expect(validationResult.valid).toBe(true);
  });

  test('should validate feature status for dependency satisfaction', () => {
    const manager = new DependencyManager(mockFeatureRegistry);
    
    // Create a scenario where dependency exists but is not completed
    const incompleteRegistry = {
      ...mockFeatureRegistry,
      features: [
        { id: 'FR-001', name: 'Base', status: 'in-progress', dependencies: [] },
        { id: 'FR-002', name: 'Dependent', status: 'planned', dependencies: ['FR-001'] }
      ]
    };

    const incompleteManager = new DependencyManager(incompleteRegistry);
    const validationResult = incompleteManager.validateDependencies(['FR-002']);
    
    expect(validationResult.valid).toBe(false);
    expect(validationResult.incomplete_dependencies).toContain('FR-001');
  });
});