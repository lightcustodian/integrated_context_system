# QA Command

## Purpose
Production readiness validation for the complete project

## Usage
```bash
.claude qa
```

## Prerequisites
- All prototypes completed through implement command
- Optional: Optimize and document commands completed

## Implementation Steps

### Step 1: Load Agents
**State Update**: Update .claude/state/session.json:
- current_command: "qa"
- current_step: 1
- step_name: "load_agents"
- last_updated: [TIMESTAMP]

**Implementation**:
1. Load STATE_MANAGER agent
2. Load PROJECT_MANAGER agent
3. Load TESTER agent
4. Load REVIEWER agent (critical review specialist)
5. Confirm all agents are ready for comprehensive validation

### Step 2: Documentation Review
**State Update**: Update .claude/state/session.json:
- current_step: 2
- step_name: "documentation_review"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Internal Documentation**: 
   - Fully ingest all files in docs/internal/
   - Load existing_project.md if present
   - Review quality standards and acceptance criteria
2. **External Documentation**:
   - Read docs/external/.index.md for documentation overview
   - Selectively load testing best practices for technology stack
   - Load security and performance standards documentation
3. Document available quality benchmarks and standards

### Step 3: MCP Integration
**State Update**: Update .claude/state/session.json:
- current_step: 3
- step_name: "mcp_integration"
- last_updated: [TIMESTAMP]

**Implementation**:
1. Request comprehensive testing capabilities
2. Request: "Need: file_operations, testing_framework, security_tools, performance_tools, version_control"
3. **For Web Projects**: Add "web_automation" capability for comprehensive browser testing
4. Add specific tools for security scanning, load testing, code analysis
5. Confirm all required tools are available

### Step 4: Security Audit
**State Update**: Update .claude/state/session.json:
- current_step: 4
- step_name: "security_audit"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Git Safety**: Create pre-audit commit
   - Run `git status` and `git diff` to understand current state
   - Create commit: "[QA]: Pre-security audit checkpoint - Baseline preserved"
2. **Vulnerability Scanning**: Automated security vulnerability detection
3. **Dependency Audit**: Check for known security issues in dependencies
4. **Input Validation**: Verify all user inputs are properly validated
5. **Authentication/Authorization**: Validate access controls and permissions
6. **Data Protection**: Ensure sensitive data is properly protected
7. **Security Best Practices**: Code review for security anti-patterns
8. **REVIEWER**: Critical review of security assumptions and implementations
9. **Git Security**: Commit any security fixes
   - Create commit: "[QA]: Security audit fixes - Vulnerabilities addressed"

### Step 5: Performance Validation
**State Update**: Update .claude/state/session.json:
- current_step: 5
- step_name: "performance_validation"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Load Testing**: Validate performance under expected load
2. **Stress Testing**: Determine breaking points and failure modes
3. **Resource Usage**: Monitor memory, CPU, and storage usage
4. **Response Time**: Validate acceptable response times for all operations
5. **Comprehensive Web Performance Testing** (for web projects):
   - Full user journey testing with Puppeteer
   - Cross-browser compatibility checks (Chrome, Firefox, Safari, Edge)
   - Mobile responsiveness verification across device sizes
   - Accessibility validation and screen reader compatibility
   - Performance metrics capture (Core Web Vitals, LCP, FID, CLS)
   - Error handling and edge case testing in browser environment
   - Load testing through browser automation
   - Network throttling tests (slow 3G, fast 3G, 4G)
   - JavaScript error detection and handling validation
6. **Scalability Testing**: Ensure system can handle growth
7. **Performance Benchmarks**: Establish baseline metrics for future comparison

### Step 6: Integration Testing
**State Update**: Update .claude/state/session.json:
- current_step: 6
- step_name: "integration_testing"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Cross-Prototype Integration**: Validate all prototypes work together
2. **External System Integration**: Test connections to databases, APIs, services
3. **Data Flow Testing**: Validate data moves correctly between components
4. **Error Propagation**: Ensure errors are handled properly across boundaries
5. **Transaction Testing**: Validate ACID properties and rollback scenarios
6. **End-to-End Workflows**: Test complete user journeys across all prototypes
7. **Git Integration**: Commit any integration fixes
   - Create commit: "[QA]: Integration fixes - Cross-component issues resolved"

