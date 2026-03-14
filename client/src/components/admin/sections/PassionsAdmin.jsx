import { useState, useEffect, useRef } from 'react';
import api from '../../../api';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import '../AdminShared.css';

function PassionsAdmin() {
  const [passions, setPassions] = useState([]);
  const [formData, setFormData] = useState({ title: '', icon: '' });
  const [editing, setEditing] = useState(null);
  const formRef = useRef(null);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchPassions = async () => {
    const res = await api.get('/passions');
    setPassions(res.data);
  };

  useEffect(() => {
    fetchPassions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/passions/${editing}`, formData, { headers });
    } else {
      await api.post('/passions', formData, { headers });
    }
    setFormData({ title: '', icon: '' });
    setEditing(null);
    fetchPassions();
  };

  const deletePassion = async (id) => {
    if (!window.confirm('Delete this passion entry?')) return;
    await api.delete(`/passions/${id}`, { headers });
    fetchPassions();
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h3>Life Beyond Code (Passions)</h3>
        <p>Manage your hobbies and interests that get rendered in the legacy section.</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>Interest / Passion Title</label>
            <input placeholder="e.g. PHOTOGRAPHY" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>React Icon Name</label>
            <input placeholder="e.g. FaCameraRetro" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} required />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">{editing ? 'Update' : 'Add'} Passion</button>
          {editing && <button type="button" className="cancel-btn" onClick={() => { setEditing(null); setFormData({ title: '', icon: '' }); }}><FaTimes /> Cancel Edit</button>}
        </div>
      </form>

      <div className="admin-list">
        {passions.map(p => (
          <div key={p._id} className="admin-item">
            <div className="admin-item-info">
              <h4>{p.title}</h4>
              <span className="item-tag">{p.icon}</span>
            </div>
            <div className="admin-actions">
              <button className="edit-btn" onClick={() => { 
                setEditing(p._id); 
                setFormData(p);
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
              }} title="Edit"><FaEdit /></button>
              <button className="delete-btn" onClick={() => deletePassion(p._id)} title="Delete"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PassionsAdmin;
