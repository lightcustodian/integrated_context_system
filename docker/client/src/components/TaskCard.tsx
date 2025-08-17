import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../store/taskSlice';
import { trpc } from '../api/trpc';
import { emitTaskUpdate } from '../api/socket';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  isDragging: boolean;
  onEdit?: (taskId: string, updates: Partial<Task>) => void;
  onDelete?: (taskId: string) => void;
  isEditable?: boolean;
  methodologyConfig?: any;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  isDragging, 
  onEdit, 
  onDelete, 
  isEditable = true, 
  methodologyConfig 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [showDetails, setShowDetails] = useState(false);
  
  const titleInputRef = useRef<HTMLInputElement>(null);
  const updateTaskMutation = trpc.task.update.useMutation();

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditing]);

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

  const getMethodologyColor = (methodologyType: string) => {
    switch (methodologyType) {
      case 'bmad': return '#3498db';
      case 'sage': return '#9b59b6';
      case 'archon': return '#e67e22';
      case 'general': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const getMethodologyIcon = (methodologyType: string) => {
    switch (methodologyType) {
      case 'bmad': return '🎯';
      case 'sage': return '🧠';
      case 'archon': return '🤖';
      case 'general': return '📋';
      default: return '📋';
    }
  };

  const handleTitleSave = async () => {
    if (editContent.trim() === task.title) {
      setIsEditing(false);
      return;
    }

    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        title: editContent.trim()
      });

      // Emit real-time update
      emitTaskUpdate({
        taskId: task.id,
        changes: { title: editContent.trim() },
        source: 'web'
      });

      if (onEdit) {
        onEdit(task.id, { title: editContent.trim() });
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task title:', error);
      setEditContent(task.title); // Revert on error
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setEditContent(task.title);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const parseMetadata = (metadata: string | undefined | null) => {
    // Handle all possible null/undefined/empty cases
    if (!metadata || typeof metadata !== 'string') return null;
    
    const trimmed = metadata.trim();
    if (trimmed === '' || trimmed === '{}' || trimmed === 'null') return null;
    
    try {
      const parsed = JSON.parse(trimmed);
      // Return null if it's an empty object
      if (typeof parsed === 'object' && parsed !== null && Object.keys(parsed).length === 0) {
        return null;
      }
      return parsed;
    } catch (error) {
      // Silently handle invalid JSON for legacy compatibility
      return null;
    }
  };

  const metadata = parseMetadata(task.metadata);
  const isPrototypeTask = metadata?.type === 'prototype';
  const prototypeNumber = metadata?.prototype_number || null;

  return (
    <div className={`task-card ${isDragging ? 'dragging' : ''} ${isPrototypeTask ? 'prototype-task' : ''}`}>
      <div className="task-header">
        <div className="task-indicators">
          <span 
            className="task-priority"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
            title={`${task.priority} priority`}
          />
          {task.methodology_type && (
            <span 
              className="task-methodology"
              style={{ backgroundColor: getMethodologyColor(task.methodology_type) }}
              title={`${task.methodology_type} methodology`}
            >
              {getMethodologyIcon(task.methodology_type)}
            </span>
          )}
          {isPrototypeTask && prototypeNumber && (
            <span className="prototype-badge" title={`Prototype ${prototypeNumber}`}>
              P{prototypeNumber}
            </span>
          )}
        </div>
        
        <div className="task-actions">
          <span className="task-assignee" title={`Assigned to ${task.assigned_to}`}>
            {getAssigneeIcon(task.assigned_to)}
          </span>
          {isEditable && (
            <>
              <button 
                className="task-action-btn" 
                onClick={() => setShowDetails(!showDetails)}
                title="Show details"
              >
                📋
              </button>
              <button 
                className="task-action-btn" 
                onClick={handleDelete}
                title="Delete task"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="task-content">
        {isEditing ? (
          <input
            ref={titleInputRef}
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={handleKeyPress}
            className="task-title-input"
          />
        ) : (
          <h4 
            className="task-title"
            onClick={() => isEditable && setIsEditing(true)}
            title={isEditable ? "Click to edit" : ""}
          >
            {task.title}
          </h4>
        )}
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      {showDetails && (
        <div className="task-details">
          {task.command_source && (
            <div className="task-detail-item">
              <span className="detail-label">Source:</span>
              <span className="detail-value">{task.command_source}</span>
            </div>
          )}
          {task.validation_status && (
            <div className="task-detail-item">
              <span className="detail-label">Validation:</span>
              <span className={`detail-value validation-${task.validation_status}`}>
                {task.validation_status}
              </span>
            </div>
          )}
          {task.metadata && (
            <div className="task-detail-item">
              <span className="detail-label">Type:</span>
              <span className="detail-value">
                {metadata?.type || 'standard'}
              </span>
            </div>
          )}
        </div>
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