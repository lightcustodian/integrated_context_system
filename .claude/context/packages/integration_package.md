# Integration Context Package

**Token Budget**: 3K tokens maximum  
**Usage**: Load for cross-feature and system integration tasks

## Core Integration Context

### System Integration
[[Artifact: architecture-integration]] - System architecture and component relationships
[[Artifact: feature-dependencies]] - Cross-feature dependencies and integration points
[[Artifact: api-contracts]] - API specifications and interface contracts

### Key Integration Points (200 tokens maximum):
- **Feature Dependencies**: [cross-feature relationships and execution order]
- **Data Flow**: [how data moves between components and features]
- **API Contracts**: [interface specifications and integration requirements]
- **Shared Resources**: [databases, services, configurations used across features]
- **Integration Testing**: [cross-feature test scenarios and validation requirements]

## Agent-Specific Context Filters

### For Code Integration Tester Agent:
Focus on: Cross-feature testing, integration scenarios, system validation
Context allocation: 2.5K tokens (integration points + testing procedures from artifacts)

### For Architecture Analysis:
Focus on: System design, component relationships, integration patterns
Context allocation: 2.5K tokens (integration points + architecture details from artifacts)

### For Cross-Feature Coordination:
Focus on: Feature dependencies, execution order, shared resource management
Context allocation: 2.5K tokens (integration points + dependency mapping from artifacts)

## Context Loading Rules
- Load when multiple features interact or system-wide validation needed
- Load filtered sections based on specific integration requirements
- Reference artifacts for detailed integration specifications
- Maintain clear boundaries between feature-specific and system-wide context