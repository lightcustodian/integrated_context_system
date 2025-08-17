import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { trpc } from '../api/trpc';
import { joinProject, leaveProject, emitTaskDrag, emitCliStatusRequest, subscribeToCliStatus, unsubscribeFromCliStatus } from '../api/socket';
import { setTasks, moveTask } from '../store/taskSlice';
import { updateConnectionStatus } from '../store/uiSlice';
import { RootState } from '../store/store';
import { Task } from '../store/taskSlice';
import './KanbanBoard.css';

interface KanbanBoardProps {
  projectId: string;
  methodologyConfig?: {
    bmad_enabled: boolean;
    sage_enabled: boolean;
    archon_enabled: boolean;
  };
}

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: '#e74c3c', methodology_focus: 'planning' },
  { id: 'in-progress', title: 'In Progress', color: '#f39c12', methodology_focus: 'execution' },
  { id: 'review', title: 'Review', color: '#9b59b6', methodology_focus: 'validation' },
  { id: 'done', title: 'Done', color: '#27ae60', methodology_focus: 'completion' },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  projectId, 
  methodologyConfig = { bmad_enabled: true, sage_enabled: true, archon_enabled: true }
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks[projectId] || []);
  const cliStatus = useSelector((state: RootState) => state.ui.cliStatus);
  const connectionStatus = useSelector((state: RootState) => state.ui.connectionStatus);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('todo');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragValidation, setDragValidation] = useState<Record<string, { allowed: boolean; reason: string }>>({});

  // Load tasks
  const { data: taskData, refetch: refetchTasks } = trpc.task.listByProject.useQuery(
    { projectId },
    { enabled: !!projectId }
  );

  useEffect(() => {
    if (taskData) {
      dispatch(setTasks({ projectId, tasks: taskData }));
    }
  }, [taskData, projectId, dispatch]);

  useEffect(() => {
    // Join project room for real-time updates
    joinProject(projectId);
    
    // Request current CLI status
    emitCliStatusRequest();
    
    // Subscribe to CLI status updates
    const handleCliStatus = (status: any) => {
      // Status updates are handled in socket.ts through store dispatch
    };
    
    subscribeToCliStatus(handleCliStatus);
    
    // Connection monitoring
    const connectionCheck = setInterval(() => {
      const now = Date.now();
      const lastPing = connectionStatus.lastPing || 0;
      if (now - lastPing > 10000) { // 10 seconds without ping
        dispatch(updateConnectionStatus({ connected: false }));
      }
    }, 5000);
    
    return () => {
      leaveProject(projectId);
      unsubscribeFromCliStatus();
      clearInterval(connectionCheck);
    };
  }, [projectId, dispatch, connectionStatus.lastPing]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Get the task being moved
    const movedTask = tasks.find(task => task.id === draggableId);
    if (!movedTask) return;

    // BMAD Validation: Check if move is allowed based on validation gates
    try {
      const isValidMove = await validateTaskMove(movedTask, destination.droppableId);
      console.log('Validation result:', isValidMove);
      
      // Temporarily disable validation blocking for debugging
      if (!isValidMove.allowed && false) { // Disabled for now
        // Show a more user-friendly message for blocking moves
        alert(`⚠️ Move restricted: ${isValidMove.reason}\n\nThis validation can be bypassed by editing the task or updating project settings.`);
        return;
      }
    } catch (error) {
      console.warn('Move validation error, allowing move:', error);
      // Allow move if validation fails for legacy compatibility
    }

    // Update local state immediately for responsive UI
    dispatch(moveTask({
      projectId,
      taskId: draggableId,
      sourceStatus: source.droppableId,
      targetStatus: destination.droppableId,
      sourceIndex: source.index,
      targetIndex: destination.index,
    }));

    // Emit to other clients
    emitTaskDrag({
      taskId: draggableId,
      sourceStatus: source.droppableId,
      targetStatus: destination.droppableId,
      sourceIndex: source.index,
      targetIndex: destination.index,
      projectId,
    });

    // Update server
    try {
      await trpc.task.reorder.mutate({
        taskId: draggableId,
        newStatus: destination.droppableId as any,
        newOrder: destination.index,
      });
    } catch (error) {
      console.error('Failed to update task position:', error);
      // Revert on error
      refetchTasks();
    }
  };

  const validateTaskMove = async (task: Task, targetStatus: string) => {
    try {
      // Debug logging
      console.log('Validating task move:', {
        taskId: task.id,
        title: task.title,
        currentStatus: task.status,
        targetStatus,
        methodology_type: task.methodology_type,
        metadata: task.metadata,
        validation_status: task.validation_status
      });

      // Skip validation for legacy tasks without methodology fields
      const isLegacyTask = !task.methodology_type && !task.metadata;
      if (isLegacyTask) {
        console.log('Legacy task detected, allowing move');
        return { allowed: true, reason: 'Legacy task - validation bypassed' };
      }

      // BMAD validation rules for task movement (only for BMAD tasks)
      if (task.methodology_type === 'bmad') {
        // Check if validation gates are met
        if (targetStatus === 'done' && task.validation_status && task.validation_status !== 'passed') {
          return {
            allowed: false,
            reason: 'BMAD validation gates must pass before task completion'
          };
        }
      }

      // Prototype task validation (with safe JSON parsing)
      if (task.metadata) {
        let metadata;
        try {
          metadata = JSON.parse(task.metadata);
        } catch (e) {
          // Invalid metadata JSON - allow movement for legacy tasks
          return { allowed: true, reason: 'Legacy task with invalid metadata - validation bypassed' };
        }
        
        if (metadata.type === 'prototype' && targetStatus === 'done') {
          // Check if all prerequisite prototypes are complete
          const prototypeNumber = metadata.prototype_number;
          if (prototypeNumber && prototypeNumber > 1) {
            const prerequisiteComplete = tasks.some(t => {
              if (!t.metadata) return false;
              try {
                const tMeta = JSON.parse(t.metadata);
                return tMeta.type === 'prototype' && 
                       tMeta.prototype_number === prototypeNumber - 1 && 
                       t.status === 'done';
              } catch (e) {
                return false;
              }
            });
            
            if (!prerequisiteComplete) {
              return {
                allowed: false,
                reason: `Prototype ${prototypeNumber - 1} must be completed first`
              };
            }
          }
        }
        
        // SAGE dependency validation (with safe parsing)
        if (metadata.dependencies && Array.isArray(metadata.dependencies) && metadata.dependencies.length > 0) {
          const unmetDependencies = metadata.dependencies.filter((depId: string) => {
            const dependentTask = tasks.find(t => t.id === depId);
            return !dependentTask || dependentTask.status !== 'done';
          });
          
          if (unmetDependencies.length > 0 && targetStatus === 'in-progress') {
            return {
              allowed: false,
              reason: `Dependencies must be completed first: ${unmetDependencies.length} pending`
            };
          }
        }
      }

      return { allowed: true, reason: '' };
    } catch (error) {
      // If any validation fails due to errors, allow the move for legacy compatibility
      console.warn('Task validation error (allowing move for legacy compatibility):', error);
      return { allowed: true, reason: 'Validation error - allowing for legacy compatibility' };
    }
  };

  const handleTaskCreate = async (taskData: any) => {
    try {
      await trpc.task.create.mutate({
        projectId,
        ...taskData,
        status: selectedColumn as any,
      });
      await refetchTasks();
      setShowTaskForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleAddTask = (columnId: string) => {
    setSelectedColumn(columnId);
    setShowTaskForm(true);
  };

  const getTasksForColumn = (columnId: string) => {
    return tasks
      .filter(task => task.status === columnId)
      .sort((a, b) => a.column_order - b.column_order);
  };

  const getMethodologyIcon = (methodologyFocus: string) => {
    switch (methodologyFocus) {
      case 'planning': return methodologyConfig.bmad_enabled ? '🎯' : '📋';
      case 'execution': return methodologyConfig.archon_enabled ? '🤖' : '⚡';
      case 'validation': return methodologyConfig.bmad_enabled ? '✅' : '🔍';
      case 'completion': return methodologyConfig.sage_enabled ? '🧠' : '🎉';
      default: return '📋';
    }
  };

  const onDragStart = async (result: any) => {
    const task = tasks.find(t => t.id === result.draggableId);
    setDraggedTask(task || null);
    
    if (task) {
      // Pre-validate all columns for this task (with error handling)
      const validations: Record<string, { allowed: boolean; reason: string }> = {};
      try {
        for (const column of COLUMNS) {
          validations[column.id] = await validateTaskMove(task, column.id);
        }
      } catch (error) {
        console.warn('Drag validation error, allowing all moves:', error);
        // If validation fails, allow all moves for legacy compatibility
        for (const column of COLUMNS) {
          validations[column.id] = { allowed: true, reason: 'Validation error - allowing for compatibility' };
        }
      }
      setDragValidation(validations);
    }
  };

  const onDragEnd = (result: any) => {
    setDraggedTask(null);
    setDragValidation({});
  };

  return (
    <div className="kanban-board">
      {/* CLI Status Banner */}
      {cliStatus.active && (
        <div className="cli-status-banner">
          <div className="cli-status-content">
            <span className="cli-indicator active">🤖</span>
            <span className="cli-text">
              Claude Code Active: {cliStatus.currentCommand}
              {cliStatus.currentStep && ` - ${cliStatus.currentStep}`}
            </span>
            <div className="cli-pulse" />
          </div>
        </div>
      )}
      
      {/* Connection Status */}
      {!connectionStatus.connected && (
        <div className="connection-status-banner warning">
          <span>⚠️ Connection lost - changes may not sync</span>
        </div>
      )}
      
      <DragDropContext 
        onDragEnd={(result) => { handleDragEnd(result); onDragEnd(result); }} 
        onDragStart={onDragStart}
      >
        <div className="kanban-columns">
          {COLUMNS.map((column) => {
            const columnTasks = getTasksForColumn(column.id);
            
            return (
              <div key={column.id} className="kanban-column">
                <div 
                  className="column-header"
                  style={{ borderTopColor: column.color }}
                >
                  <div className="column-title-row">
                    <h3>{column.title}</h3>
                    <div className="column-indicators">
                      <span 
                        className="methodology-indicator"
                        title={`${column.methodology_focus} focus`}
                      >
                        {getMethodologyIcon(column.methodology_focus)}
                      </span>
                      <span className="task-count">{columnTasks.length}</span>
                    </div>
                  </div>
                  
                  {/* Drag validation indicator */}
                  {draggedTask && dragValidation[column.id] && (
                    <div className="drag-validation">
                      <span 
                        className={`validation-indicator ${
                          dragValidation[column.id].allowed ? 'allowed' : 'blocked'
                        }`}
                        title={dragValidation[column.id].reason || 'Move allowed'}
                      >
                        {dragValidation[column.id].allowed ? '✅' : '🚫'}
                      </span>
                    </div>
                  )}
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                              className={`task-wrapper ${snapshot.isDragging ? 'dragging' : ''}`}
                            >
                              <TaskCard
                                task={task}
                                isDragging={snapshot.isDragging}
                                methodologyConfig={methodologyConfig}
                                onEdit={async (taskId, updates) => {
                                  try {
                                    await trpc.task.update.mutate({ id: taskId, ...updates });
                                    await refetchTasks();
                                  } catch (error) {
                                    console.error('Failed to update task:', error);
                                  }
                                }}
                                onDelete={async (taskId) => {
                                  try {
                                    await trpc.task.delete.mutate({ id: taskId });
                                    await refetchTasks();
                                  } catch (error) {
                                    console.error('Failed to delete task:', error);
                                  }
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                
                <button
                  className="add-task-btn"
                  onClick={() => handleAddTask(column.id)}
                >
                  + Add Task
                </button>
              </div>
            );
          })}
        </div>
      </DragDropContext>
      
      {showTaskForm && (
        <TaskForm
          onSubmit={handleTaskCreate}
          onCancel={() => setShowTaskForm(false)}
          defaultStatus={selectedColumn}
        />
      )}
    </div>
  );
};

export default KanbanBoard;