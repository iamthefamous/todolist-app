# Local Development Configuration Guide

This document explains all configuration settings for running the application locally.

## Environment Variables

### Frontend Configuration

The frontend uses environment variables prefixed with `VITE_` (required by Vite).

**Location**: `frontend/.env`

```bash
# Backend API URL
VITE_API_URL=http://localhost:8080
```

**Setup**:
1. Copy the example file: `cp frontend/.env.example frontend/.env`
2. Or let the start script create it automatically: `./start-frontend.sh`

**Important Notes**:
- The `.env` file is gitignored and won't be committed to the repository
- For production deployment, update `VITE_API_URL` to your deployed backend URL
- Changes to `.env` require restarting the Vite dev server

### Backend Configuration

The backend uses Spring Boot's `application.properties` for configuration.

**Location**: `backend/src/main/resources/application.properties`

```properties
# Server Configuration
server.port=8080

# PostgreSQL Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/todolist_db
spring.datasource.username=todouser
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Application Name
spring.application.name=TodoList Backend
```

**Important Notes**:
- `spring.jpa.hibernate.ddl-auto=update` automatically creates/updates database schema
- Database credentials match the PostgreSQL container configuration
- `show-sql=true` logs all SQL queries for debugging

## Database Configuration

### Docker Compose Setup

**Location**: `docker-compose.yml`

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: todolist-postgres
    environment:
      POSTGRES_USER: todouser
      POSTGRES_PASSWORD: password
      POSTGRES_DB: todolist_db
    ports:
      - "5432:5432"
```

**Usage**:
```bash
# Start database
docker compose up -d

# Check status
docker ps

# Stop database
docker compose down

# Stop and remove all data
docker compose down -v
```

### Manual PostgreSQL Setup

If not using Docker:

```sql
-- Create database and user
CREATE DATABASE todolist_db;
CREATE USER todouser WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE todolist_db TO todouser;

-- Connect to the database
\c todolist_db

-- Grant schema privileges (PostgreSQL 15+)
GRANT ALL ON SCHEMA public TO todouser;
```

Then update `backend/src/main/resources/application.properties` with your credentials.

## Port Configuration

### Default Ports

| Service    | Port | Configurable In                              |
|------------|------|---------------------------------------------|
| Frontend   | 5173 | `frontend/vite.config.js`                   |
| Backend    | 8080 | `backend/.../application.properties`        |
| PostgreSQL | 5432 | `docker-compose.yml`                        |

### Changing Ports

**Frontend Port**:
Edit `frontend/vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000  // Change to your desired port
  }
})
```

**Backend Port**:
Edit `backend/src/main/resources/application.properties`:
```properties
server.port=9090  # Change to your desired port
```

Then update `frontend/.env`:
```bash
VITE_API_URL=http://localhost:9090
```

**PostgreSQL Port**:
Edit `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Maps container port 5432 to host port 5433
```

Then update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/todolist_db
```

## CORS Configuration

The backend is configured to accept requests from the frontend.

**Location**: Backend security configuration

The application uses Spring Security with CORS enabled for:
- `http://localhost:5173` (Vite dev server)
- Additional origins can be configured in the security configuration

## Development vs Production

### Development (Local)

- Frontend: `npm run dev` - Hot reload enabled
- Backend: `./gradlew bootRun` - Spring Boot DevTools available
- Database: Docker container with persistent volume
- Environment: `.env` file with local URLs

### Production

- Frontend: 
  - Build: `npm run build`
  - Serve static files from `dist/` folder
  - Update `.env` with production backend URL
- Backend:
  - Build: `./gradlew clean build`
  - Run: `java -jar build/libs/todolist-backend-1.0.0.jar`
  - Use production database credentials
- Database: Managed PostgreSQL service (e.g., Fly.io Postgres)

## Verification Checklist

After configuration, verify:

- [ ] PostgreSQL container is running: `docker ps`
- [ ] Backend starts without errors: `./start-backend.sh`
- [ ] Frontend starts without errors: `./start-frontend.sh`
- [ ] Frontend can reach backend: Check browser console for API URL log
- [ ] Database connection works: Backend logs show successful connection
- [ ] CORS is configured: No CORS errors in browser console

## Common Issues

### Issue: Frontend shows wrong API URL in console

**Solution**: Check `frontend/.env` file exists and has correct `VITE_API_URL`

### Issue: Backend can't connect to database

**Solutions**:
1. Verify PostgreSQL is running: `docker ps`
2. Check credentials in `application.properties` match `docker-compose.yml`
3. Ensure port 5432 is not blocked by firewall

### Issue: Changes to .env not reflected

**Solution**: Restart the Vite dev server (Ctrl+C and run `npm run dev` again)

### Issue: Port already in use

**Solutions**:
1. Find process using the port: `lsof -i :PORT` (macOS/Linux) or `netstat -ano | findstr :PORT` (Windows)
2. Kill the process or change the port in configuration

## Security Notes

### Local Development

- Default credentials are used for convenience
- Database is only accessible from localhost
- No TLS/SSL required for local development

### Production

- Use strong, unique passwords
- Enable SSL/TLS for database connections
- Set proper CORS origins
- Use environment variables for secrets (not committed to Git)
- Consider using a secrets manager

## Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Spring Boot Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
