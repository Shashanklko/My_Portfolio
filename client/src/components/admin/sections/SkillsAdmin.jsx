import { useState, useEffect, useRef } from 'react';
import api from '../../../api';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import '../AdminShared.css';

function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({ name: '', pct: 80, iconName: '', color: '#ffffff', isLearning: false });
  const [editing, setEditing] = useState(null);
  const formRef = useRef(null);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchSkills = async () => {
    const res = await api.get('/skills');
    setSkills(res.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/skills/${editing}`, formData, { headers });
    } else {
      await api.post('/skills', formData, { headers });
    }
    setFormData({ name: '', pct: 80, iconName: '', color: '#ffffff', isLearning: false });
    setEditing(null);
    fetchSkills();
  };

  const deleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    await api.delete(`/skills/${id}`, { headers });
    fetchSkills();
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h3>Technical Arsenal</h3>
        <p>Manage the skills and technologies displayed in your physics sandbox.</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Skill Name</label>
          <input placeholder="e.g. React.js" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Proficiency (%)</label>
            <input type="number" placeholder="80" value={formData.pct} onChange={e => setFormData({ ...formData, pct: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>React Icon Name</label>
            <input placeholder="e.g. FaReact" value={formData.iconName} onChange={e => setFormData({ ...formData, iconName: e.target.value })} />
          </div>
        </div>
        <div className="form-row" style={{ alignItems: 'center' }}>
          <div className="form-group">
            <label>Brand Color</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="color" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} style={{ width: '50px', padding: '2px' }} />
              <span style={{ fontSize: '0.9rem' }}>{formData.color}</span>
            </div>
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textTransform: 'none' }}>
              <input type="checkbox" checked={formData.isLearning} onChange={e => setFormData({ ...formData, isLearning: e.target.checked })} style={{ width: 'auto' }} /> Currently Learning
            </label>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">{editing ? 'Update' : 'Add'} Skill</button>
          {editing && <button type="button" className="cancel-btn" onClick={() => { setEditing(null); setFormData({ name: '', pct: 80, iconName: '', color: '#ffffff', isLearning: false }); }}><FaTimes /> Cancel Edit</button>}
        </div>
      </form>

      <div className="admin-list">
        {skills.map(s => (
          <div key={s._id} className="admin-item">
            <div className="admin-item-info">
              <h4>{s.name}</h4>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="item-tag">{s.pct}%</span>
                {s.isLearning && <span className="item-tag" style={{ color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)' }}>Learning</span>}
              </div>
            </div>
            <div className="admin-actions">
              <button className="edit-btn" onClick={() => { 
                setEditing(s._id); 
                setFormData(s);
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
              }} title="Edit"><FaEdit /></button>
              <button className="delete-btn" onClick={() => deleteSkill(s._id)} title="Delete"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsAdmin;
