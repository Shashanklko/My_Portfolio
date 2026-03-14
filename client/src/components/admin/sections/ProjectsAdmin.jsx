import { useState, useEffect, useRef } from 'react';
import api from '../../../api';
import { FaEdit, FaTrash, FaTimes, FaPlus } from 'react-icons/fa';
import '../AdminShared.css';

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', desc: '', tech: '', span: 'md', githubLink: '', liveLink: '' });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchProjects = async () => {
    const res = await api.get('/projects');
    const processed = res.data.map(p => ({
      ...p,
      githubLink: p.githubLink || p.link || '',
      liveLink: p.liveLink || ''
    }));
    setProjects(processed);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleReset = () => {
    setFormData({ title: '', desc: '', tech: '', span: 'md', githubLink: '', liveLink: '' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, tech: typeof formData.tech === 'string' ? formData.tech.split(',').map(t => t.trim()) : formData.tech };
    if (editing) {
      await api.put(`/projects/${editing}`, data, { headers });
    } else {
      await api.post('/projects', data, { headers });
    }
    handleReset();
    fetchProjects();
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`, { headers });
    fetchProjects();
  };

  return (
    <div className="admin-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3>Manage Projects</h3>
          <p>Showcase your best work with detailed project cards.</p>
        </div>
        <button className="submit-btn" style={{ width: 'auto' }} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'View All' : 'Add New Project'}
        </button>
      </div>

      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Project Title</label>
            <input placeholder="e.g. AI Portfolio" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Describe the project objective and your role..." value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Tech Stack (comma separated)</label>
            <input placeholder="React, Node.js, MongoDB" value={formData.tech} onChange={e => setFormData({ ...formData, tech: e.target.value })} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>GitHub Source</label>
              <input placeholder="https://github.com/shashank..." value={formData.githubLink || ''} onChange={e => setFormData({ ...formData, githubLink: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Live Demo Link [CRITICAL]</label>
              <input placeholder="https://project-demo.com" value={formData.liveLink || ''} onChange={e => setFormData({ ...formData, liveLink: e.target.value })} style={{ borderColor: 'var(--admin-accent)' }} />
            </div>
          </div>

          <div className="form-group">
            <label>Project Scale / Card Size</label>
            <select value={formData.span} onChange={e => setFormData({ ...formData, span: e.target.value })}>
              <option value="sm">Small Feature</option>
              <option value="md">Medium Project</option>
              <option value="lg">Large Case Study</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">{editing ? 'Update' : 'Add'} Project</button>
            <button type="button" className="cancel-btn" onClick={handleReset}><FaTimes /> Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {projects.map(p => (
          <div key={p._id} className="admin-item">
            <div className="admin-item-info">
              <h4>{p.title}</h4>
              <span className="item-tag">{p.span}</span>
            </div>
            <div className="admin-actions">
              <button className="edit-btn" onClick={() => { 
                setEditing(p._id); 
                setFormData({ ...p, tech: p.tech.join(', ') });
                setShowForm(true);
                setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} title="Edit"><FaEdit /></button>
              <button className="delete-btn" onClick={() => deleteProject(p._id)} title="Delete"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsAdmin;
