# 📝 TodoList Application

A full-stack TodoList application built with **Vite + React** (frontend), **Java Spring Boot** (backend), and **MySQL** (database) for OOP and Web & Internet courses.

## 🚀 Features

- ✅ Create, Read, Update, and Delete todos (CRUD operations)
- ✅ Mark todos as complete/incomplete
- ✅ Edit todo title and description
- ✅ Filter todos (All, Active, Completed)
- ✅ Responsive and modern UI
- ✅ RESTful API architecture
- ✅ MySQL database integration
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
│   └── pom.xml                # Maven dependencies
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
- **Maven 3.6+** 
- **Node.js 18+** and **npm**
- **MySQL 8.0+** (or Docker to run MySQL in a container)

## 🗄️ Database Setup

### Option 1: Using Docker (Recommended)

The easiest way to run MySQL is using Docker:

```bash
docker-compose up -d
```

This will start MySQL on port 3306 with the database `todolist_db` already created.

### Option 2: Manual MySQL Installation

1. Install and start MySQL server

2. Create the database (or let Spring Boot create it automatically):
   ```sql
   CREATE DATABASE todolist_db;
   ```

3. Update database credentials in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/todolist_db?createDatabaseIfNotExist=true
   spring.datasource.username=root
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
   mvn spring-boot:run
   ```
   
   Or build the JAR and run it:
   ```bash
   mvn clean package
   java -jar target/todolist-backend-1.0.0.jar
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
- **Maven** - Dependency management

### Database
- **MySQL 8.0** - Relational database

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
- MySQL connection uses `createDatabaseIfNotExist=true`

## 🔧 Troubleshooting

**Backend won't start:**
- Check MySQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is not in use

**Frontend can't connect to backend:**
- Verify backend is running on port 8080
- Check browser console for CORS errors
- Ensure API URL in `frontend/src/services/todoService.js` is correct

**Database connection errors:**
- Verify MySQL service is running
- Check database name and credentials
- Ensure MySQL driver is included in `pom.xml`

## 👨‍💻 Author

Created for OOP and Web & Internet courses final project.

## 📄 License

This project is created for educational purposes.