import { Link, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  // Don't show navbar on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>📝 TodoList</h2>
        </div>
        <div className="navbar-links">
          <Link 
            to="/all-tasks" 
            className={location.pathname === '/all-tasks' ? 'active' : ''}
          >
            All Tasks
          </Link>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Personal Tasks
          </Link>
          <Link 
            to="/groups" 
            className={location.pathname.startsWith('/groups') ? 'active' : ''}
          >
            Group Tasks
          </Link>
        </div>
        <div className="navbar-actions">
          <span className="navbar-user">👤 {user?.username}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
