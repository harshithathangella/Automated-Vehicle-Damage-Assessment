// Login.js (Example stub, customize with your real login form)
import React from 'react';

function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: validate user credentials here before login
    onLogin();
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" required style={{ width: '100%', marginBottom: 10 }} />
        <input type="password" placeholder="Password" required style={{ width: '100%', marginBottom: 10 }} />
        <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
      </form>
    </div>
  );
}

export default Login;
