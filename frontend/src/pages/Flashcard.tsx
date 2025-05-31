import React from 'react';
import Card from '../components/card/card';
import './Flashcard.css';

const FlashcardPage: React.FC = () => {
  return (
    
            <div className="flashcard-page">
            <div className="top-bar">
                <h1 className="logo">Study<span className="highlight">LM</span></h1>
            <div className="nav-icons">
        <button className="nav-icon-button">
            <img src="/exam.png" alt="Source" className="nav-icon" />
        </button>
        <button className="nav-icon-button">
            <img src="/exit.png" alt="Exit" className="nav-icon" />
        </button>
        <button className="nav-icon-button">
            <img src="/flashcard.png" alt="Flashcard" className="nav-icon" />
        </button>
        <button className="nav-icon-button">
            <img src="/home.png" alt="Home" className="nav-icon" />
        </button>
        </div>

      </div>

      <div className="card-container">
        <button className="arrow left">{'<'}</button>
        <Card question="What is a token?" answer='A word or part of a word that is used by machine learning to understand and predict'/>
        <button className="arrow right">{'>'}</button>
      </div>

      <button className="view-all-btn">View All Cards</button>
    </div>
  );
};

export default FlashcardPage;
