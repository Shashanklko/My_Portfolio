import React from 'react';
import { motion } from 'framer-motion';
import './Identity.css';

function Identity() {
  return (
    <section className="identity-v2" id="identity">
      <div className="identity-bg-media">
        <motion.div 
          className="bg-image-layer" 
          style={{ backgroundImage: "url('/mine.png')" }}
          animate={{
            scale: [1, 1.05, 1],
            x: [0, -20, 0],
            rotate: [0, 1, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="bg-overlay-dark" />
      </div>
      
      <div className="v2-container">
        {/* Left Column: Headline */}
        <div className="identity-header-wrap single-view">
          <h2 className="identity-headline">
            <motion.div 
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="weight-light">I build modern digital</span> <span className="keyword">products</span>
            </motion.div>
            <br/>
            <motion.div 
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="weight-light">where</span> <span className="keyword">strategy <span className="weight-light">meets </span>style</span>,
            </motion.div>
            <br/>
            <motion.div 
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <span className="weight-light">and</span> <span className="keyword">speed <span className="weight-light">meets</span> intelligence.</span>
            </motion.div>
          </h2>

          <motion.div 
            className="identity-decoration"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="dec-line" />
            <div className="dec-dot" />
            <div className="dec-line line-right" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Identity;
