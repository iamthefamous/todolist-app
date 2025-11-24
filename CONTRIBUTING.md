# Contributing to TodoList App

## Project Structure for Developers

This document explains how to extend and modify the TodoList application.

## Backend Structure (Spring Boot)

### Adding a New Field to Todo

1. **Update the Entity** (`backend/src/main/java/com/todolist/backend/model/Todo.java`):
   ```java
   @Column(name = "priority")
   private Integer priority;
   
   // Add getter and setter
   public Integer getPriority() {
       return priority;
   }
   
   public void setPriority(Integer priority) {
       this.priority = priority;
   }
   ```

2. **Update the Service** (if needed for business logic)
3. **Update the Controller** (automatically handles the new field)
4. **Restart the backend** - Hibernate will update the schema

### Adding a New Endpoint

1. **Add method to Service** (`TodoService.java`):
   ```java
   public List<Todo> getTodosByPriority(Integer priority) {
       return todoRepository.findByPriority(priority);
   }
   ```

2. **Add query method to Repository** (`TodoRepository.java`):
   ```java
   List<Todo> findByPriority(Integer priority);
   ```

3. **Add endpoint to Controller** (`TodoController.java`):
   ```java
   @GetMapping("/priority/{priority}")
   public ResponseEntity<List<Todo>> getTodosByPriority(@PathVariable Integer priority) {
       List<Todo> todos = todoService.getTodosByPriority(priority);
       return new ResponseEntity<>(todos, HttpStatus.OK);
   }
   ```

### Testing Backend Changes

```bash
cd backend
mvn test                    # Run all tests
mvn spring-boot:run        # Start the server
```

## Frontend Structure (React + Vite)

### Project Organization

```
frontend/src/
├── components/          # React components
│   ├── TodoItem.jsx    # Individual todo item
│   ├── AddTodo.jsx     # Add todo form
│   └── *.css           # Component styles
├── services/           # API communication
│   └── todoService.js # Backend API calls
├── App.jsx             # Main application component
├── App.css             # App-level styles
├── index.css           # Global styles
└── main.jsx           # Application entry point
```

### Adding a New Component

1. **Create the component file** (`components/TodoFilter.jsx`):
   ```jsx
   import './TodoFilter.css';
   
   function TodoFilter({ currentFilter, onFilterChange }) {
     return (
       <div className="todo-filter">
         <button onClick={() => onFilterChange('all')}>All</button>
         <button onClick={() => onFilterChange('active')}>Active</button>
         <button onClick={() => onFilterChange('completed')}>Completed</button>
       </div>
     );
   }
   
   export default TodoFilter;
   ```

2. **Create the styles** (`components/TodoFilter.css`)
3. **Import and use in App.jsx**:
   ```jsx
   import TodoFilter from './components/TodoFilter';
   
   // In the JSX:
   <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
   ```

### Adding API Functionality

Update `services/todoService.js`:

```javascript
export const todoService = {
  // ... existing methods
  
  getTodosByPriority: async (priority) => {
    const response = await fetch(`${API_URL}/priority/${priority}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos by priority');
    }
    return response.json();
  },
};
```

### Testing Frontend Changes

```bash
cd frontend
npm run dev              # Start dev server with hot reload
npm run build           # Build for production
npm run preview         # Preview production build
```

## Database Changes

### Adding a New Table

1. **Create Entity Class** in `backend/src/main/java/com/todolist/backend/model/`
2. **Add JPA Annotations**:
   ```java
   @Entity
   @Table(name = "categories")
   public class Category {
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long id;
       
       @Column(nullable = false)
       private String name;
       
       // Getters and setters
   }
   ```

3. **Create Repository Interface**
4. **Create Service Class**
5. **Create Controller**
6. **Restart backend** - Hibernate creates the table

### Database Relationships

Example: One-to-Many (Category has many Todos)

**Category.java:**
```java
@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
private List<Todo> todos;
```

**Todo.java:**
```java
@ManyToOne
@JoinColumn(name = "category_id")
private Category category;
```

## Common Development Tasks

### 1. Adding User Authentication

Steps:
1. Add Spring Security dependency
2. Create User entity
3. Implement UserDetailsService
4. Add JWT token generation
5. Update frontend to store and send tokens
6. Protect API endpoints

### 2. Adding Search Functionality

Backend:
```java
@GetMapping("/search")
public ResponseEntity<List<Todo>> searchTodos(@RequestParam String query) {
    List<Todo> todos = todoService.searchTodos(query);
    return new ResponseEntity<>(todos, HttpStatus.OK);
}
```

Frontend:
```jsx
const [searchQuery, setSearchQuery] = useState('');

