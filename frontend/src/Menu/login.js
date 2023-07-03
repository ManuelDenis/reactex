import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login/', {
        username: username,
        password: password
      });
      const { user, token } = response.data;
      // Setează utilizatorul logat și tokenul în starea aplicației
      onLogin(user, token);
    } catch (error) {
      // Tratează eroarea de autentificare
      console.log('Autentificare eșuată', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nume de utilizator" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Parolă" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Autentificare</button>
    </form>
  );
}

function LoggedInUser({ user }) {
  return (
    <div>
      <h2>Bun venit, {user.username}!</h2>
      <p>Email: {user.email}</p>
      {/* Alte informații despre utilizator */}
    </div>
  );
}

function AppLogin() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authToken, setAuthToken] = useState('');

  const handleLogin = (user, token) => {
    setLoggedInUser(user);
    setAuthToken(token);
  };

  return (
    <div>
      {!loggedInUser ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <LoggedInUser user={loggedInUser} />
      )}
    </div>
  );
}

export default AppLogin;
