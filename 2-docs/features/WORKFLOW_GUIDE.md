# Feature Decomposition Workflow Guide

## Overview

This guide explains the complete workflow for using the Feature Request Decomposition System, including the dual-level Requirements → Design → Tasks methodology that operates at both project and feature levels.

## Workflow Architecture

The Feature Request Decomposition System implements a dual-level workflow:

```
Project Level:
Requirements → Design → Tasks → Implementation

Feature Level (for each feature):
Requirements → Design → Tasks → Implementation

Integration:
Project Requirements inform Feature Requirements
Project Design guides Feature Design  
Project Tasks coordinate Feature Tasks
```

## Complete Workflow Process

### Phase 1: Project-Level Planning

#### 1.1 Create PLANNING.md

Start by creating a comprehensive PLANNING.md file for your project:

```markdown
# Project Name: Advanced Task Manager

## Project Overview
A comprehensive task management application with user authentication, 
task organization, time tracking, and collaboration features.

## Primary Goal
Create a production-ready task management system that supports 
individual users and small teams.

## Target Users
- Individual professionals managing personal tasks
- Small teams collaborating on projects
- Freelancers tracking time and deliverables

## Core Features
- User authentication and profile management
- Task creation, editing, and organization
- Task categorization and tagging
- Due dates and reminders
- Time tracking per task
- Task sharing and collaboration
- Dashboard and reporting

## Technical Requirements
- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT-based
- Responsive design for mobile and desktop

## Project Complexity
Medium - Multiple interconnected features with user management 
and data persistence requirements.
```

#### 1.2 Initialize Context Engineering

```bash
# Initialize the Context Engineering system
/init-context task-manager

# This creates:
# - Directory structure
# - Planning documents (6 ULTRATHINK documents)
# - Test framework setup
# - Initial templates
```

#### 1.3 Review Planning Documents

Review the generated planning documents:

```bash
# Check generated planning documents
ls 2-docs/planning/

# Review key documents:
cat 2-docs/planning/project-analysis.md
cat 2-docs/planning/architecture-vision.md
cat 2-docs/planning/technical-research.md
```

### Phase 2: Feature Decomposition

#### 2.1 Create Feature-Decomposed PRP

```bash
# Create PRP with feature decomposition
/create-prp task-manager --complexity=medium --features=auto

# This generates:
# - Multiple feature requests (FR-001, FR-002, etc.)
# - Feature registry with dependencies
# - Integration test scaffolding
# - Orchestrator PRP document
```

#### 2.2 Review Generated Features

```bash
# Check feature status and dependencies
/feature-status --summary --dependencies

# Review individual features
cat 2-docs/features/FR-001/FR-001.md
cat 2-docs/features/FR-002/FR-002.md

# Check feature registry
cat 2-docs/features/feature-registry.json
```

#### 2.3 Validate Feature Decomposition

```bash
# Validate the decomposition
/validate --features --dependencies

# Check for issues
/feature-status --dependencies --analyze-cycles
```

### Phase 3: Feature-Level Implementation

For each feature, follow the dual-level Requirements → Design → Tasks workflow:

#### 3.1 Feature Requirements Phase

**Example: FR-001 User Authentication**

```bash
# Start feature requirements phase
/execute-prp --feature=FR-001 --phase=requirements
```

This generates a feature-specific requirements document:

```markdown
# Feature Requirements: User Authentication

## Introduction
This document defines the requirements for User Authentication (ID: FR-001).

## Requirements

### Requirement 1
**User Story:** As a new user, I want to register for an account, so that I can access the task management system.

#### Acceptance Criteria
1. WHEN I provide valid registration information THEN the system SHALL create a new user account
2. WHEN I provide an email that already exists THEN the system SHALL display an appropriate error message
3. WHEN I provide invalid email format THEN the system SHALL display validation errors
4. WHEN registration is successful THEN the system SHALL automatically log me in

### Requirement 2
**User Story:** As a registered user, I want to log in to my account, so that I can access my tasks and data.

#### Acceptance Criteria
1. WHEN I provide valid credentials THEN the system SHALL authenticate me and grant access
2. WHEN I provide invalid credentials THEN the system SHALL display an error message
3. WHEN I am authenticated THEN the system SHALL maintain my session securely
4. WHEN my session expires THEN the system SHALL prompt me to log in again
```

**Review and Approve Requirements:**

```bash
# Review the generated requirements
cat 2-docs/features/FR-001/requirements.md

# If requirements need refinement, edit and regenerate
# Edit 2-docs/features/FR-001/requirements.md
/execute-prp --feature=FR-001 --phase=requirements --refine
```

#### 3.2 Feature Design Phase

```bash
# Start feature design phase
/execute-prp --feature=FR-001 --phase=design
```

This generates a feature-specific design document:

