import React from 'react';
import AuthForm from '../auth/AuthForm';
import './login.css';

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <AuthForm mode="login" />
    </div>
  );
};

export default Login;
