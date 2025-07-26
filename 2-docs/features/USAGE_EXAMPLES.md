# Feature Decomposition Usage Examples

## Overview

This document provides practical examples of using the Feature Request Decomposition System for different types of projects. Each example shows the complete workflow from project planning to feature implementation.

## Example 1: Simple Todo Application

### Project Setup

**PLANNING.md**:
```markdown
# Simple Todo Application

## Project Overview
A basic todo list application for personal task management.

## Core Features
- Add new todos
- Mark todos as complete
- Delete todos
- View todo list

## Technical Requirements
- Frontend: HTML/CSS/JavaScript
- Storage: LocalStorage
- Responsive design

## Project Complexity
Low - Simple CRUD operations with local storage
```

### Feature Decomposition

```bash
# Initialize project
/init-context simple-todo

# Create feature-decomposed PRP
/create-prp simple-todo --complexity=low --features=auto
```

**Generated Features**:
```
FR-001: Basic Todo CRUD
├── User can add new todos
├── User can view todo list
├── User can mark todos complete
└── User can delete todos

FR-002: Todo Persistence
├── Save todos to LocalStorage
├── Load todos on app start
└── Handle storage errors

FR-003: Responsive UI
├── Mobile-friendly layout
├── Touch-friendly interactions
└── Responsive design patterns
```

### Implementation Workflow

```bash
# Implement features in dependency order
/execute-prp --feature=FR-001
/validate --feature=FR-001

/execute-prp --feature=FR-002
/validate --feature=FR-002

/execute-prp --feature=FR-003
/validate --feature=FR-003

# Run integration tests
/validate --integration

# Check final status
/feature-status --summary
```

**Expected Output**:
```
✅ FR-001: Basic Todo CRUD (100% complete)
✅ FR-002: Todo Persistence (100% complete)  
✅ FR-003: Responsive UI (100% complete)

Overall Progress: 100%
Integration Tests: 3/3 passing
```

## Example 2: E-commerce Product Catalog

### Project Setup

**PLANNING.md**:
```markdown
# E-commerce Product Catalog

## Project Overview
A product catalog system for an online store with search, filtering, and shopping cart functionality.

## Core Features
- Product browsing and search
- Product categories and filtering
- Shopping cart management
- User accounts and authentication
- Order processing

## Technical Requirements
- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT
- Payment: Stripe integration

## Project Complexity
Medium - Multiple interconnected features with user management and payment processing
```

### Feature Decomposition

```bash
# Initialize project
/init-context ecommerce-catalog

# Create feature-decomposed PRP
/create-prp ecommerce-catalog --complexity=medium --features=auto
```

**Generated Features**:
```
FR-001: User Authentication
├── User registration
├── User login/logout
├── Password reset
└── JWT token management

FR-002: Product Management
├── Product CRUD operations
├── Product image handling
├── Product categories
└── Product search

FR-003: Shopping Cart
├── Add/remove items
├── Update quantities
├── Cart persistence
└── Cart calculations
Dependencies: [FR-001]

FR-004: Product Catalog UI
├── Product listing page
├── Product detail page
├── Search interface
└── Category navigation
Dependencies: [FR-002]

FR-005: User Profile
├── Profile management
├── Order history
├── Address management
└── Preferences
Dependencies: [FR-001]

FR-006: Checkout Process
├── Checkout flow
├── Payment integration
├── Order confirmation
└── Email notifications
Dependencies: [FR-001, FR-003]
```

### Implementation Workflow

```bash
# Check dependency order
/feature-status --dependencies

# Implement foundation features first
/execute-prp --feature=FR-001  # User Authentication
/validate --feature=FR-001

/execute-prp --feature=FR-002  # Product Management
/validate --feature=FR-002

# Implement dependent features with auto-deps
/execute-prp --feature=FR-003 --auto-deps  # Shopping Cart (includes FR-001)
/validate --feature=FR-003

/execute-prp --feature=FR-004 --auto-deps  # Product Catalog UI (includes FR-002)
/validate --feature=FR-004

/execute-prp --feature=FR-005 --auto-deps  # User Profile (includes FR-001)
/validate --feature=FR-005

/execute-prp --feature=FR-006 --auto-deps  # Checkout (includes FR-001, FR-003)
/validate --feature=FR-006

# Run comprehensive integration tests
/validate --integration --deep

# Final validation
/validate --all-features --comprehensive
```

**Progress Tracking**:
```bash
# Daily progress check
/feature-status --summary

# Example output after 3 days:
✅ FR-001: User Authentication (100% complete)
✅ FR-002: Product Management (100% complete)
🔄 FR-003: Shopping Cart (75% complete)
⏳ FR-004: Product Catalog UI (0% complete - waiting for FR-002)
⏳ FR-005: User Profile (0% complete - waiting for FR-001)
⏳ FR-006: Checkout Process (0% complete - waiting for dependencies)

Overall Progress: 58%
```

## Example 3: Team Project Management System

### Project Setup

