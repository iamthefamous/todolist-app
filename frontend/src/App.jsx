import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PersonalTodos from './pages/PersonalTodos';
import Groups from './pages/Groups';
import GroupTodos from './pages/GroupTodos';
import authService from './services/authService';
import './App.css';

// Protected Route component
function ProtectedRoute({ children }) {
  const user = authService.getCurrentUser();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <PersonalTodos />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/groups" 
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/groups/:groupId" 
          element={
            <ProtectedRoute>
              <GroupTodos />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
