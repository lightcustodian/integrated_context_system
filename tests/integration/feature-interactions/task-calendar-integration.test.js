/**
 * Integration Test: Task and Calendar Integration
 * Features: FR-001, FR-003
 * 
 * This test verifies that tasks created in the task management feature
 * correctly appear in the calendar view feature.
 */

import { createTask } from '../../src/features/task-management';
import { getDailyCalendarView } from '../../src/features/calendar-view';

describe('Task and Calendar Integration', () => {
  beforeAll(() => {
    // Initialize task and calendar features
  });

  afterAll(() => {
    // Clean up test data
  });

  beforeEach(() => {
    // Reset state before each test
  });

  afterEach(() => {
    // Clean up after each test
  });

  describe('Feature Interactions', () => {
    test('Task created with due date appears in daily calendar', () => {
      // Create a task with today's date
      const today = new Date();
      const taskId = createTask({
        title: 'Integration Test Task',
        description: 'This task should appear in calendar',
        dueDate: today
      });
      
      // Get daily calendar view for today
      const calendarView = getDailyCalendarView(today);
      
      // Verify task appears in calendar
      const calendarTask = calendarView.tasks.find(task => task.id === taskId);
      expect(calendarTask).toBeDefined();
      expect(calendarTask.title).toBe('Integration Test Task');
    });

    test('Task updated in task management reflects in calendar', () => {
      // Create a task
      const today = new Date();
      const taskId = createTask({
        title: 'Original Task Title',
        description: 'This task will be updated',
        dueDate: today
      });
      
      // Update the task
      updateTask(taskId, {
        title: 'Updated Task Title'
      });
      
      // Get daily calendar view
      const calendarView = getDailyCalendarView(today);
      
      // Verify updated task appears in calendar
      const calendarTask = calendarView.tasks.find(task => task.id === taskId);
      expect(calendarTask).toBeDefined();
      expect(calendarTask.title).toBe('Updated Task Title');
    });
  });

  describe('Data Flow', () => {
    test('Task data is correctly passed to calendar', () => {
      // Create a task with specific data
      const today = new Date();
      const taskData = {
        title: 'Data Flow Test Task',
        description: 'Testing data flow between features',
        dueDate: today,
        priority: 'high',
        tags: ['integration', 'test']
      };
      
      const taskId = createTask(taskData);
      
      // Get daily calendar view
      const calendarView = getDailyCalendarView(today);
      
      // Verify all task data is correctly passed to calendar
      const calendarTask = calendarView.tasks.find(task => task.id === taskId);
      expect(calendarTask).toBeDefined();
      expect(calendarTask.title).toBe(taskData.title);
      expect(calendarTask.description).toBe(taskData.description);
      expect(calendarTask.priority).toBe(taskData.priority);
      expect(calendarTask.tags).toEqual(taskData.tags);
    });
  });

  describe('State Management', () => {
    test('Deleting a task removes it from calendar', () => {
      // Create a task
      const today = new Date();
      const taskId = createTask({
        title: 'Task to Delete',
        description: 'This task will be deleted',
        dueDate: today
      });
      
      // Verify task appears in calendar
      let calendarView = getDailyCalendarView(today);
      let calendarTask = calendarView.tasks.find(task => task.id === taskId);
      expect(calendarTask).toBeDefined();
      
      // Delete the task
      deleteTask(taskId);
      
      // Verify task is removed from calendar
      calendarView = getDailyCalendarView(today);
      calendarTask = calendarView.tasks.find(task => task.id === taskId);
      expect(calendarTask).toBeUndefined();
    });
  });
});
