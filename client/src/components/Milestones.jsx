import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import api from '../api';
import './Milestones.css';
import * as FaIcons from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';

const Milestones = forwardRef(({ achievements }, ref) => {
  const [selectedAch, setSelectedAch] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useImperativeHandle(ref, () => ({
    handleScroll: (direction) => {
      if (direction === 1) {
        if (activeIndex < achievements.length - 1) {
          setDirection(1);
          setActiveIndex(prev => prev + 1);
          return true;
        }
      } else if (direction === -1) {
        if (activeIndex > 0) {
          setDirection(-1);
          setActiveIndex(prev => prev - 1);
          return true;
        }
      }
      return false;
    }
  }));

  useEffect(() => {
    if (achievements && achievements.length > 0) {
      setActiveIndex(0);
      setSelectedAch(achievements[0]);
    }
  }, [achievements]);
  useEffect(() => {
    if (achievements[activeIndex]) {
      setSelectedAch(achievements[activeIndex]);
    }
  }, [activeIndex, achievements]);

  const getIcon = (type) => {
    return type === 'cert' ? <FaIcons.FaCertificate /> : <FaIcons.FaTrophy />;
  };

  return (
    <section className="milestones" id="achievements">
      <div className="milestones__bg-structural">
        <div className="milestones__grid" />
      </div>

      <div className="milestones__inner">
        <div className="milestones__layout">
          <div className="milestones__gallery-pane">
              <AnimatePresence mode="wait" custom={direction}>
                {selectedAch && (
                  <motion.div 
                    key={activeIndex}
                    custom={direction}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={{
                      initial: (d) => ({
                        x: d > 0 ? 50 : d < 0 ? -50 : 0,
                        opacity: 0,
                        filter: 'blur(10px)',
                        scale: 0.9
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
                        x: d > 0 ? -50 : d < 0 ? 50 : 0,
                        opacity: 0,
                        filter: 'blur(10px)',
                        scale: 0.9,
                        transition: { duration: 0.3 }
                      })
                    }}
                    className={`milestones-card-static ${selectedAch.type}`}
                  >
                    <div className="card-glass-body">
                      <div className="card-header">
                        <div className={`card-icon ${selectedAch.type}`}>{getIcon(selectedAch.type)}</div>
                        <span className="card-type">{selectedAch.type === 'cert' ? 'CERTIFICATION' : 'AWARD'}</span>
                      </div>
                      <h3 className="card-title">{selectedAch.title}</h3>
                      <p className="card-desc">{selectedAch.desc}</p>
                      {selectedAch.url && (
                        <a href={selectedAch.url} target="_blank" rel="noopener noreferrer" className="certificate-link">
                          VIEW_CREDENTIALS
                        </a>
                      )}
                      <div className="card-footer">
                        <span className="card-date">{selectedAch.date}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="milestones__content-pane">
              <div className="milestones__head">
                <h2 className="milestones__title">MILESTONES & <br /><span className="accent-txt">RECOGNITION</span></h2>
              </div>

              <div className="milestones__list-wrapper">
                <div className="milestones__list-container">
                  {achievements.map((ach, i) => (
                    <div
                      key={ach._id}
                      className={`milestones-list-item ${activeIndex === i ? 'focused' : ''} ${ach.type}`}
                      onClick={() => {
                        setDirection(i > activeIndex ? 1 : -1);
                        setActiveIndex(i);
                      }}
                    >
                      <div className="milestones-list-line" />
                      <span className="milestones-list-title">{ach.title}</span>
                      <span className="milestones-list-year">{ach.date || '2024'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
});

export default Milestones;
