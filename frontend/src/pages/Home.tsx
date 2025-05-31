import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Title from '../components/title/title';


const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header className="home-header">
        <Title />
        <div className="nav-buttons">
          <button className="btn-outline" onClick={() => navigate('/register')}>
            REGISTER
          </button>
          <button className="btn-yellow" onClick={() => navigate('/login')}>
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
          <h1 className="card-title" style={{fontFamily: 'Helvetica, Arial'}}>Learn Anything</h1>
          <a href="/chat" className="try-btn">TRY STUDYLM</a>
        </div>
      </main>
    </div>
  );
};

export default Home;
