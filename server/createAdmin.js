require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const username = 'admin'; // Default username
    const password = 'password123'; // Default password

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Admin user already exists');
    } else {
      const admin = new User({ username, password });
      await admin.save();
      console.log(`Admin user created: ${username} / ${password}`);
    }
    
    process.exit();
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin();
