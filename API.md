# API Documentation

## Base URL
```
http://localhost:8080/api
```

## Endpoints

### 1. Get All Todos

Get a list of all todos or filter by completion status.

**Endpoint:** `GET /todos`

**Query Parameters:**
- `completed` (optional): Filter by completion status
  - `true` - Get only completed todos
  - `false` - Get only active todos
  - omit - Get all todos

**Example Requests:**
```bash
# Get all todos
curl http://localhost:8080/api/todos

# Get only completed todos
curl http://localhost:8080/api/todos?completed=true

# Get only active todos
curl http://localhost:8080/api/todos?completed=false
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Learn Spring Boot",
    "description": "Complete the Spring Boot tutorial",
    "completed": false,
    "createdAt": "2025-11-24T10:00:00",
    "updatedAt": "2025-11-24T10:00:00"
  },
  {
    "id": 2,
    "title": "Build React App",
    "description": "Create a React application with Vite",
    "completed": true,
    "createdAt": "2025-11-24T09:30:00",
    "updatedAt": "2025-11-24T11:15:00"
  }
]
```

---

### 2. Get Todo by ID

Retrieve a specific todo by its ID.

**Endpoint:** `GET /todos/{id}`

**Path Parameters:**
- `id` (required): The ID of the todo

**Example Request:**
```bash
curl http://localhost:8080/api/todos/1
```

**Response:** `200 OK`
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

**Error Response:** `404 Not Found`
```json
{}
```

---

### 3. Search Todos

Search for todos by title (case-insensitive).

**Endpoint:** `GET /todos/search`

**Query Parameters:**
- `title` (required): Search query string

**Example Request:**
```bash
curl "http://localhost:8080/api/todos/search?title=spring"
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Learn Spring Boot",
    "description": "Complete the Spring Boot tutorial",
    "completed": false,
    "createdAt": "2025-11-24T10:00:00",
    "updatedAt": "2025-11-24T10:00:00"
  }
]
```

---

### 4. Create Todo

Create a new todo item.

**Endpoint:** `POST /todos`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Todo",
  "description": "Optional description",
  "completed": false
}
```

**Required Fields:**
- `title`: string (required)

**Optional Fields:**
- `description`: string
- `completed`: boolean (default: false)

**Example Request:**
```bash
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Spring Boot",
    "description": "Complete the Spring Boot tutorial",
    "completed": false
  }'
```

**Response:** `201 Created`
```json
{
  "id": 3,
  "title": "Learn Spring Boot",
  "description": "Complete the Spring Boot tutorial",
  "completed": false,
  "createdAt": "2025-11-24T12:00:00",
  "updatedAt": "2025-11-24T12:00:00"
}
```

---

### 5. Update Todo

Update an existing todo item.

**Endpoint:** `PUT /todos/{id}`

**Path Parameters:**
- `id` (required): The ID of the todo to update

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Todo",
  "description": "Updated description",
  "completed": true
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:8080/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Spring Boot - Updated",
    "description": "Complete the advanced Spring Boot tutorial",
    "completed": true
  }'
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Learn Spring Boot - Updated",
  "description": "Complete the advanced Spring Boot tutorial",
  "completed": true,
  "createdAt": "2025-11-24T10:00:00",
  "updatedAt": "2025-11-24T12:30:00"
}
```

**Error Response:** `404 Not Found`

---

### 6. Delete Todo

Delete a specific todo item.

**Endpoint:** `DELETE /todos/{id}`

**Path Parameters:**
- `id` (required): The ID of the todo to delete

**Example Request:**
```bash
curl -X DELETE http://localhost:8080/api/todos/1
```

**Response:** `204 No Content`

**Error Response:** `404 Not Found`

---

### 7. Delete All Todos

Delete all todo items.

**Endpoint:** `DELETE /todos`

**Example Request:**
```bash
curl -X DELETE http://localhost:8080/api/todos
```

**Response:** `204 No Content`

---

## HTTP Status Codes

The API uses the following HTTP status codes:

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Resource deleted successfully |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error occurred |

## CORS Configuration

The API allows Cross-Origin requests from:
- `http://localhost:5173` (Vite development server)

If you need to add more origins, update the `@CrossOrigin` annotation in `TodoController.java`:

```java
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
```

## Error Handling

All endpoints return appropriate HTTP status codes. In case of errors:

**Server Error Response:** `500 Internal Server Error`
```json
null
```

**Not Found Response:** `404 Not Found`
```json
null
```

## Testing the API

### Using cURL

```bash
# Create a todo
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","completed":false}'

# Get all todos
curl http://localhost:8080/api/todos

# Update a todo
curl -X PUT http://localhost:8080/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Todo","completed":true}'

# Delete a todo
curl -X DELETE http://localhost:8080/api/todos/1
```

### Using Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:8080/api`
3. Add `Content-Type: application/json` header for POST/PUT requests
4. Test each endpoint with sample data

### Using the Frontend

The React frontend application provides a user-friendly interface to interact with all API endpoints. Simply run the frontend at `http://localhost:5173`.