```markdown
# Feature Design: User Authentication

## Overview
This document describes the design for User Authentication (ID: FR-001).

## Architecture Overview
The authentication system uses JWT tokens for stateless authentication with secure password hashing using bcrypt.

## Components
- **AuthController**: Handles registration and login endpoints
- **AuthService**: Business logic for authentication operations
- **UserModel**: Data model for user information
- **AuthMiddleware**: JWT token validation middleware
- **PasswordService**: Password hashing and validation utilities

## Data Models
```javascript
const UserSchema = {
  id: String,
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String (required),
  lastName: String (required),
  createdAt: Date,
  lastLogin: Date,
  isActive: Boolean
};

const AuthTokenSchema = {
  userId: String,
  token: String,
  expiresAt: Date,
  createdAt: Date
};
```

## Technical Decisions
- JWT tokens for stateless authentication
- bcrypt for password hashing (salt rounds: 12)
- Token expiration: 24 hours
- Refresh token mechanism for extended sessions
```

**Review and Approve Design:**

```bash
# Review the generated design
cat 2-docs/features/FR-001/design.md

# Validate design against requirements
/validate --feature=FR-001 --phase=design
```

#### 3.3 Feature Tasks Phase

```bash
# Start feature tasks phase
/execute-prp --feature=FR-001 --phase=tasks
```

This generates feature-specific implementation tasks:

```markdown
# Feature Tasks: User Authentication

## Implementation Plan

### Requirements Phase Tasks
- [x] 1. Define user registration requirements
- [x] 2. Define user login requirements  
- [x] 3. Define session management requirements
- [x] 4. Define security requirements

### Design Phase Tasks
- [x] 1. Design authentication architecture
- [x] 2. Design data models
- [x] 3. Design API endpoints
- [x] 4. Design security measures

### Implementation Tasks
- [ ] 1. Set up authentication infrastructure
  - Create User model with validation
  - Set up JWT token utilities
  - Configure password hashing service
  - _Requirements: FR-001 Requirement 1.1, 2.1_

- [ ] 2. Implement user registration
  - Create registration endpoint
  - Implement input validation
  - Add duplicate email checking
  - Create registration tests
  - _Requirements: FR-001 Requirement 1.1, 1.2, 1.3_

- [ ] 3. Implement user login
  - Create login endpoint
  - Implement credential validation
  - Generate JWT tokens
  - Create login tests
  - _Requirements: FR-001 Requirement 2.1, 2.2_

- [ ] 4. Implement session management
  - Create authentication middleware
  - Implement token validation
  - Handle token expiration
  - Create session tests
  - _Requirements: FR-001 Requirement 2.3, 2.4_

### Testing Tasks
- [ ] 1. Create unit tests for authentication service
- [ ] 2. Create integration tests for auth endpoints
- [ ] 3. Create BDD scenarios for user registration
- [ ] 4. Create BDD scenarios for user login
- [ ] 5. Create security tests for authentication

### Validation Tasks
- [ ] 1. Validate all acceptance criteria are met
- [ ] 2. Validate security requirements
- [ ] 3. Validate integration with other features
- [ ] 4. Validate performance requirements
```

**Review and Approve Tasks:**

```bash
# Review the generated tasks
cat 2-docs/features/FR-001/tasks.md

# Validate task breakdown
/validate --feature=FR-001 --phase=tasks
```

#### 3.4 Feature Implementation Phase

```bash
# Execute the feature implementation
/execute-prp --feature=FR-001 --phase=implementation

# This will:
# 1. Execute each task in the task list
# 2. Generate code based on requirements and design
# 3. Create tests (unit, integration, BDD)
# 4. Validate implementation against acceptance criteria
# 5. Update feature status and progress
```

#### 3.5 Feature Validation

```bash
# Validate the completed feature
/validate --feature=FR-001

# Run comprehensive validation
/validate --feature=FR-001 --level=comprehensive

# Check feature status
/feature-status FR-001
```

### Phase 4: Multi-Feature Integration

#### 4.1 Implement Dependent Features

Once foundational features are complete, implement dependent features:

```bash
# Check which features can be implemented next
/feature-status --dependencies

# Implement next feature with auto-dependency resolution
/execute-prp --feature=FR-003 --auto-deps

# This will:
# 1. Verify FR-001 (dependency) is completed
# 2. Execute FR-003 through its full workflow
# 3. Run integration tests between FR-001 and FR-003
```

#### 4.2 Integration Testing

```bash
# Run integration tests between features
/validate --feature=FR-001,FR-003 --integration

# Run comprehensive integration testing
/validate --integration --deep

# Check integration test results
cat tests/integration/feature-interactions/auth-tasks-integration.test.js
```

#### 4.3 Progressive Feature Implementation

Continue implementing features in dependency order:

