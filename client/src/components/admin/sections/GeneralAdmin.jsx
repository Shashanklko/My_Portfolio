import { useState, useEffect } from 'react';
import api from '../../../api';
import { FaSave } from 'react-icons/fa';
import '../AdminShared.css';

function GeneralAdmin() {
  const [formData, setFormData] = useState({ name: '', role: '', secondaryRole: '', location: '', email: '', github: '', linkedin: '', resumeUrl: '', customLinkName: '', customLinkUrl: '', customLinkIcon: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchGeneral = async () => {
    const res = await api.get('/general');
    if (res.data) setFormData(res.data);
  };

  useEffect(() => {
    fetchGeneral();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await api.post('/general', formData, { headers });
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000); // clear success message after 3 seconds
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h3>General Settings</h3>
        <p>Control the core identity and social connectivity of your portfolio.</p>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>Public Name</label>
            <input value={formData.name || ''} placeholder="SHASHANK KUMAR" onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Location Tag</label>
            <input value={formData.location || ''} placeholder="BASED IN LUCKNOW, INDIA" onChange={e => setFormData({ ...formData, location: e.target.value })} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Primary Role (Line 1)</label>
            <input value={formData.role || ''} placeholder="WEB DESIGNER" onChange={e => setFormData({ ...formData, role: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Secondary Role (Line 2)</label>
            <input value={formData.secondaryRole || ''} placeholder="& SOFTWARE ENGINEER" onChange={e => setFormData({ ...formData, secondaryRole: e.target.value })} />
          </div>
        </div>

        <div className="form-group">
          <label>Contact Email</label>
          <input value={formData.email || ''} placeholder="example@gmail.com" onChange={e => setFormData({ ...formData, email: e.target.value })} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>GitHub Profile URL</label>
            <input value={formData.github || ''} placeholder="https://github.com/..." onChange={e => setFormData({ ...formData, github: e.target.value })} />
          </div>
          <div className="form-group">
            <label>LinkedIn Profile URL</label>
            <input value={formData.linkedin || ''} placeholder="https://linkedin.com/in/..." onChange={e => setFormData({ ...formData, linkedin: e.target.value })} />
          </div>
        </div>

        <div className="form-group">
          <label>Resume / CV Link</label>
          <input value={formData.resumeUrl || ''} placeholder="Link to your PDF or Doc" onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Extra Custom Link (Name)</label>
            <input value={formData.customLinkName || ''} placeholder="e.g. TWITTER, DRIBBBLE, BLOG" onChange={e => setFormData({ ...formData, customLinkName: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Extra Custom Link (URL)</label>
            <input value={formData.customLinkUrl || ''} placeholder="https://..." onChange={e => setFormData({ ...formData, customLinkUrl: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Extra Link (Icon name)</label>
            <input value={formData.customLinkIcon || ''} placeholder="FaTwitter" onChange={e => setFormData({ ...formData, customLinkIcon: e.target.value })} />
          </div>
        </div>

        <div className="form-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="submit" className="submit-btn" disabled={isSaving}>
            <FaSave /> {isSaving ? 'Updating...' : 'Update Profile Settings'}
          </button>
          
          {saveSuccess && (
            <span style={{ color: '#34d399', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
               Profile settings updated!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default GeneralAdmin;
