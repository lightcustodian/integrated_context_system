/**
 * Basic Functionality Tests for Feature Decomposition System
 * Tests that core classes can be instantiated and basic methods work
 */

const fs = require('fs');

describe('Feature Decomposition System - Basic Functionality', () => {
  test('should be able to require all core classes without errors', () => {
    // Test that all main classes can be imported
    expect(() => {
      const { FeatureRequestGenerator } = require('../../.claude/system/feature_request_generator');
      const { DependencyManager } = require('../../.claude/system/dependency_manager');
      const { FeatureRegistry } = require('../../.claude/system/feature_registry_manager');
      const { FeatureStateManager } = require('../../.claude/system/feature_state_manager');
      const { FeatureLifecycleManager } = require('../../.claude/system/feature_lifecycle_manager');
      const { IntegrationTestManager } = require('../../.claude/system/integration_test_manager');
      const { BackwardCompatibilityManager } = require('../../.claude/system/backward_compatibility_manager');
    }).not.toThrow();
  });

  test('should be able to instantiate FeatureRegistry', async () => {
    const { FeatureRegistry } = require('../../.claude/system/feature_registry_manager');
    
    const registry = new FeatureRegistry();
    expect(registry).toBeDefined();
    expect(typeof registry.loadRegistry).toBe('function');
    expect(typeof registry.saveRegistry).toBe('function');
    expect(typeof registry.addFeature).toBe('function');
  });

  test('should be able to instantiate FeatureStateManager', () => {
    const { FeatureStateManager } = require('../../.claude/system/feature_state_manager');
    
    const stateManager = new FeatureStateManager();
    expect(stateManager).toBeDefined();
    expect(typeof stateManager.updateFeatureStatus).toBe('function');
    expect(typeof stateManager.updateFeatureConfidence).toBe('function');
  });

  test('should be able to instantiate BackwardCompatibilityManager', () => {
    const { BackwardCompatibilityManager } = require('../../.claude/system/backward_compatibility_manager');
    
    const compatibilityManager = new BackwardCompatibilityManager();
    expect(compatibilityManager).toBeDefined();
    expect(typeof compatibilityManager.detectProjectMode).toBe('function');
    expect(typeof compatibilityManager.ensureBackwardCompatibility).toBe('function');
  });

  test('should have proper file structure for feature decomposition', () => {
    // Test that key directories exist
    const keyDirectories = [
      '2-docs/features',
      'tests/integration',
      '.claude/system'
    ];

    keyDirectories.forEach(dir => {
      expect(fs.existsSync(dir)).toBe(true);
    });
  });

  test('should have feature templates available', () => {
    // Test that feature templates exist
    const templateFiles = [
      '2-docs/features/templates/feature-requirements-template.md',
      '2-docs/features/templates/feature-design-template.md',
      '2-docs/features/templates/feature-tasks-template.md'
    ];

    templateFiles.forEach(file => {
      expect(fs.existsSync(file)).toBe(true);
    });
  });

  test('should have integration test structure', () => {
    // Test that integration test directories exist
    const integrationDirs = [
      'tests/integration/feature-interactions',
      'tests/integration/data-flow',
      'tests/integration/state-management'
    ];

    integrationDirs.forEach(dir => {
      expect(fs.existsSync(dir)).toBe(true);
    });
  });

  test('should have all required system files', () => {
    // Test that all system files exist
    const systemFiles = [
      '.claude/system/feature_request_generator.js',
      '.claude/system/dependency_manager.js',
      '.claude/system/feature_registry_manager.js',
      '.claude/system/feature_state_manager.js',
      '.claude/system/feature_lifecycle_manager.js',
      '.claude/system/integration_test_manager.js',
      '.claude/system/backward_compatibility_manager.js'
    ];

    systemFiles.forEach(file => {
      expect(fs.existsSync(file)).toBe(true);
    });
  });

  test('should be able to create and load feature registry', async () => {
    const { FeatureRegistry } = require('../../.claude/system/feature_registry_manager');
    
    const registry = new FeatureRegistry();
    
    // Test creating registry
    const created = await registry.createRegistry('test-project');
    expect(created).toBeDefined();
    expect(typeof created).toBe('object');
    
    // Test loading registry
    const loaded = await registry.loadRegistry();
    expect(loaded).toBeDefined();
    expect(loaded.project_id).toBeDefined();
    expect(Array.isArray(loaded.features)).toBe(true);
    
    // Cleanup
    if (fs.existsSync('2-docs/features/feature-registry.json')) {
      fs.unlinkSync('2-docs/features/feature-registry.json');
    }
  });

  test('should be able to detect project mode', async () => {
    const { BackwardCompatibilityManager } = require('../../.claude/system/backward_compatibility_manager');
    
    const compatibilityManager = new BackwardCompatibilityManager();
    const mode = await compatibilityManager.detectProjectMode();
    
    expect(mode).toBeDefined();
    expect(mode.mode).toBeDefined();
    expect(['legacy_single_prp', 'feature_decomposition', 'new_project'].includes(mode.mode)).toBe(true);
  });

  test('should be able to ensure backward compatibility', async () => {
    const { BackwardCompatibilityManager } = require('../../.claude/system/backward_compatibility_manager');
    
    const compatibilityManager = new BackwardCompatibilityManager();
    const compatibility = await compatibilityManager.ensureBackwardCompatibility();
    
    expect(compatibility).toBeDefined();
    expect(typeof compatibility.compatible).toBe('boolean');
    expect(compatibility.mode).toBeDefined();
  });
});