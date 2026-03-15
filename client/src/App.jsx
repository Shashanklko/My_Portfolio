import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from './api';
import './App.css';
import Intro from './components/Intro';
import Identity from './components/Identity';
import Works from './components/Works';
import Legacy from './components/Legacy';
import Arsenal from './components/Arsenal';
import Milestones from './components/Milestones';
import Connect from './components/Connect';
import CustomCursor from './components/CustomCursor';
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import GlobalBackground from './components/GlobalBackground';
import Preloader from './components/Preloader';

const TOTAL_SCENES = 7;
const CHAPTERS = [
  { id: '01', title: 'Intro', x: 0, y: 0 },
  { id: '02', title: 'Identity', x: 0, y: 100 },
  { id: '03', title: 'Arsenal', x: 100, y: 100 },
  { id: '04', title: 'Works', x: 100, y: 0 },
  { id: '05', title: 'Legacy', x: 200, y: 0 },
  { id: '06', title: 'Milestones', x: 200, y: 100 },
  { id: '07', title: 'Connect', x: 300, y: 0 }
];



const SceneContent = ({ activeScene, arsenalRef, worksRef, legacyRef, milestonesRef, moveScene, skills, general, projects, achievements, education, experiences, passions }) => {
  switch (activeScene) {
    case 0: return <Intro general={Array.isArray(general) ? general[0] : general} />;
    case 1: return <Identity />;
    case 2: return <Arsenal ref={arsenalRef} skills={skills} />;
    case 3: return <Works ref={worksRef} onNextScene={() => moveScene(1)} projects={projects} />;
    case 4: return <Legacy ref={legacyRef} education={education} experiences={experiences} passions={passions} />;
    case 5: return <Milestones ref={milestonesRef} achievements={achievements} />;
    case 6: return <Connect general={general} />;
    default: return null;
  }
};

// This component "freezes" the sceneId so it doesn't change when the parent re-renders during exit
const LockedScene = ({ sceneId, ...props }) => {
  const [lockedId] = useState(sceneId);
  return <SceneContent activeScene={lockedId} {...props} />;
};

