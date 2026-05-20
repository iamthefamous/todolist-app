# Docker Setup Guide

## Quick Start with Docker

Run the backend and MySQL database with a single command:

```bash
docker-compose up -d
```

This will:
1. Start MySQL 8.0 database on port 3306
2. Build and start the Spring Boot backend on port 8080

## Access the Application

- **Backend API**: http://localhost:8080
- **MySQL Database**: localhost:3306

## Docker Services

### MySQL
- Image: `mysql:8.0`
- Port: 3306
- Database: `todolist_db`
- User: `todouser`
- Password: `password`

### Backend (Spring Boot)
- Multi-stage build with Gradle
- Port: 8080
- Automatically connects to MySQL
- Runs schema migrations on startup

## Docker Commands

### Start all services
```bash
docker-compose up -d
```

### Start only the database
```bash
docker-compose up -d mysql
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f mysql
```

### Stop all services
```bash
docker-compose down
```

### Stop and remove all data
```bash
docker-compose down -v
```

### Rebuild after code changes
```bash
docker-compose up -d --build
```

### View running containers
```bash
docker-compose ps
```

## Architecture

```
┌─────────────────────────┐
│   Backend Container     │
│   (Spring Boot)         │
│   Port: 8080            │
└────────┬────────────────┘
         │
         ↓
┌─────────────────────────┐
│   MySQL Container       │
│   Port: 3306            │
│   Volume: mysql_data    │
└─────────────────────────┘
```

## Environment Variables

The backend automatically uses these environment variables in Docker:
- `SPRING_DATASOURCE_URL`: jdbc:mysql://mysql:3306/todolist_db
- `SPRING_DATASOURCE_USERNAME`: todouser
- `SPRING_DATASOURCE_PASSWORD`: password
- `SPRING_JPA_HIBERNATE_DDL_AUTO`: update
- `MYSQL_HOST`: mysql
- `MYSQL_PORT`: 3306

## Volumes

- **mysql_data**: Persists MySQL database data across container restarts

## Network

All services are connected via the default Docker network, allowing them to communicate using service names (e.g., `backend`, `mysql`).

## Troubleshooting

### Backend can't connect to database
```bash
# Check if MySQL is healthy
docker-compose ps

# View MySQL logs
docker-compose logs mysql

# Restart services
docker-compose restart backend
```

### Port already in use
```bash
# Find process using port 8080
sudo lsof -i :8080

# Or change port in docker-compose.yml
ports:
  - "8081:8080"  # Change 8080 to 8081
```

### Reset everything
```bash
# Stop and remove all containers and volumes
docker-compose down -v

# Remove images
docker rmi todolist-app-backend

# Start fresh
docker-compose up -d --build
```

## Development Workflow

### Local Development (without Docker)
Use the existing scripts:
```bash
docker-compose up -d mysql  # Only start MySQL
./start-backend.sh          # Run backend locally
./start-frontend.sh         # Run frontend locally
```

### Production Deployment
The Dockerfiles are production-ready:
- Multi-stage builds minimize image size
- Non-root users for security
- Health checks for reliability
- Persistent volumes for data

### Railway Deployment
Railway can deploy the backend and database using this `docker-compose.yml`.
Set environment variables in Railway if you want different database credentials or a custom `PORT`.

## Performance Notes

- **First build**: Takes 5-10 minutes (downloads dependencies)
- **Subsequent builds**: Much faster (cached layers)
- **Startup time**: ~30 seconds for all services
- **Memory usage**: Varies by workload and deployment environment (Railway sizing may differ).

## Security Notes

- Default passwords are used for development
- In production, use strong passwords via environment variables
- Database is only accessible from Docker network