<input 
  type="text" 
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search todos..."
/>
```

### 3. Adding Categories

1. Create Category entity and repository
2. Add category relationship to Todo
3. Create category endpoints
4. Add category dropdown in AddTodo component
5. Display category in TodoItem component

## Code Style Guidelines

### Java (Backend)

- Use camelCase for variables and methods
- Use PascalCase for class names
- Always add JavaDoc for public methods
- Keep controllers thin, put logic in services
- Use meaningful variable names
- Follow Spring Boot best practices

Example:
```java
/**
 * Creates a new todo item
 * @param todo The todo item to create
 * @return The created todo with generated ID
 */
public Todo createTodo(Todo todo) {
    return todoRepository.save(todo);
}
```

### JavaScript/React (Frontend)

- Use camelCase for variables and functions
- Use PascalCase for component names
- Keep components small and focused
- Use functional components with hooks
- Destructure props
- Add PropTypes or TypeScript for type safety

Example:
```jsx
function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleUpdate = () => {
    // Implementation
  };
  
  return (
    <div className="todo-item">
      {/* JSX */}
    </div>
  );
}
```

### CSS

- Use kebab-case for class names
- Group related styles together
- Use CSS variables for colors and common values
- Make styles responsive

## Git Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/add-categories
   ```

2. Make changes and commit:
   ```bash
   git add .
   git commit -m "Add category support to todos"
   ```

3. Push and create pull request:
   ```bash
   git push origin feature/add-categories
   ```

## Debugging Tips

### Backend Debugging

1. **Enable SQL logging** in `application.properties`:
   ```properties
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.format_sql=true
   ```

2. **Add logging**:
   ```java
   import org.slf4j.Logger;
   import org.slf4j.LoggerFactory;
   
   private static final Logger logger = LoggerFactory.getLogger(TodoService.class);
   
   logger.info("Creating todo: {}", todo.getTitle());
   ```

3. **Use debugging tools**: IntelliJ IDEA debugger, or add breakpoints

### Frontend Debugging

1. **Console logging**:
   ```javascript
   console.log('Todos:', todos);
   console.error('Error:', error);
   ```

2. **React DevTools**: Install browser extension
3. **Network tab**: Monitor API calls in browser DevTools
4. **Use debugger**:
   ```javascript
   debugger; // Execution will pause here
   ```

## Learning Resources

### Spring Boot
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- Spring Data JPA
- RESTful API design
- MySQL and JDBC

### React
- [React Documentation](https://react.dev)
- React Hooks (useState, useEffect)
- Component composition
- State management

### Full Stack
- REST API principles
- CORS and cross-origin requests
- HTTP methods and status codes
- Database design and normalization

## Next Features to Implement

Easy additions:
- [ ] Todo priority levels
- [ ] Due dates
- [ ] Todo categories/tags
- [ ] Search and filter
- [ ] Sort options
- [ ] Todo notes/comments
- [ ] Keyboard shortcuts

Advanced features:
- [ ] User authentication
- [ ] Multi-user support
- [ ] Real-time updates (WebSocket)
- [ ] File attachments
- [ ] Recurring todos
- [ ] Todo sharing
- [ ] Email notifications
- [ ] Mobile app

## Questions or Issues?

For questions about the codebase:
1. Check the documentation in README.md
2. Review the API documentation in API.md
3. Study the database schema in DATABASE.md
4. Look at existing code for patterns

Happy coding! 🎓
