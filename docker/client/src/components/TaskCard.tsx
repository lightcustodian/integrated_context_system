import React from 'react';
import { Task } from '../store/taskSlice';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  isDragging: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isDragging }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const getAssigneeIcon = (assignedTo: string) => {
    switch (assignedTo) {
      case 'human': return '👤';
      case 'claude': return '🤖';
      case 'automated': return '⚙️';
      default: return '❓';
    }
  };

  return (
    <div className={`task-card ${isDragging ? 'dragging' : ''}`}>
      <div className="task-header">
        <span 
          className="task-priority"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
          title={`${task.priority} priority`}
        />
        <span className="task-assignee" title={`Assigned to ${task.assigned_to}`}>
          {getAssigneeIcon(task.assigned_to)}
        </span>
      </div>
      
      <h4 className="task-title">{task.title}</h4>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      {(task.estimated_hours || task.actual_hours) && (
        <div className="task-footer">
          {task.estimated_hours && (
            <span className="task-hours" title="Estimated hours">
              ⏱️ {task.estimated_hours}h
            </span>
          )}
          {task.actual_hours && (
            <span className="task-hours actual" title="Actual hours">
              ✓ {task.actual_hours}h
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;