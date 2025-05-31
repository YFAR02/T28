import React, { useState } from 'react';
import './authform.css';

interface AuthFormProps {
  mode: 'login' | 'register' | 'forgot';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  // Shared state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/o/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username,
          password,
          grant_type: 'password',
          client_id: import.meta.env.VITE_OAUTH_CLIENT_ID || '',
          client_secret: import.meta.env.VITE_OAUTH_CLIENT_SECRET || '',
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('access_token', data.access_token);
        window.location.href = '/';
      } else {
        setError(data.error_description || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/accounts/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await fetch('http://localhost:8000/accounts/password_reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        setError('Failed to send reset email');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="authform-container">
      {mode === 'login' && (
        <form className="authform-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="authform-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="authform-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="authform-button">Sign In</button>
          {error && <div className="authform-error">{error}</div>}
          <p className="authform-footer">
            Don't have an account? <a href="/register">Register</a> | <a href="/forgot">Forgot password?</a>
          </p>
        </form>
      )}
      {mode === 'register' && (
        <form className="authform-form" onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            className="authform-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="authform-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="authform-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="authform-input"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="authform-button">Register</button>
          {error && <div className="authform-error">{error}</div>}
          {success && <div className="authform-success">Registration successful!</div>}
          <p className="authform-footer">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      )}
      {mode === 'forgot' && (
        <form className="authform-form" onSubmit={handleForgot}>
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Email"
            className="authform-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit" className="authform-button">Send Reset Email</button>
          {error && <div className="authform-error">{error}</div>}
          {success && <div className="authform-success">Reset email sent!</div>}
          <p className="authform-footer">
            <a href="/login">Back to login</a>
          </p>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
