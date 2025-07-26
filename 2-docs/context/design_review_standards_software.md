# Design & Task Review Standards

## 1. Coding Standards Template

### Code Style Requirements
- **Python Projects**: Follow PEP 8, use Black formatter, type hints required
- **JavaScript/TypeScript**: Follow ESLint rules, Prettier formatting, strict TypeScript
- **Documentation**: Docstrings for all public functions, README for each module
- **Error Handling**: Explicit error handling, no silent failures
- **Testing**: Minimum 80% code coverage, test files mirror source structure

### Code Organization Standards
- **File Structure**: Clear separation of concerns, max 500 lines per file
- **Naming**: Descriptive variable/function names, consistent naming patterns
- **Dependencies**: Minimal external dependencies, explicitly documented
- **Configuration**: Environment-specific configs, no hardcoded values

## 2. Design Checklist Template

### Interface Consistency Review
- [ ] All features use compatible data structures
- [ ] API endpoints follow consistent naming patterns
- [ ] Database schemas are normalized and consistent
- [ ] Error response formats are standardized
- [ ] Configuration patterns are uniform across features

### Dependency Analysis
- [ ] Feature boundaries are clearly defined
- [ ] Dependencies flow in one direction (no circular dependencies)
- [ ] Each feature can be developed independently
- [ ] Integration points are explicitly documented
- [ ] Shared components are identified and properly abstracted

### Implementation Coherence
- [ ] Task lists follow similar patterns and granularity
- [ ] Technology choices are consistent across features
- [ ] Architecture patterns are applied uniformly
- [ ] Performance requirements are addressed consistently

## 3. Integration Mapping Requirements

### Data Flow Mapping
- **Input/Output Specification**: What data each feature receives and produces
- **State Dependencies**: Which features depend on state from other features
- **Event Triggers**: What events cause features to interact
- **Error Propagation**: How errors flow between features

### Interface Documentation
- **API Contracts**: Explicit interfaces between features
- **Database Schemas**: Shared tables and relationships
- **Configuration Dependencies**: Shared configuration requirements
- **Testing Interfaces**: How features will be tested together

## 4. Naming Conventions Standards

### Code Naming
- **Variables**: snake_case for Python, camelCase for JavaScript
- **Functions**: verb_noun pattern (get_user, calculateTotal)
- **Classes**: PascalCase, descriptive nouns (UserManager, PaymentProcessor)
- **Constants**: UPPER_SNAKE_CASE

### Project Naming
- **Features**: FR-XXX-descriptive-name (FR-001-user-authentication)
- **Files**: lowercase-with-hyphens.extension
- **Directories**: lowercase_with_underscores
- **Database**: snake_case for tables and columns

### Documentation Naming
- **Documents**: Title Case for headings, sentence case for content
- **IDs**: kebab-case for HTML/markdown IDs
- **Variables in templates**: [UPPER_SNAKE_CASE] for placeholders

## 5. Additional Standards

### Security Standards
- **Authentication**: Consistent auth patterns across features
- **Authorization**: Role-based access control standards
- **Data Validation**: Input sanitization and validation rules
- **Secrets Management**: No secrets in code, environment variable patterns

### Performance Standards
- **Response Times**: Maximum acceptable response times per feature type
- **Resource Usage**: Memory and CPU limits for each feature
- **Caching Strategy**: When and how to implement caching
- **Database Optimization**: Query optimization and indexing standards

### Accessibility Standards
- **UI Components**: WCAG 2.1 AA compliance for all user interfaces
- **API Design**: RESTful design principles, clear error messages
- **Documentation**: Plain language, clear examples

## 6. Additional Design/Task Review Ideas

### Automated Validation
- **Code Quality Gates**: Automated checks for style, complexity, coverage
- **Dependency Scanning**: Automated security and license compliance
- **Performance Benchmarks**: Automated performance regression testing

### Review Process Enhancement
- **Peer Review**: Each feature design reviewed by another team member
- **Architecture Review**: Complex features reviewed by senior architect
- **User Experience Review**: UI/UX features reviewed by design team

### Documentation Quality
- **Decision Records**: Document architectural decisions and rationale
- **Change Log**: Track changes and their impact on other features
- **Troubleshooting Guides**: Common issues and resolution steps