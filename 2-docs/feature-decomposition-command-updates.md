# Feature Decomposition Command Updates

This document outlines the required updates to the command discovery and help system to reflect the changes made to the Feature Request Decomposition system.

## 1. Update `initializeFeatureCommands()` in `command_discovery.js`

Modify the `initializeFeatureCommands()` function in `command_discovery.js` to update the command descriptions and parameters as follows:

### 1.1. `/create-prp`

- **Function**: Update the description to "Decomposes complex projects into multiple progressive feature requests using ULTRATHINK analysis".
- **Parameters**:
    - `--complexity`: Add description "Project complexity level (low, medium, high)".
    - `--features`: Add description "Feature decomposition mode (auto or manual)".

### 1.2. `/execute-prp`

- **Function**: Update the description to "Implements features individually or in groups with dependency management and multi-feature orchestration".
- **Parameters**:
    - `--feature`: Add description "Specific feature ID(s) to execute (comma-separated)".
    - `--auto-deps`: Add description "Automatically execute dependencies in the correct order".
    - `--force`: Add description "Bypass dependency checks (use with caution)".
    - `--phase`: Add description "Execution phase (all, planning, implementation, testing)".

### 1.3. `/validate`

- **Function**: Update the description to "Validates features individually or collectively with integration testing and feature-specific options".
- **Parameters**:
    - `--feature`: Add description "Specific feature ID(s) to validate (comma-separated)".
    - `--isolated`: Add description "Validate without dependency checks for individual features".
    - `--deep`: Add description "Validate all dependencies recursively for comprehensive testing".
    - `--integration`: Add description "Include integration tests to check cross-feature compatibility".
    - `--level`: Add description "Validation level (basic or full)".

### 1.4. `/feature-status`

- **Function**: Update the description to "Shows feature lifecycle, dependencies, and overall project progress with detailed tracking".
- **Parameters**:
    - `FEATURE_ID`: Add description "Specific feature ID to check".
    - `--summary`: Add description "Show summary of all features and their status".
    - `--dependencies`: Add description "Show dependency graph to visualize feature relationships".
    - `--progress`: Add description "Show detailed progress metrics for each feature".

## 2. Update `generateFeatureDecompositionHelp()` in `command_discovery.js`

Modify the `generateFeatureDecompositionHelp()` function in `command_discovery.js` to include the updated command descriptions.

### 2.1. `/create-prp`

- Update the description to "Enhanced with intelligent feature decomposition using ULTRATHINK analysis".

### 2.2. `/execute-prp`

- Update the description to "Multi-feature orchestration support".

### 2.3. `/validate`

- Update the description to "Feature-specific validation options".

This document provides a comprehensive guide for updating the command discovery and help system.