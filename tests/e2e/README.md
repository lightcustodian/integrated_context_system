# End-to-End Tests

This directory contains end-to-end tests that verify complete user journeys through the application. These tests ensure that the entire system works correctly from a user perspective.

## Purpose

End-to-end tests are the highest level of testing and verify that:

1. Complete user workflows function correctly
2. The system works as a cohesive whole
3. All features integrate properly in real-world scenarios
4. The user experience meets requirements

## Test Structure

Each E2E test should:

1. Simulate a real user journey
2. Test multiple features working together
3. Verify expected outcomes from a user perspective
4. Cover critical paths through the application

## Example E2E Scenarios

- **Task Management Journey**: Create, organize, update, and complete tasks
- **Calendar Planning Journey**: Create tasks, view in different calendar views, reschedule
- **Time Tracking Journey**: Create tasks, track time, generate reports
- **Mobile Usage Journey**: Use the application across different device sizes

## Running E2E Tests

E2E tests can be run using:

```
/validate --e2e
```

## Writing E2E Tests

E2E tests should:

1. Focus on user journeys, not implementation details
2. Test the application as a black box
3. Verify what a user would see and experience
4. Cover critical business workflows
