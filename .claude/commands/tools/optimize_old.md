# Optimize Command

## Purpose
Improve performance, code quality, and architecture of completed prototypes

## Key Features
- Performance analysis and bottleneck identification
- Code quality improvement through refactoring and design patterns
- Architecture refinement for scalability and maintainability
- Resource optimization for memory, CPU, and storage efficiency
- User experience enhancement through speed and usability improvements

## Inputs
- Completed prototype from implement command (specified or most recent)
- `.claude/state/session.json` for prototype status and progress tracking
- Existing prototype code, tests, and documentation

## Implementation

### Step 1: Load Agents and Target Selection
**Purpose**: Initialize required agents and select target prototype for optimization

**Inputs**: 
- `.claude/state/session.json` for completed prototype status
- Prototype specification (user-provided or most recent complete)

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_command="optimize", current_step=1, step_name="load_agents_target"
2. Load STATE_MANAGER agent
3. Load PROJECT_MANAGER agent
4. Load CODER agent for code analysis and refactoring
5. Load TESTER agent for validation
6. Identify target prototype for optimization (specified or most recent complete)
7. Validate prototype exists and is marked complete

**Outputs**: 
- Required agents loaded and ready
- Target prototype identified and validated
- Updated state with optimization target

**Success Criteria**: 
- All required agents successfully loaded
- Target prototype confirmed complete and ready for optimization
- State properly updated with optimization context

### Step 2: Documentation Review
**Purpose**: Review internal and external documentation for optimization context

**Inputs**: 
- docs/internal/ directory contents
- docs/external/ directory contents

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=2, step_name="documentation_review"
2. **Internal Documentation**: 
   - Fully ingest all files in docs/internal/
   - Load existing_project.md if present
   - Review previous optimization notes or performance requirements
3. **External Documentation**:
   - Read docs/external/.index.md for documentation overview
   - Selectively load performance optimization guides for technology stack
   - Load best practices documentation for current tech stack
4. Document available optimization resources and guidelines

**Outputs**: 
- Internal documentation fully loaded
- Relevant optimization guides identified
- Context established for optimization work

**Success Criteria**: 
- All internal documentation ingested
- Relevant optimization resources cataloged
- Performance guidelines understood

### Step 3: MCP Integration
**Purpose**: Establish required external tool capabilities for optimization work

**Inputs**: 
- Technology stack from target prototype
- Optimization requirements (performance tools, profiling, analysis)

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=3, step_name="mcp_integration"
2. Request optimization-specific capabilities
3. Request: "Need: file_operations, version_control, testing_framework, performance_tools"
4. **For Web Projects**: Add "web_automation" capability for performance validation
5. Add profiling and analysis tools based on technology stack
6. Establish connections to optimization and monitoring tools
7. Confirm all required tools are available

**Outputs**: 
- MCP connections established for optimization work
- Performance and profiling tools ready
- Updated state with MCP integration status

**Success Criteria**: 
- All required optimization capabilities successfully connected
- Performance analysis tools accessible
- No blocking tool failures
- Integration ready for optimization work

### Step 4: Performance Analysis
**Purpose**: Analyze current performance and identify optimization opportunities

**Inputs**: 
- Current prototype code and architecture
- Performance requirements and benchmarks

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=4, step_name="performance_analysis"
2. **Performance Profiling**:
   - Run performance profiling tools
   - Identify bottlenecks and slow operations
   - Analyze memory usage patterns
   - Review database query performance (if applicable)
3. **Code Quality Analysis**:
   - Identify code smells and anti-patterns
   - Review architectural decisions
   - Analyze complexity metrics
4. **Resource Usage Analysis**:
   - Monitor CPU usage patterns
   - Analyze memory allocation and leaks
   - Review network and I/O operations
5. Create prioritized optimization opportunities list

**Outputs**: 
- Performance profile report
- Bottleneck identification list
- Code quality metrics
- Prioritized optimization plan

**Success Criteria**: 
- Performance bottlenecks clearly identified
- Code quality issues documented
- Optimization priorities established
- Baseline metrics recorded

### Step 5: Optimization Implementation
**Purpose**: Implement identified optimizations while maintaining functionality

**Inputs**: 
- Prioritized optimization plan from Step 4
- Current code and test suite

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=5, step_name="optimization_implementation"
2. **Git Safety**: Create pre-optimization commit
   - Run `git status` and `git diff` to understand current state
   - Create commit: "[Optimize]: Pre-optimization checkpoint - Baseline preserved"
