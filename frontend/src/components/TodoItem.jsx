import { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editDeadline, setEditDeadline] = useState(
    todo.deadline ? new Date(todo.deadline).toISOString().slice(0, 16) : ''
  );
  const [editPriority, setEditPriority] = useState(todo.priority || 'MEDIUM');

  const handleToggleComplete = () => {
    onUpdate(todo.id, {
      ...todo,
      completed: !todo.completed
    });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editDeadline) {
      const deadlineDate = new Date(editDeadline);
      if (isNaN(deadlineDate.getTime())) {
        alert('Please enter a valid deadline');
        return;
      }
      onUpdate(todo.id, {
        ...todo,
        title: editTitle,
        description: editDescription,
        deadline: deadlineDate.toISOString(),
        priority: editPriority
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditDeadline(
      todo.deadline ? new Date(todo.deadline).toISOString().slice(0, 16) : ''
    );
    setEditPriority(todo.priority || 'MEDIUM');
    setIsEditing(false);
  };
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'HIGH': return '#ff4444';
      case 'MEDIUM': return '#44ff44';
      case 'LOW': return '#4444ff';
      default: return '#44ff44';
    }
  };
  
  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'HIGH': return '🔴 High';
      case 'MEDIUM': return '🟢 Medium';
      case 'LOW': return '🔵 Low';
      default: return '🟢 Medium';
    }
  };

  const formatDeadline = (deadline) => {
    if (!deadline) return null;
    const date = new Date(deadline);
    const now = new Date();
    const isOverdue = date < now && !todo.completed;
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { text: `${formattedDate} ${formattedTime}`, isOverdue };
  };

  if (isEditing) {
    return (
      <div className="todo-item editing" style={{ borderLeftColor: getPriorityColor(editPriority) }}>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="edit-input"
          placeholder="Todo title"
          required
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="edit-textarea"
          placeholder="Description (optional)"
          rows="2"
        />
        <input
          type="datetime-local"
          value={editDeadline}
          onChange={(e) => setEditDeadline(e.target.value)}
          className="edit-input"
          placeholder="Deadline (required)"
          required
        />
        <div className="priority-selector">
          <label>Priority:</label>
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="priority-select"
          >
            <option value="HIGH">🔴 High</option>
            <option value="MEDIUM">🟢 Medium</option>
            <option value="LOW">🔵 Low</option>
          </select>
        </div>
        <div className="edit-actions">
          <button onClick={handleSaveEdit} className="btn-save">Save</button>
          <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  const deadlineInfo = formatDeadline(todo.deadline);

  return (
    <div 
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      style={{ borderLeftColor: getPriorityColor(todo.priority) }}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <div className="todo-header">
            <h3 className="todo-title">{todo.title}</h3>
            <span className="priority-badge" style={{ backgroundColor: getPriorityColor(todo.priority) }}>
              {getPriorityLabel(todo.priority)}
            </span>
          </div>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          {deadlineInfo && (
            <p className={`todo-deadline ${deadlineInfo.isOverdue ? 'overdue' : ''}`}>
              📅 {deadlineInfo.text}
              {deadlineInfo.isOverdue && ' (Overdue!)'}
            </p>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
        <button onClick={() => onDelete(todo.id)} className="btn-delete">Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;
