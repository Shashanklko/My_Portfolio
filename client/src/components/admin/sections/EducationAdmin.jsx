import { useState, useEffect, useRef } from 'react';
import api from '../../../api';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import '../AdminShared.css';

function EducationAdmin() {
  const [education, setEducation] = useState([]);
  const [formData, setFormData] = useState({ year: '', degree: '', school: '', note: '' });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchEducation = async () => {
    const res = await api.get('/education');
    setEducation(res.data);
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleReset = () => {
    setFormData({ year: '', degree: '', school: '', note: '' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/education/${editing}`, formData, { headers });
    } else {
      await api.post('/education', formData, { headers });
    }
    handleReset();
    fetchEducation();
  };

  const deleteEdu = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    await api.delete(`/education/${id}`, { headers });
    fetchEducation();
  };

  return (
    <div className="admin-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3>Academic Background</h3>
          <p>Manage your degrees and educational timeline.</p>
        </div>
        <button className="submit-btn" style={{ width: 'auto' }} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'View All' : 'Add Education'}
        </button>
      </div>

      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Year Range</label>
              <input placeholder="e.g. 2021 — 2025" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Degree / Qualification</label>
              <input placeholder="e.g. B.Tech CS" value={formData.degree} onChange={e => setFormData({ ...formData, degree: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label>School / University</label>
            <input placeholder="Lucknow Public School" value={formData.school} onChange={e => setFormData({ ...formData, school: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Additional Notes</label>
            <textarea placeholder="CGPA, specific achievements, etc." value={formData.note} onChange={e => setFormData({ ...formData, note: e.target.value })} />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">{editing ? 'Update' : 'Add'} Education</button>
            <button type="button" className="cancel-btn" onClick={handleReset}><FaTimes /> Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {education.map(e => (
          <div key={e._id} className="admin-item">
            <div className="admin-item-info">
              <h4>{e.degree}</h4>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="item-tag">{e.school}</span>
                <span className="item-tag" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>{e.year}</span>
              </div>
            </div>
            <div className="admin-actions">
              <button className="edit-btn" onClick={() => { 
                setEditing(e._id); 
                setFormData(e);
                setShowForm(true);
                setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} title="Edit"><FaEdit /></button>
              <button className="delete-btn" onClick={() => deleteEdu(e._id)} title="Delete"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationAdmin;
