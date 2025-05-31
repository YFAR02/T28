import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './register.css';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!token) {
      setError('Invalid or missing token.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/accounts/password_reset/confirm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        const data = await response.json();
        setError(data && data.detail ? data.detail : 'Failed to reset password.');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="register-container">
      <h2>Reset Password</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          className="register-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="register-input"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="register-button">Change Password</button>
        {error && <div className="authform-error">{error}</div>}
        {success && <div className="authform-success">Password changed! Redirecting to login...</div>}
      </form>
    </div>
  );
};

export default ResetPassword;
