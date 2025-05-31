import React from 'react';
import './register.css';

const Register: React.FC = () => {
  return (
    <div className="register-container">
      <h2 className="register-header">SOCIAL GOOD</h2>
      <h3 className="register-subheader">REGISTRATION</h3>
      <form className="register-form">
        <input
          type="text"
          placeholder="Name"
          className="register-input"
          name="name"
        />
        <input
          type="email"
          placeholder="Email"
          className="register-input"
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          name="password"
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="register-input"
          name="confirmPassword"
        />
        <button
          type="button"
          className="register-button"
          onClick={() => window.location.href = "/chat"}
        >
          Register
        </button>
      </form>
      <p className="register-footer">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Register;
