// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';
import Upload from './Upload';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('userLoggedIn');
    if (user === 'true') setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('userLoggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('userLoggedIn');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={loggedIn ? <Navigate to="/upload" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/upload" 
          element={loggedIn ? <Upload onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