### Step 7: Test Coverage Analysis
**State Update**: Update .claude/state/session.json:
- current_step: 7
- step_name: "test_coverage_analysis"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Code Coverage**: Measure test coverage across all prototypes
2. **Feature Coverage**: Ensure all features have appropriate test coverage
3. **Edge Case Coverage**: Validate edge cases and error conditions are tested
4. **Regression Testing**: Run full test suite to ensure no regressions
5. **Test Quality**: Review test effectiveness and maintainability
6. **Coverage Target**: Achieve appropriate level of coverage for production readiness

### Step 8: Documentation Completeness Check
**State Update**: Update .claude/state/session.json:
- current_step: 8
- step_name: "documentation_completeness_check"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Completeness Check**: Verify all features and functionality are documented
2. **Accuracy Validation**: Ensure documentation matches actual behavior
3. **User Experience**: Test documentation with fresh perspective
4. **Technical Documentation**: Validate architecture and API documentation
5. **Installation Testing**: Follow setup instructions from scratch
6. **REVIEWER**: Critical review of documentation gaps and assumptions

### Step 9: Deployment Readiness Check
**State Update**: Update .claude/state/session.json:
- current_step: 9
- step_name: "deployment_readiness_check"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Environment Configuration**: Validate production environment setup
2. **Deployment Process**: Test deployment procedures and rollback
3. **Monitoring Setup**: Ensure logging, monitoring, and alerting are configured
4. **Backup Procedures**: Validate backup and disaster recovery processes
5. **Performance Monitoring**: Set up performance monitoring and alerting
6. **Health Checks**: Implement and test system health monitoring

### Step 10: Final Production Approval
**State Update**: Update .claude/state/session.json:
- current_step: 10
- step_name: "final_approval"
- project_qa_status: "pending_approval"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **REVIEWER**: Comprehensive critical review of entire system
2. **Risk Assessment**: Identify and document remaining risks
3. **Go-Live Checklist**: Create final deployment checklist
4. **Success Metrics**: Define post-deployment success criteria
5. **Git Production Ready**: Final production-ready commit
   - Create commit: "[QA]: Production ready - All QA validation complete"
6. Generate response_[date]_[time]_qa.md with:
   - Security audit results
   - Performance validation results
   - Test coverage metrics
   - Integration test results
   - Documentation review findings
   - Production readiness assessment
   - Recommended next steps

## Inputs
- All completed prototypes
- All tests and documentation
- .claude/state/session.json for project context
- Production environment specifications

## Outputs
- Complete security audit report
- Performance validation report
- Test coverage analysis
- Integration test results
- Production readiness assessment
- Go-live checklist and procedures
- response_[date]_[time]_qa.md for human approval

## Outputs
- Complete security audit report with vulnerability assessment
- Performance validation report with load testing results
- Integration test results across all prototypes
- Test coverage analysis with recommendations
- Production readiness assessment and go-live checklist
- `response_[date]_[time]_qa.md` for human approval

## Success Criteria
- Security vulnerabilities identified and addressed
- Performance meets requirements under expected load
- All integration points function correctly
- Test coverage meets production standards
- Git commits created for all major validation checkpoints
- Comprehensive web validation completed successfully (for web projects):
  - Full user journey testing across all browsers
  - Mobile responsiveness verified on multiple device sizes
  - Accessibility compliance validated
  - Core Web Vitals meet performance standards
  - No critical JavaScript errors in production scenarios
- Documentation enables successful deployment and operation
- System is ready for production deployment
- Human approves production readiness
- **Validation Gate**: System ready for real users and production load

## Recovery Support
If command interrupted:
- Check `.claude/state/session.json` for last completed step (1-10)
- Resume from interrupted step with STATE_MANAGER context restoration
- Validate previous work before proceeding:
  - Step 1: Verify agent loading
  - Step 2: Check documentation review status
  - Step 3: Re-establish MCP connections if needed
  - Step 4: Check security audit progress and vulnerability scan results
  - Step 5: Review performance testing results and benchmarks
  - Step 6: Validate integration testing completion across prototypes
  - Step 7: Confirm test coverage analysis and gap identification
  - Step 8: Check documentation completeness review
  - Step 9: Verify deployment readiness checklist status
  - Step 10: Review final approval status and remaining issues
- **QA Recovery**: Resume from specific validation area being assessed
- **Critical Issue Recovery**: Address any blocking security or performance issues
- Re-load required agents and restore validation context
- Continue from exact interruption point without repeating completed validations