import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';
import { todoService } from '../services/todoService';
import groupService from '../services/groupService';
import authService from '../services/authService';
import './TodosPage.css';

function GroupTodos() {
  const [todos, setTodos] = useState([]);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const { groupId } = useParams();

  useEffect(() => {
    loadGroupAndTodos();
  }, [groupId]);

  const loadGroupAndTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const [groupData, todosData] = await Promise.all([
        groupService.getGroup(groupId),
        todoService.getGroupTodos(groupId)
      ]);
      setGroup(groupData);
      setTodos(todosData);
    } catch (err) {
      if (err.response?.status === 401) {
        authService.logout();
        navigate('/login');
      } else {
        setError('Failed to load group data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const created = await todoService.createGroupTodo(groupId, newTodo);
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
            <button onClick={() => navigate('/groups')} className="btn-back">
              ← Back to Groups
            </button>
            <h1>👥 {group?.name || 'Group'} Todos</h1>
            {group && (
              <p className="subtitle">
                {group.members?.length} member{group.members?.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </header>

        <AddTodo onAdd={handleAddTodo} />

        {error && (
          <div className="error-message">
            {error}
            <button onClick={loadGroupAndTodos} className="btn-retry">Retry</button>
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

export default GroupTodos;
