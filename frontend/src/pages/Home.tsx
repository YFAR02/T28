import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header className="home-header">
        <div className="logo">
          Study<span className="highlight">LM</span>
        </div>
        <div className="nav-buttons">
          <button className="btn-outline" onClick={() => navigate('/register')}>
            REGISTER
          </button>
          <button className="btn-solid" onClick={() => navigate('/login')}>
            LOGIN
          </button>
        </div>
      </header>

      <main className="home-main">
        <div className="main-card">
          <p className="card-subheading">
            LOOKING FOR A NEW, INTERACTIVE WAY TO STUDY? <br />
            READY TO LEVERAGE AI AND LEARN EFFICIENTLY AND EFFECTIVELY?
          </p>
          <h1 className="card-title">Learn Anything</h1>
          <button className="try-button">TRY StUdYLM</button>
        </div>
      </main>
    </div>
  );
};

export default Home;
