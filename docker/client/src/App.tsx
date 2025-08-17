import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProjectTabs from './components/ProjectTabs';
import KanbanBoard from './components/KanbanBoard';
import ProjectForm from './components/ProjectForm';
import { trpc } from './api/trpc';
import { initSocket } from './api/socket';
import { setProjects, setCurrentProject } from './store/projectSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  // Initialize tRPC queries
  const { data: projects, refetch: refetchProjects } = trpc.project.list.useQuery();
  
  useEffect(() => {
    // Initialize Socket.io connection
    const socket = initSocket();
    
    // Update projects when received
    if (projects) {
      dispatch(setProjects(projects));
      if (projects.length > 0 && !currentProjectId) {
        setCurrentProjectId(projects[0].id);
        dispatch(setCurrentProject(projects[0].id));
      }
    }
    
    return () => {
      socket.disconnect();
    };
  }, [projects, dispatch, currentProjectId]);

  const handleProjectSelect = (projectId: string) => {
    setCurrentProjectId(projectId);
    dispatch(setCurrentProject(projectId));
  };

  const handleProjectCreate = async (projectData: any) => {
    try {
      await trpc.project.create.mutate(projectData);
      await refetchProjects();
      setShowProjectForm(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>BMAD Context Engineering</h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowProjectForm(true)}
          >
            New Project
          </button>
        </div>
      </header>
      
      <ProjectTabs 
        projects={projects || []}
        currentProjectId={currentProjectId}
        onProjectSelect={handleProjectSelect}
      />
      
      <main className="app-main">
        {currentProjectId ? (
          <KanbanBoard projectId={currentProjectId} />
        ) : (
          <div className="no-project">
            <p>No project selected. Create a new project to get started.</p>
          </div>
        )}
      </main>
      
      {showProjectForm && (
        <ProjectForm 
          onSubmit={handleProjectCreate}
          onCancel={() => setShowProjectForm(false)}
        />
      )}
    </div>
  );
}

export default App;