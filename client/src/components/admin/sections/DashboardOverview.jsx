import { useState, useEffect } from 'react';
import api from '../../../api';
import { Link } from 'react-router-dom';
import { FaProjectDiagram, FaCode, FaBriefcase, FaGraduationCap, FaPlus, FaArrowRight } from 'react-icons/fa';
import '../AdminShared.css';

function DashboardOverview() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    education: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills, experience, education] = await Promise.all([
          api.get('/projects'),
          api.get('/skills'),
          api.get('/experience'),
          api.get('/education')
        ]);
        
        setStats({
          projects: projects.data.length,
          skills: skills.data.length,
          experience: experience.data.length,
          education: education.data.length
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Works', count: stats.projects, icon: <FaProjectDiagram />, link: '/admin/projects', color: '#a78bfa' },
    { label: 'Arsenal', count: stats.skills, icon: <FaCode />, link: '/admin/skills', color: '#60a5fa' },
    { label: 'Legacy (Exp)', count: stats.experience, icon: <FaBriefcase />, link: '/admin/experience', color: '#34d399' },
    { label: 'Legacy (Edu)', count: stats.education, icon: <FaGraduationCap />, link: '/admin/education', color: '#fbbf24' }
  ];

  return (
    <div className="dashboard-overview">
      <div className="section-header">
        <h1>Dashboard <span className="grad-text">Overview</span></h1>
        <p>Welcome back! Here's a snapshot of your digital presence.</p>
      </div>

      <div className="stats-grid">
        {statCards.map((card, i) => (
          <div key={i} className="stat-card" style={{ '--card-color': card.color }}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-info">
              <h3>{card.count}</h3>
              <p>{card.label}</p>
            </div>
            <Link to={card.link} className="stat-link">
              Manage <FaArrowRight />
            </Link>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-btns">
          <Link to="/admin/projects" className="action-btn">
            <FaPlus /> New Work
          </Link>
          <Link to="/admin/skills" className="action-btn">
            <FaPlus /> Update Arsenal
          </Link>
          <Link to="/admin/experience" className="action-btn">
            <FaPlus /> Add Experience
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
