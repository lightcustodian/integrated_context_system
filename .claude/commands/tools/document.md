# Document Command

## Purpose
Generate comprehensive documentation for completed prototypes

## Key Features
- User documentation generation with guides and tutorials
- Technical documentation including API and architecture details
- Installation and setup instruction creation
- Troubleshooting guide development
- Maintenance documentation for ongoing operations

## Inputs
- Completed prototype from implement command (specified or most recent)
- `.claude/state/session.json` for prototype status and progress tracking
- Existing basic documentation from implement phase
- Prototype code, tests, and architecture for technical accuracy

## Implementation Steps

### Step 1: Load Agents and Target Selection
**State Update**: Update .claude/state/session.json:
- current_command: "document"
- current_step: 1
- step_name: "load_agents_and_target"
- current_prototype: [PROTOTYPE_NAME]
- last_updated: [TIMESTAMP]

**Implementation**:
1. Load STATE_MANAGER agent
2. Load PROJECT_MANAGER agent
3. Load CODER agent (for technical accuracy)
4. Load CONTENT_SUMMARIZER agent (for documentation synthesis)
5. Identify target prototype for documentation
6. Review existing prototype code and structure

### Step 2: Documentation Review
**State Update**: Update .claude/state/session.json:
- current_step: 2
- step_name: "documentation_review"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Internal Documentation**: 
   - Fully ingest all files in docs/internal/
   - Load existing_project.md if present
   - Review existing prototype documentation
2. **External Documentation**:
   - Read docs/external/.index.md for documentation overview
   - Selectively load relevant style guides and documentation standards
   - Load framework-specific documentation guidelines
3. Document available documentation patterns and standards

### Step 3: MCP Integration
**State Update**: Update .claude/state/session.json:
- current_step: 3
- step_name: "mcp_integration"
- last_updated: [TIMESTAMP]

**Implementation**:
1. Request documentation capabilities
2. Request: "Need: file_operations, version_control, documentation_tools"
3. Add diagram and visualization tools if available
4. Confirm all required tools are available

### Step 4: User Documentation Generation
**State Update**: Update .claude/state/session.json:
- current_step: 4
- step_name: "user_documentation_generation"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Getting Started Guide**: How to set up and use the prototype
2. **Feature Documentation**: Detailed explanation of all features
3. **Usage Examples**: Common use cases with step-by-step instructions
4. **FAQ Section**: Anticipated user questions and troubleshooting
5. **Screenshots/Diagrams**: Visual aids for complex processes
6. **User Workflows**: End-to-end process documentation
7. **CONTENT_SUMMARIZER**: Create executive summary of user documentation

### Step 5: Technical Documentation
**State Update**: Update .claude/state/session.json:
- current_step: 5
- step_name: "technical_documentation"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **API Documentation**: Complete API reference with examples
2. **Architecture Documentation**: System design and component relationships
3. **Database Schema**: Data models, relationships, and constraints  
4. **Code Documentation**: Inline comments and module explanations
5. **Configuration Reference**: All settings and environment variables
6. **Integration Points**: How this prototype connects to other systems
7. **CONTENT_SUMMARIZER**: Create technical overview document

### Step 6: Installation and Setup Instructions
**State Update**: Update .claude/state/session.json:
- current_step: 6
- step_name: "installation_setup_instructions"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Prerequisites**: Required software, versions, and dependencies
2. **Installation Guide**: Step-by-step setup process
3. **Configuration**: How to configure for different environments
4. **Environment Setup**: Development, staging, and production setup
5. **Docker/Deployment**: Containerization and deployment instructions
6. **Testing Setup**: How to run tests and validation

### Step 7: Troubleshooting Guides
**State Update**: Update .claude/state/session.json:
- current_step: 7
- step_name: "troubleshooting_guides"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Common Issues**: Known problems and their solutions
2. **Error Messages**: Explanation of error messages and fixes
3. **Performance Issues**: How to diagnose and resolve performance problems
4. **Debug Information**: How to gather diagnostic information
5. **Support Resources**: Where to get help and additional information
6. **Recovery Procedures**: How to recover from failures

### Step 8: Maintenance Documentation
**State Update**: Update .claude/state/session.json:
- current_step: 8
- step_name: "maintenance_documentation"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Regular Maintenance Tasks**: Scheduled maintenance procedures
2. **Backup Procedures**: How to backup and restore the system
3. **Update Procedures**: How to update components safely
4. **Monitoring**: What to monitor and how to respond
5. **Security Updates**: How to apply security patches
6. **Performance Tuning**: Ongoing optimization procedures

### Step 9: Documentation Validation and Packaging
**State Update**: Update .claude/state/session.json:
- current_step: 9
- step_name: "documentation_validation_packaging"
- last_updated: [TIMESTAMP]

**Implementation**:
1. **Consistency Check**: Ensure all documentation is consistent
2. **Completeness Review**: Verify all features are documented
3. **Code Examples Testing**: Validate all code examples work
4. **Link Validation**: Check all cross-references and links
5. **Format Documentation**: Apply consistent formatting
6. **Package Documentation**: Organize into deliverable structure
7. **CONTENT_SUMMARIZER**: Create master documentation index

### Step 10: Command Approval
**State Update**: Update .claude/state/session.json:
- current_step: 10
- step_name: "command_approval"
- last_updated: [TIMESTAMP]

**Implementation**:
1. Generate response_[date]_[time]_document.md with:
   - Documentation coverage summary
   - User documentation highlights
   - Technical documentation overview
   - Installation guide summary
   - Troubleshooting resources
   - Maintenance procedures
2. Wait for approval_[date]_[time]_document.md from human

## Inputs
- DESIGN_PLAN.md for technology context
- Completed prototype code and tests
- .claude/state/session.json for current progress
- Existing documentation from implement phase

## Outputs
- Complete user documentation suite
- Technical documentation including API reference
- Installation and setup guides
- Troubleshooting documentation
- Maintenance procedures
- Documentation index and navigation
- response_[date]_[time]_document.md for human approval

## Success Criteria
- All features documented from user perspective
- Technical documentation accurate and complete
- Installation instructions validated
- Troubleshooting covers common issues
- Documentation follows consistent format
- All code examples tested and working
- Human approval received

## Recovery Support
If command interrupted:
- Check `.claude/state/session.json` for last completed step (1-10)
- Resume from interrupted step with STATE_MANAGER context restoration
- Validate previous work before proceeding:
  - Step 1: Verify agent loading and target selection
  - Step 2: Check documentation review status
  - Step 3: Re-establish MCP connections if needed
  - Step 4: Review user documentation completeness
  - Step 5: Check technical documentation progress
  - Step 6: Verify installation guide status
  - Step 7: Review troubleshooting guide completeness
  - Step 8: Check maintenance documentation
  - Step 9: Verify validation and packaging status
  - Step 10: Check approval file generation
- **Documentation Recovery**: Resume from specific documentation section
- Re-load required agents and restore documentation context
- Continue from exact interruption point without losing progress