**PLANNING.md**:
```markdown
# Team Project Management System

## Project Overview
A comprehensive project management system for teams with task management, time tracking, reporting, and collaboration features.

## Core Features
- User and team management
- Project and task management
- Time tracking and reporting
- File sharing and collaboration
- Dashboard and analytics
- Real-time notifications
- Mobile app support

## Technical Requirements
- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL
- Real-time: Socket.io
- File Storage: AWS S3
- Authentication: OAuth2 + JWT
- Mobile: React Native

## Project Complexity
High - Complex system with real-time features, file handling, and mobile support
```

### Feature Decomposition

```bash
# Initialize project
/init-context team-project-mgmt

# Create feature-decomposed PRP with high complexity
/create-prp team-project-mgmt --complexity=high --features=auto --max-features=15
```

**Generated Features**:
```
FR-001: User Authentication & Authorization
├── OAuth2 integration
├── JWT token management
├── Role-based permissions
└── Session management

FR-002: User Profile Management
├── Profile CRUD
├── Avatar upload
├── Preferences
└── Account settings
Dependencies: [FR-001]

FR-003: Team Management
├── Team creation/management
├── Member invitations
├── Role assignments
└── Team permissions
Dependencies: [FR-001]

FR-004: Project Management
├── Project CRUD operations
├── Project templates
├── Project permissions
└── Project archiving
Dependencies: [FR-001, FR-003]

FR-005: Task Management
├── Task CRUD operations
├── Task assignments
├── Task dependencies
├── Task priorities
└── Task status workflow
Dependencies: [FR-004]

FR-006: Time Tracking
├── Time entry logging
├── Timer functionality
├── Time approval workflow
└── Time reporting
Dependencies: [FR-005]

FR-007: File Management
├── File upload/download
├── File sharing
├── Version control
└── File permissions
Dependencies: [FR-004]

FR-008: Real-time Notifications
├── WebSocket integration
├── Notification preferences
├── Email notifications
└── Push notifications
Dependencies: [FR-001]

FR-009: Dashboard & Analytics
├── Project dashboards
├── Time analytics
├── Performance metrics
└── Custom reports
Dependencies: [FR-004, FR-005, FR-006]

FR-010: Mobile App Foundation
├── React Native setup
├── Mobile authentication
├── Mobile navigation
└── Offline support
Dependencies: [FR-001]

FR-011: Mobile Task Management
├── Mobile task interface
├── Mobile time tracking
├── Mobile notifications
└── Sync functionality
Dependencies: [FR-005, FR-006, FR-010]

FR-012: API Integration Layer
├── RESTful API design
├── API documentation
├── Rate limiting
└── API versioning
Dependencies: [FR-001]
```

### Phased Implementation Strategy

**Phase 1: Foundation (Weeks 1-2)**
```bash
# Core authentication and user management
/execute-prp --feature=FR-001  # User Authentication
/validate --feature=FR-001

/execute-prp --feature=FR-002  # User Profile Management
/validate --feature=FR-002

/execute-prp --feature=FR-003  # Team Management
/validate --feature=FR-003

# Integration testing for foundation
/validate --feature=FR-001,FR-002,FR-003 --integration
```

**Phase 2: Core Functionality (Weeks 3-4)**
```bash
# Project and task management
/execute-prp --feature=FR-004 --auto-deps  # Project Management
/validate --feature=FR-004

/execute-prp --feature=FR-005 --auto-deps  # Task Management
/validate --feature=FR-005

# Integration testing for core functionality
/validate --feature=FR-004,FR-005 --integration
```

**Phase 3: Enhanced Features (Weeks 5-6)**
```bash
# Time tracking and file management
/execute-prp --feature=FR-006 --auto-deps  # Time Tracking
/validate --feature=FR-006

/execute-prp --feature=FR-007 --auto-deps  # File Management
/validate --feature=FR-007

/execute-prp --feature=FR-008 --auto-deps  # Real-time Notifications
/validate --feature=FR-008

# Integration testing for enhanced features
/validate --feature=FR-006,FR-007,FR-008 --integration
```

**Phase 4: Analytics and Mobile (Weeks 7-8)**
```bash
# Dashboard and mobile foundation
/execute-prp --feature=FR-009 --auto-deps  # Dashboard & Analytics
/validate --feature=FR-009

/execute-prp --feature=FR-010 --auto-deps  # Mobile App Foundation
/validate --feature=FR-010

/execute-prp --feature=FR-012 --auto-deps  # API Integration Layer
/validate --feature=FR-012

# Integration testing for analytics and API
/validate --feature=FR-009,FR-012 --integration
```

**Phase 5: Mobile Completion (Week 9)**
```bash
# Complete mobile implementation
/execute-prp --feature=FR-011 --auto-deps  # Mobile Task Management
/validate --feature=FR-011

# Final comprehensive testing
/validate --all-features --comprehensive --integration
```

### Progress Monitoring

**Weekly Progress Reports**:
```bash
# Week 2 status
/feature-status --summary --progress

# Example output:
✅ FR-001: User Authentication (100% complete)
✅ FR-002: User Profile Management (100% complete)
🔄 FR-003: Team Management (85% complete)
⏳ FR-004: Project Management (0% complete)
⏳ FR-005: Task Management (0% complete)
...

Overall Progress: 23%
Current Phase: Foundation
Estimated Completion: Week 9
```

