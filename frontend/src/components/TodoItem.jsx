import { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editDeadline, setEditDeadline] = useState(
    todo.deadline ? new Date(todo.deadline).toISOString().slice(0, 16) : ''
  );

  const handleToggleComplete = () => {
    onUpdate(todo.id, {
      ...todo,
      completed: !todo.completed
    });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        ...todo,
        title: editTitle,
        description: editDescription,
        deadline: editDeadline ? new Date(editDeadline).toISOString() : null
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
    setIsEditing(false);
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
      <div className="todo-item editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="edit-input"
          placeholder="Todo title"
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
          placeholder="Deadline (optional)"
        />
        <div className="edit-actions">
          <button onClick={handleSaveEdit} className="btn-save">Save</button>
          <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  const deadlineInfo = formatDeadline(todo.deadline);

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <h3 className="todo-title">{todo.title}</h3>
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
