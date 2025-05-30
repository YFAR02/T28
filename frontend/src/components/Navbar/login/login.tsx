import React from 'react';
import './login.css';

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form">
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          name="username"
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          name="password"
        />
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
