import { useState } from 'react';
import './AddTodo.css';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        deadline: deadline ? new Date(deadline).toISOString() : null,
        completed: false
      });
      setTitle('');
      setDescription('');
      setDeadline('');
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
              placeholder="Deadline (optional)"
              className="todo-input"
            />
            <div className="form-actions">
              <button type="submit" className="btn-add">Add Todo</button>
              <button 
                type="button" 
                onClick={() => {
                  setIsExpanded(false);
                  setTitle('');
                  setDescription('');
                  setDeadline('');
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
