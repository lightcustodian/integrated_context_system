import React from 'react';
import './ProjectTabs.css';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'paused';
  methodology: string;
}

interface ProjectTabsProps {
  projects: Project[];
  currentProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ projects, currentProjectId, onProjectSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#27ae60';
      case 'completed': return '#95a5a6';
      case 'paused': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const getMethodologyBadge = (methodology: string) => {
    switch (methodology) {
      case 'bmad': return 'B';
      case 'sage': return 'S';
      case 'archon': return 'A';
      case 'hybrid': return 'H';
      default: return 'C';
    }
  };

  return (
    <div className="project-tabs">
      <div className="tabs-container">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-tab ${currentProjectId === project.id ? 'active' : ''}`}
            onClick={() => onProjectSelect(project.id)}
          >
            <div className="tab-content">
              <span className="tab-name">{project.name}</span>
              <div className="tab-badges">
                <span 
                  className="methodology-badge"
                  title={`${project.methodology} methodology`}
                >
                  {getMethodologyBadge(project.methodology)}
                </span>
                <span 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                  title={project.status}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTabs;