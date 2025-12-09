import { useState } from 'react';
import './AddTodo.css';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && deadline) {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        deadline: new Date(deadline).toISOString(),
        priority: priority,
        completed: false
      });
      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('MEDIUM');
      setIsExpanded(false);
    }
  };

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new todo..."
            className="todo-input"
          />
        </div>
        
        {isExpanded && (
          <>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="todo-textarea"
              rows="3"
            />
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Deadline (required)"
              className="todo-input"
              required
            />
            <div className="priority-selector">
              <label>Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="priority-select"
              >
                <option value="HIGH">🔴 High</option>
                <option value="MEDIUM">🟢 Medium</option>
                <option value="LOW">🔵 Low</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-add">Add Todo</button>
              <button 
                type="button" 
                onClick={() => {
                  setIsExpanded(false);
                  setTitle('');
                  setDescription('');
                  setDeadline('');
                  setPriority('MEDIUM');
                }}
                className="btn-cancel-add"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default AddTodo;
