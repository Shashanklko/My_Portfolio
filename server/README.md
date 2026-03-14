# Portfolio Backend

This is the backend server for the Personal 3D Portfolio project, powered by Node.js, Express, and MongoDB.

## 🚀 Key Technologies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant mongodb object modeling for node.js.
- **JWT (jsonwebtoken)**: For secure user authentication.
- **Bcrypt.js**: For hashing passwords.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **Dotenv**: Loads environment variables from a `.env` file.

## 🛠️ API Routes

The server exposes the following endpoints:

### Authentication
- `POST /api/auth/login`: Authenticate user and return JWT.
- `POST /api/auth/register`: Create a new admin account.

### Content Management
- `/api/projects`: CRUD operations for portfolio projects.
- `/api/skills`: Manage skill sets.
- `/api/certifications`: Manage certifications.
- `/api/general`: General site settings and social links.
- `/api/documents`: Manage uploaded documents (resumes, etc.).

## 🔧 Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 🏗️ Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Seed initial data (optional):
   ```bash
   node seedSkills.js
   ```

3. Start the server:
   ```bash
   node index.js
   ```
   *Note: Using a tool like `nodemon` is recommended for development.*
