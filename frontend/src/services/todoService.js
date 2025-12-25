import authService from './authService';
import API_BASE_URL from '../config/api';

const API_URL = `${API_BASE_URL}/api/todos`;

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    ...authService.getAuthHeader()
  };
};

export const todoService = {
  // Get personal todos
  getPersonalTodos: async () => {
    const response = await fetch(`${API_URL}/personal`, {
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch personal todos');
    }
    return response.json();
  },

  // Get group todos
  getGroupTodos: async (groupId) => {
    const response = await fetch(`${API_URL}/group/${groupId}`, {
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch group todos');
    }
    return response.json();
  },

  // Get all user todos
  getAllUserTodos: async () => {
    const response = await fetch(API_URL, {
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  // Get todo by id
  getTodoById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: getHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch todo');
    }
    return response.json();
  },

  // Create personal todo
  createPersonalTodo: async (todo) => {
    const response = await fetch(`${API_URL}/personal`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  // Create group todo
  createGroupTodo: async (groupId, todo) => {
    const response = await fetch(`${API_URL}/group/${groupId}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create group todo');
    }
    return response.json();
  },

  // Update todo
  updateTodo: async (id, todo) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
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
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },

  // Assign user to todo
  assignUser: async (todoId, userId) => {
    const response = await fetch(`${API_URL}/${todoId}/assign/${userId}`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to assign user');
    }
    return response.json();
  },
};
