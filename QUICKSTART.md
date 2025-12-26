# Quick Start Guide

This guide will help you get the TodoList application running locally in just a few minutes.

## Prerequisites

Make sure you have these installed:
- Java 17 or higher
- Node.js 18+ and npm
- Docker (for MySQL database)

## Quick Start Steps

### 1. Clone the repository (if you haven't already)

```bash
git clone https://github.com/iamthefamous/todolist-app.git
cd todolist-app
```

### 2. Start the database

```bash
docker compose up -d
```

Wait a few seconds for MySQL to start and become healthy.

### 3. Start the backend

Open a terminal and run:

```bash
./start-backend.sh
```

Wait for the message: "Started TodoListBackendApplication"

### 4. Start the frontend

Open another terminal and run:

```bash
./start-frontend.sh
```

This will automatically:
- Create a `.env` file from `.env.example` (if it doesn't exist)
- Install npm dependencies (first time only)
- Start the Vite dev server

### 5. Open the application

Open your browser and navigate to: **http://localhost:5173**

## Verification

You should see:
- Backend running on: **http://localhost:8080**
- Frontend running on: **http://localhost:5173**
- MySQL running on: **localhost:3306**

## What Just Happened?

1. **MySQL Database**: Started in a Docker container with the database `todolist_db` already configured
2. **Spring Boot Backend**: Started on port 8080 with automatic database schema creation
3. **React Frontend**: Started on port 5173 with Vite, configured to connect to the backend on port 8080

## Next Steps

- Register a new user account
- Create your first todo
- Explore the API documentation in `API.md`

## Troubleshooting

### Backend won't start
- Make sure MySQL is running: `docker ps`
- Check port 8080 is not in use: `lsof -i :8080` (macOS/Linux)

### Frontend can't connect to backend
- Verify backend is running on port 8080
- Check that `.env` file exists in the `frontend/` directory
- Verify `VITE_API_URL=http://localhost:8080` in `frontend/.env`

### Database issues
- Reset the database: `docker compose down -v && docker compose up -d`

## Stopping the Application

1. Stop the frontend: Press `Ctrl+C` in the frontend terminal
2. Stop the backend: Press `Ctrl+C` in the backend terminal
3. Stop the database: `docker compose down`

For more detailed information, see:
- `SETUP.md` - Detailed setup guide
- `README.md` - Full project documentation
- `API.md` - API reference
