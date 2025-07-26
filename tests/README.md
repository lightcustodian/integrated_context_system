# Tests Directory

This directory will be populated by the Context Engineering system when you run:
- `/create-prp` - Creates test templates and structure for each feature
- `/execute-prp` - Implements and executes tests using specialist agents

## Directory Structure

- **unit/** - Task-level tests organized by feature (Happy Path, Edge Case, Negative Case)
- **integration/** - Feature-level tests and cross-feature validation

- **e2e/** - End-to-end tests for complete user workflows

## Test Organization

Tests are organized into three main groups per feature:

1. **Happy Path Tests** - Core functionality tests that verify main use cases work correctly
2. **Edge Case Tests** - Tests that verify boundary conditions and unusual inputs  
3. **Negative Case Tests** - Tests that verify error handling and invalid inputs

## Test-Driven Development Workflow

The Context Engineering system follows coordinated TDD methodology with specialist agents:

1. **RED Phase** - Code Tester Agent runs pre-created tests (should fail initially)
2. **GREEN Phase** - Code Writer Agent implements minimal code to make tests pass
3. **REFACTOR Phase** - Code Writer Agent improves code quality while maintaining test success

## Specialist Agent Integration

Tests are created and executed by specialized agents:
- **Code Tester Agent** - Executes tests and validates results
- **Code Test Writer Agent** - Creates additional tests for comprehensive coverage
- **Code Integration Tester Agent** - Handles cross-feature testing
- **Validation Coordinator Agent** - Orchestrates multi-level validation

## Generated Content

When you use the Context Engineering system, this directory will be populated with:
- Test files appropriate for your project's technology stack

- Integration tests for feature interactions and dependencies
- Test configuration and framework setup
- Test execution reports and coverage analysis

The specific test framework and structure will be determined by your project's technology stack as specified in PLANNING.md and configured by the Analysis Tech Detector Agent.