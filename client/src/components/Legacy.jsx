import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import api from '../api';
import './Legacy.css';
import { useReveal } from '../hooks/useReveal';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

const getIcon = (iconName) => {
  const allIcons = { ...FaIcons, ...SiIcons };
  const Icon = allIcons[iconName];
  return Icon ? <Icon /> : null;
};

const Legacy = forwardRef(({ education, experiences, passions }, ref) => {

  useImperativeHandle(ref, () => ({
    handleScroll: () => {
      return false;
    }
  }));

  // Data is fetched in App.jsx and passed as props.


  return (
    <section className="legacy" id="education">
      <div className="legacy__bg-structural">
        <div className="legacy__grid" />
      </div>

      <div className="legacy__inner">
        <>
          <div className="legacy__academic-pillar">
            <div className="pillar__tag">ACADEMIC_FOUNDATION</div>
            {education.length > 0 ? (
                <div className="academic-card">
                  <div className="card-glyph"><FaIcons.FaGraduationCap /></div>
                  <div className="card-info">
                    <h3 className="legacy-degree">{education[0].degree}</h3>
                    <p className="legacy-school">{education[0].school}</p>
                    <span className="legacy-status">{education[0].year}</span>
                    {education[0].note && <p className="legacy-note">{education[0].note}</p>}
                  </div>
                </div>
              ) : (
                <div className="academic-card-placeholder">NO_ACADEMIC_RECORDS_FOUND</div>
              )}
            </div>

            <div className="legacy__experience-pillar">
              <div className="pillar__tag">PROFESSIONAL_JOURNEY</div>
              <div className="experience-list">
                {experiences.length > 0 ? (
                  experiences.map((exp, i) => (
                    <div key={exp._id || i} className="exp-item">
                      <div className="exp-line-group">
                         <div className="exp-dot" />
                         {i < experiences.length - 1 && <div className="exp-line" />}
                      </div>
                      <div className="exp-content">
                        <span className="exp-date">{exp.date}</span>
                        <h4 className="exp-company">{exp.company}</h4>
                        <p className="exp-role">{exp.role}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="exp-placeholder">NO_EXPERIENCE_RECORDS_FOUND</div>
                )}
              </div>
            </div>

            <div className="legacy__passions-pillar">
              <div className="pillar__tag">LIFE_BEYOND_CODE</div>
              <div className="passions-list">
                 {passions.length > 0 ? (
                   passions.map((passion, i) => (
                     <div key={passion._id || i} className="passion-item">
                       <span className="passion-icon">{getIcon(passion.icon) || <FaIcons.FaStar />}</span>
                       <span className="passion-title">{passion.title}</span>
                     </div>
                   ))
                 ) : (
                   <div className="exp-placeholder" style={{ fontSize: '0.9rem', color: '#64748b' }}>NO_PASSIONS_RECORDED</div>
                 )}
              </div>
            </div>
        </>
      </div>
    </section>
  );
});

export default Legacy;
