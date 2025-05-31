import React from 'react';
import '../components/Navbar/login/login.css'; 
import Login from '../components/Navbar/login/login'; 


const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Login />
    </div>
  );
};

export default Home;
