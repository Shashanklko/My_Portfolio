import { motion } from 'framer-motion';
import './GlobalBackground.css';

const GlobalBackground = () => {
  return (
    <div className="gb-container">
      {/* Layer 1: Distant Stardust */}
      <motion.div 
        className="gb-stardust"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Layer 2: Grid System (Subtle Drift) */}
      <motion.div 
        className="gb-grid"
        animate={{
          rotate: [0, 1, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="gb-grid-inner" />
      </motion.div>

      {/* Layer 3: Ambient Orbs (Flow Motion) */}
      <div className="gb-orbs">
        <motion.div 
          className="orb orb-1" 
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="orb orb-2" 
          animate={{
            x: [0, -60, 60, 0],
            y: [0, 60, -60, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="orb orb-3" 
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};


export default GlobalBackground;