```bash
# Implement multiple features in sequence
/execute-prp --feature=FR-002  # User Profile Management
/validate --feature=FR-002

/execute-prp --feature=FR-004  # Task Categories
/validate --feature=FR-004

/execute-prp --feature=FR-005  # Task Due Dates
/validate --feature=FR-005

# Run integration tests after each feature
/validate --integration
```

### Phase 5: System Integration and Validation

#### 5.1 Complete System Validation

```bash
# Validate all features
/validate --all-features

# Run comprehensive system validation
/validate --deep --integration --level=comprehensive

# Check overall project status
/feature-status --summary --progress
```

#### 5.2 End-to-End Testing

```bash
# Run end-to-end tests
/validate --e2e

# Test complete user workflows
/validate --user-workflows
```

#### 5.3 Performance and Quality Validation

```bash
# Run performance tests
/validate --performance

# Check code quality
/validate --quality

# Generate final project report
/feature-status --final-report
```

## Workflow Commands Reference

### Project-Level Commands

```bash
# Initialize project
/init-context [PROJECT_NAME]

# Create feature-decomposed PRP
/create-prp [PROJECT_NAME] --complexity=medium --features=auto

# Project-level validation
/validate --project-level
```

### Feature-Level Commands

```bash
# Execute feature phases
/execute-prp --feature=FR-001 --phase=requirements
/execute-prp --feature=FR-001 --phase=design
/execute-prp --feature=FR-001 --phase=tasks
/execute-prp --feature=FR-001 --phase=implementation

# Execute complete feature workflow
/execute-prp --feature=FR-001

# Execute with dependency resolution
/execute-prp --feature=FR-003 --auto-deps
```

### Validation Commands

```bash
# Feature-specific validation
/validate --feature=FR-001
/validate --feature=FR-001 --level=comprehensive
/validate --feature=FR-001 --isolated

# Integration validation
/validate --feature=FR-001,FR-003 --integration
/validate --integration --deep

# System-wide validation
/validate --all-features --comprehensive
```

### Status and Progress Commands

```bash
# Feature status
/feature-status FR-001
/feature-status --summary
/feature-status --dependencies
/feature-status --progress

# Update feature status
/feature-status FR-001 --update-progress=75
/feature-status FR-001 --update-status=completed
```

## Workflow Best Practices

### 1. Sequential Phase Execution

Always complete phases in order:
1. Requirements → 2. Design → 3. Tasks → 4. Implementation

### 2. Validation at Each Phase

Validate each phase before proceeding:
```bash
/execute-prp --feature=FR-001 --phase=requirements
/validate --feature=FR-001 --phase=requirements
# Only proceed to design after requirements validation passes
```

### 3. Dependency-Aware Implementation

Always check dependencies before implementing features:
```bash
/feature-status --dependencies
/execute-prp --feature=FR-005 --auto-deps  # Safer than manual dependency management
```

### 4. Regular Integration Testing

Run integration tests frequently:
```bash
# After each feature completion
/validate --integration

# Before implementing dependent features
/validate --feature=FR-001,FR-003 --integration
```

### 5. Progress Tracking

Update progress regularly:
```bash
# Daily progress updates
/feature-status --summary

# Update completion percentages
/feature-status FR-001 --update-progress=60
```

## Troubleshooting Workflow Issues

### Common Workflow Problems

1. **Phase Dependencies**: Can't proceed to next phase
   ```bash
   /validate --feature=FR-001 --phase=requirements
   # Fix validation issues before proceeding
   ```

2. **Feature Dependencies**: Can't implement feature due to missing dependencies
   ```bash
   /execute-prp --feature=FR-005 --auto-deps
   ```

3. **Integration Failures**: Features work individually but fail together
   ```bash
   /validate --feature=FR-001,FR-003 --integration --debug
   ```

### Recovery Procedures

1. **Reset Feature Phase**: If a phase fails, reset and retry
   ```bash
   /execute-prp --feature=FR-001 --phase=design --reset
   ```

2. **Rollback Feature**: If implementation fails, rollback to previous phase
   ```bash
   /feature-status FR-001 --rollback-to=design
   ```

3. **Regenerate Phase**: If phase output is corrupted, regenerate
   ```bash
   /execute-prp --feature=FR-001 --phase=tasks --regenerate
   ```

## Conclusion

The dual-level workflow ensures systematic development at both project and feature levels. By following this workflow, you maintain consistency, quality, and traceability throughout the development process.

Key success factors:
- Complete each phase before proceeding
- Validate frequently at all levels
- Manage dependencies carefully
- Track progress regularly
- Use integration testing to ensure system cohesion

The Feature Request Decomposition System's workflow is designed to scale from simple projects with a few features to complex systems with dozens of interdependent features, while maintaining the same systematic approach throughout.