3. For each optimization in priority order:
   - **Git Checkpoint**: Commit before optimization
     - Create commit: "[Optimize]: Starting [OPTIMIZATION_NAME] - Pre-change checkpoint"
   - **CODER**: Implement optimization
   - **TESTER**: Verify functionality preserved
   - **TESTER**: Measure performance improvement
   - **Git Success**: Commit successful optimization
     - Create commit: "[Optimize]: [OPTIMIZATION_NAME] - Completed with [X%] improvement"
   - Document optimization changes
3. **Optimization Types**:
   - Algorithm improvements
   - Database query optimization
   - Caching implementation
   - Code refactoring for efficiency
   - Resource pooling and reuse
   - Async/parallel processing where appropriate
4. After each optimization:
   - Run full test suite
   - Compare performance metrics
   - Document improvements

**Outputs**: 
- Optimized code implementation
- Performance improvement metrics
- Updated documentation
- All tests passing

**Success Criteria**: 
- Measurable performance improvements
- No functionality regression
- Code quality enhanced
- Documentation updated

### Step 6: Validation and Benchmarking
**Purpose**: Validate optimizations and establish new performance benchmarks

**Inputs**: 
- Optimized prototype code
- Original performance baseline

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=6, step_name="validation_benchmarking"
2. **TESTER**: Run complete test suite
3. **Performance Benchmarking**:
   - Run performance tests
   - Compare with baseline metrics
   - Document improvement percentages
4. **Web Performance Validation** (for web projects):
   - Launch browser and measure page load times
   - Capture performance metrics (First Contentful Paint, Largest Contentful Paint, etc.)
   - Test user interactions for response times
   - Check for console warnings about performance issues
   - Verify optimizations don't break functionality in browser
   - Compare before/after browser performance metrics
5. **Load Testing** (if applicable):
   - Test under expected load
   - Verify scalability improvements
6. **User Experience Testing**:
   - Measure response times
   - Validate UI responsiveness
7. **Git Final**: Commit completed optimizations
   - Create commit: "[Optimize]: All optimizations complete - [X%] overall improvement"
8. Create optimization report

**Outputs**: 
- Complete test results
- Performance comparison report
- Optimization success metrics
- Updated benchmarks

**Success Criteria**: 
- All tests passing
- Performance improvements verified
- No functionality degradation
- Benchmarks documented

### Step 7: Command Approval
**Purpose**: Generate approval file and wait for human approval

**Inputs**: 
- Optimization results from Steps 4-6
- Performance improvement metrics

**Implementation**: 
1. **STATE_MANAGER**: Update state - current_step=7, step_name="command_approval"
2. Generate `response_[date]_[time]_optimize.md` including:
   - Performance improvements summary
   - Code quality enhancements
   - Resource usage optimizations
   - Before/after metrics comparison
   - Test results
   - Recommendations for further optimization
3. Wait for `approval_[date]_[time]_optimize.md` from human

**Outputs**: 
- `response_[date]_[time]_optimize.md` for human review
- State updated with approval pending status

**Success Criteria**: 
- Comprehensive optimization report generated
- Human reviews and approves optimizations
- Permission granted to finalize optimization

## Outputs
- Optimized prototype with improved performance and code quality
- Performance benchmarks and improvement metrics
- Updated technical documentation reflecting optimizations
- All tests passing with enhanced performance
- `response_[date]_[time]_optimize.md` for human approval

## Success Criteria
- Measurable performance improvements in key metrics
- Code quality enhanced without breaking functionality
- All tests passing with improved performance
- Git commits created for all optimization checkpoints (minimum 2 per optimization)
- Web performance validation completed successfully (for web projects):
  - Faster page load times measured and documented
  - Improved browser performance metrics
  - No functionality regression in browser environment
- Documentation updated with optimization details
- Human approval received for optimizations
- State properly tracks optimization progress

## Recovery Support
If command interrupted:
- Check `.claude/state/session.json` for last completed step (1-7)
- Resume from interrupted step with STATE_MANAGER context restoration
- Validate previous work before proceeding:
  - Step 1: Verify agent loading and target selection
  - Step 2: Check documentation review status
  - Step 3: Re-establish MCP connections if needed
  - Step 4: Review performance analysis completeness
  - Step 5: Check optimization implementation progress
  - Step 6: Verify validation and benchmarking status
  - Step 7: Check approval file generation
- **Optimization Recovery**: Resume from specific optimization being implemented
- Re-load required agents and restore optimization context
- Continue from exact interruption point without losing progress