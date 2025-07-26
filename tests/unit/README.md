# Unit Tests Directory

This directory contains unit tests for the application.

## File Organization
- One test file per module/component
- Use naming convention: `module-name.test.js`
- Group tests by test type: happy path, edge case, negative case

## Example Structure
```javascript
describe('Module Name - Happy Path Tests', () => {
  test('should perform basic functionality correctly', () => {
    // Arrange
    // Act
    // Assert
  });
});

describe('Module Name - Edge Case Tests', () => {
  test('should handle boundary conditions', () => {
    // Arrange
    // Act
    // Assert
  });
});

describe('Module Name - Negative Case Tests', () => {
  test('should handle invalid input gracefully', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Best Practices
- Follow AAA pattern: Arrange, Act, Assert
- Test one thing per test case
- Use descriptive test names
- Mock external dependencies
- Keep tests independent and isolated
- Aim for 80%+ code coverage

## Integration with BDD
- Unit tests are linked to BDD scenarios via @unit-test-group tags
- Mapping files in `tests/mapping/` directory
- Test groups: happy_path, edge_case, negative_case