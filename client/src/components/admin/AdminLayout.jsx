import { NavLink, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './AdminLayout.css';
import DashboardOverview from './sections/DashboardOverview';
import ProjectsAdmin from './sections/ProjectsAdmin';
import SkillsAdmin from './sections/SkillsAdmin';
import EducationAdmin from './sections/EducationAdmin';
import AchievementsAdmin from './sections/AchievementsAdmin';
import GeneralAdmin from './sections/GeneralAdmin';
import ExperienceAdmin from './sections/ExperienceAdmin';
import PassionsAdmin from './sections/PassionsAdmin';
import { FaProjectDiagram, FaCode, FaGraduationCap, FaAward, FaCog, FaEye, FaSignOutAlt, FaBriefcase, FaThLarge, FaHeart } from 'react-icons/fa';

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" end><FaThLarge /> Dashboard</NavLink>
          <div className="nav-divider" />
          <NavLink to="/admin/projects"><FaProjectDiagram /> Works</NavLink>
          <NavLink to="/admin/skills"><FaCode /> Arsenal</NavLink>
          <NavLink to="/admin/experience"><FaBriefcase /> Legacy (Exp)</NavLink>
          <NavLink to="/admin/education"><FaGraduationCap /> Legacy (Edu)</NavLink>
          <NavLink to="/admin/achievements"><FaAward /> Milestones</NavLink>
          <NavLink to="/admin/passions"><FaHeart /> Passions</NavLink>
          <div className="nav-divider" />
          <NavLink to="/admin/general"><FaCog /> Settings</NavLink>
          <NavLink to="/" className="view-site"><FaEye /> View Portfolio</NavLink>
        </nav>
        <button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /> Log Out</button>
      </aside>

      <main className="admin-main">
        <Routes>
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="skills" element={<SkillsAdmin />} />
          <Route path="experience" element={<ExperienceAdmin />} />
          <Route path="education" element={<EducationAdmin />} />
          <Route path="achievements" element={<AchievementsAdmin />} />
          <Route path="passions" element={<PassionsAdmin />} />
          <Route path="general" element={<GeneralAdmin />} />
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminLayout;