function Portfolio() {
  const [scene, setScene] = useState(0);
  const [skills, setSkills] = useState([]);
  const [general, setGeneral] = useState(null);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [passions, setPassions] = useState([]);

  useEffect(() => {
    // Prefetch all data to eliminate loading states during transitions
    Promise.all([
      api.get('/skills'),
      api.get('/general'),
      api.get('/projects'),
      api.get('/achievements'),
      api.get('/education'),
      api.get('/experience'),
      api.get('/passions'),
      new Promise(resolve => setTimeout(resolve, 3500))
    ]).then(([skillsRes, generalRes, projRes, achRes, eduRes, expRes, passRes]) => {
      setSkills(skillsRes.data);
      setGeneral(generalRes.data);
      setProjects(projRes.data.map(p => ({
        ...p,
        githubLink: p.githubLink || p.link || '',
        liveLink: p.liveLink || ''
      })));
      setAchievements(achRes.data);
      setEducation(eduRes.data);
      setExperiences(expRes.data);
      setPassions(passRes.data);
      setIsLoadingContent(false);
    }).catch(err => {
      console.error('Error prefetching data:', err);
      setIsLoadingContent(false);
    });
  }, []);
  const [prevScene, setPrevScene] = useState(0);
  const [isNavTransitioning, setIsNavTransitioning] = useState(false);
  const [dirVector, setDirVector] = useState({ x: 0, y: 0 });
  const touchStartY = useRef(0);
  const arsenalRef = useRef();
  const worksRef = useRef();
  const legacyRef = useRef();
  const milestonesRef = useRef();
  const lastScrollTime = useRef(Date.now());

  const getTransitionConfig = (from, to) => {
    const isForward = to > from;
    const pair = isForward ? `${from}-${to}` : `${to}-${from}`;
    
    // Mapping specific transitions
    const configs = {
      '0-1': { x: 0, y: 1 },    // Intro -> Identity: Vertical
      '1-2': { x: 1, y: 0 },    // Identity -> Arsenal: Horizontal Slide
      '2-3': { x: 0, y: -1 },   // Arsenal -> Works: Vertical
      '3-4': { x: 1, y: 0 },    // Works -> Legacy: Horizontal
      '4-5': { x: 0, y: 1 },    // Legacy -> Milestones: Vertical
      '5-6': { x: 1, y: 0, type: 'mirror' } // Milestones -> Connect: Split Mirror
    };

    const config = configs[pair] || { x: 0, y: isForward ? 1 : -1 };
    return {
      x: isForward ? config.x : -config.x,
      y: isForward ? config.y : -config.y,
      type: config.type || 'slide'
    };
  };

  const moveScene = (dir) => {
    if (isNavTransitioning) return;

    const numDir = (dir === 'down' || dir === 1) ? 1 : -1;

    // Sub-scrolling logic for Arsenal (Index 2 in CHAPTERS)
    if (scene === 2 && arsenalRef.current) {
      const handled = arsenalRef.current.handleScroll(numDir);
      if (handled) return;
    }

    // Sub-scrolling logic for Works (Index 3 in CHAPTERS)
    if (scene === 3 && worksRef.current) {
      const handled = worksRef.current.handleScroll(numDir);
      if (handled) return; 
    }

    // Sub-scrolling logic for Milestones (Index 5 in CHAPTERS)
    if (scene === 5 && milestonesRef.current) {
      const handled = milestonesRef.current.handleScroll(numDir);
      if (handled) return;
    }

    let nextScene = scene;
    if (numDir === 1) {
      if (scene < TOTAL_SCENES - 1) nextScene++;
    } else {
      if (scene > 0) nextScene--;
    }

    if (nextScene !== scene) {
      setDirVector(getTransitionConfig(scene, nextScene));
      setPrevScene(scene);
      setScene(nextScene);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch(e.key) {
        case 'ArrowDown': e.preventDefault(); moveScene('down'); break;
        case 'ArrowUp': e.preventDefault(); moveScene('up'); break;
        case ' ': if (!e.repeat) { e.preventDefault(); moveScene('down'); } break;
      }
    };

    const handleWheel = (e) => {
      const currentTime = Date.now();
      
      // Debouncer: wait 1000ms before allowing another strict wheel scroll transition
      if (currentTime - lastScrollTime.current < 1000) return;
      
      if (isNavTransitioning) return;
      
      if (Math.abs(e.deltaY) > 40) { // Added slight threshold bump
        moveScene(e.deltaY > 0 ? 'down' : 'up');
        lastScrollTime.current = currentTime; // Lock scrolling for a moment
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isNavTransitioning) return;
      const tY = e.touches[0].clientY;
      const diffY = touchStartY.current - tY;
      if (Math.abs(diffY) > 50) {
        moveScene(diffY > 0 ? 'down' : 'up');
        touchStartY.current = tY;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scene, isNavTransitioning]);

  return (
    <div className="app-container">
      <CustomCursor />

      <AnimatePresence>
        {isLoadingContent && <Preloader key="preloader" />}
      </AnimatePresence>

      {!isLoadingContent && (
        <>
          <GlobalBackground x={0} y={0} />
          <div className="global-noise" />

          <AnimatePresence mode="popLayout" initial={true}>
            <motion.div
          key={scene}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: (config) => {
              if (config.type === 'mirror') {
                return { opacity: 0, scaleX: 0.5, filter: 'blur(30px)', rotateY: 90, z: -100 };
              }

              return {
                opacity: 0,
                x: config.x * 100 + 'vw',
                y: config.y * 100 + 'vh',
                rotateX: config.y * 45,
                rotateY: config.x * -45,
                scale: 0.85,
                z: -500
              };
            },
            animate: {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              scaleX: 1,
              rotateX: 0,
              rotateY: 0,
              filter: 'blur(0px)',
              z: 0,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                mass: 1,
                staggerChildren: 0.1,
                opacity: { duration: 0.4 }
              }
            },
            exit: (config) => {
              if (config.type === 'mirror') {
                return { opacity: 0, scaleX: 0.5, filter: 'blur(30px)', rotateY: -90, z: -100 };
              }

              return {
                opacity: 0,
                x: config.x * -100 + 'vw',
                y: config.y * -100 + 'vh',
                rotateX: config.y * -45,
                rotateY: config.x * 45,
                scale: 0.85,
                z: -500,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  opacity: { duration: 0.3 }
                }
              };
            }
          }}
          custom={dirVector}
          onAnimationStart={() => setIsNavTransitioning(true)}
          onAnimationComplete={() => setIsNavTransitioning(false)}
          style={{ 
            perspective: 1800,
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          className="scene-wrapper"
        >
          <LockedScene 
            sceneId={scene} 
            arsenalRef={arsenalRef}
            worksRef={worksRef}
            legacyRef={legacyRef}
            milestonesRef={milestonesRef}
            moveScene={moveScene}
            skills={skills}
            general={general}
            projects={projects}
            achievements={achievements}
            education={education}
            experiences={experiences}
            passions={passions}
          />
        </motion.div>
      </AnimatePresence>

      {/* Scene progress navigation */}
      <nav className="scene-nav" aria-label="Section navigation">
        <div className="scene-nav__track">
          <div className="scene-nav__progress" style={{ height: `${(scene / (TOTAL_SCENES - 1)) * 100}%` }} />
          {CHAPTERS.map((ch, i) => (
            <button
              key={ch.id}
              className={`scene-nav__dot ${i === scene ? 'active' : ''}`}
              onClick={() => {
                setPrevScene(scene);
                setScene(i);
              }}
              aria-label={`Go to ${ch.title}`}
              aria-current={i === scene ? 'true' : undefined}
            >
              <span className="scene-nav__label">{ch.title}</span>
            </button>
          ))}
        </div>
      </nav>
        </>
      )}
    </div>
  );
}

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {


  return (
    <Router>
      <div className="app-main-content">
        <Link to="/admin/login" className="admin-gateway" title="Admin Access">
        <div className="dot" />
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
      </Link>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/*" element={<PrivateRoute><AdminLayout /></PrivateRoute>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
