const API_URL = 'http://localhost:8080/api/todos';

export const todoService = {
  // Get all todos
  getAllTodos: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  // Get todo by id
  getTodoById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todo');
    }
    return response.json();
  },

  // Create new todo
  createTodo: async (todo) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  // Update todo
  updateTodo: async (id, todo) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    return response.json();
  },

  // Delete todo
  deleteTodo: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },

  // Get todos by status
  getTodosByStatus: async (completed) => {
    const response = await fetch(`${API_URL}?completed=${completed}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos by status');
    }
    return response.json();
  },

  // Get todos sorted by deadline
  getTodosSortedByDeadline: async () => {
    const response = await fetch(`${API_URL}?sortBy=deadline`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos sorted by deadline');
    }
    return response.json();
  },
};
