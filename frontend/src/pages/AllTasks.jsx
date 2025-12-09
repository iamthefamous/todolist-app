import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from '../components/TodoItem';
import { todoService } from '../services/todoService';
import authService from '../services/authService';
import './TodosPage.css';

function AllTasks() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getAllUserTodos();
      // Filter to show only active (non-completed) tasks
      const activeTodos = data.filter(todo => !todo.completed);
      setTodos(activeTodos);
    } catch (err) {
      if (err.response?.status === 401) {
        authService.logout();
        navigate('/login');
      } else {
        setError('Failed to load todos. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const updated = await todoService.updateTodo(id, updatedTodo);
      // If the todo is now completed, remove it from the list
      if (updated.completed) {
        setTodos(todos.filter(todo => todo.id !== id));
      } else {
        setTodos(todos.map(todo => todo.id === id ? updated : todo)
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        );
      }
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const personalTodos = todos.filter(todo => !todo.group);
  const groupTodos = todos.filter(todo => todo.group);

  return (
    <div className="todos-page">
      <div className="container">
        <header className="page-header">
          <div className="header-content">
            <h1>📋 All Active Tasks</h1>
            <p className="subtitle">View all your active tasks in one place</p>
          </div>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={loadTodos} className="btn-retry">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <p>No active tasks! You're all caught up! 🎉</p>
          </div>
        ) : (
          <>
            {personalTodos.length > 0 && (
              <div className="tasks-section">
                <h2 className="section-title">📝 Personal Tasks ({personalTodos.length})</h2>
                <div className="todo-list">
                  {personalTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onUpdate={handleUpdateTodo}
                      onDelete={handleDeleteTodo}
                    />
                  ))}
                </div>
              </div>
            )}

            {groupTodos.length > 0 && (
              <div className="tasks-section">
                <h2 className="section-title">👥 Group Tasks ({groupTodos.length})</h2>
                <div className="todo-list">
                  {groupTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onUpdate={handleUpdateTodo}
                      onDelete={handleDeleteTodo}
                      showGroup={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllTasks;
