# Full Stack Authentication App (React + Node.js + SQLite)

## ✅ Project Overview

A simple authentication system built with **React.js** (Frontend) and **Node.js + Express** (Backend), using **SQLite** as the database.  
The system allows users to:

- Register (Sign Up) with Email & Password
- Log in using registered credentials
- Stay logged in using JWT stored in cookies
- Access a protected Dashboard
- Log out and clear the session

---

## ⚡ Tech Stack

- Frontend: React.js
- Backend: Node.js + Express
- Database: SQLite
- Authentication: JWT + bcrypt

Project Structure Overview

FULL_STACK_APP/
├── backend/
│ ├── node_modules/
│ ├── database.db
│ ├── package.json
│ ├── package-lock.json
│ └── server.js
├── frontend/
│ └── myapp/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ ├── package.json
│ ├── package-lock.json
│ └── README.md
├── .vscode/
└── README.md

⚡ Setup & Run Instructions

1️⃣ Backend Setup

✅ Step 1: Open terminal and navigate to the backend folder: cd FULL_STACK_APP/backend
✅ Step 2: Install backend dependencies: npm install
✅ Step 3: Start the backend server: node server.js
✅ Backend will run on: http://localhost:3000

2️⃣ Frontend Setup

✅ Step 1: Navigate to frontend app: cd FULL_STACK_APP/frontend/myapp
✅ Step 2: Install frontend dependencies: npm install
✅ Step 3: Start the React development server on port 3001 to avoid conflict: npm start (backend is already running at port 3000)
✅ Frontend will run at: http://localhost:3001

✅ 3️⃣ Usage Flow

1. Go to:
   👉 http://localhost:3001/signup
   ➔ Create a new user account.

2. Then visit:
   👉 http://localhost:3001/login
   ➔ Log in using registered credentials.

3. ✅ If user is already logged in (i.e., JWT token is present in cookies), accessing /login will automatically redirect to:
   👉 http://localhost:3001/dashboard

4. After login success or direct access (with valid token):
   ➔ User is redirected to →
   http://localhost:3001/dashboard (protected route)

5. Click Logout to remove JWT from cookies and go back to /login.

✅ API Endpoints

| Method | Path          | Description                                          |
| ------ | ------------- | ---------------------------------------------------- |
| POST   | `/signup/`    | Register a new user                                  |
| POST   | `/login/`     | Login and get a JWT token                            |
| GET    | `/dashboard/` | Get protected dashboard content (requires valid JWT) |

✅ Important Notes

Passwords are hashed with bcrypt before saving.

JWT tokens are stored in cookies for session persistence.

A ProtectedRoute ensures that only authenticated users can access the dashboard.

The database (database.db) is auto-created on first run.

Make sure to start backend before frontend.
