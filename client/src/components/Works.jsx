import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import api from '../api';
import './Works.css';
import { useReveal } from '../hooks/useReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import { VscChromeClose, VscChromeMinimize, VscChromeMaximize } from 'react-icons/vsc';
import Tilt from './common/Tilt';

const Works = forwardRef(({ onNextScene, projects }, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [direction, setDirection] = useState(0);

  const handleDotClick = () => {
    if (activeIndex < projects.length - 1) {
      setDirection(1);
      setActiveIndex(prev => prev + 1);
    } else {
      onNextScene?.();
    }
  };

  useImperativeHandle(ref, () => ({
    handleScroll: (scrollDirection) => {
      if (scrollDirection === 1) {
        if (activeIndex < projects.length - 1) {
          setDirection(1);
          setActiveIndex(prev => prev + 1);
          return true;
        }
      } else if (scrollDirection === -1) {
        if (activeIndex > 0) {
          setDirection(-1);
          setActiveIndex(prev => prev - 1);
          return true;
        }
      }
      return false;
    }
  }));

  // Data is fetched and mapped in App.jsx and passed as 'projects' prop

  const currentProject = projects[activeIndex];

  return (
    <section className="works" id="worksects">
      <div className="works__bg-grid" />
      
      <div className="works__inner">
        <div className="works__header">
          <h2 className="works__title">PROJECT_SPECS</h2>
        </div>

        <div className="works__spec-container">
          <AnimatePresence mode="wait" custom={direction}>
              {currentProject && (
                <motion.article 
                  key={activeIndex}
                  custom={direction}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={{
                    initial: (d) => ({
                      x: d > 0 ? 100 : d < 0 ? -100 : 0,
                      opacity: 0,
                      filter: 'blur(10px)',
                      scale: 0.95
                    }),
                    animate: {
                      x: 0,
                      opacity: 1,
                      filter: 'blur(0px)',
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 100,
                        damping: 20
                      }
                    },
                    exit: (d) => ({
                      x: d > 0 ? -100 : d < 0 ? 100 : 0,
                      opacity: 0,
                      filter: 'blur(10px)',
                      scale: 0.95,
                      transition: {
                        duration: 0.3
                      }
                    })
                  }}
                  className="works__spec-card"
                >
                  <div className="works__card-chrome">
                    <div className="chrome-dots">
                      <span className="dot close" onClick={handleDotClick}><VscChromeClose /></span>
                      <span className="dot minimize" onClick={handleDotClick}><VscChromeMinimize /></span>
                      <span className="dot maximize" onClick={handleDotClick}><VscChromeMaximize /></span>
                    </div>
                    <span className="chrome-title">{currentProject.title.toUpperCase()}.LOG</span>
                  </div>

                  <div className="works__card-content">
                    <div className="works__card-main">
                      <h3 className="works__item-title">{currentProject.title}</h3>
                      <p className="works__item-desc">{currentProject.desc}</p>
                    </div>

                    <div className="works__card-data">
                      <div className="data-group">
                        <span className="label">TECHNOLOGIES</span>
                        <div className="tech-list">
                          {currentProject.tech?.map(t => <span key={t} className="tech-chip">{t}</span>)}
                        </div>
                      </div>

                      <div className="data-group">
                        <span className="label">LINKS</span>
                        <div className="link-list">
                          {currentProject.githubLink && (
                            <a href={currentProject.githubLink} target="_blank" rel="noopener noreferrer" className="spec-link">
                              SOURCE_CODE
                            </a>
                          )}
                          {currentProject.liveLink && (
                            <a href={currentProject.liveLink} target="_blank" rel="noopener noreferrer" className="spec-link spec-link--alt">
                              LIVE_DEMO
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="works__card-footer">
                    <span className="footer-id">ID: {currentProject._id?.slice(-8) || "LOCAL"}</span>
                    <span className="footer-status">STATUS: DEPLOYED</span>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>
      </div>
    </section>
  );
});

export default Works;
