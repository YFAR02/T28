import React, { useEffect } from 'react';

const Logout: React.FC = () => {
  useEffect(() => {
    const logoutBackend = async () => {
      const token = localStorage.getItem('access_token');
      const client_id = import.meta.env.VITE_OAUTH_CLIENT_ID || '';
      const client_secret = import.meta.env.VITE_OAUTH_CLIENT_SECRET || '';
      if (token) {
        try {
          await fetch('http://localhost:8000/o/revoke_token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              token,
              client_id,
              client_secret,
            }),
          });
        } catch (err) {
          // Ignore errors, just proceed to logout frontend
        }
      }
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    };
    logoutBackend();
  }, []);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
