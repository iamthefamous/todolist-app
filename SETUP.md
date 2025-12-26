# Setup Guide

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/iamthefamous/todolist-app.git
cd todolist-app
```

### 2. Start PostgreSQL Database

#### Option A: Using Docker (Recommended)

```bash
docker-compose up -d
```

This will:
- Pull the PostgreSQL 16 Alpine image
- Create a container named `todolist-postgres`
- Set up the `todolist_db` database
- Expose PostgreSQL on port 5432

To check if PostgreSQL is running:
```bash
docker ps
```

To stop PostgreSQL:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```

#### Option B: Local PostgreSQL Installation

1. Install PostgreSQL 14 or higher
2. Start PostgreSQL service
3. Create database:
   ```sql
   CREATE DATABASE todolist_db;
   CREATE USER todouser WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE todolist_db TO todouser;
   ```
4. Update credentials in `backend/src/main/resources/application.properties`

### 3. Start the Backend

Open a terminal and run:

```bash
./start-backend.sh
```

Or manually:
```bash
cd backend
./gradlew bootRun
```

Wait for the message: "Started TodoListBackendApplication"

The backend will be available at: `http://localhost:8080`

### 4. Start the Frontend

Open another terminal and run:

```bash
./start-frontend.sh
```

Or manually:
```bash
cd frontend
npm install  # First time only
npm run dev
```

The frontend will be available at: `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to: `http://localhost:5173`

## Verification

### Test Backend API

```bash
# Health check (should return empty array initially)
curl http://localhost:8080/api/todos

# Create a test todo
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","description":"Testing the API","completed":false}'

# Get all todos
curl http://localhost:8080/api/todos
```

### Test Frontend

1. Open `http://localhost:5173` in your browser
2. You should see the TodoList application with a purple gradient background
3. Try adding a new todo
4. Try marking a todo as complete
5. Try editing a todo
6. Try deleting a todo
7. Try filtering todos (All/Active/Completed)

## Common Issues

### Backend won't start

**Error: "Communications link failure"**
- PostgreSQL is not running
- Check: `docker ps` or verify local PostgreSQL service
- Solution: Start PostgreSQL using `docker-compose up -d`

**Error: "Port 8080 already in use"**
- Another application is using port 8080
- Solution: Stop the other application or change the port in `application.properties`

**Error: "Access denied for user 'todouser'"**
- Wrong PostgreSQL credentials
- Solution: Update username/password in `application.properties`

### Frontend won't start

**Error: "Port 5173 already in use"**
- Another Vite dev server is running
- Solution: Stop the other server or change the port in `vite.config.js`

**Error: "Cannot find module"**
- Dependencies not installed
- Solution: Run `cd frontend && npm install`

**Error: "Failed to fetch todos"**
- Backend is not running
- Backend URL is incorrect
- Solution: Ensure backend is running on port 8080

### CORS Errors

If you see CORS errors in the browser console:
- Verify the frontend URL in `@CrossOrigin` annotation in `TodoController.java`
- Default is `http://localhost:5173`
- Restart the backend after making changes

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Changes to React files are reflected immediately
- **Backend**: Use Spring Boot DevTools for hot reload (add dependency if needed)

### Database Management

#### View database content using Docker:

```bash
docker exec -it todolist-postgres psql -U todouser -d todolist_db
```

Then run SQL commands:
```sql
\dt
SELECT * FROM todos;
```

#### Reset database:

```bash
docker-compose down -v
docker-compose up -d
```

### Build for Production

#### Backend:
```bash
cd backend
./gradlew clean build
java -jar build/libs/todolist-backend-1.0.0.jar
```

#### Frontend:
```bash
cd frontend
npm run build
# Serve the dist/ folder with any static file server
```

## Next Steps

After successfully running the application:

1. Explore the codebase
2. Read the API documentation in `API.md`
3. Study the database schema in `DATABASE.md`
4. Try adding new features:
   - User authentication
   - Todo categories
   - Due dates
   - Priorities
   - Search functionality
   - Dark mode

## Getting Help

If you encounter issues:

1. Check the console output for error messages
2. Review the troubleshooting section in README.md
3. Verify all prerequisites are installed
4. Ensure all services are running (MySQL, Backend, Frontend)
5. Check firewall/antivirus settings

## Architecture Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │ ──────> │   React     │ ──────> │   Spring    │
│             │  HTTP   │   (Vite)    │   API   │   Boot      │
│ localhost:  │ <────── │  Frontend   │ <────── │   Backend   │
│    5173     │         │             │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
                                                       │
                                                       │ JDBC
                                                       ▼
                                                ┌─────────────┐
                                                │ PostgreSQL  │
                                                │  Database   │
                                                │  localhost: │
                                                │    5432     │
                                                └─────────────┘
```

Happy coding! 🚀
