import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import './register.css';

const ForgotPassword: React.FC = () => {
  return (
    <div className="register-container">
      <AuthForm mode="forgot" />
    </div>
  );
};

export default ForgotPassword;
