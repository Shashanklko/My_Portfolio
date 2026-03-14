import { useState, useEffect, useRef } from 'react';
import api from '../../../api';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import '../AdminShared.css';

function AchievementsAdmin() {
  const [achievements, setAchievements] = useState([]);
  const [formData, setFormData] = useState({ type: 'win', title: '', desc: '', icon: '', color: '#ffffff', date: '', url: '' });
  const [editing, setEditing] = useState(null);
  const formRef = useRef(null);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAchievements = async () => {
    const res = await api.get('/achievements');
    setAchievements(res.data);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/achievements/${editing}`, formData, { headers });
    } else {
      await api.post('/achievements', formData, { headers });
    }
    setFormData({ type: 'win', title: '', desc: '', icon: '', color: '#ffffff', date: '', url: '' });
    setEditing(null);
    fetchAchievements();
  };

  const deleteAch = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    await api.delete(`/achievements/${id}`, { headers });
    fetchAchievements();
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h3>Milestones & Certifications</h3>
        <p>Keep track of your wins and professional certifications.</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Entry Type</label>
          <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
            <option value="win">Win / Milestone</option>
            <option value="cert">Certification</option>
          </select>
        </div>
        <div className="form-group">
          <label>Title / Name</label>
          <input placeholder="e.g. 1st in Hackathon" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Description / Organization</label>
          <textarea placeholder="e.g. Impactful fintech solution..." value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Month & Year</label>
            <input placeholder="e.g. Dec 2025" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
          </div>
          {formData.type === 'cert' ? (
            <div className="form-group">
              <label>Credential URL</label>
              <input placeholder="https://..." value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} />
            </div>
          ) : (
            <div className="form-group">
              <label>Theme Color</label>
              <input type="color" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} style={{ height: '45px', padding: '2px' }} />
            </div>
          )}
        </div>

        {formData.type === 'win' && (
          <div className="form-group">
            <label>Icon Name (e.g. FaTrophy)</label>
            <input placeholder="FaTrophy" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
          </div>
        )}
        <div className="form-actions">
          <button type="submit" className="submit-btn">{editing ? 'Update' : 'Add'} Entry</button>
          {editing && <button type="button" className="cancel-btn" onClick={() => { setEditing(null); setFormData({ type: 'win', title: '', desc: '', icon: '', color: '#ffffff', date: '', url: '' }); }}><FaTimes /> Cancel Edit</button>}
        </div>
      </form>

      <div className="admin-list">
        {achievements.map(a => (
          <div key={a._id} className="admin-item">
            <div className="admin-item-info">
              <h4>{a.title}</h4>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="item-tag" style={{ border: 'none', background: a.type === 'win' ? 'rgba(167, 139, 250, 0.2)' : 'rgba(52, 211, 153, 0.2)', color: a.type === 'win' ? '#a78bfa' : '#34d399' }}>
                  {a.type}
                </span>
                {a.date && <span className="item-tag" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>{a.date}</span>}
              </div>
            </div>
            <div className="admin-actions">
              <button className="edit-btn" onClick={() => { 
                setEditing(a._id); 
                setFormData(a);
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
              }} title="Edit"><FaEdit /></button>
              <button className="delete-btn" onClick={() => deleteAch(a._id)} title="Delete"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AchievementsAdmin;
