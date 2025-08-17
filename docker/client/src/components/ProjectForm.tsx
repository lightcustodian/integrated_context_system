import React, { useState } from 'react';
import './ProjectForm.css';

interface ProjectFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    methodology: 'hybrid',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create New Project</h2>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label htmlFor="name">Project Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoFocus
              placeholder="Enter project name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter project description"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="methodology">Methodology</label>
            <select
              id="methodology"
              name="methodology"
              value={formData.methodology}
              onChange={handleChange}
            >
              <option value="hybrid">Hybrid (BMAD + SAGE + Archon)</option>
              <option value="bmad">BMAD (Structured Planning)</option>
              <option value="sage">SAGE (Adaptive Learning)</option>
              <option value="archon">Archon (AI Agent Generation)</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;