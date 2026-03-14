require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Serverless database connection pattern
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set in Vercel!');
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // Fails fast before Vercel 10s timeout
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const educationRoutes = require('./routes/education');
const achievementRoutes = require('./routes/achievements');
const generalRoutes = require('./routes/general');
const experienceRoutes = require('./routes/experience');
const passionRoutes = require('./routes/passions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Ensure database connection before handling ANY API routes
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed: ' + err.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/general', generalRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/passions', passionRoutes);

// Default Route for Backend Status
app.get('/', (req, res) => {
  res.status(200).json({ message: "Backend API is running!" });
});

// Catch-all route to prevent 404s/500s on favicon or unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint essentially not found" });
});

// Only listen locally, NEVER in Vercel Serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, async () => {
    try {
      await connectDB();
    } catch(e) {}
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for Vercel serverless functions
module.exports = app;
