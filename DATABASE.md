# Database Schema Documentation

## Database: todolist_db

### Table: todos

This table stores all todo items with their details and status.

#### Schema

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each todo |
| title | VARCHAR(255) | NOT NULL | The title/name of the todo item |
| description | VARCHAR(1000) | NULL | Optional detailed description |
| completed | BOOLEAN | NOT NULL, DEFAULT FALSE | Status of the todo (true=completed, false=active) |
| created_at | DATETIME | NOT NULL | Timestamp when todo was created |
| updated_at | DATETIME | NOT NULL | Timestamp when todo was last updated |
| deadline | DATETIME | NULL | Optional deadline for the todo item |

#### SQL Schema

```sql
CREATE TABLE todos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deadline DATETIME,
    INDEX idx_completed (completed),
    INDEX idx_created_at (created_at),
    INDEX idx_deadline (deadline)
);
```

#### Indexes

- **Primary Key**: `id` - For fast lookups by ID
- **Index**: `completed` - For filtering by completion status
- **Index**: `created_at` - For ordering by creation time
- **Index**: `deadline` - For sorting by deadline

#### Example Data

```sql
INSERT INTO todos (title, description, completed, created_at, updated_at, deadline) 
VALUES 
    ('Learn Spring Boot', 'Complete Spring Boot tutorial with JPA', FALSE, NOW(), NOW(), '2025-12-15 18:00:00'),
    ('Build React App', 'Create a React application with Vite', FALSE, NOW(), NOW(), '2025-12-20 12:00:00'),
    ('Setup MySQL', 'Install and configure MySQL database', TRUE, NOW(), NOW(), NULL);
```

## Entity Relationships

Currently, this is a simple single-table application. Future enhancements could include:

- **Users Table**: Link todos to specific users
- **Categories Table**: Organize todos by category
- **Tags Table**: Add multiple tags to todos (many-to-many relationship)
- **Priorities Table**: Assign priority levels to todos

## JPA Entity Mapping

The `Todo` Java entity class is mapped to the `todos` table using JPA annotations:

```java
@Entity
@Table(name = "todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private Boolean completed = false;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "deadline")
    private LocalDateTime deadline;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

## Database Configuration

The application uses the following MySQL configuration in `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/todolist_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Configuration Notes

- **createDatabaseIfNotExist=true**: Automatically creates the database if it doesn't exist
- **ddl-auto=update**: Automatically updates the schema based on entity changes
- **show-sql=true**: Logs SQL queries to the console (useful for debugging)

## Backup and Restore

### Backup Database

```bash
mysqldump -u root -p todolist_db > todolist_backup.sql
```

### Restore Database

```bash
mysql -u root -p todolist_db < todolist_backup.sql
```

## Query Examples

### Get all active todos
```sql
SELECT * FROM todos WHERE completed = FALSE ORDER BY created_at DESC;
```

### Get completed todos
```sql
SELECT * FROM todos WHERE completed = TRUE ORDER BY updated_at DESC;
```

### Search todos by title
```sql
SELECT * FROM todos WHERE title LIKE '%Spring%' ORDER BY created_at DESC;
```

### Count todos by status
```sql
SELECT completed, COUNT(*) as count FROM todos GROUP BY completed;
```

### Get todos sorted by deadline (upcoming first)
```sql
SELECT * FROM todos ORDER BY deadline ASC;
```

### Get overdue todos
```sql
SELECT * FROM todos WHERE deadline < NOW() AND completed = FALSE ORDER BY deadline ASC;
```
