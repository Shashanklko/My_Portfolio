import { useState, useEffect, useRef } from 'react';
import api from '../../../api';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import '../AdminShared.css';

function ExperienceAdmin() {
  const [experience, setExperience] = useState([]);
  const [formData, setFormData] = useState({ date: '', role: '', company: '', desc: '' });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchExperience = async () => {
    const res = await api.get('/experience');
    setExperience(res.data);
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleReset = () => {
    setFormData({ date: '', role: '', company: '', desc: '' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/experience/${editing}`, formData, { headers });
    } else {
      await api.post('/experience', formData, { headers });
    }
    handleReset();
    fetchExperience();
  };

  const deleteExp = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    await api.delete(`/experience/${id}`, { headers });
    fetchExperience();
  };

  return (
    <div className="admin-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3>Professional Experience</h3>
          <p>Manage your work history and professional roles.</p>
        </div>
        <button className="submit-btn" style={{ width: 'auto' }} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'View All' : 'Add Experience'}
        </button>
      </div>

      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Date Range</label>
              <input placeholder="e.g. Jun '25 — Jul '25" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input placeholder="e.g. MERN Stack Trainee" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label>Company / Organization</label>
            <input placeholder="e.g. CipherSchools" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Describe your responsibilities and achievements..." value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">{editing ? 'Update' : 'Add'} Experience</button>
            <button type="button" className="cancel-btn" onClick={handleReset}><FaTimes /> Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {experience.map(exp => (
          <div key={exp._id} className="admin-item">
            <div className="admin-item-info">
              <h4>{exp.role}</h4>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="item-tag">{exp.company}</span>
                <span className="item-tag" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>{exp.date}</span>
              </div>
            </div>
            <div className="admin-actions">
              <button className="edit-btn" onClick={() => { 
                setEditing(exp._id); 
                setFormData(exp);
                setShowForm(true);
                setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} title="Edit"><FaEdit /></button>
              <button className="delete-btn" onClick={() => deleteExp(exp._id)} title="Delete"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceAdmin;
