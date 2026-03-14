require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Education = require('./models/Education');
const Achievement = require('./models/Achievement');
const General = require('./models/General');
const Experience = require('./models/Experience');

const PROJECTS = [
  { 
    title: 'WBDA: Water-Borne Diseases Analyzer', 
    desc: 'Collaboratively built an AI/ML data analysis platform across React frontend and Node.js backend. Developed REST APIs persisting model outputs and serving pre-aggregated payloads, achieving sub-second response times and cutting client-side transformation overhead by 60%. Built 5+ dynamic dashboard components (line charts, bar charts, tables) coordinating with ML model. Reduced manual reporting effort by 40% through automated visualization.', 
    tech: ['React.js', 'Express.js', 'Python', 'Node.js'], 
    span: 'lg',
    link: 'https://github.com/Shashanklko'
  },
  { 
    title: 'Finosage: Wealth Management Guider', 
    desc: 'Architected a full-stack financial intelligence platform delivering 4 computational engines powered by 10,000-path Monte Carlo simulations per request. Engineered Markov Regime-Switching and Quasi-Monte Carlo quantitative models with Sobol sequences and Cholesky decomposition across 6 asset classes, generating 12+ derived financial metrics (Sharpe, VaR-95%, Max Drawdown). Developed 9+ interactive visualizations (fan charts, efficient frontier, heatmaps) via Recharts and Framer Motion, with JWT auth, bcrypt, and MongoDB persistence.', 
    tech: ['React 18', 'FastAPI', 'NumPy/SciPy', 'Framer Motion', 'MongoDB'], 
    span: 'lg',
    link: 'https://github.com/Shashanklko'
  },
  { 
    title: 'NovaForecast: Weather App & Extension', 
    desc: 'Architected a low-latency, location-based weather platform capable of delivering real-time meteorological insights. Designed and implemented a React 19 web application using Vite and the Open-Meteo API, alongside a lightweight browser extension. Delivered a scalable, high-performance solution with real-time updates and fast load times across browsers.', 
    tech: ['React.js', 'Vite', 'Express.js', 'Open-Meteo API'], 
    span: 'md',
    link: 'https://github.com/Shashanklko'
  },
  { 
    title: 'AIDMS: AI Directory Management System', 
    desc: 'Created an intelligent file management solution to automate digital file organization using ML. Engineered a Python-based desktop application with a PyQt5 GUI, implementing file classification, duplicate detection, and reversible operations. Categorized 200+ files by extension with 92% accuracy, reducing manual organization time by 25%.', 
    tech: ['Python', 'PyQt5', 'PyTorch', 'scikit-learn'], 
    span: 'md',
    link: 'https://github.com/Shashanklko'
  }
];

const SKILLS = [
  { name: 'React.js', pct: 90, iconName: 'FaReact', color: '#61DAFB' },
  { name: 'JavaScript', pct: 88, iconName: 'SiJavascript', color: '#F7DF1E' },
  { name: 'TypeScript', pct: 80, iconName: 'SiTypescript', color: '#3178C6' },
  { name: 'Node.js', pct: 85, iconName: 'FaNodeJs', color: '#339933' },
  { name: 'Python', pct: 75, iconName: 'FaPython', color: '#3776AB' },
  { name: 'Java', pct: 70, iconName: 'FaJava', color: '#007396' },
  { name: 'HTML/CSS', pct: 95, iconName: 'FaHtml5', color: '#E34F26' },
  { name: 'C++', pct: 80, iconName: 'SiCplusplus', color: '#00599C' },
  { name: 'Spring Boot', pct: 75, iconName: 'SiSpringboot', color: '#6DB33F', isLearning: true },
  { name: 'Express.js', pct: 85, iconName: 'SiExpress', color: '#fff' },
  { name: 'MongoDB', pct: 80, iconName: 'SiMongodb', color: '#47A248' },
  { name: 'MySQL', pct: 75, iconName: 'SiMysql', color: '#4479A1' },
  { name: 'Git', pct: 90, iconName: 'FaGitAlt', color: '#F05032' },
  { name: 'GitHub', pct: 90, iconName: 'FaGithub', color: '#ffffff' },
  { name: 'Docker', pct: 85, iconName: 'FaDocker', color: '#2496ED', isLearning: true },
];

const EDU = [
  { year: '2021 — 2025', degree: 'B.Tech — Computer Science & Engineering', school: 'Lovely Professional University', note: 'Computer Science & Engineering' },
  { year: '2019 — 2021', degree: 'Intermediate (12th) — PCM', school: 'Lucknow Public School & College', note: 'Physics, Chemistry, Maths' },
  { year: '2019', degree: 'Matriculation (10th)', school: 'Lucknow Public School & College', note: 'Science & Mathematics' },
];

const EXPERIENCES = [
  {
    date: "Jun '25 — Jul '25",
    role: "MERN Stack Trainee",
    company: "CipherSchools",
    desc: "Engineered and deployed a responsive, capstone Habit Tracker utilizing the MERN stack architecture. Focused on scalable RESTful API design, NoSQL data modeling in MongoDB, and secure authentication flow to deliver a production-ready user experience."
  }
];

const WINS = [
  { icon: 'FaTrophy', title: '1st in Innovation', desc: 'Hackathon for Water-Borne Disease Analyzer.', color: '#FCD34D' },
  { icon: 'FaMedal', title: '2nd at LPU Hack', desc: 'Impactful fintech solution.', color: '#D1D5DB' },
  { icon: 'FaAward', title: '3rd in Rugby', desc: 'UP-2nd State Rugby Championship.', color: '#FDBA74' },
];

const CERTS = [
  { name: 'Java Programming', org: 'GFG', date: 'Dec 25', url: '#' },
  { name: 'Master Generative AI', org: 'Udemy', date: 'Aug 25', url: '#' },
  { name: 'Full Stack Development', org: 'CipherSchools', date: 'Jul 25', url: '#' },
  { name: 'C++ Programming', org: 'GFG', date: 'Jan 25', url: '#' },
];

const GENERAL = {
  name: 'SHASHANK KUMAR',
  role: 'Software Developer',
  email: 'shashankkmofficial@gmail.com',
  github: 'https://github.com/Shashanklko',
  linkedin: 'https://linkedin.com/in/shashank20003',
  resumeUrl: '#'
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    await Project.deleteMany({});
    await Project.insertMany(PROJECTS.map((p, i) => ({ ...p, order: i })));
    console.log('Projects seeded');

    await Skill.deleteMany({});
    await Skill.insertMany(SKILLS.map((s, i) => ({ ...s, order: i })));
    console.log('Skills seeded');

    await Education.deleteMany({});
    await Education.insertMany(EDU.map((e, i) => ({ ...e, order: i })));
    console.log('Education seeded');

    await Achievement.deleteMany({});
    const wins = WINS.map((w, i) => ({ type: 'win', title: w.title, desc: w.desc, icon: w.icon, color: w.color, order: i }));
    const certs = CERTS.map((c, i) => ({ type: 'cert', title: c.name, desc: c.org, date: c.date, url: c.url, order: i + WINS.length }));
    await Achievement.insertMany([...wins, ...certs]);
    console.log('Achievements seeded');

    await General.deleteMany({});
    await new General(GENERAL).save();
    console.log('General data seeded');

    await Experience.deleteMany({});
    await Experience.insertMany(EXPERIENCES.map((e, i) => ({ ...e, order: i })));
    console.log('Experience seeded');

    console.log('Seed successful');
    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
