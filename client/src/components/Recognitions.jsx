import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Recognitions.css';
import * as FaIcons from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Recognitions = forwardRef(({ achievements }, ref) => {
  const [selectedAch, setSelectedAch] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useImperativeHandle(ref, () => ({
    handleScroll: (direction) => {
      return false; // Disable sub-scrolling
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
    <section className="recognitions" id="recognitions">
      <div className="recognitions__bg-structural">
        <div className="recognitions__grid" />
      </div>

      <div className="recognitions__inner">
        <div className="recognitions__layout">
          <div className="recognitions__gallery-pane">
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
                    className={`recognitions-card-static ${selectedAch.type}`}
                  >
                    <div className="card-glass-body">
                      <span className="card-date">{selectedAch.date}</span>
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="recognitions__content-pane">
              <div className="recognitions__head">
                <h2 className="recognitions__title">PROFESSIONAL <br /><span className="accent-txt">RECOGNITIONS</span></h2>
              </div>

              <div className="recognitions__list-wrapper">
                <div className="recognitions__list-container">
                  {achievements.map((ach, i) => (
                    <motion.div
                      key={ach._id}
                      className={`recognitions-list-item ${activeIndex === i ? 'focused' : ''} ${ach.type}`}
                      whileHover={{ 
                        x: -15,
                        transition: { type: 'spring', stiffness: 400, damping: 10 }
                      }}
                      onClick={() => {
                        setDirection(i > activeIndex ? 1 : -1);
                        setActiveIndex(i);
                      }}
                      onMouseEnter={() => {
                        setDirection(i > activeIndex ? 1 : -1);
                        setActiveIndex(i);
                      }}
                    >
                      <div className="recognitions-list-line" />
                      <span className="recognitions-list-title">{ach.title}</span>
                      <span className="recognitions-list-year">{ach.date || '2024'}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
});

export default Recognitions;
