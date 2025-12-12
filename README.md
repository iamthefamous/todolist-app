# 📝 TodoList Application

A full-stack TodoList application built with **Vite + React** (frontend), **Java Spring Boot** (backend), and **PostgreSQL** (database) for OOP and Web & Internet courses.

## 🚀 Features

- ✅ Create, Read, Update, and Delete todos (CRUD operations)
- ✅ Mark todos as complete/incomplete
- ✅ Edit todo title and description
- ✅ Filter todos (All, Active, Completed)
- ✅ Responsive and modern UI
- ✅ RESTful API architecture
- ✅ PostgreSQL database integration
- ✅ JPA/Hibernate for ORM

## 🏗️ Project Structure

```
todolist-app/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/todolist/backend/
│   │       │   ├── controller/    # REST controllers
│   │       │   ├── model/         # Entity models
│   │       │   ├── repository/    # JPA repositories
│   │       │   └── service/       # Business logic
│   │       └── resources/
│   │           └── application.properties
│   └── build.gradle           # Gradle dependencies
│
└── frontend/                  # Vite + React frontend
    ├── src/
    │   ├── components/        # React components
    │   ├── services/          # API services
    │   ├── App.jsx            # Main app component
    │   └── main.jsx           # Entry point
    └── package.json           # NPM dependencies
```

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Java 17** or higher
- **Gradle 8.5+** (or use the included Gradle wrapper)
- **Node.js 18+** and **npm**
- **PostgreSQL 14+** (or Docker to run PostgreSQL in a container)

## 🗄️ Database Setup

### Option 1: Using Docker (Recommended)

The easiest way to run PostgreSQL is using Docker:

```bash
docker-compose up -d
```

This will start PostgreSQL on port 5432 with the database `todolist_db` already created.

### Option 2: Manual PostgreSQL Installation

1. Install and start PostgreSQL server

2. Create the database:
   ```sql
   CREATE DATABASE todolist_db;
   CREATE USER todouser WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE todolist_db TO todouser;
   ```

3. Update database credentials in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/todolist_db
   spring.datasource.username=todouser
   spring.datasource.password=your_password
   ```

## 🚀 Running the Application

### Quick Start

For the easiest setup experience, use the provided shell scripts:

1. **Start the database** (if using Docker):
   ```bash
   docker-compose up -d
   ```

2. **Start the backend** (in one terminal):
   ```bash
   ./start-backend.sh
   ```

3. **Start the frontend** (in another terminal):
   ```bash
   ./start-frontend.sh
   ```

4. Open your browser at `http://localhost:5173`

### Manual Setup

#### Backend (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build and run the application:
   ```bash
   ./gradlew bootRun
   ```
   
   Or build the JAR and run it:
   ```bash
   ./gradlew clean build
   java -jar build/libs/todolist-backend-1.0.0.jar
   ```

3. The backend server will start at `http://localhost:8080`

#### Frontend (React + Vite)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`

## 🚀 Deployment to Fly.io

This application is ready to be deployed to Fly.io using the provided Dockerfile.

### Prerequisites

1. Install the Fly CLI: https://fly.io/docs/hands-on/install-flyctl/
2. Sign up for a Fly.io account: https://fly.io/app/sign-up

### Deployment Steps

1. **Login to Fly.io:**
   ```bash
   flyctl auth login
   ```

2. **Create a PostgreSQL database on Fly.io:**
   ```bash
   flyctl postgres create --name todolist-db --region iad
   ```

3. **Launch the application:**
   ```bash
   flyctl launch
   ```
   
   This will use the `fly.toml` configuration file. When prompted:
   - Choose your app name (or use the default)
   - Select your region
   - Don't create a database (we already created one)

4. **Attach the database to your app:**
   ```bash
   flyctl postgres attach todolist-db
   ```
   
   This will automatically set the DATABASE_URL environment variable.

5. **Set additional environment variables (if needed):**
   ```bash
   flyctl secrets set JWT_SECRET=your-secret-key
   ```

6. **Deploy the application:**
   ```bash
   flyctl deploy
   ```

7. **Check the deployment status:**
   ```bash
   flyctl status
   flyctl logs
   ```

Your application should now be available at `https://your-app-name.fly.dev`

### Updating the Deployment

To deploy changes:

```bash
flyctl deploy
```

## 🐳 Docker Deployment

The application includes a Dockerfile for containerized deployment.

### Build the Docker image:

```bash
cd backend
docker build -t todolist-backend .
```

### Run with Docker Compose:

```bash
docker-compose up --build
```

This will start both PostgreSQL and the backend in containers.

## 🔌 API Endpoints

### Todo Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos?completed=true` | Get completed todos |
| GET | `/api/todos?completed=false` | Get active todos |
| GET | `/api/todos/{id}` | Get todo by ID |
| GET | `/api/todos/search?title={query}` | Search todos by title |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/{id}` | Update todo |
| DELETE | `/api/todos/{id}` | Delete todo |
| DELETE | `/api/todos` | Delete all todos |

### Request/Response Examples

**Create Todo (POST `/api/todos`):**
```json
{
  "title": "Learn Spring Boot",
  "description": "Complete the Spring Boot tutorial",
  "completed": false
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Learn Spring Boot",
  "description": "Complete the Spring Boot tutorial",
  "completed": false,
  "createdAt": "2025-11-24T10:00:00",
  "updatedAt": "2025-11-24T10:00:00"
}
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Backend framework
- **Spring Data JPA** - Data access layer
- **Hibernate** - ORM framework
- **Gradle** - Build tool and dependency management

### Database
- **PostgreSQL 14+** - Relational database

## 🎨 Key Concepts Demonstrated

### OOP Concepts
- **Encapsulation**: Entity classes with private fields and public getters/setters
- **Inheritance**: Spring Boot component hierarchy
- **Abstraction**: Service and Repository interfaces
- **Polymorphism**: JPA repository methods

### Web Development Concepts
- **RESTful API**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **MVC Architecture**: Separation of concerns (Model-View-Controller)
- **Single Page Application (SPA)**: React frontend
- **CORS**: Cross-Origin Resource Sharing configuration
- **HTTP Status Codes**: Proper REST response codes
- **JSON**: Data exchange format

## 📝 Development Notes

- The backend runs on port `8080`
- The frontend runs on port `5173` (Vite default)
- CORS is configured to allow requests from `http://localhost:5173`
- JPA is set to `ddl-auto=update` for automatic schema generation

## 🔧 Troubleshooting

**Backend won't start:**
- Check PostgreSQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is not in use

**Frontend can't connect to backend:**
- Verify backend is running on port 8080
- Check browser console for CORS errors
- Ensure API URL in `frontend/src/services/todoService.js` is correct

**Database connection errors:**
- Verify PostgreSQL service is running
- Check database name and credentials
- Ensure PostgreSQL driver is included in `build.gradle`

## 👨‍💻 Author

Created for OOP and Web & Internet courses final project.

## 📄 License

This project is created for educational purposes.