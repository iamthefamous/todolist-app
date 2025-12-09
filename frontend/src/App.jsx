import { useState, useEffect } from 'react'
import './App.css'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import { todoService } from './services/todoService'

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [sortByDeadline, setSortByDeadline] = useState(false);

  useEffect(() => {
    loadTodos();
  }, [sortByDeadline]);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = sortByDeadline 
        ? await todoService.getTodosSortedByDeadline()
        : await todoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Please make sure the backend server is running.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const created = await todoService.createTodo(newTodo);
      setTodos([created, ...todos]);
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const updated = await todoService.updateTodo(id, updatedTodo);
      setTodos(todos.map(todo => todo.id === id ? updated : todo));
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
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
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📝 My TodoList</h1>
          <p className="subtitle">Stay organized and productive</p>
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

        <div className="sort-options">
          <label>
            <input
              type="checkbox"
              checked={sortByDeadline}
              onChange={(e) => setSortByDeadline(e.target.checked)}
            />
            Sort by Deadline
          </label>
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

export default App
