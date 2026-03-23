# Personal Portfolio

A modern, dynamic, and interactive portfolio website built with React, Three.js, and Node.js. This project features a full-stack architecture with a React-based frontend and a Node/Express/MongoDB backend for content management.

## 🚀 Features

- **Dynamic 3D Environment**: Implemented using React Three Fiber and Three.js for an immersive experience.
- **Admin Panel**: Secure dashboard to manage projects, skills, certifications, and social links.
- **Responsive Design**: Fully optimized for various screen sizes using modern CSS.
- **Micro-animations**: Smooth transitions and hover effects using Framer Motion.
- **Real-time Updates**: Changes made in the admin panel are immediately reflected on the portfolio.

## 🛠️ Technology Stack

### Frontend
- **React (Vite)**
- **Three.js / React Three Fiber / Drei**
- **Framer Motion**
- **Tailwind CSS** (if applicable) / **Vanilla CSS**
- **Axios** (for API communication)
- **Lucide React** (icons)

### Backend
- **Node.js**
- **Express**
- **MongoDB (Mongoose)**
- **JSON Web Tokens (JWT)** (for authentication)
- **Bcrypt.js** (for password hashing)

## 📁 Project Structure

```text
My_Portfolio/
├── client/          # React frontend (Vite/TypeScript/Three.js)
│   ├── src/         # Source code
│   └── public/      # Static assets
└── server/          # Node.js backend (Express/MongoDB)
    ├── models/      # Database schemas
    ├── routes/      # API endpoints
    └── middleware/  # Authentication and logic
```

## 🏗️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd My_Portfolio
   ```

2. Set up the Backend:
   - Navigate to the `server` directory.
   - Install dependencies: `npm install`.
   - Create a `.env` file based on the environment requirements (PORT, MONGODB_URI, JWT_SECRET).
   - Start the server: `node index.js`.

3. Set up the Frontend:
   - Navigate to the `client` directory.
   - Install dependencies: `npm install`.
   - Start the development server: `npm run dev`.

## 🌐 Deployment (Vercel)

This project is optimized for deployment on Vercel as two separate projects (Client and Server).

### 1. Server Deployment
- Set the Root Directory to `server`.
- Add Environment Variables:
  - `MONGODB_URI`: Your MongoDB Atlas connection string.
  - `JWT_SECRET`: A secure random string.
  - `CLIENT_URL`: Your deployed frontend link.

### 2. Client Deployment
- Set the Root Directory to `client`.
- Add Environment Variable:
  - `VITE_API_URL`: Your deployed backend link.

## 📜 License

This project is licensed under the ISC License.
