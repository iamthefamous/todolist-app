import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';
import { todoService } from '../services/todoService';
import authService from '../services/authService';
import './TodosPage.css';

function PersonalTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getPersonalTodos();
      setTodos(data);
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

  const handleAddTodo = async (newTodo) => {
    try {
      const created = await todoService.createPersonalTodo(newTodo);
      setTodos([created, ...todos].sort((a, b) => 
        new Date(a.deadline) - new Date(b.deadline)
      ));
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const updated = await todoService.updateTodo(id, updatedTodo);
      setTodos(todos.map(todo => todo.id === id ? updated : todo)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      );
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

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todos-page">
      <div className="container">
        <header className="page-header">
          <div className="header-content">
            <h1>📝 My Personal Todos</h1>
            <p className="subtitle">Hello, {user?.username}!</p>
          </div>
        </header>

        <AddTodo onAdd={handleAddTodo} />

        {error && (
          <div className="error-message">
            {error}
            <button onClick={loadTodos} className="btn-retry">Retry</button>
          </div>
        )}

        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>{filter === 'all' ? 'No todos yet. Add one to get started!' : `No ${filter} todos.`}</p>
          </div>
        ) : (
          <div className="todo-list">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalTodos;
