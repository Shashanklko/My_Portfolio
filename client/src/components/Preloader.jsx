import { motion } from 'framer-motion';
import './Preloader.css';

const Preloader = () => {
  return (
    <motion.div 
      className="preloader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="preloader-svg-wrapper">
        <svg viewBox="0 0 200 100" className="sk-logo">
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">SK</text>
        </svg>
      </div>
    </motion.div>
  );
};

export default Preloader;