**Integration Health Monitoring**:
```bash
# Daily integration health check
/validate --integration --summary

# Example output:
Integration Test Results:
✅ User Auth + Profile: 15/15 tests passing
🔄 User Auth + Team Mgmt: 12/15 tests passing (3 failing)
⏳ Project + Task Integration: Not yet tested

Integration Health: 80%
Issues Requiring Attention: 1
```

## Example 4: Converting Existing Single-PRP Project

### Scenario: Existing Blog Platform

**Current State**:
- Single PRP document: `blog-platform-prp.md`
- Monolithic implementation approach
- No feature decomposition

**Migration Process**:

```bash
# Backup existing PRP
cp 2-docs/PRPs/active/blog-platform-prp.md 2-docs/PRPs/archive/

# Convert to feature decomposition
/create-prp blog-platform --convert-existing --complexity=medium

# Review generated features
/feature-status --summary --dependencies
```

**Generated Features from Existing PRP**:
```
FR-001: User Authentication
├── Extracted from "User Management" section
├── Login/logout functionality
└── User registration

FR-002: Blog Post Management
├── Extracted from "Content Management" section
├── Create/edit/delete posts
├── Draft management
└── Post publishing

FR-003: Comment System
├── Extracted from "User Interaction" section
├── Comment CRUD operations
├── Comment moderation
└── Comment notifications
Dependencies: [FR-001, FR-002]

FR-004: Blog Theme System
├── Extracted from "Customization" section
├── Theme selection
├── Custom CSS
└── Layout options
Dependencies: [FR-002]
```

**Implementation Strategy**:
```bash
# Implement in dependency order
/execute-prp --feature=FR-001
/execute-prp --feature=FR-002
/execute-prp --feature=FR-003 --auto-deps
/execute-prp --feature=FR-004 --auto-deps

# Validate migration success
/validate --all-features --migration-check
```

## Command Reference for Examples

### Common Command Patterns

**Project Initialization**:
```bash
# Simple project
/init-context [project-name]
/create-prp [project-name] --complexity=low --features=auto

# Medium complexity project
/create-prp [project-name] --complexity=medium --features=auto --max-features=10

# Complex project with phased approach
/create-prp [project-name] --complexity=high --features=auto --max-features=15
```

**Feature Implementation**:
```bash
# Single feature
/execute-prp --feature=FR-001

# Feature with dependencies
/execute-prp --feature=FR-005 --auto-deps

# Feature phase-by-phase
/execute-prp --feature=FR-001 --phase=requirements
/execute-prp --feature=FR-001 --phase=design
/execute-prp --feature=FR-001 --phase=implementation
```

**Validation and Testing**:
```bash
# Individual feature validation
/validate --feature=FR-001

# Integration testing
/validate --feature=FR-001,FR-003 --integration

# Comprehensive validation
/validate --all-features --comprehensive --integration
```

**Progress Tracking**:
```bash
# Status overview
/feature-status --summary

# Dependency analysis
/feature-status --dependencies

# Progress tracking
/feature-status --progress

# Update feature status
/feature-status FR-001 --update-progress=75
```

## Best Practices from Examples

### 1. Start with Clear Planning
- Define project scope clearly in PLANNING.md
- Include technical requirements and constraints
- Specify user stories and use cases

### 2. Choose Appropriate Complexity
- **Low**: Simple CRUD applications (3-5 features)
- **Medium**: Multi-user applications with integrations (6-12 features)
- **High**: Complex systems with real-time features (12+ features)

### 3. Implement in Phases
- **Foundation Phase**: Authentication, core data models
- **Core Phase**: Primary business functionality
- **Enhancement Phase**: Additional features and integrations
- **Polish Phase**: UI/UX improvements, performance optimization

### 4. Monitor Progress Regularly
- Daily status checks during active development
- Weekly comprehensive progress reviews
- Integration testing after each feature completion

### 5. Use Dependency Management
- Always use `--auto-deps` for complex dependency chains
- Validate dependencies before implementation
- Monitor for circular dependencies

## Troubleshooting Common Issues

### Issue: Too Many Features Generated
```bash
# Solution: Reduce complexity or limit features
/create-prp --complexity=low --max-features=8
```

### Issue: Complex Dependencies
```bash
# Solution: Use auto-dependency resolution
/execute-prp --feature=FR-010 --auto-deps
```

### Issue: Integration Test Failures
```bash
# Solution: Test features individually first
/validate --feature=FR-001 --isolated
/validate --feature=FR-003 --isolated
/validate --feature=FR-001,FR-003 --integration --debug
```

## Conclusion

These examples demonstrate how the Feature Request Decomposition System scales from simple applications to complex enterprise systems. The key to success is:

1. **Proper Planning**: Clear project definition and appropriate complexity setting
2. **Systematic Implementation**: Following dependency order and validation practices
3. **Regular Monitoring**: Tracking progress and addressing issues promptly
4. **Integration Focus**: Ensuring features work together through comprehensive testing

The system adapts to different project types and scales while maintaining the same systematic approach throughout the development process.