import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import groupService from '../services/groupService';
import authService from '../services/authService';
import './Groups.css';

function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await groupService.getAllGroups();
      setGroups(data);
    } catch (err) {
      if (err.response?.status === 401) {
        authService.logout();
        navigate('/login');
      } else {
        setError('Failed to load groups. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    try {
      const created = await groupService.createGroup(newGroupName.trim());
      setGroups([...groups, created]);
      setNewGroupName('');
      setShowCreateForm(false);
    } catch (err) {
      setError('Failed to create group');
    }
  };

  return (
    <div className="groups-page">
      <div className="container">
        <header className="page-header">
          <div className="header-content">
            <h1>👥 My Groups</h1>
            <p className="subtitle">Collaborate with your team</p>
          </div>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={loadGroups} className="btn-retry">Retry</button>
          </div>
        )}

        <div className="create-group-section">
          {!showCreateForm ? (
            <button 
              onClick={() => setShowCreateForm(true)} 
              className="btn-create-group"
            >
              + Create New Group
            </button>
          ) : (
            <form onSubmit={handleCreateGroup} className="create-group-form">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name..."
                className="group-name-input"
                autoFocus
              />
              <div className="form-actions">
                <button type="submit" className="btn-create">Create</button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewGroupName('');
                  }}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {loading ? (
          <div className="loading">Loading groups...</div>
        ) : groups.length === 0 ? (
          <div className="empty-state">
            <p>No groups yet. Create one to start collaborating!</p>
          </div>
        ) : (
          <div className="groups-grid">
            {groups.map(group => (
              <div 
                key={group.id} 
                className="group-card"
                onClick={() => navigate(`/groups/${group.id}`)}
              >
                <div className="group-icon">👥</div>
                <h3 className="group-name">{group.name}</h3>
                <p className="group-members">
                  {group.members?.length || 0} member{group.members?.length !== 1 ? 's' : ''}
                </p>
                <p className="group-owner">
                  Owner: {group.owner?.username}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Groups;
