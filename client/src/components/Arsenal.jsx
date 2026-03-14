import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import api from '../api';
import './Arsenal.css';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

const getIcon = (iconName) => {
  const allIcons = { ...FaIcons, ...SiIcons };
  const Icon = allIcons[iconName];
  return Icon ? <Icon /> : null;
};

// Sub-component for individual tech items to handle their own center-scaling
const TechBadge = ({ skill, trackX, index, totalWidth, viewportWidth }) => {
  const itemWidth = 200; // width + gap
  const centerPos = viewportWidth / 2;
  
  // Calculate this item's relative X position on the moving track
  const relativeX = useTransform(trackX, (currentX) => {
    // Current base position plus its initial index-based offset
    let pos = (currentX + index * itemWidth) % totalWidth;
    // Normalize pos to be centered around 0 for easier infinite positioning
    if (pos < -totalWidth / 2) pos += totalWidth;
    if (pos > totalWidth / 2) pos -= totalWidth;
    return pos + centerPos - (itemWidth / 2); // Center it relative to viewport
  });

  // Scale based on proximity to center
  const scale = useTransform(relativeX, (val) => {
    const dist = Math.abs(val - (centerPos - itemWidth / 2));
    const threshold = 300;
    if (dist > threshold) return 1;
    return 1 + (1 - dist / threshold) * 0.25;
  });

  // Opacity and Blur based on proximity to center
  const opacity = useTransform(relativeX, [0, viewportWidth/2, viewportWidth], [0.8, 1, 0.8]);
  const blurValue = useTransform(relativeX, (val) => {
    const dist = Math.abs(val - (centerPos - itemWidth / 2));
    return dist > 200 ? `blur(${Math.min((dist - 200) / 20, 4)}px)` : 'blur(0px)';
  });
  const glowOpacity = useTransform(scale, [1, 1.25], [0, 0.4]);

  return (
    <motion.div 
      className="tech-badge"
      style={{ 
        x: relativeX,
        scale,
        opacity,
        filter: blurValue,
        position: 'absolute',
        width: 160,
      }}
    >
      <div className="badge__container" style={{ '--badge-color': skill.color }}>
        <div className="badge__icon" style={{ color: skill.color }}>
          {getIcon(skill.iconName)}
        </div>
        <div className="badge__info">
          <span className="badge__name">{skill.name}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Arsenal = forwardRef(({ skills: initialSkills = [] }, ref) => {
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Use repeated skills for the infinite marquee
  const skills = [...initialSkills, ...initialSkills, ...initialSkills, ...initialSkills];
  const trackX = useMotionValue(0);
  const requestRef = useRef();
  
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (skills.length === 0) return;

    const totalWidth = (skills.length) * 200;
    const speed = 2.0; // px per frame

    const animateMarquee = () => {
      let nextX = trackX.get() - speed;
      if (nextX <= -totalWidth) nextX = 0;
      trackX.set(nextX);
      requestRef.current = requestAnimationFrame(animateMarquee);
    };

    requestRef.current = requestAnimationFrame(animateMarquee);
    return () => cancelAnimationFrame(requestRef.current);
  }, [skills.length]);

  // Maintain handleScroll integration for scene transitions
  useImperativeHandle(ref, () => ({
    handleScroll: (dir) => {
      return false; // Continuous scroll is automatic, let scene transition handle events if at edges
    }
  }));

  return (
    <section className="arsenal" id="arsenal">
      <div className="arsenal__bg-structural">
        <div className="arsenal__grid" />
      </div>

      <div className="arsenal__inner">
        <div className="arsenal__quote-container">
          <div className="arsenal__quote">
            <span className="q-muted">CRAFTING</span> <span className="q-bold">EXPERIENCES</span><br />
            <span className="q-muted">WITH THE</span> <span className="q-bold">TOOLS</span> <span className="q-muted">THAT</span><br />
            <span className="q-bold">SHAPE</span> <span className="q-muted">THE</span> <span className="q-bold">WEB.</span>
          </div>
        </div>

        {skills.length === 0 ? (
          <div className="arsenal__loading">SYNCING_ASSETS...</div>
        ) : (
          <div className="arsenal__marquee-container">
            <div className="marquee__track">
              {skills.map((skill, i) => (
                <TechBadge 
                  key={`${skill._id}-${i}`}
                  skill={skill}
                  index={i}
                  trackX={trackX}
                   totalWidth={skills.length * 200}
                  viewportWidth={viewportWidth}
                />
              ))}
            </div>
            
            {/* Center indicators for depth */}
            <div className="marquee__center-mark">
              <div className="mark__top" />
              <div className="mark__bottom" />
            </div>
            
            <div className="marquee__vignette-left" />
            <div className="marquee__vignette-right" />
          </div>
        )}


      </div>
    </section>
  );
});

export default Arsenal;
