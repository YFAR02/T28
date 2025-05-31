import React from 'react';
import '../components/login/login.css'; 
import Login from '../components/login/login'; 

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Login />
    </div>
  );
};

export default Home;
