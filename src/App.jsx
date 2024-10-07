import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProfessorDashboard from './components/ProfessorDashboard';
import StudentDashboard from './components/StudentDashboard';
import AppointmentHistory from './components/AppointmentHistory';
import './styles/App.css';

function App() {
  // For simplicity, we'll use a dummy isLoggedIn state
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  return (
    <Router>
      <div className="App container">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/professor"
            element={
              isLoggedIn && userRole === 'professor' ? (
                <ProfessorDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student"
            element={
              isLoggedIn && userRole === 'student' ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/history"
            element={
              isLoggedIn ? <AppointmentHistory /> : <Navigate to="/login" />
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
