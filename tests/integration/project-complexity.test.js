/**
 * Integration Tests for Feature Decomposition with Various Project Complexities
 * Tests how the system handles different levels of project complexity
 */

const { FeatureRequestGenerator } = require('../../.claude/system/feature_request_generator');
const { DependencyManager } = require('../../.claude/system/dependency_manager');
const { FeatureRegistry } = require('../../.claude/system/feature_registry_manager');

describe('Project Complexity Tests - Low Complexity', () => {
  test('should handle simple CRUD application', async () => {
    const simplePlanningContext = {
      project_analysis: {
        project_name: 'Simple Todo App',
        project_description: 'Basic todo list application',
        complexity_level: 'low'
      },
      architecture_vision: {
        user_journeys: [
          'User can add todos',
          'User can view todos',
          'User can mark todos complete'
        ]
      },
      technical_research: {
        tech_stack: 'HTML/CSS/JavaScript',
        complexity_indicators: ['Basic CRUD', 'Local storage']
      }
    };

    const generator = new FeatureRequestGenerator(simplePlanningContext, { frontend: 'Vanilla JS' });
    const result = await generator.decomposeProject();

    // Low complexity should generate 2-5 features
    expect(result.features.length).toBeGreaterThanOrEqual(2);
    expect(result.features.length).toBeLessThanOrEqual(5);

    // Features should have simple dependency chains
    const dependencyManager = new DependencyManager(result.registry);
    const maxDependencyDepth = Math.max(...result.features.map(f => 
      dependencyManager.getAllDependencies(f.id).length
    ));
    expect(maxDependencyDepth).toBeLessThanOrEqual(2);

    // Verify feature structure for simple project
    result.features.forEach(feature => {
      expect(feature.estimated_effort).toMatch(/^(low|medium)$/);
      expect(feature.acceptance_criteria.length).toBeLessThanOrEqual(5);
    });
  });

  test('should handle single-page application', async () => {
    const spaPlanningContext = {
      project_analysis: {
        project_name: 'Simple Calculator',
        project_description: 'Basic calculator with arithmetic operations',
        complexity_level: 'low'
      },
      architecture_vision: {
        user_journeys: [
          'User can perform basic arithmetic',
          'User can clear calculations',
          'User can see calculation history'
        ]
      }
    };

    const generator = new FeatureRequestGenerator(spaPlanningContext, { frontend: 'React' });
    const result = await generator.decomposeProject();

    // Should generate minimal features for simple SPA
    expect(result.features.length).toBeGreaterThanOrEqual(2);
    expect(result.features.length).toBeLessThanOrEqual(4);

    // All features should be relatively independent
    const featuresWithNoDeps = result.features.filter(f => f.dependencies.length === 0);
    expect(featuresWithNoDeps.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Project Complexity Tests - Medium Complexity', () => {
  test('should handle e-commerce application', async () => {
    const ecommercePlanningContext = {
      project_analysis: {
        project_name: 'Online Store',
        project_description: 'E-commerce platform with user accounts and payments',
        complexity_level: 'medium'
      },
      architecture_vision: {
        user_journeys: [
          'User can browse products',
          'User can create account',
          'User can add items to cart',
          'User can checkout and pay',
          'User can view order history',
          'Admin can manage products',
          'Admin can view analytics'
        ]
      },
      technical_research: {
        tech_stack: 'React/Node.js/PostgreSQL',
        complexity_indicators: [
          'User authentication',
          'Payment processing',
          'Database relationships',
          'Admin dashboard',
          'Email notifications'
        ]
      }
    };

    const generator = new FeatureRequestGenerator(ecommercePlanningContext, {
      frontend: 'React',
      backend: 'Node.js',
      database: 'PostgreSQL'
    });
    const result = await generator.decomposeProject();

    // Medium complexity should generate 5-12 features
    expect(result.features.length).toBeGreaterThanOrEqual(5);
    expect(result.features.length).toBeLessThanOrEqual(12);

    // Should have more complex dependency relationships
    const dependencyManager = new DependencyManager(result.registry);
    const executionOrder = dependencyManager.getExecutionOrder(result.features.map(f => f.id));
    
    // Verify logical dependency order (e.g., user auth before user features)
    const authFeature = result.features.find(f => f.name.toLowerCase().includes('auth'));
    const userFeatures = result.features.filter(f => 
      f.name.toLowerCase().includes('user') && !f.name.toLowerCase().includes('auth')
    );

    if (authFeature && userFeatures.length > 0) {
      const authIndex = executionOrder.indexOf(authFeature.id);
      userFeatures.forEach(userFeature => {
        const userIndex = executionOrder.indexOf(userFeature.id);
        expect(authIndex).toBeLessThan(userIndex);
      });
    }

    // Verify feature complexity indicators
    const complexFeatures = result.features.filter(f => 
      f.estimated_effort === 'high' || f.acceptance_criteria.length > 5
    );
    expect(complexFeatures.length).toBeGreaterThan(0);
  });

  test('should handle project management application', async () => {
    const projectMgmtContext = {
      project_analysis: {
        project_name: 'Project Management Tool',
        project_description: 'Team collaboration and project tracking platform',
        complexity_level: 'medium'
      },
      architecture_vision: {
        user_journeys: [
          'User can create projects',
          'User can manage tasks',
          'User can assign team members',
          'User can track time',
          'User can generate reports',
          'User can set up notifications',
          'Admin can manage teams'
        ]
      },
      technical_research: {
        complexity_indicators: [
          'Real-time collaboration',
          'Role-based permissions',
          'File attachments',
          'Reporting dashboard',
          'Integration APIs'
        ]
      }
    };

    const generator = new FeatureRequestGenerator(projectMgmtContext, {
      frontend: 'React',
      backend: 'Node.js',
      database: 'MongoDB'
    });
    const result = await generator.decomposeProject();

    // Should generate appropriate number of features
    expect(result.features.length).toBeGreaterThanOrEqual(6);
    expect(result.features.length).toBeLessThanOrEqual(15);

    // Should have integration test scenarios
    expect(result.registry.integration_test_mapping).toBeDefined();
    
    // Verify complex features have appropriate risk assessments
    const complexFeatures = result.features.filter(f => 
      f.name.toLowerCase().includes('real-time') || 
      f.name.toLowerCase().includes('permission') ||
      f.name.toLowerCase().includes('integration')
    );

    complexFeatures.forEach(feature => {
      expect(feature.risk_assessment).toBeDefined();
      expect(feature.risk_assessment.technical_risks).toBeDefined();
      expect(Array.isArray(feature.risk_assessment.technical_risks)).toBe(true);
    });
  });
});

describe('Project Complexity Tests - High Complexity', () => {
  test('should handle enterprise CRM system', async () => {
    const crmPlanningContext = {
      project_analysis: {
        project_name: 'Enterprise CRM',
        project_description: 'Full-featured customer relationship management system',
        complexity_level: 'high'
      },
      architecture_vision: {
        user_journeys: [
          'Sales rep can manage leads',
          'Sales rep can track opportunities',
          'Manager can view sales pipeline',
          'Manager can generate forecasts',
          'Admin can configure workflows',
          'Admin can manage integrations',
          'Customer can access portal',
          'System can sync with external APIs',
          'System can generate automated reports',
          'System can send notifications',
          'System can handle bulk operations',
          'System can provide analytics dashboard'
        ]
      },
      technical_research: {
        tech_stack: 'React/Node.js/PostgreSQL/Redis',
        complexity_indicators: [
          'Multi-tenant architecture',
          'Advanced reporting',
          'Workflow automation',
          'Third-party integrations',
          'Real-time notifications',
          'Data analytics',
          'Bulk data processing',
          'Advanced security',
          'API rate limiting',
          'Caching strategies'
        ]
      }
    };

    const generator = new FeatureRequestGenerator(crmPlanningContext, {
      frontend: 'React',
      backend: 'Node.js',
      database: 'PostgreSQL',
      cache: 'Redis',
      queue: 'Bull'
    });
    const result = await generator.decomposeProject();

    // High complexity should generate 12-25 features
    expect(result.features.length).toBeGreaterThanOrEqual(12);
    expect(result.features.length).toBeLessThanOrEqual(25);

    // Should have complex dependency chains
    const dependencyManager = new DependencyManager(result.registry);
    const maxDependencyDepth = Math.max(...result.features.map(f => 
      dependencyManager.getAllDependencies(f.id).length
    ));
    expect(maxDependencyDepth).toBeGreaterThanOrEqual(3);

    // Should have multiple integration test scenarios
    const integrationTestCount = Object.keys(result.registry.integration_test_mapping).length;
    expect(integrationTestCount).toBeGreaterThanOrEqual(3);

    // Verify high-complexity features have detailed risk assessments
    const highRiskFeatures = result.features.filter(f => 
      f.risk_assessment && 
      f.risk_assessment.technical_risks && 
      f.risk_assessment.technical_risks.length > 2
    );
    expect(highRiskFeatures.length).toBeGreaterThan(0);

    // Verify features have appropriate effort estimates
    const highEffortFeatures = result.features.filter(f => f.estimated_effort === 'high');
    expect(highEffortFeatures.length).toBeGreaterThan(0);
  });

  test('should handle microservices architecture', async () => {
    const microservicesContext = {
      project_analysis: {
        project_name: 'Distributed E-commerce Platform',
        project_description: 'Microservices-based e-commerce with multiple services',
        complexity_level: 'high'
      },
      architecture_vision: {
        user_journeys: [
          'Customer can browse catalog',
          'Customer can place orders',
          'Customer can track shipments',
          'Merchant can manage inventory',
          'Merchant can process orders',
          'Admin can monitor system health',
          'System can handle service failures',
          'System can scale automatically',
          'System can process payments',
          'System can send notifications'
        ]
      },
      technical_research: {
        complexity_indicators: [
          'Service mesh',
          'Event-driven architecture',
          'Distributed transactions',
          'Circuit breakers',
          'Service discovery',
          'Load balancing',
          'Monitoring and logging',
          'Container orchestration',
          'API gateway',
          'Message queues'
        ]
      }
    };

    const generator = new FeatureRequestGenerator(microservicesContext, {
      architecture: 'microservices',
      orchestration: 'Kubernetes',
      messaging: 'RabbitMQ',
      monitoring: 'Prometheus'
    });
    const result = await generator.decomposeProject();

    // Should generate many features for microservices
    expect(result.features.length).toBeGreaterThanOrEqual(15);
    expect(result.features.length).toBeLessThanOrEqual(30);

    // Should have service-specific features
    const serviceFeatures = result.features.filter(f => 
      f.name.toLowerCase().includes('service') ||
      f.name.toLowerCase().includes('gateway') ||
      f.name.toLowerCase().includes('discovery')
    );
    expect(serviceFeatures.length).toBeGreaterThan(0);

    // Should have infrastructure features
    const infraFeatures = result.features.filter(f => 
      f.name.toLowerCase().includes('monitoring') ||
      f.name.toLowerCase().includes('logging') ||
      f.name.toLowerCase().includes('scaling')
    );
    expect(infraFeatures.length).toBeGreaterThan(0);

    // Verify complex integration scenarios
    const integrationTests = Object.values(result.registry.integration_test_mapping);
    const complexIntegrations = integrationTests.filter(test => 
      test.depends_on && test.depends_on.length > 2
    );
    expect(complexIntegrations.length).toBeGreaterThan(0);
  });
});

describe('Project Complexity Tests - Scalability', () => {
  test('should handle performance requirements for large projects', async () => {
    const largeProjectContext = {
      project_analysis: {
        project_name: 'Enterprise Platform',
        project_description: 'Large-scale enterprise application',
        complexity_level: 'high'
      },
      architecture_vision: {
        user_journeys: Array.from({ length: 20 }, (_, i) => `User journey ${i + 1}`)
      },
      technical_research: {
        complexity_indicators: Array.from({ length: 15 }, (_, i) => `Technical requirement ${i + 1}`)
      }
    };

    const startTime = Date.now();
    const generator = new FeatureRequestGenerator(largeProjectContext, {});
    const result = await generator.decomposeProject();
    const endTime = Date.now();

    // Should complete within reasonable time (less than 10 seconds)
    expect(endTime - startTime).toBeLessThan(10000);

    // Should generate appropriate number of features
    expect(result.features.length).toBeGreaterThan(10);
    expect(result.features.length).toBeLessThan(50); // Should not create too many

    // Dependency management should be efficient
    const dependencyManager = new DependencyManager(result.registry);
    const executionOrderStartTime = Date.now();
    const executionOrder = dependencyManager.getExecutionOrder(result.features.map(f => f.id));
    const executionOrderEndTime = Date.now();

    expect(executionOrderEndTime - executionOrderStartTime).toBeLessThan(1000);
    expect(executionOrder.length).toBe(result.features.length);
  });

  test('should maintain quality with increasing complexity', async () => {
    const complexityLevels = ['low', 'medium', 'high'];
    const results = [];

    for (const complexity of complexityLevels) {
      const context = {
        project_analysis: {
          project_name: `${complexity} Complexity Project`,
          complexity_level: complexity
        },
        architecture_vision: {
          user_journeys: Array.from({ 
            length: complexity === 'low' ? 3 : complexity === 'medium' ? 7 : 12 
          }, (_, i) => `Journey ${i + 1}`)
        }
      };

      const generator = new FeatureRequestGenerator(context, {});
      const result = await generator.decomposeProject();
      results.push({ complexity, result });
    }

    // Verify quality scales with complexity
    for (let i = 0; i < results.length - 1; i++) {
      const current = results[i];
      const next = results[i + 1];

      // Higher complexity should generate more features
      expect(next.result.features.length).toBeGreaterThanOrEqual(current.result.features.length);

      // All features should maintain quality standards
      [...current.result.features, ...next.result.features].forEach(feature => {
        expect(feature.id).toMatch(/^FR-\d{3}$/);
        expect(feature.name).toBeDefined();
        expect(feature.name.length).toBeGreaterThan(0);
        expect(feature.user_story).toBeDefined();
        expect(Array.isArray(feature.acceptance_criteria)).toBe(true);
        expect(feature.test_groups).toBeDefined();
      });
    }
  });
});