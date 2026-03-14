import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaKeyboard } from 'react-icons/fa';
import './NavGuide.css';

const NavGuide = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide after 6 seconds, or if user interacts? 
    // Actually better to keep it subtle but persistent or hide after a few uses.
    const timer = setTimeout(() => setIsVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="nav-guide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="nav-guide__inner">
            <FaKeyboard className="nav-guide__icon" />
            <span className="nav-guide__text">
              SYSTEM CONTROL: USE <span className="highlight">ARROW KEYS [↑ / ↓]</span> TO EXPLORE
            </span>
          </div>
          <div className="nav-guide__pulse" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavGuide;
