import api from '../api';
import './Intro.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaArrowDown } from 'react-icons/fa';

function Intro({ general }) {
  // Custom Hook to fetch General info quickly for links and names if needed
  // Data is fetched in App.jsx and passed as 'general' prop

  // Names Setup
  const fallbackNames = ["SHASHANK", "KUMAR"];
  const dynamicNames = general?.name ? general.name.split(' ') : fallbackNames;
  const fullShashank = dynamicNames[0] || '';
  const fullKumar = dynamicNames[1] || '';

  const [shashankIndex, setShashankIndex] = useState(0);
  const [kumarIndex, setKumarIndex] = useState(5); // Fallback length
  const [nameStage, setNameStage] = useState('typing'); // typing -> pausing -> deleting

  useEffect(() => {
    if (general?.name) {
      setKumarIndex((general.name.split(' ')[1] || '').length);
      setShashankIndex(0);
      setNameStage('typing');
    }
  }, [general?.name]);

  // Roles Setup
  const fallbackRoles = ["WEB DESIGNER", "& SOFTWARE ENGINEER"];
  const roles = [
    general?.role ? general.role.toUpperCase() : fallbackRoles[0],
    general?.secondaryRole ? general.secondaryRole.toUpperCase() : fallbackRoles[1]
  ];
  const [roleIndices, setRoleIndices] = useState([0, 0]);
  const [roleStage, setRoleStage] = useState('typing'); // typing -> pausing -> deleting

  // Name Typing Logic
  useEffect(() => {
    let timer;
    if (nameStage === 'typing') {
      timer = setInterval(() => {
        setShashankIndex(s => {
          const nextS = s + 1;
          setKumarIndex(k => {
            const nextK = k - 1;
            if (nextS >= fullShashank.length && nextK <= 0) {
              setNameStage('pausing');
            }
            return Math.max(0, nextK);
          });
          return Math.min(fullShashank.length, nextS);
        });
      }, 150); // slower typing
    } else if (nameStage === 'pausing') {
      timer = setTimeout(() => setNameStage('deleting'), 3000);
    } else if (nameStage === 'deleting') {
      timer = setInterval(() => {
        setShashankIndex(s => {
          const nextS = s - 1;
          setKumarIndex(k => {
            const nextK = k + 1;
            if (nextS <= 0 && nextK >= fullKumar.length) {
              setNameStage('typing');
            }
            return Math.min(fullKumar.length, nextK);
          });
          return Math.max(0, nextS);
        });
      }, 100);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [nameStage, fullShashank.length, fullKumar.length]);


  // Roles Typing Logic
  useEffect(() => {
    let timer;
    if (roleStage === 'typing') {
      timer = setInterval(() => {
        setRoleIndices(prev => {
          let next = [...prev];
          if (next[0] < roles[0].length) {
            next[0]++;
          } else if (next[1] < roles[1].length) {
            next[1]++;
          } else {
            setRoleStage('pausing');
          }
          return next;
        });
      }, 80);
    } else if (roleStage === 'pausing') {
      timer = setTimeout(() => {
        setRoleStage('deleting');
      }, 3000);
    } else if (roleStage === 'deleting') {
      timer = setInterval(() => {
        setRoleIndices(prev => {
          let next = [...prev];
          if (next[1] > 0) {
            next[1]--;
          } else if (next[0] > 0) {
            next[0]--;
          } else {
            setRoleStage('typing');
          }
          return next;
        });
      }, 40);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [roleStage, roles]);

  return (
    <section className="intro-v2" id="home">
      {/* Background Layer with Mask */}
      <div className="intro-v2__bg">
        <motion.div
          className="bg-image"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            backgroundImage: "url('/hero.avif')"
          }}
        />
        <div className="bg-overlay" />
      </div>

      <div className="intro-v2__container">
        {/* Top Header Section */}
        <div className="intro-v2__top">
          <motion.div
            className="top-name"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {"S.K"}
          </motion.div>
        </div>

        {/* Static Massive Typography with Typing Effect */}
        <div className="intro-v2__middle">
          <div className="marquee-row top-row">
            <h1 className="massive-name">
              {fullShashank.split("").map((char, i) => (
                <span
                  key={i}
                  className={`name-part ${i < shashankIndex ? 'visible' : 'hidden'}`}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          <div className="marquee-row bottom-row">
            <h1 className="massive-name">
              {fullKumar.split("").map((char, i) => (
                <span
                  key={i}
                  className={`name-part outline ${i >= kumarIndex ? 'visible' : 'hidden'}`}
                >
                  {char}
                </span>
              ))}
              <span className="typing-cursor" />
            </h1>
          </div>
        </div>

        {/* Bottom Corner Section */}
        <div className="intro-v2__bottom">
          <div className="bottom-left">
            <motion.div
              className="social-links"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <a href={general?.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href={general?.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href={`mailto:${general?.email}`}><FaEnvelope /></a>
            </motion.div>
            <motion.div
              className="loc-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <span className="loc-tag">{general?.location || "BASED IN LUCKNOW, INDIA"}</span>
            </motion.div>
          </div>

          <div className="role-typing">
            {roles.map((line, lineIndex) => (
              <div key={lineIndex} className="role-line">
                {line.substring(0, roleIndices[lineIndex])}
                {lineIndex === (roleIndices[1] > 0 || (roleIndices[0] === roles[0].length && roleStage !== 'typing') ? 1 : 0) && (
                  <span className="role-cursor" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        PRESS <FaArrowDown className="bounce-arrow" /> KEY TO SEE NEXT
      </motion.div>
    </section>
  );
}

export default Intro;
