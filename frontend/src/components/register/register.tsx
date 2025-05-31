import React from 'react';
import AuthForm from '../auth/AuthForm';
import './register.css';

const Register: React.FC = () => {
  return (
    <div className="register-container">
      <AuthForm mode="register" />
    </div>
  );
};

export default Register;