# Online Live Polling System

This is a real-time online polling application built using React, Node.js, Express.js, MySQL, and Socket.IO.

## Features

- Audience can vote for one nominee
- One vote per browser session
- Admin login
- Live vote count update using Socket.IO
- Total votes display
- Vote count for each nominee
- Bar chart for vote visualization
- Default nominees using seeder logic
- Docker support

## Tech Stack

### Frontend
- React
- Axios
- React Router DOM
- Socket.IO Client
- Recharts

### Backend
- Node.js
- Express.js
- MySQL
- Socket.IO
- JWT
- bcryptjs

## Default Admin Login Details

Use the following default admin credentials to access the admin dashboard.

### Admin Login URL

http://localhost:5173/admin/login

    Credentials
    Email: admin@gmail.com
    Password: admin123

Note: The default admin is created using the seeder file. Please run the seeder before trying to login.

    cd backend
    npm run seed

After successful login, the admin can view the live polling dashboard. 

## Backend Installation

    1. Go to backend folder

        cd backend

    2. Initialize backend project

        If package.json is not already created, run:

        npm init -y

    3. Install backend dependencies

        npm install express mysql2 cors dotenv bcryptjs jsonwebtoken socket.io

    4. Install backend development dependency

        npm install -D nodemon

    5. Backend package.json scripts

        Add these scripts inside backend/package.json:

        "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "seed": "node seeders/seed.js"
        }

    6. Create backend .env file

        Create a .env file inside the backend folder.

        PORT=5000

        DB_HOST=127.0.0.1
        DB_USER=root
        DB_PASSWORD=
        DB_NAME=live_polling_db

        JWT_SECRET=online_polling_secret_key
        FRONTEND_URL=http://localhost:5173

        Note: Update DB_USER and DB_PASSWORD based on your local MySQL credentials.

## Database Setup

    1. Create database

        Open MySQL and run:

            CREATE DATABASE IF NOT EXISTS live_polling_db;

    2. Use database

            USE live_polling_db;

    3. Create tables

            CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS nominees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            party_name VARCHAR(100),
            image_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS votes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nominee_id INT NOT NULL,
            session_id VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (nominee_id) REFERENCES nominees(id) ON DELETE CASCADE,
            UNIQUE KEY unique_session_vote (session_id)
            );

## Seeder Setup

    The seeder file is used to create:

        Default admin

        Default nominees

        Run seeder

        cd backend

        npm run seed

After running the seeder, the following data will be inserted:

    Default Admin
    Email: admin@gmail.com
    Password: admin123

## Default Nominees

    Nominee One - Party A
    Nominee Two - Party B
    Nominee Three - Party C
    Nominee Four - Party D
    Nominee Five - Party E

## Run Backend Server

    Inside the backend folder, run:

        npm run dev

    Backend will run on:

        http://localhost:5000

## Frontend Installation

    1. Create frontend project

    If frontend project is not already created, run this from the root folder:

        npm create vite@latest frontend

    Select:

        React
    
    JavaScript:

    2. Go to frontend folder

        cd frontend
    
    3. Install frontend dependencies
        
        npm install
    
    4. Install required frontend packages
        
        npm install axios react-router-dom socket.io-client recharts
    
    5. Install Tailwind CSS
        
        npm install -D tailwindcss postcss autoprefixer
    
    6. Initialize Tailwind CSS
        
        npx tailwindcss init -p

    7. Tailwind config

        Update frontend/tailwind.config.js:

        export default {
        content: ["./index.html", "./src/**/*.{js,jsx}"],
        theme: {
            extend: {},
        },
        plugins: [],
        };

    Update frontend/src/index.css:

        @tailwind base;
        @tailwind components;
        @tailwind utilities;

## Run Frontend Server

    Inside the frontend folder, run:

        npm run dev

    Frontend will run on:

        http://localhost:5173

## Application URLs

    Audience Voting Page

        http://localhost:5173

    Admin Login Page

        http://localhost:5173/admin/login

    Admin Dashboard Page

        http://localhost:5173/admin/dashboard

## Important: Run the seeder before trying to login.

        cd backend

        npm run seed

    API Endpoints

        Admin Login

            POST /api/auth/login

            Request body:

            {
            "email": "admin@gmail.com",
            "password": "admin123"
            }

    Get Nominees
    
        GET /api/nominees

    Cast Vote
    
        POST /api/votes

## Request body:

    {
    "nominee_id": 1,
    "session_id": "unique-browser-session-id"
    }

## Get Vote Summary

    GET /api/votes/summary

Header:

Authorization: Bearer your_token_here
Socket.IO Event
Event Name
voteUpdated

When a user votes, the backend emits the voteUpdated event. The admin dashboard listens to this event and updates the vote count and graph in real time.

## How To Run Full Project

    Terminal 1: Start Backend

        cd backend
        npm run dev

    Terminal 2: Start Frontend

        cd frontend
        npm run dev

## Then open:

    http://localhost:5173

## Important Notes: 

    The admin password is stored as a hashed password using bcryptjs.
    One vote per browser session is handled using sessionStorage.
    Backend also prevents duplicate voting using a unique session_id.
    Socket.IO is used for real-time admin dashboard updates.
    Seeder is used to insert default admin and nominees.
    


