import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { trpc } from '../api/trpc';
import { joinProject, leaveProject, emitTaskDrag } from '../api/socket';
import { setTasks, moveTask } from '../store/taskSlice';
import { RootState } from '../store/store';
import { Task } from '../store/taskSlice';
import './KanbanBoard.css';

interface KanbanBoardProps {
  projectId: string;
}

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: '#e74c3c' },
  { id: 'in-progress', title: 'In Progress', color: '#f39c12' },
  { id: 'review', title: 'Review', color: '#9b59b6' },
  { id: 'done', title: 'Done', color: '#27ae60' },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ projectId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks[projectId] || []);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('todo');

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
    
    return () => {
      leaveProject(projectId);
    };
  }, [projectId]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
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

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-columns">
          {COLUMNS.map((column) => {
            const columnTasks = getTasksForColumn(column.id);
            
            return (
              <div key={column.id} className="kanban-column">
                <div 
                  className="column-header"
                  style={{ borderTopColor: column.color }}
                >
                  <h3>{column.title}</h3>
                  <span className="task-count">{columnTasks.length}</span>
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
                            >
                              <TaskCard
                                task={task}
                                isDragging={snapshot.isDragging}
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